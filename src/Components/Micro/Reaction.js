import React from 'react'

const Reaction = ({ reactors, emoji }) => {
    if (!reactors.length) return null;
    return (
        <div className='text-xs cursor-pointer active:scale-95 hover:scale-110 bg-primary-lighter flex items-center justify-center px-2 py-1 rounded-md max-w-fit'>
            <p>{emoji}</p>
            <p className='ml-1'>{reactors.length}</p>
        </div>
    )
}

export default Reaction
