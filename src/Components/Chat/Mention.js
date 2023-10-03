import React from 'react'

const Mention = ({ avatar, name }) => {
    return (
        <span className='m-0.5 cursor-pointer hover:scale-105 transition-all duration-300 inline-flex text-xs font-light max-w-fit items-center justify-center p-0.5 px-1 bg-secondary/25 rounded-md shadow-md align-middle'>
            <img src={avatar} alt="member avatar" className="w-6 h-6 rounded-full mr-1" />
            <span>{name}</span>
        </span>
    )
}

export default Mention
