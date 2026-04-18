function normalizeStr(v) {
  return String(v ?? "").trim().toLowerCase();
}

function includesAny(haystackArr, needlesArr) {
  const hay = (haystackArr ?? []).map(normalizeStr);
  const needles = (needlesArr ?? []).map(normalizeStr).filter(Boolean);
  if (needles.length === 0) return true;
  return needles.some((n) => hay.includes(n));
}

function matchesOne(value, options) {
  const v = normalizeStr(value);
  if (!v) return true;
  return (options ?? []).map(normalizeStr).includes(v);
}

function scoreOpportunity(pref, opp) {
  let score = 0;
  const reasons = [];

  const desiredCountry = normalizeStr(pref.country);
  const desiredLevel = normalizeStr(pref.level);
  const desiredField = normalizeStr(pref.field);
  const desiredTrack = normalizeStr(pref.track); // "program" | "scholarship" | "university"
  const desiredCoverage = normalizeStr(pref.scholarshipCoverage); // "full" | "partial" | "any"
  const desiredIntake = normalizeStr(pref.intake);
  const desiredLanguage = normalizeStr(pref.language);
  const budget = Number(pref.monthlyBudgetUsd || 0);

  if (desiredTrack && normalizeStr(opp.type) === desiredTrack) {
    score += 25;
    reasons.push(`Matches your preference: ${opp.type}`);
  }

  if (desiredCountry && normalizeStr(opp.country) === desiredCountry) {
    score += 25;
    reasons.push(`Country match: ${opp.country}`);
  }

  if (desiredLevel && matchesOne(desiredLevel, opp.levels)) {
    score += 20;
    reasons.push(`Level match: ${pref.level}`);
  }

  if (desiredField && matchesOne(desiredField, opp.fields)) {
    score += 20;
    reasons.push(`Field match: ${pref.field}`);
  }

  if (desiredLanguage && includesAny(opp.language, [desiredLanguage])) {
    score += 10;
    reasons.push(`Language supported: ${pref.language}`);
  }

  if (desiredIntake && includesAny(opp.intakes, [desiredIntake])) {
    score += 8;
    reasons.push(`Intake available: ${pref.intake}`);
  }

  if (desiredTrack === "scholarship") {
    if (desiredCoverage === "any" || !desiredCoverage) {
      score += 0;
    } else if (normalizeStr(opp.scholarshipCoverage) === desiredCoverage) {
      score += 12;
      reasons.push(`Scholarship coverage: ${opp.scholarshipCoverage}`);
    } else if (!opp.scholarshipCoverage) {
      score -= 8;
    } else {
      score -= 4;
    }
  } else if (desiredCoverage && desiredCoverage !== "any") {
    // If user cares about coverage but didn't pick scholarship track, treat it as a soft preference.
    if (normalizeStr(opp.scholarshipCoverage) === desiredCoverage) {
      score += 6;
      reasons.push(`Has ${opp.scholarshipCoverage} funding option`);
    }
  }

  if (budget > 0 && Number.isFinite(budget) && opp.typicalMonthlyBudgetUsd) {
    const diff = budget - opp.typicalMonthlyBudgetUsd;
    if (diff >= 0) {
      score += 10;
      reasons.push(`Budget fit: ~$${opp.typicalMonthlyBudgetUsd}/mo typical`);
    } else if (diff >= -200) {
      score += 4;
      reasons.push(`Near budget: ~$${opp.typicalMonthlyBudgetUsd}/mo typical`);
    } else {
      score -= 6;
      reasons.push(`May exceed budget (~$${opp.typicalMonthlyBudgetUsd}/mo)`);
    }
  }

  // Small boost for scholarships when budget is tight
  if (budget > 0 && budget <= 1000 && normalizeStr(opp.type) === "scholarship") {
    score += 5;
  }

  return { score, reasons };
}

export function getStudyRecommendations(preferences, opportunities, limit = 8) {
  const prefs = preferences ?? {};
  const opps = opportunities ?? [];

  const desiredTrack = normalizeStr(prefs.track);
  const desiredCoverage = normalizeStr(prefs.scholarshipCoverage);

  const filtered = opps.filter((o) => {
    if (desiredTrack && normalizeStr(o.type) !== desiredTrack) return false;
    if (
      desiredTrack === "scholarship" &&
      desiredCoverage &&
      desiredCoverage !== "any" &&
      normalizeStr(o.scholarshipCoverage) &&
      normalizeStr(o.scholarshipCoverage) !== desiredCoverage
    ) {
      return false;
    }
    return true;
  });

  const scored = filtered
    .map((opp) => {
      const { score, reasons } = scoreOpportunity(prefs, opp);
      return { ...opp, score, reasons };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, Math.max(1, limit));
}

