import { v4 as uuid } from 'uuid';

export class User {
  public id: string;
  public deviceId: string;
  public name: string | null;
  public age: string | null;

  constructor(data: Partial<User>) {
    this.id = data.id || uuid();
    this.deviceId = data.deviceId;
    this.name = data.name || null;
    this.age = data.age || null;
  }
}
