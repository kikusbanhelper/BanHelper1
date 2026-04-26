import { ARCHETYPES, getWinrate } from "@/data/archetypes";

export interface BanResult {
  banId: string;
  banName: string;
  winProbability: number; // 0-1
}

/**
 * Conquest format ban calculator.
 * Player must win 1 game with EACH of their decks (n decks vs n decks, ban 1 opponent deck).
 *
 * For each candidate ban (opponent deck removed), we estimate win probability.
 * Heuristic: probability of winning a Conquest series ≈ product over our decks of
 *   (best matchup winrate of that deck against any remaining opponent deck).
 * This is a strong proxy: each of our decks needs at least one favorable target.
 */
export function calculateBestBan(ourDeckIds: string[], oppDeckIds: string[]): BanResult[] {
  const results: BanResult[] = [];

  for (const banId of oppDeckIds) {
    const remaining = oppDeckIds.filter((id) => id !== banId);
    if (remaining.length === 0) {
      results.push({ banId, banName: nameOf(banId), winProbability: 1 });
      continue;
    }

    // For each of our decks, find best matchup against remaining opponents
    let prob = 1;
    for (const ourId of ourDeckIds) {
      const bestVs = Math.max(...remaining.map((oppId) => getWinrate(ourId, oppId))) / 100;
      // Slight smoothing — don't multiply pure max, blend with average for realism
      const avgVs = remaining.reduce((s, oppId) => s + getWinrate(ourId, oppId), 0) / remaining.length / 100;
      prob *= 0.7 * bestVs + 0.3 * avgVs;
    }

    results.push({ banId, banName: nameOf(banId), winProbability: prob });
  }

  return results.sort((a, b) => b.winProbability - a.winProbability);
}

function nameOf(id: string): string {
  return ARCHETYPES.find((a) => a.id === id)?.name ?? id;
}
