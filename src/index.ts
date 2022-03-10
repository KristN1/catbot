import { Client } from "discord.js"
import { MessageEmbed } from "discord.js"
import config from "./config.json"

export const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});;

client.once("ready", () => {
    console.log("Ready!");
});

async function genEmbed(title: string, image: string) {
    if (client.user) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor("#026799")
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: `${client.user.avatarURL()}` });
        return embed;
    } else {
        return null;
    }
}
client.on("messageCreate", async message => {
    const msgContent = message.content.toLowerCase();
    console.log(msgContent);
    console.log(config.triggers.cat);
    if (config.triggers.cat.find(x => msgContent.includes(x))) {
        const embed = await genEmbed("Cat 🐈", "https://cataas.com/cat");
        if (embed) {
            message.channel.send({embeds: [embed]});
        }
    }
});

client.login(config.token);