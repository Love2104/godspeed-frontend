import React, { useState } from "react";

// Team data
const team = [
  {
    name: "Arun Singh",
    role: "Engineering Leadership, SRE & DevOps",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    bio: "Engineering leader with expertise in SRE, DevOps, and platform engineering.",
    socials: { linkedin: "https://www.linkedin.com/in/arun-singh/" },
  },
  {
    name: "Avtar Singh",
    role: "DevOps Engineer",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "DevOps engineer driving automation and infrastructure at Godspeed.",
    socials: { linkedin: "https://www.linkedin.com/in/avtar-singh/" },
  },
  {
    name: "Sakshi Arora",
    role: "Developer, Scrum Master & Coordinator",
    img: "https://randomuser.me/api/portraits/women/13.jpg",
    bio: "Full stack developer and scrum master, coordinating modern distributed projects.",
    socials: { linkedin: "https://www.linkedin.com/in/sakshi-arora/" },
  },
  {
    name: "Dharuv Manchanda",
    role: "Full Stack Developer",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    bio: "Innovator in distributed and agentic systems, passionate about Node.js, React, and AI-powered development.",
    socials: { linkedin: "https://www.linkedin.com/in/dharuv-manchanda/" },
  },
];

const socialIcons = {
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.27c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.27h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.36-1.54 2.8-1.54 3 0 3.56 1.98 3.56 4.56v4.75z"/>
    </svg>
  ),
};

export default function TeamHorizontalTimeline() {
  const [active, setActive] = useState<number | null>(null);

  // Layout constants
  const avatarSize = 96;
  const gap = 120;
  const count = team.length;
  const timelineLength = (count - 1) * gap + avatarSize;
  // Center avatars in the section
  const containerWidth = Math.max(520, timelineLength + 80);

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-700 dark:text-blue-400">
          Meet the Godspeed Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our journey, one engineer at a time.
        </p>
      </div>
      <div className="relative mx-auto" style={{
        width: containerWidth,
        minWidth: containerWidth,
        height: 360,
        display: 'flex',
        justifyContent: 'center'
      }}>
        {/* Horizontal glowing timeline */}
        <div
          className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 dark:from-blue-800 dark:via-blue-900 dark:to-blue-800 rounded-full animate-glow-timeline"
          style={{ width: timelineLength + 80, left: `calc(50% - ${timelineLength / 2 + 40}px)`, transform: "translateY(-50%)" }}
        />
        {/* Avatars and connectors */}
        {team.map((member, idx) => {
          // Calculate the left offset so avatars are centered
          const left = (containerWidth - timelineLength) / 2 + idx * gap;
          const isAbove = idx % 2 === 0;
          return (
            <div key={member.name} style={{ left, position: "absolute", top: isAbove ? 40 : 200, width: avatarSize }}>
              {/* Connector dot */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-900 z-10 shadow-lg animate-glow-dot`}
                style={{ top: isAbove ? avatarSize + 10 : -10 }}
              ></span>
              {/* Avatar */}
              <button
                className="relative group focus:outline-none"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                aria-label={member.name}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className={`w-24 h-24 rounded-full shadow-lg border-4 border-blue-200 dark:border-blue-700 object-cover transition-transform duration-300 ${
                    active === idx ? "scale-110 ring-4 ring-blue-400" : ""
                  }`}
                />
                {/* Animated ring on hover */}
                <span
                  className={`absolute inset-0 rounded-full pointer-events-none ${
                    active === idx ? "animate-glow-dot" : ""
                  }`}
                />
              </button>
              {/* Floating info panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 ${
                  isAbove ? "top-28" : "bottom-28"
                } max-w-xs bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-blue-100 dark:border-blue-700 p-4 text-center transition-all duration-300
                  ${active === idx ? "opacity-100 scale-100 z-20" : "opacity-0 scale-95 -z-10 pointer-events-none"}
                `}
                style={{ minWidth: 220 }}
              >
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 text-lg">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-200 text-sm">{member.role}</p>
                <p className="text-gray-400 dark:text-gray-400 text-xs mt-1">{member.bio}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  {Object.entries(member.socials).map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-300 hover:text-blue-800"
                    >
                      {socialIcons[key as keyof typeof socialIcons]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile fallback */}
      <div className="md:hidden flex flex-col items-center gap-8 mt-10">
        {team.map((member, i) => (
          <div key={member.name} className="flex flex-col items-center">
            <img
              src={member.img}
              alt={member.name}
              className="w-20 h-20 rounded-full border-4 border-blue-200 dark:border-blue-700 shadow-lg mb-2"
            />
            <h3 className="font-bold text-blue-700 dark:text-blue-300">{member.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-200">{member.role}</p>
            <div className="flex space-x-2 mt-1">
              {Object.entries(member.socials).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-300 hover:text-blue-800"
                >
                  {socialIcons[key as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Custom glow animation */}
      <style>{`
        @keyframes glow-timeline {
          0% { box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6; }
          100% { box-shadow: 0 0 40px #2563eb, 0 0 80px #2563eb; }
        }
        .animate-glow-timeline {
          animation: glow-timeline 2s infinite alternate;
        }
        @keyframes glow-dot {
          0% { box-shadow: 0 0 8px #3b82f6, 0 0 16px #3b82f6; }
          100% { box-shadow: 0 0 24px #2563eb, 0 0 48px #2563eb; }
        }
        .animate-glow-dot {
          animation: glow-dot 1.2s infinite alternate;
        }
      `}</style>
    </section>
  );
}
