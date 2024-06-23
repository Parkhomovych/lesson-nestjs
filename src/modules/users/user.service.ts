import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async verificationPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async findUserByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }

  async findUserById(id: string) {
    return this.UserRepository.findOne({ where: { id } });
  }

  async publicUser(email: string) {
    return await this.UserRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      raw: true,
    });
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.UserRepository.create({ ...dto });
    return this.publicUser(dto.email);
  }

  async updateUser(email: string, dto: UpdateUserDTO) {
    await this.UserRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(dto: DeleteUserDTO) {
    // check user
    const existUser = await this.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.WRONG_DATA);
    const { email, password } = existUser;
    // check password
    const checkPassword = await this.verificationPassword(
      dto.password,
      password,
    );
    if (!checkPassword) throw new BadRequestException(AppError.WRONG_DATA);

    return await this.UserRepository.destroy({ where: { email } });
  }
}
