import pg from "pg";
const { Pool } = pg;
/**
 * Pool is important because you generally don't want to establish a brand-new PostgreSQL connection for every HTTP request.
 * node-postgres provides pooling specifically for this kind of use.
 */
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "devlogs",
  password: "devlogs",
  database: "devlogs",
});

export default pool;
