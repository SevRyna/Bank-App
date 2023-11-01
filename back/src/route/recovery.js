// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
// const { Session } = require('../class/session')

// ================================================================
router.post('/recovery', function (req, res) {
  const { value } = req.body

  // console.log('recovery value=', value)

  if (!value) {
    return res.status(400).json({
      message: "Помилка2. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(value)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким value не існує',
      })
    }

    Confirm.create(value)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================
router.post('/recovery-confirm', function (req, res) {
  const { code, password } = req.body

  // console.log('rec-confirm...code/confirm', code, password)
  // console.log('rec-confirm...code/confirm', code)
  // console.log('rec-confirm...code/confirm', password)

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    // const email = Confirm.getData(Number(code))
    const value = Confirm.getData(Number(code))

    if (!value) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    // const user = User.getByEmail(email)
    const user = User.getByEmail(value)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким value не існує',
      })
    }

    user.password = password

    // console.log(user)

    // const session = Session.create(user)

    return res.status(200).json({
      message: 'Пароль змінено',
      // session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================


// Підключаємо роутер до бек-енду
module.exports = router
