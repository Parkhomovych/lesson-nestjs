export default () => ({
  port: process.env.PORT,
  // Data base
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_DATABASE,
  // JWT
  secret_jwt: process.env.SECRET_TOKEN,
  expire_jwt: process.env.EXPIRE_TOKEN,
  secret_refresh_jwt: process.env.SECRET_REFRESH_TOKEN,
  expire_refresh_jwt: process.env.EXPIRE_REFRESH_TOKEN,
});
