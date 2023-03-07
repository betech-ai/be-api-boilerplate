import { Body, Controller, Get, Patch, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../../../domain/user/user.service';
import { GetUserResponse, UpdateUserBody, UpdateUserResponse } from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get user' })
  public async getUser(@Request() req): Promise<GetUserResponse> {
    const res = await this.userService.get(req.user.id);

    return {
      data: {
        id: res.id,
        deviceId: res.deviceId,
        name: res.name,
        age: res.name,
      }
    };
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update user' })
  async updateUser(
    @Req() req,
    @Body() updateUserBody: UpdateUserBody
  ): Promise<UpdateUserResponse> {
    const res = await this.userService.update(req.user.id, updateUserBody);

    return {
      data: {
        id: res.id,
        deviceId: res.deviceId,
        name: res.name,
        age: res.name,
      }
    };
  }
}
