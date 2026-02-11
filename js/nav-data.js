/* ============================================
   CVHS Safety Website – Navigation Data
   Single source of truth for all navigation.
   Edit this file to add/remove/rename pages.
   ============================================ */

const NAV_DATA = [
  {
    name: "Home",
    slug: "index",
    folder: "",
    href: "/index.html",
    icon: "🏠",
    children: []
  },
  {
    name: "Power Tools",
    slug: "wood-power-tools",
    folder: "wood-power-tools",
    href: "/wood-power-tools/index.html",
    icon: "🪚",
    children: [
      { name: "Band Saws", slug: "band-saws" },
      { name: "Biscuit Joiner", slug: "biscuit-joiner" },
      { name: "Chain Saw", slug: "chain-saw" },
      { name: "Chop Saw", slug: "chop-saw" },
      { name: "Circular Saws", slug: "circular-saws" },
      { name: "Domino/Tenon Joiners", slug: "domino-tenon-joiners" },
      { name: "Drill Presses", slug: "drill-presses" },
      { name: "Drum Sander", slug: "drum-sander" },
      { name: "Dust Extractors", slug: "dust-extractors" },
      { name: "Hand Sanders", slug: "hand-sanders" },
      { name: "Jig Saw", slug: "jig-saw" },
      { name: "Jointers", slug: "jointers" },
      { name: "Mortising Machine", slug: "mortising-machine" },
      { name: "Multitool", slug: "multitool" },
      { name: "Planers", slug: "planers" },
      { name: "Routers", slug: "routers" },
      { name: "Sawmill (Wood-Mizer)", slug: "sawmill-wood-mizer" },
      { name: "Sawzalls", slug: "sawzalls" },
      { name: "Scroll Saws", slug: "scroll-saws" },
      { name: "Stationary Sanders", slug: "stationary-sanders" },
      { name: "Steam Box (for Bending)", slug: "steam-box" },
      { name: "Table Saws", slug: "table-saws" },
      { name: "Track Saws", slug: "track-saws" },
      { name: "Wood Lathes & Accessories", slug: "wood-lathes-accessories" }
    ]
  },
  {
    name: "Hand Tools",
    slug: "wood-hand-tools",
    folder: "wood-hand-tools",
    href: "/wood-hand-tools/index.html",
    icon: "🔨",
    children: [
      { name: "Card Scrapers", slug: "card-scrapers" },
      { name: "Digital Angle Gauge & Level", slug: "digital-angle-gauge-level" },
      { name: "Dowel Jigs", slug: "dowel-jigs" },
      { name: "Incra V120 Miter Gauge", slug: "incra-v120-miter-gauge" },
      { name: "Kreg Pocket Hole Jig", slug: "kreg-pocket-hole-jig" },
      { name: "Lie-Nielsen Hand Planes", slug: "lie-nielsen-hand-planes" },
      { name: "Rockler Portable Drill Guide & Vise", slug: "rockler-portable-drill-guide-vise" },
      { name: "Veritas Hand Planes", slug: "veritas-hand-planes" },
      { name: "Veritas Hand Saws", slug: "veritas-hand-saws" },
      { name: "Veritas Honing Guide", slug: "veritas-honing-guide" },
      { name: "Veritas Spokeshaves", slug: "veritas-spokeshaves" },
      { name: "Veritas Wheel Marking Gauges", slug: "veritas-wheel-marking-gauges" }
    ]
  },
  {
    name: "CNC & Digital",
    slug: "cnc",
    folder: "cnc",
    href: "/cnc/index.html",
    icon: "🖥️",
    children: [
      { name: "3D Scanner", slug: "3d-scanner" },
      { name: "Bambu 3D Printers", slug: "bambu-3d-printers" },
      { name: "CNC Metal Machining Mills", slug: "cnc-metal-machining-mills" },
      { name: "CNC Plasma Table", slug: "cnc-plasma-table" },
      { name: "Forest Scientific CNC Routers", slug: "forest-scientific-cnc-routers" },
      { name: "Laser Engravers", slug: "laser-engravers" },
      { name: "Shaper CNC Routers", slug: "shaper-cnc-routers" },
      { name: "Techno DaVinci Routers", slug: "techno-davinci-routers" },
      { name: "UV Color Printer", slug: "uv-color-printer" },
      { name: "Vertical Metal Mill", slug: "vertical-metal-mill" },
      { name: "Vinyl Cutters", slug: "vinyl-cutters" },
      { name: "Waterjet Cutter", slug: "waterjet-cutter" },
      { name: "Zortrax 3D Filament Printers", slug: "zortrax-3d-filament-printers" },
      { name: "Zortrax 3D Resin Printer", slug: "zortrax-3d-resin-printer" }
    ]
  },
  {
    name: "Software",
    slug: "software",
    folder: "software",
    href: "/software/index.html",
    icon: "💻",
    children: [
      { name: "Illustrator", slug: "illustrator" },
      { name: "Mastercam", slug: "mastercam" },
      { name: "Sheetcam", slug: "sheetcam" },
      { name: "Solidworks", slug: "solidworks" },
      { name: "V-Carve Pro", slug: "v-carve-pro" },
      { name: "VersaWorks", slug: "versaworks" }
    ]
  },
  {
    name: "Pneumatics",
    slug: "pneumatic",
    folder: "pneumatic",
    href: "/pneumatic/index.html",
    icon: "💨",
    children: [
      { name: "18 Ga. Brad Nailer", slug: "18-ga-brad-nailer" },
      { name: "Air Riveter", slug: "air-riveter" },
      { name: "Die Grinder (1/4\")", slug: "die-grinder" },
      { name: "Finish Nailers", slug: "finish-nailers" },
      { name: "Framing Nailers", slug: "framing-nailers" },
      { name: "Palm Nailer", slug: "palm-nailer" },
      { name: "Portable Air Compressor", slug: "portable-air-compressor" },
      { name: "Siding Nailer", slug: "siding-nailer" },
      { name: "Roofing Nailer", slug: "roofing-nailer" }
    ]
  },
  {
    name: "Maintenance",
    slug: "maintenance",
    folder: "maintenance",
    href: "/maintenance/index.html",
    icon: "🔧",
    children: [
      { name: "Cordless Drill / Impact Driver", slug: "cordless-drill-impact-driver" },
      { name: "Cordless Grease Gun", slug: "cordless-grease-gun" },
      { name: "Digital Clamp Multimeter", slug: "digital-clamp-multimeter" },
      { name: "Dremel", slug: "dremel" },
      { name: "Drum Dumper — Forklift Attachment", slug: "drum-dumper" },
      { name: "Dust Collector & Related Items", slug: "dust-collector" },
      { name: "Fiber Cement Shears (Power)", slug: "fiber-cement-shears" },
      { name: "Hammer Drill", slug: "hammer-drill" },
      { name: "Heat Gun", slug: "heat-gun" },
      { name: "Label Maker", slug: "label-maker" },
      { name: "Laser Level (Line & Point)", slug: "laser-level-line-point" },
      { name: "Laser Level (Rotating)", slug: "laser-level-rotating" },
      { name: "Moisture Meter", slug: "moisture-meter" },
      { name: "Multiscanner (Stud Finder)", slug: "multiscanner" },
      { name: "SLR Camera", slug: "slr-camera" },
      { name: "Sharpening Tools", slug: "sharpening-tools" },
      { name: "Battery Charger (6V/12V)", slug: "battery-charger" }
    ]
  },
  {
    name: "Automotive",
    slug: "autos",
    folder: "autos",
    href: "/autos/index.html",
    icon: "🚗",
    children: [
      { name: "Brake Lathe", slug: "brake-lathe" },
      { name: "Tire Changer", slug: "tire-changer" },
      { name: "Wheel Balancer", slug: "wheel-balancer" }
    ]
  },
  {
    name: "Metals",
    slug: "metals",
    folder: "metals",
    href: "/metals/index.html",
    icon: "⚙️",
    children: [
      { name: "Abrasive Cut-Off Saw", slug: "abrasive-cut-off-saw" },
      { name: "Band Saws", slug: "band-saws" },
      { name: "Drill Press", slug: "drill-press" },
      { name: "Iron Worker 50-Ton", slug: "iron-worker-50-ton" },
      { name: "Metal Lathes", slug: "metal-lathes" },
      { name: "Pedestal Arch & Ring Roller", slug: "pedestal-arch-ring-roller" },
      { name: "Pedestal Grinders", slug: "pedestal-grinders" },
      { name: "Plasma Cutter (Manual)", slug: "plasma-cutter-manual" },
      { name: "Powder Coating Oven", slug: "powder-coating-oven" },
      { name: "Universal Bender", slug: "universal-bender" },
      { name: "Vertical Metal Mills", slug: "vertical-metal-mills" }
    ]
  },
  {
    name: "Welding",
    slug: "welding",
    folder: "welding",
    href: "/welding/index.html",
    icon: "🔥",
    children: [
      { name: "GMAW Welders", slug: "gmaw-welders" },
      { name: "SMAW Welders", slug: "smaw-welders" },
      { name: "Plasma Cutter", slug: "plasma-cutter" },
      { name: "TIG Welders", slug: "tig-welders" }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.NAV_DATA = NAV_DATA;
}
