"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, useUser, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isLoaded) {
    return (
      <div>Loading.....</div>
    )
  }


  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#f6f8fc]/80 backdrop-blur-md" : "bg-[#f6f8fc]/80 backdrop-blur-md border-b border-opacity-10"}`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <div className="text-2xl font-bold">
            <Link href={"/"}><span className="text-amber-500">PlanMy</span><span className="text-[#6f46b7]">Plate</span></Link>
          </div>
          <div className="hidden md:flex items-center gap-5 text-black font-medium">

            <SignedIn>
              <ul className="flex justify-center items-center gap-5">
                <li>Mealplan</li>
                <li>{
                  user?.imageUrl ? (<Link href="/profile">
                    <Image
                      src={user.imageUrl}
                      alt='profile'
                      className='rounded-full'
                      width={40}
                      height={40}
                    /></Link>) : (
                    <div></div>
                  )
                }</li>
                <li><SignOutButton>
                  <button className='px-4 py-2 rounded-md text-white bg-[#6f46b7]'>Sign Out</button>
                </SignOutButton>
                </li>
              </ul>
            </SignedIn>
          <SignedOut>
            <Link href="/">Home</Link>
            <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>Subscribe</Link>
            <Link href="/sign-up">Sign Up</Link>
          </SignedOut>


          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
