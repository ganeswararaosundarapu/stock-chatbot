import React from 'react'

interface HomeMenuProps {
    exchanges: string[]
    handleExchangeSelect(exchange: string): void
}
const HomeMenu: React.FC<HomeMenuProps> = ({ exchanges, handleExchangeSelect }) => {
    return (
        <div className='home-menu option-menu'>
            <ul>
                <li>Please select a Stock Exchange.</li>
                {exchanges.map((exchange) => (
                    <li key={exchange} onClick={() => handleExchangeSelect(exchange)}>
                        {exchange}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomeMenu