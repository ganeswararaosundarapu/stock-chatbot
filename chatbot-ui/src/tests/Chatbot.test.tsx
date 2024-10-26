import React from 'react'
import axios from 'axios'
import { render, screen, fireEvent } from '@testing-library/react'
import Chatbot from '../components/Chatbot'

jest.mock('axios')

describe('Chatbot Component', () => {
    beforeEach(() => {
        (axios.get as jest.Mock).mockImplementation((url) => {
            if (url === 'http://localhost:7000/api/v1/exchanges') {
                return Promise.resolve({ data: ['LSE', 'NYSE', 'NASDAQ'] });
            }
            if (url === 'http://localhost:7000/api/v1/stocks/LSE') {
                return Promise.resolve({
                    data: [
                        { code: 'CRDA', stockName: 'CRODA INTERNATIONAL PLC', "price": 4807.00 },
                        { code: 'GSK', stockName: 'GSK PLC', "price": 1574.80 }
                    ]
                });
            }
            if (url === 'http://localhost:7000/api/v1/stocks/LSE/GSK PLC') {
                return Promise.resolve({ data: { price: 1574.80 } });
            }
            return Promise.reject(new Error('not found'))
        })
    })

    test('renders exchange buttons', async () => {
        render(<Chatbot />)
        const exchangeButton = await screen.findByText('LSE')
        expect(exchangeButton).toBeInTheDocument()
        expect(screen.getByText('NYSE')).toBeInTheDocument();
        expect(screen.getByText('NASDAQ')).toBeInTheDocument();
    });

    test('renders stocks for selected exchange', async () => {
        render(<Chatbot />);
        const exchangeButton = await screen.findByText('LSE');
        fireEvent.click(exchangeButton);
        expect(await screen.findByText('CRODA INTERNATIONAL PLC')).toBeInTheDocument();
    })

    test('shows latest stock price when stock is selected', async () => {
        render(<Chatbot />);
        const exchangeButton = await screen.findByText('LSE');
        fireEvent.click(exchangeButton);
        const stockButton = await screen.findByText('GSK PLC');
        fireEvent.click(stockButton);
        expect(await screen.findByText('Stock Price of GSK PLC is 1574.8. Please select an option.')).toBeInTheDocument();
    })

    test('shows home menu when main menu selected', async () => {
        render(<Chatbot />);
        const exchangeButton = await screen.findByText('LSE');
        fireEvent.click(exchangeButton);
        const stockButton = await screen.findByText('GSK PLC');
        fireEvent.click(stockButton);
        expect(await screen.findByText('Stock Price of GSK PLC is 1574.8. Please select an option.')).toBeInTheDocument()
        const mainMenuButton = await screen.findByText('Main menu');
        fireEvent.click(mainMenuButton);
        expect(await screen.findByText('Please select a stock.')).toBeInTheDocument();
    })
})