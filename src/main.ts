import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import config from "./config";
import { NewMessage } from "telegram/events";
import { ask } from "./services/ask";
import { grammar } from "./services/grammar";

const { api_id, api_hash } = config;

if (!api_id || !api_hash) {
  throw new Error("Please fill api_id and api_hash in config.ts");
}

const stringSession = new StringSession(config.string_session);
const client = new TelegramClient(stringSession, api_id, api_hash, {
  connectionRetries: 5,
});

(async () => {
  await client.connect(); // Connect to Telegram

  // .ask ai message
  client.addEventHandler(ask, new NewMessage({}));
  client.addEventHandler(grammar, new NewMessage({}));
})();
