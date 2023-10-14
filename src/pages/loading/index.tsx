import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        <div className='h-full w-full flex flex-col justify-evenly items-center mt-20'>
            <Image width={100} height={90} src={'/loader.gif'} className='w-1/2 aspect-auto' alt='loading' />
            <div className='w-full h-full flex flex-row justify-center items-center gap-5'>
                <Image width={10} height={10} src={'/magnifying_glass.gif'} className='w-20 h-20' alt='mag_glass' />
                <p className='text-4xl font-bold text-white uppercase animate-pulse'>Finding matches...</p>
            </div>
        </div>
    )
}

export default loading;