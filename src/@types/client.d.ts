import { Client, CommandInteraction } from "discord.js";
import type { Collection } from "discord.js";

declare module "discord.js" {
  interface Command {
    data: {
      name: string;
      description: string;
    };
    execute: (interaction: CommandInteraction) => Promise<void>;
  }

  interface Client {
    commands: Collection<string, Command>;
  }
}
