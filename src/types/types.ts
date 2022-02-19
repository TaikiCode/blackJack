export interface Card {
  code: string;
  image: string;
  suit: string;
  value: string;
  cardValue: string;
}

export interface PlayerInfo {
    total: number
    totalAlt: number
    cards: Card[]
    betSize: number
    budget: number
}

export interface DealerInfo {
    total: number
    totalAlt: number
    cards: Card[]
}

export interface Status {
    isPlaying: boolean
    resultMsg: string | null
}

export interface Game {
    deck: Card[]
    playerInfo: PlayerInfo
    dealerInfo: DealerInfo
    status: Status
}
