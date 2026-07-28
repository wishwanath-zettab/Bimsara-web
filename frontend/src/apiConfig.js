// Base URL every API call and uploaded-asset path is built from.
//
// Empty in a production build on purpose: the Express server serves both this
// bundle and /api, so relative URLs hit whatever origin the page was loaded
// from. That keeps www.bimsara.com and bimsara.com same-origin (no CORS, no
// dependency on which hostname nginx served), and survives the site being put
// on a different name later — the value is compiled into the bundle, so an
// absolute URL can only be changed by rebuilding the image.
//
// `??` rather than `||`: an empty string is falsy, so `||` would fall through
// to the dev fallback and send production traffic to localhost.
//
// In development the app runs on :3000 while the API is on :5000, and there is
// no `proxy` in package.json, so the absolute fallback is still needed there.
const API_URL =
  process.env.REACT_APP_API_URL ??
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

export default API_URL;
