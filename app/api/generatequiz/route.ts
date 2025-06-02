import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PdfReader } from "pdfreader";

const API_KEY = "AIzaSyCIFxqaCGYGBy3YJZFKMKVgMguOMBIX1k0"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// ✅ Function to extract text from a PDF buffer
const extractTextFromPDF = async (pdfBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    let extractedText = "";
    new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
      if (err) {
        reject(`Error reading PDF: ${err}`);
      } else if (!item) {
        resolve(extractedText.trim()); // End of file
      } else if (item.text) {
        extractedText += item.text + " ";
      }
    });
  });
};

// ✅ Function to generate a quiz using Gemini API
const generateQuiz = async (text: string): Promise<any> => {
  try {
    const response = await axios.post(API_URL, {
      contents: [{ parts: [{ text }] }], // ✅ Use the actual text input
    });

    if (response.status === 200) {
      const result = response.data;
      console.log("Gemini API Response:", result);

      const quizText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from Gemini";

      return quizText;
    } else {
      return {
        error: "Failed to generate quiz",
        details: `Status Code: ${response.status}`,
      };
    }
  } catch (error: any) {
    console.error("Error generating quiz:", error.message);
    return { error: "Failed to generate quiz", details: error.message };
  }
};

// ✅ Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid PDF URL is required" },
        { status: 400 }
      );
    }

    // ✅ Fetch the PDF as a binary buffer
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // ✅ Extract text from the PDF
    const pdfText = await extractTextFromPDF(response.data);

    // ✅ Generate quiz from the extracted text
    const quizData =
      await generateQuiz(`Generate a multiple-choice quiz from this content:\n\n${pdfText} return in json fomrate like this {
  "quiz": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "answer": "Paris"
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Earth", "Mars", "Jupiter", "Venus"],
      "answer": "Mars"
    },
    {
      "question": "Who wrote 'Hamlet'?",
      "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"],
      "answer": "William Shakespeare"
    }
  ]
}
no other things`);
    console.log(quizData);

    return NextResponse.json({
      message: "Quiz generated successfully",
      quiz: quizData,
    });
  } catch (error: any) {
    console.error("Error processing PDF:", error.message);
    return NextResponse.json(
      { error: "Failed to process the PDF", details: error.message },
      { status: 500 }
    );
  }
}

// ✅ Handle GET requests (for testing purposes)
export async function GET() {
  return NextResponse.json({
    message: "This API accepts POST requests with a PDF URL in the body",
    example: {
      method: "POST",
      url: "/api/read-pdf",
      body: { url: "https://example.com/sample.pdf" },
    },
  });
}
