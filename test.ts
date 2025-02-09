import { API } from './src/index';

const test = async () => {
    try {
        const user = await API.fetchUser('ifraan');
        console.log('User:', user.info());
        console.log('Overview:', user.overview());
        console.log('Heroes: ', user.heroes());
        console.log('Roles: ', user.roles());
        console.log('Raw: ', user.raw());
    } catch (e) {
        console.log(e);
    }
};

test();
