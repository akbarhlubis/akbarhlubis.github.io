import type { RawExperience, Experience } from '../types';

const FALLBACK_EXPERIENCE: Experience = {
  company: 'Unknown Company',
  role: 'Unknown Role',
  period: 'Unknown Period',
  description: 'No description available.',
  highlights: [],
  clients: [],
};

function transformExperience(raw: RawExperience): Experience {
  return {
    company: raw.company ?? FALLBACK_EXPERIENCE.company,
    role: raw.role ?? FALLBACK_EXPERIENCE.role,
    period: raw.period ?? FALLBACK_EXPERIENCE.period,
    description: raw.description ?? FALLBACK_EXPERIENCE.description,
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
    clients: Array.isArray(raw.clients)
      ? raw.clients.map(client => ({
        name: client?.name ?? 'Unknown Client',
        period: client?.period ?? 'Unknown Period',
      }))
      : [],
  };
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await import('../data/experience.json');
    const raw: RawExperience[] = data.default ?? data;
    return raw.map(transformExperience);
  } catch (error) {
    console.error('Failed to load experiences:', error);
    return [];
  }
}

export function getExperiencesSync(experiences: RawExperience[]): Experience[] {
  return experiences.map(transformExperience);
}
