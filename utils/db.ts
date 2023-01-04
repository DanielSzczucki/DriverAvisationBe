import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  database: "driver_avisation",
  namedPlaceholders: true,
  decimalNumbers: true,
});
