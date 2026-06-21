export const skills = ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'REST API', 'Docker', 'Linux', 'Git', 'Tailwind', 'AI Automation'];

export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

export function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
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