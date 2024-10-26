import React from 'react'

interface PriceMenuProps {
    latestPrice: number | null
    selectedStock: string
    onMainMenu?: () => void
    onGoBack?: () => void
}
const PriceMenu: React.FC<PriceMenuProps> = ({ latestPrice, selectedStock, onMainMenu, onGoBack }) => {
    return (
        <div className='prince-menu option-menu'>
            {latestPrice !== null && (
                <ul>
                    <li>Stock Price of {selectedStock} is {latestPrice}. Please select an option.</li>
                    <li onClick={onMainMenu}>Main menu</li>
                    <li onClick={onGoBack}>Go Back</li>
                </ul>
            )}
        </div>
    )
}

export default PriceMenu