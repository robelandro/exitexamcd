import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import config from "./config";
import { NewMessage } from "telegram/events";
import { generateAIMessage } from "./utils/get_ai_api";

const { api_id, api_hash } = config;

if (!api_id || !api_hash) {
  throw new Error("Please fill api_id and api_hash in config.ts");
}

const stringSession = new StringSession(config.string_session);
const client = new TelegramClient(stringSession, api_id, api_hash, {
  connectionRetries: 5,
});

(async () => {
  await client.connect(); // Make sure to connect the client first

  client.addEventHandler(async (event) => {
    const message = event.message;
    if (message.text.startsWith(".ask ")) {
      const question = message.text.slice(3); // Adjusted slice index to 3 to match ".a "
      // Send a loading message
      const loadingMessage = await client.sendMessage(event.message.peerId, {
        message: "Loading...",
      });

      // Get the response from the AI
      const response = await generateAIMessage(question);

      // Edit the loading message with the response
      await client.invoke(
        new Api.messages.EditMessage({
          peer: event.message.peerId,
          id: loadingMessage.id,
          message: response,
        })
      );
    }
  }, new NewMessage({}));
})();
