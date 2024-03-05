import {IPlayer} from "../interface";
import {IStore} from "./interface";

export const canTradeEggs = (player: IPlayer) => player.egg >= 3;
export const canTradeChicken = (player: IPlayer) => player.chicken >= 3;
export const canTradeHens = (player: IPlayer) => player.hens >= 3 && !player.rooster
export const getCurrentPlayer = (store: IStore) => store.players.find((player) => player.id === store.activePlayerId);
export const hasPlayerEmptySore = (player: IPlayer) => player.egg === 0 && player.chicken === 0 && player.hens === 0
