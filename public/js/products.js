/**
 * CampusCart - Product Data
 * Contains realistic student academic and everyday college products.
 */

const PRODUCTS = [
  {
    id: 1,
    name: "Campus Backpack",
    price: 1299,
    originalPrice: 1999,
    image: "images/backpack.jpg",
    category: "College Essentials",
    rating: 4.8,
    reviews: 142,
    shortDesc: "Ergonomic 30L waterproof college laptop backpack with USB charging port.",
    fullDesc: "Specially engineered for college students balancing lectures, lab classes, and campus commutes. Features a dedicated cushioned compartment for up to 15.6-inch laptops, heavy-duty water-resistant ballistic polyester, multi-tier stationery organizers, an anti-theft hidden pocket, and dual elastic side pockets for water bottles or umbrellas.",
    features: [
      "Dedicated padded 15.6-inch laptop and tablet compartment",
      "Integrated external USB charging port with internal pocket",
      "Ergonomic breathable 3D honeycomb air-mesh back support",
      "Water-resistant 600D ballistic polyester shell",
      "Anti-theft concealed back security pocket for wallets and phone"
    ],
    inStock: true
  },
  {
    id: 2,
    name: "Premium Notebook",
    price: 249,
    originalPrice: 349,
    image: "images/notebook.svg",
    category: "Study Essentials",
    rating: 4.7,
    reviews: 89,
    shortDesc: "A5 Hardcover 200 pages 100 GSM ruled journal with ribbon bookmark.",
    fullDesc: "Designed for lecture note-taking, project documentation, and daily study planning. Crafted with thick 100 GSM bleed-resistant ivory paper that prevents fountain and gel pen bleed-through. Includes an elastic closure strap, dual satin ribbon bookmarks, and an expandable back pocket for syllabus printouts.",
    features: [
      "100 GSM bleed-resistant smooth ivory acid-free paper",
      "200 numbered ruled pages with date and subject headers",
      "Durable water-resistant vegan leather hardcover",
      "180-degree lay-flat thread binding for effortless writing",
      "Expandable inner document pocket & elastic band closure"
    ],
    inStock: true
  },
  {
    id: 3,
    name: "Gel Pen Set",
    price: 199,
    originalPrice: 299,
    image: "images/gel-pens.svg",
    category: "Study Essentials",
    rating: 4.9,
    reviews: 210,
    shortDesc: "Pack of 5 quick-dry, smudge-free 0.5mm precision gel pens.",
    fullDesc: "The ultimate exam and assignment writing pen kit. Formulated with Japanese quick-drying waterproof ink that glides smoothly without skipping or blotting. Ergonomic rubberized grip reduces writing fatigue during 3-hour semester exams. Highly recommended for both left- and right-handed writers.",
    features: [
      "Pack of 5 versatile colors (2 Classic Blue, 1 Black, 1 Red, 1 Forest Green)",
      "0.5mm tungsten carbide fine precision tip",
      "Ultra-fast dry smudge-proof ink formula",
      "Ergonomic soft-touch triangular comfort grip",
      "High ink capacity lasting up to 1,200 meters of continuous writing"
    ],
    inStock: true
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 499,
    originalPrice: 799,
    image: "images/water-bottle.svg",
    category: "Lifestyle",
    rating: 4.6,
    reviews: 115,
    shortDesc: "750ml double-wall insulated flask keeping drinks cold 24h & hot 12h.",
    fullDesc: "Stay refreshed throughout back-to-back classes and library study hours. Built from food-grade 18/8 stainless steel with double-wall vacuum insulation. Sweat-proof matte powder coat finish ensures a solid grip, while the leak-proof silicone gasket prevents accidental spills in your backpack.",
    features: [
      "Food-grade 18/8 (304) rust-free stainless steel construction",
      "Double-wall vacuum insulation (Cold: 24h, Hot: 12h)",
      "100% leak-proof airtight twist-cap with carabiner loop",
      "Condensation-free powder-coated exterior grip",
      "BPA-free, phthalate-free and eco-friendly reusable design"
    ],
    inStock: true
  },
  {
    id: 5,
    name: "Adjustable Laptop Stand",
    price: 899,
    originalPrice: 1499,
    image: "images/laptop-stand.jpg",
    category: "Tech Accessories",
    rating: 4.8,
    reviews: 97,
    shortDesc: "Foldable aluminum ergonomic riser with 6 height levels and anti-slip silicone.",
    fullDesc: "Eliminate neck stiffness and poor posture during long study and programming sessions. Precision-machined from lightweight aircraft-grade aluminum alloy, this stand offers 6 adjustable tilt angles to raise your screen to eye level. Open hollow architecture provides passive cooling to keep laptops running fast.",
    features: [
      "6 adjustable height angles from 15 to 45 degrees",
      "Aerospace-grade sandblasted aluminum alloy build",
      "Thick non-slip silicone pads protecting laptop from scratches",
      "Hollow ventilated framework for maximum heat dissipation",
      "Folds completely flat into included portable velvet carrying pouch"
    ],
    inStock: true
  },
  {
    id: 6,
    name: "Wireless Headphones",
    price: 1799,
    originalPrice: 2999,
    image: "images/headphones.jpg",
    category: "Tech Accessories",
    rating: 4.7,
    reviews: 178,
    shortDesc: "40H playtime over-ear Bluetooth headphones with active noise isolation.",
    fullDesc: "Block out hostel noise, chatter, and busy campus corridors. Featuring 40mm dynamic acoustic drivers tuned for crystal-clear vocals in recorded lectures and rich bass for music. Features memory-protein plush ear cushions, a built-in HD microphone with noise suppression, and Bluetooth 5.3 with dual-device pairing.",
    features: [
      "Up to 40 hours of continuous wireless playback on single charge",
      "Passive noise isolation over-ear memory foam cushions",
      "40mm dynamic drivers with high fidelity stereo audio",
      "Built-in omnidirectional microphone with ENC for online classes",
      "Foldable swivel earcups with auxiliary 3.5mm wired backup cable"
    ],
    inStock: true
  },
  {
    id: 7,
    name: "LED Study Lamp",
    price: 749,
    originalPrice: 1199,
    image: "images/study-lamp.svg",
    category: "Study Essentials",
    rating: 4.7,
    reviews: 83,
    shortDesc: "Touch-control eye-care desk lamp with 3 color modes and flexible gooseneck.",
    fullDesc: "Protect your eyesight during nocturnal exam cram sessions. Equipped with 24 eye-friendly, flicker-free LEDs that minimize eye strain and glare. Easy capacitive touch panel lets you toggle between Warm White (relaxation), Natural White (reading), and Cool Daylight (focused study), with stepless brightness control.",
    features: [
      "Eye-caring RG0 zero-blue-light flicker-free LED illumination",
      "3 color temperatures (3000K Warm, 4500K Natural, 6000K Daylight)",
      "Smooth stepless touch-dimming brightness control",
      "360-degree durable bendable silicone gooseneck",
      "USB powered with low 5W energy consumption (works with power banks)"
    ],
    inStock: true
  },
  {
    id: 8,
    name: "College ID Card Holder",
    price: 149,
    originalPrice: 249,
    image: "images/id-holder.svg",
    category: "College Essentials",
    rating: 4.5,
    reviews: 64,
    shortDesc: "Durable clear acrylic badge case with detachable quick-release campus lanyard.",
    fullDesc: "Keep your student identity card, library pass, hostel entry badge, and transit card safe and scannable. Manufactured with impact-resistant crystal acrylic and a secure snap closure. The soft woven jacquard lanyard includes a safety breakaway clasp and heavy-duty swivel metal carabiner.",
    features: [
      "Ultra-clear scratch-resistant acrylic frame with easy thumb slide",
      "Dual-sided capacity: fits 2 standard ISO credit/ID cards",
      "Soft woven skin-friendly nylon lanyard (45cm drop)",
      "Safety breakaway release clasp prevents snagging accidents",
      "RFID/NFC contactless tap works directly through the case"
    ],
    inStock: true
  },
  {
    id: 9,
    name: "Pencil Case",
    price: 299,
    originalPrice: 449,
    image: "images/pencil-case.svg",
    category: "Study Essentials",
    rating: 4.6,
    reviews: 76,
    shortDesc: "High-capacity zippered pouch with mesh organization compartments.",
    fullDesc: "Organize up to 50 pens, pencils, highlighters, compass sets, and scientific calculators. Crafted from rugged tear-resistant Oxford canvas. Features a spacious main compartment, elastic pen retention loops, and two internal zipper mesh pockets for USB drives, erasers, and sticky flags.",
    features: [
      "Massive storage volume fits up to 50 pens and stationery supplies",
      "Reinforced heavy-duty dual-slide metal zippers",
      "Dedicated elastic pen slots and mesh zippered utility pouches",
      "Water-resistant and dirt-washable Oxford canvas fabric",
      "Compact collapsible design that fits easily in any bag compartment"
    ],
    inStock: true
  },
  {
    id: 10,
    name: "USB Study Light",
    price: 199,
    originalPrice: 299,
    image: "images/usb-light.svg",
    category: "Tech Accessories",
    rating: 4.4,
    reviews: 52,
    shortDesc: "Bendable USB LED light stick for laptops, power banks, and night reading.",
    fullDesc: "Ideal for dorm rooms with sleeping roommates. Simply plug this bendable silicone LED stick into any laptop USB port, power bank, or charger to cast clean, directed light right onto your keyboard or textbook without lighting up the whole room.",
    features: [
      "Plug-and-play USB Type-A interface (no battery needed)",
      "Flexible bendable rubber neck retains any configured angle",
      "6 high-efficiency warm-white SMD LEDs with matte diffuser",
      "Ultra-lightweight (under 20 grams) fits easily in pen pouches",
      "Energy-saving 1.2W low power draw"
    ],
    inStock: true
  },
  {
    id: 11,
    name: "Sticky Notes Pack",
    price: 129,
    originalPrice: 199,
    image: "images/sticky-notes.svg",
    category: "Study Essentials",
    rating: 4.8,
    reviews: 134,
    shortDesc: "Set of 4 vibrant pastel self-adhesive note pads (400 sheets total).",
    fullDesc: "Essential for chapter bookmarks, revision summaries, to-do lists, and textbook annotations. Features 4 pads (Canary Yellow, Mint Green, Soft Pink, Sky Blue) with 100 sheets each. Strong non-toxic adhesive stays stuck to textbooks, laptop cases, and dorm walls, yet removes cleanly without residue.",
    features: [
      "4 pastel color pads with 100 sheets per pad (400 total sheets)",
      "Standard 3x3 inch (76 x 76 mm) convenient note size",
      "Enhanced adhesive formulation sticks firmly and removes cleanly",
      "Bleed-resistant 80 GSM paper works with gel pens and markers",
      "100% recyclable, eco-friendly solvent-free adhesive"
    ],
    inStock: true
  },
  {
    id: 12,
    name: "Desk Organizer",
    price: 599,
    originalPrice: 999,
    image: "images/desk-organizer.svg",
    category: "College Essentials",
    rating: 4.7,
    reviews: 88,
    shortDesc: "Multi-compartment mesh steel desk caddy with slide-out drawer.",
    fullDesc: "Transform cluttered hostel study desks into an inspiring productivity haven. Engineered from sturdy powder-coated mesh metal, this organizer features 6 diverse sorting compartments for notebooks, books, stationery, plus a smooth pull-out bottom drawer for sticky notes, staples, and small accessories.",
    features: [
      "Durable scratch-resistant mesh steel with rust-proof coating",
      "6 vertical and horizontal compartments plus pull-out drawer",
      "4 anti-slip rubber feet prevent desk scratches and sliding",
      "Vertical rear slot perfectly holds notebooks, folders, and tablets",
      "No assembly required - ready to use right out of the box"
    ],
    inStock: true
  }
];

// Helper to look up a product by ID
function getProductById(id) {
  const numericId = parseInt(id, 10);
  return PRODUCTS.find(p => p.id === numericId) || null;
}

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.getProductById = getProductById;
}
