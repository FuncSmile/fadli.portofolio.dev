import React from 'react';

const Projects = () => (
  <section id="projects" className="py-16 bg-blue-50 rounded-xl my-8">
    <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Projects</h2>
    <div className="flex flex-wrap justify-center gap-8 mt-4">
      {/* Example project cards, replace with your own */}
      <div className="project-card bg-white rounded-2xl shadow-lg p-8 w-80 hover:-translate-y-2 hover:shadow-2xl transition-all border-t-4 border-blue-400">
        <h3 className="text-xl font-semibold mb-2">Modern Portfolio</h3>
        <p className="text-gray-600">A beautiful, fast, and interactive portfolio built with Astro and React.</p>
      </div>
      <div className="project-card bg-white rounded-2xl shadow-lg p-8 w-80 hover:-translate-y-2 hover:shadow-2xl transition-all border-t-4 border-yellow-400">
        <h3 className="text-xl font-semibold mb-2">UI Components Library</h3>
        <p className="text-gray-600">Reusable, accessible React components for rapid development.</p>
      </div>
    </div>
  </section>
);

export default Projects;
