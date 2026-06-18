// ============================================================
//  LIL' FASHION FINDS & CONSIGNS -- STORE CONFIG
//  ============================================================
//  This is the ONE file you need to edit to keep your site
//  up to date. No coding experience required!
//
//  HOW TO EDIT:
//  1. Open this file in any text editor (Notepad works great).
//  2. Change any value between the quotes "like this".
//  3. Save the file, then refresh index.html in your browser.
//
//  LOOK FOR "OWNER:" comments -- those are the spots to fill in
//  with your real info before you launch the site.
// ============================================================

const STORE = {

  // --- Business basics ---
  name: "Lil' Fashion Finds & Consigns",
  tagline: "Edgerton's favorite secondhand treasure hunt",

  // --- Contact & Location ---
  phone:   "(608) 555-0123",                         // OWNER: your real phone number
  email:   "lilfashionfindsandconsigns@gmail.com",
  address: "22 West Fulton Street",
  city:    "Edgerton",
  state:   "WI",
  zip:     "53534",

  // --- Hours (OWNER: update these to your typical hours; hours vary week to week so
  //     post a monthly calendar on Facebook for the most accurate schedule)
  //     Set open to null for closed days. ---
  hours: [
    { day: "Monday",    open: null,        close: null       },
    { day: "Tuesday",   open: "3:00 PM",   close: "6:30 PM"  },
    { day: "Wednesday", open: "3:00 PM",   close: "6:30 PM"  },
    { day: "Thursday",  open: "3:00 PM",   close: "6:30 PM"  },
    { day: "Friday",    open: "3:00 PM",   close: "6:30 PM"  },
    { day: "Saturday",  open: "9:00 AM",   close: "1:00 PM"  },
    { day: "Sunday",    open: null,        close: null        },
  ],

  // --- Monthly Sales (OWNER: edit these to match your real promotions) ---
  // Each entry becomes a colorful card in the "Monthly Sales" section.
  // color options: "blush" | "sun" | "mint" | "lilac"
  monthlySales: [
    {
      tag:         "Every Monday",
      name:        "Half-Off Mondays",
      description: "All yellow-tag items are 50% off every single Monday. Come early -- the best yellow tags go fast!",
      color:       "sun",
      icon:        "tag"
    },
    {
      tag:         "Last Saturday of the Month",
      name:        "Fill-a-Bag Sale",
      description: "Stuff one of our big bags with as much as you can fit -- all for just $10. The ultimate treasure hunt day!",
      color:       "blush",
      icon:        "bag"
    },
    {
      tag:         "First Tuesday",
      name:        "Senior Discount Day",
      description: "Shoppers age 60 and better receive 20% off their entire purchase on the first Tuesday of every month.",
      color:       "mint",
      icon:        "heart"
    },
    {
      tag:         "1st of Every Month",
      name:        "New Tag Color Drop",
      description: "Fresh markdowns start on the 1st -- a brand-new tag color hits the floor with the lowest prices of the month.",
      color:       "lilac",
      icon:        "sparkle"
    },
  ],

  // --- Social Links ---
  social: {
    facebook:  "https://www.facebook.com/61564913969899",
    instagram: "#",   // OWNER: replace with your real Instagram URL when ready
  },

  // --- Monthly Schedule (OWNER: add each month here; days not listed fall back to typical hours above)
  // Format: "YYYY-MM-DD": { open: "H:MM AM/PM", close: "H:MM AM/PM" }
  //         "YYYY-MM-DD": null   means Closed that day
  //         "YYYY-MM-DD": { open: "...", close: "...", event: "Event Name" }  adds a special badge
  // OWNER: add "2026-07": { "01": {...}, ... } entries for July and beyond.
  monthlySchedule: {
    "2026-06-01": null,
    "2026-06-02": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-03": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-04": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-05": null,
    "2026-06-06": null,
    "2026-06-07": null,
    "2026-06-08": null,
    "2026-06-09": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-10": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-11": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-12": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-13": { open: "9:00 AM",  close: "1:00 PM" },
    "2026-06-14": null,
    "2026-06-15": null,
    "2026-06-16": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-17": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-18": { open: "3:00 PM", close: "8:00 PM", event: "Summer Social 5-7" },
    "2026-06-19": { open: "3:00 PM", close: "8:00 PM", event: "Night Market 5-8" },
    "2026-06-20": { open: "10:00 AM", close: "6:00 PM" },
    "2026-06-21": { open: "9:00 AM",  close: "1:00 PM" },
    "2026-06-22": null,
    "2026-06-23": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-24": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-25": { open: "3:00 PM", close: "8:00 PM", event: "Girls Night 6-8" },
    "2026-06-26": { open: "3:00 PM", close: "6:30 PM" },
    "2026-06-27": { open: "10:00 AM", close: "6:00 PM" },
    "2026-06-28": { open: "9:00 AM",  close: "1:00 PM" },
    "2026-06-29": null,
    "2026-06-30": { open: "3:00 PM", close: "6:30 PM" },
  },

  // --- Google Maps embed URL (OWNER: replace with your real embed URL) ---
  // To get yours: Google Maps -> search your exact address -> click Share ->
  // choose "Embed a map" -> copy the URL from the src="..." attribute.
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23887.22!2d-89.0718!3d42.8356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8806c7e1b8a3e7c5%3A0xfd3e6b80e5f5f5c0!2sEdgerton%2C%20WI%2053534!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
};
