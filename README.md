# Templates

A collection of landing page templates with interactive previews and downloadable HTML.

<img width="1677" height="905" alt="image" src="https://github.com/user-attachments/assets/cda3eaac-8543-4944-aa26-b0721aa1717a" />


## Requirements

- Node.js 18+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy under a subfolder

The project is configured to serve from `/templates`.

Example:

```
https://ivanamorim.com.br/templates
```

Upload the output of your build to your server's `templates/` directory.

## Recent updates

- Admin area with tabs for Home, Templates, and Categories stored in Firebase Realtime Database
- Admin login with username/password stored in Firebase
- Template metadata now includes `order`, `active`, and `htmlFile` for ordering, visibility, and HTML file mapping
- Home page reads app config and categories from Firebase, supports category filtering and pagination (15 per page)
- Template previews/downloads load HTML from `public/templatesCode`

## Firebase config

Update `firebaseconfig.js` with your Firebase project credentials.

You can find the values in Firebase Console > Project settings > General > Your apps.

Required keys:

- `apiKey`
- `authDomain`
- `databaseURL` (Realtime Database)
- `projectId`
- `storageBucket`
- `messagingSenderId`
- `appId`
- `measurementId`

## Adding new templates

1) Open the admin at `/templates/admin` and add the template metadata.
2) Put the HTML file in `public/templatesCode/`.
3) Put the preview image in `public/` and use that filename in the `urlImage` field.

## ☕ Buying me a coffee

If you enjoy this project and would like to support its development, consider buying me a coffee!  
Every coffee helps turn ideas into code, games, and new features. 💛

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/amorimivan1)

---

## GitHub

- Profile: https://github.com/ivan12
- Repo: https://github.com/ivan12/templates
