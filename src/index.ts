import { Client } from "discord.js"
import { MessageEmbed } from "discord.js"
import config from "./config.json"

export const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});;

client.once("ready", () => {
    console.log("Ready!");

    client.user?.setActivity("🐈", { type: "WATCHING" });
});

async function genUrl(base: string) {
    var r = (Math.random() + 1).toString(36).substring(7);
    return `${base}?${r}`;
}

async function genEmbed(title: string, image: string) {
    if (client.user) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor("#2572f7")
            .setImage(image)
            .setTimestamp()
            .setFooter({ text: client.user.username, iconURL: `${client.user.avatarURL()}` });
        return embed;
    }
}

client.on("messageCreate", async message => {
    const msgContent = message.content.toLowerCase();

    if (config.triggers.cat.find(x => msgContent.includes(x))) {
        const embed = await genEmbed("Cat 🐈", await(genUrl("https://cataas.com/cat")));
        if (embed) {
            message.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
        }
    } else if (config.triggers.thisperson.find(x => msgContent.includes(x))) {
        const embed = await genEmbed("This person does not exist 🤔", await(genUrl("https://thispersondoesnotexist.com/image")));
        if (embed) {
            message.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
        }
    }
});

client.login(config.token);