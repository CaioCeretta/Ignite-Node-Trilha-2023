import {Database} from './database.js'
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

/*                                   
                                          key val
  Query Parameters: localhost:3333/users?test=1&andoson
  Query parameters are used when we need to have a url stateful
  Let's say we accessed an application and there is an user listing and we want to filter those users t find a specific one
  
  Then let's say we search for users named Jorge and the list is updated then we copy the url and send to someone else

  Then when the people open that same url, the list isn't filtered anymore, so the filter parameters were lost, they weren't
  stored in the URL, so we use this type of parameters to send information that are not sensible and are used to modify
  the answer that the backend will give us.

  So this type is used in filters, pagination, etc. Things that modify the answer and a lot of times are not required.

  Route Parameters:  
  localhost:3333/users/1
  
  Here the 1 is almost part of the address, we use them to identify a resource, in this case, for example, if we are calling
  this route with the method get, we are most likely searching for a user with the id of 1, and different of the query one
  it doesn't need to have a name, because the http method already tells us what the 1 means

  so for example, if we are calling that url with a delete method, we will already understand that we want to delete the 
  user with the id of 1, so basically, it is used to identify one resource and must not be sensitive data

  Body Parameters
  We send this parameters on key values inside the body of a request, like, inside the body we send
  {
    "name": "Jorge",
    "age": 26
  }

  then we will have these on the request.body

*/

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  }, 
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return res.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
      
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const { name, email } = req.body

      database.update('users', id, { name, email })

      return res.writeHead(204).end()

    }
  }
  
]