'use server';

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt, { hash } from "bcryptjs";

export const registerUser = async (payload) => {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    
    // Validation
    const { email, password } = payload;
    if (!email || !password) {
        // return { success: false, message: "All fields are required!" };
		return null;
    }

    // const existingUser = await userCollection.findOne({ email });
    // if (existingUser) {
    //     return { success: false, message: "Email already registered!" };
    // }

    // // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const result = await userCollection.insertOne({
    //     name,
    //     email,
    //     password: hashedPassword
    // });

    // return { success: true, message: "User registered successfully!", insertedId: result.insertedId };

	const user = await userCollection.findOne({email: payload.email });

	if(!user){
		const hashedPassword = await bcrypt.hash(password, 10);
		payload.password = hashedPassword;
		const result = await userCollection.insertOne(payload);
		result.insertedId = result.insertedId.toString();
		return result;
	}
	return null;
};
