## Kite repository

This repository contains two independent frontend applications:

```text
kite/     Existing workshop frontend (groups, chat, design, experiments)
atlas/    Clean CloudPilot frontend (minimal shell for now)
```

The Node API remains in the sibling `startup/api` project (`localhost:3003`).

### Run Kite (port 3000)

```bash
cd kite
npm install
npm start
```

### Run Atlas (port 3001)

```bash
cd atlas
npm install
npm start
```

Run Kite and Atlas in separate terminals if you need both at once. Keep the API on port 3003.

### Project notes

- Do not clean or delete files inside `kite/src` unless you intentionally want to.
- Atlas starts as a minimal app; CloudPilot chat migration happens later.
- Frontend runtime config for Kite lives next to its `package.json` (`craco.config.js`, `tailwind.config.js`).

### Design mocks

Canonical path (after the app move):

```text
kite/src/design/home/index.html
```

Open in a browser:

```text
file:///Users/davidvasquez/Desktop/David/www/startup/kite/kite/src/design/home/index.html
```

A repo-root `src` → `kite/src` symlink keeps older `…/kite/src/design/…` bookmarks working.

Served by the Kite app (when `npm start` is running in `kite/`):

```text
http://localhost:3000/design/cloudPilot/chat/index.html
```


STYLE
.atlas-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f7fb;
  color: #122033;
  font-family: Georgia, 'Times New Roman', serif;
}

.atlas-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #d7e0ea;
  background: #ffffff;
}

.atlas-brand {
  font-size: 1.25rem;
  letter-spacing: 0.04em;
}

.atlas-main {
  max-width: 40rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.atlas-main h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  font-weight: 400;
}

.atlas-main p {
  margin: 0 0 1rem;
  line-height: 1.5;
}

.atlas-meta {
  color: #5b6b7c;
  font-size: 0.95rem;
}
