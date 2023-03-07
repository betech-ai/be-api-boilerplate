export type DeleteTokenInput = {
  userId?: string;
  token?: string;
};

export interface IAuthRepository {
  getTokenByUserId(userId: string): Promise<string>;
  getUserIdByToken(token: string): Promise<string>;
  setToken(userId: string, token: string): Promise<void>;
  deleteToken(input: DeleteTokenInput): Promise<void>;
}
