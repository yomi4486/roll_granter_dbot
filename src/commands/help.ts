import { SlashCommandBuilder,CommandInteraction,EmbedBuilder } from 'discord.js';

const helpCommand = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Botの説明を表示します'),
	async execute(interaction:CommandInteraction) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('ロール付与bot')
            .setDescription('ボタンを押すことでロールを付与することのできるBotです。')
            .addFields( // 複数個記入可能
                { name: '`/help`', value: 'ボットの説明を表示します' },
            )
		await interaction.reply(
            {embeds:[helpEmbed]}
        );
	},
};

export default helpCommand;