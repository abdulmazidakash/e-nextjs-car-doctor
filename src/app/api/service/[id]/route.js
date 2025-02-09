import { NextResponse } from "next/server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

export const DELETE = async(req, {params}) =>{
	const p = await params;
	const bookingCollection = dbConnect(collectionNameObj.bookingCollection);
	const query = { _id: new ObjectId(p.id)};

	//validation
	const session = await getServerSession(authOptions);
	const currentBooking = await bookingCollection.findOne(query);

	const isOwnerOK = session?.user?.email == currentBooking.email ;

	if(isOwnerOK){
		const deleteResponse = await bookingCollection.deleteOne(query);
		revalidatePath('/my-bookings')
		return NextResponse.json(deleteResponse);
	}
	else{
		return NextResponse.json({ success: false, message: 'forbidden action'}, {status: 401})
	}

}

export const GET = async (req, {params}) =>{
	const p = await params;
	const servicesCollection = dbConnect(collectionNameObj.servicesCollection);
	const data = await servicesCollection.findOne({ _id: new ObjectId(p.id)});
	console.log(data);

	return NextResponse.json(data);
	
}
