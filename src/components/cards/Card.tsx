import React from "react";

export default function Card({
  id,
  image,
  name,
  location,
}: {
  id: string;
  image: string;
  name: string;
  location: string;
}) {
  return (
    <div className="flex justify-start gap-4 shadow-xl rounded-xl">
      <div>
        <img
          src={image}
          alt={name}
          width="200"
          height="200"
          className="rounded-r-none rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-xl font-light">
          <h1>
            <span className="mr-2 font-semibold ">#id:</span> {id}
          </h1>
        </div>
        <div className="text-xl font-light">
          <h1>
            <span className="mr-2 font-semibold ">Name:</span>
            {name}
          </h1>
          <h1>
            <span className="mr-2 font-semibold">Location:</span>
            {location}
          </h1>
        </div>
      </div>
    </div>
  );
}
