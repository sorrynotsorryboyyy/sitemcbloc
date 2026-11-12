import raw from "@/data/network.json";

/**
 * Source unique des informations publiques du réseau (data/network.json).
 * Le même fichier est publié sur /network.json et lu par le bot Discord et le plugin.
 */

export type NetworkGame = {
  id: string;
  name: string;
  server: string;
  emoji: string;
  color: string;
  mode: string;
  description: string;
  features: string[];
};

export type NetworkRank = {
  id: string;
  name: string;
  price: number;
  color: string;
  bonus: string;
  includes?: string;
  popular?: boolean;
  perks: string[];
};

export type RuleScope = "jeu" | "discord";
export type NetworkRule = { text: string; where: RuleScope[] };

export type VoteCrateChance = { id: string; chance: number };
export type VoteReward = { coins: number; crates: VoteCrateChance[] };
export type VoteSite = {
  id: string;
  name: string;
  url: string;
  votifierService: string;
  partner?: boolean;
  cooldownHours: number;
  howTo?: string;
  reward?: VoteReward;
};
export type VoteMilestone = { votes: number; crate: string };

export type Network = {
  version: number;
  name: string;
  brand: string;
  tagline: string;
  slogan: string;
  description: string;
  ip: string;
  port: number;
  versions: string;
  currency: { singular: string; plural: string };
  links: { site: string; boutique: string; vote: string; regles: string; actualites: string; discord: string };
  colors: Record<string, string | Record<string, string>>;
  games: NetworkGame[];
  ranks: NetworkRank[];
  rules: NetworkRule[];
  votes: { sites: VoteSite[]; defaultReward: VoteReward; milestones: VoteMilestone[] };
};

export const network = raw as unknown as Network;

/** Récompense effective d'un site de vote (la sienne, sinon celle par défaut). */
export const voteRewardOf = (s: VoteSite): VoteReward => s.reward ?? network.votes.defaultReward;
