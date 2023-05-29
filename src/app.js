import express from 'express'
import config from './config'

import reportRoutes from './routes/reports.routes'



const app = express()

const cors = require("cors");
app.use(cors());

//settings
app.set('port', config.port)

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(reportRoutes)

export default app