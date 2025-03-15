import { Client } from "https://deno.land/x/postgres/mod.ts";

const client = new Client({
  user: "postgres",
  password: "kotKoti@2005",
  database: "car-game",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

await client.queryObject(`
  CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INT NOT NULL
  );
`);

export default client;
