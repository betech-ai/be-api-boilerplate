import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export class ListOptions {
  @IsNumber() @IsPositive() @IsInt() @IsOptional() readonly skip?: number;
  @IsNumber() @IsPositive() @IsInt() @IsOptional() readonly limit?: number;
  @IsString() @IsEnum(SortDirection) @IsOptional() readonly sort?: SortDirection;
}
