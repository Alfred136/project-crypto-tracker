import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from './Header'
import SearchBar from './SearchBar'
import CoinList from './CoinList'
import Loading from '../../components/Loading'

const Home = () => {
  const [search, setSearch] = useState('')
  const { status, error, data } = useQuery({
    queryKey: ['coins'],
    queryFn: () =>
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50`)
        .then(res => res.json())
  })

  const filteredData = (status === 'success')
    ? data.filter((item) => (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase()))
    )
    : []

  const handleSearchChange = (event) => setSearch(event.target.value)

  return (
    <div className='content-wrapper'>
      <Header />
      <SearchBar
        value={search}
        onChangeFn={handleSearchChange}
      />
      {(status === 'loading') &&
        <Loading />
      }
      {(status === 'error') &&
        <div>Error: {error.message}</div>
      }
      <CoinList data={filteredData} />
    </div>
  )
}

export default Home