import { exec } from 'child_process';
import { BaseOptions, TrackerResponse } from './types/tracker';
import { HeroesStats, HeroStats, OverviewStats, RoleStats, UserInfo } from './types/internal';

const BASE_URL = `https://api.tracker.gg/api/v2/marvel-rivals/standard/profile/ign/{USERNAME}`;

const fetchData = (url: string) =>
    new Promise((resolve, reject) => {
        exec(`curl --max-time 5 --user-agent 'Chrome/121' --url ${url}`, (err, result) => {
            if (!result) {
                reject(err);
            }
            resolve(JSON.parse(result));
        });
    });

class API {
    username: string;
    _raw: TrackerResponse;

    constructor(username: string) {
        this.username = username;
    }

    static async fetchUser(username: string) {
        const api = new API(username);
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

    info() {
        const platform = this._raw.data.platformInfo;
        const info = this._raw.data.userInfo;
        const data = this._raw.data.segments.find((x) => x.type == 'ranked-peaks');

        const { lifetimePeakRanked } = data?.stats ?? {};

        const result: UserInfo = {
            platform: platform.platformSlug,
            uuid: platform.platformUserId,
            name: platform.platformUserHandle,
            userid: platform.platformUserIdentifier,
            avatar: platform.avatarUrl,
            pageViews: info.pageviews,
            rank: lifetimePeakRanked.metadata?.tierName,
            peakRank: lifetimePeakRanked.metadata?.tierName,
        };

        return result;
    }

    raw() {
        return this._raw;
    }
}

export {
    API as VAPI, // compability
    API,
};