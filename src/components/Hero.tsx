import React from "react";

const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 text-center pt-24 pb-28"
  >
    {/* Decorative background blobs */}
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full opacity-30 blur-3xl animate-blob1" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full opacity-20 blur-2xl animate-blob2" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-2xl animate-blob3" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-700 dark:text-blue-400 opacity-0 animate-fade-in-up">
        The <span className="text-blue-500 dark:text-blue-300">Open Source</span> Backend Platform <br className="hidden md:block" />
        for <span className="text-blue-700 dark:text-blue-300">Modern Developers</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-200 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-150">
        Godspeed lets you rapidly build, scale, and manage event-driven, microservices-based backends with minimal code. Focus on your business logic, not boilerplate.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-300">
        <a
          href="https://godspeed.systems/docs/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-semibold text-lg transform hover:scale-105 active:scale-95"
        >
          Get Started
        </a>
        <a
          href="https://github.com/godspeed-system/godspeed"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 dark:text-blue-300 rounded-lg shadow-lg hover:bg-blue-50 dark:hover:bg-gray-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition font-semibold text-lg transform hover:scale-105 active:scale-95"
        >
          Star on GitHub
        </a>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Event-Driven</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Microservices</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">No Boilerplate</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Extensible</span>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Cloud-Native</span>
      </div>
    </div>
    {/* Scroll down indicator with adjusted position */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-80">
      <span className="text-gray-400 dark:text-gray-500 text-xs mb-1">Scroll Down</span>
      <svg className="w-7 h-7 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <style>{`
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(40px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.9s cubic-bezier(.23,1.01,.32,1) forwards;
      }
      .animate-fade-in-up.delay-150 { animation-delay: 0.15s; }
      .animate-fade-in-up.delay-300 { animation-delay: 0.3s; }
      @keyframes blob1 {
        0%, 100% { transform: translateY(0px) scale(1);}
        50% { transform: translateY(-40px) scale(1.1);}
      }
      @keyframes blob2 {
        0%, 100% { transform: translateY(0px) scale(1);}
        50% { transform: translateY(30px) scale(0.95);}
      }
      @keyframes blob3 {
        0%, 100% { transform: translateX(0px) scale(1);}
        50% { transform: translateX(-30px) scale(1.08);}
      }
      .animate-blob1 { animation: blob1 9s infinite ease-in-out; }
      .animate-blob2 { animation: blob2 7s infinite ease-in-out; }
      .animate-blob3 { animation: blob3 11s infinite ease-in-out; }
    `}</style>
  </section>
);

export default Hero;
