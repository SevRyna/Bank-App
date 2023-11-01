class Operations {
  static OPERATION_ID = {
    RECIEVED: 1,
    SENT: 2,
  }


  static #list = []

  static #count = 1
  static #id = 1

  constructor({ email, sumN, op_id }) {
    // this.id = Operations.#count++
    this.id = Operations.#id++
    this.email = String(email).toLowerCase()
    this.sum = sumN
    this.op_id = op_id   
    
    let date = new Date()
    this.date = date.getTime()
    
    this.isConfirm = false
    this.img = ''
    this.kind = ''
    // this.ca = ''
    this.time = ''
    this.email2 = ''
  }

  static create(data) {
    const operation = new Operations(data)

    // console.log('this operation=',operation)

    this.#list.push(operation)

    // console.log('operations list=',this.#list)

    return operation
  }

  static getByEmail(email) {
    return this.#list.filter(
      (oper) => oper.email === email,
    )
  }
  static getByOpId(op_id) {
    return this.#list.filter(
      (oper) => oper.op_id === op_id,
    )
  }
  static getByOpIdEmail(op_id, email) {
    return this.#list.filter(
      (oper) => oper.op_id === op_id && oper.email !== email,
    )
  }  
  static getBySendedOpId(op_id) {
    return this.#list.filter(
      (oper) => (oper.op_id === op_id && oper.sum < 0),
    )
  }
  static getByReceivedOpId(op_id) {
    return this.#list.filter(
      (oper) => (oper.op_id === op_id && oper.sum > 0),
    )
  }
  // return this.#list.find((item) => item.token)

  static getNewId() {
    return (
      this.#count++
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }


  static getList = () => this.#list
}

module.exports = {
  Operations,
}
