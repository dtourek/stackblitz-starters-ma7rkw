import {useReducer, createContext, useContext, Dispatch} from "react";
import {IDicesRollResult} from "../dice";
import {StoreContext} from "../providers/StoreProvider";

export interface IEvaluateDiceResult {
    roll: number;
    action: GameActions;
    message: string;
}

export interface IStore {
    activePlayerId: number;
    gameState: GameStates;
    players: IPlayer[];
}

interface IPlayer {
    id: number;
    name: string;
    rolls: IDicesRollResult[];
    hens: number;
    chicken: number;
    egg: number;
    rooster: boolean;
}

export enum GameStates {
  StartGame = 'startGame',
  SwitchPlayer = 'switchPlayer',
  TradeOrRoll = 'tradeOrRoll',
  EvaluateEndOfTurn = 'evaluateEndOfTurn',
  EndGame = 'endGame'
}

export enum GameActions {
    AddEgg = 'addEgg',
    AddChicken = 'addChicken',
    AddHen ='addHen',
    SkipTurn = 'skipTurn',
    FoxAttack = 'foxAttack',
    GiveEgg = 'giveEgg',
    GiveChicken = 'giveChicken',
    RemoveEggs = 'removeEggs',
    RemoveChickens = 'removeChickens',
    TradeEggs = 'tradeEggs',
    TradeChicken = 'tradeChicken',
    EndTurn = 'endTurn',
    Reset = 'reset'
}

// TODO implement trade system
const canTradeEggs = (player: IPlayer) => player.egg >= 3;
const canTradeChicken = (player: IPlayer) => player.chicken >= 3;
const tradeEggs = (player: IPlayer) => {
    const result = { ...player };
    result.egg -= 3;
    result.chicken += 1;
}

type IStartGame = { action: GameStates.StartGame, payload: { playerNames: string[] } }
type IEndGame = { action: GameStates.EndGame }
type ISwitchTurns = { action: GameStates.SwitchPlayer }
type ITradeOrRoll = { action: GameStates.TradeOrRoll }
type IEvaluate = { action: GameStates.EvaluateEndOfTurn, payload: { roll: IDicesRollResult } }

type ISkipTurn = { action: GameActions.SkipTurn }
type IFoxAttack = { action: GameActions.FoxAttack }
type IAddEgg = { action: GameActions.AddEgg }
type IAddChicken = { action: GameActions.AddChicken }
type IAddHen = { action: GameActions.AddHen }
export type IGiveEgg = { action: GameActions.GiveEgg, payload: { targetPlayerId: number } }
export type IGiveChicken = { action: GameActions.GiveChicken, payload: { targetPlayerId: number } }
type IRemoveEggs = { action: GameActions.RemoveEggs }
type IRemoveChickens = { action: GameActions.RemoveChickens }
type ITradeEggs = { action: GameActions.TradeEggs }
type ITradeChicken = { action: GameActions.TradeChicken }
type IEndTurn = { action: GameActions.EndTurn }
type IReset = { action: GameActions.Reset }

type IReducerActions = IStartGame | IEndGame | ISkipTurn | IAddEgg | IAddChicken | IAddHen | IGiveEgg | IGiveChicken | IRemoveEggs | IRemoveChickens | ISwitchTurns | ITradeOrRoll | IEvaluate | ITradeChicken | ITradeEggs | IFoxAttack | IEndTurn | IReset;

export const getCurrentPlayer = (store: IStore) => store.players.find((player) => player.id === store.activePlayerId);
export const hasPlayerEmptySore = (player: IPlayer) => player.egg === 0 && player.chicken === 0 && player.hens === 0

export const initStore: IStore = {
    activePlayerId: 0,
    gameState:  GameStates.TradeOrRoll,
    players: [],
}

export const storeReducer = (state: IStore, payload: IReducerActions): IStore => {
    const currentPlayer = state.players.find((player) => player.id === state.activePlayerId);

    switch (payload.action) {
        // Game states
        case GameStates.StartGame:
            return { ...state, gameState: GameStates.TradeOrRoll, players: payload.payload.playerNames.map((playerName, index) => ({ id: index, name: playerName, egg: 0, chicken: 0, hens: 0, rooster: false, rolls: [] })) };
       case GameStates.EndGame:
           return initStore;
        case GameStates.TradeOrRoll:
            // Zobrazit dialogovy okno, co chce hrac udelat
            // if(trade) trade();
            // else roll();
            break;
        case GameStates.EvaluateEndOfTurn:
            if(getCurrentPlayer(state).hens === 9) {
                return { ...state, gameState: GameStates.EndGame };
            }
            return {
                ...state,
                activePlayerId: (state.activePlayerId + 1) % state.players.length,
                gameState: GameStates.TradeOrRoll,
                players: state.players.map((player) => currentPlayer.id === player.id ? {...player, rolls: [ ...player.rolls, payload.payload.roll ] } : player)
            };
        // Game Actions
        case GameActions.SkipTurn:
            // TODO implement
            console.error('Player skipped turn not implemented, yet!');
            return state;
        case GameActions.Reset:
            return initStore
        case GameActions.AddEgg:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, egg: player.egg + 1 } : player) };
        case GameActions.AddChicken:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chicken: player.chicken + 1 } : player) };
        case GameActions.AddHen:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, hens: player.hens + 1 } : player) };
        case GameActions.GiveEgg:
            console.log('GiveEgg', payload);
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, egg: player.egg + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, egg: player.egg < 0 ? player.egg - 1 : 0}
                }
                return player;
            })};
        case GameActions.GiveChicken:
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, chicken: player.chicken + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, chicken: player.chicken < 0 ? player.chicken - 1 : 0}
                }
                return player;
            })};
        case GameActions.RemoveEggs:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, egg: 0 } : player)};
        case GameActions.RemoveChickens:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chicken: 0 } : player)};
        case GameActions.FoxAttack:
            const hasRooster = currentPlayer?.rooster;
            if (hasRooster) {
                return {
                    ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, rooster: false } : player)
                };
            }
            return {
                ...state,
                players: state.players.map((player) => currentPlayer.id === state.activePlayerId  ? { ...player, hens: 0 } : player)
            };
        case GameActions.TradeEggs:
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    egg: player.egg -= 3,
                    chicken: player.chicken += 1,
                } : player)
            };
        case GameActions.TradeChicken:
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    chicken: player.chicken -= 3,
                    hens: player.hens += 1
                } : player)
            };
        default:
            console.error('Unknown action', payload)
            return state;
    }
}

export const useStore = () => useContext(StoreContext) as [IStore, Dispatch<IReducerActions>]
