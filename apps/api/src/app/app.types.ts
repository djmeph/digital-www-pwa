export type JwtPayload = {
  iss: string;
  aud: string;
  iat: number;
  nbf: number;
  exp: number;
  user_id: number;
  email: string;
};
