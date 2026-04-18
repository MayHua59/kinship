"use client";

import { useMemo, useState } from "react";
import { studyOpportunities } from "@/data/study-opportunities";
import { getStudyRecommendations } from "@/lib/recommendations";

const FIELDS = [
  "STEM",
  "Business",
  "Health",
  "Humanities",
  "Arts",
  "Social Sciences",
];

const LEVELS = ["Bachelors", "Masters", "PhD"];
const TRACKS = [
  { id: "program", label: "Program" },
  { id: "scholarship", label: "Scholarship" },
  { id: "university", label: "University" },
];
const COVERAGE = [
  { id: "any", label: "Any" },
  { id: "full", label: "Full" },
  { id: "partial", label: "Partial" },
];

const INTAKES = ["Spring", "Summer", "Fall", "Winter"];
const LANGUAGES = ["English", "French", "German", "Japanese", "Korean", "Any"];

function InputLabel({ children }) {
  return (
    <span className="block text-sm font-semibold text-gray-700 mb-1">
      {children}
    </span>
  );
}

function Select({ value, onChange, children, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      {...props}
    >
      {children}
    </select>
  );
}

function TextInput(props) {
  return (
    <input
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      {...props}
    />
  );
}

function Pill({ children, tone = "neutral" }) {
  const cls =
    tone === "good"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
      : tone === "warn"
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : "bg-gray-50 text-gray-800 ring-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}
    >
      {children}
    </span>
  );
}

