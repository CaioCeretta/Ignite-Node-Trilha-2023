import 'dotenv/config'
import { z } from 'zod'

// Here we will validate our env variables

/*  It is also common for us to have an environment variable of PORT, because some web hostings, are going to set this port 
  in an automated way, we are not the ones choosing that port, so we need to have this env variable to be possible
  for these external means, inform to our application which port it will use when uploading the http server

  What coerce will do, is take some data, regardless of its type, and convert it to the type that i specify immediately
  after it
*/

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format)

  throw new Error('Invalid environment variables')
}

export const env = _env.data
