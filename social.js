// social.js - Host this file on your server
(function() {
  // Parse query parameters
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[key] = decodeURIComponent(value || '');
      }
    });
    
    return params;
  }

  // Validate colors
  function isValidColor(color) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color) || 
           /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(color) ||
           /^[a-z]+$/i.test(color);
  }

  // Default configuration
  const defaults = {
    linkColor: '#fff',
    textColor: '#000',
    buttonColor: 'black',
    showCoffee: true
  };

  // Get params with defaults
  const params = getQueryParams();
  const config = {
    linkColor: isValidColor(params.linkColor) ? params.linkColor : defaults.linkColor,
    textColor: isValidColor(params.textColor) ? params.textColor : defaults.textColor,
    buttonColor: ['black', 'blue', 'green', 'orange', 'red', 'violet', 'white', 'yellow']
      .includes(params.buttonColor?.toLowerCase()) ? params.buttonColor : defaults.buttonColor,
    showCoffee: params.showCoffee !== 'false'
  };

  // Create styles
  const style = document.createElement('style');
  style.textContent = `
    .techymk-footer {
      margin-top: 2rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background: #f4f4f4;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
    }
    .techymk-footer > * {
      text-align: center;
      line-height: 1.5;
      font-size: 0.875rem;
    }
    .techymk-footer a {
      color: ${config.linkColor};
      margin: 0 0.5rem;
      text-decoration: none;
      font-weight: 500;
    }
    .techymk-footer a:hover {
      text-decoration: underline;
    }
    .techymk-footer img {
      height: 32px;
      width: auto;
    }
    @media (min-width: 768px) {
      .techymk-footer img {
        height: 38px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create footer element
  const footer = document.createElement('footer');
  footer.className = 'techymk-footer';

  // Social links
  const links = [
    { href: "https://github.com/techyMk/", text: "GitHub" },
    { href: "http://www.linkedin.com/in/techymk", text: "LinkedIn" },
    { href: "https://portfolio-techymk.netlify.app/", text: "Portfolio" }
  ];

  const linksContainer = document.createElement('div');
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = link.text;
    linksContainer.appendChild(a);
  });

  footer.appendChild(linksContainer);

  // Text
  const text = document.createElement('div');
  text.style.color = config.textColor;
  text.textContent = "Crafted with ❤️ by techyMk. Let's connect and grow!";
  footer.appendChild(text);

  // Buy Me A Coffee button
  if (config.showCoffee) {
    const coffeeLink = document.createElement('a');
    coffeeLink.href = 'https://www.buymeacoffee.com/techymk';
    coffeeLink.target = '_blank';
    coffeeLink.rel = 'noopener noreferrer';
    
    const coffeeImg = document.createElement('img');
    coffeeImg.src = `https://cdn.buymeacoffee.com/buttons/v2/default-${config.buttonColor}.png`;
    coffeeImg.alt = 'Buy Me A Coffee';
    coffeeImg.loading = 'lazy';
    
    coffeeLink.appendChild(coffeeImg);
    footer.appendChild(coffeeLink);
  }

  // Add to document
  document.body.appendChild(footer);
})();
