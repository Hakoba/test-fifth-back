const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('betonomeshalka', salt);
    return Promise.join(
      knex('users').insert({
        username: 'Luffy',
        password: hash,
        admin: false
      })
    );
  })
  .then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('88005553535', salt);
    return Promise.join(
      knex('users').insert({
        username: 'leroyJenkins',
        password: hash,
        admin: true
      })
    );
  });
};
