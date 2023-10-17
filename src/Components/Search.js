import React from 'react'
import { BsSearch } from 'react-icons/bs'
const Search = ({ searchTerm, setSearchTerm, textClass = '', padding = 'p-3', showIcon = true }) => {
  return (
    <div className={`bg-primary-lighter flex items-center ${padding} rounded-xl text-black dark:text-white`}>
      {showIcon && <BsSearch className={'text-2xl text-white/50'} />}
      <input
        type="text"
        className={`${textClass} bg-transparent outline-none ml-2 placeholder:text-sm`}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default Search
