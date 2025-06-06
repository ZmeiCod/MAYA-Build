import React from 'react'
import NotFoundBlock from '../components/NotFound' 
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Лучшие блюда — лучшие цены! Роллы, пицца, бургеры от шефа, +7(978)-444-14-14"
        />
        <meta name="keywords" content="Симферополь, доставка, еда, вкусно" />
      </Helmet>
      <NotFoundBlock/>
    </div>
  )
}