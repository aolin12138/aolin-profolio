import React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import emailjs from "@emailjs/browser";

import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "@/hoc";
import { slideIn, textVariant } from "../utils/motion";
import TextPressureSimple from "@/components/ui/TextPressureSimple";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_usu13c8',
      'template_7g0qptu',
      {
        from_name: form.name,
        to_name: "Aolin",
        from_email: form.email,
        to_email: "aolin12138@gmail.com",
        message: form.message,
      },
      '90k_6at-mzZiiHHVN'
    )
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      }, (error) => {
        setLoading(false);
        console.error(error);

        alert("Ahh, something went wrong. Please try again.");
      });
  }

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-tertiary p-8 rounded-2xl'
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Get in touch</p>
          <div className="w-full h-[60px] sm:h-[80px] md:h-[100px] mb-4">
            <TextPressureSimple
              text="Contact."
              textColor="#ffffff"
              minFontSize={60}
              className="cursor-pointer"
            />
          </div>
        </motion.div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex flex-col gap-8 mt-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-[#1a1444] py-4 px-6 placeholder:text-[#7d7a94] text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className='bg-[#1a1444] py-4 px-6 placeholder:text-[#7d7a94] text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Tell me about you!'
              className='bg-[#1a1444] py-4 px-6 placeholder:text-[#7d7a94] text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-[#1a1444] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-[#915EFF] transition-colors hover:cursor-pointer'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default SectionWrapper(Contact, "contact");