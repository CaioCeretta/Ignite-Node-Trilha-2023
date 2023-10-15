/* Buffer is something that node already has internally
it's basically a representation of a memory space inside a computer, used to transit data  of a quick manner, these
datas are stored to be quickly trated and sent to another place and thereafter, be removed, they are ways for us to
be able to save and read from the memory, in a performatic way, node uses this buffer model on writing and reading of
streams, because it's easier for us to partially read an information on a binary way, than to read a string.
things like accents, special characters, with a much havier encoding to be read, buffer, on the otherhand, exist inside
node mainly because of the difficulty to read binary data. */

// const buf = Buffer.from('ok')
const buf = Buffer.from('ciao')

// console.log(buf) // 6f - o | 6b - b
console.log(buf) // 63 - h | i - 69 | a - 61 | o - 6f

console.log(buf.toJSON()) // This will transform into decimals, 
 