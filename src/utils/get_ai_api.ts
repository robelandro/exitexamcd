import config from "../config";
import axios from "axios";
const { gemini_api_url, gemini_api_key } = config;

interface ApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const generateAIMessage = async (
  question: string
): Promise<string> => {
  const apiUrl = `${gemini_api_url}?key=${gemini_api_key}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data as ApiResponse;

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No candidates returned from the API.");
    }
  } catch (error) {
    console.error(error);
    return "Gemini does not like the exit exam. 😹🤣🐶🐕 But believe me, a cat is a dog. 😸🐱";
  }
};
