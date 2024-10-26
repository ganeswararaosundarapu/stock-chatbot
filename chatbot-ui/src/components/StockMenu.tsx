import React from 'react'

interface StockMenuProps {
    stocks: any[]
    handleStockSelect(stockName: string): void
}

const StockMenu: React.FC<StockMenuProps> = ({ stocks, handleStockSelect }) => {
    return (
        <div className='stock-menu option-menu'>
            {stocks.length > 0 && (
                <ul>
                    <li>Please select a stock.</li>
                    {stocks.map((stock) => (
                        <li key={stock.code} onClick={() => handleStockSelect(stock.stockName)}>
                            {stock.stockName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default StockMenu