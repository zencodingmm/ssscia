import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const MemberLogin = () => {
  return (
    <div className="container flex flex-col gap-10 justify-center items-center h-screen overflow-y-scroll">
				<h2>သင်အသင်းဝင်ပြုလုပ်ထားခြင်းမရှိပါ။</h2>
				<p>အသင်းဝင်ခြင်းပြုလုပ်ရန် ဤနေရာကို နှိပ်ပါ။ <Link href={`/dashboard/members`}><Button>အသင်းဝင်ရန်</Button></Link></p>
	</div>
  )
}

export default MemberLogin