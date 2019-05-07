const knex = require('../connection');

function getAllAnimes() {
  return knex('animes')
  .select('*');
}

function getSingleAnime(id) {
  return knex('animes')
  .select('*')
  .where({ id: parseInt(id) });
}

function addAnime(anime) {
  return knex('animes')
  .insert(anime)
  .returning('*');
}

function updateAnime(id, anime) {
  return knex('animes')
  .update(anime)
  .where({ id: parseInt(id) })
  .returning('*');
}

function deleteAnime(id) {
  return knex('animes')
  .del()
  .where({ id: parseInt(id) })
  .returning('*');
}

module.exports = {
  getAllAnimes,
  getSingleAnime,
  addAnime,
  updateAnime,
  deleteAnime
};
