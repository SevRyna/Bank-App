// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { Operations } = require('../class/operations')
// const { Confirm } = require('../class/confirm')
// const { Session } = require('../class/session')
const { User } = require('../class/user')
const { Notification } = require('../class/notifications')

Operations.create({
  email: 'user1@mail.com',
  sumN: 125,
  op_id: 1,
  id: 1,
})

Operations.create({
  email: 'user2@mail.com',
  sumN: -125,
  op_id: 1,
  id: 2,
})

Operations.create({
  email: 'user1@mail.com',
  sumN: -225,
  op_id: 2,
  id: 3,
})

Operations.create({
  email: 'user2@mail.com',
  sumN: 225,
  op_id: 2,
  id: 4,
})

const handleLike = (oper2) => { 
  let contr_agent = '';
  let sum_res = 0; 
  let date;
  let showTime;

  let oper = oper2
  // let oper_email;
  // let user_email = String(email).toLowerCase();
  for (let i = 0; i <= oper.length - 1; i++) {

      if(oper[i].sum < 0){
        oper[i].kind = 'Sending';
        contr_agent = Operations.getByReceivedOpId(oper[i].op_id);
        // contr_agent = Operations.getBySendedOpId(oper[i].op_id);
        console.log('received=', contr_agent);
      }else{
        oper[i].kind = 'Receipt';
        contr_agent = Operations.getBySendedOpId(oper[i].op_id);
        // contr_agent = Operations.getByReceivedOpId(oper[i].op_id);
        console.log('sended=', contr_agent);
      }
      contr_agent = contr_agent[0]['email'];
      oper[i].img = '/svg/man.svg';
      // console.log('contr_agent=',contr_agent);
      if(contr_agent === 'stripe' || contr_agent === 'Stripe') {
        oper[i].img = '/png/S.png';
      }else if(contr_agent === 'coinbase' || contr_agent === 'Coinbase') {
        oper[i].img = '/png/C.png';
      }else{
        oper[i].img = '/svg/man.svg';
      }
        // console.log('contr_agent=', contr_agent);
        oper[i].email2 = contr_agent;
        // oper[i].ca = contr_agent;
      
    // }
    date = new Date();
    showTime = date.getHours() 
        + ':' + date.getMinutes();      
    oper[i].time = showTime;
    sum_res += oper[i].sum;
  }   
  return oper;
}

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/operations', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  return res.render('operations', {
    // вказуємо назву контейнера
    name: 'operations',
    // вказуємо назву компонентів
    component: ['back-button', 'field', 'field-password'],

    // вказуємо назву сторінки
    title: 'Balance page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
})

// ================================================================

router.post('/send', function (req, res) {
  const { email, sum, op_id } = req.body
  // const id =  User.getNewId();  
  // let id = 4;
  console.log('sent to route=',req.body)

  // op_id = 2

  if (!email || !sum || !op_id) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  // console.log('send2 route=',req.body)

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    const sumN = Number(sum);
    // console.log('send3 route=',req.body)
    // console.log('sumN1 =', typeof sumN);
    // console.log('sumN1 =', sumN);
    if (typeof sumN !== 'number') {
      // console.log('sumN2 =', typeof sumN);
      return res.status(400).json({
        message: 'Не коректне значення суми ',
      })
    }  
    // console.log('send route=',req.body) 
    // console.log('sumN3 =', sumN);
    // const newOperation = Operations.create({ email, sumN, op_id })

    // console.log('email=', email)

    const newOperation = Operations.create({
      email: email,
      sumN: sumN,
      op_id: 1,
      id: 1,
    })


    // console.log('send4 route=',req.body)

    // const session = Session.create(newOperation)

    // console.log('send5 route=',req.body)

    Confirm.create(newOperation.email)

    // console.log('send6 route=',req.body)
    // const list = getById(id)
    // const list = Operations.getByEmail({
    //   email: email,
    // })
    const list = Operations.getByEmail(email)
    // console.log('email=',email,' list=',list);

    return res.status(200).json({
      message: 'Сума успішно переведена',
      // session,
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка створення переказу суми',
    })
  }
})

// ================================================================

