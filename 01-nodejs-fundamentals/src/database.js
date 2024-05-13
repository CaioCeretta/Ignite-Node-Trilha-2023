import fs from 'node:fs/promises'


const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    })
      .catch(() => {
        this.#persist()
      })

  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    /* If there is nothing on this.database[table], the assignment after the ?? means that, "if there is nothing"*/
    const data = this.#database[table] ?? []

    return data;
  }


  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    console.log(rowIndex)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }


  }

  update(table, id, data) {

    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    console.log(rowIndex)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }

      this.#persist()
    }

  }

  select(table, search) {
    let data = this.#database[table] ?? []

    /* 
      If we have an object like { name: 'Caio', email: 'caioceretta@gmail.com' }

      object.entries will be [ ['name', 'Caio'], ['email', 'caioceretta@gmail.com']]

      so it is the key on the first index of an array than the value in the other
    */

    if (search) {
      console.log(Object.entries(search))

      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }

    return data
  }
}