export function setNavOpen(isOpen: boolean): void {
  const toggleBtn = document.getElementById('nav-toggle') as HTMLElement;
  const navLinks = document.getElementById('nav-links') as HTMLElement;

  toggleBtn?.classList.toggle('active', isOpen);
  navLinks?.classList.toggle('open', isOpen);
  toggleBtn?.setAttribute('aria-expanded', String(isOpen));
}