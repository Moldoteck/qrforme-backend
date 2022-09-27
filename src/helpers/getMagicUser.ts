import axios from 'axios'
//import from magic
import { Magic } from 'magic-sdk'
import env from '@/helpers/env'

const magic = new Magic(env.MAGIC_PRIVATE_KEY)

interface MagicResponse {
  email: string
}

export default async function getMagicUser(
  accessToken: string
): Promise<MagicResponse> {
  try {
    const didToken = accessToken.substr(7)

    await magic.token.validate(didToken)

    res.status(200).json({ authenticated: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  return (
    await axios(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`
    )
  ).data
}