router.post('/receive', function (req, res) {
  const { emails, emailr, sum, op_id } = req.body
  // console.log('sent to route=',req.body)
  // op_id = 2
  if (!emails || !emailr || !sum || !op_id) {
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

    const sumN = Number(sum);
    // console.log('sumN1 =', sumN);
    if (typeof sumN !== 'number') {
      // console.log('sumN2 =', typeof sumN);
      return res.status(400).json({
        message: 'Не коректне значення суми ',
      })
    }  


    const newOperation = Operations.create({
      emailr: emailr,
      sumN: sumN,
      op_id: 1,
      id: 1,
    })
    // console.log('send4 route=',req.body)
    // const session = Session.create(newOperation)
    // console.log('send5 route=',req.body)
    Confirm.create(newOperation.email)
    //-----------------------------------------
    const newOperation2 = Operations.create({
      email: emails,
      sumN: sumN,
      op_id: 2,
      id: 1,
    })
    // const session2 = Session.create(newOperation2)
    // console.log('send5 route=',req.body)
    Confirm.create(newOperation2.email)


    const list = Operations.getByEmail(email)
    // console.log('email=',email,' list=',list);

    return res.status(200).json({
      message: 'Сума успішно переведена',
      // session,
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка створення переказу суми',
    })
  }
})

//=================================================================
// ================================================================




router.post('/operation', function (req, res) {
  const { emails, emailr, sum } = req.body
  // console.log('sent to route operation=',req.body)
  // console.log('emails=', emails)
  // op_id = 2
  if (!emails  ) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні - email відправника",
    })
  }
  if ( !emailr ) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні - email отримувача",
    })
  }
  if ( !sum ) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні - сума",
    })
  }    
  if (!emails || !emailr || !sum ) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  if ( emails === emailr ) {
    return res.status(400).json({
      message: "Помилка. Спроба створити переказ самому собі",
    })
  }

  try {
    const user = User.getByEmail(emails)
    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує:'+emails,
      })
    }

    const user2 = User.getByEmail(emailr)
    if (!user2) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує:'+emailr,
      })
    }    

    const sumN = Number(sum);
    if (typeof sumN !== 'number') {
      return res.status(400).json({
        message: 'Не коректне значення суми',
      })
    }  

    const op_id = Operations.getNewId();

    const newOperation = Operations.create({
      email: emailr,
      sumN: sumN,
      op_id: op_id,
    })
    // const session = Session.create(newOperation)
    // Confirm.create(newOperation.email)
    //-----------------------------------------
    // console.log('emails=', emails)
    const newOperation2 = Operations.create({
      email: emails,
      sumN: -sumN,
      op_id: op_id,
    })
    const op_id_list = Operations.getByOpId(op_id);
    // console.log('op_id_list=',op_id_list)
    // const session2 = Session.create(newOperation2)
    // Confirm.create(newOperation2.email)
 
    const notification_id = 5;
    const img = 'png/bell-ringing.png';
    const kind = 'receive';
    const userNotifications = Notification.create({ 
      email: emailr, 
      notification_id: notification_id, 
      img: img, 
      kind: kind 
    });
    const nota = Notification.getByEmail(emailr);

    const notification_id2 = 6;
    const img2 = 'png/bell-ringing.png';
    const kind2 = 'sent';
    const userNotifications2 = Notification.create({ 
      email: emails, 
      notification_id: notification_id2, 
      img: img2, 
      kind: kind2 
    });
    const nota2 = Notification.getByEmail(emails);
    const list = Operations.getByEmail(emails)
    const list2 = Operations.getByEmail(emailr)
    // console.log('list=', list)
    // console.log('list2=', list2)
    // const list3 = Operations.getByOpId(op_id)

    return res.status(200).json({
      message: 'Сума успішно переведена',
      // session,
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка створення переказу суми',
    })
  }
})



