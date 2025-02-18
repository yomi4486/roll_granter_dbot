//必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, Message,Events,Collection } from 'discord.js'
import dotenv from 'dotenv'
import * as fs from 'fs';
import * as path from 'path';

//.envファイルを読み込む
dotenv.config()

//Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath).filter(file => file.endsWith('.ts'));

client.commands = new Collection();

for (const folder of commandFolders) {
	const folderPath = path.join(foldersPath, folder);
	const files = fs
		.readdirSync(folderPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of files) {
		const filePath = path.join(folderPath, file);

		(async () => {
			const command = await import(filePath);
			if (command.data && command.execute) {
				client.commands.set(command.data.name, command.execute);
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
				);
			}
		})();
	}
}

client.once('ready', () => {
    if(client.user){
        console.info(`Ready: ${client.user.tag}`)
    }
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    if (message.content.includes(`@<${client.user!.id}>`)){
        await message.reply("こんにちは!\n使い方を知りたい場合は`/help`を実行してね!")
        return
    }
})

client.on(Events.InteractionCreate, async interaction => {
    // コマンドでなかった場合は早期リターン
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
    // 一致するコマンドがなかった場合
	if (!command) {
		console.error(` ${interaction.commandName} というコマンドは存在しません。`);
		return;
	}
	try {
        // コマンドを実行
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'コマンドを実行中にエラーが発生しました！', ephemeral: true });
	}
});

client.login(process.env.BOT_TOKEN)