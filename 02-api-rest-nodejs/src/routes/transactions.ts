import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto, { randomUUID } from 'node:crypto'

/*
  Cookies <-> ways for us to keep a context between the requisitions

  For example, we don't need to be logged in some social media for it to know who we are in the context of all the requests
  that we do. It means that by the moment that we access some of these sites, he will save some information as an id inside
  our browser, in a way that we don't even notice (after we accept the lgpd agreement), even if we are not logged, the id
  it stores, is a way of the application to be able to validate that the same person, based on the cookies ID, made the requests
  inside the application.

  Once we log in, all that historic of things we've done, even though we were not logged in, are saved in our account.

  Now, we are use going to use cookies for us to know that the same user, which is creating transactions, is the user that
  is listing the transactions
*/

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (req) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    console.log(req.params)

    const { id } = getTransactionsParamsSchema.parse(req.params)

    const transaction = await knex('transactions').where('id', id).first()

    return transaction
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.post('/', async (req, rep) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      rep.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 Days
      })
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return rep.status(201).send()
  })
}
