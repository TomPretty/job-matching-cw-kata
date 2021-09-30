import { match } from "./jobMatch";

describe("match", () => {
  it("matches with a single requirement and a single sufficient skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "JavaScript", experience: 3 }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeTruthy();
  });

  it("matches with a single requirement and one sufficient skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "Ruby", experience: 3 }),
      buildSkill({ name: "JavaScript", experience: 3 }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeTruthy();
  });

  it("doesn't match with multiple requirements, not all satisfied", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "JavaScript", experience: 3 }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
      buildRequirement({ name: "Ruby", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeFalsy();
  });

  it("matches with multiple requirements, all satisfied", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "Ruby", experience: 3 }),
      buildSkill({ name: "JavaScript", experience: 3 }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
      buildRequirement({ name: "Ruby", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeTruthy();
  });

  it("doesn't match with an avoided skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "JavaScript", experience: 3, preference: "avoid" }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeFalsy();
  });

  it("matches with a boosted skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "JavaScript", experience: 2, preference: "desired" }),
    ]);
    const job = buildJob([
      buildRequirement({ name: "JavaScript", idealYears: 3 }),
    ]);

    expect(match(candidate, job)).toBeTruthy();
  });

  it("matches with a substitute skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "JavaScript", experience: 3 }),
    ]);
    const job = buildJob([
      buildRequirement({
        name: "CoffeeScript",
        idealYears: 3,
        substitutions: [{ name: "JavaScript" }],
      }),
    ]);

    expect(match(candidate, job)).toBeTruthy();
  });

  it("doesn't match with an avoided substitute skill", () => {
    const candidate = buildCandidate([
      buildSkill({ name: "Python", experience: 6, preference: "avoid" }),
    ]);
    const job = buildJob([
      buildRequirement({
        name: "Java",
        idealYears: 3,
        substitutions: [{ name: "Python" }],
      }),
    ]);

    expect(match(candidate, job)).toBeFalsy();
  });
});

// ---- Helpers ---- //

function buildCandidate(skills) {
  return { skills };
}

function buildSkill({
  name = "JavaScript",
  experience = 3,
  preference = "neutral",
}) {
  return { name, experience, preference };
}

function buildJob(requirements) {
  return { requirements };
}

function buildRequirement({
  name = "JavaScript",
  idealYears = 3,
  substitutions = [],
}) {
  return { name, idealYears, substitutions };
}
