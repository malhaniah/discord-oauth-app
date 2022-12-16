export interface AuthCredentials {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface CredentialsDataType {
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri: string;
}

export interface UserCredentialsDataType {
  Authorization: string;
}