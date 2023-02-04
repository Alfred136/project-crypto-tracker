import React from 'react'

const SearchBar = (props) => {
  const { value, onChangeFn } = props
  return (
    <div style={{ position: 'relative' }}>
      <i className='search-icon fa fa-search' />
      <input
        type={'text'}
        value={value}
        className='search'
        placeholder='Search by name or symbol'
        onChange={onChangeFn}
      />
    </div>
  )
}

export default SearchBar