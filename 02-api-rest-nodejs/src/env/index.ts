import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid environment variables')
}

/*
  What is happening abvove is that the parse method will get its argument, in our case, the process.env, and then see zod
  will see if our process.env is valid, and if it's not, parse will trigger an error.
  In our case we will use safeParse, which is similar to parse, but it won't trigger an error if the validation fails
*/

export const env = _env.data
