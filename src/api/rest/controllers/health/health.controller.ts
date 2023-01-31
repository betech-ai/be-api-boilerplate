import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
export class HealthController {
  @Get('ping')
  @ApiOperation({ summary: 'API health check' })
  ping(): string {
    return 'pong';
  }

}