export default function SeekerRecommendations() {
  const [form, setForm] = useState({
    country: "",
    level: "Masters",
    field: "STEM",
    monthlyBudgetUsd: "",
    track: "scholarship",
    scholarshipCoverage: "any",
    intake: "Fall",
    language: "English",
    hasPassport: "yes",
    hasLanguageTest: "not_yet",
    timelineMonths: "6_12",
  });

  const [submitted, setSubmitted] = useState(false);

  const recommendations = useMemo(() => {
    if (!submitted) return [];
    const prefs = {
      ...form,
      language: form.language === "Any" ? "" : form.language,
      monthlyBudgetUsd: form.monthlyBudgetUsd ? Number(form.monthlyBudgetUsd) : 0,
    };
    return getStudyRecommendations(prefs, studyOpportunities, 8);
  }, [form, submitted]);

  function updateField(key, value) {
    setSubmitted(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const isBudgetValid =
    form.monthlyBudgetUsd === "" ||
    (!Number.isNaN(Number(form.monthlyBudgetUsd)) &&
      Number(form.monthlyBudgetUsd) >= 0);

  const canSubmit = Boolean(form.level && form.field && form.track) && isBudgetValid;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Study Recommendations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Answer a few questions and we’ll rank programs, scholarships, or
              universities that match your goals.
            </p>
          </div>
          <Pill tone="neutral">Seeker</Pill>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <InputLabel>Where do you want to study? (country)</InputLabel>
            <TextInput
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              placeholder="Example: Japan, Canada, United Kingdom"
              inputMode="text"
              autoComplete="off"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank if you’re open to multiple countries.
            </p>
          </div>

          <div>
            <InputLabel>Degree level</InputLabel>
            <Select
              value={form.level}
              onChange={(e) => updateField("level", e.target.value)}
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel>Field</InputLabel>
            <Select
              value={form.field}
              onChange={(e) => updateField("field", e.target.value)}
            >
              {FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel>Monthly budget (USD)</InputLabel>
            <TextInput
              value={form.monthlyBudgetUsd}
              onChange={(e) => updateField("monthlyBudgetUsd", e.target.value)}
              placeholder="Example: 1200"
              inputMode="numeric"
            />
            {!isBudgetValid ? (
              <p className="text-xs text-red-600 mt-1">
                Please enter a valid non-negative number.
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                Used as a rough fit (living + fees vary by city/program).
              </p>
            )}
          </div>

          <div>
            <InputLabel>What do you want recommendations for?</InputLabel>
            <Select
              value={form.track}
              onChange={(e) => updateField("track", e.target.value)}
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel>Scholarship preference</InputLabel>
            <Select
              value={form.scholarshipCoverage}
              onChange={(e) => updateField("scholarshipCoverage", e.target.value)}
              disabled={form.track !== "scholarship"}
            >
              {COVERAGE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
            {form.track !== "scholarship" ? (
              <p className="text-xs text-gray-500 mt-1">
                Switch “Recommendations for” to Scholarship to enable.
              </p>
            ) : null}
          </div>

          <div>
            <InputLabel>Preferred intake</InputLabel>
            <Select
              value={form.intake}
              onChange={(e) => updateField("intake", e.target.value)}
            >
              {INTAKES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel>Study language</InputLabel>
            <Select
              value={form.language}
              onChange={(e) => updateField("language", e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <InputLabel>Do you already have a passport?</InputLabel>
            <Select
              value={form.hasPassport}
              onChange={(e) => updateField("hasPassport", e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="in_progress">In progress</option>
            </Select>
          </div>

          <div>
            <InputLabel>Language test status (IELTS/TOEFL, etc.)</InputLabel>
            <Select
              value={form.hasLanguageTest}
              onChange={(e) => updateField("hasLanguageTest", e.target.value)}
            >
              <option value="ready">Already have score</option>
              <option value="not_yet">Not yet</option>
              <option value="not_required">Not required / waiver</option>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <InputLabel>Timeline</InputLabel>
            <Select
              value={form.timelineMonths}
              onChange={(e) => updateField("timelineMonths", e.target.value)}
            >
              <option value="0_3">0–3 months</option>
              <option value="3_6">3–6 months</option>
              <option value="6_12">6–12 months</option>
              <option value="12_plus">12+ months</option>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Used to nudge scholarships/programs with typical intakes.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col xs:flex-row gap-2">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setSubmitted(true)}
            className="xs:flex-1 rounded-xl bg-primary text-white font-semibold py-2.5 px-4 shadow-md shadow-primary/25 ring-1 ring-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 hover:brightness-110 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Get recommendations
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm((prev) => ({
                ...prev,
                country: "",
                monthlyBudgetUsd: "",
              }));
            }}
            className="xs:w-40 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-semibold py-2.5 px-4 transition-all duration-200 hover:border-gray-300"
          >
            Clear
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Results</h3>
          {submitted ? (
            <Pill tone={recommendations.length ? "good" : "warn"}>
              {recommendations.length ? "Ranked" : "No matches"}
            </Pill>
          ) : (
            <Pill tone="neutral">Fill the form</Pill>
          )}
        </div>

        {!submitted ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            Submit the form to see ranked recommendations.
          </div>
        ) : recommendations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            No matches in the current dataset. Next step is to add more
            universities/programs/scholarships to improve coverage.
          </div>
        ) : (
          <ul className="space-y-3">
            {recommendations.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">{r.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {r.provider} · {r.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill tone="neutral">{r.type}</Pill>
                    <Pill tone="good">score {Math.max(0, r.score)}</Pill>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {r.scholarshipCoverage ? (
                    <Pill tone="neutral">{r.scholarshipCoverage} funding</Pill>
                  ) : null}
                  {r.language?.slice(0, 2)?.map((l) => (
                    <Pill key={l} tone="neutral">
                      {l}
                    </Pill>
                  ))}
                  {r.intakes?.slice(0, 2)?.map((i) => (
                    <Pill key={i} tone="neutral">
                      {i} intake
                    </Pill>
                  ))}
                  {r.typicalMonthlyBudgetUsd ? (
                    <Pill tone="neutral">~${r.typicalMonthlyBudgetUsd}/mo</Pill>
                  ) : null}
                </div>

                <ul className="mt-3 text-sm text-gray-700 space-y-1">
                  {r.reasons?.slice(0, 3)?.map((reason, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-accent" aria-hidden>
                        ✓
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>

                {r.link ? (
                  <div className="mt-4">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
                    >
                      Open official page
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

