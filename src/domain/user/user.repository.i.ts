import { User } from './user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  getById(id: string): Promise<User>;
  getByDeviceId(deviceId: string): Promise<User>;
  update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>;
}
