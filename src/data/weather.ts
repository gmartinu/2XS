import api from 'data/api';
import { openWeatherMapToken } from 'config';

class Weather {
    find = (lat: number, lng: number) => {
        return api().get(`find?lat=${lat}&lon=${lng}&cnt=15&APPID=${openWeatherMapToken}`)
    }
}

export default new Weather();