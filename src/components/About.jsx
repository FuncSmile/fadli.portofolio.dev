import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => (
  <section id="about" className="py-16 text-center flex flex-col items-center">
    <motion.img
      src="https://ui-avatars.com/api/?name=Your+Name&background=4f8cff&color=fff&size=128"
      alt="Profile"
      className="w-32 h-32 rounded-full shadow-lg mb-6 border-4 border-white"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    />
    <motion.h1
      className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      Your Name
    </motion.h1>
    <motion.h2
      className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
    >
      Web Developer & UI Enthusiast
    </motion.h2>
    <motion.p
      className="max-w-xl mx-auto text-gray-600 text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
    >
      I am a passionate developer focused on building modern, performant, and beautiful web experiences. I love working with new technologies and creating interactive, user-friendly interfaces.
    </motion.p>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="mt-8">
      <Button size="lg" variant="default" asChild>
        <a href="#contact">Contact Me</a>
      </Button>
    </motion.div>
  </section>
);

export default About;
