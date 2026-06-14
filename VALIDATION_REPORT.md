# Validation Report

Prepared: 2026-06-14

## Latest requested fixes completed

### Back button
- Back buttons now use a prominent red style with stronger border, shadow, and larger size.

### Food images
- Food images now use the uploaded booth images:
  - Mansaf: `assets/food/mansaf.png`
  - Maqlooba: `assets/food/maqlooba.png`
  - Kunafa: `assets/food/kunafa.png`
  - Baqlawa: `assets/food/baqlawa.png`
  - Zarb: `assets/food/zarb.png`
  - Krayza: `assets/food/krayza.jpg`
  - Hummos & Falafel: `assets/food/hummos-falafel.jpg`

### Interactive map
- The visible city/governorate map remains the exact uploaded map image.
- Click zones were enlarged and now use per-governorate width/height percentages.
- Each map zone calls `openCategory('cities', item.id)` when clicked/tapped.
- Hover/focus still shows only the city/governorate name.

### Questions and voice
- Voice/narration remains fully removed.
- Category-only questions remain removed.
- Question pool uses item-specific fact and clue questions only.
- Answer options remain shuffled.

## Automated checks passed

- JavaScript syntax passed using `node --check app.js`.
- Every item has a bilingual `fact` field.
- Every food item uses a local uploaded image from `assets/food/`.
- Every map governorate has a click zone with x/y/w/h.
- `speechSynthesis` and `SpeechSynthesisUtterance` do not appear in `app.js`.
- No `Listen` or `Stop Voice` button is rendered.
- No `Which category contains...` generator remains.
- No visible source line is rendered in the UI.
