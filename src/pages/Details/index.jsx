import React from 'react'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import TopBar from './TopBar'
import List from './List'
import Loading from '../../components/Loading'

const Details = () => {
  const params = useParams()
  const navigate = useNavigate()

  const fetchCoin = () => fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${params.id}`).then(res => res.json()) //&order=market_cap_desc&per_page=100&page=1&sparkline=false
  const fetchCoinChart = () => fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=90`)
    .then(res => res.json())
    .then(data => transformChartData(data.prices))

  const [coinQuery, coinChartQuery] = useQueries({
    queries: [
      {
        queryKey: ['coin'],
        queryFn: fetchCoin
      },
      {
        queryKey: ['coin_chart'],
        queryFn: fetchCoinChart
      },
    ]
  })

  const transformChartData = (data) =>
    data.map((item) => {
      const [timestamp, price] = item
      const date = new Date(timestamp).toLocaleDateString()
      return {
        date: date,
        price: price
      }
    })

  const { name, image } = (coinQuery.isSuccess) ? coinQuery.data[0] : {}
  return (
    <div className='content-wrapper'>
      {coinQuery.isSuccess &&
        <TopBar
          imgURL={image}
          name={name}
          navigateFn={() => navigate(-1)}
        />
      }
      {coinChartQuery.isLoading &&
        <Loading />
      }
      {coinChartQuery.isSuccess &&
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
          <AreaChart
            className='chart'
            width={500}
            height={400}
            data={coinChartQuery.data}
            margin={{ right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      }
      {coinQuery.isSuccess &&
        <List data={coinQuery.data[0]} />
      }
    </div>
  )
}

export default Details