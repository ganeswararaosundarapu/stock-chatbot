import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { errorHandler } from './utils/errorHandler'
import stocksRouter from './routes/v1/stocks'

const app = express()
const PORT = process.env.PORT || 7000
console.log('Configured PORT: ', PORT)

app.use(bodyParser.json())
app.use(cors())

// simple echo message for testing
app.use('/echoMsg', (req, res) => {
    res.json({
        message: 'Welcome to Stock ChatBot!'
    })
})

// Versioning the API
app.use('/api/v1', stocksRouter)

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})