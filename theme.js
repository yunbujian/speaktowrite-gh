// Shared theme + font-size controller for 口喷写作实践小组 course pages
(function() {
  const THEME_KEY = 'stw-theme';
  const FONT_KEY = 'stw-font';
  const FONT_DEFAULT = 16;
  const FONT_MIN = 14;
  const FONT_MAX = 20;
  const root = document.documentElement;

  // Default is LIGHT; only switch to dark if user explicitly chose dark
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'dark');
    }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  // Font size: applied to <html>, so rem-based text scales with it
  function currentFont() {
    var v = parseInt(localStorage.getItem(FONT_KEY), 10);
    return (v >= FONT_MIN && v <= FONT_MAX) ? v : FONT_DEFAULT;
  }

  function applyFont(v) {
    root.style.fontSize = v + 'px';
    localStorage.setItem(FONT_KEY, v);
  }

  // Apply saved font size immediately (default stays 16px = unchanged)
  if (currentFont() !== FONT_DEFAULT) applyFont(currentFont());

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(currentTheme() === 'light' ? 'dark' : 'light');
      });
      btn.setAttribute('aria-label', '切换日间 / 夜间模式');
      btn.setAttribute('title', '切换日间 / 夜间模式');
    });

    // Font size buttons (A− / A+)
    document.querySelectorAll('.font-btn[data-font]').forEach(btn => {
      btn.addEventListener('click', () => {
        var delta = btn.getAttribute('data-font') === 'up' ? 1 : -1;
        var next = Math.min(FONT_MAX, Math.max(FONT_MIN, currentFont() + delta));
        applyFont(next);
      });
      btn.setAttribute('title', btn.getAttribute('data-font') === 'up' ? '放大字号' : '缩小字号');
    });
  });
})();
