const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    version: "2.2",
    author: "Fixed By Likhon Ahmed",
    countDown: 5,
    role: 0,
    description: "chat with bot",
    category: "chat",
    guide: {
      en: "{p}bot <message>"
    }
  },

  onStart: async ({ api, event, args, usersData }) => {
    const data = await usersData.get(event.senderID);
    const name = data.name || "Friend";

    const userMsg = args.join(" ");
    if (!userMsg) {
      return api.sendMessage("❌ Example: /bot hi", event.threadID);
    }

    try {
      const url = `http://65.109.80.126:20392/sim?type=ask&ask=${encodeURIComponent(userMsg)}`;
      const res = await axios.get(url);
      const replyText = res.data?.data?.msg || "🥲 আমি কিছু বুঝতে পারলাম না।";

      return api.sendMessage(
        `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『${name}』,\n╰➤ 🗣 ${replyText}\n╰─────────────────➤`,
        event.threadID,
        event.messageID
      );
    } catch (err) {
      return api.sendMessage("⚠ API error: " + err.message, event.threadID);
    }
  },

  onChat: async ({ api, event, usersData }) => {
    const text = event.body?.trim();
    if (!text) return;

    const data = await usersData.get(event.senderID);
    const name = data.name || "Friend";

    
    if (event.type === "message_reply" && event.messageReply?.senderID === api.getCurrentUserID()) {
      try {
        const url = `http://65.109.80.126:20392/sim?type=ask&ask=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const replyText = res.data?.data?.msg || "🥲 আমি কিছু বুঝতে পারলাম না।";

        return api.sendMessage(
          `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『${name}』,\n╰➤ 🗣 ${replyText}\n╰─────────────────➤`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage("⚠ API error: " + err.message, event.threadID);
      }
    }

    
    if (text.toLowerCase().includes("bot") || text.includes("বট")) {
      try {
        const url = `http://65.109.80.126:20392/sim?type=ask&ask=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const replyText = res.data?.data?.msg || "🥲 আমি কিছু বুঝতে পারলাম না।";

        return api.sendMessage(
          `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『${name}』,\n╰➤ 🗣 ${replyText}\n╰─────────────────➤`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage("⚠ API error: " + err.message, event.threadID);
      }
    }
  }
};
