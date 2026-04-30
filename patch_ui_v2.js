const fs = require('fs');

let html = fs.readFileSync('build/index.html', 'utf8');

// Remove the previously injected script block
html = html.replace(/<script>\s*window\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?<\/script>/, '');

const injectedScript = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const originalAlert = window.alert;
    window.alert = function(msg) {
      if (msg && msg.includes("Your submission has been received")) {
        const formContainer = document.querySelector('.contactForm');
        if (formContainer && !document.querySelector('.success-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'success-overlay';
          overlay.innerHTML = \`
            <div class="success-content">
              <svg class="paper-plane-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#b6e02a" />
                    <stop offset="50%" stop-color="#f2994a" />
                    <stop offset="100%" stop-color="#56ccf2" />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="11" stroke="url(#grad1)" stroke-width="1.5"/>
                <path d="M21 3L14.5 21A0.5 0.5 0 0113.5 21L10 14L3 10.5A0.5 0.5 0 013 9.5L21 3Z" stroke="url(#grad1)" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <h2>Thank You!</h2>
              <p>Your message successfully received!</p>
            </div>
          \`;
          formContainer.style.position = 'relative';
          formContainer.style.overflow = 'hidden';
          formContainer.appendChild(overlay);
        }
      } else {
        originalAlert(msg);
      }
    };

    document.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('.contact-btn');
      if (btn) {
        btn.classList.add('btn-push-animate');
      }
    });
    document.addEventListener('mouseup', (e) => {
      const btn = e.target.closest('.contact-btn');
      if (btn) {
        setTimeout(() => btn.classList.remove('btn-push-animate'), 150);
      }
    });
  });
</script>
`;

html = html.replace('</body>', injectedScript + '</body>');
fs.writeFileSync('build/index.html', html);

const cssPath = 'build/static/css/main.3d01e9b6.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Remove old injected CSS if any
css = css.replace(/\.success-msg\s*\{[^}]*\}\s*@keyframes fadeIn\s*\{[^}]*\}/g, '');

const newCss = `
.success-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(242, 244, 248, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInOverlay 0.4s ease-out forwards;
  border-radius: inherit;
}
.success-content {
  text-align: center;
  transform: translateY(20px);
  animation: slideUp 0.5s ease-out 0.2s forwards;
  opacity: 0;
}
.paper-plane-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.success-content h2 {
  font-family: "Lato", sans-serif;
  color: #303548;
  font-size: 24px;
  margin: 0 0 10px 0;
}
.success-content p {
  font-family: "Lato", sans-serif;
  color: rgba(48, 53, 72, 0.75);
  font-size: 16px;
  margin: 0;
}
@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (!css.includes('.success-overlay')) {
  fs.appendFileSync(cssPath, newCss);
}

console.log("Patched index.html and CSS with overlay!");
