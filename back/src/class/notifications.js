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
      // this.diff = 0;
    }

  static create(data) {
    const operation = new Notification(data)

    // console.log('this operation=',operation)

    this.#list.push(operation)

    // console.log('operations list=',this.#list)

    return operation
  }

  static getByEmail(email) {
    return this.#list.filter(
      (notification) => notification.email === email,
    )
  }

  // static getList() {
  //   return this.#list
  // }
  static getList = () => this.#list
  // getByEmail(email) {
  //   // return Notification.filter(notification => notification.email === email);
  //   return this.notifications.filter(notification => notification.email === email);
  // }
}

module.exports = {
  Notification,
}

//////////////////////////IRA