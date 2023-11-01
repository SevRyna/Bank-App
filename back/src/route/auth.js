// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { Notification } = require('../class/notifications')



User.create({
  email: 'user1@mail.com',
  password: 123,
  id: 1,
})
// Notification.create({
//   email: 'user1@mail.com',
//   notification: 1,
// })

User.create({
  email: 'user2@mail.com',
  password: 123,
  id: 2,
})

User.create({
  email: 'user3@mail.com',
  password: 123,
  id: 3,
})

User.create({
  email: 'Stripe',
  password: 123,
  id: 4,
})


User.create({
  email: 'Coinbase',
  password: 123,
  id: 5,
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})


router.post('/signup', function (req, res) {
  const { email, password } = req.body
  // const id =  User.getNewId();  
  // let id = 4;
  // console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує.',
      })
    }

    const newUser = User.create({ email, password })

    const session = Session.create(newUser)
    Confirm.create(newUser.email)

    const userNotifications = Notification.create({ 
      email: email, 
      notification_id: 1, 
      img: 'png/Danger.png', 
      kind: 'New Login' 
    });

    return res.status(200).json({
      message: 'Користувач успішно зареєстрованний',
      // session,
    })

    // return res.status(200).json({
    //   message: 'Код для відновлення паролю відправлено',
    // })    
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/recovery', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('recovery', {
    // вказуємо назву контейнера
    name: 'recovery',
    // вказуємо назву компонентів
    component: ['back-button', 'field'],

    // вказуємо назву сторінки
    title: 'Recovery page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/recovery', function (req, res) {
  const { email } = req.body
  // console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    Confirm.create(email)

    const userNotifications = Notification.create({ 
      email: email, 
      notification_id: 2, 
      img: 'png/Danger.png', 
      kind: 'Recovery' 
    });

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

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/recovery-confirm', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('recovery-confirm', {
    // вказуємо назву контейнера
    name: 'recovery-confirm',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Recovery confirm page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/recovery-confirm', function (req, res) {
  const { password, code } = req.body
  // console.log(password, code)

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password
    // console.log(user)

    const session = Session.create(user)
    // Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'Пароль змінено',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup-confirm', function (req, res) {

  return res.status(200).json({
    message: 'Ви підтвердили свою пошту',
    // session,
  })

  const { renew, email } = req.query

  if (renew) {
    Confirm.create(email)
  }

  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('signup-confirm', {
    // вказуємо назву контейнера
    name: 'signup-confirm',
    // вказуємо назву компонентів
    component: ['back-button', 'field'],   

    // вказуємо назву сторінки
    title: 'Signup confirm page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup-confirm', function (req, res) {
  // const { code, token } = req.body
  const { code } = req.body

  const token = Session.get(token);
  console.log('token===', Session.get(token)) 

  const xxx = Session.get(token)
  console.log('token==', Session)
  // co1nst token = ??????????????
  console.log('post')
  console.log('body=', req.body)
  // console.log('token', Session.get(token))
  console.log('token=', Session.getList())

  if (!code || !token) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const session = Session.get(token)

    if (!session) { 
      return res.status(400).json({
        message: 'Помилка. Ви не увійшли в аккаунт',
      })
    }

    // const email = Confirm.getData(code)

    const email = Confirm.getData(Number(code))

    console.log('email - recovery='. email)    

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true
    session.user.isConfirm = true

    return res.status(200).json({
      message: 'Ви підтвердили свою пошту',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/login', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('login', {
    // вказуємо назву контейнера
    name: 'login',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Login page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/login', function (req, res) {
  const { email, password } = req.body
  // console.log('login route=', req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
      code: 1,
    })
  }

  try {
    const user = User.getByEmail(email)
    // console.log('user=', user)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email не існує.',
          code: 2,
      })
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Пароль не підходить',
        code: 3,
      })
    }

    // console.log('Ви увійшли');
 
    // console.log('email=', email)
    const userNotifications = Notification.create({ 
      email: email, 
      notification_id: 1, 
      img: 'png/Danger.png', 
      kind: 'Login' 
    });
    // console.log('userNotifications =',userNotifications);
    // const nota = notificationService.getByEmail(email);
    const nota = Notification.getByEmail(email);
    // console.log('noti auth getByEmail=',nota);

    // saveSession(null);

    const session = Session.create(user)
    Confirm.create(user.email)

    return res.status(200).json({
      message: 'Ви увійшли',
      session,
      code: 0,
      email: email,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      code: 4,
    })
  }
})

