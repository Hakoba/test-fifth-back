const Router = require('koa-router');
const queries = require('../db/queries/anime');

const router = new Router();
const BASE_URL = `/api/v1/anime`;

router.get(BASE_URL, async (ctx) => {
  try {
    const anime = await queries.getAllAnimes();
    ctx.body = {
      status: 'success',
      data: anime
    };
  } catch (err) {
    ctx.body = {
        status: 'bletb',
      };
    console.log(err,'blah')
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const Anime = await queries.getSingleAnime(ctx.params.id);
    if (Anime.length) {
      ctx.body = {
        status: 'success',
        data: Anime
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That Anime does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const Anime = await queries.addAnime(ctx.request.body);
    if (Anime.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: Anime
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const Anime = await queries.updateAnime(ctx.params.id, ctx.request.body);
    if (Anime.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: Anime
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That Anime does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const Anime = await queries.deleteAnime(ctx.params.id);
    if (Anime.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: Anime
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That Anime does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;
