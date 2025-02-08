'use server';

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const registerUser = async (payload) => {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    
    // Validation
    const { name, email, password } = payload;
    if (!name || !email || !password) {
        return { success: false, message: "All fields are required!" };
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return { success: false, message: "Email already registered!" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userCollection.insertOne({
        name,
        email,
        password: hashedPassword
    });

    return { success: true, message: "User registered successfully!", insertedId: result.insertedId };
};
