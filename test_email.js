const https = require('https');

const data = JSON.stringify({
  service_id: 'service_psqrwyf',
  template_id: 'template_b8posyd',
  user_id: '8jNGXgDBQn0XzwCfi',
  template_params: {
    name: 'AI Tester - Second Test',
    email: 'test2@zettabprojects.com',
    number: '+94 779988776',
    type: 'House',
    purpose: 'Buy'
  }
});

const options = {
  hostname: 'api.emailjs.com',
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'Origin': 'http://localhost:7993',
    'Referer': 'http://localhost:7993/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
};

const req = https.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
