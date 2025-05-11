import os

components = {
    "Navbar.tsx": '''import React, { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Product", href: "#product" },
  { name: "Team", href: "#team" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      let found = false;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.querySelector(navLinks[i].href);
        if (section) {
          const rect = (section as HTMLElement).getBoundingClientRect();
          if (rect.top <= 80) {
            setActive(navLinks[i].href);
            found = True;
            break;
          }
        }
      }
      if (!found) setActive("#hero");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleNavClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={\`fixed w-full top-0 left-0 z-50 transition-all duration-300
        \${scrolled ? "bg-white/90 shadow-lg backdrop-blur dark:bg-gray-900/90" : "bg-transparent"}
      \`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <div className="font-extrabold text-2xl text-blue-600 dark:text-blue-400 tracking-tight select-none flex items-center gap-2">
          <span role="img" aria-label="rocket">🚀</span>
          Godspeed <span className="hidden sm:inline font-light text-base text-gray-500 dark:text-gray-300 ml-2">Landing Platform</span>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <button
                className={\`px-3 py-2 font-medium transition text-lg
                  \${active === link.href
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"}
                \`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.name}
                <span
                  className={\`block h-0.5 rounded transition-all duration-300
                    \${active === link.href
                        ? "w-full bg-blue-600 dark:bg-blue-400 mt-1"
                        : "w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full mt-1"}
                  \`}
                ></span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="ml-4 mr-2 text-2xl focus:outline-none transition"
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <span role="img" aria-label="Light">🌞</span>
          ) : (
            <span role="img" aria-label="Dark">🌙</span>
          )}
        </button>
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative group"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={\`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded transition-transform duration-300 \${menuOpen ? "rotate-45 translate-y-1.5" : ""}\`}
          ></span>
          <span
            className={\`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded my-1 transition-all duration-300 \${menuOpen ? "opacity-0" : ""}\`}
          ></span>
          <span
            className={\`block h-0.5 w-6 bg-blue-600 dark:bg-blue-300 rounded transition-transform duration-300 \${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}\`}
          ></span>
        </button>
      </div>
      {menuOpen && (
        <ul className="md:hidden bg-white dark:bg-gray-900 shadow-lg px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                className={\`block w-full text-left px-3 py-2 rounded transition
                  \${active === link.href
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold"
                      : "hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200"}
                \`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
''',

    "Hero.tsx": '''import React from "react";

const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 text-center pt-24"
  >
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full opacity-30 blur-3xl animate-blob1" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-blue-400 dark:bg-blue-700 rounded-full opacity-20 blur-2xl animate-blob2" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-2xl animate-blob3" />
    </div>
    <div className="relative z-10">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-700 dark:text-blue-400 opacity-0 animate-fade-in-up">
        Supercharge Your <span className="text-blue-500 dark:text-blue-300">Team</span> with Godspeed
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-200 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-150">
        The all-in-one platform to boost productivity, foster collaboration, and accelerate your business growth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-300">
        <a
          href="#product"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-semibold text-lg transform hover:scale-105 active:scale-95"
        >
          Get Started
        </a>
        <a
          href="#about"
          className="px-8 py-3 bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 dark:text-blue-300 rounded-lg shadow-lg hover:bg-blue-50 dark:hover:bg-gray-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition font-semibold text-lg transform hover:scale-105 active:scale-95"
        >
          Learn More
        </a>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-80">
      <span className="text-gray-400 dark:text-gray-500 text-xs mb-1">Scroll Down</span>
      <svg className="w-7 h-7 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <style>{\`
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
    \`}</style>
  </section>
);

export default Hero;
''',

    "Product.tsx": '''import React from "react";

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
''',

    "Team.tsx": '''import React from "react";

const team = [
  { name: "Alice Johnson", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Bob Lee", role: "CTO", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Carol Smith", role: "Lead Designer", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Dave Kim", role: "Full Stack Engineer", img: "https://randomuser.me/api/portraits/men/4.jpg" },
];

const Team: React.FC = () => (
  <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">Meet the Godspeed Team</h2>
      <p className="mb-10 text-gray-600 dark:text-gray-300">
        Our passionate team is dedicated to building the future of productivity.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col items-center opacity-0 animate-fade-in-up delay-100 hover:scale-105 transition-transform">
            <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-2 shadow-lg" />
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">{member.name}</h3>
            <p className="text-gray-500 dark:text-gray-200">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
    <style>{\`
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(40px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.9s cubic-bezier(.23,1.01,.32,1) forwards;
      }
      .animate-fade-in-up.delay-100 {
        animation-delay: 0.1s;
      }
    \`}</style>
  </section>
);

export default Team;
''',

    "About.tsx": '''import React from "react";

const About: React.FC = () => (
  <section id="about" className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">About Godspeed</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Godspeed was founded to empower teams and creators with tools that are fast, intuitive, and collaborative. Our mission is to help you achieve more, together.
      </p>
      <div className="flex justify-center gap-8 mt-8">
        <div className="opacity-0 animate-fade-in-up delay-100">
          <span className="block text-2xl font-bold text-blue-600 dark:text-blue-300">10K+</span>
          <span className="text-gray-500 dark:text-gray-200">Users</span>
        </div>
        <div className="opacity-0 animate-fade-in-up delay-200">
          <span className="block text-2xl font-bold text-blue-600 dark:text-blue-300">100+</span>
          <span className="text-gray-500 dark:text-gray-200">Companies</span>
        </div>
        <div className="opacity-0 animate-fade-in-up delay-300">
          <span className="block text-2xl font-bold text-blue-600 dark:text-blue-300">5</span>
          <span className="text-gray-500 dark:text-gray-200">Years</span>
        </div>
      </div>
    </div>
    <style>{\`
      @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(40px);}
        100% { opacity: 1; transform: translateY(0);}
      }
      .animate-fade-in-up {
        animation: fadeInUp 0.9s cubic-bezier(.23,1.01,.32,1) forwards;
      }
      .animate-fade-in-up.delay-100 {
        animation-delay: 0.1s;
      }
      .animate-fade-in-up.delay-200 {
        animation-delay: 0.2s;
      }
      .animate-fade-in-up.delay-300 {
        animation-delay: 0.3s;
      }
    \`}</style>
  </section>
);

export default About;
''',

    "Pricing.tsx": '''import React, { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "$19/mo",
    features: [
      "All core features",
      "Email support",
      "1 user",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: [
      "Everything in Starter",
      "Priority support",
      "Up to 5 users",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: [
      "All Pro features",
      "Dedicated support",
      "Unlimited users",
    ],
    highlight: false,
  },
];

const Pricing: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 animate-fade-in">
          Pricing
        </h2>
        <p className="mb-10 text-gray-600 dark:text-gray-300 animate-fade-in delay-100">
          Simple, transparent pricing for teams of any size. No hidden fees.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={\`
                group flex-1 rounded-xl border shadow-lg p-8 transition
                transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
                \${plan.highlight
                  ? "border-blue-600 bg-white dark:bg-gray-900 scale-105"
                  : "border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-700"}
                \${selected === plan.name ? "ring-4 ring-blue-400" : ""}
                cursor-pointer
                animate-fade-in
              \`}
              style={{ animationDelay: \`\${idx * 150}ms\` }}
              onClick={() => setSelected(plan.name)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(plan.name);
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
                {plan.name}
                {plan.highlight && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs rounded-full animate-pulse">
                    Recommended
                  </span>
                )}
              </h3>
              <div className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                {plan.price}
              </div>
              <ul className="mb-6 text-gray-600 dark:text-gray-200 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block w-5 h-5 text-blue-500 dark:text-blue-300 transition-transform group-hover:scale-125">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={\`
                  w-full py-2 rounded font-semibold transition
                  duration-200 ease-in-out
                  \${plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"}
                  \${selected === plan.name
                      ? "ring-2 ring-blue-400 scale-105"
                      : ""}
                  group-hover:scale-105 group-hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                \`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(plan.name);
                }}
              >
                {plan.price === "Contact us" ? "Contact Sales" : selected === plan.name ? "Selected" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
        {selected && (
          <div className="mt-8 text-blue-700 dark:text-blue-300 font-semibold animate-fade-in">
            You selected: <span className="underline">{selected}</span>
          </div>
        )}
      </div>
      <style>
        {`
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.7s forwards;
        }
        .animate-fade-in.delay-100 {
          animation-delay: 0.1s;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        `}
      </style>
    </section>
  );
};

export default Pricing;
''',
}

# Create src/components if not exists
os.makedirs("src/components", exist_ok=True)

# Write each component file
for fname, code in components.items():
    with open(os.path.join("src/components", fname), "w", encoding="utf-8") as f:
        f.write(code)

print("All advanced Godspeed React components have been created in src/components/")
