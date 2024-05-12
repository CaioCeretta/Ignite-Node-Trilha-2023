import { Readable, Transform, Writable } from 'node:stream'

//Nerflix & Spotify

// Imports made by client via CSV
// 1gb - 1.000.000
// can be made by a simple POST request, like /upload import csv
/* If in this case, we are using node, and we are not using the stream functionality, it will read the file and after it
reads it, he will run through the full file and doing all the db operations and it would take too long.
let's say we have an internet that has a 10mg/s upload and we are running it on a 1gb file,
it would take 100s to read all the file, and then more time to execute the request functionality.
When we are using streams, on the same file example, while we are doing the file upload, at 10mb/s, and our app readed,
per example, 10000 lines, we will already insert these lines before waiting for the reading completion.
That is the concept of stream, we can read the file and little by little, as we read, we work on the lines that were
already read. We can simultaneously do the two things at the same time   */


//Streams ->

// process.stdin
//   .pipe(process.stdout)


//Readable Streams

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
    if(i > 100) {
      this.push(null)
      //When we send null we are saying that there isn't anything else to be sent on this stream
    } else {
      const buf = Buffer.from(String(i))
      this.push(buf)
    }
    }, 1000)
  }
  
}

//Write Streams

class MultiplyByTenSteam extends Writable {
  /*
    Chunk: Everything we already sent from the this.push, the writing stream, is a chunk
    Encoding: How this information is codified
    callback: What is done after it finished doing what it was needed with that information
  */
  
  _write(chunk, encoding, callback) {
    /*Inside a writable stream we don't return anything, it just process the data, and never transform a data into one other
    thing*/
    console.log(Number(chunk.toString()) * 10)
    callback();
  }
}

class InverseNumberStream extends Transform {
  /* The transformation streams transform one chunk to another.
  Just as the writable, it receives the same 3 oparameters, the difference is that instead of doing that console.log, and
  send the data as we want to, we are going to get the chunk, transform it into a string, and make it multiplied by -1.

  Now, when we call the callback, we'll send the first parameter, which is an error, as null, 
  the second parameter is the transformed value
  */
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformedChunk)))
  }
}

//It will read our stream, and while it reads, it's going to print it on the terminal
new OneToHundredStream().pipe(process.stdout)

/**Here we are going to read data from a stream, which is returning which is returning numbers from 0 to 100, and then 
 * writing this data inside of a writable stream.
 * 
 * So basically we are reading line by line and transforming each line what we are receiving, without the need of the whole
 * file being read
*/
new OneToHundredStream().pipe(new MultiplyByTenSteam())

/*
  Here we are getting the stream that has been read, then after it we are calling the pipe with those numbers and transforming
  each one of them to negative, then, after transforming, we are multiplying by 10

*/
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenSteam())