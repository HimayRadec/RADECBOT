const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = {
   data: new SlashCommandBuilder()
      .setName('join')
      .setDescription('join the voice channel'),

   async execute(interaction) {
      const channel = interaction.member.voice.channel;
      if (!channel) {
         await interaction.reply('You need to join a voice channel first!');
         return;
      }

      try {
         joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
         });
         await interaction.reply(`Joined ${channel.name}`);
      }
      catch (error) {
         console.error(error);
         await interaction.reply('Unable to join your voice channel!');
      }

   },
};