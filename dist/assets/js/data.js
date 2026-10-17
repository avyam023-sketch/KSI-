/*
 * KSI Plus product catalogue — single source of truth.
 * Transcribed from "KSI Catalogue Nov 2025". Used by the build script
 * (Node, CommonJS) and by the browser (window.KSI).
 *
 * Product shape:
 *   id      url slug + image file name (img/products/<id>.webp)
 *   code    catalogue model code
 *   name    product name, tier    Premium / Deluxe / Regular / Advance / Classic …
 *   desc    short description
 *   more    optional extra paragraphs
 *   specs   [label, value] rows
 *   lists   [title, [items]] groups
 *   gallery [[image id, caption]]
 */
(function (root) {
  const company = {
    brand: "KSI Plus",
    legal: "K. Swaranraj Inc.",
    tagline: "Built for professionals. Designed for better healthcare.",
    since: 1973,
    phone: "+91 98154 53531",
    phoneHref: "+919815453531",
    whatsapp: "919815453531",
    mobile: "+91 98884 94324",
    mobileHref: "+919888494324",
    email: "ksimedicare@gmail.com",
    web: "www.ksiplus.com",
    siteUrl: "https://www.ksiplus.com",
    offices: [
      {
        title: "India Office",
        lines: ["SCO 270, Cabin B2, Sector 14", "Panchkula, Haryana 134113", "India"],
        phone: "+91 98884 94324",
        map: "SCO 270 Sector 14 Panchkula Haryana 134113",
      },
      {
        title: "Works & Sales",
        lines: ["Plot No. 14, Hansa Industrial Park", "Barwala Road, Derabassi", "Distt. Mohali, Punjab 140507"],
        map: "Hansa Industrial Park Barwala Road Derabassi Punjab 140507",
      },
      {
        title: "Canada Office",
        sub: "K. Swarnraj Medicare Solutions",
        lines: ["Brampton, Ontario", "L6X 4X8, Canada"],
        phone: "+1 (437) 240-3797",
        email: "kswarnrajinc@gmail.com",
      },
    ],
  };

  const categories = [
    {
      id: "ot-tables",
      name: "Operation Theatre Tables",
      short: "OT Tables",
      lead: "Electro-hydraulic, electric and hydraulic tables, C-arm ready, with orthopaedic and gynaecology variants.",
      cover: "ksi-201",
    },
    {
      id: "ot-lights",
      name: "Operation Theatre Lights",
      short: "OT Lights",
      lead: "Shadow-less LED surgical lights — mobile, ceiling single, twin and multi-dome, up to 1,60,000 lux per dome.",
      cover: "ksi-104",
    },
    {
      id: "hospital-beds",
      name: "Hospital Beds",
      short: "Hospital Beds",
      lead: "Electric and mechanical ICU beds from five functions down to plain ward beds, plus attendant beds and mattresses.",
      cover: "ksi-301",
    },
    {
      id: "furniture",
      name: "Hospital Furniture & Trolleys",
      short: "Furniture & Trolleys",
      lead: "Bedside lockers, recovery and patient trolleys, food trolleys, instrument trolleys and crash carts.",
      cover: "ksi-407",
    },
    {
      id: "stands-seating",
      name: "Saline Stands, Stools & Wheelchairs",
      short: "Stands & Seating",
      lead: "IV stands, revolving stools, footsteps and wheelchairs in all-stainless and epoxy-coated finishes.",
      cover: "ksi-433",
    },
    {
      id: "ward-accessories",
      name: "Ward Accessories",
      short: "Ward Accessories",
      lead: "Curtain screens, attendant stools, linen hampers, kick buckets and wash basin stands.",
      cover: "ksi-436",
    },
    {
      id: "sterilizers",
      name: "Steam Sterilizers & CSSD",
      short: "Sterilizers & CSSD",
      lead: "Vertical high-pressure autoclaves, drum autoclaves, UV chambers, foggers and suction apparatus.",
      cover: "ksi-501",
    },
    {
      id: "hollowware",
      name: "Drums, Trays & Pans",
      short: "Drums, Trays & Pans",
      lead: "Seamless stainless-steel dressing drums, instrument trays, hollowware and ward essentials.",
      cover: "ksi-511",
    },
    {
      id: "infant-care",
      name: "Infant Care",
      short: "Infant Care",
      lead: "LED phototherapy, radiant warmers and hospital bassinets for maternity wards and NICUs.",
      cover: "ksi-603",
    },
  ];

  /* Shared lists reused across products */
  const OT_STD_ACC = ["Rubber mattress set", "Anaesthetist screen", "Padded lithotomy crutches", "Arm rest", "Padded shoulder & lateral supports"];
  const OT_OPT_ACC = ["Universal orthopaedic attachment", "Neurosurgery attachment", "Arm surgery attachment", "S.S. urology tray"];
  const ACTUATOR_POS = ["Elevation", "Back section raising & lowering", "Trendelenburg position", "Lateral tilt"];
  const ADV_OPTIONAL = ["Colour temperature: adjustable (on demand)", "Endo mode: available (on demand)"];
  const ELEC_BENEFITS_5 = ["Elevation — electric", "Trendelenburg & reverse — electric", "Back section — electric", "Foot end raising & lowering — electric"];
  const MECH_BENEFITS_5 = ["Elevation", "Trendelenburg & reverse", "Back section position", "Foot end raising & lowering"];
  const BED_RANGE_5 = [["Back section", "0–80°"], ["Knee section", "0–30°"], ["Trendelenburg", "0–15°"], ["Reverse Trendelenburg", "0–15°"]];
  const BED_RANGE_2 = [["Back section", "0–80°"], ["Knee section", "0–30°"]];

  const products = [
    /* ───────────────────────── OT TABLES ───────────────────────── */
    {
      id: "ksi-201", code: "KSI-201/ORT/EH", cat: "ot-tables",
      name: "Electro-Hydraulic Operation Room Table", tier: "URAP Series",
      badge: "Flagship",
      desc: "An electro-hydraulic table with C-arm compatibility, built for smooth, low-vibration positioning across the full range of surgical procedures.",
      more: [
        "The electro-hydraulic system delivers smooth, precise movement with minimal vibration, and its electronics are designed for energy efficiency. A compact, modular design saves space in crowded surgical suites.",
        "Constructed from high-grade stainless steel and composite alloys to withstand high-frequency use while maintaining strict hygiene standards. The modular framework allows future upgrades.",
      ],
      specs: [
        ["Table length", "2070 mm"], ["Table width (without side rails)", "520 mm"], ["Table height (without mattress)", "690–1120 mm"],
        ["Trendelenburg / reverse", "30° / 26°"], ["Lateral tilt L / R", "20° / 20°"], ["Back up / down", "90° / 45°"],
        ["Leg up / down", "20° / 90° (removable)"], ["Leg open (2 pcs)", "0–180°"], ["Head up / down", "60° / 90°"],
        ["Kidney elevator (up)", "0–120 mm (optional)"], ["Longitudinal sliding", "0–300 mm"], ["Flex / reflex", "230° / 110°"],
      ],
      lists: [
        ["Standard accessories", OT_STD_ACC],
        ["Optional accessories", ["Universal orthopaedic attachment — floor model", "Universal orthopaedic attachment — hanging model", "Neurosurgery attachment", "Arm surgery attachment", "S.S. urology tray"]],
      ],
      gallery: [["ksi-201-3", "Chair position"], ["ksi-201-4", "Trendelenburg / reverse"], ["ksi-201-5", "Lateral tilt"], ["ksi-201-1", "Back down"], ["ksi-201-2", "Top sliding"]],
      tags: ["C-arm compatible", "Electro-hydraulic"],
    },
    {
      id: "ksi-202", code: "KSI-202/ORT/EM04", cat: "ot-tables",
      name: "Electric Operation Room Table with Manual Override", tier: "New Design",
      desc: "A high-quality actuator-driven table with a manual override switch, so surgery continues uninterrupted even during a power failure.",
      more: [
        "Actuators control height, back section, Trendelenburg and lateral tilt; head and leg sections adjust manually. Central locking castors, operated by a single lever, lock the table firmly in place.",
      ],
      specs: [
        ["Table length", "2050 mm"], ["Table width", "550 mm"], ["Table height", "750–1000 mm"], ["Back up / down", "85° / 40°"],
        ["Trendelenburg / reverse", "25° / 20°"], ["Lateral tilt L / R", "20° / 20°"], ["Head up / down", "60° / 90° (manual)"],
        ["Leg down", "90° (manual)"], ["Kidney elevation", "0–100 mm"],
      ],
      lists: [["Actuator-controlled positions", ACTUATOR_POS], ["Standard accessories", OT_STD_ACC]],
      gallery: [["ksi-202-3", "Chair position"], ["ksi-202-2", "Trendelenburg / reverse"], ["ksi-202-4", "Lateral tilt"], ["ksi-202-1", "Back down"], ["ksi-202-5", "Central locking castor lever"]],
      tags: ["Manual override", "C-arm compatible"],
    },
    {
      id: "ksi-203", code: "KSI-203/ORT/E4P", cat: "ot-tables",
      name: "Electric 4-Function Centric Operation Room Table",
      desc: "A heavy-duty centric table with high load capacity for bariatric surgery, a divided foot section for urology, and C-arm / X-ray compatibility.",
      more: [
        "An additional control on the column supplements the hand remote. A foot-operated brake adds stability, and extended removable sections accommodate specialised procedures. Manual override switching is available on demand.",
      ],
      specs: [
        ["Table length", "2050 mm"], ["Table width", "550 mm"], ["Table height", "700–1000 mm"], ["Back up / down", "85° / 40°"],
        ["Trendelenburg / reverse", "25° / 25°"], ["Lateral tilt L / R", "20° / 20°"], ["Head up / down", "60° / 90° (manual)"],
        ["Leg up / down / outward", "15° / 90° / 90° (manual)"], ["Kidney elevation", "0–110 mm"],
      ],
      lists: [["Actuator-controlled positions", ACTUATOR_POS], ["Standard accessories", OT_STD_ACC.concat(["Divided foot section"])], ["Optional accessories", OT_OPT_ACC]],
      gallery: [["ksi-203-2", "Chair position"], ["ksi-203-1", "Trendelenburg / reverse"], ["ksi-203-3", "Lateral tilt"], ["ksi-203-4", "Divided foot section"]],
      tags: ["Bariatric", "Urology"],
    },
    {
      id: "ksi-204", code: "KSI-204/ORT/E5P", cat: "ot-tables",
      name: "Electric 5-Function Centric Operation Room Table",
      desc: "A next-generation five-function table with top sliding, split foot sections for abduction and reduction, and an integrated foot brake.",
      specs: [
        ["Table length", "2050 mm"], ["Table width", "550 mm"], ["Table height", "700–1000 mm"], ["Top sliding", "200 mm (250 / 300 mm on demand)"],
        ["Back up / down", "85° / 40°"], ["Trendelenburg / reverse", "25° / 25°"], ["Lateral tilt L / R", "20° / 20°"],
        ["Head up / down", "60° / 90° (manual)"], ["Leg up / down / outward", "15° / 90° / 90° (manual)"], ["Kidney elevation", "0–110 mm"],
      ],
      lists: [["Actuator-controlled positions", ["Elevation", "Top sliding", "Back section raising & lowering", "Trendelenburg position", "Lateral tilt"]], ["Standard accessories", OT_STD_ACC], ["Optional accessories", OT_OPT_ACC]],
      tags: ["Top sliding", "5 functions"],
    },
    {
      id: "ksi-205", code: "KSI-205/ORT/E4P", cat: "ot-tables",
      name: "Electric 4-Function Eccentric Operation Room Table",
      desc: "An eccentric-column table for better C-arm access, with remote-controlled motorised functions and a detachable leg section (0–90°).",
      specs: [
        ["Table length", "1960 mm"], ["Table width", "530 mm"], ["Table height", "750–1000 mm"], ["Back up / down", "85° / 40°"],
        ["Trendelenburg / reverse", "25° / 20°"], ["Lateral tilt L / R", "20° / 20°"], ["Head up / down", "60° / 90° (manual)"],
        ["Leg down", "90° (manual, removable)"], ["Kidney elevation", "1–120 mm"],
      ],
      lists: [["Actuator positions (remote)", ACTUATOR_POS], ["Manual positions", ["Head section raising & lowering", "Leg section raising & lowering"]], ["Standard accessories", OT_STD_ACC]],
      tags: ["C-arm compatible", "Eccentric column"],
    },
    {
      id: "ksi-206", code: "KSI-206/ORT/MH", cat: "ot-tables",
      name: "Hydraulic / Mechanical Operation Room Table", tier: "Radiolucent Top",
      desc: "A foot-pump hydraulic table with a radiolucent, C-arm compatible top. Stable, easy to move, with optional attachments for many positions.",
      specs: [
        ["Table length", "1960 mm"], ["Table width", "530 mm"], ["Table height", "750–1000 mm"], ["Back up / down", "85° / 25°"],
        ["Trendelenburg / reverse", "25° / 20°"], ["Lateral tilt L / R", "20° / 20°"], ["Head up / down", "60° / 90° (manual)"],
        ["Leg down", "90° (manual)"], ["Kidney elevation", "0–120 mm"],
      ],
      tags: ["C-arm compatible", "Hydraulic"],
    },
    {
      id: "ksi-207", code: "KSI-207/ORT/SS", cat: "ot-tables",
      name: "Hydraulic / Mechanical Operation Room Table", tier: "SS Top",
      desc: "A conventional hydraulic and mechanical table with a stainless-steel top.",
      specs: [
        ["Table length", "1960 mm"], ["Table width", "530 mm"], ["Table height", "750–1000 mm"], ["Back up / down", "85° / 40°"],
        ["Trendelenburg / reverse", "25° / 20°"], ["Lateral tilt L / R", "20° / 20°"], ["Head up / down", "60° / 90° (manual)"],
        ["Leg down", "90° (manual)"], ["Kidney elevation", "0–120 mm"],
      ],
      tags: ["Hydraulic", "Stainless top"],
    },
    {
      id: "ksi-208", code: "KSI-208/ORT/OAF", cat: "ot-tables",
      name: "Orthopaedic Attachment", tier: "Floor Model",
      desc: "A floor-standing orthopaedic attachment for C-arm procedures, made entirely of SS 304.",
      lists: [["Set includes", [
        "Made of complete S.S. 304 grade", "Foot plate with ortho shoes — 1 pair", "Orthopaedic section — 1 set", "Tibia attachment — 1 pc",
        "Pelvic rest — 1 pc", "Hand surgery table", "Pelvic support (radiolucent) — 1 pc", "Inner thigh support (radiolucent) — 1 pc", "Leg holder (Goepel type) — 1 pair",
      ]]],
      tags: ["Orthopaedic", "SS 304"],
    },
    {
      id: "ksi-209", code: "KSI-209/ORT/OAH", cat: "ot-tables",
      name: "Orthopaedic Attachment", tier: "Hanging Model",
      desc: "A table-mounted orthopaedic attachment for C-arm procedures, made entirely of SS 304.",
      lists: [["Set includes", [
        "Made of complete S.S. 304 grade", "Orthopaedic section — 1 set", "Pelvic rest — 1 pc", "Pelvic support (radiolucent) — 1 pc",
        "Inner thigh support (radiolucent) — 1 pc", "Foot traction with ortho shoes — 1 pair", "Tibia attachment — 1 pc",
        "Hand surgery table (radiolucent) — 1 pc", "Leg holder (Goepel type) — 1 pair",
      ]]],
      tags: ["Orthopaedic", "SS 304"],
    },
    {
      id: "ksi-210", code: "KSI-210/ORT/OGE", cat: "ot-tables",
      name: "Gynaecology Table", tier: "Electric Operated",
      desc: "An electric obstetric and gynaecology table for examinations, natural deliveries, caesarean sections and urological treatment.",
      more: ["Includes a reverse Trendelenburg function (30°). The removable leg section and integrated side railings add flexibility and patient safety."],
      specs: [
        ["Table length", "1900 mm"], ["Table width", "580 mm"], ["Table height", "560–960 mm"], ["Reverse Trendelenburg", "30° / 30°"],
        ["Back up / down", "+75° / 0°"], ["Seat up / down", "+22° / 0°"], ["Load capacity", "150 kg"],
      ],
      lists: [["Standard accessories", ["Ergonomic rubber mattress", "Adjustable anaesthetist screen", "Safety side railing (optional)"]]],
      tags: ["Gynaecology", "Electric"],
    },
    {
      id: "ksi-211", code: "KSI-211/ORT/OGS", cat: "ot-tables",
      name: "Obstetric cum Gynae Table Telescopic", tier: "All SS",
      desc: "A fully stainless-steel telescopic obstetric table built for comfort and convenience for patient and gynaecologist.",
      specs: [["Approx. dimensions", "1830 (L) × 680 (W) × 750 (H) mm"]],
      lists: [["Features", [
        "Leg section slides under trunk section", "Complete stainless steel construction", "Stainless-steel top divided into three sections",
        "Trendelenburg on gas spring", "Back rest adjustable on ratchet", "Mattress, lithotomy crutches and SS sink included", "Removable safety side railing", "Patient hand grips",
      ]]],
      tags: ["Gynaecology", "All stainless"],
    },
    {
      id: "ksi-212", code: "KSI-212/ORT/OGP", cat: "ot-tables",
      name: "Obstetric cum Gynae Table Telescopic", tier: "EPC",
      desc: "A telescopic obstetric table in high-quality mild steel with epoxy powder coating, for sturdiness and stability.",
      specs: [["Approx. dimensions", "1830 (L) × 680 (W) × 750 (H) mm"]],
      lists: [["Features", [
        "Leg section slides under trunk section", "Mild steel body with EPC coating", "Stainless-steel covered top in three sections",
        "Trendelenburg on gas spring", "Back rest adjustable on ratchet", "Mattress, lithotomy crutches and SS sink included", "Removable safety side railing", "Patient hand grips",
      ]]],
      tags: ["Gynaecology", "Epoxy coated"],
    },
    {
      id: "ksi-213", code: "KSI-213/ORT/LT", cat: "ot-tables",
      name: "Labour Table", tier: "SS Top Regular",
      desc: "A sturdy, ergonomic labour table that supports a safe, efficient delivery for patient and medical team.",
      specs: [["Approx. dimensions", "1830 (L) × 680 (W) × 750 (H) mm"]],
      lists: [["Features", ["Stainless-steel covered top", "Mechanical Trendelenburg position", "Back rest adjustable on ratchet", "Lithotomy rods and mattress included", "Pre-treated, epoxy powder coated"]]],
      tags: ["Maternity"],
    },

    /* ───────────────────────── OT LIGHTS ───────────────────────── */
    {
      id: "ksi-101", code: "KSI-101-ORL/M30", cat: "ot-lights",
      name: "Mobile LED Operation Light", tier: "300 mm Dome · Advance",
      desc: "A mobile shadow-less LED light on a wheeled stand that can be moved anywhere in the OT.",
      specs: [
        ["Type", "Mobile"], ["Light head diameter", "30 cm"], ["Luminance", "60,000 lux"], ["LED count", "21"], ["Colour temperature", "4300 K"],
        ["Colour rendering index (Ra)", "95"], ["Light field", "12–25 cm"], ["Illumination depth", "140 cm"], ["Max. power consumption", "10.5 W"],
        ["Luminance control", "10–100 %, 9 levels"], ["Average LED life", "50,000 hours"],
      ],
      gallery: [["ksi-101-1", "Light head"]],
      tags: ["Mobile", "Advance series"],
    },
    {
      id: "ksi-102", code: "KSI-102-ORL/M50", cat: "ot-lights",
      name: "Mobile LED Operation Light", tier: "500 mm Dome · Advance",
      desc: "A 500 mm mobile surgical light with optimal illumination and depth perception and adjustable intensity.",
      specs: [
        ["Luminance", "1,20,000 lux"], ["Light head diameter", "50 cm"], ["LED count", "54"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      gallery: [["ksi-102-1", "Light head"]],
      tags: ["Mobile", "Advance series"],
    },
    {
      id: "ksi-103", code: "KSI-103-ORL/C50", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Single", tier: "500 mm Dome · Advance",
      desc: "Ceiling-mounted shadow-less light with 18 prismatic reflectors, each holding three high-performance LEDs.",
      specs: [
        ["Luminance", "1,30,000 lux"], ["Light head diameter", "50 cm"], ["LED count", "54"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Ceiling", "Advance series"],
    },
    {
      id: "ksi-104", code: "KSI-104-ORL/C70", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Single", tier: "700 mm Dome · Advance",
      badge: "1,60,000 lux",
      desc: "Our brightest single dome: 36 prismatic reflectors with three LEDs each, and an inverted mounting that keeps the surgical field clear.",
      specs: [
        ["Luminance", "1,60,000 lux"], ["Light head diameter", "70 cm"], ["LED count", "108"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">114 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Ceiling", "Advance series"],
    },
    {
      id: "ksi-105", code: "KSI-105-ORL/T3030", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "300 + 300 mm · Advance",
      desc: "Twin 300 mm domes with seven prismatic reflectors each, for flexible positioning and a cool working environment.",
      specs: [
        ["Type", "Ceiling twin"], ["Light head diameter (each)", "30 cm"], ["Luminance (each)", "60,000 lux"], ["LED count (each)", "21"],
        ["Colour temperature", "4300 K"], ["Colour rendering index (Ra)", "95"], ["Light field", "12–25 cm"], ["Illumination depth", "140 cm"],
        ["Max. power consumption", "10.5 W"], ["Luminance control", "10–100 %, 9 levels"], ["Average LED life", "50,000 hours"],
      ],
      tags: ["Twin dome", "Advance series"],
    },
    {
      id: "ksi-106", code: "KSI-106-ORL/T3050", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "300 + 500 mm · Advance",
      desc: "A 300 mm and a 500 mm dome together, for targeted lighting with adjustable intensity and reduced eye fatigue.",
      specs: [
        ["Type", "Ceiling twin"], ["Light head diameter", "30 + 50 cm"], ["Luminance", "60,000 + 1,20,000 lux"], ["LED count", "21 + 54"],
        ["Colour temperature", "4300 ± 200 K"], ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"],
        ["Light field", "12–25 cm, 12–35 cm"], ["Illumination depth", "140–145 cm"], ["Luminance control", "10–100 %, 9 levels"], ["Average LED life", "50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Twin dome", "Advance series"],
    },
    {
      id: "ksi-107", code: "KSI-107-ORL/T5050", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "500 + 500 mm · Advance",
      desc: "Two identical 500 mm domes that eliminate shadows and give uniform light with excellent depth of field for complex procedures.",
      specs: [
        ["Luminance (each)", "1,30,000 lux"], ["Light head diameter (each)", "50 cm"], ["LED count (each)", "54"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Twin dome", "Advance series"],
    },
    {
      id: "ksi-108", code: "KSI-108-ORL/T5070", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "500 + 700 mm · Advance",
      desc: "A 500 mm and 700 mm dome pairing that balances intensity and depth perception for critical procedures.",
      specs: [
        ["Luminance", "1,30,000 + 1,60,000 lux"], ["Light head diameter", "50 + 70 cm"], ["LED count", "54 + 108"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Twin dome", "Advance series"],
    },
    {
      id: "ksi-109", code: "KSI-109-ORL/T7070", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "700 + 700 mm · Advance",
      desc: "Two 700 mm domes giving 1,60,000 lux each, for large procedures.",
      specs: [
        ["Luminance", "1,60,000 + 1,60,000 lux"], ["Light head diameter", "70 + 70 cm"], ["LED count", "108 + 108"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Twin dome", "Advance series"],
    },
    {
      id: "ksi-110", code: "KSI-110-ORL/T5070C", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin with Monitor Arm", tier: "500 + 700 mm · Advance",
      desc: "A twin-dome ceiling light with a third arm for a monitor or camera.",
      specs: [
        ["Luminance", "1,30,000 + 1,60,000 lux"], ["Light head diameter", "50 + 70 cm"], ["LED count", "54 + 108"], ["Colour temperature", "4300 ± 200 K"],
        ["Colour rendering index (Ra)", "95"], ["Red colour index (R9)", "94"], ["Light field diameter", "12–35 cm"], ["Illumination depth", ">145 cm"],
        ["Working distance", "50–180 cm"], ["Luminance control", "10–100 %, 9 levels"], ["LED service life", ">50,000 hours"],
      ],
      lists: [["Optional on demand", ADV_OPTIONAL]],
      tags: ["Triple arm", "Advance series"],
    },
    {
      id: "ksi-111", code: "KSI-111-ORL/M50N", cat: "ot-lights",
      name: "Mobile LED Operation Light", tier: "500 mm Dome · Classic",
      desc: "A classic-series mobile light with digital brightness control, memory function and adjustable focus and colour temperature.",
      specs: [
        ["Luminance", "1,20,000 lux +10 %"], ["Light head diameter", "50 cm"], ["LED count", "48"], ["Light field", "15–30 cm"],
        ["Colour temperature", "3800–6200 K"], ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"],
        ["Power supply", "220 V / 50 Hz AC"], ["Memory function", "Available"], ["Focusing", "Adjustable"], ["Colour temperature control", "Adjustable"],
      ],
      tags: ["Mobile", "Classic series"],
    },
    {
      id: "ksi-112", code: "KSI-112-ORL/C50N", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Single", tier: "500 mm Dome · Classic",
      desc: "Classic-series 500 mm ceiling light with digital control, memory function and endo mode.",
      specs: [
        ["Luminance", "1,20,000 lux +10 %"], ["Light head diameter", "50 cm"], ["LED count", "48"], ["Light field", "15–30 cm"],
        ["Colour temperature", "3800–6200 K"], ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"],
        ["Power supply", "220 V / 50 Hz AC"], ["Memory function", "Available"], ["Focusing", "Adjustable"], ["Endo mode", "Available"],
      ],
      tags: ["Ceiling", "Classic series"],
    },
    {
      id: "ksi-113", code: "KSI-113-ORL/C70CN", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Single", tier: "700 mm Dome · Classic",
      desc: "Classic-series 700 mm ceiling light delivering 1,60,000 lux with digital control and endo mode.",
      specs: [
        ["Intensity", "1,60,000 lux ±10 %"], ["LED count", "80"], ["Light field", "15–30 cm"], ["Colour temperature", "3800–6200 K"],
        ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"], ["Power supply", "220 V / 50 Hz AC"],
        ["Memory function", "Available"], ["Focusing", "Adjustable"], ["Endo mode", "Available"],
      ],
      tags: ["Ceiling", "Classic series"],
    },
    {
      id: "ksi-114", code: "KSI-114-ORL/C5050N", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "500 + 500 mm · Classic",
      desc: "Classic-series twin 500 mm domes with digital brightness, memory function and endo mode.",
      specs: [
        ["Luminance (each)", "1,20,000 lux +10 %"], ["Light head diameter (each)", "50 cm"], ["LED count (each)", "48"], ["Light field", "15–30 cm"],
        ["Colour temperature", "3800–6200 K"], ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"],
        ["Power supply", "220 V / 50 Hz AC"], ["Memory function", "Available"], ["Endo mode", "Available"],
      ],
      tags: ["Twin dome", "Classic series"],
    },
    {
      id: "ksi-115", code: "KSI-115-ORL/5070N", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "500 + 700 mm · Classic",
      desc: "Classic-series 500 mm and 700 mm twin domes for balanced, high-intensity illumination.",
      specs: [
        ["Luminance", "1,20,000 + 1,60,000 lux"], ["LED count", "48 + 80"], ["Light field", "15–30 cm"], ["Colour temperature", "3800–6200 K"],
        ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"], ["Power supply", "220 V / 50 Hz AC"],
        ["Memory function", "Available"], ["Endo mode", "Available"],
      ],
      tags: ["Twin dome", "Classic series"],
    },
    {
      id: "ksi-116", code: "KSI-116-ORL/7070N", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "700 + 700 mm · Classic",
      desc: "Classic-series twin 700 mm domes at 1,60,000 lux each, with digital control and endo mode.",
      specs: [
        ["Intensity (each)", "1,60,000 lux ±10 %"], ["LED count (each)", "80"], ["Light field", "15–30 cm"], ["Colour temperature", "3800–6200 K"],
        ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"], ["Brightness control", "Digital"], ["Power supply", "220 V / 50 Hz AC"],
        ["Memory function", "Available"], ["Endo mode", "Available"],
      ],
      tags: ["Twin dome", "Classic series"],
    },
    {
      id: "ksi-117", code: "KSI-117-ORL/M3", cat: "ot-lights",
      name: "Mobile LED Operation Light", tier: "3 Multi-Dome",
      desc: "A mobile three-dome LED light with adjustable intensity and focus, easy to move between rooms.",
      specs: [
        ["Dome body", "Aluminium die cast"], ["LED count", "36 (12 per dome)"], ["Intensity", "1,00,000 lux ±10 %"], ["Max. power consumption", "80 W"],
        ["Light field", "12–20 cm"], ["Colour temperature", "3800–5000 K"], ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"],
        ["Brightness control", "8-level intensity controller"], ["Power supply", "220 V / 50 Hz AC"], ["Focusing", "Adjustable"],
      ],
      tags: ["Mobile", "Multi-dome"],
    },
    {
      id: "ksi-118", code: "KSI-118-ORL/S3", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Single", tier: "3 Multi-Dome",
      desc: "A ceiling-mounted three-dome light in die-cast aluminium with 8-level intensity control.",
      specs: [
        ["Dome body", "Aluminium die cast"], ["LED count", "36 (12 per dome)"], ["Intensity", "1,00,000 lux ±10 %"], ["Max. power consumption", "80 W"],
        ["Light field", "12–20 cm"], ["Colour temperature", "3800–5000 K"], ["Colour rendering index", "93 Ra"], ["LED life", ">50,000 hours"],
        ["Brightness control", "8-level intensity controller"], ["Power supply", "220 V / 50 Hz AC"], ["Focusing", "Adjustable"],
      ],
      tags: ["Ceiling", "Multi-dome"],
    },
    {
      id: "ksi-119", code: "KSI-119-ORL/S43", cat: "ot-lights",
      name: "Ceiling LED Operation Light — Twin", tier: "4 + 3 Multi-Dome",
      desc: "A high-intensity, colour-correcting twin multi-dome system with adjustable focus and memory function.",
      specs: [
        ["Dome body", "Aluminium die cast"], ["LED count", "48 + 36 (12 per dome)"], ["Intensity", "1,30,000 + 1,00,000 lux ±10 %"],
        ["Max. power consumption", "80 W"], ["Light field", "12–20 cm"], ["Colour temperature", "3800–5000 K"], ["Colour rendering index", "93 Ra"],
        ["LED life", ">50,000 hours"], ["Brightness control", "8-level intensity controller"], ["Power supply", "220 V / 50 Hz AC"],
      ],
      tags: ["Twin", "Multi-dome"],
    },

    /* ───────────────────────── HOSPITAL BEDS ───────────────────────── */
    {
      id: "ksi-301", code: "KSI-301E-HBP", cat: "hospital-beds",
      name: "4/5 Function Electric ICU Bed", tier: "Premium",
      badge: "Flagship",
      desc: "A fully electric ICU bed with five positions (head, leg, Trendelenburg, reverse and lateral tilt) and ABS occidental safety railings.",
      more: ["Lifting linkages use solid high-grade bar rather than hollow pipe, for precise adjustment, extra strength and longer actuator life."],
      specs: BED_RANGE_5.concat([["Materials", "Premium CRC mild steel, MS perforated top (removable ABS top available)"]]),
      lists: [
        ["Features", ["ABS plastic head / foot bows", "ABS occidental railing", "One S.S. telescopic saline rod", "125 mm castors", "Central locking castors on demand"]],
        ["Electric functions", ELEC_BENEFITS_5],
      ],
      tags: ["Electric", "ICU"],
    },
    {
      id: "ksi-302", code: "KSI-302E-HBD", cat: "hospital-beds",
      name: "4/5 Function Electric ICU Bed", tier: "Deluxe",
      desc: "Full electric adjustability across five positions with collapsible stainless-steel railings for easy patient transfers.",
      specs: BED_RANGE_5.concat([["Materials", "CRC mild steel frame, MS perforated top (ABS removable top available)"]]),
      lists: [
        ["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. telescopic saline rod", "125 mm castors"]],
        ["Electric functions", ELEC_BENEFITS_5],
      ],
      tags: ["Electric", "ICU"],
    },
    {
      id: "ksi-303", code: "KSI-303E-HBR", cat: "hospital-beds",
      name: "4/5 Function Electric ICU Bed", tier: "Conventional Series",
      desc: "A classic full-function electric bed with stainless-steel laminated head and foot bows and fixed SS railings.",
      specs: BED_RANGE_5.concat([["Materials", "Standard CRC mild steel, SS laminated head / foot bows"]]),
      lists: [
        ["Features", ["M.S. perforated top", "S.S. laminated head / foot bars", "Full-length S.S. railing", "One S.S. telescopic saline rod", "125 mm castors"]],
        ["Electric functions", ELEC_BENEFITS_5],
      ],
      tags: ["Electric", "ICU"],
    },
    {
      id: "ksi-304", code: "KSI-304M-HBP", cat: "hospital-beds",
      name: "4/5 Function Mechanical ICU Bed", tier: "Premium",
      desc: "A five-function ICU bed worked by manual screw controls, for areas where power is limited.",
      specs: BED_RANGE_5.concat([["Operation", "Manual screw mechanism, five adjustments"], ["Materials", "Reinforced CRC mild steel"]]),
      lists: [
        ["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "ABS occidental railing", "One S.S. telescopic saline rod", "125 mm castors", "Central locking castors on demand"]],
        ["Positions", MECH_BENEFITS_5],
      ],
      tags: ["Mechanical", "ICU"],
    },
    {
      id: "ksi-305", code: "KSI-305M-HBD", cat: "hospital-beds",
      name: "4/5 Function Mechanical ICU Bed", tier: "Deluxe",
      desc: "A heavy-duty mild-steel ICU bed that supports high loads, for hospitals, nursing homes and home care.",
      specs: BED_RANGE_5.concat([["Operation", "Advanced screw mechanism"], ["Materials", "Heavy-duty CRC mild steel"]]),
      lists: [
        ["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. telescopic saline rod", "125 mm castors", "Central locking castors on demand"]],
        ["Positions", MECH_BENEFITS_5],
      ],
      tags: ["Mechanical", "ICU"],
    },
    {
      id: "ksi-306", code: "KSI-306M-HBR", cat: "hospital-beds",
      name: "4/5 Function Mechanical ICU Bed", tier: "Conventional Series",
      desc: "Essential five-function manual adjustability in a simple, reliable design for daily patient care.",
      specs: BED_RANGE_5.concat([["Operation", "Standard manual screw mechanism"], ["Materials", "Conventional CRC mild steel"]]),
      lists: [
        ["Features", ["M.S. perforated top", "S.S. laminated head / foot bows", "Full-length S.S. railing", "One S.S. telescopic saline rod", "125 mm castors"]],
        ["Positions", MECH_BENEFITS_5],
      ],
      tags: ["Mechanical", "ICU"],
    },
    {
      id: "ksi-307", code: "KSI-307E-HBP", cat: "hospital-beds",
      name: "2 Function Electric Hospital Bed", tier: "Premium",
      desc: "Electric head and leg adjustment in a compact, high-finish bed for standard patient-care environments.",
      specs: BED_RANGE_2.concat([["Operation", "Electric control for head and leg"], ["Materials", "Compact high-grade CRC mild steel"]]),
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. telescopic saline rod", "125 mm castors"]], ["Electric functions", ["Back section", "Foot end raising & lowering"]]],
      tags: ["Electric", "Ward"],
    },
    {
      id: "ksi-308", code: "KSI-308EM-HBD", cat: "hospital-beds",
      name: "2 Function Electric cum Mechanical Bed", tier: "Deluxe",
      desc: "An electric back section on a remote, with mechanical leg adjustment.",
      specs: BED_RANGE_2.concat([["Operation", "Back — electric (remote); leg — mechanical"], ["Materials", "Quality CRC mild steel"]]),
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. telescopic saline rod", "125 mm castors"]]],
      tags: ["Hybrid", "Ward"],
    },
    {
      id: "ksi-309", code: "KSI-309M-HBP", cat: "hospital-beds",
      name: "2 Function Mechanical Bed", tier: "Premium",
      desc: "Precise manual control of head and leg sections, with premium collapsible SS railings and ABS bows.",
      specs: BED_RANGE_2.concat([["Operation", "High-quality screw mechanism"], ["Materials", "Stainless-steel collapsible railings, ABS bows"]]),
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. saline rod", "100 mm castors"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-310", code: "KSI-310M-HBD", cat: "hospital-beds",
      name: "2 Function Mechanical Bed", tier: "Deluxe",
      desc: "Dependable manual head and leg adjustment in a streamlined deluxe format; railings and castors available on demand.",
      specs: BED_RANGE_2.concat([["Operation", "Precision screw mechanism"], ["Materials", "Deluxe mild steel, standard head / foot bows"]]),
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "One S.S. telescopic saline rod", "100 mm castors on demand"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-311", code: "KSI-311M-HBR", cat: "hospital-beds",
      name: "2 Function Mechanical Bed", tier: "Regular",
      desc: "A conventional two-function bed with SS laminated bows and collapsible SS railings for routine care.",
      specs: BED_RANGE_2.concat([["Operation", "Classic screw mechanism"], ["Materials", "Mild steel, laminated bows, SS collapsible railings"]]),
      lists: [["Features", ["M.S. perforated top", "Foot end raising & lowering", "Collapsible S.S. railing", "One S.S. saline rod", "S.S. laminated head / foot bows"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-312", code: "KSI-312EM-HBP", cat: "hospital-beds",
      name: "3 Function ICU Bed — Electric cum Mechanical", tier: "Premium",
      desc: "Electric control of the back and foot sections, with a manual mechanism for Trendelenburg and reverse.",
      specs: BED_RANGE_5.concat([["Operation", "Electric primary functions; manual Trendelenburg / reverse"], ["Materials", "CRC mild steel, ABS bows, collapsible SS railings"]]),
      lists: [["Features", ["M.S. perforated top", "125 mm castors (central locking on demand)"]]],
      tags: ["Hybrid", "ICU"],
    },
    {
      id: "ksi-313", code: "KSI-313M-HBD", cat: "hospital-beds",
      name: "3 Function ICU Mechanical Bed", tier: "Deluxe",
      desc: "Manual control of head/back, leg and Trendelenburg/reverse on a precision ratchet system.",
      specs: BED_RANGE_5.concat([["Operation", "Fully manual, three functions"], ["Materials", "Deluxe CRC mild steel, precision ratchet system"]]),
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "Collapsible S.S. railing", "One S.S. saline rod", "125 mm castors"]]],
      tags: ["Mechanical", "ICU"],
    },
    {
      id: "ksi-314", code: "KSI-314E-HBP", cat: "hospital-beds",
      name: "1 Function Electric Bed", tier: "Premium",
      desc: "Remote-operated electric backrest in a compact, elegant bed that is easy to clean; SS collapsible railings on demand.",
      specs: [["Back section", "0–80°"], ["Operation", "Digital electric backrest (remote)"], ["Materials", "Premium CRC mild steel"]],
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "One S.S. saline rod"]]],
      tags: ["Electric", "Ward"],
    },
    {
      id: "ksi-315", code: "KSI-315M-HBD", cat: "hospital-beds",
      name: "1 Function Mechanical Bed", tier: "Deluxe",
      desc: "A single backrest adjustment on a screw mechanism, for routine diagnostics.",
      specs: [["Back section", "0–80°"], ["Operation", "Premium screw mechanism"], ["Materials", "Deluxe CRC mild steel"]],
      lists: [["Features", ["M.S. perforated top", "ABS plastic head / foot bows", "One S.S. saline rod", "100 mm castors on demand"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-316", code: "KSI-316M-HBR", cat: "hospital-beds",
      name: "1 Function Mechanical Bed", tier: "Regular",
      desc: "A conventional backrest bed with SS laminated head and foot bows, for diagnostic and recovery use.",
      specs: [["Back section", "0–80°"], ["Operation", "Standard screw mechanism"], ["Materials", "CRC mild steel, laminated head / foot bows"]],
      lists: [["Features", ["M.S. perforated top", "S.S. laminated head / foot bows", "Collapsible railings", "100 mm castors on demand"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-317", code: "KSI-317M-HBC", cat: "hospital-beds",
      name: "2 Function Full Fowler Bed — Mechanical", tier: "Conventional Series",
      desc: "A full Fowler bed with manual adjustment, collapsible railings and ABS bows, for extended care and rehabilitation.",
      specs: BED_RANGE_2.concat([["Configuration", "Full Fowler"], ["Materials", "Conventional CRC mild steel, ABS head / foot bows"]]),
      lists: [["Features", ["M.S. perforated top", "100 mm castors available", "Collapsible SS railings"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-318", code: "KSI-318M-HBC", cat: "hospital-beds",
      name: "1 Function Semi Fowler Bed — Mechanical", tier: "Conventional Series",
      desc: "A single manual back-section adjustment, in mild steel with ABS bows.",
      specs: [["Back section", "0–80°"], ["Operation", "Manual backrest"], ["Materials", "CRC mild steel"]],
      lists: [["Features", ["M.S. perforated top", "Collapsible S.S. railing on demand", "100 mm castors on demand"]]],
      tags: ["Mechanical", "Ward"],
    },
    {
      id: "ksi-319", code: "KSI-319ABS-PL", cat: "hospital-beds",
      name: "Hospital Bed Plain", tier: "Regular",
      desc: "A simple, heavy-structured flat bed for recovery areas and general wards. Dimensions can be customised.",
      specs: [["Operation", "No adjustable functions"], ["Materials", "Plain CRC mild steel, flat top"]],
      lists: [["Features", ["M.S. perforated top", "Head / foot bows of unequal height", "Standard dimensions (customisable)"]]],
      tags: ["Ward"],
    },
    {
      id: "ksi-320", code: "KSI-320AB-HB", cat: "hospital-beds",
      name: "Attendant Bed",
      desc: "A fixed, non-adjustable bed for patient attendants and caregivers.",
      specs: [["Operation", "Static, non-adjustable"], ["Materials", "Robust CRC mild steel for heavy use"]],
      lists: [["Features", ["Custom designed for attendant use", "SS laminated head and foot bows"]]],
      tags: ["Ward"],
    },
    {
      id: "ksi-321", code: "KSI-321MAT", cat: "hospital-beds",
      name: "Hospital Bed Mattress",
      desc: "A 100 mm, 38-density foam mattress, available plain or in two- and four-section versions.",
      specs: [["Foam density", "38"], ["Thickness", "100 mm"], ["Versions", "Plain, two-section, four-section"]],
      tags: ["Ward"],
    },

    /* ───────────────────────── FURNITURE & TROLLEYS ───────────────────────── */
    {
      id: "ksi-401", code: "KSI-401-BLP", cat: "furniture",
      name: "Bedside Locker", tier: "ABS Premium",
      desc: "A high-grade ABS bedside locker that is easy to clean.",
      lists: [["Features", ["ABS plastic locker", "Heavy duty", "Drawer and cupboards", "Mobile on castors"]]],
    },
    {
      id: "ksi-402", code: "KSI-402-BLN", cat: "furniture",
      name: "Bedside Fridge Locker",
      desc: "A laminate bedside locker with a built-in fridge for quick-access care settings.",
      lists: [["Features", ["Laminate locker", "Heavy duty", "Drawer and fridge", "Mobile on castors"]]],
    },
    {
      id: "ksi-403", code: "KSI-403-BLD", cat: "furniture",
      name: "Bedside Locker", tier: "Deluxe, Drawer & SS Top",
      desc: "A deluxe locker with a stainless-steel top, integrated drawer and extra compartments.",
      lists: [["Features", ["Three-side covered shelf", "Heavy-gauge M.S. cupboard", "Drawer and cupboard", "EPC with S.S. top", "Mobile on back castors"]]],
    },
    {
      id: "ksi-404", code: "KSI-404-BLM", cat: "furniture",
      name: "Bedside Locker", tier: "Membrane Top",
      desc: "A waterproof ABS / membrane-top locker for moisture control and easy sanitation.",
      lists: [["Features", ["Heavy-gauge M.S. cupboard", "Epoxy powder coated, membrane / ABS front, cupboard and drawer", "Three-side covered shelf", "Mobile on two back castors"]]],
    },
    {
      id: "ksi-405", code: "KSI-405-BLR", cat: "furniture",
      name: "Bedside Locker", tier: "Regular SS Top",
      desc: "A simple M.S. locker with a stainless-steel top for everyday clinical use.",
      lists: [["Features", ["Legs on synthetic shoes", "Heavy-gauge M.S. cupboard", "Epoxy powder coated with S.S. top"]]],
    },
    {
      id: "ksi-406", code: "KSI-406-BLSS", cat: "furniture",
      name: "Bedside Table", tier: "All Stainless Steel",
      desc: "An all-stainless bedside table for maximum durability, hygiene and corrosion resistance.",
      lists: [["Features", ["Three S.S. shelves with railings", "Mounted on synthetic shoes", "Sturdy structure"]]],
    },
    {
      id: "ksi-407", code: "KSI-407P-RT", cat: "furniture",
      name: "Emergency Recovery Trolley", tier: "Premium · Global Standard",
      badge: "Global standard",
      desc: "A modular recovery trolley for rapid patient transfer in emergency and critical care, built to global standards.",
      specs: [["Size", "2100 × 670 × 700/800 mm"], ["Back board slope", "0–70°"], ["Knee board slope", "0–40°"], ["Board rising", "0–200 mm"]],
      lists: [["Features", ["Double-column luxury base", "Central control castors", "Built-in push handles", "Anti-collision bumper wheels protect head, foot and sides", "Side-rail handle allows angle control"]]],
    },
    {
      id: "ksi-408", code: "KSI-408D-RTH", cat: "furniture",
      name: "Emergency Recovery Trolley", tier: "Hydraulic Deluxe",
      desc: "A hydraulically operated recovery trolley for swift, controlled patient transport in high-acuity areas.",
      lists: [
        ["Features", ["Cassette-holding tray underneath", "Removable radiolucent top", "Adjustable telescopic saline rod", "Built-in oxygen cylinder holder", "Swing-away SS safety railing"]],
        ["Functions", ["Trendelenburg and reverse on gas spring", "Hydraulic elevation via foot-operated pump", "Mechanical elevation (optional on demand)"]],
      ],
    },
    {
      id: "ksi-409", code: "KSI-409P-PTB", cat: "furniture",
      name: "Patient Carrying Trolley with Backrest", tier: "Premium",
      desc: "Secure, comfortable patient transfers between wards, with an integrated backrest on ratchet.",
      lists: [["Features", [
        "Mild steel tubular frame", "150 mm heavy-duty castors", "Removable stretcher", "Swing-away EPC safety railing", "Built-in oxygen cylinder holder",
        "Bottom tray for patient records", "Built-in handle and mattress", "Backrest on ratchet", "Telescopic saline rod", "Complete S.S. version on demand",
      ]]],
    },
    {
      id: "ksi-410", code: "KSI-410D-PT", cat: "furniture",
      name: "Patient Carrying Trolley", tier: "Deluxe",
      desc: "A patient carrying trolley with a removable stretcher, mattress and fixed two-hook IV rod.",
      lists: [["Features", ["Mild steel tubular frame", "150 mm heavy-duty castors", "Removable stretcher", "Built-in handles and mattress", "Two-hook IV rod (fixed)"]]],
    },
    {
      id: "ksi-411", code: "KSI-411P-FT", cat: "furniture",
      name: "Food Trolley", tier: "Gas Spring · Premium",
      desc: "An over-bed food trolley with smooth gas-spring height adjustment and an ABS top.",
      lists: [["Features", ["ABS top", "Height adjustment through gas spring", "Mobile on castors"]]],
    },
    {
      id: "ksi-412", code: "KSI-412D-FT", cat: "furniture",
      name: "Food Trolley", tier: "Adjustable · Deluxe",
      desc: "An over-bed food trolley with reliable gear-handle height adjustment.",
      lists: [["Features", ["Height adjustment through gear handle", "Laminated / ABS top", "Mobile on castors"]]],
    },
    {
      id: "ksi-413", code: "KSI-413R-FT", cat: "furniture",
      name: "Food Trolley", tier: "Manual Adjustable · Regular",
      desc: "A practical, manually adjustable over-bed food trolley that is simple to maintain.",
      lists: [["Features", ["Laminated top", "Manual height adjustment", "Mobile on castors"]]],
    },
    {
      id: "ksi-414", code: "KSI-414-MOT", cat: "furniture",
      name: "Monitor / Laparoscopic Trolley",
      desc: "A stable, mobile platform for monitors and laparoscopic equipment that reduces OT setup time.",
      lists: [["Features", ["Complete epoxy powder coated frame", "Five shelves and one drawer", "Oxygen cylinder frame", "Panel of five switches", "Mobile on 4\" castors"]]],
    },
    {
      id: "ksi-415", code: "KSI-415P-MT", cat: "furniture",
      name: "Mayo's Instrument Trolley", tier: "All SS Premium",
      desc: "An all-stainless over-bed instrument trolley that is easy to clean.",
      lists: [["Features", ["Complete S.S. framework", "Removable S.S. tray", "Over-bed type", "Mobile on castors"]]],
    },
    {
      id: "ksi-416", code: "KSI-416R-MT", cat: "furniture",
      name: "Mayo's Instrument Trolley", tier: "EPC Regular",
      desc: "An EPC-frame over-bed instrument trolley with a removable stainless-steel tray.",
      lists: [["Features", ["M.S. (EPC) framework", "Removable S.S. tray", "Over-bed type", "Mobile on castors"]]],
    },
    {
      id: "ksi-417", code: "KSI-417P-ITB", cat: "furniture",
      name: "Instrument Trolley with Bowl & Bucket", tier: "All SS",
      desc: "A multitasking instrument trolley with integrated bowl and bucket for an organised surgical workflow.",
      lists: [["Features", ["Complete S.S. construction", "Two S.S. shelves", "S.S. bowl and bucket", "Mobile on 4\" castors (two with brakes)"]]],
    },
    {
      id: "ksi-418", code: "KSI-418D-ITS", cat: "furniture",
      name: "Instrument Trolley", tier: "All SS Deluxe",
      desc: "An all-stainless deluxe trolley with enhanced capacity for handling surgical instruments.",
      lists: [["Features", ["Complete S.S. construction", "Two fixed S.S. shelves", "S.S. railing on three sides", "Mobile on castors"]]],
    },
    {
      id: "ksi-419", code: "KSI-419R-IT", cat: "furniture",
      name: "Instrument Trolley", tier: "EPC with SS Shelves · Regular",
      desc: "An EPC frame with two stainless-steel shelves, for everyday use.",
      lists: [["Features", ["M.S. framework, EPC", "Two fixed S.S. shelves", "S.S. railing on three sides", "Mobile on castors"]]],
    },
    {
      id: "ksi-420", code: "KSI-420P-CC", cat: "furniture",
      name: "Crash Cart", tier: "Global Standard",
      badge: "Global standard",
      desc: "An emergency crash cart built to international standards, with clearly organised storage for critical equipment and drugs.",
      lists: [["Features", [
        "ABS top board with arc handle and raised edges", "Stainless-steel guard rail", "Aluminium columns", "Central lock; 2 small, 2 middle and 1 large drawer",
        "Drawer label cards", "Defibrillator shelf, sliding side shelf, utility container", "Dust basket, needle disposal holder, IV pole", "Four noiseless castors, two with brakes",
      ]]],
    },
    {
      id: "ksi-421", code: "KSI-421D-CC", cat: "furniture",
      name: "Crash Cart", tier: "All SS Deluxe",
      desc: "An all-stainless crash cart with lockable storage and an oxygen cylinder trolley for rapid emergency response.",
      lists: [["Features", ["Complete S.S. framework", "Three S.S. shelves and lockable polystyrene storage", "Built-in S.S. oxygen cylinder trolley", "Mobile on castors"]]],
    },
    {
      id: "ksi-422", code: "KSI-422R-CC", cat: "furniture",
      name: "Crash Cart", tier: "EPC Frame · Regular",
      desc: "An epoxy-coated crash cart with modular storage, designed for rapid deployment and easy maintenance.",
      lists: [["Features", ["M.S. epoxy powder coated framework", "Three S.S. shelves and lockable polystyrene storage", "Built-in EPC oxygen cylinder trolley", "Mobile on castors"]]],
    },

    /* ───────────────────────── STANDS & SEATING ───────────────────────── */
    {
      id: "ksi-423", code: "KSI-423P-IV", cat: "stands-seating",
      name: "Saline Stand, 4 Hooks", tier: "All SS Premium",
      desc: "An all-stainless IV stand with four hooks for simultaneous infusions.",
      specs: [["Base", "515 × 515 mm"], ["Height (down / up)", "1420 / 2330 mm"]],
      lists: [["Features", ["Complete S.S.", "Heavy tubular base", "Mobile on castors", "Manual height adjustment, four IV hooks"]]],
    },
    {
      id: "ksi-424", code: "KSI-424D-IV", cat: "stands-seating",
      name: "Saline Stand, 2 Hooks", tier: "All SS Deluxe",
      desc: "An all-stainless IV stand with two hooks.",
      specs: [["Base", "515 × 515 mm"], ["Height (down / up)", "1420 / 2330 mm"]],
      lists: [["Features", ["Complete S.S.", "Heavy tubular base", "Mobile on castors", "Manual height adjustment, two IV hooks"]]],
    },
    {
      id: "ksi-425", code: "KSI-425R-IV", cat: "stands-seating",
      name: "Saline Stand, 2 Hooks", tier: "EPC Regular",
      desc: "A standard epoxy-coated IV stand for routine everyday use.",
      specs: [["Base", "515 × 515 mm"], ["Height (down / up)", "1420 / 2330 mm"]],
      lists: [["Features", ["Heavy tubular base", "Mobile on castors", "Manual height adjustment, two IV hooks", "Epoxy powder coated"]]],
    },
    {
      id: "ksi-426", code: "KSI-426P-RSC", cat: "stands-seating",
      name: "Revolving Stool, Cushioned Top", tier: "All SS Premium",
      desc: "An all-stainless revolving stool with a cushioned seat for comfort through long procedures.",
      lists: [["Features", ["Complete S.S. tubular construction", "Cushioned top", "Foot-rest ring", "Synthetic / rubber shoes"]]],
    },
    {
      id: "ksi-427", code: "KSI-427D-RSS", cat: "stands-seating",
      name: "Revolving Stool", tier: "All SS Deluxe",
      desc: "A polished all-stainless revolving stool for high-demand clinical environments.",
      specs: [["Seat", "430 × 430 mm"], ["Height (down / up)", "470 / 630 mm"]],
      lists: [["Features", ["Complete S.S. tubular construction", "S.S. top", "Foot-rest ring", "Synthetic / rubber shoes"]]],
    },
    {
      id: "ksi-428", code: "KSI-428R-RS", cat: "stands-seating",
      name: "Revolving Stool, SS Top", tier: "EPC Frame · Regular",
      desc: "A minimal, practical revolving stool with an SS seat and epoxy-coated frame.",
      specs: [["Seat", "430 × 430 mm"], ["Height (down / up)", "470 / 630 mm"]],
      lists: [["Features", ["M.S. tubular construction (EPC)", "S.S. top", "Foot-rest ring", "Synthetic / rubber shoes"]]],
    },
    {
      id: "ksi-429", code: "KSI-429DS-FS", cat: "stands-seating",
      name: "Footstep, Double", tier: "All SS Premium",
      desc: "A double footstep made entirely of stainless steel.",
      lists: [["Features", ["Complete S.S.", "S.S. pipe with rubber mat", "Rubber shoes"]]],
    },
    {
      id: "ksi-430", code: "KSI-430DP-FS", cat: "stands-seating",
      name: "Footstep, Double", tier: "EPC Regular",
      desc: "An EPC double footstep balancing cost-effectiveness and function for daily use.",
      lists: [["Features", ["M.S. pipe with rubber mat", "Rubber shoes", "Epoxy powder coated"]]],
    },
    {
      id: "ksi-431", code: "KSI-431SS-FS", cat: "stands-seating",
      name: "Footstep, Single", tier: "All SS Premium",
      desc: "A single stainless footstep that is durable and easy to clean.",
      lists: [["Features", ["Complete S.S.", "S.S. pipe with rubber mat", "Rubber shoes"]]],
    },
    {
      id: "ksi-432", code: "KSI-432SP-FS", cat: "stands-seating",
      name: "Footstep, Single", tier: "EPC Regular",
      desc: "A conventional single footstep with an EPC frame and non-slip surface.",
      lists: [["Features", ["M.S. pipe with rubber mat", "Rubber shoes", "Epoxy powder coated"]]],
    },
    {
      id: "ksi-433", code: "KSI-433P-WC", cat: "stands-seating",
      name: "Wheelchair", tier: "All SS Non-Folding · Premium",
      desc: "A non-folding wheelchair fabricated fully in stainless steel for long-term clinical use.",
      lists: [["Features", ["S.S. framework", "Durable seat and back", "Heavy-duty cycle rims", "Footrest paddles with brake"]]],
    },
    {
      id: "ksi-434", code: "KSI-434D-WC", cat: "stands-seating",
      name: "Wheelchair", tier: "EPC Non-Folding · Deluxe",
      desc: "A comfortable, durable non-folding wheelchair on an epoxy-coated frame.",
      lists: [["Features", ["M.S. EPC framework", "Durable seat and back", "Heavy-duty cycle rims", "Footrest paddles with brake"]]],
    },
    {
      id: "ksi-435", code: "KSI-435F-WC", cat: "stands-seating",
      name: "Wheelchair", tier: "Folding Model",
      desc: "A compact folding wheelchair that is easy to store and move.",
      lists: [["Features", ["Durable seat and back", "Heavy-duty cycle rims", "Footrest paddles with brake"]]],
    },

    /* ───────────────────────── WARD ACCESSORIES ───────────────────────── */
    {
      id: "ksi-436", code: "KSI-436-BS", cat: "ward-accessories",
      name: "Bedside Curtain Screen", tier: "3 Fold",
      desc: "A lightweight three-panel screen for flexible patient privacy.",
      lists: [["Features", ["1\" M.S. pipe construction", "Epoxy powder coated", "Mobile on castors"]]],
    },
    {
      id: "ksi-437", code: "KSI-437-PS", cat: "ward-accessories",
      name: "Patient Attendant Stool",
      desc: "A compact, sturdy stool for caregivers in busy wards.",
      specs: [["Seat", "430 × 430 mm"]],
      lists: [["Features", ["M.S. construction", "Sturdy structure"]]],
    },
    {
      id: "ksi-438", code: "KSI-438-SL", cat: "ward-accessories",
      name: "Soiled Linen Hamper",
      desc: "A linen hamper with a removable canvas bag, easy to clean.",
      lists: [["Features", ["All M.S. epoxy powder coated frame", "Removable canvas bag", "Mobile on castors", "Complete S.S. on demand"]]],
    },
    {
      id: "ksi-439", code: "KSI-439-OB", cat: "ward-accessories",
      name: "Oval Kick Bucket",
      desc: "A mobile oval kick bucket for safe collection of clinical waste.",
      lists: [["Features", ["All S.S. frame", "Removable S.S. basin", "Mobile on castors"]]],
    },
    {
      id: "ksi-440", code: "KSI-440-BS", cat: "ward-accessories",
      name: "Wash Basin Stand", tier: "Single",
      desc: "A stable, mobile single basin stand for clinical sanitation areas.",
      lists: [["Features", ["Epoxy powder coated frame", "Removable S.S. basin", "Mobile on castors", "Complete S.S. on demand"]]],
    },

    /* ───────────────────────── STERILIZERS / CSSD ───────────────────────── */
    {
      id: "ksi-501", code: "KSI-501-VH", cat: "sterilizers",
      name: "Vertical High-Pressure Steam Sterilizer",
      badge: "121 °C / 134 °C",
      desc: "An electrically operated triple-wall autoclave for instruments, dressings, linen, rubber, plastics and injectable liquids at 15–20 PSI.",
      specs: [
        ["Model A", "16\" dia × 24\" depth · 2 × 3 kW · 80 L"], ["Model B", "12\" dia × 20\" depth · 2 × 2 kW · 40 L"],
        ["Pressure", "15–20 PSI, adjustable"], ["Sterilising temperature", "121 °C / 134 °C"], ["Supply", "220 V, single phase, 50 Hz AC"],
      ],
      lists: [["Features", [
        "Chamber, lid and outer cover in stainless steel 18/10", "Inner chamber with steam jacket", "Lid closes with wing nuts", "Jointless neoprene gasket — no leakage",
        "Chamber insulated with mineral / glass wool", "Double safety valve, water-level indicator, water inlet and drain valves",
        "Automatic continuous pressure and temperature monitoring", "Low-water cut-off device", "Supplied with cord and plug (dressing bins not included)",
      ]]],
    },
    {
      id: "ksi-501a", code: "KSI-501A-VH", cat: "sterilizers",
      name: "Vertical High-Pressure Steam Sterilizer", tier: "Regular",
      desc: "A dependable vertical autoclave in SS 304 for everyday CSSD loads.",
      specs: [["Sterilising temperature", "121 °C / 134 °C"], ["Supply", "220 V, single phase, 50 Hz AC"]],
      lists: [["Features", [
        "Chamber, lid and outer cover in SS 304", "Lid closes with wing nuts", "Jointless neoprene gasket — no leakage", "Chamber insulated with mineral / glass wool",
        "Double safety valve, water-level indicator, water inlet and drain valves", "Supplied with cord and plug (dressing bins not included)",
      ]]],
    },
    {
      id: "ksi-502", code: "KSI-502", cat: "sterilizers",
      name: "Single Drum Autoclave, Cooker Type", tier: "All Stainless Steel",
      desc: "An all-stainless cooker-type autoclave for reliable, repeatable sterilisation cycles.",
      specs: [["Size", "14\" × 12\""], ["Capacity", "25 L"], ["Electric load", "1.5 kW"], ["Other sizes", "9×9, 9×12, 12×18, 14×21"]],
    },
    {
      id: "ksi-502a", code: "KSI-502A", cat: "sterilizers",
      name: "Single Drum Autoclave, Cooker Type", tier: "Aluminium",
      desc: "A lightweight seamless aluminium autoclave that is easy to transport.",
      specs: [["Sizes", "14\" × 12\" (25 L) · 12\" × 12\" (20 L)"], ["Other sizes", "9×9, 9×12, 12×18, 14×21"]],
    },
    {
      id: "ksi-503", code: "KSI-503", cat: "sterilizers",
      name: "Single Drum Autoclave, Wing Nut Type", tier: "All Stainless Steel",
      desc: "A seamless stainless-steel wing-nut autoclave.",
      specs: [["Sizes", "14\" × 12\" (25 L) · 12\" × 12\" (20 L)"], ["Electric load", "1.5 kW"], ["Other sizes", "9×9, 9×12, 12×18, 14×21"]],
    },
    {
      id: "ksi-503a", code: "KSI-503A", cat: "sterilizers",
      name: "Single Drum Autoclave, Wing Nut Type", tier: "Aluminium",
      desc: "A lightweight seamless aluminium wing-nut autoclave.",
      specs: [["Sizes", "14\" × 12\" (25 L) · 12\" × 12\" (20 L)"], ["Other sizes", "9×9, 9×12, 12×18, 14×21"]],
    },
    {
      id: "ksi-504", code: "KSI-504", cat: "sterilizers",
      name: "Instrument Sterilizer", tier: "Electric Portable, Seamless",
      desc: "A seamless electric instrument boiler with built-in thermostat and auto-lift tray.",
      specs: [["Sizes (in)", "12×6×5 · 16×6×5 · 17×8×6 · 24×12×12"], ["Sizes (mm)", "300×155×130 · 410×155×130 · 430×205×150 · 610×305×305"]],
      lists: [["Features", ["Auto-lift handle", "Built-in thermostat", "Seamless SS 304 / 202 body", "Auto tray-lifting mechanism"]]],
    },
    {
      id: "ksi-505", code: "KSI-505", cat: "sterilizers",
      name: "UV Chamber", tier: "12 Tray",
      desc: "A UV cabinet for sterilising instruments, documents, phones and keys. The UV light destroys bacteria within 3 to 5 minutes.",
      specs: [["Outer body", "12\" × 7.4\" × 20.6\""], ["Inner body", "12\" × 6.2\" × 20.6\""], ["Inner with side tray", "8.8\" × 6.2\" × 17.6\""], ["Packing box (single)", "14.4\" × 11\" × 23.4\""]],
      lists: [["Features", ["Twelve trays drawn from 0.5 mm S.S. coil", "Original Philips UV tube with S.S. reflector", "5 mm toughened glass", "CNC-made compact cabinet", "EPE foam protection, 7-ply box"]]],
    },
    {
      id: "ksi-506", code: "KSI-506", cat: "sterilizers",
      name: "Formalin Vapour Sterilizer",
      desc: "Acrylic formalin chambers in Economy, Deluxe and Super Deluxe grades.",
      specs: [["Sizes (in)", "10×8×6 · 14×8×6 · 20×8×8 · 23×8×8 · 26×8×8 · 30×8×8"], ["Economy", "3–3.5 mm sheet"], ["Deluxe", "5 mm sheet"], ["Super Deluxe", "6 mm sheet"], ["Trays", "Two (10\", 14\") · three (20\"–30\")"]],
    },
    {
      id: "ksi-507", code: "KSI-507-FGR", cat: "sterilizers",
      name: "ULV Micro Fogger",
      desc: "A stainless-steel ULV fogger that atomises both oil- and water-based disinfectants.",
      specs: [["Body & tank", "SS 304"], ["Tank capacity", "4 L"], ["Blower motor", ">25,000 RPM"], ["Nozzle", "Counter-rotating vortex"]],
    },
    {
      id: "ksi-508", code: "KSI-508-AA", cat: "sterilizers",
      name: "Aerosol Apparatus (Fumigator)",
      desc: "An aerosol fumigator for OT and ward disinfection, quality-tested at every stage of manufacture.",
      specs: [["Max. height", "390 mm"], ["Weight", "8.5 kg (approx.)"], ["Atomising capacity", "30–50 ml/min"], ["Capacity", "1.5 L & 5 L"], ["Timer", "Available"]],
    },
    {
      id: "ksi-509", code: "KSI-509H-SA", cat: "sterilizers",
      name: "Suction Apparatus", tier: "High Vacuum",
      desc: "A cabinet-model high-vacuum suction unit with an oil-immersed pump.",
      specs: [["Motor", "0.5 HP"], ["Vacuum range", "0 to −700 mmHg"], ["Vacuum gauge", "100 mm dia."], ["Bottles", "2 × 2 L"]],
      lists: [["Features", ["Stainless-steel top", "M.S. carry handle", "Oil-immersed vacuum pump", "Vacuum control regulator"]]],
    },
    {
      id: "ksi-510", code: "KSI-510G-SA", cat: "sterilizers",
      name: "Suction Apparatus", tier: "General Purpose",
      desc: "A general-purpose cabinet suction unit for wards and procedure rooms.",
      specs: [["Motor", "0.25 HP"], ["Vacuum range", "0 to −700 mmHg"], ["Vacuum gauge", "63 mm dia."], ["Bottles", "2 × 1.5 L"]],
      lists: [["Features", ["Stainless-steel top", "M.S. carry handle", "Oil-immersed vacuum pump", "Vacuum control regulator"]]],
    },

    /* ───────────────────────── DRUMS, TRAYS & PANS ───────────────────────── */
    { id: "ksi-511", code: "KSI-511-DD", cat: "hollowware", name: "Dressing Drum", tier: "SS Seamless", desc: "A seamless stainless dressing drum for the safe storage and transport of sterile instruments and dressings." },
    { id: "ksi-512", code: "KSI-512-ITS", cat: "hollowware", name: "Surgical Instrument Tray", desc: "A stainless instrument tray with cover that maintains sterility during transport." },
    { id: "ksi-513", code: "KSI-513-CT", cat: "hollowware", name: "Catheter Tray", desc: "A covered stainless catheter tray for contamination control." },
    { id: "ksi-514", code: "KSI-514-KT", cat: "hollowware", name: "Kidney Tray", tier: "Stainless Steel", desc: "A contoured stainless kidney tray for efficient fluid collection." },
    { id: "ksi-515", code: "KSI-515-CIT", cat: "hollowware", name: "Cidex Tray", tier: "Stainless Steel", desc: "Stainless-steel Cidex soaking tray.", specs: [["Size", "680 × 175 × 115 mm"], ["Grades", "SS 304 / SS 202"]] },
    { id: "ksi-516", code: "KSI-516-CITP", cat: "hollowware", name: "Cidex Tray", tier: "Plastic", desc: "A chemical-resistant plastic Cidex soaking tray.", specs: [["Size", "735 × 175 × 120 mm"]] },
    { id: "ksi-517", code: "KSI-517-ST", cat: "hollowware", name: "Shallow Tray", tier: "Stainless Steel", desc: "A low-profile instrument prep tray that is easy to clean and stack.", specs: [["Sizes (in)", "9×6, 10×8, 12×8, 14×10, 15×12, 18×12"], ["Height", "20 mm or 30 mm"]] },
    { id: "ksi-518", code: "KSI-518-UR", cat: "hollowware", name: "Urinal", tier: "Stainless Steel", desc: "Seamless, heavy-duty urinals in male and female versions.", specs: [["Grades", "SS 304 / SS 202"]] },
    { id: "ksi-519", code: "KSI-519-BP", cat: "hollowware", name: "Bed Pan", tier: "Stainless Steel", desc: "Seamless, heavy-duty bed pans in male and female versions.", specs: [["Grades", "SS 304 / SS 202"]] },
    { id: "ksi-520", code: "KSI-520-GP", cat: "hollowware", name: "Gali Pot with Lid", tier: "Stainless Steel", desc: "Stainless gallipots with lids.", specs: [["Capacities", "60, 112, 175, 225 ml"]] },
    { id: "ksi-521", code: "KSI-521-WS", cat: "hollowware", name: "Baby Weighing Scale", desc: "Available in metal or plastic body." },
    { id: "ksi-522", code: "KSI-522-BTS", cat: "hollowware", name: "Baby Tray", tier: "SS", desc: "Stainless-steel baby tray." },
    { id: "ksi-523", code: "KSI-523-FW", cat: "hollowware", name: "Oxygen Flow Meter", desc: "Oxygen fine-adjustment valve with flow meter and humidifier bottle." },
    { id: "ksi-524", code: "KSI-524-KP", cat: "hollowware", name: "Kelly's Pad", desc: "A water-inflatable pad for hygienic support during gynaecological procedures." },
    { id: "ksi-525", code: "KSI-525-ND", cat: "hollowware", name: "Needle Destroyer", desc: "Available in electric and manual models." },
    {
      id: "ksi-526", code: "KSI-526-RB", cat: "hollowware", name: "Resuscitator Bag", desc: "Silicone resuscitator bags in adult, child and infant sizes, with non-rebreathing valve and 1.5 m oxygen tubing.",
      specs: [["Adult", "1600 / 2000 ml folding bellow · No. 4 mask"], ["Child", "500 ml folding bellow · No. 1 mask"], ["Infant", "250 ml bellow · No. 0 mask"]],
      lists: [["All sizes", ["Silicone bellow", "Non-rebreathing valve with pressure release", "360° swivelling patient connector", "1.5 m oxygen tubing"]]],
    },
    {
      id: "ksi-527", code: "KSI-527-FG", cat: "hollowware", name: "Folding Stretcher", desc: "Folding stretchers in single, double, triple and four-fold versions.",
      specs: [["Single fold", "Lightweight, for rapid deployment"], ["Double fold", "Folds along both axes"], ["Triple fold", "Compact storage, reinforced joints"], ["Four fold", "For mobile medical kits"]],
    },
    {
      id: "ksi-528", code: "KSI-528-VB", cat: "hollowware", name: "X-Ray View Box", desc: "High-brightness LED film viewers in single to four-panel versions.",
      specs: [["Single", "One film, high-brightness LED"], ["Double", "Side-by-side comparison"], ["Triple", "Multidisciplinary review"], ["Quad", "High-volume use"]],
    },

    /* ───────────────────────── INFANT CARE ───────────────────────── */
    {
      id: "ksi-603", code: "KSI-603-PU", cat: "infant-care",
      name: "LED Phototherapy Unit",
      desc: "Blue-LED phototherapy for neonatal jaundice. Fanless, silent and height-adjustable.",
      specs: [
        ["Illumination source", "12 blue LEDs"], ["Observation lights", "3 white LEDs"], ["LED intensity", "~60 µW/cm²/nm"], ["Peak wavelength", "450–465 nm"],
        ["Tilting head", "0–180°"], ["Therapy timer", "Yes"], ["LED lifetime", "50,000 hours"], ["Treatment distance", "35–40 cm"],
        ["Castors", "4, two lockable"], ["Max. power", "40 W"], ["Electrical supply", "110–240 V AC, 50/60 Hz"], ["Overall dimensions", "620 × 520 × 1360 mm"],
      ],
      lists: [["Features", ["Smart tilt technology", "Height-adjustable, tiltable light unit", "Noise-free, fanless operation", "Adjustable intensity", "Run-time and therapy counter"]]],
    },
    {
      id: "ksi-601", code: "KSI-601-PBB", cat: "infant-care",
      name: "Baby Bassinet / Cradle", tier: "Premium",
      desc: "An ABS cradle with a removable transparent crib, height and tilt adjustment, on smooth castors.",
      lists: [["Features", ["ABS plastic cradle", "Removable transparent crib", "100 mm castors"]], ["Functions", ["Elevation", "Trendelenburg & reverse"]]],
    },
    {
      id: "ksi-602", code: "KSI-602-BCR", cat: "infant-care",
      name: "Baby Cradle", tier: "Swing-Away · Regular",
      desc: "A tubular steel cradle with swing motion and a leather-foam mattress.",
      lists: [["Features", ["Tubular pipe frame", "100 mm castors", "Leather-foam covered mattress", "Swing motion"]]],
    },
    {
      id: "ksi-604", code: "KSI-604-RW", cat: "infant-care",
      name: "Infant Radiant Warmer",
      desc: "An open-care warmer for newborns at risk of heat loss, for NICUs, labour rooms and nurseries.",
      more: ["Consists of a cart, bassinet, heater module with examination light, and a pillar module housing the controller and SMPS. A removable instrument tray mounts at the rear."],
      specs: [["Modes", "Servo (skin probe), manual (10–100 % heater power), air"]],
      lists: [["Features", ["Heater module controller", "Examination light", "Apgar timer", "Alarms: set point high / low, probe failure"]]],
    },
  ];

  const testimonials = [
    { name: "Dr. Manjit Sekhon", org: "Cosmo Hospital, Mohali", quote: "Based on our association and experience of more than two decades, if I have to sum up in one word the quality of KSI products, sales and after-sales support, it is ‘Perfection’." },
    { name: "Dr. Raj Bahadur", org: "Director Principal, GMCH Chandigarh", quote: "KSI is making a remarkable contribution to health and hospital technology. Keep it up." },
    { name: "Dr. Dhawan", org: "", quote: "I’ve been using KSI products since almost 2006. Their quality meets the global standard and their after-sales service is excellent." },
    { name: "Ojas Hospital", org: "", quote: "We have been using KSI products for the last 15–20 years and have found them very sturdy and of high quality — they are still going." },
    { name: "Dr. Akhil Bhargav", org: "Silver Oaks Hospital, Mohali", quote: "In an association with the Khullars that spans two generations, I have seen KSI grow from strength to strength. KSI’s Kool Agni, Sakaar and Indra are names to reckon with in their class." },
    { name: "Mr. Gurtej Singh", org: "CEO, Ivy Hospital Mohali", quote: "Ivy Hospital congratulates KSI on developing their new range of OT lights, OT tables and hospital furniture." },
    { name: "Dr. R.S. Bedi", org: "", quote: "I’ve personally seen KSI emerge as one of the most professional and technologically modern companies — quality and service you can trust, with continuous innovation." },
    { name: "Dr. Sandeep Chattwal", org: "Omni Hospital, Chandigarh", quote: "I am probably the first buyer of Swarnraj equipment and highly satisfied with the equipment and after-sales service." },
    { name: "Dr. J.K. Bora", org: "City Maternity Centre, Jorhat, Assam", quote: "We are extremely happy and highly satisfied with the products of KSI Medicare." },
    { name: "Late Dr. V.K. Kak", org: "", quote: "They take due care of what the customer asks of them and are open to suggestions and customisation." },
  ];

  const certifications = [
    { id: "ce", title: "CE Certificate of Compliance", by: "BIC Ltd (UK)", img: "cert-1" },
    { id: "iso13485", title: "ISO 13485:2016", by: "QRO — medical devices QMS", img: "cert-2" },
    { id: "iso9001", title: "ISO 9001:2015", by: "TCCPL — quality management", img: "cert-4" },
    { id: "ce-tccpl", title: "CE Certificate of Compliance", by: "Trans Continental Certifications", img: "cert-3" },
  ];

  const data = { company, categories, products, testimonials, certifications };
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  else root.KSI = data;
})(typeof window !== "undefined" ? window : globalThis);
