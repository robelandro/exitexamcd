import { Api } from "telegram";
import { NewMessageEvent } from "telegram/events";
import { generateAIMessage } from "../utils/get_ai_api";
import { updateLoadingMessage } from "./loading";

export const ask = async (event: NewMessageEvent) => {
  const client = event.client;
  if (!client) throw new Error("Client not found");
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
        counter,
        client
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
};
