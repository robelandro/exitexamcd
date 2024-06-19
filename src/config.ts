import { config } from "dotenv";
config();

export default {
  env: process.env.NODE_ENV,
  api_id: Number(process.env.API_ID),
  api_hash: process.env.API_HASH,
  string_session: process.env.STRING_SESSION,
  gemini_api_key: process.env.GEMINI_API_KEY,
  gemini_api_url: process.env.GEMINI_API_URL,
};
