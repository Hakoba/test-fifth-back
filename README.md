
1. Сначала заинсталить`npm install`
1. Поднять Постгресс на дефолтном порту.
1. Создать бд- `koa_api` ( команда `CREATE DATABASE koa_api;` )
1. из под папки проекта в терминале ввести - `knex migrate:latest --env development`
1. и - `knex seed:run --env development`
1. потом - `npm start`

