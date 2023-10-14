import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import styles from './itsamatch.module.css';
import Realistic from '@components/Confetti';

const ItsAMatch = () => {
  return (
    <div className='w-full h-full flex flex-col sm:flex-row justify-evenly items-center mt-32'>
      <div className='w-[50vw] h-[70vh] rounded-lg'>
        <div className='w-full h-full bg-black rounded-md flex flex-col items-center justify-evenly'>
          <Realistic />
          <h1 className='text-white text-3xl font-bold'>It&apos;s a Match!</h1>
          <div className="flex justify-evenly items-center w-full h-full relative">
            <div className="w-1/3 h-96 relative">
              <Image
                src="/guy.jpg"
                alt="itsamatch"
                fill
                className={`rounded-full ${styles.animate_left_to_center} bg-contain`}              />
            </div>
            <h1 className={`text-8xl font-thin ${styles.stamp}`}>X</h1>
            <div className="w-1/3 h-96 relative">
              <Image
                src="/gril.jpg"
                alt="itsamatch"
                fill
                className={`rounded-full ${styles.animate_right_to_center} bg-contain`}
              />
            </div>
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