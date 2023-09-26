// const http = require('http');

// CommonJS => require <- deprecated
/* Now we utilize  ESModules (Don't forget to change the type on the package.json)
on modules we can replace the require keyword with the import keyword */

import http from 'node:http'

// in the latest node, when we import an internal module, node asks us to add a prefix node: before these modules


/*
  Stateful / Stateless

  Stateful - A stateful application will always have some sort of information being stored in the memory, 
  this means that the application depends on informations that are stored on the memory so it can keep working, and as
  soon as the application is closed, and lose its data it will work in a different way that i was executing

  Stateless - A stateless aplication doesn't save anything on the memory, where the informations are saved on external
  devices, such as DB, text files, or anything, whether the server is closed / restarted /it's running, the functioning
  of the app will always remain the same 

  Headers (request, response ) => Metadata

*/

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({ id: 1, name: 'Caio', email: 'caio@example.com' })

    return res.end('user creation')
  }

  res.end('Ciao, Mondo')

})

server.listen(3333)
