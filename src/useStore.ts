import {useReducer} from "react";
import {diceService} from "./dice";

export interface IStore {
    activePlayerId: number;
    gameState: IGameState;
    players: IPlayer[];
}

interface IPlayer {
    id: number;
    name: string;
    rolls: [number, number][];
    hens: number;
    chicken: number;
    egg: number;
    rooster: true;
}

type IGameState =
    | 'switchTurns'
    | 'tradeOrRoll'
    | 'roll'
    | 'trade'
    | 'evaluateEndOfTurn';


type IRoll = {action: 'roll'}
type ITrade = {action: 'trade', payload: { playerId: number, trade: 'egg' | 'chicken' | 'hens' | 'rooster' }}
type ISwitchTurns = {action: 'switchTurns'}
type ITradeOrRoll = {action: 'tradeOrRoll'}
type IEvaluate = {action: 'evaluateEndOfTurn'}

type IReducerActions = IRoll | ITrade | ISwitchTurns | ITradeOrRoll | IEvaluate;

const storeReducer = (state: IStore, payload: IReducerActions) => {
    const dice = diceService()

    switch (payload.action) {
        case 'switchTurns':
            return { ...state, activePlayerId: (state.activePlayerId + 1) % state.players.length, gameState: 'tradeOrRoll' };
        case 'tradeOrRoll':
            // Zobrazit dialogovy okno, co chce hrac udelat
            // if(trade) trade();
            // else roll();
            break;
        case 'roll':
            return { ...state, gameState: 'evaluateEndOfTurn', players: state.players.map((player) => state.activePlayerId === player.id ? {
                      ...player,
                      rolls: [...player.rolls, dice.roll()] } : player) };
        case 'trade':
            // TODO add trade system
            return { ...state, gameState: 'evaluateEndOfTurn' };

        case 'evaluateEndOfTurn':
            return { ...state, gameState: 'switchTurns' };

    }
}

export const useStore = () => useReducer(storeReducer, {
    activePlayerId: 0,
    gameState: 'switchTurns',
    players: [{ id: 0, name: 'Pepa', egg: 0, chicken: 0, hens: 0, rooster: true, rolls: [] }],
})
