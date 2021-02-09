const knexfile = require('./knexfile');

const knex = require('knex')(knexfile.development);
const { DateTime } = require('luxon');

const OFFSET = process.env.ENTRY_OFFSET ? process.env.ENTRY_OFFSET : 0;

async function insert() {
  const result = await knex('entries').insert({ entry: process.argv[2] });
  console.log({ result });
  await knex.destroy();
}

async function list() {
  const entries = await knex('entries').select('id', 'entry', 'entry_at');
  entries.forEach(({ id, entry, entry_at }) => {
    const dt = DateTime.fromSQL(entry_at, {zone: "utc"}).toLocal();
    const dateString = dt.toLocaleString(DateTime.DATETIME_FULL);
    const resultString = `Entry number: ${id + 1 - OFFSET}\nEntry at: ${dateString}\nContent: ${entry}`;
    console.log("------------------");
    console.log(resultString);
    console.log("------------------\n");
  });
  knex.destroy();
  return;
}

async function test() {
  console.log(process.argv);
}

const option = process.env.MODE;

switch(option) {
  case "insert":
    insert()
    break;
  case "list":
    list();
    break;
  case "test":
    test();
    break;
}
