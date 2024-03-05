import {IDicesRollResult} from "./dice";
import { GameActions } from "./store/enum";

export interface IEvaluateDiceResult {
    roll: number;
    action: GameActions;
    message: string;
}

export interface IPlayer {
    id: number;
    name: string;
    rolls: IDicesRollResult[];
    hens: number;
    chicken: number;
    egg: number;
    rooster: boolean;
}
