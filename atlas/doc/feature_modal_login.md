# Feature: Temporary Login Modal

Status: Planned — do not implement until approved.

Source plan for adding a temporary login modal to the existing CloudPilot React landing page in Atlas.

---

## Goal

Add a temporary login modal to the existing CloudPilot React landing page.

## IMPORTANT

- Do not redesign or restructure the landing page.
- Do not change existing landing-page styling.
- Do not add Bootstrap or Tailwind.
- Use the project’s existing React and custom CSS.
- Preserve all existing login/authentication logic.
- Only change the behavior of the existing “Try CloudPilot” buttons so they open the login modal.
- Keep the login implementation isolated in login components and login.css.
- Do not duplicate global button, color, font, or logo styles if they already exist.

---

## Target structure

```text
src/
  components/
    Login/
      LoginModal.jsx
      LoginPage.jsx
      login.css
```

Note: Atlas currently uses `components/login/` (lowercase) and `pages/LoginPage.js`. When implementing, either follow this planned `Login/` path or map the same responsibilities onto the existing folder names without changing landing-page structure.

---

## Responsibilities

### 1. LoginModal.jsx

This component should:

- Render the native HTML `<dialog>` element.
- Receive these props:
  - `isOpen`
  - `onClose`
- Open the dialog when `isOpen` becomes true.
- Close the dialog when `isOpen` becomes false.
- Close when:
  - The user clicks the × button
  - The user clicks the backdrop outside the modal card
  - The user presses Escape
- Render `LoginPage` inside the modal.
- Do not contain authentication/business logic.
- Import `login.css`.

Add this comment near the component:

```js
// TEMP: This modal is a temporary entry point for authentication.
// Later, login may move to a dedicated route or full authentication flow.
```

### 2. LoginPage.jsx

This component should contain only the login interface:

- CloudPilot logo/brand
- “Welcome back” heading
- “Log in to your CloudPilot workspace.” description
- Username input
- Password input
- Login button

Use the existing working login/authentication code.

Do not rewrite, replace, or mock the authentication logic.

If login logic currently exists somewhere else:

- Import and call it from `LoginPage`.
- Preserve its existing request format, API endpoint, token handling, redirects, error handling, and loading behavior.
- Move code only when necessary to connect the existing login behavior to this component.

Add this comment above the form submission code:

```js
// TEMP: Keep the current login flow working for internal testing.
// Replace or expand this when the permanent authentication experience is built.
```

The form must:

- Use controlled React inputs.
- Use username and password state.
- Prevent the browser’s default form submission.
- Call the existing login function.
- Disable the login button while submitting if loading state already exists.
- Display the existing error message if login fails.
- Use `autocomplete="username"` for username.
- Use `autocomplete="current-password"` for password.

### 3. login.css

Move all modal-specific and login-specific styling into this file.

Use the existing global CSS variables:

- `--surface`
- `--background`
- `--text`
- `--text-secondary`
- `--green`
- `--border`
- `--border-light`
- `--radius-small`
- `--radius-large`
- `--shadow-large`
- `--font-heading`

The modal should visually match the landing page:

- Maximum width around 430px
- White surface
- Existing green accent
- Rounded corners
- Existing shadow
- Dark translucent backdrop with a subtle blur
- Full-width login button
- Clean username and password fields
- Responsive padding on small screens

Use login-specific class names so styles cannot affect the rest of the website:

- `login-modal`
- `login-card`
- `login-close`
- `login-brand`
- `login-description`
- `login-form`
- `login-field`
- `login-submit`
- `login-error`

Do not redefine the global `.button`, `.button-primary`, or `.logo-mark` classes. Reuse them if they already exist.

### 4. Update the landing-page React component

Add state:

```js
const [isLoginOpen, setIsLoginOpen] = useState(false);
```

Render the modal once near the bottom of the page:

```jsx
<LoginModal
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
/>
```

Update every existing “Try CloudPilot” button so it opens the modal:

```js
onClick={() => setIsLoginOpen(true)}
```

If one of these controls is currently an anchor with `href="#"`, prevent its placeholder navigation or convert it to a semantic button while preserving the exact same CSS classes and appearance.

Do not modify:

- Button text
- Button positioning
- Hero layout
- Header layout
- Final CTA layout
- Landing-page copy
- Existing colors
- Existing spacing
- Existing responsive behavior

### 5. Expected behavior

Before clicking a button:

- The landing page must look exactly the same as it currently does.

After clicking any “Try CloudPilot” button:

- The login modal opens.
- The page behind it is dimmed.
- Username, password, and Login are visible.
- Existing login functionality continues to work.

Closing the modal:

- × closes it.
- Escape closes it.
- Clicking outside the card closes it.

### 6. Verification

After implementation:

- Run the app.
- Confirm there are no build or console errors.
- Confirm all “Try CloudPilot” buttons open the same modal.
- Confirm the landing page did not visually change while the modal is closed.
- Confirm the existing login request still works.
- Report every file created or changed.
- Do not make unrelated cleanup or formatting changes.

---

## Current Atlas notes (for implementer)

As of this plan’s writing:

- Landing page lives in `pages/LoginPage.js` composed from `components/login/*`.
- Working auth lives in `components/login/LoginUser.js` (`POST http://localhost:3003/user/login`, cookies, localStorage, navigate to `/chat`).
- Landing styles live in `style/login.css`.
- “Try CloudPilot” controls currently scroll to `#login` / show form in the CTA section.

Implementation should preserve that auth path and only change entry UX to a modal.
