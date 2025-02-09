"use client";

import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ data }) => {
	console.log(data);
  const { data: session } = useSession();
  
  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;
    
    const bookingPayload = {
      customerName: name,
      email,
      date,
      phone,
      address,

	//   extra information 
      service_id: data._id,
      service_name: data.title,
      service_img: data.img,
      service_price: data.price,
    };
	console.table(bookingPayload);
// `http://localhost:3000/api/service/${p.id}`
    const res = await fetch(
      "http://localhost:3000/api/service",
      {
        method: "POST",
        body: JSON.stringify(bookingPayload),
      }
    );
    const postedResponse = await res.json();
	console.log('posted data -------->',postedResponse);
  };

  

  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Book Service: <span className="text-blue-600">{data?.title}</span>
        </h2>
        <form onSubmit={handleBookService} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                type="text"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 font-medium">Due Amount</label>
            <input
              type="text"
              defaultValue={data?.price}
              readOnly
              name="price"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Date</label>
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Present Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-accent"
          >
            Order Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
