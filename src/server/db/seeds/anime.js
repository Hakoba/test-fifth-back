exports.seed = (knex, Promise) => {
    return knex('animes').del()
    .then(() => {
      return knex('animes').insert({
        name: 'One Piece',
        genre: 'Pirates',
        rating: 10,
        explicit: false
      });
    })
    .then(() => {
      return knex('animes').insert({
        name: 'Guren laggan',
        genre: 'Row row fight da power',
        rating: 9,
        explicit: true
      });
    })
    .then(() => {
      return knex('animes').insert({
        name: 'Promised Neverland',
        genre: 'Monter',
        rating: 8,
        explicit: false
      });
    });
  };