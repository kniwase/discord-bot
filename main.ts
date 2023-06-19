import { config } from "dotenv";
import { getBotClient } from "./lib/get-bot-client";

config();
const { BOT_TOKEN } = process.env;
const client = getBotClient();
client.login(BOT_TOKEN);

console.log("bot client is alive!");
