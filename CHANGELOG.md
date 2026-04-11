# Changelog

## 2026-04-11

### 1. Fix nav flyout disappearing gap
Eliminated the gap between the nav button and flyout panel that caused the flyout to disappear when mousing over it. Fixed by moving the flyout flush to the nav bar (`right: 100%`) and using `padding-right: 12px` inside the flyout for visual spacing — hover state is now continuous.

**File:** `src/index.css` — `.nav-flyout`

---

### 2. Apply one-click overlay fix to Landlords and Tenants pages
Applied the same outside-click-to-close overlay pattern (`useRef` + document `mousedown` listener) to `Landlords.jsx` and `Tenants.jsx`, matching the existing behaviour on the Sellers and Buyers pages.

**Files:** `src/pages/services/Landlords.jsx`, `src/pages/services/Tenants.jsx`

---

### 3. Match "Go it Alone" heading size to live site
Updated the *"Go it Alone, or Use a Professional?"* topic heading on the Sellers page to match the bimsara.com live site: `font-size: 30px`, `line-height: 50px`, `font-weight: 400`. All other topic headings remain at `17px/19px` bold.

**File:** `src/pages/services/Sellers.jsx`

---

### 4. Add line breaks between bold questions and answer text in guides
Added a `<br />` separator between `item.bold` and `item.text` in guide content rendering across all four service pages (Sellers, Buyers, Landlords, Tenants) so questions and answers are visually separated.

**Files:** `src/pages/services/Sellers.jsx`, `Buyers.jsx`, `Landlords.jsx`, `Tenants.jsx`

---

### 5. Fix About page team circle avatar jumping
Fixed the team member avatar moving up and down as the content below it changes length. Separated the avatar element (`shrink-0`, pinned at top) from the scrollable text area beneath it, instead of vertically centering the whole block together.

**File:** `src/pages/About.jsx`

---

### 6. Fix duplicate logos on mobile and hide decorative background strips
- Removed the duplicate logo block from `MobileServiceLayout.jsx` — the Navbar already renders the logo on mobile.
- Moved `.bg-lines` and `.about-bg-lines` background gradients inside `@media (min-width: 1024px)` so the decorative strips are hidden on mobile viewports.

**Files:** `src/components/MobileServiceLayout.jsx`, `src/index.css`

---

### 7. Convert round badge button to inquiry popup
Replaced the scroll-to-top behaviour on the round badge button with a mobile-friendly inquiry popup modal. The ISO and Safetynet logos are hidden on mobile (`hidden lg:block`) so only the badge button appears. The popup closes on backdrop click.

**File:** `src/components/StickyBadges.jsx`

---

### 8. Wire inquiry forms to EmailJS
Discovered EmailJS credentials from the live bimsara.com site. Created a shared constants file and wired both the Home page form and the StickyBadges popup to EmailJS using the correct template parameters: `{ name, email, number, type, purpose }`.

**Files:** `src/lib/emailjs.js` *(new)*, `src/pages/Home.jsx`, `src/components/StickyBadges.jsx`

---

### 9. Refactor into reusable InquiryForm component
Extracted all form logic — state management, field validation, EmailJS submission, and success/error handling — into a single reusable `InquiryForm` component. Added a Property Type dropdown and full client-side validation with inline field errors. Both `Home.jsx` and `StickyBadges.jsx` now consume `<InquiryForm />` with no duplicated logic.

**Files:** `src/components/InquiryForm.jsx` *(new)*, `src/pages/Home.jsx`, `src/components/StickyBadges.jsx`

---

### 10. Replace toast notifications with inline error banner
Removed the Toast notification component from the form. On submission failure, a crimson error banner now appears at the top of the form reading *"Something went wrong. Please try again."* The banner has a dismiss (×) button and clears automatically on the next submit attempt.

**File:** `src/components/InquiryForm.jsx`
