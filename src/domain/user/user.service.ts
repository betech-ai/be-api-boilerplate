import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.i';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) { }

  public async create(user: Partial<User>): Promise<User> {
    let currentUser = await this.userRepository.getByDeviceId(user.deviceId);
    if (!currentUser) {
      currentUser = await this.userRepository.create(user);
    }

    return currentUser;
  }

  public async get(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  public async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    return await this.userRepository.update(id, data);
  }
}
