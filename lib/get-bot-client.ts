import * as Discord from "discord.js";
import "discord-reply";

import { prefix } from "../config.json";
import { getCommandMap } from "./get-commands";
import { parseMessage } from "./bot-utils";
import {
    botLoggedInMessage,
    argumentsErrorMessage,
    executionErrorMessage,
    getBlankMessage,
    getNoCommandMessage,
} from "./messages";

const { BOT_NAME } = process.env;

/**
 * discord botのクライアントを生成する
 */
function getBotClient() {
    const client = new Discord.Client();

    client.on('ready', () => {
        console.log(botLoggedInMessage);
    });

    client.on('message', async (msg) => {
        const { author, content } = msg;
        if (author.username === BOT_NAME) {
            return;
        }
        if (content.startsWith(prefix)) {
            const commandMap = getCommandMap();
            const { commandName, args, argsError } = parseMessage(content);
            if (!commandName) {
                msg.lineReplyNoMention(getBlankMessage(commandMap));
            } else if (argsError) {
                msg.lineReplyNoMention(argumentsErrorMessage);
            } else if (commandMap.has(commandName)) {
                const command = commandMap.get(commandName);
                try {
                    const result = await command.exec(...args);
                    msg.lineReplyNoMention(result);
                } catch (error) {
                    msg.lineReplyNoMention(executionErrorMessage);
                }
            } else {
                msg.lineReplyNoMention(getNoCommandMessage(commandName, commandMap));
            }
        }
    });

    return client;
}

export { getBotClient };
