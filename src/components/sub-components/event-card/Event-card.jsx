import React from "react";

const EventCard = () => {
    const eventDetails = {
        name: "Hackathon 2025",
        date: "March 15, 2025",
        venue: "Auditorium",
        description: "Join us for an exciting hackathon where developers compete to build innovative solutions.",
      };

    return (
      <header className=" flex flex-col gap-y-7 items-center text-center p-4 w-[550px] h-[350px]">
        <div>
          <h3 className="text-2xl font-bold text-center">{eventDetails.name}</h3>
        </div>
        <div className="space-y-3">
          <div className="text-white text-sm">
            <span>{eventDetails.date}</span>
          </div>
          <div className="text-white">
          <span>{eventDetails.venue}</span>
          </div>
          <p className="text-white text-xl font-bold">{eventDetails.description}</p>
          <div className="w-full mt-15 bg-gradient-to-r from-blue-600 via-red-400 to-pink-800 p-4 text-2xl hover:bg-blue-700 rounded-3xl font-bold text-white">Register Now</div>
        </div>
      </header>
    );
  };

export default EventCard;