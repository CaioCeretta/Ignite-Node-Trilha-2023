import { Readable } from 'node:stream'

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

class OneToHundredStream extends Readable {
  index = 1

  _read() {

    setTimeout(() => {
      const i = this.index++

      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

new OneToHundredStream().pipe(process.stdout)