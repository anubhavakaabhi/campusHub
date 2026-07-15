import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import pdf from '../assets/0410100v1.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfLayout() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <FileText size={16} />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-tight">Document Preview</p>
            <p className="text-xs text-slate-400 leading-tight">Operating System Notes</p>
          </div>
        </div>

        {/* PDF viewer */}
        <div className="flex justify-center bg-slate-50 border border-slate-100 rounded-xl p-4 overflow-auto">
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <p className="text-sm text-slate-400 py-16">Loading document...</p>
            }
            error={
              <p className="text-sm text-red-500 py-16">Failed to load PDF.</p>
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
          <p className="text-sm font-medium text-slate-600">
            Page{' '}
            <span className="text-slate-900 font-semibold">
              {pageNumber || (numPages ? 1 : '--')}
            </span>{' '}
            of <span className="text-slate-900 font-semibold">{numPages || '--'}</span>
          </p>

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
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-600"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfLayout;