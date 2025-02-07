import dbConnect from '@/lib/dbConnect';
import Image from 'next/image';
import React from 'react'

export default async function ServicesSection() {

	// const res = await fetch('/services.json');
	const servicesCollection = dbConnect('services');
	const data = await servicesCollection.find({}).toArray();

  return (
	<div className='grid grid-cols-12'>
		{data.map((item) =>{
			return (
				<div 
				className='col-span-4 md:col-span-6 lg:col-span-4' 
				key={item._id}>
					<Image src={item.img} width={314} height={208}/>
				</div>
			)
		})}
	</div>
  )
}
