import { Request, Response } from "express";
import { axiosConfig, credentialsData, userCredentialsData } from "../utils";
import { AuthCredentials } from "../types";
import axios from "axios";
import session from "express-session";
import router from "../routers";

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

    res.cookie("AUTH_TOKEN", response.data.access_token, {
      maxAge: response.data.expires_in * 60,
      secure: true,
    });

    res.cookie("AUTH_TYPE", response.data.token_type, {
      maxAge: response.data.expires_in * 60,
      secure: true,

    });

    res.send(200);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const AUTH_TOKEN = req.cookies.AUTH_TOKEN;
    const AUTH_TYPE = req.cookies.AUTH_TYPE;
    const response = await axios.get(
      "https://discord.com/api/users/@me",
      userCredentialsData({ Authorization: `${AUTH_TYPE} ${AUTH_TOKEN}` })
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function getCredentialsRefreshed(req: Request, res: Response) {}
