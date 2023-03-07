import { Request, Controller, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../../domain/auth/auth.service';
import { LoginBody, LoginResponse } from './auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    type: LoginBody,
  })
  @ApiOkResponse({
    type:   LoginResponse,
    status: HttpStatus.OK,
  })
  public async loginUser(@Request() req): Promise<LoginResponse> {
    return {
      success: true,
      data:    await this.authService.login(req.user),
    };
  }
}
