import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Loader2,
  X,
  AlertCircle,
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { summarizePdf } from '../services/ai.services.js';
import { useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfLayout() {
  const { id } = useParams();
  const pdf = `/pdfs/${id}.pdf`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState('1');

  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [summarizeError, setSummarizeError] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput('1');
  }

  function changePage(offset) {
    setPageNumber((prev) => {
      const next = prev + offset;
      setPageInput(String(next));
      return next;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function handlePageInputChange(e) {
    setPageInput(e.target.value);
  }

  function commitPageInput() {
    const value = Number(pageInput);
    if (!value || value < 1) {
      setPageInput(String(pageNumber));
      return;
    }
    const clamped = Math.min(Math.max(value, 1), numPages || value);
    setPageNumber(clamped);
    setPageInput(String(clamped));
  }

  async function handleSummarize() {
    setSummarizing(true);
    setSummarizeError('');
    try {
      const res = await summarizePdf(id);
      setSummary(res.data);
    } catch (err) {
      setSummarizeError("Couldn't generate a summary. Please try again.");
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-6">
        {/* PDF card */}
        <div className="w-full lg:max-w-2xl bg-white rounded-2xl shadow-xl p-6 shrink-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FileText size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-tight truncate">
                  Document Preview
                </p>
                <p className="text-xs text-slate-400 leading-tight truncate">
                  Operating System Notes
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSummarize}
              disabled={summarizing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {summarizing ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Summarize with AI
                </>
              )}
            </button>
          </div>

          {summarizeError && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              <AlertCircle size={14} className="shrink-0" />
              {summarizeError}
            </div>
          )}

          {/* PDF viewer */}
          <div className="flex justify-center bg-slate-50 border border-slate-100 rounded-xl p-4 overflow-auto max-h-[70vh]">
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
                  <Loader2 size={20} className="animate-spin" />
                  <p className="text-sm">Loading document...</p>
                </div>
              }
              error={
                <p className="text-sm text-red-500 py-16">
                  Couldn&apos;t load this PDF. Please try again.
                </p>
              }
            >
              <Page
                pageNumber={pageNumber}
                className="shadow-sm rounded-lg overflow-hidden"
              />
            </Document>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span>Page</span>
              <input
                type="text"
                inputMode="numeric"
                value={pageInput}
                onChange={handlePageInputChange}
                onBlur={commitPageInput}
                onKeyDown={(e) => e.key === 'Enter' && commitPageInput()}
                disabled={!numPages}
                className="w-12 text-center rounded-lg border border-slate-200 py-1 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-slate-50"
              />
              <span>of {numPages || '--'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                type="button"
                disabled={!numPages || pageNumber >= numPages}
                onClick={nextPage}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* AI summary panel */}
        {(summary || summarizing) && (
          <div className="w-full lg:flex-1 lg:min-w-0 bg-white rounded-2xl shadow-xl p-6 max-h-[calc(70vh+112px)] flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </span>
                <p className="text-sm font-bold text-slate-900">AI Summary</p>
              </div>

              {summary && (
                <button
                  type="button"
                  onClick={() => setSummary('')}
                  aria-label="Close summary"
                  className="text-slate-400 hover:text-slate-600 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {summarizing && !summary ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
                  <Loader2 size={20} className="animate-spin" />
                  <p className="text-sm">Reading through the document...</p>
                </div>
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfLayout;