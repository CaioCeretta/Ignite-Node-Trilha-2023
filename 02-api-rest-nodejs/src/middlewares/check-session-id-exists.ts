/*
  A basic middleware behavior, is that if we don't have any return inside of it, it will pass and it will not understand
  that any error happenned
*/

import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const sessionId = req.cookies.sessionId

  if (!sessionId) {
    return rep.status(401).send({
      error: 'Unauthorized',
    })
  }
}
