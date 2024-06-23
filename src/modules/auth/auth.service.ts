import { BadRequestException, Injectable } from '@nestjs/common';

import { TokenService } from '../token/token.service';
import { UserService } from '../users/user.service';
import { AppError } from 'src/common/constants/errors';
import { CreateUserDTO } from '../users/dto';
import { RefreshTokenDTO, UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);

    return this.userService.createUser(dto);
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    // check user
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.WRONG_DATA);
    const { email, password, firstName } = existUser;
    // check password
    const checkPassword = await this.userService.verificationPassword(
      dto.password,
      password,
    );
    if (!checkPassword) throw new BadRequestException(AppError.WRONG_DATA);

    const userData = {
      name: firstName,
      email: email,
    };
    // JWT
    const token = await this.tokenService.generateToken(userData);
    const refreshToken = await this.tokenService.generateRefreshToken(userData);
    await this.userService.updateUser(email, { token, refreshToken });
    // response
    const user = await this.userService.publicUser(dto.email);
    return user;
  }

  async logoutUser(email: string) {
    await this.userService.updateUser(email, {
      token: null,
      refreshToken: null,
    });
  }

  async refreshToken(dto: RefreshTokenDTO) {
    const validateRefreshToken = await this.tokenService.verifyRefreshToken(
      dto.refreshToken,
    );

    const user = await this.userService.findUserByEmail(
      validateRefreshToken.user.email,
    );
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const token = await this.tokenService.generateToken(
      validateRefreshToken.user,
    );
    await this.userService.updateUser(user.email, { token });

    return { token };
  }
}
