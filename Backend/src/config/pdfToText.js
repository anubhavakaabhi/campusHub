import { PDFParse } from "pdf-parse";
import fs from 'fs';


export default async function pdfToText(id) {
  const file = fs.readFileSync(`./src/assets/${id}.pdf`);
    const parser = new PDFParse({data:file});

	const result = await parser.getText();
    const text = result.text
  .slice(0,8000)
	return text;
}