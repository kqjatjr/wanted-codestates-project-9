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
  matchWin: string;
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

export type TAllMatches = {
  matchType: string;
  matches: string[];
};

export type TTeam = {
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
  matchWin: string;
  matchTime: string;
};

export type TTargetMatch = {
  channelName: string;
  startTime: string;
  endTime: string;
  gameSpeed: number;
  matchId: string;
  matchResult: string;
  matchType: string;
  playTime: number;
  trackId: string;
  teams: TTeam[] | TPlayer[];
};