router.post('/logout', function (req, res) {
  
  const { email} = req.body
  // console.log('login route=', req.body)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
      code: 1,
    })
  }

  try {
    const user = User.getByEmail(email)
    // console.log('user=', user)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email не існує.',
          code: 2,
      })
    }
    const result = Session.clearUserSesion(user)

    return res.status(200).json({
      message: 'Вашу сесію знищено',
      code: 0,
      result,
      email: email,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      code: 4,
    })
  }
})

router.get('/getUser', function (req, res) {
  // const { email, password } = req.body
  // console.log(Session.user);
  try {
    const user = Session.getUser();
    // console.log('user=', user)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Звернться до адміна',
          code: 2,
      })
    }

    return res.status(200).json({
      message: 'Ви зареєстровані',
      user,
      code: 0,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      code: 4,
    })
  }
})
//===========================================================

router.post('/change-email', function (req, res) { 
  const { email, newEmail, password } = req.body
  console.log('login route=', req.body)

  if (!email || !newEmail || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
      code: 1,
    })
  }

  try {
    const user = User.getByEmail(email)
    // console.log('user=', user)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з email-oм '+email+' не існує.',
          code: 2,
      })
    }
    const user2 = User.getByEmail(newEmail)
    // console.log('user=', user2)

    if (user2) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email-oм '+email+' вже зареєстрований.',
          code: 2,
      })
    }    

    if (user.password !== password) {
      return res.status(400).json({
        message: 'Помилка. Пароль не підходить',
        code: 3,
      })
    }

    // console.log('Ви увійшли');
 
    // console.log('oldEmail=', email)
    const userNotifications = Notification.create({ 
      email: email, 
      notification_id: 4, 
      img: 'png/Danger.png', 
      kind: 'Email changing' 
    });
    // console.log('userNotifications =',userNotifications);
    
    const result = User.changeEmail(email, newEmail)
    if(!result) {
      return res.status(400).json({
        message:
          'Помилка зміни Email.',
          code: 4,
      })      
    }

    return res.status(200).json({
      message: 'Ви успішно змінили Email !',
      // session,
      code: 0,
      email: newEmail,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      code: 4,
    })
  }
})
//=====================================================

router.post('/change-password', function (req, res) { 
  // const { email, oldPassword, newPassword } = req.body
  // console.log('changePassw route=', req.body)

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
      code: 1,
    })
  }

  try {
    const user = User.getByEmail(email)
    // console.log('user=', user)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з email-oм '+email+' не існує.',
          code: 2,
      })
    }
     

    if (user.password !== oldPassword) {
      return res.status(400).json({
        message: 'Помилка. Старий пароль не підходить',
        code: 3,
      })
    }

    // console.log('Ви увійшли');
 
    // console.log('oldEmail=', email)
    const userNotifications = Notification.create({ 
      email: email, 
      notification_id: 3, 
      img: 'png/Danger.png', 
      kind: 'Password changing' 
    });
    // console.log('userNotifications =',userNotifications);
    
    const result = User.changePassword(email, newPassword)
    if(!result) {
      return res.status(400).json({
        message:
          'Помилка зміни паролю!',
          code: 4,
      })      
    }

    return res.status(200).json({
      message: 'Ви успішно зміни пароль !',
      // session,
      code: 0,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      code: 4,
    })
  }
})
//=====================================================
// Підключаємо роутер до бек-енду
module.exports = router
