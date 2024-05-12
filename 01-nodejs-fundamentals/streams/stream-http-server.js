import http from 'node:http'
import { Transform } from 'node:stream'




class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1

    console.log(transformedChunk)

    callback(null, Buffer.from(String(transformedChunk)))
  }
}


// req e res are streams
// req => ReadableStream res => WritableStream 

const server = http.createServer(async (req, res) => {

  /* Here we are doing the same thing as the example on the fundamentals, but instead of us creating the writing and
  reable streams, we can change the readable to req, and writable to res*/
  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)

  /*
  Now if we execute this server, and execute the fake-up-load-http-stream, we are going to be able to see the InverseNumberStream()
  being executed
*/ 

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)


})



server.listen(3334)