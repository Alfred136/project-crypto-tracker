import React from 'react'
import { Link } from 'react-router-dom'

const CoinList = (props) => {
  const { data } = props
  return (
    <div className='coin-list'>
      {data.map((item) => (
        <CoinItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  )
}

const CoinItem = (props) => {
  const { item } = props
  const { id, name, symbol, image, current_price, price_change_percentage_24h: priceChange } = item

  return (
    <Link to={`/${id}`}>
      <div className='coin-card'>
        <div className='row '>
          <div className='col'>
            <img className='icon' src={image} alt='crypto' />
            {name}
          </div>
          <div className='col'>
            {symbol.toString().toUpperCase()}
          </div>
          <div className='col price'>
            {current_price} USD
          </div>
          <div className={`col price ${priceChange > 0 ? 'green' : 'red'}`}>
            {priceChange > 0 && '+'}{(priceChange * 100).toFixed(2)}%
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CoinList