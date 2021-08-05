const dotenv = require('dotenv')
dotenv.config({
  path: './.env'
})

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
})

const app = require('./src/app')
// Start the server
const port = process.env.PORT;
console.log(port)
app.listen(port, () => {
  console.log(`Application is running on port ${port}`)
})

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!!  shutting down ...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})