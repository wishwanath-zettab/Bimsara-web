const fs = require('fs');

let html = fs.readFileSync('build/index.html', 'utf8');

// Remove the previously injected script block
html = html.replace(/<script>\s*window\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?<\/script>/, '');

const injectedScript = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const originalAlert = window.alert;
    window.alert = function(msg) {
      const isSuccess = msg && msg.includes("Your submission has been received");
      
      const overlay = document.createElement('div');
      overlay.className = 'global-ui-overlay';
      
      if (isSuccess) {
        overlay.innerHTML = \`
          <div class="global-ui-content success">
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
      } else {
        overlay.innerHTML = \`
          <div class="global-ui-content error">
            <svg class="error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#e5322d" stroke-width="1.5"/>
              <path d="M12 7v6M12 17h.01" stroke="#e5322d" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <h2>Notice</h2>
            <p>Check again! All the fields should be properly filled.</p>
          </div>
        \`;
      }
      
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.animation = 'fadeOutOverlay 0.4s ease-out forwards';
        overlay.querySelector('.global-ui-content').style.animation = 'slideDown 0.4s ease-out forwards';
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 400);
      }, 4000);
    };

    document.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('.btn');
      if (btn && btn.textContent.trim() === 'Contact Me') {
        btn.classList.add('btn-push-animate');
      }
    });
    document.addEventListener('mouseup', (e) => {
      const btn = e.target.closest('.btn');
      if (btn && btn.textContent.trim() === 'Contact Me') {
        setTimeout(() => btn.classList.remove('btn-push-animate'), 150);
      }
    });
    document.addEventListener('mouseout', (e) => {
      const btn = e.target.closest('.btn');
      if (btn && btn.textContent.trim() === 'Contact Me') {
        btn.classList.remove('btn-push-animate');
      }
    });
  });
</script>
`;

html = html.replace('</body>', injectedScript + '</body>');
fs.writeFileSync('build/index.html', html);

const cssPath = 'build/static/css/main.3d01e9b6.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/\.success-overlay\s*\{[^}]*\}\s*\.success-content\s*\{[^}]*\}\s*\.paper-plane-icon\s*\{[^}]*\}\s*\.success-content h2\s*\{[^}]*\}\s*\.success-content p\s*\{[^}]*\}\s*@keyframes fadeInOverlay\s*\{[^}]*\}\s*@keyframes slideUp\s*\{[^}]*\}/g, '');
css = css.replace(/\.global-ui-overlay\s*\{[^}]*\}\s*\.global-ui-content\s*\{[^}]*\}\s*\.paper-plane-icon,\s*\.error-icon\s*\{[^}]*\}\s*\.global-ui-content h2\s*\{[^}]*\}\s*\.global-ui-content p\s*\{[^}]*\}\s*@keyframes fadeInOverlay\s*\{[^}]*\}\s*@keyframes fadeOutOverlay\s*\{[^}]*\}\s*@keyframes slideUp\s*\{[^}]*\}\s*@keyframes slideDown\s*\{[^}]*\}/g, '');

const newCss = `
.global-ui-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 15, 32, 0.7);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInOverlay 0.4s ease-out forwards;
}
.global-ui-content {
  background: #f8f9fa;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  transform: translateY(20px);
  animation: slideUp 0.5s ease-out 0.1s forwards;
  opacity: 0;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
  min-width: 300px;
  max-width: 80%;
}
.paper-plane-icon, .error-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}
.global-ui-content h2 {
  font-family: "Lato", sans-serif;
  color: #303548;
  font-size: 26px;
  margin: 0 0 10px 0;
}
.global-ui-content p {
  font-family: "Lato", sans-serif;
  color: rgba(48, 53, 72, 0.85);
  font-size: 16px;
  margin: 0;
}
@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOutOverlay {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideDown {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}
`;

if (!css.includes('.global-ui-overlay')) {
  fs.appendFileSync(cssPath, newCss);
}

console.log("Patched index.html and CSS with global overlay!");
