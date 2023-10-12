import dynamic from 'next/dynamic';
import React from 'react'

const Spline = dynamic(() => import("@splinetool/react-spline"), {
    ssr: false,
});

const Spliner = () => {
    return (
        <div className='w-full h-11/12 absolute bg-transparent z-[-10] animate-float'>
            <Spline scene="https://prod.spline.design/AijYrqJyqvWR6brq/scene.splinecode" />
        </div>
    )
}

export default Spliner