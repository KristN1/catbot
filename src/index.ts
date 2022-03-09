import { Client } from "discord.js"
import config from "./config.json"

export const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});;

client.once("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async message => {
    console.log(message.content);
});

client.login(config.token);