export function setTheme(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function initThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    setTheme(savedTheme);
  }

  const syncToggleState = () => {
    const current = document.documentElement.getAttribute('data-theme') ?? 'dark';
    themeToggle?.setAttribute('aria-pressed', String(current === 'light'));
  };

  syncToggleState();

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    syncToggleState();
  });
}
