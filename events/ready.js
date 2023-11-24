const { Events } = require('discord.js');
const { botCommandsChannelId } = require('../config.json');

module.exports = {
   name: Events.ClientReady,
   once: true,
   async execute(client) {
      const channelId = botCommandsChannelId;
      const channel = client.channels.cache.get(channelId);
      if (!channel) {
         console.error(`The channel with ID ${channelId} was not found.`);
      }

      await channel.send('Bot is online!');
      console.log(`Ready! Logged in as ${client.user.tag}`);
   },
};