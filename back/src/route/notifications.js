// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { Notification } = require('../class/notifications')

//=================================================================
//=================================================================
router.post('/geNotiByEmail', function (req, res) {
    const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Будь ласка, перелогіньтесь",
    })
  }  
  try {
    let noti = Notification.getByEmail(email);

    const date = new Date();
    let dateCur = date.getTime();
    let diff, dateNoti, hours, minutes, sec, result;
    for (let i = 0; i <= noti.length - 1; i++) {     
      dateNoti = noti[i].date;
      diff = dateCur - dateNoti;
      hours = Math.floor((diff % 86400000) / 3600000);
      minutes = Math.round(((diff % 86400000) % 3600000) / 60000);  
      sec = Math.round(diff / (60 * 60));
      result = hours + ':' + minutes  + ':' + sec;    
      if( hours !== 0) result = hours; 
      if ( hours !== 0) {
        result = 'h : ' + minutes  + 'min : ' + sec +'sec ago';    
      }else{
        result = minutes  + 'min : ' + sec+ 'sec ago';    
      }
      noti[i].diff = result;
    }   


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
    return res.status(400).json({
      message: 'Помилка отримання нотифікацій',
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
