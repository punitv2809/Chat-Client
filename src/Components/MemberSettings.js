import React, { useState } from 'react'

const MemberSettings = ({ member }) => {
    console.log(member)
    return (
        <div className='flex flex-col items-center justify-center space-y-2'>
            <img src={member.avatar.data} className='w-32 h-32 rounded-full' />
            <h1 className='text-xl font-black text-white/50 capitalize'>{member.conversationName}</h1>
        </div>
    )
}

export default MemberSettings
