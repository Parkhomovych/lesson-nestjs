import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  async findUserByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }
  async findUserById(id: string) {
    console.log(1);

    return this.UserRepository.findOne({ where: { id } });
  }

  async publicUser(email: string) {
    return this.UserRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.UserRepository.create({ ...dto });
    return dto;
  }
  async updateUser(email: string, dto: UpdateUserDTO) {
    await this.UserRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser() {}
}
