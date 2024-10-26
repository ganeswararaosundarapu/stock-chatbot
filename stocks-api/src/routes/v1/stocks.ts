import { Router } from 'express'
const stocksDataDetails = require('./stock-data.json') // file is small, i can go with built-in module
// const stocksDataDetails = require('./empty-stocks.json')// for negative testing

const router = Router()

interface topStocksIn {
    code: string
    stockName: string
    price: number
}

interface StockIn {
    code: string
    stockExchange: string
    topStocks: topStocksIn[]
}

interface StocksIn {
    [key: string]: StockIn
}


if (!Array.isArray(stocksDataDetails) || stocksDataDetails.length === 0) {
    console.warn('stocks data is empty, please provide valid data')
}

const stocksData: StocksIn = stocksDataDetails.reduce((acc: StocksIn, stock: StockIn) => {
    acc[stock.stockExchange] = stock
    return acc
}, {})

/**
 * While it could be implemented as a single API for simplicity, 
 * it has been developed as a medium-scale backend service to effectively manage traffic as a proof of concept (POC)
 */

// get available exchanges
router.get('/exchanges', (req, res) => {
    try {
        res.json(Object.keys(stocksData))
    } catch (e) {
        console.error('Error while processing on exchange api ', e)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// filter the stocks by exchange
router.get('/stocks/:exchange', (req, res) => {
    const { exchange } = req.params
    if (stocksData[exchange]) {
        const stocks = stocksData[exchange]?.topStocks || []
        res.json(stocks)
    } else {
        res.status(404).json({ message: 'Exchange not found' })
    }
})

// get the latest stock price by stock name
router.get('/stocks/:exchange/:stockName', (req, res) => {
    const { exchange, stockName } = req.params
    const stocks = stocksData[exchange]
    const stock = stocks?.topStocks?.find((s: any) => s.stockName === stockName)
    if (stock) {
        res.json(stock)
    } else {
        res.status(404).json({ message: 'Stock not found' })
    }
})

export default router