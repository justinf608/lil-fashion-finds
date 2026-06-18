# Lil' Fashion Finds & Consigns — Website

A complete, static promotional website for the Lil' Fashion Finds & Consigns thrift and consignment shop in Edgerton, Wisconsin.

## How to preview locally

**Option 1 — Just open the file:**
Double-click `index.html`. It opens in your browser and everything works.

**Option 2 — Local dev server (slightly better for the map embed):**
```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or if you have Node.js:
```bash
npx serve .
```

---

## How to update content

### The easy way — edit `data.js`
Open `data.js` in any text editor (Notepad is fine). This single file controls:
- Store name, phone, email, and address
- Store hours (Mon–Sun)
- Monthly sales (the colored cards in the Monthly Sales section)
- Consignment split percentages
- Social media links
- Google Maps embed URL

Change any value between the quotes `"like this"`, save the file, and refresh the browser.

### The HTML way — look for `OWNER:` comments
In `index.html`, search for `OWNER:` (Ctrl+F) to find every spot with a placeholder or editable note. These are clearly labeled and safe to change without knowing how to code.

---

## Getting a real Google Maps embed

1. Go to [Google Maps](https://maps.google.com) and search for your store's exact address.
2. Click **Share** → **Embed a map**.
3. Copy the URL from the `src="..."` part of the iframe code shown.
4. Paste that URL into `data.js` as the value of `mapEmbedUrl`.

---

## Deploying to Vercel (free, takes 2 minutes)

1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New → Project**.
3. Drag and drop the `lil-fashion-finds` folder onto the Vercel import screen, or connect it via GitHub.
4. Click **Deploy**. Done — no build settings needed.

Vercel will give you a free `.vercel.app` URL immediately. You can connect a custom domain later from the Vercel dashboard.

---

## Files in this project

| File | What it does |
|---|---|
| `index.html` | The entire website (all sections, SVG illustrations) |
| `styles.css` | All styling — colors, layout, animations |
| `script.js` | Hamburger menu, cycling word animation, renders sales/hours from data |
| `data.js` | **The only file you need to edit** to update store info |
| `README.md` | This file |

---

*Made with ♥ for a small local shop in Edgerton, Wisconsin.*
