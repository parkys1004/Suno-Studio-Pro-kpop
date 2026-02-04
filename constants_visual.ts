
export const ART_STYLES = [
  'Digital Art', 'Photorealistic', '3D Render', 'Oil Painting', 'Anime/Manga',
  'Watercolor', 'Cyberpunk', 'Steampunk', 'Synthwave', 'Vaporwave',
  'Pop Art', 'Minimalist', 'Abstract', 'Surrealism', 'Ukiyo-e',
  'Sketch/Pencil', 'Gothic', 'Renaissance', 'Pixel Art', 'Graffiti/Street Art'
];

export const IMAGE_SIZE_PRESETS = [
    { id: 0, label: 'Square (1:1)', ratio: '1:1', desc: 'Instagram Feed, Profile' },
    { id: 1, label: 'Landscape (16:9)', ratio: '16:9', desc: 'YouTube, Web Banner' },
    { id: 2, label: 'Portrait (9:16)', ratio: '9:16', desc: 'Stories, Reels, TikTok' },
    { id: 3, label: 'Classic TV (4:3)', ratio: '4:3', desc: 'Retro, Tablet View' },
    { id: 4, label: 'Classic Photo (3:4)', ratio: '3:4', desc: 'Standard Print' },
    { id: 5, label: 'Social Post (4:5)', ratio: '3:4', desc: 'IG Portrait (Crop optimized)' },
    { id: 6, label: 'Wide Link (1.9:1)', ratio: '16:9', desc: 'FB/Twitter Link Preview' },
    { id: 7, label: 'Cinematic (21:9)', ratio: '16:9', desc: 'Ultra Widescreen Movie' },
    { id: 8, label: 'Tall Banner (1:2)', ratio: '9:16', desc: 'Vertical Display Ad' },
    { id: 9, label: 'Circular (1:1)', ratio: '1:1', desc: 'Sticker, Badge Style' }
];

export const FONT_OPTIONS = [
    { label: 'Inter (Modern Standard)', value: "'Inter', sans-serif" },
    { label: 'Roboto (Clean)', value: "'Roboto', sans-serif" },
    { label: 'Open Sans (Neutral)', value: "'Open Sans', sans-serif" },
    { label: 'Montserrat (Geometric)', value: "'Montserrat', sans-serif" },
    { label: 'Poppins (Friendly)', value: "'Poppins', sans-serif" },
    { label: 'Lato (Stable)', value: "'Lato', sans-serif" },
    { label: 'Oswald (Tall & Bold)', value: "'Oswald', sans-serif" },
    { label: 'Anton (Impact)', value: "'Anton', sans-serif" },
    { label: 'Bebas Neue (Condensed)', value: "'Bebas Neue', cursive" },
    { label: 'Playfair Display (Elegant)', value: "'Playfair Display', serif" },
    { label: 'Merriweather (Readability)', value: "'Merriweather', serif" },
    { label: 'Abril Fatface (Big Serif)', value: "'Abril Fatface', cursive" },
    { label: 'Lobster (Retro Script)', value: "'Lobster', cursive" },
    { label: 'Pacifico (Fun Script)', value: "'Pacifico', cursive" },
    { label: 'Dancing Script (Handwritten)', value: "'Dancing Script', cursive" },
    { label: 'Permanent Marker (Marker)', value: "'Permanent Marker', cursive" }
];

export const TEXT_EFFECT_OPTIONS = [
    { id: 'none', label: 'None (Clean)', style: {} },
    { id: 'shadow_soft', label: 'Soft Shadow', style: { textShadow: '2px 2px 4px rgba(0,0,0,0.5)' } },
    { id: 'shadow_hard', label: 'Hard Shadow', style: { textShadow: '3px 3px 0px rgba(0,0,0,0.8)' } },
    { id: 'outline_black', label: 'Outline (Black)', style: { WebkitTextStroke: '1px black', textShadow: '1px 1px 2px black' } },
    { id: 'outline_white', label: 'Outline (White)', style: { WebkitTextStroke: '1px white', color: '#000' } },
    { id: 'neon_pink', label: 'Neon Pink', style: { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e11d48, 0 0 30px #e11d48, 0 0 40px #e11d48' } },
    { id: 'neon_blue', label: 'Neon Blue', style: { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #3b82f6, 0 0 30px #3b82f6, 0 0 40px #3b82f6' } },
    { id: 'glow_gold', label: 'Golden Glow', style: { textShadow: '0 0 10px #fbbf24, 0 0 20px #fbbf24' } },
    { id: 'retro_3d', label: 'Retro 3D', style: { textShadow: '2px 2px 0px #e11d48, 4px 4px 0px #3b82f6' } },
    { id: 'fire', label: 'Fire', style: { textShadow: '0 -1px 2px #fff, 2px -2px 5px #fbbf24, -2px -4px 10px #ef4444, 0 -8px 15px #ea580c' } },
    { id: 'ice', label: 'Ice', style: { textShadow: '0 0 2px #fff, 0 0 5px #bae6fd, 0 0 10px #0ea5e9' } },
    { id: 'cyberpunk', label: 'Cyberpunk', style: { textShadow: '2px 0px 0px #ef4444, -2px 0px 0px #3b82f6', fontStyle: 'italic' } },
    { id: 'heavy_metal', label: 'Heavy Metal', style: { textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)' } },
    { id: 'vintage', label: 'Vintage Letterpress', style: { color: 'rgba(255,255,255,0.8)', textShadow: '1px 1px 1px rgba(0,0,0,0.8), -1px -1px 1px rgba(255,255,255,0.3)' } },
    { id: 'emboss', label: 'Embossed', style: { color: '#eee', textShadow: '-1px -1px 1px rgba(255,255,255,0.3), 1px 1px 1px rgba(0,0,0,0.5)' } },
    { id: 'mirror', label: 'Reflection', style: { textShadow: '0px 10px 5px rgba(255,255,255,0.3)' } },
    { id: 'elegant', label: 'Elegant Blur', style: { textShadow: '0 0 4px rgba(255,255,255,0.8)' } },
    { id: 'pop_art', label: 'Pop Art', style: { WebkitTextStroke: '2px black', textShadow: '4px 4px 0px #fbbf24' } },
    { id: 'hollow', label: 'Hollow', style: { WebkitTextStroke: '1px white', color: 'transparent' } },
    { id: 'glitch', label: 'Glitchy', style: { textShadow: '3px 0 #ff00ff, -3px 0 #00ffff' } }
];

export const CHARACTER_SAMPLES = [
  'Idol Group on Stage', 'Solo Singer with Mic', 'Traditional Hanbok Dancer', 'Cyberpunk DJ',
  'Sentimental Pianist', 'Rainy Seoul Street', 'Neon Club Crowd', 'Fantasy Warrior',
  'School Uniform High Teen', 'Blooming Cherry Blossoms', 'Abstract Sound Waves', 'Retro Cassette Tape'
];

export const DEFAULT_ARTISTS = ['DJ Seoul', 'MC Haneul', 'Luna'];
