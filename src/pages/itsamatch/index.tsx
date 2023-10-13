import { ArrowRightIcon } from '@heroicons/react/24/solid';
import React from 'react'

const ItsAMatch = () => {
  return (
    <div className='w-full h-full flex flex-col sm:flex-row justify-evenly items-center mt-32'>
      <div className='w-[50vw] h-[70vh] rounded-lg'>
        <div className='w-full h-full bg-black rounded-md flex flex-col items-center justify-evenly'>
          <h1 className='text-white text-3xl font-bold'>It&apos;s a Match!</h1>
          <div className="flex justify-evenly items-center w-full h-full">
            <img src="/guy.jpg" alt="itsamatch" className='w-full h-96 object-contain rounded-full' />
            <h1 className='text-8xl font-thin'>X</h1>
            <img src="/gril.jpg" alt="itsamatch" className='w-full h-96 object-contain rounded-full' />
          </div>
          <button
            type="button"
            className="flex w-40 items-center justify-center rounded-md py-3 text-slate-100 bg-blue-600 group hover:bg-blue-900"
          >
            Start Meeting
            <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItsAMatch;