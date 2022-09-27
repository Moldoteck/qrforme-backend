import { Body, Controller, Ctx, Post } from 'amala'
import { Context } from 'koa'
import { findOrCreateUser } from '@/models/User'
import { forbidden } from '@hapi/boom'
import GoogleLogin from '@/validators/GoogleLogin'
import getGoogleUser from '@/helpers/getGoogleUser'
import MagicLinkLogin from '@/validators/MagicLinkLogin'

@Controller('/login')
export default class LoginController {
  @Post('/google')
  async google(@Body({ required: true }) { accessToken }: GoogleLogin) {
    const userData = await getGoogleUser(accessToken)
    const user = await findOrCreateUser({
      email: userData.email,
    })
    return user.strippedAndFilled({ withExtra: true })
  }

  @Post('/magiclink')
  async magiclink(@Body({ required: true }) { accessToken }: MagicLinkLogin) {
    const userData = await getMagicUser(accessToken)
    const user = await findOrCreateUser({
      email: userData.email,
    })

    return user.strippedAndFilled({ withExtra: true })
  }
}
