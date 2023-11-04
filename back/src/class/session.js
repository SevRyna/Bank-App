class Session {
  static #list = []

  constructor(user) {
    this.token = Session.generateCode()
    this.user = {
      email: user.email,
      id: user.id,
    }
  }

  static generateCode = () => {
    const length = 6
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }

    return result
  }

  static create = (user) => {
    const session = new Session(user)

    this.#list.push(session)

    return session
  }

  static getUser() {
    return this.#list[0].user.email
  }

  static get = (token) => {
    // Session.code = Session.get(token)
    // Session.code = Session.get(token)
    return this.#list.find((item) => token)
  }

  static clearAllSesion() {
    this.#list = [];
  }

  static clearUserSesion(user) {
    const list = this.#list
    let el = user;  //// То по що ми шукаєм
    this.#list = list.filter(item=>item.email !== el);   
    return true
  }
  static getList = () => this.#list
}

module.exports = {
  Session,
}

console.log(Session.generateCode())
