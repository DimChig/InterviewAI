// /lib/generateFirstQuestion.ts
import type { Message } from "@/app/types/messages";

export async function generateFirstQuestion(): Promise<string> {
  // Hardcoded candidate profile
  const userContext =
    `json\n{\n  \"name\": \"Tyler\",\n  \"age\": \"23\",\n  \"field\": \"Software Engineer\",\n  \"Job Description\": {\n    \"description of desired job\": \"Tyler is seeking a Software Engineer Intern/Co-op position at Cohere. He is enthusiastic about building machine learning models, creating datasets, and developing API features. He wants to contribute to cutting-edge AI research and gain experience in a fast-paced environment with autonomy and ownership over high-impact work.\",\n    \"Specific Skills\": [\"Machine Learning\", \"API Development\", \"Data Pipelines\"],\n    \"Company Name\": [\"Cohere\"],\n    \"Level\": [\"intern\"]\n  },\n  \"resume\": {\n    \"skills\": [\n      \"C++\",\n      \"Python\",\n      \"JavaScript\",\n      \"Linux\",\n      \"Ubuntu VM\",\n      \"Raspberry Pi\",\n      \"Windows\",\n      \"Embedded Systems\",\n      \"Object Detection & Tracking\",\n      \"Real-Time Data Processing\",\n      \"OpenCV\",\n      \"SORT\",\n      \"NumPy\",\n      \"Pandas\",\n      \"Matplotlib\",\n      \"React\"\n    ],\n    \"experiences\": [\n      \"Project Administrator at Element Home Builder - 08/2020-Present - Managing project documentation and automating bill uploads using QuickBooks REST API.\",\n      \"My Bounce House Guys - 03/2022-09/2022 - Coordinated with clients and resolved setup and delivery issues.\",\n      \"Pollo Tropical - 01/2019-08/2020 - Provided customer service in a fast-paced environment.\"\n    ],\n    \"projects\": [\n      \"Kestrel - Autonomous Drone Project - C++, Python, Ubuntu, Embedded, PyTorch, Docker, NumPy - Leading a team to develop an autonomous drone for real-time PEV tracking and obstacle avoidance.\",\n      \"PiProject - Smart Target Tracker - C++, OpenCV, Raspberry Pi OS, PID Control, Eigen, CMake, Catch2 - Building a real-time tracking system on Raspberry Pi using OpenCV and a light sensor for dynamic exposure.\",\n      \"Capital 01 Health – Shellhacks Hackathon - Python, GitHub, NumPy, Pandas, TensorFlow, MatPlotLib - Led the development of a Genetic Adversarial Network to predict net savings using financial data.\"\n    ],\n    \"education\": [\n      \"Bachelor of Science, Computer Science - University of Central Florida - 2026\"\n    ],\n    \"achievements\": [],\n    \"any other relevant information\": []\n  }\n}\n
  `.trim();

  // No prior messages for the first question
  const history: Message[] = [];

  const res = await fetch("/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userContext, history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Error ${res.status}: ${(err as any).error || res.statusText}`
    );
  }

  // The endpoint returns plain text
  const nextQuestion = await res.text();
  return nextQuestion;
}
