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

    req.session.auth_key = response.data.access_token;
    req.session.auth_type = response.data.token_type;

    res.send(200);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const AUTH_TOKEN = req.session.auth_key;
    const AUTH_TOKEN_TYPE = req.session.auth_type;
    const response = await axios.get(
      "https://discord.com/api/users/@me",
      userCredentialsData({ Authorization: `${AUTH_TOKEN_TYPE} ${AUTH_TOKEN}` })
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function getRefreshedCredentials(req: Request, res: Response) {
  try {
    const response = await axios.post<AuthCredentials>(
      "https://discord.com/api/oauth2/token",
      credentialsData({
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        grant_type: "refresh_token",
        code: req.query.refresh_token as string,
        redirect_uri: "http://localhost:3000/api/callback",
      }),
      axiosConfig()
    );
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}
