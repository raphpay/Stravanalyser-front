import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

import indicators from "../business-logic/data/indicators.json";

export default function HelpPage() {
  const navigate = useNavigate();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        className="fixed top-6 left-6 w-12 h-12 text-orange-500  cursor-pointer"
        onClick={() => navigate(-1)}
        aria-label="retour"
        title="Retour"
      >
        Retour
      </button>
      <ul className="divide-y divide-gray-300">
        {indicators.map(({ shortcut, longName, description }, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <li key={shortcut} className="py-3">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="w-full flex items-center justify-between font-semibold text-lg focus:outline-none"
                aria-expanded={isExpanded}
                aria-controls={`desc-${i}`}
                id={`btn-${i}`}
              >
                <span>
                  {shortcut} — {longName}
                </span>
                {/* Flèche qui pivote */}
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              {isExpanded && (
                <div
                  id={`desc-${i}`}
                  role="region"
                  aria-labelledby={`btn-${i}`}
                  className="mt-2 prose prose-sm max-w-none"
                >
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
