import { IsString, IsBoolean, IsObject, IsNotEmpty } from 'class-validator';

export class LoginResponseData {
  @IsString() accessToken: string;
  @IsString() refreshToken: string;
}

export class LoginBody {
  @IsString() @IsNotEmpty() readonly deviceId: string;
}

export class LoginResponse {
  @IsBoolean() success: boolean;
  @IsObject() data: LoginResponseData;
}

export class RefreshBody {
  @IsString() @IsNotEmpty() refreshToken: string;
}

export class RefreshResponse {
  @IsBoolean() success: boolean;
  @IsObject() data: LoginResponseData;
}
