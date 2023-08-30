declare global {
  namespace NodeJS {
    interface Global {
      client: import("discord.js").Client;
    }
  }
}

export {};
