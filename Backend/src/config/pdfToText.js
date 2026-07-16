import { PDFParse } from "pdf-parse";
import fs from 'fs';

const file = fs.readFileSync("./src/assets/0410100v1.pdf");


export default async function pdfToText() {
    const parser = new PDFParse({data:file});

	const result = await parser.getText();
    const text = result.text
  .slice(0,8000)
	return text;
}