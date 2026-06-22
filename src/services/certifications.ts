import type { RawCertification, Certification } from '../types';

const FALLBACK_CERT: Certification = {
  title: 'Untitled Certification',
  issuer: 'Unknown Issuer',
  date: 'Unknown Date',
  icon: 'award',
  link: '#',
  code: '-',
};

function transformCertification(raw: RawCertification): Certification {
  return {
    title: raw.title ?? FALLBACK_CERT.title,
    issuer: raw.issuer ?? FALLBACK_CERT.issuer,
    date: raw.date ?? FALLBACK_CERT.date,
    icon: raw.icon ?? FALLBACK_CERT.icon,
    link: raw.link ?? FALLBACK_CERT.link,
    code: raw.code ?? FALLBACK_CERT.code,
  };
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const data = await import('../data/certifications.json');
    const raw: RawCertification[] = data.default ?? data;
    return raw.map(transformCertification);
  } catch (error) {
    console.error('Failed to load certifications:', error);
    return [];
  }
}

export function getCertificationsSync(certifications: RawCertification[]): Certification[] {
  return certifications.map(transformCertification);
}
