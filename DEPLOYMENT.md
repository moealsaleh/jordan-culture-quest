# Deployment Guide

## Best method: Netlify Drop

This app is a static website and has no build step.

1. Unzip `jordan-culture-quest-final.zip`.
2. Make sure the folder contains:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets/`
3. Open Netlify Drop.
4. Drag the full folder into Netlify Drop.
5. Copy the generated public URL.
6. Test it on mobile.
7. Create a QR code from the URL.
8. Print the QR code for your booth.

## Why this is suitable

- No backend.
- No login.
- No database.
- No personal data collection.
- Works as a static site.
- Uses local map image assets, so the map does not depend on OpenStreetMap or any external map service.

## Pre-event test

- Test on iPhone and Android if possible.
- Test English and Arabic language switching.
- Test map clicks.
- Test Arabic narration on the actual phones expected at the booth.
- Test sound effects after pressing Submit.
