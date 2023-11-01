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
    // return this.user;
    // console.log('sess-user=',this.#list[0].user.email)
    return this.#list[0].user.email
  }

  static get = (token) => {
    Session.code = Session.get(token)
    // console.log('sess-code=',Session.code)
    return this.#list.find((item) => item.token)
    // return (
    //   this.#list.find((item) => item.token === token) ||
    //   null
    // )
  }

  static clearAllSesion() {
    this.#list = [];
  }

  static clearUserSesion(user) {
    const list = this.#list
    // console.log('sess list=', list)
    let el = user;  //// То по що ми шукаєм
    this.#list = list.filter(item=>item.email !== el);    
    // console.log('sess list=', list)
    return true
  }
}

module.exports = {
  Session,
}

console.log(Session.generateCode())
