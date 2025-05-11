import React, { useEffect, useState } from "react";

const aboutText =
  "Godspeed is an open-source backend platform that empowers developers to build, scale, and manage event-driven, microservices-based applications with minimal code. Designed for productivity, flexibility, and cloud-native scalability.";

const stats = [
  { label: "Integrations", end: 30, suffix: "+" },
  { label: "GitHub Stars", end: 1000, suffix: "+" },
  { label: "Community", end: 2000, suffix: "+" },
];

const About: React.FC = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  // Typewriter effect
  useEffect(() => {
    if (displayed.length < aboutText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(aboutText.slice(0, displayed.length + 1));
      }, 14);
      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [displayed]);

  // Animated counters
  useEffect(() => {
    if (!done) return;
    stats.forEach((stat, i) => {
      if (counts[i] < stat.end) {
        const interval = setInterval(() => {
          setCounts((prev) => {
            const next = [...prev];
            const increment = stat.end > 1000 ? 37 : 1;
            next[i] = Math.min(next[i] + increment, stat.end);
            return next;
          });
        }, 20 + i * 40);
        return () => clearInterval(interval);
      }
    });
    // eslint-disable-next-line
  }, [done]);

  return (
    <section
      id="about"
      className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="absolute -top-24 -left-32 w-96 h-96 bg-blue-100 dark:bg-blue-900 opacity-30 blur-3xl rounded-full pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">
          About Godspeed
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 min-h-[72px] font-medium text-lg md:text-xl transition-all duration-200">
          <span>
            {displayed}
            <span className="border-r-2 border-blue-400 animate-pulse ml-1">
              {displayed.length < aboutText.length ? " " : ""}
            </span>
          </span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-blue-50 dark:bg-gray-800 rounded-xl shadow p-6 min-w-[120px] transition-transform hover:scale-105"
            >
              <span className="block text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-300 tabular-nums">
                {counts[i]}
                {stat.suffix}
              </span>
              <span className="text-gray-500 dark:text-gray-200 font-semibold text-base mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .blur-3xl {
          filter: blur(64px);
        }
      `}</style>
    </section>
  );
};

export default About;
