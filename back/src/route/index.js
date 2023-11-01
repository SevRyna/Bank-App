// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const auth = require('./auth')
const operations = require('./operations')
const notifications = require('./notifications')
// const users = require('./users')
// const recovery = require('./recovery')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', auth)
router.use('/', operations)
router.use('/', notifications)
// router.use('/', users)
// router.use('/', recovery)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
