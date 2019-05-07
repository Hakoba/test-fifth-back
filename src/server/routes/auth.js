const Router = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');

const queries = require('../db/queries/users');
const helpers = require('./_helpers');
const knex = require('../db/connection');
const router = new Router();

router.get('/auth/register', async (ctx) => {
  ctx.redirect('/');
  // ctx.type = 'html';
  // ctx.body = fs.createReadStream('./src/server/views/register.html');
});

router.post('/auth/register', async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  console.log(user);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      console.log('something Wrong')
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

// router.get('/auth/login', async (ctx) => {
//   if (!helpers.ensureAuthenticated(ctx)) {
//     ctx.type = 'html';
//     ctx.body = fs.createReadStream('./src/server/views/login.html');
//   } else {
//     ctx.redirect('/auth/status');
//   }
// });

router.post('/auth/login', async (ctx) => {
  await passport.authenticate('local', async(err, user) => {
      if(user === false){
          await ctx.render('login', {title: 'Авторизация', message: 'Неверный логин или пароль'});
      } else {
          ctx.login(user, async (err) => {
              await err ? ctx.body = err : ctx.redirect('/user');
          });
      }
  })(ctx)
});

router.get('/auth/logout', async (ctx) => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/auth/status', async (ctx) => {
  if (helpers.ensureAuthenticated(ctx)) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/status.html');
  } else {
    ctx.redirect('/auth/login');
  }
});


router.get('/auth/getAll', async (ctx) => {
  let getAllUsers = () => {
   return knex('users')
    .select('username');
  }
  try {
    const users = await getAllUsers()
    console.log(users)
    ctx.body = {
      data: users
    };
  } catch (err) {
    console.log(err)
  }
})
module.exports = router;
