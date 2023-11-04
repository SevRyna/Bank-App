class User {
  static USER_ID = {
    USER: 1,
    USER: 2,
    USER: 3,
  }

  static #list = []

  static #count = 1

  constructor({ email, password, id }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }

  static create(data) {
    const user = new User(data)
    // console.log(user)

    this.#list.push(user)

    return user
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }
  static changeEmail(email, newEmail) {
    const list = User.getList()
    let el = email;  //// То по що ми шукаєм
    let index = list.findIndex(item=>item.email === el);   
    return true
  }
  static changePassword(email, newPassword) {
    const list = User.getList()
    let el = email;  //// То по що ми шукаєм
    let index = list.findIndex(item=>item.email === el);   
    this.#list[index].password = newPassword;
    return true
  }

  static getNewId() {
    return (
      this.id++
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }

  static newPassword({email,oldPassword, newPassword}){
      const user = this.getByEmail(email);
  }

  static getList = () => this.#list
}

module.exports = {
  User,
}
