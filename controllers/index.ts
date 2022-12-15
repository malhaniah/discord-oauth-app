import { Request, Response } from "express";
import { axiosConfig, credentialsData } from "../utils";
import { AuthCredentials } from "../types";
import axios from "axios";
import session from 'express-session';

export async function getCredentials(req: Request, res: Response) {
  try {
    const response = await axios.post<AuthCredentials>(
      "https://discord.com/api/oauth2/token",
      credentialsData({
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        grant_type: "authorization_code",
        code: req.query.code as string,
        redirect_uri: "http://localhost:3000/api/callback",
      }),
      axiosConfig()
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req: Request, res: Response) {}

export async function getCredentialsRefreshed(req: Request, res: Response) {}
