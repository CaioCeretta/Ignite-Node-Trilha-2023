import { app } from '@/app'
import { env } from '@/env'

app
  .listen({
    // Don't forget to pass the host, it will avoid some possible problems
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
