import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("movdvgvp");

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: "", number: "", email: "", message: "" });
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (state.succeeded) {
    return (
      <p className="bg-[#ffb800] text-white text-3xl rounded-3xl font-bold p-5">
        Thanks for joining!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className=" equ-form rounded-2xl md:w-[50%] w-[70%] m-auto md:mt-30 mt-20"
    >
      <div className="flex flex-col md:gap-5 gap-5 rounded-3xl px-5 py-10 justify-center items-center md:mt-[-10px] mt-0">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <input
          type="number"
          name="number"
          placeholder="Enter your phone no."
          className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <ValidationError prefix="Number" field="number" errors={state.errors} />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="md:w-[30rem] w-[60rem] md:h-[3rem] h-[7rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea
          placeholder="Enter your message"
          className="md:w-[30rem] w-[60rem] md:h-[5rem] h-[10rem] md:text-xl text-5xl rounded-2xl p-2 pl-7 text-white border-gray-200 border-2"
          value={formData.message}
          name="message"
          onChange={handleChange}
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-[#ffb800] text-black font-dis md:w-[10rem] w-[18rem] md:h-[3rem] h-[7rem] rounded-full md:text-2xl text-5xl ml-2 md:mt-0 mt-5"
        >
          Enquiry
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
