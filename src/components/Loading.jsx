import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div className='spinner-wrapper'>
      <Spinner className='spinner' animation="grow" variant="primary" />
    </div>
  )
}

export default Loading