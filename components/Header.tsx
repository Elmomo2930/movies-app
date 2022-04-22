import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'


function Header() {

    const [isScroll, setIsScroll] = useState(false)
    const { logout } = useAuth()

    useEffect(() => {
      const handScroll = () => {
          if(window.scrollY > 0) {
              setIsScroll(true)
          } else {
              setIsScroll(false)
          }
      }

       window.addEventListener('scroll', handScroll)

       return () => {
           window.removeEventListener('scroll', handScroll)
       }
    }, [])
    

return (
    <header className={`${isScroll && 'bg-[#141414]'}`}>
        <div className="flex items-center space-x-2 md:space-x-10">
            <img 
            src="https://i.pinimg.com/736x/75/5a/b3/755ab365fbaed60c05bb3312a78edccf.jpg" 
            width={100}
            height={100}
            className='cursor-pointer object-contain'
            />

            <ul className="hidden space-x-4 md:flex">
                <li className="headLink">HomeScreen</li>
                <li className="headLink">TVS</li>
                <li className="headLink">Movie time</li>
                <li className="headLink">New & Populars</li>
                <li className="headLink">List on</li>
            </ul>
        </div>


         {/* right section */}
        <div className='flex items-center space-x-4 text-sm font-light'>
            <SearchIcon 
            className='hidden sm:inline h-6 w-6'
            />
            <p className='hidden lg:inline'>family</p>
            <BellIcon className='h-6 w-6'/>
            {/* <Link href='/account'> */}
              <img 
              onClick={logout}
              src="https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg" 
              width={100}
              height={100} 
              className='cursor-pointer rounded'
              />
            {/* </Link> */}
        </div>
    </header>
  )
}

export default Header