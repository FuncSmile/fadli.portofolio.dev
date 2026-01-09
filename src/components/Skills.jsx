import React from 'react';

const Skills = () => (
  <section id="skills" className="py-16 text-center">
    <h2 className="text-3xl font-bold mb-8 text-blue-700">Skills</h2>
    <ul className="flex flex-wrap justify-center gap-4 mt-4 list-none p-0">
      {['React', 'Astro', 'JavaScript', 'CSS', 'UI/UX', 'Performance'].map(skill => (
        <li key={skill} className="bg-blue-500 text-white rounded-full px-6 py-2 font-medium text-lg shadow hover:bg-blue-700 transition-all">
          {skill}
        </li>
      ))}
    </ul>
  </section>
);

export default Skills;
