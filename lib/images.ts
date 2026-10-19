/**
 * Image library for blog posts and local pages.
 *
 * Two sources, in order of preference:
 *  1. Our own install photos in /public/images/real. They show real
 *     LumaGrid jobs and stock, so they are the most "local" images we have.
 *     Use these whenever a post is about panels, batteries or inverters.
 *  2. Unsplash photos under the Unsplash License (free for commercial use,
 *     no permission needed). Unsplash asks that images are hotlinked from
 *     its CDN and credited, so we keep the photographer and photo link.
 *     Most of the people and place shots are by Nigerian photographers.
 *
 * Posts and cities refer to an image by key (e.g. `image: "lithium-cells"`).
 */

export interface SiteImage {
  src: string;
  alt: string;
  /** Photographer credit for Unsplash images; empty for our own photos. */
  credit?: string;
  creditUrl?: string;
}

const unsplash = (photo: string, id: string, credit: string, alt: string): SiteImage => ({
  src: `https://images.unsplash.com/${photo}?w=1600&q=75&auto=format&fit=crop`,
  alt,
  credit,
  creditUrl: `https://unsplash.com/photos/${id}?utm_source=lumagrid&utm_medium=referral`,
});

const own = (file: string, alt: string): SiteImage => ({ src: `/images/real/${file}`, alt });

