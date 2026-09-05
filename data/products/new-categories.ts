import type { Product } from "../products";

const amazon = (query: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=chhx2nun03-20`;

export const newCategoryProducts: Product[] = [
  {
    id: "apple-ipad-air-m3-11", slug: "apple-ipad-air-m3-11", name: "Apple iPad Air 11-inch (M3)", brand: "Apple",
    category: "Tablets", categoryId: "tablets", productType: "Premium tablet",
    shortDescription: "A thin, fast tablet built around Apple's M3 chip with strong accessory support for work, study, and creative use.",
    image: { src: "", alt: "Apple iPad Air 11-inch M3" }, editorialScore: 9.2, customerRating: 4.9, totalReviewCount: 4421,
    qualification: "top-pick", verdictLabel: "Outstanding",
    editorVerdict: "The iPad Air M3 balances laptop-class performance, a polished tablet ecosystem, and broad accessory support without reaching iPad Pro pricing.",
    bestFor: ["Students and professionals", "Creative work", "Long-term tablet buyers"],
    reviewScores: { design: 9.4, display: 9.1, performance: 9.6, battery: 9.0, software: 9.3, accessories: 9.4, value: 8.9 },
    specs: { display: "11-inch Liquid Retina", processor: "Apple M3", storage: "128GB and up", battery: "All-day use", connectivity: "Wi-Fi 6E; cellular options", accessories: "Apple Pencil Pro and Magic Keyboard support" },
    pros: ["Excellent performance", "Strong app ecosystem", "Broad accessory support"], cons: ["Accessories add significant cost", "Desktop-style workflows still have limits"],
    sources: [{ platform: "Apple", rating: 0, reviewCount: 0, url: "https://www.apple.com/ipad-air/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Apple iPad Air 11 M3") }],
  },
  {
    id: "apple-ipad-a16", slug: "apple-ipad-a16", name: "Apple iPad (A16)", brand: "Apple", category: "Tablets", categoryId: "tablets", productType: "Everyday tablet",
    shortDescription: "Apple's mainstream iPad offers a large display, simple software, and enough performance for school, streaming, and everyday tasks.", image: { src: "", alt: "Apple iPad A16" },
    editorialScore: 8.8, customerRating: 4.9, totalReviewCount: 7249, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "The standard iPad remains one of the easiest tablet recommendations for buyers who want a polished everyday experience at a more approachable price.",
    bestFor: ["Everyday use", "School and family use", "Streaming"], reviewScores: { design: 8.8, display: 8.7, performance: 8.9, battery: 8.9, software: 9.2, accessories: 8.6, value: 9.0 },
    specs: { display: "11-inch Liquid Retina", processor: "Apple A16", storage: "128GB and up", battery: "All-day use", connectivity: "Wi-Fi; cellular options", accessories: "Apple Pencil and keyboard support" },
    pros: ["Easy to use", "Strong tablet apps", "Good value in the iPad lineup"], cons: ["Display is not high refresh", "Accessory compatibility is less elegant than iPad Air"],
    sources: [{ platform: "Apple", rating: 0, reviewCount: 0, url: "https://www.apple.com/ipad-11/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Apple iPad A16") }],
  },
  {
    id: "samsung-galaxy-tab-s10-plus", slug: "samsung-galaxy-tab-s10-plus", name: "Samsung Galaxy Tab S10+", brand: "Samsung", category: "Tablets", categoryId: "tablets", productType: "Premium Android tablet",
    shortDescription: "A large AMOLED Android tablet with an included S Pen, multitasking tools, and a desktop-style DeX mode.", image: { src: "", alt: "Samsung Galaxy Tab S10 Plus" },
    editorialScore: 9.1, customerRating: 4.9, totalReviewCount: 281, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "Galaxy Tab S10+ is a strong premium Android choice for buyers who value a vivid display, pen input, and flexible multitasking.",
    bestFor: ["Android power users", "Note taking", "Media and multitasking"], reviewScores: { design: 9.2, display: 9.6, performance: 9.2, battery: 9.0, software: 9.1, accessories: 9.2, value: 8.7 },
    specs: { display: "12.4-inch Dynamic AMOLED 2X", processor: "MediaTek Dimensity 9300+", storage: "256GB and up", battery: "Large-capacity tablet battery", connectivity: "Wi-Fi; cellular options", accessories: "S Pen included; keyboard options" },
    pros: ["Excellent AMOLED display", "S Pen included", "Useful DeX multitasking"], cons: ["Premium pricing", "Some Android apps remain phone-oriented"],
    sources: [{ platform: "Samsung", rating: 0, reviewCount: 0, url: "https://www.samsung.com/us/tablets/galaxy-tab-s10/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Samsung Galaxy Tab S10 Plus") }],
  },
  {
    id: "samsung-galaxy-tab-s10-fe", slug: "samsung-galaxy-tab-s10-fe", name: "Samsung Galaxy Tab S10 FE", brand: "Samsung", category: "Tablets", categoryId: "tablets", productType: "Midrange Android tablet",
    shortDescription: "A practical Samsung tablet aimed at students and everyday users who want pen support and Galaxy ecosystem features for less than flagship models.", image: { src: "", alt: "Samsung Galaxy Tab S10 FE" },
    editorialScore: 8.6, customerRating: 4.9, totalReviewCount: 376, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "Galaxy Tab S10 FE is a sensible midrange option when S Pen support and Samsung software matter more than flagship-level performance.",
    bestFor: ["Students", "Note taking", "Midrange Android buyers"], reviewScores: { design: 8.7, display: 8.5, performance: 8.3, battery: 8.8, software: 8.9, accessories: 9.0, value: 8.8 },
    specs: { display: "Large high-resolution LCD", processor: "Samsung Exynos platform", storage: "128GB and up", battery: "All-day tablet use", connectivity: "Wi-Fi; cellular options", accessories: "S Pen included" },
    pros: ["S Pen included", "Good Samsung ecosystem integration", "Balanced everyday value"], cons: ["LCD rather than OLED", "Not designed for heavy workstation workloads"],
    sources: [{ platform: "Samsung", rating: 0, reviewCount: 0, url: "https://www.samsung.com/us/tablets/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Samsung Galaxy Tab S10 FE") }],
  },
  {
    id: "oneplus-pad-2", slug: "oneplus-pad-2", name: "OnePlus Pad 2", brand: "OnePlus", category: "Tablets", categoryId: "tablets", productType: "Performance Android tablet",
    shortDescription: "A fast Android tablet with a high-refresh display and strong hardware value for entertainment, multitasking, and light productivity.", image: { src: "", alt: "OnePlus Pad 2" },
    editorialScore: 8.7, customerRating: 4.6, totalReviewCount: 2032, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "OnePlus Pad 2 stands out for performance and display smoothness at a price that often undercuts premium Apple and Samsung alternatives.",
    bestFor: ["Performance value", "Media consumption", "Android users"], reviewScores: { design: 8.8, display: 9.0, performance: 9.2, battery: 8.8, software: 8.5, accessories: 8.3, value: 9.1 },
    specs: { display: "12.1-inch high-refresh LCD", processor: "Snapdragon 8 Gen 3", storage: "256GB", battery: "Large-capacity battery with fast charging", connectivity: "Wi-Fi", accessories: "Keyboard and stylus options" },
    pros: ["Very strong performance", "Smooth display", "Competitive value"], cons: ["Tablet app ecosystem trails iPadOS", "Accessories may be sold separately"],
    sources: [{ platform: "OnePlus", rating: 0, reviewCount: 0, url: "https://www.oneplus.com/us/oneplus-pad-2", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("OnePlus Pad 2") }],
  },
  {
    id: "lenovo-tab-plus", slug: "lenovo-tab-plus", name: "Lenovo Tab Plus", brand: "Lenovo", category: "Tablets", categoryId: "tablets", productType: "Entertainment tablet",
    shortDescription: "A media-focused Android tablet with unusually strong built-in speakers and a practical integrated kickstand.", image: { src: "", alt: "Lenovo Tab Plus" },
    editorialScore: 8.2, customerRating: 4.5, totalReviewCount: 240, qualification: "qualified", verdictLabel: "Very Good", editorVerdict: "Lenovo Tab Plus is a compelling entertainment-first tablet for buyers who prioritize speakers, streaming, and hands-free viewing over raw performance.",
    bestFor: ["Streaming", "Kitchen and home use", "Speaker-focused buyers"], reviewScores: { design: 8.3, display: 8.2, performance: 7.8, battery: 8.4, software: 8.0, accessories: 7.9, value: 8.7 },
    specs: { display: "11.5-inch 2K LCD", processor: "MediaTek Helio G99", storage: "Expandable storage options", battery: "Large-capacity battery", connectivity: "Wi-Fi", accessories: "Integrated kickstand" },
    pros: ["Excellent built-in speakers", "Useful kickstand", "Good entertainment value"], cons: ["Midrange performance", "Not aimed at demanding creative workflows"],
    sources: [{ platform: "Lenovo", rating: 0, reviewCount: 0, url: "https://www.lenovo.com/us/en/c/tablets/android-tablets/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Lenovo Tab Plus") }],
  },

  {
    id: "lg-c4-oled-55", slug: "lg-c4-oled-55", name: "LG C4 OLED 55-inch", brand: "LG", category: "TVs", categoryId: "tvs", productType: "OLED TV",
    shortDescription: "A versatile OLED television with excellent contrast, strong gaming support, and broad HDR compatibility.", image: { src: "", alt: "LG C4 OLED 55-inch TV" },
    editorialScore: 9.4, customerRating: 4.8, totalReviewCount: 557, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "LG C4 remains an excellent all-round OLED for movies and gaming thanks to deep contrast, four HDMI 2.1 inputs, and a mature smart-TV platform.",
    bestFor: ["Movies and streaming", "Console gaming", "Dark-room viewing"], reviewScores: { design: 9.2, pictureQuality: 9.6, hdr: 9.2, motion: 9.3, gaming: 9.7, smartTv: 9.1, sound: 8.2, value: 9.1 },
    specs: { display: "55-inch OLED", resolution: "4K", refreshRate: "Up to 144Hz", hdr: "Dolby Vision, HDR10, HLG", hdmi: "4 HDMI 2.1 ports", platform: "webOS" },
    pros: ["Excellent OLED contrast", "Outstanding gaming features", "Four HDMI 2.1 ports"], cons: ["Not the brightest premium OLED", "Built-in audio is only average"],
    sources: [{ platform: "LG", rating: 0, reviewCount: 0, url: "https://www.lg.com/us/tvs/lg-oled55c4pua-oled-4k-tv", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("LG C4 OLED 55") }],
  },
  {
    id: "samsung-s90d-oled-55", slug: "samsung-s90d-oled-55", name: "Samsung S90D OLED 55-inch", brand: "Samsung", category: "TVs", categoryId: "tvs", productType: "OLED TV",
    shortDescription: "A bright, gaming-friendly OLED with punchy HDR performance and Samsung's responsive Tizen interface.", image: { src: "", alt: "Samsung S90D OLED 55-inch TV" },
    editorialScore: 9.3, customerRating: 4.7, totalReviewCount: 594, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "Samsung S90D delivers impressive OLED picture quality and gaming performance, especially for buyers who do not require Dolby Vision.",
    bestFor: ["Gaming", "Bright HDR highlights", "Samsung ecosystem users"], reviewScores: { design: 9.2, pictureQuality: 9.5, hdr: 9.3, motion: 9.3, gaming: 9.7, smartTv: 9.0, sound: 8.3, value: 9.0 },
    specs: { display: "55-inch OLED", resolution: "4K", refreshRate: "Up to 144Hz", hdr: "HDR10, HDR10+, HLG", hdmi: "4 HDMI ports", platform: "Tizen" },
    pros: ["Bright OLED image", "Excellent gaming responsiveness", "Strong color performance"], cons: ["No Dolby Vision", "Panel technology can vary by size and region"],
    sources: [{ platform: "Samsung", rating: 0, reviewCount: 0, url: "https://www.samsung.com/us/televisions-home-theater/tvs/oled-tvs/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Samsung S90D OLED 55") }],
  },
  {
    id: "sony-bravia-8-55", slug: "sony-bravia-8-55", name: "Sony BRAVIA 8 OLED 55-inch", brand: "Sony", category: "TVs", categoryId: "tvs", productType: "OLED TV",
    shortDescription: "A cinematic OLED television emphasizing image processing, motion handling, and Google TV integration.", image: { src: "", alt: "Sony BRAVIA 8 OLED 55-inch TV" },
    editorialScore: 9.1, customerRating: 4.7, totalReviewCount: 633, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "BRAVIA 8 is a refined movie-first OLED with excellent processing and motion, though gamers get fewer HDMI 2.1 inputs than on LG alternatives.",
    bestFor: ["Movies", "Upscaling lower-quality content", "Google TV users"], reviewScores: { design: 9.1, pictureQuality: 9.5, hdr: 9.0, motion: 9.6, gaming: 8.8, smartTv: 9.3, sound: 9.0, value: 8.5 },
    specs: { display: "55-inch OLED", resolution: "4K", refreshRate: "120Hz", hdr: "Dolby Vision, HDR10, HLG", hdmi: "4 HDMI; 2 HDMI 2.1", platform: "Google TV" },
    pros: ["Excellent image processing", "Natural motion handling", "Strong integrated audio"], cons: ["Only two HDMI 2.1 ports", "Usually priced above value-focused OLEDs"],
    sources: [{ platform: "Sony", rating: 0, reviewCount: 0, url: "https://electronics.sony.com/tv-video/televisions/all-tvs/p/k55xr80", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Sony BRAVIA 8 55 OLED") }],
  },
  {
    id: "tcl-qm8-65", slug: "tcl-qm8-65", name: "TCL QM8 65-inch Mini-LED", brand: "TCL", category: "TVs", categoryId: "tvs", productType: "Mini-LED TV",
    shortDescription: "A high-brightness mini-LED TV aimed at buyers who want strong HDR impact and a large screen without premium OLED pricing.", image: { src: "", alt: "TCL QM8 65-inch Mini-LED TV" },
    editorialScore: 8.9, customerRating: 4.5, totalReviewCount: 153, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "TCL QM8 is a strong bright-room and big-screen value option, offering high HDR brightness and gaming features at aggressive pricing.",
    bestFor: ["Bright rooms", "Big-screen value", "Gaming"], reviewScores: { design: 8.6, pictureQuality: 9.0, hdr: 9.4, motion: 8.7, gaming: 9.1, smartTv: 8.9, sound: 8.2, value: 9.4 },
    specs: { display: "65-inch Mini-LED", resolution: "4K", refreshRate: "High-refresh gaming support", hdr: "Dolby Vision, HDR10+", hdmi: "HDMI 2.1 support", platform: "Google TV" },
    pros: ["Very high brightness", "Strong value at larger sizes", "Good gaming feature set"], cons: ["Blooming can still appear around bright objects", "Processing is less refined than premium Sony models"],
    sources: [{ platform: "TCL", rating: 0, reviewCount: 0, url: "https://www.tcl.com/us/en/products/home-theater/qm8-class", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("TCL QM8 65 Mini LED") }],
  },
  {
    id: "hisense-u8n-65", slug: "hisense-u8n-65", name: "Hisense U8N 65-inch Mini-LED", brand: "Hisense", category: "TVs", categoryId: "tvs", productType: "Mini-LED TV",
    shortDescription: "A bright mini-LED television with aggressive HDR performance and a broad gaming feature set for the price.", image: { src: "", alt: "Hisense U8N 65-inch Mini-LED TV" },
    editorialScore: 8.8, customerRating: 4.5, totalReviewCount: 495, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "Hisense U8N competes hard on brightness and value, making it appealing for bright rooms and HDR-heavy viewing where OLED is less practical.",
    bestFor: ["Bright rooms", "HDR value", "Sports and gaming"], reviewScores: { design: 8.5, pictureQuality: 8.9, hdr: 9.4, motion: 8.6, gaming: 9.0, smartTv: 8.8, sound: 8.3, value: 9.3 },
    specs: { display: "65-inch Mini-LED", resolution: "4K", refreshRate: "High-refresh gaming support", hdr: "Dolby Vision, HDR10+", hdmi: "HDMI 2.1 support", platform: "Google TV" },
    pros: ["Excellent brightness for the money", "Strong HDR formats", "Good gaming support"], cons: ["Image processing can be inconsistent", "Viewing angles are narrower than OLED"],
    sources: [{ platform: "Hisense", rating: 0, reviewCount: 0, url: "https://www.hisense-usa.com/televisions", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Hisense U8N 65 Mini LED") }],
  },
  {
    id: "roku-pro-series-55", slug: "roku-pro-series-55", name: "Roku Pro Series 55-inch", brand: "Roku", category: "TVs", categoryId: "tvs", productType: "Mini-LED TV",
    shortDescription: "A user-friendly mini-LED TV built around Roku's simple streaming interface and a practical feature set for everyday households.", image: { src: "", alt: "Roku Pro Series 55-inch TV" },
    editorialScore: 8.4, customerRating: 4.8, totalReviewCount: 109, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "Roku Pro Series is an easy recommendation for buyers who prioritize a straightforward smart-TV experience and solid picture quality over enthusiast-level controls.",
    bestFor: ["Easy streaming", "Family rooms", "Roku users"], reviewScores: { design: 8.4, pictureQuality: 8.5, hdr: 8.5, motion: 8.2, gaming: 8.3, smartTv: 9.3, sound: 8.3, value: 8.8 },
    specs: { display: "55-inch Mini-LED", resolution: "4K", refreshRate: "120Hz-class", hdr: "Dolby Vision and HDR support", hdmi: "Modern HDMI connectivity", platform: "Roku TV" },
    pros: ["Very easy smart-TV interface", "Good everyday picture quality", "Strong convenience features"], cons: ["Less advanced calibration than enthusiast TVs", "Peak brightness trails top mini-LED competitors"],
    sources: [{ platform: "Roku", rating: 0, reviewCount: 0, url: "https://www.roku.com/products/roku-tv/roku-made-tvs", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Roku Pro Series 55 TV") }],
  },

  {
    id: "sony-a6700", slug: "sony-a6700", name: "Sony Alpha a6700", brand: "Sony", category: "Cameras", categoryId: "cameras", productType: "APS-C mirrorless camera",
    shortDescription: "A compact enthusiast mirrorless camera with strong autofocus, excellent subject recognition, and capable 4K video tools.", image: { src: "", alt: "Sony Alpha a6700 camera" },
    editorialScore: 9.3, customerRating: 4.8, totalReviewCount: 208, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "Sony a6700 is one of the most complete APS-C hybrids for buyers who need excellent autofocus, strong stills, and serious video capability in a compact body.",
    bestFor: ["Hybrid photo and video", "Travel", "Fast autofocus"], reviewScores: { design: 9.0, imageQuality: 9.2, autofocus: 9.7, video: 9.4, stabilization: 9.1, handling: 8.9, battery: 8.8, value: 9.0 },
    specs: { sensor: "26MP APS-C", mount: "Sony E", video: "4K high-frame-rate options", stabilization: "5-axis in-body stabilization", viewfinder: "Electronic viewfinder", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Excellent autofocus", "Strong hybrid video features", "Compact lens ecosystem"], cons: ["Single card slot", "Menus and controls can feel dense"],
    sources: [{ platform: "Sony", rating: 0, reviewCount: 0, url: "https://electronics.sony.com/imaging/interchangeable-lens-cameras/aps-c/p/ilce6700-b", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Sony a6700") }],
  },
  {
    id: "canon-eos-r10", slug: "canon-eos-r10", name: "Canon EOS R10", brand: "Canon", category: "Cameras", categoryId: "cameras", productType: "APS-C mirrorless camera",
    shortDescription: "A lightweight interchangeable-lens camera with approachable controls and fast subject-tracking autofocus for new enthusiasts.", image: { src: "", alt: "Canon EOS R10 camera" },
    editorialScore: 8.8, customerRating: 4.9, totalReviewCount: 22, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "EOS R10 is a friendly step-up camera for beginners who want dependable autofocus and fast operation without carrying a large body.",
    bestFor: ["Beginners", "Family and travel photography", "Action on a budget"], reviewScores: { design: 8.8, imageQuality: 8.8, autofocus: 9.2, video: 8.5, stabilization: 7.8, handling: 9.0, battery: 8.0, value: 9.0 },
    specs: { sensor: "24MP APS-C", mount: "Canon RF", video: "4K video", stabilization: "Lens-based stabilization where supported", viewfinder: "Electronic viewfinder", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Easy controls", "Fast autofocus", "Lightweight body"], cons: ["No in-body stabilization", "RF-S lens selection is still developing"],
    sources: [{ platform: "Canon", rating: 0, reviewCount: 0, url: "https://www.usa.canon.com/shop/p/eos-r10", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Canon EOS R10") }],
  },
  {
    id: "fujifilm-x-s20", slug: "fujifilm-x-s20", name: "Fujifilm X-S20", brand: "Fujifilm", category: "Cameras", categoryId: "cameras", productType: "APS-C mirrorless camera",
    shortDescription: "A compact hybrid camera combining Fujifilm color profiles, in-body stabilization, and creator-friendly video features.", image: { src: "", alt: "Fujifilm X-S20 camera" },
    editorialScore: 9.1, customerRating: 4.5, totalReviewCount: 11, qualification: "top-pick", verdictLabel: "Outstanding", editorVerdict: "X-S20 is an unusually versatile travel and creator camera, blending strong stills, stabilized video, and Fujifilm's popular color science.",
    bestFor: ["Travel creators", "Hybrid shooting", "Fujifilm film simulations"], reviewScores: { design: 9.1, imageQuality: 9.2, autofocus: 8.8, video: 9.2, stabilization: 9.2, handling: 9.0, battery: 9.0, value: 8.9 },
    specs: { sensor: "26MP APS-C", mount: "Fujifilm X", video: "6K-class recording options", stabilization: "In-body stabilization", viewfinder: "Electronic viewfinder", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Excellent image quality", "In-body stabilization", "Strong battery for its class"], cons: ["Autofocus trails Sony's best", "Single card slot"],
    sources: [{ platform: "Fujifilm", rating: 0, reviewCount: 0, url: "https://fujifilm-x.com/en-us/products/cameras/x-s20/", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Fujifilm X-S20") }],
  },
  {
    id: "nikon-z50ii", slug: "nikon-z50ii", name: "Nikon Z50II", brand: "Nikon", category: "Cameras", categoryId: "cameras", productType: "APS-C mirrorless camera",
    shortDescription: "A compact Nikon mirrorless body with improved autofocus and image processing for enthusiasts, travel, and family photography.", image: { src: "", alt: "Nikon Z50II camera" },
    editorialScore: 8.9, customerRating: 5, totalReviewCount: 6, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "Z50II is a balanced Nikon APS-C option with strong subject detection and familiar controls, especially attractive to buyers already invested in Nikon lenses.",
    bestFor: ["Nikon users", "Travel", "Family and enthusiast photography"], reviewScores: { design: 8.9, imageQuality: 9.0, autofocus: 9.1, video: 8.8, stabilization: 7.9, handling: 9.2, battery: 8.2, value: 8.8 },
    specs: { sensor: "20.9MP APS-C", mount: "Nikon Z", video: "4K video", stabilization: "Lens-based stabilization where supported", viewfinder: "Electronic viewfinder", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Excellent ergonomics", "Strong autofocus improvements", "Access to Nikon Z lenses"], cons: ["No in-body stabilization", "APS-C native lens range is smaller than some rivals"],
    sources: [{ platform: "Nikon", rating: 0, reviewCount: 0, url: "https://www.nikonusa.com/p/z50ii/1788/overview", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Nikon Z50II") }],
  },
  {
    id: "sony-zv-e10-ii", slug: "sony-zv-e10-ii", name: "Sony ZV-E10 II", brand: "Sony", category: "Cameras", categoryId: "cameras", productType: "Creator mirrorless camera",
    shortDescription: "A creator-focused APS-C camera with a flip screen, strong autofocus, and advanced 4K video in a small body.", image: { src: "", alt: "Sony ZV-E10 II camera" },
    editorialScore: 8.8, customerRating: 4.7, totalReviewCount: 200, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "ZV-E10 II is a strong compact video-first camera for creators who prioritize autofocus, portability, and interchangeable lenses over a viewfinder.",
    bestFor: ["YouTube and social video", "Travel creators", "Beginner video shooters"], reviewScores: { design: 8.7, imageQuality: 8.8, autofocus: 9.5, video: 9.2, stabilization: 8.0, handling: 8.5, battery: 8.7, value: 8.9 },
    specs: { sensor: "26MP APS-C", mount: "Sony E", video: "4K high-frame-rate options", stabilization: "Electronic and lens stabilization", viewfinder: "None", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Excellent video autofocus", "Compact and light", "Large E-mount lens selection"], cons: ["No viewfinder", "No in-body stabilization"],
    sources: [{ platform: "Sony", rating: 0, reviewCount: 0, url: "https://electronics.sony.com/imaging/interchangeable-lens-cameras/aps-c/p/zve10m2-b", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Sony ZV-E10 II") }],
  },
  {
    id: "canon-eos-r50", slug: "canon-eos-r50", name: "Canon EOS R50", brand: "Canon", category: "Cameras", categoryId: "cameras", productType: "Entry mirrorless camera",
    shortDescription: "A small, approachable mirrorless camera with reliable autofocus and a fully articulating screen for photos and casual video.", image: { src: "", alt: "Canon EOS R50 camera" },
    editorialScore: 8.5, customerRating: 4.9, totalReviewCount: 982, qualification: "strong-pick", verdictLabel: "Excellent", editorVerdict: "EOS R50 is an appealing first interchangeable-lens camera for families and new creators who want Canon autofocus and simple controls.",
    bestFor: ["First camera buyers", "Family photography", "Casual content creation"], reviewScores: { design: 8.6, imageQuality: 8.6, autofocus: 9.0, video: 8.5, stabilization: 7.7, handling: 8.7, battery: 7.9, value: 9.1 },
    specs: { sensor: "24MP APS-C", mount: "Canon RF", video: "4K video", stabilization: "Lens-based stabilization where supported", viewfinder: "Electronic viewfinder", connectivity: "Wi-Fi, Bluetooth, USB-C" },
    pros: ["Very beginner friendly", "Dependable autofocus", "Lightweight"], cons: ["No in-body stabilization", "Small controls may feel cramped"],
    sources: [{ platform: "Canon", rating: 0, reviewCount: 0, url: "https://www.usa.canon.com/shop/p/eos-r50", checkedAt: "2026-08-29" }], affiliateLinks: [{ retailer: "Amazon", url: amazon("Canon EOS R50") }],
  },

  {
    "id": "apple-ipad-pro-m5-11",
    "slug": "apple-ipad-pro-m5-11",
    "name": "Apple iPad Pro 11-inch (M5)",
    "brand": "Apple",
    "category": "Tablets",
    "categoryId": "tablets",
    "productType": "Premium pro tablet",
    "shortDescription": "Apple's M5 iPad Pro pairs a tandem OLED display with workstation-class performance in an exceptionally thin tablet.",
    "image": {
      "src": "",
      "alt": "Apple iPad Pro 11-inch (M5)"
    },
    "editorialScore": 9.6,
    "customerRating": 4.9,
    "totalReviewCount": 550,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "Apple's M5 iPad Pro pairs a tandem OLED display with workstation-class performance in an exceptionally thin tablet.",
    "bestFor": [
      "Creative professionals",
      "High-end tablet workflows"
    ],
    "reviewScores": {
      "design": 9.4,
      "display": 9.6,
      "performance": 9.8,
      "battery": 9.4,
      "software": 9.6,
      "accessories": 9.8,
      "value": 9.4
    },
    "specs": {
      "display": "11-inch Ultra Retina XDR OLED",
      "processor": "Apple M5",
      "storage": "256GB and up",
      "connectivity": "Wi-Fi 7; cellular options",
      "accessories": "Apple Pencil Pro and Magic Keyboard support"
    },
    "pros": [
      "Exceptional OLED display",
      "Class-leading performance"
    ],
    "cons": [
      "Expensive",
      "Accessories cost extra"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.9,
        "reviewCount": 550,
        "url": "https://www.bestbuy.com/product/6586868/6586868",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Apple+iPad+Pro+11-inch+%28M5%29&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "apple-ipad-mini-a17-pro",
    "slug": "apple-ipad-mini-a17-pro",
    "name": "Apple iPad mini (A17 Pro)",
    "brand": "Apple",
    "category": "Tablets",
    "categoryId": "tablets",
    "productType": "Compact tablet",
    "shortDescription": "A compact premium tablet with strong performance, excellent portability, and Apple Pencil Pro support.",
    "image": {
      "src": "",
      "alt": "Apple iPad mini (A17 Pro)"
    },
    "editorialScore": 9,
    "customerRating": 4.8,
    "totalReviewCount": 695,
    "qualification": "strong-pick",
    "verdictLabel": "Excellent",
    "editorVerdict": "A compact premium tablet with strong performance, excellent portability, and Apple Pencil Pro support.",
    "bestFor": [
      "Travel",
      "Reading and notes"
    ],
    "reviewScores": {
      "design": 8.8,
      "display": 9,
      "performance": 9.2,
      "battery": 8.8,
      "software": 9,
      "accessories": 9.2,
      "value": 8.8
    },
    "specs": {
      "display": "8.3-inch Liquid Retina",
      "processor": "A17 Pro",
      "storage": "128GB and up",
      "connectivity": "Wi-Fi 6E; cellular options",
      "accessories": "Apple Pencil Pro support"
    },
    "pros": [
      "Highly portable",
      "Fast performance"
    ],
    "cons": [
      "Small screen for multitasking",
      "Premium price for size"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.8,
        "reviewCount": 695,
        "url": "https://www.bestbuy.com/product/apple-ipad-mini-a17-pro-chip-built-for-apple-intelligence-wi-fi-256gb-space-gray/6578257",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Apple+iPad+mini+%28A17+Pro%29&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "samsung-galaxy-tab-s11",
    "slug": "samsung-galaxy-tab-s11",
    "name": "Samsung Galaxy Tab S11",
    "brand": "Samsung",
    "category": "Tablets",
    "categoryId": "tablets",
    "productType": "Premium Android tablet",
    "shortDescription": "Samsung's compact flagship tablet combines an AMOLED display, S Pen support, and DeX productivity features.",
    "image": {
      "src": "",
      "alt": "Samsung Galaxy Tab S11"
    },
    "editorialScore": 9.3,
    "customerRating": 4.8,
    "totalReviewCount": 101,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "Samsung's compact flagship tablet combines an AMOLED display, S Pen support, and DeX productivity features.",
    "bestFor": [
      "Android productivity",
      "Note taking"
    ],
    "reviewScores": {
      "design": 9.1,
      "display": 9.3,
      "performance": 9.5,
      "battery": 9.1,
      "software": 9.3,
      "accessories": 9.5,
      "value": 9.1
    },
    "specs": {
      "display": "11-inch Dynamic AMOLED 2X",
      "processor": "Flagship MediaTek platform",
      "storage": "128GB and up",
      "connectivity": "Wi-Fi",
      "accessories": "S Pen included"
    },
    "pros": [
      "Excellent AMOLED display",
      "S Pen included"
    ],
    "cons": [
      "Premium pricing",
      "Android tablet apps vary"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.8,
        "reviewCount": 101,
        "url": "https://www.bestbuy.com/product/samsung-galaxy-tab-s11-11-128gb-wi-fi-with-s-pen-gray/JJGRF39WLC",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Samsung+Galaxy+Tab+S11&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "oneplus-pad-3",
    "slug": "oneplus-pad-3",
    "name": "OnePlus Pad 3",
    "brand": "OnePlus",
    "category": "Tablets",
    "categoryId": "tablets",
    "productType": "Performance Android tablet",
    "shortDescription": "A fast Android tablet centered on a large 144Hz display, Snapdragon 8 Elite performance, and long battery life.",
    "image": {
      "src": "",
      "alt": "OnePlus Pad 3"
    },
    "editorialScore": 9.2,
    "customerRating": 4.5,
    "totalReviewCount": 0,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "A fast Android tablet centered on a large 144Hz display, Snapdragon 8 Elite performance, and long battery life.",
    "bestFor": [
      "Android power users",
      "Media and multitasking"
    ],
    "reviewScores": {
      "design": 9,
      "display": 9.2,
      "performance": 9.4,
      "battery": 9,
      "software": 9.2,
      "accessories": 9.4,
      "value": 9
    },
    "specs": {
      "display": "13.2-inch 144Hz",
      "processor": "Snapdragon 8 Elite",
      "storage": "256GB and up",
      "connectivity": "Wi-Fi",
      "accessories": "Keyboard and stylus options"
    },
    "pros": [
      "Fast performance",
      "Large high-refresh display"
    ],
    "cons": [
      "Large footprint",
      "Accessories sold separately"
    ],
    "sources": [
      {
        "platform": "TechRadar",
        "rating": 4.5,
        "reviewCount": 0,
        "url": "https://www.techradar.com/news/mobile-computing/tablets/15-best-android-tablets-in-the-world-905504",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=OnePlus+Pad+3&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "lg-c6-oled-55",
    "slug": "lg-c6-oled-55",
    "name": "LG C6 OLED 55-inch",
    "brand": "LG",
    "category": "TVs",
    "categoryId": "tvs",
    "productType": "OLED TV",
    "shortDescription": "LG's 2026 C-series OLED delivers deep blacks, strong HDR, wide viewing angles, and excellent gaming support.",
    "image": {
      "src": "",
      "alt": "LG C6 OLED 55-inch"
    },
    "editorialScore": 9.5,
    "customerRating": 4.8,
    "totalReviewCount": 67,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "LG's 2026 C-series OLED delivers deep blacks, strong HDR, wide viewing angles, and excellent gaming support.",
    "bestFor": [
      "Movies",
      "Console and PC gaming"
    ],
    "reviewScores": {
      "design": 9.3,
      "pictureQuality": 9.5,
      "hdr": 9.7,
      "motion": 9.3,
      "gaming": 9.5,
      "smartTv": 9.7,
      "sound": 9.3,
      "value": 9.5
    },
    "specs": {
      "display": "55-inch OLED evo",
      "resolution": "4K",
      "refreshRate": "Up to 165Hz PC",
      "platform": "webOS",
      "hdmi": "4x HDMI 2.1"
    },
    "pros": [
      "Excellent OLED contrast",
      "Strong gaming features"
    ],
    "cons": [
      "OLED burn-in remains a consideration",
      "Remote design is polarizing"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.8,
        "reviewCount": 67,
        "url": "https://www.bestbuy.com/product/lg-55-class-c6-series-oled-evo-ai-4k-smart-webos-tv-2026/JJ8VPZKKYF",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=LG+C6+OLED+55-inch&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "samsung-s95h-oled-55",
    "slug": "samsung-s95h-oled-55",
    "name": "Samsung S95H OLED 55-inch",
    "brand": "Samsung",
    "category": "TVs",
    "categoryId": "tvs",
    "productType": "QD-OLED TV",
    "shortDescription": "Samsung's flagship 2026 OLED combines very high brightness, glare resistance, vivid color, and 165Hz gaming support.",
    "image": {
      "src": "",
      "alt": "Samsung S95H OLED 55-inch"
    },
    "editorialScore": 9.6,
    "customerRating": 5,
    "totalReviewCount": 9,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "Samsung's flagship 2026 OLED combines very high brightness, glare resistance, vivid color, and 165Hz gaming support.",
    "bestFor": [
      "Bright rooms",
      "Premium gaming"
    ],
    "reviewScores": {
      "design": 9.4,
      "pictureQuality": 9.6,
      "hdr": 9.8,
      "motion": 9.4,
      "gaming": 9.6,
      "smartTv": 9.8,
      "sound": 9.4,
      "value": 9.6
    },
    "specs": {
      "display": "55-inch OLED",
      "resolution": "4K",
      "refreshRate": "Up to 165Hz",
      "platform": "Tizen",
      "hdr": "OLED HDR Pro"
    },
    "pros": [
      "Excellent brightness and color",
      "Superb reflection handling"
    ],
    "cons": [
      "No Dolby Vision",
      "Premium price"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 5,
        "reviewCount": 9,
        "url": "https://www.bestbuy.com/product/samsung-55-class-s95h-oled-4k-glare-free-tv-with-samsungvisionai-2026/6671661",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Samsung+S95H+OLED+55-inch&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "sony-bravia-9-ii-65",
    "slug": "sony-bravia-9-ii-65",
    "name": "Sony BRAVIA 9 II 65-inch",
    "brand": "Sony",
    "category": "TVs",
    "categoryId": "tvs",
    "productType": "RGB LED TV",
    "shortDescription": "Sony's premium RGB LED television emphasizes exceptional brightness, color control, processing, and anti-glare performance.",
    "image": {
      "src": "",
      "alt": "Sony BRAVIA 9 II 65-inch"
    },
    "editorialScore": 9.5,
    "customerRating": 4.8,
    "totalReviewCount": 20,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "Sony's premium RGB LED television emphasizes exceptional brightness, color control, processing, and anti-glare performance.",
    "bestFor": [
      "Bright-room movies",
      "Premium home theater"
    ],
    "reviewScores": {
      "design": 9.3,
      "pictureQuality": 9.5,
      "hdr": 9.7,
      "motion": 9.3,
      "gaming": 9.5,
      "smartTv": 9.7,
      "sound": 9.3,
      "value": 9.5
    },
    "specs": {
      "display": "65-inch True RGB LED",
      "resolution": "4K",
      "platform": "Google TV",
      "hdr": "HDR with Dolby Vision",
      "gaming": "4K 120Hz support"
    },
    "pros": [
      "Excellent picture processing",
      "Strong anti-glare screen"
    ],
    "cons": [
      "Very expensive",
      "Limited HDMI 2.1 ports"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.8,
        "reviewCount": 20,
        "url": "https://www.bestbuy.com/product/sony-65-class-bravia-9-ii-true-rgb-4k-hdr-google-tv-with-gemini-and-anti-glare-screen/J7XSRH54TJ",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Sony+BRAVIA+9+II+65-inch&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "hisense-u7sg-65",
    "slug": "hisense-u7sg-65",
    "name": "Hisense U7SG 65-inch",
    "brand": "Hisense",
    "category": "TVs",
    "categoryId": "tvs",
    "productType": "Mini-LED TV",
    "shortDescription": "A high-value 2026 Mini-LED TV with strong brightness, anti-glare performance, and a native high-refresh gaming panel.",
    "image": {
      "src": "",
      "alt": "Hisense U7SG 65-inch"
    },
    "editorialScore": 9,
    "customerRating": 4.9,
    "totalReviewCount": 60,
    "qualification": "strong-pick",
    "verdictLabel": "Excellent",
    "editorVerdict": "A high-value 2026 Mini-LED TV with strong brightness, anti-glare performance, and a native high-refresh gaming panel.",
    "bestFor": [
      "Bright rooms",
      "Value-focused gaming"
    ],
    "reviewScores": {
      "design": 8.8,
      "pictureQuality": 9,
      "hdr": 9.2,
      "motion": 8.8,
      "gaming": 9,
      "smartTv": 9.2,
      "sound": 8.8,
      "value": 9
    },
    "specs": {
      "display": "65-inch Mini-LED QLED",
      "resolution": "4K",
      "refreshRate": "Native 165Hz",
      "platform": "Google TV",
      "hdr": "Dolby Vision and HDR"
    },
    "pros": [
      "Very bright picture",
      "Strong value"
    ],
    "cons": [
      "Narrower viewing angles",
      "Processing trails premium brands"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.9,
        "reviewCount": 60,
        "url": "https://www.bestbuy.com/product/hisense-65-class-u7-series-miniled-qled-uhd-4k-hdr-smart-google-tv-2026/J3Z9Z42HT2",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Hisense+U7SG+65-inch&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "sony-alpha-a7-v",
    "slug": "sony-alpha-a7-v",
    "name": "Sony Alpha a7 V",
    "brand": "Sony",
    "category": "Cameras",
    "categoryId": "cameras",
    "productType": "Full-frame mirrorless camera",
    "shortDescription": "A 33MP full-frame hybrid camera with advanced subject recognition, fast shooting, stabilization, and strong 4K video.",
    "image": {
      "src": "",
      "alt": "Sony Alpha a7 V"
    },
    "editorialScore": 9.6,
    "customerRating": 4.9,
    "totalReviewCount": 79,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "A 33MP full-frame hybrid camera with advanced subject recognition, fast shooting, stabilization, and strong 4K video.",
    "bestFor": [
      "Hybrid photo/video",
      "Action and events"
    ],
    "reviewScores": {
      "design": 9.4,
      "imageQuality": 9.6,
      "autofocus": 9.8,
      "video": 9.4,
      "stabilization": 9.6,
      "handling": 9.8,
      "battery": 9.4,
      "value": 9.6
    },
    "specs": {
      "sensor": "33MP full-frame partially stacked CMOS",
      "mount": "Sony E",
      "stabilization": "5-axis IBIS",
      "video": "4K up to 120p with crop",
      "burst": "Up to 30 fps"
    },
    "pros": [
      "Excellent autofocus",
      "Strong image quality"
    ],
    "cons": [
      "Premium price",
      "Some video modes crop"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.9,
        "reviewCount": 79,
        "url": "https://www.bestbuy.com/product/sony-alpha-7-v-black/J7XSRH5K9S",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Sony+Alpha+a7+V&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "nikon-z5ii",
    "slug": "nikon-z5ii",
    "name": "Nikon Z5II",
    "brand": "Nikon",
    "category": "Cameras",
    "categoryId": "cameras",
    "productType": "Full-frame mirrorless camera",
    "shortDescription": "A well-rounded full-frame camera with Nikon's latest autofocus, in-body stabilization, strong stills, and capable video.",
    "image": {
      "src": "",
      "alt": "Nikon Z5II"
    },
    "editorialScore": 9.2,
    "customerRating": 4.55,
    "totalReviewCount": 0,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "A well-rounded full-frame camera with Nikon's latest autofocus, in-body stabilization, strong stills, and capable video.",
    "bestFor": [
      "First full-frame camera",
      "Travel and family photography"
    ],
    "reviewScores": {
      "design": 9,
      "imageQuality": 9.2,
      "autofocus": 9.4,
      "video": 9,
      "stabilization": 9.2,
      "handling": 9.4,
      "battery": 9,
      "value": 9.2
    },
    "specs": {
      "sensor": "24MP full-frame BSI CMOS",
      "mount": "Nikon Z",
      "stabilization": "In-body stabilization",
      "video": "4K video",
      "processor": "EXPEED 7"
    },
    "pros": [
      "Excellent value",
      "Strong autofocus system"
    ],
    "cons": [
      "Larger than some rivals",
      "Not built for maximum burst speed"
    ],
    "sources": [
      {
        "platform": "DPReview",
        "rating": 4.55,
        "reviewCount": 0,
        "url": "https://www.dpreview.com/reviews/nikon-z5ii-review/",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Nikon+Z5II&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "fujifilm-x-t5",
    "slug": "fujifilm-x-t5",
    "name": "Fujifilm X-T5",
    "brand": "Fujifilm",
    "category": "Cameras",
    "categoryId": "cameras",
    "productType": "APS-C mirrorless camera",
    "shortDescription": "A photography-focused 40MP APS-C camera with classic controls, in-body stabilization, excellent color, and strong lens support.",
    "image": {
      "src": "",
      "alt": "Fujifilm X-T5"
    },
    "editorialScore": 9.3,
    "customerRating": 4.9,
    "totalReviewCount": 80,
    "qualification": "top-pick",
    "verdictLabel": "Outstanding",
    "editorVerdict": "A photography-focused 40MP APS-C camera with classic controls, in-body stabilization, excellent color, and strong lens support.",
    "bestFor": [
      "Still photography",
      "Travel and landscape"
    ],
    "reviewScores": {
      "design": 9.1,
      "imageQuality": 9.3,
      "autofocus": 9.5,
      "video": 9.1,
      "stabilization": 9.3,
      "handling": 9.5,
      "battery": 9.1,
      "value": 9.3
    },
    "specs": {
      "sensor": "40.2MP APS-C X-Trans CMOS",
      "mount": "Fujifilm X",
      "stabilization": "5-axis IBIS",
      "video": "Up to 6.2K",
      "design": "Dedicated exposure dials"
    },
    "pros": [
      "Excellent image quality",
      "Compact classic design"
    ],
    "cons": [
      "Autofocus trails best sports cameras",
      "Smaller grip"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.9,
        "reviewCount": 80,
        "url": "https://www.bestbuy.com/product/fujifilm-x-t5-mirrorless-camera-body-only-black/J7929VC8X7",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Fujifilm+X-T5&tag=chhx2nun03-20"
      }
    ]
  },
  {
    "id": "fujifilm-x100vi",
    "slug": "fujifilm-x100vi",
    "name": "Fujifilm X100VI",
    "brand": "Fujifilm",
    "category": "Cameras",
    "categoryId": "cameras",
    "productType": "Premium fixed-lens camera",
    "shortDescription": "A compact 40MP fixed-lens camera with a hybrid viewfinder, in-body stabilization, and Fujifilm's distinctive shooting experience.",
    "image": {
      "src": "",
      "alt": "Fujifilm X100VI"
    },
    "editorialScore": 9.1,
    "customerRating": 4.8,
    "totalReviewCount": 51,
    "qualification": "strong-pick",
    "verdictLabel": "Excellent",
    "editorVerdict": "A compact 40MP fixed-lens camera with a hybrid viewfinder, in-body stabilization, and Fujifilm's distinctive shooting experience.",
    "bestFor": [
      "Street photography",
      "Everyday carry"
    ],
    "reviewScores": {
      "design": 8.9,
      "imageQuality": 9.1,
      "autofocus": 9.3,
      "video": 8.9,
      "stabilization": 9.1,
      "handling": 9.3,
      "battery": 8.9,
      "value": 9.1
    },
    "specs": {
      "sensor": "40.2MP APS-C X-Trans CMOS",
      "lens": "23mm f/2 fixed lens",
      "stabilization": "In-body stabilization",
      "viewfinder": "Hybrid optical/electronic",
      "video": "6.2K support"
    },
    "pros": [
      "Excellent image quality",
      "Highly portable"
    ],
    "cons": [
      "Fixed lens limits flexibility",
      "Often expensive or scarce"
    ],
    "sources": [
      {
        "platform": "Best Buy",
        "rating": 4.8,
        "reviewCount": 51,
        "url": "https://www.bestbuy.com/product/fujifilm-x-series-x100vi-40-2mp-digital-camera-black/6574274",
        "checkedAt": "2026-09-04"
      }
    ],
    "affiliateLinks": [
      {
        "retailer": "Amazon",
        "url": "https://www.amazon.com/s?k=Fujifilm+X100VI&tag=chhx2nun03-20"
      }
    ]
  },
];
