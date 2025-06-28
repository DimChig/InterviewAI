// /lib/generateSummary.ts
import type { Message } from "@/app/types/messages";

export async function generateSummary(history: Message[]): Promise<string> {
  // Hardcoded candidate profile
  const userContext = `
json
{
  "name": "Tyler",
  "age": "23",
  "field": "Software Engineer",
  "Job Description": {
    "description of desired job": "Tyler is seeking a Software Engineer Intern/Co-op position at Cohere. He is enthusiastic about building machine learning models, creating datasets, and developing API features. He wants to contribute to cutting-edge AI research and gain experience in a fast-paced environment with autonomy and ownership over high-impact work.",
    "Specific Skills": ["Machine Learning", "API Development", "Data Pipelines"],
    "Company Name": ["Cohere"],
    "Level": ["intern"]
  },
  "resume": {
    "skills": [
      "C++",
      "Python",
      "JavaScript",
      "Linux",
      "Ubuntu VM",
      "Raspberry Pi",
      "Windows",
      "Embedded Systems",
      "Object Detection & Tracking",
      "Real-Time Data Processing",
      "OpenCV",
      "SORT",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "React"
    ],
    "experiences": [
      "Project Administrator at Element Home Builder - 08/2020-Present - Managing project documentation and automating bill uploads using QuickBooks REST API.",
      "My Bounce House Guys - 03/2022-09/2022 - Coordinated with clients and resolved setup and delivery issues.",
      "Pollo Tropical - 01/2019-08/2020 - Provided customer service in a fast-paced environment."
    ],
    "projects": [
      "Kestrel - Autonomous Drone Project - C++, Python, Ubuntu, Embedded, PyTorch, Docker, NumPy - Leading a team to develop an autonomous drone for real-time PEV tracking and obstacle avoidance.",
      "PiProject - Smart Target Tracker - C++, OpenCV, Raspberry Pi OS, PID Control, Eigen, CMake, Catch2 - Building a real-time tracking system on Raspberry Pi using OpenCV and a light sensor for dynamic exposure.",
      "Capital 01 Health – Shellhacks Hackathon - Python, GitHub, NumPy, Pandas, TensorFlow, MatPlotLib - Led the development of a Genetic Adversarial Network to predict net savings using financial data."
    ],
    "education": [
      "Bachelor of Science, Computer Science - University of Central Florida - 2026"
    ],
    "achievements": [],
    "any other relevant information": []
  }
}
`.trim();

  const res = await fetch("/api/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userContext, chatHistory: history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Error ${res.status}: ${(err as any).error || res.statusText}`
    );
  }

  // The endpoint returns plain text summary
  const summary = await res.text();
  return summary;
}
