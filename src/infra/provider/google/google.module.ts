import { Module } from '@nestjs/common'
import { LoggerModule } from '../../../app/logger/logger.module'
import { ConfigModule } from '../../../app/config/config.module'
import { GoogleProvider } from './google.provider'

@Module({
  imports:   [ConfigModule, LoggerModule],
  providers: [GoogleProvider],
  exports:   [GoogleProvider],
})
export class GoogleProviderModule { }
