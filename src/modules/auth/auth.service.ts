import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { UserService } from '../users/user.service';
import { AppError } from 'src/common/constants/errors';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
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
    const user = await this.userService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const validatePassword = await bcrypt.compare(dto.password, user.password);
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);

    const token = await this.tokenService.generateJwtToken(dto.email);
    return {
      ...user,
      token,
    };
  }
  async logoutUser() {}
}
