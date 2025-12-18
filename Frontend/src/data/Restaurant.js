import FireAndIce from "../assets/Restaurants/fire-and-ice.jpg";
import Bagaicha from "../assets/Restaurants/Bagaicha.jpg";
import ChinaTown from "../assets/Restaurants/chinatown.jpg";
import LazyGringo from "../assets/Restaurants/lazy.jpg";
import OR2K from "../assets/Restaurants/or.png";
import KathmanduGrill from "../assets/Restaurants/kathmandu_grill.jpg";
import Apricus from "../assets/Restaurants/apricus.jpg";
import Bota from "../assets/Restaurants/bota.jpg";
import KFC from "../assets/Restaurants/kfc.jpg";
import Syanko from "../assets/Restaurants/syanko.jpg";
import BurgersHouse from "../assets/Restaurants/burgers_house.jpg";
import Sasa from "../assets/Restaurants/sasa.jpg";
import BaanThai from "../assets/Restaurants/baan_thai.jpg";
import Hokkaido from "../assets/Restaurants/hokkaido.jpg";
import SoulCafe from "../assets/Restaurants/soul_cafe.jpg";

const restaurantSpots = [
  // ITALIAN
  {
    id: 1,
    name: "Fire and Ice Pizzeria",
    category: "Italian",
    location: "Thamel, Kathmandu",
    lat: 27.714,
    lng: 85.3125,
    img: FireAndIce,
    notes:
      "Popular for wood-fired pizzas, pastas, and Italian classics in a busy tourist area.",
  },

  {
    id: 2,
    name: "Bagaichā",
    category: "Italian",
    location: "Durbar Marg, Kathmandu",
    lat: 27.7105,
    lng: 85.3205,
    img: Bagaicha,
    notes:
      "Modern restaurant serving international and Italian-inspired dishes with a garden vibe.",
  },

  // CHINESE
  {
    id: 3,
    name: "Kathmandu China Town",
    category: "Chinese",
    location: "New Baneshwor, Kathmandu",
    lat: 27.6885,
    lng: 85.342,
    img: ChinaTown,
    notes:
      "Authentic Chinese meals with stir-fries, soups, and dumplings in a vibrant environment.",
  },

  // MEXICAN
  {
    id: 4,
    name: "Lazy Gringo",
    category: "Mexican",
    location: "Lakeside Pokhara (Thamel alt used for demo)",
    lat: 27.7145,
    lng: 85.313,
    img: LazyGringo,
    notes:
      "Mexican-inspired tacos, burritos, nachos, and spicy flavors with casual vibes.",
  },

  // CONTINENTAL / INTERNATIONAL / GRILL
  {
    id: 5,
    name: "OR2K",
    category: "Continental / International",
    location: "Thamel, Kathmandu",
    lat: 27.7145,
    lng: 85.3085,
    img: OR2K,
    notes:
      "Vegetarian-friendly café serving Mediterranean and Western-style dishes in a relaxed atmosphere.",
  },

  {
    id: 6,
    name: "Kathmandu Grill Restaurant & Wine Bar",
    category: "Continental / International",
    location: "Lazimpat, Kathmandu",
    lat: 27.7215,
    lng: 85.323,
    img: KathmanduGrill,
    notes:
      "Known for grilled meats, continental dishes, and a peaceful dining ambiance.",
  },

  {
    id: 7,
    name: "Apricus Café",
    category: "Continental / International",
    location: "Naxal, Kathmandu",
    lat: 27.7125,
    lng: 85.33,
    img: Apricus,
    notes:
      "Bright, modern café offering brunch, coffee, and Western-style meals.",
  },

  // FAST FOOD (REPLACED FAKE ONES WITH REAL NEPALESE OPTIONS)
  {
    id: 8,
    name: "Bota Simply MoMo",
    category: "Fast Food / Quick Service",
    location: "Durbar Marg, Kathmandu",
    lat: 27.712,
    lng: 85.321,
    img: Bota,
    notes:
      "Famous for momo, fried chicken, burgers, and quick meals at affordable prices.",
  },

  {
    id: 9,
    name: "KFC Nepal",
    category: "Fast Food / Quick Service",
    location: "New Baneshwor, Kathmandu",
    lat: 27.689,
    lng: 85.3425,
    img: KFC,
    notes:
      "Globally known fast-food chain specializing in crispy fried chicken.",
  },

  {
    id: 10,
    name: "Syanko Momo",
    category: "Fast Food / Quick Service",
    location: "Thamel, Kathmandu",
    lat: 27.7142,
    lng: 85.311,
    img: Syanko,
    notes:
      "Fast-growing momo chain serving pan-fried, steamed, and spicy Nepali momos.",
  },

  {
    id: 11,
    name: "Burgers House",
    category: "Fast Food / Quick Service",
    location: "New Baneshwor, Kathmandu",
    lat: 27.6885,
    lng: 85.341,
    img: BurgersHouse,
    notes: "Local fast-food chain known for burgers, fries, and quick bites.",
  },

  // MORE INTERNATIONAL
  {
    id: 12,
    name: "Sasa Japanese Restaurant",
    category: "Asian / Japanese",
    location: "Lazimpat, Kathmandu",
    lat: 27.721,
    lng: 85.327,
    img: Sasa,
    notes:
      "Japanese cuisine including sushi and ramen served with a calm and minimalist ambiance.",
  },

  {
    id: 13,
    name: "Baan Thai",
    category: "Asian / Thai",
    location: "Durbar Marg, Kathmandu",
    lat: 27.718,
    lng: 85.3205,
    img: BaanThai,
    notes:
      "Authentic Thai restaurant known for curries, pad thai, and flavorful stir-fries.",
  },

  {
    id: 14,
    name: "Hokkaido Ramen House",
    category: "Asian / Japanese",
    location: "Kathmandu city centre",
    lat: 27.72,
    lng: 85.33,
    img: Hokkaido,
    notes:
      "Casual ramen spot serving Japanese noodle dishes, rice bowls, and sides.",
  },

  {
    id: 15,
    name: "Soul Café / Picnic",
    category: "Asian / Korean-style",
    location: "Thamel, Kathmandu",
    lat: 27.714,
    lng: 85.3115,
    img: SoulCafe,
    notes:
      "Korean-inspired dishes with a cozy café atmosphere popular among youth.",
  },
];
export default restaurantSpots;
