import { Injectable, Provider } from '@nestjs/common';
import { User } from '../../../domain/user/user.entity';
import { IUserRepository } from '../../../domain/user/user.repository.i';
import { DatabaseService } from '../../database/database.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
class Repository implements IUserRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) { }

  private fromEntity(user: Partial<User>): Omit<UserModel, 'updatedAt'> {
    return {
      ...user,
    } as UserModel;
  }

  private toEntity(data: UserModel): User {
    return new User(data);
  }

  public async create(user: Partial<User>): Promise<User> {
    const newUser = await this.databaseService.user.create({
      data: {
        ...this.fromEntity(user),
      },
    });

    return this.toEntity(newUser);
  }

  public async getById(id: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  public async getByDeviceId(deviceId: string): Promise<User> {
    const user = await this.databaseService.user.findFirst({
      where: { deviceId },
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  public async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const updatedUser = await this.databaseService.user.update({
      where: {
        id: id,
      },
      data,
    });

    return updatedUser && this.toEntity(updatedUser);
  }
}

export const UserRepository: Provider = {
  provide: 'UserRepository',
  useClass: Repository,
};
