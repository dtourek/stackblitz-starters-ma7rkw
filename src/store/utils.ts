import {IConfig, IPlayer} from "../interface";
import {IStore} from "./interface";
import {GameStates} from "./enum";

export const canTradeEggs = (player: IPlayer) => player.eggs >= 3;
export const canTradeChicken = (player: IPlayer) => player.chickens >= 3;
export const canTradeHens = (player: IPlayer) => player.hens >= 3 && !player.rooster
export const getCurrentPlayer = (store: IStore) => store.players.find((player) => player.id === store.activePlayerId);
export const hasPlayerEmptySore = (player: IPlayer) => player.eggs === 0 && player.chickens === 0 && player.hens === 0
export const hasWon = (player: IPlayer, config: IConfig) => player[config.win.type] >= config.win.amount;
export const hasGameEnded = (store: IStore, config: IConfig) => store.players.some((player) => hasWon(player, config));
export const hasNoPlayers = (store: IStore) => !store.players.length
export const isGameInEvaluateEndOfTurn = (store: IStore) => store.gameState === GameStates.EvaluateEndOfTurn
