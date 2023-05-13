export interface IAuthService {
  generateToken(data: any): any;
  verifyToken(token: string): any;
  matchPassword(password, hash);
  hashPassword(plainPassword): string;
}