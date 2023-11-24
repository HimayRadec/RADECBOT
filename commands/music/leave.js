const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
   data: new SlashCommandBuilder()
      .setName('leave')
      .setDescription('leave the voice channel'),

   async execute(interaction) {
      const botVoiceChannel = interaction.guild.me.voice.channel;
      const userVoiceChannel = interaction.member.voice.channel;

      console.log(`botVoiceChannel: ${botVoiceChannel}`);

      if (!botVoiceChannel) {
         await interaction.reply('I am not in a voice channel!');
         return;
      }

      if (!userVoiceChannel) {
         await interaction.reply('You need to join a voice channel first!');
         return;
      }

      if (botVoiceChannel.id !== userVoiceChannel.id) {
         await interaction.reply('You are not in the same voice channel as me!');
         return;
      }

      try {
         const connection = getVoiceConnection(botVoiceChannel.guild.id);
         connection.destroy();

         await interaction.reply(`Left ${botVoiceChannel.name}`);
      }
      catch (error) {
         console.error(error);
         await interaction.reply('Unable to leave the voice channel!');
      }
   },
};