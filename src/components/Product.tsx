import React from "react";

const features = [
  {
    title: "Blazing Fast",
    desc: "Experience unmatched speed and reliability with our cloud-native platform.",
  },
  {
    title: "Collaboration",
    desc: "Work seamlessly with your team in real time, from anywhere in the world.",
  },
  {
    title: "Customizable",
    desc: "Easily tailor Godspeed to fit your workflow and business needs.",
  },
];

const Product: React.FC = () => (
  <section id="product" className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">Our Product</h2>
      <p className="mb-10 text-gray-600 dark:text-gray-300">
        Godspeed brings you a suite of tools designed for productivity, collaboration, and growth. Discover the features that set us apart.
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex-1 bg-blue-50 dark:bg-gray-800 p-8 rounded-xl shadow hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-200">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Product;
