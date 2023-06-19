import { config } from "dotenv";
import express from "express";
import { getBotClient } from "./lib/get-bot-client";

config();
const app = express();

let lastLoggedInTime = null;
let client = null;

app.get('/', (req, res) => {
    if (!client || Date.now() - lastLoggedInTime > 3600000) {
        if (client && typeof client.destroy === 'function') {
            client.destroy();
        }
        const { BOT_TOKEN } = process.env;
        client = getBotClient();
        client.login(BOT_TOKEN);
        lastLoggedInTime = Date.now();
    }
    res.status(200).send('bot client is alive!');
});

app.listen(process.env.PORT || 3000);
