// app/api/userroute/route.ts
import { ai } from "@/lib/ai";
import {
  GoogleGenAI,
  createPartFromUri,
  createUserContent,
} from "@google/genai";
import { NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const entry = formData.get("resume");

    // 1) missing? 2) string (i.e. not a file/blob)? → error
    if (!entry || typeof entry === "string") {
      return NextResponse.json(
        { error: "No PDF file provided under 'resume'" },
        { status: 400 }
      );
    }

    // Now TS knows `entry` is a Blob (and Next’s File inherits from Blob)
    const blob = entry as Blob;

    const upload = await ai.files.upload({
      file: blob,
      config: { mimeType: blob.type },
    });

    if (!upload || !upload.uri || !upload.mimeType) {
      return NextResponse.json(
        { error: "Failed to upload a file" },
        { status: 400 }
      );
    }

    const pdfResult = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(upload.uri, upload.mimeType),
        `
        You are a professional “Resume Parser.”  Analyze the uploaded PDF and return **only** a JSON object with these keys:

        {
          "contact": {
            "email":    "<email or null>",
            "phone":    "<phone or null>",
            "location": "<city, state or null>"
          },
          "professional_summary": "<one-sentence overview or null>",
          "skills":      ["<skill1>", "<skill2>", …],
          "work_experience": [
            {
              "position":      "<job title>",
              "company":       "<company name>",
              "start_date":    "<MM/YYYY>",
              "end_date":      "<MM/YYYY or Present>",
              "responsibilities": ["<bullet1>", "<bullet2>", …]
            },
            …
          ],
          "education": [
            {
              "degree":          "<e.g., B.S. Computer Science>",
              "institution":     "<school name>",
              "graduation_year": "<YYYY>"
            },
            …
          ],
          "certifications": ["<cert 1>", "<cert 2>", …],
          "projects": [
            {
              "name":         "<project title>",
              "technologies": ["<tech1>", "<tech2>", …],
              "description":  "<one-sentence summary>"
            },
            …
          ],
          "achievements": ["<award or accolade 1>", …]
        }
      `,
      ]),
    });

    console.log(pdfResult.text);

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        `You are a “User Context Builder” whose job is to transform raw user data into a precise, structured context for future prompts. 

        Please produce a JSON object with the following schema:
        {
          "name":        "<Full Name>",
          "age":         "<Age in years>",
          "field":       "<Field of study or profession>",
          "Job Description":{
            "Description of Desired job": "<Short tailored description of desired job (3-4 sentences)>",
            "Specific Requested Job Skills; ["<skill 1>", "<skill 2>"]
            "Company Name:" ["Company Name"]
            "Level:" ["junior | senio | intern"]
          }
          "resume": {
            "skills":       ["<skill 1>", "<skill 2>", ...],
            "experiences":  ["<role at Company - dates - brief description>", …],
            "projects":     ["<project name - tech stack - your contribution>", …],
            "education":    ["<degree - institution - graduation year>", …],
            "achievements": ["<notable accolade or certification>", …],
            "any other relevant information": [..., ...]
          }
        }

        Here's the raw data to process:
        Name: ${formData.get("name")}
        Age: ${formData.get("age")}
        Field: ${formData.get("field")}
        Description: ${formData.get("desc")}
        Resume Transcript: ${pdfResult.text}
        `,
      ]),
    });

    return NextResponse.json({ summary: result.text });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
