import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { UseCase, UserRepository } from "@example-api/domain";
import { AuthService } from "../../common/auth/auth-service";

interface requestDto {
  requestId: string;
  userName: string;
  password: string;
}

interface responseDto {
  token: string;
}

export type SigninUseCase = UseCase<requestDto, responseDto>;

@injectable()
export class Signin implements SigninUseCase {
  private readonly userRepository: UserRepository;
  private readonly authService: AuthService;

  public constructor(
    @inject(SYMBOLS.UserRepository)
    userRepository: UserRepository,
    @inject(SYMBOLS.AuthService)
    authService: AuthService
  ) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async execute(requestDto: requestDto): Promise<responseDto> {
    try {
      const { userName, password } = requestDto;
      const user = await this.userRepository.getUserByUserName(userName);
      await this.authService.matchPassword(password, user.password);
      const generateToken = this.authService.generateToken(user);

      return Promise.resolve({
        token: generateToken,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
