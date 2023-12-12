"use client";
import React, { useEffect } from 'react'


import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store';
import MemberLogin from '@/components/users/memberLogin';

const DynamicMap = dynamic(() => import('./map'), {
  ssr: false
});

const LandFactors = () => {
  const router = useRouter();
  const { isMember } = useAuthStore();
  
  if(!isMember) return <MemberLogin />
  
  return (
    <div className='flex items-center justify-center w-full'>
      <DynamicMap />
    </div>
  )
}

export default LandFactors