import { SlashCommandBuilder,CommandInteraction } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Botの説明を表示します'),
	async execute(interaction:CommandInteraction) {
		await interaction.reply('Pong!');
	},
};