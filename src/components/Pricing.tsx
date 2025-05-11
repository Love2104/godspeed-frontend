import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type PricingProps = {
  isLoggedIn: boolean;
};

const plans = [
  {
    name: "Starter",
    price: "$19/mo",
    features: ["All core features", "Email support", "1 user"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: ["Everything in Starter", "Priority support", "Up to 5 users"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Contact us",
    features: ["All Pro features", "Dedicated support", "Unlimited users"],
    highlight: false,
  },
];

const Pricing: React.FC<PricingProps> = ({ isLoggedIn }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string) => {
    setSelected(planName);
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate("/auth", { state: { plan: planName } });
      }, 800); // Show message briefly before redirect
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 animate-fade-in">
          Pricing
        </h2>
        <p className="mb-10 text-gray-600 dark:text-gray-300 animate-fade-in delay-100">
          Simple, transparent pricing for teams of any size. No hidden fees.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`
                group flex-1 flex flex-col justify-between rounded-xl border shadow-lg p-8 transition
                transform hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
                ${plan.highlight
                  ? "border-blue-600 bg-white dark:bg-gray-900 scale-105"
                  : "border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-700"}
                ${selected === plan.name ? "ring-4 ring-blue-400" : ""}
                cursor-pointer
                animate-fade-in
                min-h-[430px]
              `}
              style={{ animationDelay: `${idx * 150}ms` }}
              onClick={() => handlePlanSelect(plan.name)}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePlanSelect(plan.name);
              }}
            >
              <div>
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
              </div>
              <button
                className={`
                  w-full py-2 rounded font-semibold transition
                  duration-200 ease-in-out mt-auto
                  ${plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-800"}
                  ${selected === plan.name
                      ? "ring-2 ring-blue-400 scale-105"
                      : ""}
                  group-hover:scale-105 group-hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.name);
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
            {!isLoggedIn && (
              <span className="ml-2 text-sm text-gray-500">(Redirecting to sign in...)</span>
            )}
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
