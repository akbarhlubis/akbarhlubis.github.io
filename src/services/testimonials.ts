import type { RawTestimonial, Testimonial } from '../types';

function transformTestimonial(raw: RawTestimonial): Testimonial {
  return {
    text: raw.text ?? 'No testimonial text provided.',
    author: {
      name: raw.author?.name ?? 'Anonymous',
      role: raw.author?.role ?? 'Unknown Role',
      avatar: raw.author?.avatar ?? '?',
    },
    link: raw.link ?? '#',
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await import('../data/testimonials.json');
    const raw: RawTestimonial[] = data.default ?? data;
    return raw.map(transformTestimonial);
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    return [];
  }
}

export function getTestimonialsSync(testimonials: RawTestimonial[]): Testimonial[] {
  return testimonials.map(transformTestimonial);
}
