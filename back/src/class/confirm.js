class Confirm {
    static #list = []
  
    constructor(data) {
      // console.log('data constructor=', data)
      this.code = Confirm.generateCode()
      this.data = data
    }
  
    static generateCode = () =>
      Math.floor(Math.random() * 9000) + 1000
  
    static create = (data) => {
      this.#list.push(new Confirm(data))
  
      setTimeout(() => {
        this.delete(code)
      }, 24 * 60 * 60 * 1000) // 24 години у мілісекундах
  
      console.log(this.#list)
    }   
  
    static delete = (code) => {
      const length = this.#list
  
      this.#list = this.#list.filter(
        (item) => item.code !== code,
      )
  
      return length > this.#list.length
    }
  
    static getData = (code) => {
      const obj = this.#list.find(
        (item) => item.code === code,
      )
  
      return obj ? obj.data : null
    }

    static getData2(code) {
      return this.#list.filter(
        (item) => item.code === code,
      )
    }

    static getByEmail(email) {
      return this.#list.filter(
        (item) => item.data === email,
      )
    }    

    static getByEmail2 = (email) => {
      return this.#list.find((item) => email)
    }

    static getList = () => this.#list

  }
  
  module.exports = {
    Confirm,
  }
  