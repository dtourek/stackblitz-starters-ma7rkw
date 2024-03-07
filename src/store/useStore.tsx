import {Dispatch, useContext} from "react";
import {IReducerActions, IStore} from "./interface";
import {GameActions, GameStates} from "./enum";
import {StoreContext} from "./StoreProvider";
import {canTradeChicken, canTradeEggs, canTradeHens, getCurrentPlayer, hasWon} from "./utils";
import {config} from "../config";


export const initStore: IStore = {
    activePlayerId: 0,
    turn: 1,
    gameState:  GameStates.TradeOrRoll,
    players: [],
}

export const storeReducer = (state: IStore, payload: IReducerActions): IStore => {
    const currentPlayer = state.players.find((player) => player.id === state.activePlayerId);

    switch (payload.action) {
        // Game states
        case GameStates.StartGame:
            return { ...state, gameState: GameStates.TradeOrRoll, players: payload.payload.playerNames.map((playerName, index) => ({ id: index, name: playerName, eggs: 0, chickens: 0, hens: 0, rooster: false, rolls: [] })) };
       case GameStates.EndGame:
           return initStore;
        case GameStates.TradeOrRoll:
            // Zobrazit dialogovy okno, co chce hrac udelat
            // if(trade) trade();
            // else roll();
            break;
        case GameStates.EvaluateEndOfTurn:
            if(hasWon(getCurrentPlayer(state), config)) {
                return { ...state, gameState: GameStates.EndGame };
            }
            return {
                ...state,
                turn: Math.max(...state.players.map((player) => player.rolls.length + 1)),
                activePlayerId: (state.activePlayerId + 1) % state.players.length,
                gameState: GameStates.TradeOrRoll,
                players: payload.payload?.roll ? state.players.map((player) => currentPlayer.id === player.id ? {...player, rolls: [ ...player.rolls, payload.payload.roll ] } : player) : state.players
            };
        // Game Actions
        case GameActions.SkipTurn:
            // TODO implement
            console.error('Player skipped turn not implemented, yet!');
            return state;
        case GameActions.Reset:
            return initStore
        case GameActions.AddEgg:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, eggs: player.eggs + 1 } : player) };
        case GameActions.AddChicken:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chickens: player.chickens + 1 } : player) };
        case GameActions.AddHen:
            return { ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, hens: player.hens + 1 } : player) };
        case GameActions.GiveEgg:
            console.log('GiveEgg', payload);
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, eggs: player.eggs + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, eggs: player.eggs < 0 ? player.eggs - 1 : 0}
                }
                return player;
            })};
        case GameActions.GiveChicken:
            return {...state, players: state.players.map((player) => {
                if (player.id === payload.payload.targetPlayerId) {
                    return {...player, chickens: player.chickens + 1}
                }
                if (player.id === state.activePlayerId) {
                    return {...player, chickens: player.chickens < 0 ? player.chickens - 1 : 0}
                }
                return player;
            })};
        case GameActions.RemoveEggs:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, eggs: 0 } : player)};
        case GameActions.RemoveChickens:
            return {...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, chickens: 0 } : player)};
        case GameActions.FoxAttack:
            const hasRooster = currentPlayer?.rooster;
            if (hasRooster) {
                console.log('Fox attack was prevented by rooster');
                return {
                    ...state, players: state.players.map((player) => state.activePlayerId === player.id ? { ...player, rooster: false } : player)
                };
            }
            console.log('Fox attack was successful. All hens are gone!');
            return {
                ...state,
                players: state.players.map((player) => currentPlayer.id === state.activePlayerId  ? { ...player, hens: 0 } : player)
            };
        case GameActions.TradeEggs:
            if (!canTradeEggs(currentPlayer)) {
                return state;
            }
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    eggs: player.eggs -= 3,
                    chickens: player.chickens += 1,
                } : player)
            };
        case GameActions.TradeChickens:
            if (!canTradeChicken(currentPlayer)) {
                return state;
            }
            return {
                ...state, players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    chickens: player.chickens -= 3,
                    hens: player.hens += 1
                } : player)
            };
        case GameActions.TradeHens:
            if (!canTradeHens(currentPlayer)) {
                return state;
            }
            return {
                ...state,
                players: state.players.map((player) => state.activePlayerId === player.id ? {
                    ...player,
                    hens: player.hens - 3,
                    rooster: true,
                } : player)
            };
        default:
            console.error('Unknown action', payload)
            return state;
    }
}

export const useStore = () => useContext(StoreContext) as [IStore, Dispatch<IReducerActions>]
