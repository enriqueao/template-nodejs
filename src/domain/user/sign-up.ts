import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { UseCase, UserRepository } from "@example-api/domain";
import { AuthService } from '../../common/auth/auth-service';

interface requestDto {
  requestId: string;
  userName: string;
  password: string;
}

interface responseDto {
  userName: string;
}

export type SignupUseCase = UseCase<requestDto, responseDto>;

@injectable()
export class Signup implements SignupUseCase {
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
      console.log({ requestDto });
      const hashPassword = this.authService.hashPassword(password);
      await this.userRepository.create({
        userName,
        password: hashPassword,
      });

      return Promise.resolve({
        userName,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
