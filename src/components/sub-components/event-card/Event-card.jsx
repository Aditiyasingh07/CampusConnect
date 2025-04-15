import React from "react";

const EventCard = () => {
    const eventDetails = {
        name: "Hackathon 2025",
        date: "March 15, 2025",
        venue: "Auditorium",
        description: "Join us for an exciting hackathon where developers compete to build innovative solutions.",
      };

    return (
      <header className=" flex flex-col gap-y-7 items-center text-center p-4 md:w-[550px] w-[1250px] md:h-[100%] h-[120%]">
        <div>
          <h3 className="md:text-2xl text-[5rem] font-bold text-center">{eventDetails.name}</h3>
        </div>
        <div className="space-y-3">
          <div className="text-white md:text-sm text-[2rem]">
            <span>{eventDetails.date}</span>
          </div>
          <div className="text-white md:text-sm text-[] ">
          <span>{eventDetails.venue}</span>
          </div>
          <p className="text-white md:text-xl text-[3rem] font-bold">{eventDetails.description}</p>
          <div className="w-full mt-10 bg-gradient-to-r from-blue-600 via-red-400 to-pink-800 p-4 md:text-2xl text-[3rem] hover:bg-blue-700 rounded-3xl font-bold text-white">Register Now</div>
        </div>
      </header>
    );
  };

export default EventCard;