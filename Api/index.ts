import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, {HeadersDefaults} from 'axios';
import {foodApi} from './foodApi';

const request = Axios.create();

request.defaults.baseURL = 'https://prisma-food.herokuapp.com';

const setHeaders = async (token: string) => {
  (request.defaults.headers as HeadersDefaults & {token: string}).token = token;
  await AsyncStorage.setItem('token', token);
};

const rehydrate = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setHeaders(token);
  }
};

const httpClinet = {
  foodApi: foodApi(request),
};

export {request, setHeaders, rehydrate, httpClinet};
