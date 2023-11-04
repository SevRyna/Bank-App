// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

// ================================================================
router.post('/recovery', function (req, res) {
  const { value } = req.body

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

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const value = Confirm.getData(Number(code))

    if (!value) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByEmail(value)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким value не існує',
      })
    }

    user.password = password

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
