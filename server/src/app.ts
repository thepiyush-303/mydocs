import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

export const app = express();

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "collab-doc-editor-api"
    });
});