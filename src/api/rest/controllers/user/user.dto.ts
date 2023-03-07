import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDate, IsOptional,
} from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class User {
  @IsString() @IsNotEmpty() @IsUUID() id: string;
  @IsString() @IsNotEmpty() deviceId: string;
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() age?: string;
  @IsDate() createdAt?: Date;
}


export class GetUserResponse {
  @Type(() => User) data: User;
}

export class UpdateUserBody extends PickType(User, ['name', 'age'] as const) {}

export class UpdateUserResponse {
  @Type(() => User) data: User;
}
