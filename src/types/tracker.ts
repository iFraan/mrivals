export type BaseOptions = {
    raw?: boolean;
};

export type TrackerPlatformInfo = {
    platformSlug: string;
    platformUserId: string;
    platformUserHandle: string;
    platformUserIdentifier: string;
    avatarUrl: string;
};

export type TrackerUserInfo = {
    userId: string;
    isPremium: boolean;
    isVerified: boolean;
    isInfluencer: boolean;
    isPartner: boolean;
    countryCode: string | null;
    customAvatarUrl: string | null;
    socialAccounts: any[];
    pageviews: number;
};


type TrackerMetadata = {
    lastUpdated: {
        value: string;
        displayValue: string;
    };
    level: number;
    currentSeason: number;
    defaultSeason: number;
    gamemodes: Array<{
        id: string;
        name: string;
    }>;
    seasons: Array<{
        id: number;
        name: string;
        shortName: string;
    }>;
};


type SegmentStat = {
    rank: number | null;
    displayName: string;
    category: string;
    value: number | string | SegmentStat[];
    displayValue: string;
    displayType: string;
    metadata: {
        unit?: string;
        iconUrl?: string;
        tierName?: string;
        tierShortName?: string;
        color?: string;
        season?: number,
        seasonName?: string,
        seasonShortName?: string
    }
};

export type SegmentGameStats = {
    [key: string]: SegmentStat;
};

export type Segments = {
    type: 'overview' | 'hero' | 'hero-role' | 'ranked-peaks';
    attributes: {
        season?: number;
        mode?: string;
        heroId?: number;
        roleId?: string;
    };
    metadata?: {
        name?: string;
        imageUrl?: string;
        roleName?: string;
        color?: string;        
    };
    stats: SegmentGameStats;
    expiryDate: string;
};


export type TrackerResponse = {
    data: {
        platformInfo: TrackerPlatformInfo;
        userInfo: TrackerUserInfo;
        metadata: TrackerMetadata;
        segments: Segments[];
        expiryDate: string;
    };
    errors?: { message: string }[];
};