export const IMAGES = {
  // ── Our own photos ────────────────────────────────────────────────────────
  "rooftop-array": own("solar-panels-on-the-roof.jpeg", "Solar panels installed by LumaGrid on a roof in the Niger Delta"),
  "jinko-panels": own("jinko-panels.jpeg", "New solar panels stacked on site, ready for a LumaGrid installation"),
  "jinko-panel": own("jinko-panel.jpeg", "Jinko solar panel with its rating label"),
  "longi-panels": own("longi-solar-panels.jpeg", "Longi solar panels before installation"),
  "panels-transit": own("solar-panels-in-transit.jpeg", "Solar panels being moved to an installation site"),
  "great-panels": own("great-solar-panels.jpeg", "Rows of new solar panels"),
  "abraka-system": own("5kwh-6Kva-system-abraka.jpeg", "6kVA inverter and 5kWh lithium battery installed in Abraka, Delta State"),
  "lithium-storage": own("LiFePo4-batteries-in-storage.jpeg", "LiFePO4 lithium batteries in storage"),
  "lithium-cells": own("deriy.jpeg", "LiFePO4 lithium battery units ready for installation"),
  "lithium-spec": own("grade-a-LiFePo4-cells.jpeg", "10kWh lithium battery built with Grade A LiFePO4 cells"),
  "lithium-movable": own("movable-LifePo4-batteries.jpeg", "Movable LiFePO4 lithium batteries on wheels"),
  "lithium-transit": own("Lithium-ion-batteries-in-transit.jpeg", "Lithium-ion batteries being delivered"),
  "lithium-wall": own("lumagrid-deriy-batteries-for-solar-installation.jpeg", "Lithium batteries ready for a LumaGrid solar installation"),

  "blog-panel-check": { src: "/blog/fake-substandard-solar-panels-nigeria/hero.jpeg", alt: "Checking a certified solar panel before installation" },
  "blog-business": { src: "/blog/solar-small-business-rivers-state/hero.jpg", alt: "Small business in Port Harcourt running on solar power" },

  // ── Nigerian places and people (Unsplash) ────────────────────────────────
  "ng-aerial-homes": unsplash("photo-1783260606332-23546f99b8c8", "Cur3u-P22Uo", "Tunde Buremo", "Aerial view of homes and roads in a Nigerian city"),
  "ng-city-trees": unsplash("photo-1639774275491-71d62502a4e0", "IxRrPNNl-Xk", "Francis Tokede", "Nigerian neighbourhood with houses and trees"),
  "ng-house-balcony": unsplash("photo-1661332626638-f60fc1e9cc09", "f1Y4eYMD4tY", "Tope. A Asokere", "Nigerian house with a balcony"),
  "ng-house-wall": unsplash("photo-1661332618293-6b6204cd87fc", "2b_p8kU6Lu8", "Tope. A Asokere", "Nigerian family house"),
  "ng-building": unsplash("photo-1628144688607-c373d8e3f31b", "REptTTduJxY", "Ferdinand Asakome", "Concrete storey building in Nigeria"),
  "ng-street-traffic": unsplash("photo-1648023199223-25d3622bcb13", "cFT_Xq4XyA0", "Opeyemi Adisa", "Busy street with shops in a Nigerian city"),
  "ng-marina": unsplash("photo-1649502913092-fb7f0e8fc632", "vvQW-3yfuos", "Namnso Ukpanah", "Busy waterfront road in a Nigerian city"),
  "ng-market-aerial": unsplash("photo-1785094165709-54fef69c2c4d", "IWMQ5P9HxYM", "Fahd Aminu", "Busy Nigerian street market seen from above"),
  "ng-market-seller": unsplash("photo-1585540083814-ea6ee8af9e4f", "ME416b6sp2I", "Omotayo Tajudeen", "Trader selling pepper at a Nigerian market"),
  "ng-market-tomato": unsplash("photo-1734255026082-82fdc81991f0", "cnVn4Gg4b00", "Tunde Buremo", "Tomato and pepper sellers at a Nigerian market"),
  "ng-small-shop": unsplash("photo-1761370571806-886404629697", "iLv6fkrr6Jk", "Muhammad-Taha Ibrahim", "Shop owner standing in a small Nigerian shop"),
  "ng-shop-owner": unsplash("photo-1723221907187-3e88c1d74b99", "gsw3AP6I-EY", "Blessing Olarewaju", "Business owner standing in front of his shop"),
  "ng-salon": unsplash("photo-1788779413503-2f35218d2b65", "eKFVdjpk7Y0", "SALAKO Adedolapo", "Hair stylists working in a Nigerian salon"),
  "ng-food-stall": unsplash("photo-1765584830351-b751c8937c75", "w1EaPjX71Sw", "Ben Iwara", "Two women at a food stall selling plantain"),
  "ng-sunset-city": unsplash("photo-1682014867191-96c3b9b606c5", "pS7D8lroxTM", "Baqeer Gashua", "Sun setting over a Nigerian city"),
  "ng-streetlight-sunset": unsplash("photo-1659622439935-6c570f2dfb34", "EFPHs59BiT8", "Habila Mazawaje", "Street lights at sunset in Nigeria"),

  // ── General solar and power (Unsplash) ───────────────────────────────────
  "wall-battery-system": unsplash("photo-1780445392417-68b9dccc45f2", "7WzD2mTRWK8", "Sergio Martins", "Wall-mounted inverter and battery storage system"),
  "tubular-batteries": unsplash("photo-1742899273038-67ff67477663", "CH7kRmyBQ4I", "Vanya Smythe", "Rows of tubular lead-acid batteries"),
  "installer-roof": unsplash("photo-1624397640148-949b1732bb0a", "wmaP3Tl80ww", "Bill Mead", "Installer fixing a solar panel on a roof"),
  "installer-roof-2": unsplash("photo-1660330589257-813305a4a383", "Q8V1EEvnJgk", "Raze Solar", "Solar installer working on a roof"),
  "panel-closeup": unsplash("photo-1613665813446-82a78c468a1d", "0GbrjL3vZF4", "Nuno Marques", "Close-up of solar panel cells"),
  "house-with-panels": unsplash("photo-1655300256335-beef51a914fe", "Ja8t8nJN2I4", "Watt A Lot", "House with solar panels on the roof"),
  "rural-panels": unsplash("photo-1753881110611-00755160afd2", "vigtAEXRJD0", "Nathan Wong", "Solar panels on a building in a rural African town"),
  "generator": unsplash("photo-1705051278299-7e64ba21437a", "7MjXpkxFseU", "Fahim Junaid", "Large generator by the roadside"),
  "power-station": unsplash("photo-1679274649021-067d0003d9bf", "3qpC3uZQa0k", "Zendure Power Station", "Portable solar power station with panels"),
  "ac-condensers": unsplash("photo-1545649311-24d0ac00ae82", "f1f-FQj0k0U", "Stephan HK", "Air conditioner outdoor units on a wall"),
  "rain-river": unsplash("photo-1434118489318-42a0e62c6235", "4raYy7dY2yw", "Christopher", "Heavy rain falling on a river"),
  "lightning": unsplash("photo-1570589867577-095368ee1649", "qItn62Nb6Zs", "Jeffrey Grospe", "Lightning in a night sky"),
  "storm-cloud": unsplash("photo-1584820537082-8e19daff36bd", "GBkssTODNT0", "Daniel Lerman", "Rain storm moving over water"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;

export const DEFAULT_IMAGE: ImageKey = "rooftop-array";

export function getImage(key?: string): SiteImage {
  return (key && key in IMAGES ? IMAGES[key as ImageKey] : IMAGES[DEFAULT_IMAGE]);
}

export function absoluteImageUrl(img: SiteImage, siteUrl: string): string {
  return img.src.startsWith("http") ? img.src : `${siteUrl}${img.src}`;
}
