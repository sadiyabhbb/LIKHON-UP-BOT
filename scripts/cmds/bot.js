const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    version: "2.5",
    author: "Nazrul | Fixed By LIKHON AHMED",
    countDown: 5,
    role: 0,
    description: "chat with bot using API + random replies",
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
      return api.sendMessage("Example: /bot hi", event.threadID);
    }

    try {
      const url = `http://65.109.80.126:20392/sim?type=ask&ask=${encodeURIComponent(userMsg)}`;
      const res = await axios.get(url);
      const replyText = res.data?.data?.msg || "🥲 আমি কিছু বুঝতে পারলাম না।";

      return api.sendMessage(
        `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『 ${name} 』,\n╰➤ 🗣 ${replyText}\n╰─────────────────➤`,
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

    
    if (text.startsWith("/")) return;

    
    if (/^\d+$/.test(text) || text.length === 1) return;

    const data = await usersData.get(event.senderID);
    const name = data.name || "Friend";

    const randomMessages = [
      "এতো বট বট করলে লিভ নিবো কিন্তু 😒",
      "সাদা সাদা কালা কালা আমি মানুষ অনেক ভালা 😁",
      "হুম জান বলো শুনছি...😗",
      "আমাকে না ডেকে লিখন বস রে একটা গোফ দে",
      "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
      "তোর সাহস ক্যামনে হইলো আমাকে বট বলে ডাকোস 😤",
      "তুই নিজে বট 😒🔪",
      "না চিল্লাইয়া এবার কো শুনছি ",
      "দুই মিনিট সাইডে আসিস তো কথা আছে 😾🔪",
      "দুই টাকা দিয়ে মিস কল দিতে গিয়ে এখন দেখি দশ টাকা খরচ হয়ে গেছে 😟",
      "আর যাবো না বেগুন তুলিতে 🤭",
      "আমি আপনাকে কিভাবে সাহায্য করতে পারি...? 🤔",
      "আদেশ করুন বস...🙂",
      "হুম শুনছি আমি আপনি বলুন 😐",
      "আমার সব কমান্ড দেখতে /help টাইপ করুন ✅",
      "আসসালামু'আলাকুম জি বলুন কি করতে পারি আপনার জন্য 😊",
      "আদেশ করুন যাহাপানা 😎",
      "আবার যদি আমারে বট কইয়া ডাক দেছ তাইলে তোর বিয়ে হবে না 🫤😏",
      "তোগো বাড়ির জামাই আমি সম্মান দে 😼",
      "তুই বট তোর নানি বট 😤 তোর কত বড় সাহস তুই আমারে বট কস 😤",
      "আপনার কি চরিত্রে সমস্যা যে এতো বার আমাকে ডাকতেছেন 🤨",
      "ডাকছোত কেন ফাস্ট কো 😒",
      "তুমি কি আমাকে ডেকেছো...? 😇"
    ];

    
    if (event.type === "message_reply" && event.messageReply?.senderID === api.getCurrentUserID()) {
      try {
        const url = `http://65.109.80.126:20392/sim?type=ask&ask=${encodeURIComponent(text)}`;
        const res = await axios.get(url);
        const replyText = res.data?.data?.msg || "🥲 আমি কিছু বুঝতে পারলাম না।";

        return api.sendMessage(
          `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『 ${name} 』,\n╰➤ 🗣 ${replyText}\n╰─────────────────➤`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage("⚠ API error: " + err.message, event.threadID);
      }
    }

    
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes("bot") ||
      lowerText.includes("বট") ||
      lowerText.includes("robot") ||
      lowerText.includes("রোবট")
    ) {
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];

      return api.sendMessage(
        `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『 ${name} 』,\n╰➤ 🗣 ${randomMessage}\n╰─────────────────➤`,
        event.threadID,
        event.messageID
      );
    }
  }
};
