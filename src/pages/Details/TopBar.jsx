import React from 'react'

const TopBar = (props) => {
  const { imgURL, name, navigateFn } = props
  return (
    <>
      <i className='iconBtn fa fa-angle-left fa-2x' onClick={navigateFn} />
      <div className='details-header'>
        <img className='image' src={imgURL} alt='crypto' />
        <span>{name}</span>
      </div>
    </>
  )
}

export default TopBar