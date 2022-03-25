export enum MatchResult {
  Win = "1",
  Lose = "0",
}

export type TPlayer = {
  accountNo: string;
  characterName: string;
  character: string;
  kart: string;
  license: string;
  pet: string;
  flyingPet: string;
  partsEngine: string;
  partsHandle: string;
  partsWheel: string;
  partsKit: string;
  rankinggrade2: string;
  matchRank: string;
  matchRetired: string;
  matchWin: MatchResult;
  matchTime: string;
};

export type TCustomMatch = {
  accountNo: number;
  matchId: number;
  teamId: number;
  character: string;
  startTime: string;
  endTime: string;
  channelName: string;
  trackId: string;
  matchType: string;
  playerCount: number;
  matchResult: number;
  seasonType: string | "";
  player: TPlayer;
};

export type TMatch = {
  matchType: string | "";
  accountNo: number;
  matchId: number;
  teamId: number;
  character: string;
  startTime: string;
  endTime: string;
  channelName: string;
  trackId: string;
  playerCount: number;
  matchResult: number;
  seasonType: string | "";
  player: TPlayer;
};

export type TMatches = { matches: TMatch[]; matchType: string };

export type TUserMatches = {
  matches: TMatches[];
  nickName: string;
};

export type TTypeMatchList = {
  matchType: string;
  matches: string[];
};

export type TAllMatches = {
  matches: TTypeMatchList[];
};

export type TTeam = {
  teamId: string;
  players: TPlayer[];
};

export type TTargetMatchBase = {
  channelName: string;
  startTime: string;
  endTime: string;
  gameSpeed: number;
  matchId: string;
  matchResult: string;
  matchType: string;
  playTime: number;
  trackId: string;
};

export type TTargetMatchTeam = TTargetMatchBase & {
  teams: TTeam[];
};

export type TTargetMatchSolo = TTargetMatchBase & {
  players: TPlayer[];
};

export type TTargetMatch = TTargetMatchTeam | TTargetMatchSolo;

export const isTeamMatch = (
  targetMatch: TTargetMatch,
): targetMatch is TTargetMatchTeam => "teams" in targetMatch;

export const isSoloMatch = (
  targetMatch: TTargetMatch,
): targetMatch is TTargetMatchSolo => "players" in targetMatch;
