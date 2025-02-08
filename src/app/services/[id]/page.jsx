import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react'

export default async function ServiceDetailsPage({params}) {
	const p = await params;

	const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
	const data = await servicesCollection.findOne({ _id: new ObjectId(p.id)});
	console.log(data);
	
  return (
	<div className='my-8'>
		<section className='flex justify-center'>
			<figure className='relative'>
				<Image
				src={'/assets/images/checkout/checkout.png'}
				width={1137}
				height={300}
				alt={'banner'}
				/>
				<div className='absolute w-full h-full border-2 border-red-400'></div>
			</figure>
		</section>
		<p>{p.id}</p>
	</div>
  )
}
