import app from './app'
// import reportRoutes from './routes/reports.routes'

app.listen(app.get('port'))

console.log('server on port', app.get('port'))

// module.exports = (app) => {
//     app.use(reportRoutes)
// }



