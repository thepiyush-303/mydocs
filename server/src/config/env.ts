import dotenv from "dotenv";

dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 5000),
    CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173"
};