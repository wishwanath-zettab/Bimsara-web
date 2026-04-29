const fs = require('fs');

let html = fs.readFileSync('build/index.html', 'utf8');

// Remove the previously injected script block
html = html.replace(/<script>\s*window\.addEventListener\('DOMContentLoaded', \(\) => {[\s\S]*?<\/script>/, '');

const injectedScript = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    let lastClickedBtn = null;
    const originalAlert = window.alert;
    
    window.alert = function(msg) {
      const isSuccess = msg && msg.includes("Your submission has been received");
      
      if (isSuccess) {
        const overlay = document.createElement('div');
        overlay.className = 'global-ui-overlay';
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
      } else {
        if (lastClickedBtn) {
          let warning = lastClickedBtn.parentNode.querySelector('.inline-warning-msg');
          if (!warning) {
            warning = document.createElement('div');
            warning.className = 'inline-warning-msg';
            lastClickedBtn.parentNode.insertBefore(warning, lastClickedBtn.nextSibling);
          }
          warning.textContent = "Check again! All the fields should be properly filled.";
          
          setTimeout(() => {
            if (warning && warning.parentNode) {
              warning.parentNode.removeChild(warning);
            }
          }, 4000);
        } else {
          originalAlert(msg);
        }
      }
    };

    document.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('.btn');
      if (btn && btn.textContent.trim() === 'Contact Me') {
        btn.classList.add('btn-push-animate');
        lastClickedBtn = btn;
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

// The global overlay and success content CSS is already there from patch_ui_v3, but let's make sure inline-warning-msg exists.
const newCss = `
.inline-warning-msg {
  color: #e5322d;
  font-family: "Lato", sans-serif;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  animation: fadeInWarning 0.3s ease-out forwards;
}
@keyframes fadeInWarning {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (!css.includes('.inline-warning-msg')) {
  fs.appendFileSync(cssPath, newCss);
}

console.log("Patched index.html and CSS to use inline warning messages for errors!");
