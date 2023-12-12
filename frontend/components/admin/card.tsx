import React, { ReactNode } from 'react'

interface CardProps {
    name: string,
    amount: number,
    icon: ReactNode
}

export default function Card({
    name, amount, icon
}: CardProps) {
  return (
    <div className='rounded-lg shadow-md p-5 flex items-center justify-between gap-5'>
    <div>
      <p className='text-gray-800 text-sm uppercase '>{name}</p>
    <h1 className='text-lg font-bold'>{amount}</h1>
    </div>
    <div className='w-10 h-10 rounded-full hover:bg-green-500 bg-orange-600 text-white grid place-items-center'>{icon}</div>
  </div>
  )
}
