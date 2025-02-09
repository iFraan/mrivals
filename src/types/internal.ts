export type RoleType = 'Strategist' | 'Duelist' | 'Vanguard';

export type HeroStats = {
    timePlayed: number;
    timePlayedWon: number;
    matchesPlayed: number;
    matchesWon: number;
    matchesWinPct: number;
    kills: number;
    deaths: number;
    assists: number;
    kdRatio: number;
    kdaRatio: number;
    totalHeroDamage: number;
    totalHeroDamagePerMinute: number;
    totalHeroHeal: number;
    totalHeroHealPerMinute: number;
    totalDamageTaken: number;
    totalDamageTakenPerMinute: number;
    lastKills: number;
    headKills: number;
    soloKills: number;
    survivalKills: number;
    continueKills: number;
    continueKills3: number;
    continueKills4: number;
    continueKills5: number;
    continueKills6: number;
    mainAttacks: number;
    mainAttackHits: number;
    shieldHits: number;
    summonerHits: number;
    chaosHits: number;
    totalMvp: number;
    totalSvp: number;
}

export type OverviewStats = HeroStats & {
    featureNormalData1?: number;
    featureNormalData2?: number;
    featureNormalData3?: number;
    featureCriticalRate1CritHits?: number;
    featureCriticalRate1Hits?: number;
    featureHitRate1UseCount?: number;
    featureHitRate1HeroHits?: number;
    featureHitRate1EnemyHits?: number;
    featureHitRate1ShieldHits?: number;
    featureHitRate1SummonerHits?: number;
}

export type RoleStats = {
    [K in RoleType]: HeroStats;
}

export type HeroesStats = {
    [hero: string]: OverviewStats;
}

export type GameMode = {
    id: string;
    name: string;
}

export type Season = {
    id: number;
    name: string;
    shortName: string;
}

export type MetadataInfo = {
    lastUpdated: {
        value: string;
        displayValue: string;
    };
    level: number;
    currentSeason: number;
    defaultSeason: number;
    gamemodes: GameMode[];
    seasons: Season[];
}

export type UserInfo = {
    platform: string;
    uuid: string;
    name: string;
    userid: string;
    avatar: string;
    pageViews: number;
    rank: string;
    peakRank: string;
    metadata?: MetadataInfo;
}