// ================================================================
//=================================================================
router.get('/transaction', function (req, res) {
  // const { id } = req.body
  console.log('get body route transaction=', req.body)
});
// ================================================================
router.post('/transaction', function (req, res) {
  // router.get('/getOperById', function (req, res) {  
    const { op_id1, email } = req.body
    console.log('req.body =', req.body)
    const opN = Number(op_id1);
    if (typeof opN !== 'number') {
      // console.log('sumN2 =', typeof sumN);
      return res.status(400).json({
        message: 'Не коректне значення op_id ',
      })
    }  

    const op_id = opN;  
    // console.log('op_id transaction =', op_id)

  if (!op_id) {
    return res.status(400).json({
      message: "Помилка. Будь ласка, перелогіньтесь",
    })
  }  
  try {
    let oper = Operations.getByOpIdEmail(op_id, email)

    // oper = handleLike(oper)

    // console.log('oper=', oper);
    let contr_agent = '';
    let sum_res = 0; 
    let date;
    let showTime;
    let data_res = {date: "", address: "", type: "", img: "", sum: 0}

    let oper_email;
    let user_email = String(email).toLowerCase();
    for (let i = 0; i <= oper.length - 1; i++) {
      oper_email = String(oper[i].email).toLowerCase();
      if(oper_email !== user_email){
        data_res.sum = oper[i].sum;
        if(oper[i].sum < 0){
          oper[i].kind = 'Recieved';
          data_res.type = 'Recieved';
        }else{
          oper[i].kind = 'Sent';
          data_res.type = 'Sent';
        }
        contr_agent = oper[i]['email'];
        console.log('received=', contr_agent);
        oper[i].img = '/svg/man.svg';
        data_res.img = '/svg/man.svg';
        if(contr_agent === 'stripe' || contr_agent === 'Stripe') {
          oper[i].img = '/png/S.png';
          data_res.img = '/png/S.png';
        }else if(contr_agent === 'coinbase' || contr_agent === 'Coinbase') {
          oper[i].img = '/png/C.png';
          data_res.img = '/png/C.png';
        }else{
          oper[i].img = '/svg/man.svg';
          data_res.img = '/svg/man.svg';
        }
          // console.log('contr_agent=', contr_agent);
          oper[i].email2 = contr_agent;
          data_res.address = contr_agent;
          // oper[i].ca = contr_agent;
        
      }
      // console.log('f contr_agent=')
      data_res.address = contr_agent;
      date = new Date();
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');  
      mm = date.toLocaleString('en-EN', { month: 'short' });    
      showTime = dd + ' ' + mm + ', ' + date.getHours() 
          + ':' + date.getMinutes();      
      // showTime = date.parse    
      oper[i].time = showTime;
      data_res.date = date;
      data_res.date= showTime;
      sum_res += oper[i].sum;
      // data_res.sum= sum_res;
    }    
    if(sum_res >0){
      data_res.sum = '+$'+Math.abs(sum_res);
    }else{
      data_res.sum = '-$'+Math.abs(sum_res);
    }

    console.log('data_res=', data_res);

    if (!oper) {
      return res.status(400).json({
        message: 'За вашим аккаунтом не знайдено операцфй',
      })
    }
    const data = data_res;
    console.log('oper=', oper);
// console.log('res oper=', sum_res)
        return res.status(200).json({
      //message: 'Ваші операції',
      // oper, sum_res,
      data_res,  sum_res,
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка отримання операцій',
    })
  }
})

//=================================================================
router.post('/getOperById', function (req, res) {
  // router.get('/getOperById', function (req, res) {  
    const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Будь ласка, перелогіньтесь",
    })
  }  
  try {
    let oper = Operations.getByEmail(email)
    // console.log('oper=', oper);
    let contr_agent = '';
    let sum_res = 0; 
    let date;
    let showTime;
    // let oper_email;
    // let user_email = String(email).toLowerCase();
    for (let i = 0; i <= oper.length - 1; i++) {
      // if(oper[i].op_id === 2){
      //   oper[i].sum = -oper[i].sum;
      // }      
      // if(oper_email !== user_email){
        if(oper[i].sum < 0){
          oper[i].kind = 'Sending';
          contr_agent = Operations.getByReceivedOpId(oper[i].op_id);
          // contr_agent = Operations.getBySendedOpId(oper[i].op_id);
          console.log('received=', contr_agent);
        }else{
          oper[i].kind = 'Receipt';
          contr_agent = Operations.getBySendedOpId(oper[i].op_id);
          // contr_agent = Operations.getByReceivedOpId(oper[i].op_id);
          console.log('sended=', contr_agent);
        }
        contr_agent = contr_agent[0]['email'];
        oper[i].img = '/svg/man.svg';
        // console.log('contr_agent=',contr_agent);
        if(contr_agent === 'stripe' || contr_agent === 'Stripe') {
          oper[i].img = '/png/S.png';
        }else if(contr_agent === 'coinbase' || contr_agent === 'Coinbase') {
          oper[i].img = '/png/C.png';
        }else{
          oper[i].img = '/svg/man.svg';
        }
          // console.log('contr_agent=', contr_agent);
          oper[i].email2 = contr_agent;
          // oper[i].ca = contr_agent;
        
      // }
      date = new Date();
      showTime = date.getHours() 
          + ':' + date.getMinutes();      
      oper[i].time = showTime;
      sum_res += oper[i].sum;
    }   

    if (!oper) {
      return res.status(400).json({
        message: 'За вашим аккаунтом не знайдено операцфй',
      })
    }

    console.log('oper=', oper);
// console.log('res oper=', sum_res)
        return res.status(200).json({
      //message: 'Ваші операції',
      oper, sum_res,
    })
  } catch (err) {
    // console.log('send7 route=',req.body)
    return res.status(400).json({
      message: 'Помилка отримання операцій',
    })
  }
})


// Підключаємо роутер до бек-енду
module.exports = router
