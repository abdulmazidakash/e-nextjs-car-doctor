'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {

	const { data: session, status } = useSession();
	console.log(session );

	const navMenu = () =>{
		return (
			<>
			<li><Link href={'/'}>Home</Link></li>
			<li><Link href={'/about'}>About</Link></li>
			<li><Link href={'/services'}>Services</Link></li>
			<li><Link href={'/blog'}>Blog</Link></li>
			<li><Link href={'/my-bookings'}>My Bookings</Link></li>	
			</>
		)
	}
  return (
	<div>
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
				<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
				</div>
				<ul
					tabIndex={0}
					class="menu font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
					{navMenu()}
				</ul>
				</div>
				<Link href={'/'} className="btn btn-ghost text-xl">
					<Image alt='navbar logo' src={'/assets/logo.svg'} width={50} height={50} />
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex font-semibold">
				<ul className="menu menu-horizontal px-1">
				{navMenu()}
				</ul>
			</div>
			<div className="navbar-end">
				{ status == 'authenticated' ? 
				(<>
				<div className='flex items-center list-none gap-2'>
				<li><Image
				src={session?.user?.image}
				width={40}
				height={40}
				alt='user-logo'
				className='rounded-full'
				
				/> </li>
				<li className='btn btn-error' onClick={() => signOut()}>Logout</li>
				</div>
				</>) : 
				(<>
				<Link href={'/register'} className='btn btn-error btn-soft'>Register</Link>
				<Link href={'/login'} className='btn btn-warning btn-soft'>Login</Link>
				</>)}
				<a className="btn btn-outline">Appointment</a>
			</div>
		</div>
	</div>
  )
}
