// Hearthstone class data
export type HsClass =
  | "Death Knight"
  | "Demon Hunter"
  | "Druid"
  | "Hunter"
  | "Mage"
  | "Paladin"
  | "Priest"
  | "Rogue"
  | "Shaman"
  | "Warlock"
  | "Warrior";

export const CLASS_COLORS: Record<HsClass, string> = {
  "Death Knight": "#6A9FB5",
  "Demon Hunter": "#A330C9",
  Druid: "#8B5A2B",
  Hunter: "#7CC576",
  Mage: "#69CCF0",
  Paladin: "#F5C842",
  Priest: "#E8E8E8",
  Rogue: "#C9B037",
  Shaman: "#0070DE",
  Warlock: "#9482C9",
  Warrior: "#C79C6E",
};

export interface Archetype {
  id: string;
  name: string;
  hsClass: HsClass;
  tier: 1 | 2 | 3 | 4;
}

export const ARCHETYPES: Archetype[] = [
  { id: "aggro-paladin", name: "Aggro Paladin", hsClass: "Paladin", tier: 1 },
  { id: "control-warrior", name: "Control Warrior", hsClass: "Warrior", tier: 2 },
  { id: "pirate-dh", name: "Pirate Demon Hunter", hsClass: "Demon Hunter", tier: 1 },
  { id: "big-priest", name: "Big Priest", hsClass: "Priest", tier: 3 },
  { id: "rainbow-dk", name: "Rainbow Death Knight", hsClass: "Death Knight", tier: 1 },
  { id: "spell-mage", name: "Spell Mage", hsClass: "Mage", tier: 2 },
  { id: "hound-hunter", name: "Hound Hunter", hsClass: "Hunter", tier: 2 },
  { id: "moonbeam-druid", name: "Moonbeam Druid", hsClass: "Druid", tier: 1 },
  { id: "cycle-rogue", name: "Cycle Rogue", hsClass: "Rogue", tier: 2 },
  { id: "nature-shaman", name: "Nature Shaman", hsClass: "Shaman", tier: 1 },
  { id: "wheel-warlock", name: "Wheel Warlock", hsClass: "Warlock", tier: 2 },
  { id: "zarimi-priest", name: "Zarimi Priest", hsClass: "Priest", tier: 2 },
];

// Winrate matrix: rows = our deck, cols = opponent deck
// Values 0-100, mirror = 50. Symmetric: matrix[a][b] = 100 - matrix[b][a]
function buildMatrix(): Record<string, Record<string, number>> {
  // Curated realistic winrates (row vs col)
  const raw: Record<string, Record<string, number>> = {
    "aggro-paladin": {
      "control-warrior": 58, "pirate-dh": 48, "big-priest": 62, "rainbow-dk": 45,
      "spell-mage": 55, "hound-hunter": 51, "moonbeam-druid": 47, "cycle-rogue": 53,
      "nature-shaman": 49, "wheel-warlock": 60, "zarimi-priest": 52,
    },
    "control-warrior": {
      "pirate-dh": 38, "big-priest": 41, "rainbow-dk": 44, "spell-mage": 56,
      "hound-hunter": 47, "moonbeam-druid": 52, "cycle-rogue": 49, "nature-shaman": 36,
      "wheel-warlock": 58, "zarimi-priest": 53,
    },
    "pirate-dh": {
      "big-priest": 60, "rainbow-dk": 49, "spell-mage": 58, "hound-hunter": 54,
      "moonbeam-druid": 46, "cycle-rogue": 52, "nature-shaman": 51, "wheel-warlock": 57,
      "zarimi-priest": 50,
    },
    "big-priest": {
      "rainbow-dk": 39, "spell-mage": 48, "hound-hunter": 42, "moonbeam-druid": 55,
      "cycle-rogue": 40, "nature-shaman": 45, "wheel-warlock": 51, "zarimi-priest": 46,
    },
    "rainbow-dk": {
      "spell-mage": 56, "hound-hunter": 58, "moonbeam-druid": 53, "cycle-rogue": 51,
      "nature-shaman": 54, "wheel-warlock": 49, "zarimi-priest": 57,
    },
    "spell-mage": {
      "hound-hunter": 47, "moonbeam-druid": 44, "cycle-rogue": 48, "nature-shaman": 42,
      "wheel-warlock": 53, "zarimi-priest": 49,
    },
    "hound-hunter": {
      "moonbeam-druid": 50, "cycle-rogue": 53, "nature-shaman": 48, "wheel-warlock": 55,
      "zarimi-priest": 51,
    },
    "moonbeam-druid": {
      "cycle-rogue": 56, "nature-shaman": 47, "wheel-warlock": 54, "zarimi-priest": 52,
    },
    "cycle-rogue": {
      "nature-shaman": 50, "wheel-warlock": 52, "zarimi-priest": 49,
    },
    "nature-shaman": {
      "wheel-warlock": 58, "zarimi-priest": 53,
    },
    "wheel-warlock": {
      "zarimi-priest": 47,
    },
    "zarimi-priest": {},
  };

  const matrix: Record<string, Record<string, number>> = {};
  for (const a of ARCHETYPES) {
    matrix[a.id] = {};
    for (const b of ARCHETYPES) {
      if (a.id === b.id) {
        matrix[a.id][b.id] = 50;
      } else if (raw[a.id]?.[b.id] !== undefined) {
        matrix[a.id][b.id] = raw[a.id][b.id];
      } else if (raw[b.id]?.[a.id] !== undefined) {
        matrix[a.id][b.id] = 100 - raw[b.id][a.id];
      } else {
        matrix[a.id][b.id] = 50;
      }
    }
  }
  return matrix;
}

export const MATCHUP_MATRIX = buildMatrix();

// Sample game counts per matchup
export function gamesFor(a: string, b: string): number {
  const seed = (a + b).split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  return 800 + (seed % 4200);
}

export function getWinrate(ourId: string, oppId: string): number {
  return MATCHUP_MATRIX[ourId]?.[oppId] ?? 50;
}

export const PATCHES = [
  { id: "29.4", name: "Patch 29.4 — Whizbang's Workshop" },
  { id: "29.2", name: "Patch 29.2" },
  { id: "28.6", name: "Patch 28.6 — Showdown in the Badlands" },
];

export const FORMATS = [
  { id: "standard", name: "Standard" },
  { id: "wild", name: "Wild" },
  { id: "twist", name: "Twist" },
] as const;
