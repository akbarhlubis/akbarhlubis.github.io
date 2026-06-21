export function setTheme(theme: string): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function initThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle') as HTMLElement;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    setTheme(savedTheme);
  }

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
    themeToggle.textContent = current === 'light' ? '☀️' : '🌙';
  });
}