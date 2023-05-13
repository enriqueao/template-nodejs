import { Container } from 'inversify';
import { SYMBOLS } from '@example-api/config/symbols';
import {
  AuthService,
  CacheService,
  IAuthService,
} from '@example-api/common';
import { BaseController } from '../../controllers/base-controller';
import {
  UserSignupController,
  UserSigninController,
} from "@example-api/controllers";
import {
  RedisImpl,
  UserRepositoryImpl,
} from '@example-api/data-access';
import {
  UserRepository,
  SignupUseCase,
  Signup,
  SigninUseCase,
  Signin
} from '@example-api/domain';


const container = new Container({ defaultScope: 'Singleton' });
container.bind<CacheService>(SYMBOLS.CacheService).to(RedisImpl);
container.bind<IAuthService>(SYMBOLS.AuthService).to(AuthService);

container.bind<BaseController>(BaseController).toSelf();

container
  .bind<UserSignupController>(UserSignupController)
  .toSelf();
container
  .bind<UserSigninController>(UserSigninController)
  .toSelf();

container.bind<SignupUseCase>(SYMBOLS.SignupUseCase).to(Signup);
container.bind<SigninUseCase>(SYMBOLS.SigninUseCase).to(Signin);

container.bind<UserRepository>(SYMBOLS.UserRepository).to(UserRepositoryImpl);


export { container };
