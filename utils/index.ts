import { config } from "dotenv";
import { CredentialsDataType } from "../types";

export function credentialsData({
  client_id,
  client_secret,
  grant_type,
  code,
  redirect_uri,
}: CredentialsDataType) {
  const params = new URLSearchParams({
    client_id,
    client_secret,
    grant_type,
    code,
    redirect_uri,
  });
  return params;
}


export function axiosConfig(){
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "*",
    },
  };
}