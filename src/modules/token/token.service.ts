import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type userData = {
  name: string;
  email: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: userData) {
    const payload = { user };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('secret_jwt'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }
  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('secret_jwt'),
      });
    } catch (e) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
  async generateRefreshToken(user: userData) {
    const payload = { user };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('secret_refresh_jwt'),
      expiresIn: this.configService.get('expire_refresh_jwt'),
    });
  }
  async verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('secret_refresh_jwt'),
      });
    } catch (e) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
