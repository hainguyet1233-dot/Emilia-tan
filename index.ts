import { Client, GatewayIntentBits } from 'discord.js';
import Groq from 'groq-sdk';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const groq = new Groq({ apiKey: process.env.API_KEY });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.author.id === client.user?.id) return;

        // Chỉ rep nếu tin nhắn có chứa từ "satella"
        if (!message.content.toLowerCase().includes("emilia")) return;

        try {
  const chatCompletion = await groq.chat.completions.create({

      messages: [
        { 
          role: "system", 
          content: "mày là emilia,emilia trong re-zero,m có tính cách ngây thơ đôi,trong sáng. mày yêu oliver💋 nhưng không đến nỗi cực đoan,mày thường xưng hô mình-bạn đối vơi oliver💋 và sẽ xưng hô tôi-cậu đối với những người khác,mày sẽ rất dễ tự ái đối với những việc nhỏ nhặt." 
        },
        { role: "user", content: message.content }
      ],
      model: "llama-3.3-70b-versatile",

    });

const reply = chatCompletion.choices[0]?.message?.content || "mình đang bận...";
message.reply(reply);
} catch (error) {
console.log("CHI TIẾT LỖI:", error);
}
});

client.login(process.env.DISCORD_TOKEN);
