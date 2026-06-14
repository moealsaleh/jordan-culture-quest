# Jordan Culture Quest - Final Booth Version

This version is rebuilt around the **user-provided Jordan map image**. It does not use an external map library and does not use a guessed Jordan shape.

## What changed in this final patch

- Home page redesigned to remove the odd Petra block.
- Home page now uses a large Jordan-flag-style map background.
- English Cities/Governorates page shows the original provided map image exactly.
- Arabic Cities/Governorates page shows the cleaned map with Arabic interactive labels.
- City/governorate selection from the map is clickable.
- Correct answers are not always first and options are shuffled when Ready is pressed.
- Arabic narration selection was improved with Arabic voice fallback.
- Food includes Hummos & Falafel as a famous breakfast item.

## Run locally

Open `index.html` directly in a browser.

Recommended local test:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Best deployment

Use Netlify Drop:

1. Unzip this folder.
2. Drag the unzipped folder to Netlify Drop.
3. Use the generated URL to create your QR code.

Prepared: 2026-06-14


## Latest update - 2026-06-14

- Cities/Governorates map now uses the uploaded map image exactly as the interactive visual base.
- Hover over a map area to see the localized city/governorate name and short information.
- Visible content sources were removed from the UI.
- Home page no longer includes the removed map/food buttons.
- Quiz now supports many trials with a new randomized question each time.


## Latest update - 2026-06-14

- Back button made more obvious.
- Uploaded food images added locally and assigned to the correct foods.
- Map click zones enlarged so tapping/pressing a governorate opens its item.
- Hover over the map still shows only the governorate/city name.
