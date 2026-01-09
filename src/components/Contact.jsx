import React from 'react';

const Contact = () => (
  <section id="contact" className="py-16 bg-blue-50 rounded-xl my-8 text-center">
    <h2 className="text-3xl font-bold mb-4 text-blue-700">Contact</h2>
    <p className="max-w-xl mx-auto text-gray-600 text-lg mb-6">
      Interested in working together or want to say hi? Reach out via email below!
    </p>
    <a
      href="mailto:your.email@example.com"
      className="inline-block mt-4 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-800 transition-all"
    >
      Email Me
    </a>
  </section>
);

export default Contact;
