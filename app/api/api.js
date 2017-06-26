import { AsyncStorage } from 'react-native';
import * as Config from '../constants/config';
export async function getMyUser() {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/get_my_user`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    response[0].username = username;
    response[0].country = userCountry;
    return response[0];
}
export async function getLand() {
    let response = await fetch(`http://${Config.SERVER_IP}:${Config.PORT}/get_map`,)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function getMyCountry() {
  const userCountry = await AsyncStorage.getItem('@UserCountry');
  const username = await AsyncStorage.getItem('@UserName');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/get_my_country`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'country': userCountry,
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    response[0].username = username;
    response[0].country = userCountry;
    return response[0];
}
export async function api_buyHint(cost, puzzle, puzzle_result) {
  const userCountry = await AsyncStorage.getItem('@UserCountry');
  const username = await AsyncStorage.getItem('@UserName');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/buy_hint`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'puzzle': puzzle,
          'puzzle_result': puzzle_result,
          'cost': cost,
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function api_giveScore(K, password, puzzle_result, puzzle) {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/puzzle_give_score`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'K': K,
          'password': password,
          'puzzle_result': puzzle_result,
          'puzzle': puzzle,
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function api_giveScoreDay3(K, Fire, Water, Wood, Stone, Seed, password) {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/give_score_day3`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'K': K,
          'fire': Fire,
          'water': Water,
          'wood': Wood,
          'stone': Stone,
          'seed': Seed,
          'password': password
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function api_buyResource(Money, Resource, leftMoney) {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/buy_resource`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'K': Money,
          'resource': Resource,
          'leftK': leftMoney
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function api_buyLand(fire, water, wood, stone, seed, map_name) {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/buy_land`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'mapName': map_name,
          'fire': fire,
          'water': water,
          'wood': wood,
          'stone': stone,
          'seed': seed
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function api_qrcode(fire, water, wood, stone, seed, qrcodeName) {
  const username = await AsyncStorage.getItem('@UserName');
  const userCountry = await AsyncStorage.getItem('@UserCountry');
    let response = await fetch(
      `http://${Config.SERVER_IP}:${Config.PORT}/scan_qrcode`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'name': username,
          'country': userCountry,
          'qrcodeName': qrcodeName,
          'fire': fire,
          'water': water,
          'wood': wood,
          'stone': stone,
          'seed': seed
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response;
}
export async function getFlagFromSetting() {
    let response = await fetch(`http://${Config.SERVER_IP}:${Config.PORT}/get_setting`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    return response[0];
}
