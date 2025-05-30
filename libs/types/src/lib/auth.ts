export type JwtPayload = {
  iss: string;
  aud: string;
  iat: number;
  nbf: number;
  exp: number;
  user_id: number;
  email: string;
};

export interface AuthState {
  checking: boolean;
  isAuthenticated: boolean;
  backdrop: boolean;
  jwtPayload: JwtPayload | null;
  logout: () => void;
  checkAuth: () => void;
  enableBackdrop: () => void;
}
