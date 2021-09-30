export function match(candidate, job) {
  return job.requirements.every((requirement) =>
    candidateSatisfiesRequirement(candidate, requirement)
  );
}

function candidateSatisfiesRequirement(candidate, requirement) {
  const avoids = candidate.skills.filter(
    (skill) => skill.preference === "avoid"
  );
  const pros = candidate.skills.filter((skill) => skill.preference !== "avoid");

  return (
    avoids.every((skill) => !skillAvoidsRequirement(skill, requirement)) &&
    pros.some((skill) => skillSatisfiesRequirement(skill, requirement))
  );
}

function skillAvoidsRequirement(skill, requirement) {
  return skill.name === requirement.name && skill.preference === "avoid";
}

function skillSatisfiesRequirement(skill, requirement) {
  return (
    isRequiredOrSubstitueLanguage(skill, requirement) &&
    hasSufficientEffectiveExperience(skill, requirement)
  );
}

function isRequiredOrSubstitueLanguage(skill, requirement) {
  return [
    requirement.name,
    ...requirement.substitutions.map((substitute) => substitute.name),
  ].includes(skill.name);
}

function hasSufficientEffectiveExperience(skill, requirement) {
  return effectiveExperience(skill) >= requirement.idealYears;
}

function effectiveExperience(skill) {
  if (skill.preference === "desired") {
    return skill.experience * 1.5;
  }
  return skill.experience;
}
