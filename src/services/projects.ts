import type { RawProject, Project } from '../types';

const FALLBACK_PROJECT: Project = {
  title: 'Untitled Project',
  category: 'web',
  tags: [],
  description: 'No description available.',
  url: '#',
};

function transformProject(raw: RawProject): Project {
  return {
    title: raw.title ?? FALLBACK_PROJECT.title,
    category: raw.category ?? FALLBACK_PROJECT.category,
    tags: Array.isArray(raw.tags) ? raw.tags : FALLBACK_PROJECT.tags,
    description: raw.description ?? FALLBACK_PROJECT.description,
    url: raw.url ?? FALLBACK_PROJECT.url,
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await import('../data/projects.json');
    const raw: RawProject[] = data.default ?? data;
    return raw.map(transformProject);
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
}

export function getProjectsSync(projects: RawProject[]): Project[] {
  return projects.map(transformProject);
}
