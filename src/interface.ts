import {IDicesRollResult} from "./dice";
import { GameActions } from "./store/enum";

export interface IEvaluateDiceResult {
    roll: number;
    action: GameActions;
    message: string;
}

interface IAnimals {
    hens: number;
    chickens: number;
    eggs: number;
    rooster: boolean;
}

export interface IPlayer extends IAnimals {
    id: number;
    name: string;
    rolls: IDicesRollResult[];
}

export interface IConfig {
    win: { type: keyof IAnimals, amount: number | boolean },
}
