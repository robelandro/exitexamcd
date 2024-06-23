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

  const updateLoadingMessage = async (
    peerId: Api.TypePeer,
    messageId: number,
    counter: number
  ) => {
    const loadingText =
      "█".repeat((counter % 3) + 1) + "▒".repeat(3 - ((counter % 3) + 1));
    await client.invoke(
      new Api.messages.EditMessage({
        peer: peerId,
        id: messageId,
        message: loadingText,
      })
    );
  };

  client.addEventHandler(async (event) => {
    const message = event.message;
    if (message.text.startsWith(".ask ")) {
      const question = message.text.slice(5); // Adjusted slice index to 5 to match ".ask "

      // Send a loading message
      let loadingMessage = await client.sendMessage(event.message.peerId, {
        message: "█▒▒▒",
      });

      let counter = 0;
      const loadingInterval = setInterval(async () => {
        counter++;
        await updateLoadingMessage(
          event.message.peerId,
          loadingMessage.id,
          counter
        );
      }, 1000); // Update every second

      try {
        // Get the response from the AI
        const response = await generateAIMessage(question);

        // Clear the loading interval
        clearInterval(loadingInterval);

        // Delete the loading message
        await client.invoke(
          new Api.messages.DeleteMessages({
            id: [loadingMessage.id],
            revoke: true,
          })
        );

        // Send the response
        await client.sendMessage(event.message.peerId, {
          message: response,
        });
      } catch (error) {
        // Clear the loading interval in case of error
        clearInterval(loadingInterval);

        // Delete the loading message
        await client.invoke(
          new Api.messages.DeleteMessages({
            id: [loadingMessage.id],
            revoke: true,
          })
        );

        // Send an error message
        await client.sendMessage(event.message.peerId, {
          message: "An error occurred while processing your request.",
        });
      }
    }
  }, new NewMessage({}));
})();
