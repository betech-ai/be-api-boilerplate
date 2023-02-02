import { OAuth2Client, LoginTicket, TokenPayload } from 'google-auth-library'
import { Injectable, Logger } from '@nestjs/common'
import { Config } from 'src/app/config/Config'
import { TGoogleProfile } from './google.types'

@Injectable()
export class GoogleProvider {
  private client: OAuth2Client;

  constructor(private config: Config, private logger: Logger) {
    this.client = new OAuth2Client({
      clientId:     this.config.google.googleClientId,
      clientSecret: this.config.google.googleClientSecret,
    })
  }

  public async authUserByToken(idToken: string, os: string): Promise<TGoogleProfile | null> {
    try {
      this.logger.log('Google user sign in validation', JSON.stringify({ idToken, os }))

      const ticket: LoginTicket = await this.client.verifyIdToken({
        idToken,
      })

      const user: TokenPayload = ticket.getPayload()

      if (!user) {
        this.logger.warn('Warn on google sign in', idToken)
        return null
      }

      this.logger.log('Google user valid on sign in', JSON.stringify(user))

      return {
        sub:           user.sub!,
        email:         user.email!,
        givenName:     user.given_name!,
        familyName:    user.family_name!,
        name:          user.name!,
        emailVerified: Boolean(user.email_verified),
        avatar:        user.picture,
      }
    } catch (error) {
      this.logger.error('Error on google sign in', error)
      return null
    }
  }
}
