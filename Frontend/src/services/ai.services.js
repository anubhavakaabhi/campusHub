import axios from "axios";


async function summarizePdf(pdfId) {
    try {
        const response = await axios.post(`http://localhost:3000/ai/summarize/${pdfId}`);
        return response.data;
    } catch (error) {
        console.error("Error summarizing PDF:", error);
        throw error;
    }
}

export { summarizePdf };