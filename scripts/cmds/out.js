module.exports = {
  config: {
    name: "out",
    aliases: ["leave"],
    version: "1.2",
    author: "Sandy | Fixed By LIKHON AHMED",
    countDown: 5,
    role: 2,
    shortDescription: "bot will leave target group",
    category: "admin",
  },

  onStart: async function ({ api, event, args }) {
    if (!args[0]) return api.sendMessage("❌ Group ID দিন।", event.threadID);

    const targetGroupID = args[0];

    try {
      const threadInfo = await api.getThreadInfo(targetGroupID);
      const groupName = threadInfo.threadName || targetGroupID;

      
      await api.sendMessage(`oky bye`, targetGroupID);

      
      await api.sendMessage(
        `✅ I'm Leaving ${groupName} From The Group`,
        event.threadID
      );

      
      api.removeUserFromGroup(api.getCurrentUserID(), targetGroupID);

    } catch (err) {
      return api.sendMessage(
        `⚠ Bot Group ${targetGroupID} Could Not Get Out\nError: ${err.message}`,
        event.threadID
      );
    }
  },
};
