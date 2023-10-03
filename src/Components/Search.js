import React from 'react'
import { BsSearch } from 'react-icons/bs'
const Search = () => {
  return (
    <div className={'bg-primary-lighter flex items-center p-3 rounded-xl text-black dark:text-white'}>
      <BsSearch className={'text-2xl text-white/50'}/>
      <input type='text' className={'bg-transparent outline-none ml-2 placeholder:text-sm'} placeholder='Search'/>
    </div>
  )
}

export default Search
