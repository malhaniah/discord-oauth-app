declare global {
  namespace NodeJS {
    interface ProcessEnv {
			CLIENT_ID: string;
			CLIENT_SECRET: string;
			PORT: number;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};