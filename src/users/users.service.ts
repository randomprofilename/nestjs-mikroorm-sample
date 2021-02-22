import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private _usersRepository: EntityRepository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this._usersRepository.find({});
  }

  async getUser(id: string): Promise<UserEntity> {
    return this._usersRepository.findOneOrFail({ id });
  }

  async createUser(name: string): Promise<UserEntity> {
    const user = this._usersRepository.create({ name });

    await this._usersRepository.persistAndFlush(user);

    return user;
  }
}
