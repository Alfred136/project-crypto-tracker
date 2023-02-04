import React from 'react'

const List = (props) => {
  const { data } = props
  const priceChange = (data.price_change_percentage_24h * 100).toFixed(2)
  return (
    <div className='details-list'>
      <h4>Details</h4>
      <ListItem
        title='Market cap rank'
        value={data.market_cap_rank}
      />
      <ListItem
        title={'Current price'}
        value={'$' + data.current_price}
      />
      <ListItem
        title={'24h high'}
        value={'$' + data.high_24h}
      />
      <ListItem
        title={'24h low'}
        value={'$' + data.low_24h}
      />
      <ListItem
        title={'24h change(%)'}
        value={`${priceChange}%`}
      />
    </div>
  )
}

const ListItem = (props) => {
  const { title, value } = props
  return (
    <div className='list-item'>
      <span>{title}</span>
      {value}
    </div>
  )
}

export default List