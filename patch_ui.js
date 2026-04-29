const fs = require('fs');

// 1. Fix index.html to load local files and inject the script
let html = fs.readFileSync('build/index.html', 'utf8');
html = html.replace(/https:\/\/bimsara\.com\//g, '/');

const injectedScript = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    // Override alert to catch the success message
    const originalAlert = window.alert;
    window.alert = function(msg) {
      if (msg.includes("Your submission has been received")) {
        const btn = document.querySelector('.contact-btn');
        if (btn && !document.querySelector('.success-msg')) {
          const successDiv = document.createElement('div');
          successDiv.className = 'success-msg';
          successDiv.innerText = 'Your message successfully received!';
          btn.parentNode.insertBefore(successDiv, btn.nextSibling);
        }
      } else {
        originalAlert(msg);
      }
    };

    // Add push animation to button on click
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

if (!html.includes('btn-push-animate')) {
  html = html.replace('</body>', injectedScript + '</body>');
}
fs.writeFileSync('build/index.html', html);

// 2. Append CSS to the minified stylesheet
const cssPath = 'build/static/css/main.3d01e9b6.css';
let css = fs.readFileSync(cssPath, 'utf8');
const newCss = `
.btn-push-animate {
  transform: scale(0.95);
  transition: transform 0.1s ease-in-out;
}
.success-msg {
  color: #28a745;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
if (!css.includes('.success-msg')) {
  fs.appendFileSync(cssPath, newCss);
}

console.log("Patched index.html and CSS!");
