import type { RawSkillGroup, SkillGroup, Skill } from '../types';

function transformSkill(raw: { name?: string; level?: string }): Skill {
  return {
    name: raw.name ?? 'Unknown Skill',
    level: raw.level ?? 'beginner',
  };
}

function transformSkillGroup(raw: RawSkillGroup): SkillGroup {
  return {
    group: raw.group ?? 'UNCATEGORIZED',
    skills: Array.isArray(raw.skills)
      ? raw.skills.map(transformSkill)
      : [],
  };
}

export async function getSkills(): Promise<SkillGroup[]> {
  try {
    const data = await import('../data/skills.json');
    const raw: RawSkillGroup[] = data.default ?? data;
    return raw.map(transformSkillGroup);
  } catch (error) {
    console.error('Failed to load skills:', error);
    return [];
  }
}

export function getSkillsSync(skills: RawSkillGroup[]): SkillGroup[] {
  return skills.map(transformSkillGroup);
}
