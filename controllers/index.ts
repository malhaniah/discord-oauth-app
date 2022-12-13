import { Request, Response } from "express";
import { credentialsData } from "../utils";
import axios from "axios";
import { OauthCredentials } from "../types";

export async function getCredentials(req: Request, res: Response) {
  const { code } = req.query;

  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    grant_type: "authorization_code",
    code: code as string,
    redirect_uri: "http://localhost:3000/api/callback",
  });

  const response = await axios.post(
    "https://discord.com/api/oauth2/token",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  res.json(await response.data);
}
