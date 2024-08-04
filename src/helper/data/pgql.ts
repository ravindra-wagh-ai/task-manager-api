import pg from "pg";
import env from "dotenv";
env.config();
const reader = new pg.Pool({
  host: process.env.READER_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  keepAlive: true,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 30000,
});

const writer = new pg.Pool({
  host: process.env.WRITER_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  keepAlive: true,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 30000,
});

export default {
  write: async (sql: string, values?: any[]) => {
    let result;
    let client = await writer.connect();
    try {
      if (values && values.length > 0) {
        //console.log("executed: ", sql, values);
        result = await client.query(sql, values);
      } else {
        //console.log("execute: ", sql);
        result = await client.query(sql);
      }
      return result;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  },
  read: async (sql: string, values?: any[]) => {
    let result;
    let client = await reader.connect();
    try {
      if (values && values.length > 0) {
        //console.log("executed: ", sql, values);
        result = await client.query(sql, values);
      } else {
        //console.log("execute: ", sql);
        result = await client.query(sql);
      }
      return result;
    } catch (e) {
      throw e;
    } finally {
      client.release();
    }
  },
};
