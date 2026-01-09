import React from 'react';

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow flex justify-center items-center py-6 gap-8 rounded-b-xl mb-8">
    <a href="#about" className="nav-link text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">About</a>
    <a href="#projects" className="nav-link text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Projects</a>
    <a href="#skills" className="nav-link text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Skills</a>
    <a href="#contact" className="nav-link text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">Contact</a>
  </nav>
);

export default Navbar;
