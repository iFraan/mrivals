import { TrackerResponse } from './types/tracker';
import { HeroesStats, HeroStats, OverviewStats, RoleStats, UserInfo, BaseOptions, FetchUserOptions } from './types/internal';
import { getFetcher } from './helpers/fetcher';

const BASE_URL = `https://api.tracker.gg/api/v2/marvel-rivals/standard/profile/ign/{USERNAME}`;

class API {
    username: string;
    _raw: TrackerResponse;

    constructor(username: string) {
        this.username = username;
    }

    static async fetchUser(username: string, options: FetchUserOptions = {}) {
        const api = new API(username);

        const fetchData = getFetcher({
            flaresolverrUrl: options.flaresolverrUrl,
            useCurl: options.useCurl ?? false,
        });

        api._raw = (await fetchData(BASE_URL.replace('{USERNAME}', username))) as TrackerResponse;

        if (api._raw.errors) throw new Error(api._raw.errors[0].message);
        return api;
    }


    overview(options: BaseOptions = {}) {
        const result = {} as OverviewStats;
        const raw = options.raw ?? false;
        const data = this._raw.data.segments.find((x) => x.type === 'overview');
        if (raw) {
            // @ts-ignore
            result._raw = data;
        }
        if (data?.stats) {
            for (const key in data.stats) {
                result[key] = data.stats[key].value;
            }
        }
        return result;
    }

    heroes() {
        const result = {} as HeroesStats;
        const heroes = this._raw.data.segments.filter((x) => x.type === 'hero');

        for (const hero of heroes) {
            const heroName = hero.metadata.name;
            result[heroName] = {} as HeroStats;
            if (hero) {
                for (const key in hero.stats) {
                    result[heroName][key] = hero.stats[key].value;
                }
            }
        }
        return result;
    }

    roles() {
        const result = {} as RoleStats;
        const roles = this._raw.data.segments.filter((x) => x.type === 'hero-role');

        for (const role of roles) {
            const roleName = role.metadata.name;
            result[roleName] = {} as HeroStats;
            if (role) {
                for (const key in role.stats) {
                    result[roleName][key] = role.stats[key].value;
                }
            }
        }
        return result;
    }

    peakRank() {
        const data = this._raw.data.segments.find((x) => x.type === 'ranked-peaks');

        const {lifetimePeakRanked} = data?.stats ?? {};

        const peakTiers = Array.isArray(data?.stats.peakTiers?.value) ? data?.stats.peakTiers.value : [];

        const result = {
            peakTiers: peakTiers?.map((x) => ({
                displayName:  x.displayName,
                tierName: x.metadata.tierName,
                tierShortName: x.metadata.tierShortName,
                tierIcon: x.metadata.iconUrl,
                tierColor: x.metadata.color,
                season: x.metadata.seasonShortName,
                seasonName: x.metadata.seasonName,
                mmr: x.value as number,
            })),
            lifetimePeakRanked: {
                displayName: lifetimePeakRanked.metadata.tierName,
                tierName: lifetimePeakRanked.metadata.tierName,
                tierShortName: lifetimePeakRanked.metadata.tierShortName,
                tierIcon: lifetimePeakRanked.metadata.iconUrl,
                tierColor: lifetimePeakRanked.metadata.color,
                season: lifetimePeakRanked.metadata.seasonShortName,
                seasonName: lifetimePeakRanked.metadata.seasonName,
                mmr: lifetimePeakRanked.value as number,
            }
        }

        return result;
    }

    info() {
        const platform = this._raw.data.platformInfo;
        const info = this._raw.data.userInfo;
        const data = this._raw.data.segments.find((x) => x.type == 'overview');

        const { ranked, peakRanked } = data?.stats ?? {};

        const result: UserInfo = {
            platform: platform.platformSlug,
            uuid: platform.platformUserId,
            name: platform.platformUserHandle,
            userid: platform.platformUserIdentifier,
            avatar: platform.avatarUrl,
            pageViews: info.pageviews,
            rank: ranked?.metadata?.tierName,
            peakRank: peakRanked?.metadata?.tierName,
        };

        return result;
    }

    raw() {
        return this._raw;
    }
}

export {
    API,
};