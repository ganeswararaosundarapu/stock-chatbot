import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import PriceMenu from './PriceMenu'
import HomeMenu from './HomeMenu'
import StockMenu from './StockMenu'
import UserMessage from './UserMessage'
import DynamicRenderer from './DynamicRenderer'
import { ThemeContext }  from './ThemeContext'

import './Chatbot.css'

const STOCKS_API_URL: string = process.env.STOCKS_API_URL || 'http://localhost:7000'
console.log('STOCKS_API_URL ', STOCKS_API_URL)

const Chatbot: React.FC = () => {
    const theme = useContext(ThemeContext)
    const [exchanges, setExchanges] = useState<string[]>([])
    const [stocks, setStocks] = useState<any[]>([])
    const [selectedExchange, setSelectedExchange] = useState<string>('')
    const [latestPrice, setLatestPrice] = useState<number | null>(null)
    const [selectedStock, setSelectedStock] = useState<string>('')
    const [messages, setMessages] = useState<{ render: JSX.Element; isUser: boolean }[]>([])
    const [error, setError] = useState<string>('')
   
    // fetch exchanges in mounting phase - first run
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const response = await axios.get(`${STOCKS_API_URL}/api/v1/exchanges`)
                setExchanges(response.data)
            } catch (e: any) {
                console.error("Error while fetching stock exchanges ", e)
                setError(e.message || e)
            }
        }

        fetchExchanges()
    }, [])

    // show HomeMenu options when exchanges are available - it invoke only once
    useEffect(() => {
        if (exchanges.length && !messages.length) {
            setMessages(prev => [...prev, { render: <HomeMenu exchanges={exchanges} handleExchangeSelect={handleExchangeSelect} />, isUser: false }])
        }
    }, [exchanges])


    // show StockMenu options when stocks are updated
    useEffect(() => {
        if (stocks.length) {
            setMessages(prev => [...prev, { render: <UserMessage text={selectedExchange} />, isUser: true }])
            setMessages(prev => [...prev, { render: <StockMenu stocks={stocks} handleStockSelect={handleStockSelect} />, isUser: false }])
        }
    }, [stocks])

    // show latest PriceMenu options when latest price is updated
    useEffect(() => {
        const handleMainMenu = () => {
            setMessages(prev => [...prev, { render: <UserMessage text={'Main menu'} />, isUser: true }])
            setMessages(prev => [...prev, { render: <HomeMenu exchanges={exchanges} handleExchangeSelect={handleExchangeSelect} />, isUser: false }])
        }
        const handleGoBack = () => {
            setMessages(prev => [...prev, { render: <UserMessage text={'Go back'} />, isUser: true }])
            setMessages(prev => [...prev, { render: <StockMenu stocks={stocks} handleStockSelect={handleStockSelect} />, isUser: false }])
        }
        if (latestPrice) {
            setMessages(prev => [...prev, { render: <UserMessage text={selectedStock} />, isUser: true }])
            setMessages(prev => [...prev, {
                render: <PriceMenu 
                            latestPrice={latestPrice}
                            selectedStock={selectedStock}
                            onMainMenu={handleMainMenu}
                            onGoBack={handleGoBack} />,
                isUser: false
            }])
        }
    }, [latestPrice])

    const handleStockSelect = async (stockName: string) => {
        setSelectedStock(stockName)
        try {
            const response = await axios.get(`${STOCKS_API_URL}/api/v1/stocks/${selectedExchange}/${stockName}`)
            setLatestPrice(response.data.price)
        } catch (e) {
            console.error("Error while fetching latest price selected stock", e)
        }
    }

    const handleExchangeSelect = async (exchange: string) => {
        setSelectedExchange(exchange)
        try {
            const response = await axios.get(`${STOCKS_API_URL}/api/v1/stocks/${exchange}`)
            setStocks(response.data)
        } catch (e) {
            console.error("Error while fetching stocks of selected exchange", e)
        }
    }

    return (
        <div className='chat-container'>
            <header className='header' style={{ backgroundColor: theme.colors.background, color: theme.colors.foreground }}>
                <img src='./chatbot-header.png' />
                <span>LSEG chatbot</span>
            </header>
            <div className="chat">
                <div className="messages">
                    <span className='welcome-msg'>Hello! Welcome to LSEG. I'm here to help you.</span>
                    {!error && !exchanges.length && <div className='error-msg'> Empty Stock Exchange</div>}
                    {error && <div className='error-msg'>{error}</div>}
                    {messages.map((msg, index) => (
                        <DynamicRenderer key={index} render={msg.render} isUser={msg.isUser} />
                    ))}
                </div>
            </div>
            <div className="footer">
                <input
                    type="text"
                    disabled
                    placeholder="Please pick an option."
                    className="input"
                    />
                <button disabled className="send-button">Send</button>
            </div>
        </div>
    )
}

export default Chatbot
