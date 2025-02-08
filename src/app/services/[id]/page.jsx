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
	<div className='container mx-auto my-8'>
		<section className='flex justify-center'>
			<figure className='relative'>
				<Image
				src={'/assets/images/checkout/checkout.png'}
				width={1137}
				height={300}
				alt={'banner'}
				/>
				<div className='absolute w-full h-full border-2 border-red-400 transparent-layer top-0 overlay-bg'>
					<div className='w-full h-full font-bold text-2xl flex items-center ps-16'>
					<div>
						<h1 className='text-white'>Service Details</h1>
					</div>
					</div>
				</div>
			</figure>
		</section>
		<section>
			<Image
			src={data.img} 
			width={400} 
			height={200} 
			alt={data.title}
			/>
			<h1 className='font-bold text-3xl'>{data.title}</h1>
		</section>
	</div>
  )
}
