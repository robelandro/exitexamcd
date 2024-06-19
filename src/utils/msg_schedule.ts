import schedule from "node-schedule";
import { TelegramClient } from "telegram";
import { countdown } from "./data_utils";
import { generateAIMessage } from "./get_ai_api";
import moment from "moment-timezone";
const BASEQUESTION =
  "in one sentence say something about exit exam for my fellow student use 4 emoji make it more funny. ask them a randomly chosen question about Electrical and Computer Engineering and make the answer more funny.";
const EXPIREDATE = moment
  .tz("2024-06-22T13:30:00", "Africa/Addis_Ababa")
  .toDate();

export const sendScheduleCD = (
  client: TelegramClient,
  sendto: string,
  spec: string
) => {
  // Schedule a job to send a message every 10 seconds
  schedule.scheduleJob(spec, async () => {
    try {
      const currentDate = moment.tz("Africa/Addis_Ababa").toDate(); // Current date in GMT+0300 timezone
      const countdownleft = countdown(currentDate, EXPIREDATE);
      const funnyMessage = await generateAIMessage(BASEQUESTION);
      await client.sendMessage(sendto, {
        message: `⏳⚰Time left: ${countdownleft} ☠\n\n${funnyMessage}\n\n⏳⚰Time left: ${countdownleft} ☠`,
      });
      console.log(`Message sent: at ${currentDate.toString()}`);
    } catch (error) {
      await client.sendMessage("me", {
        message: `Something went wrong: ${error}`,
      });
    }
  });
};
