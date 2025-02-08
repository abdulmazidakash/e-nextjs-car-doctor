import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default async function ServicesSection() {

	// const res = await fetch('/services.json');
	const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
	const data = await servicesCollection.find({}).toArray();

	console.log(data);

  return (
	<div className='grid lg:grid-cols-3 md:grid-cols-2 mx-auto sm:grid-cols-1 '>
		{data.map((item) =>{
			return (
				<div 
				className='' 
				key={item._id}>
					<figure>
					<Image alt={item.title} src={item.img} width={314} height={208}/>
					</figure>
					<div className=''>
						<div>
							<h2>{item.title}</h2>
						
						</div>
						<div className='flex gap-4 items-center'>
						<p>Price: ${item.price}</p>
							<Link href={`/services/${item._id}`} className='text-orange-500'> <FaArrowUpRightFromSquare/> </Link>
						</div>
					</div>
				</div>
			)
		})}
	</div>
  )
}
