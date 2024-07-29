import express from 'express'
import establecimientosRoutes from './routes/establecimientos.routes.js'
import indexRoutes from './routes/index.routes.js'
import {PORT} from './config.js'

const app = express()
app.use(express.json())

app.use(indexRoutes)
app.use('/api',establecimientosRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint No Encontrado'
    })
})

export default app;