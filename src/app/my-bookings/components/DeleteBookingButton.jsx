"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function DeleteBookingButton({ id }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3000/api/service/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your booking has been deleted.",
            icon: "success",
          });
          router.refresh();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete booking.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <FaTrash
        onClick={() => handleDelete(id)}
        className="h-8 w-8 text-red-500 hover:text-red-700 cursor-pointer"
      />
    </div>
  );
}
