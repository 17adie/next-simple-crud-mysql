import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  // PlanetScale;
  // const dbConnection = await mysql.createConnection(
  //   process.env.MYSQL_DATABASE_URL
  // );

  //Localhost
  const dbConnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await dbConnection.execute(query, values);
    dbConnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}