import { Client } from "discord.js";
import type { Collection } from "discord.js";

declare module "discord.js" {
	interface Client {
		commands: Collection<
			string,
			(interaction: CommandInteraction) => Promise<void>
		>;
	}
}