class Notification { 

    static NOTIFICATION_ID = {
    LOGIN: 1,
    RECOVERY: 2,
    PASSWORD_CHANGE: 3,
    EMAIL_CHANGE: 4,    
    RECEIVED: 5,
    SENT: 6,
  }
  static #id = 1
  static #list = []


   constructor({email, notification_id, img, kind}) {
      this.id = Notification.#id++
      // this.email = String(email).toLowerCase()
      this.email = email
      this.notification = notification_id
      this.isConfirm = false
      this.img = img
      this.kind = kind
      const date = new Date();
      this.date = date.getTime()
      const showTime = date.getHours() 
          + ':' + date.getMinutes();      
      this.time = showTime;
    }

  static create(data) {
    const operation = new Notification(data)

    this.#list.push(operation)

    return operation
  }

  static getByEmail(email) {
    return this.#list.filter(
      (notification) => notification.email === email,
    )
  }
  static getList = () => this.#list
}

module.exports = {
  Notification,
}
