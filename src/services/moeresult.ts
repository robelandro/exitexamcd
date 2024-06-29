import { Api } from "telegram";
import { NewMessageEvent } from "telegram/events";
import axios, { AxiosError, isAxiosError } from "axios";
import { gibberishLoadingMessage } from "./loading";
import fs from "fs/promises";

export const moeresult = async (event: NewMessageEvent) => {
  const client = event.client;
  if (!client) throw new Error("Client not found");
  const message = event.message;

  if (message.text.startsWith(".re ")) {
    const question = message.text.slice(4); // Adjusted slice index to 4 to match ".re "

    const loadingInterval = setInterval(async () => {
      gibberishLoadingMessage(event.message.peerId, event.message.id, client);
    }, 1000); // Update every second

    try {
      // Sanitize and format id
      let id = question.replace(/[^a-z0-9]/gi, "").toLowerCase();
      if (!/^rqe|euee/.test(id)) {
        throw new Error("ID must start with 'rqe' or 'euee'");
      }

      const url = `https://result.ethernet.edu.et/remedial/download/${id}`;
      let response;
      let attempts = 0;

      while (attempts < 10) {
        try {
          console.log(url);
          response = await axios.get(url, { responseType: "arraybuffer" });
          if (response.status === 502) {
            attempts++;
            continue;
          }
          break; // Exit loop if request is successful
        } catch (err: any | AxiosError) {
          response = err.response;
          if (isAxiosError(err) && err.response?.status === 502) {
            console.log(err.response?.status);
            attempts++;
          } else {
            throw err; // Rethrow if it's not a 502 error
          }
        }
      }

      if (!response || response.status !== 200) {
        throw new Error(
          `Failed to fetch the file after ${attempts} attempts status: ${response?.status}`
        );
      }

      // write response file
      const filepath = `./${id}.pdf`;

      await fs.writeFile(filepath, Buffer.from(response.data));

      // Clear the loading interval
      clearInterval(loadingInterval);

      // Send a success message
      await client.invoke(
        new Api.messages.EditMessage({
          peer: event.message.peerId,
          id: event.message.id,
          message: `Successfully downloaded ${id}.pdf`,
        })
      );

      // Send the file
      await client.sendFile(event.message.peerId, {
        file: filepath,
        caption: `Downloaded ${id}.pdf`,
		replyTo: event.message.id
      });
	  
	  // delete file
	  await fs.unlink(filepath);

    } catch (error) {
      clearInterval(loadingInterval);

      await client.invoke(
        new Api.messages.EditMessage({
          peer: event.message.peerId,
          id: event.message.id,
          message: `Something went wrong : ${error}`,
        })
      );
    }
  }
};
