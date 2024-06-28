import { Api } from "telegram";
import { NewMessageEvent } from "telegram/events";
import { generateAIMessage } from "../utils/get_ai_api";
import { gibberishLoadingMessage, updateLoadingMessage } from "./loading";

export const grammar = async (event: NewMessageEvent) => {
  const client = event.client;
  if (!client) throw new Error("Client not found");
  const message = event.message;
  if (message.text.startsWith(".gr ")) {
    const question = message.text.slice(4); // Adjusted slice index to 4 to match ".gr "

    const loadingInterval = setInterval(async () => {
      gibberishLoadingMessage(event.message.peerId, event.message.id, client);
    }, 1000); // Update every second

    try {
      const tuned_question = `Please only send the grammatically correct version of "${question}"`;
      // Get the response from the AI
      const response = await generateAIMessage(tuned_question);

      // Clear the loading interval
      clearInterval(loadingInterval);

      // Send the response
      await client.invoke(
        new Api.messages.EditMessage({
          peer: event.message.peerId,
          id: event.message.id,
          message: response,
        })
      );
    } catch (error) {
      // Clear the loading interval in case of error
      clearInterval(loadingInterval);

      // Send an error message
      await client.invoke(
        new Api.messages.EditMessage({
          peer: event.message.peerId,
          id: event.message.id,
          message: `Something went wrong with ai grammar fixing: ${error}`,
        })
      );
    }
  }
};
