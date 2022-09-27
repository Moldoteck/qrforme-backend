import { IsString } from 'amala'

export default class MagicLinkLogin {
  @IsString()
  accessToken!: string
}
