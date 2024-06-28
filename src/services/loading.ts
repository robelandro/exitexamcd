import { Api, TelegramClient } from "telegram";
import { mojibakeEncode } from "../utils/mojibake";

export const updateLoadingMessage = async (
  peerId: Api.TypePeer,
  messageId: number,
  counter: number,
  client: TelegramClient
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

export const gibberishLoadingMessage = async (
  peerId: Api.TypePeer,
  messageId: number,
  client: TelegramClient
) => {
  const loadingText = mojibakeEncode({ plainText: "Fixing This Gibberish" });
  await client.invoke(
    new Api.messages.EditMessage({
      peer: peerId,
      id: messageId,
      message: loadingText,
    })
  );
};
