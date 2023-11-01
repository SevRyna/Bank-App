// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { Notification } = require('../class/notifications')

//=================================================================
//=================================================================
router.post('/geNotiByEmail', function (req, res) {
    const { email } = req.body
  // console.log('body route noti=', req.body)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Будь ласка, перелогіньтесь",
    })
  }  
  // console.log('operations list===============================')
  try {
    let noti = Notification.getByEmail(email)
    // console.log('noti getNoti=', noti)
    
    const list = Notification.getList()
    // console.log('list getNoti=', list)

    let dateCur;
    // let diff;
    // for (let i = 0; i <= noti.length - 1; i++) {
    //   let dateCur = date.getTime();
      // diff = dateCur - Number(noti[i].date);
      // diff /= (60 * 60);
      // noti[i].diff = Math.abs(Math.round(diff));
    // }    



    if (!noti) {
      return res.status(400).json({
        message: 'За вашим аккаунтом не знайдено нотифікацій',
      })
    }

        return res.status(200).json({
      //message: 'Ваші операції',
      noti, 
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка отримання нотифікацій',
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
