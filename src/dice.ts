import {GameActions, IEvaluateDiceResult, IStore} from "./useStore";

const rollDice = () => Math.floor(Math.random() * (6)) + 1;

type IDicesRollResult = [number, number];

const isSameValue = (roll: IDicesRollResult) => roll[0] === roll[1];


const onSameRollValue = (value: number): IEvaluateDiceResult => {
  switch (value) {
    case 1:
      console.error('Player skipped turn not implemented, yet!');
      return { action: GameActions.SkipTurn, message: 'Hráč přeskočí příští kolo', roll: value }
    case 2:
      return { action: GameActions.GiveEgg, message: 'Dal jste vajíčko jinému hráči', roll: value }
    case 3:
      return { action: GameActions.GiveChicken, message: 'Dal jste kuře jinému hráči', roll: value }
    case 4:
      return { action: GameActions.RemoveEggs, message: 'Všechna vejce Vám snědla lasice!', roll: value }
    case 5:
      return { action: GameActions.RemoveChickens, message: 'Všechny kuřata utekla z kurníku!', roll: value }
    case 6:
      return { action: GameActions.FoxAttack, message: 'Liška běží k Táboru... a také k tvému kruníku!', roll: value }
  }
}

const onSingleRollValue = (value: number): IEvaluateDiceResult => {
  switch (value) {
    case 1:
    case 2:
    case 3:
      return { action: GameActions.AddEgg, message: 'Obdržel jste vajíčko', roll: value };
    case 4:
    case 5:
      return { action: GameActions.AddChicken, message: 'Obdržel jste kuře', roll: value };
    case 6:
      return { action: GameActions.AddHen, message: 'Obdržel jste slepici', roll: value };
  }
}

export const diceService = () => {
  return {
    roll: (): IDicesRollResult => {
      return [rollDice(), rollDice()];
    },
    evaluateRoll: (roll: IDicesRollResult): IEvaluateDiceResult[] => {
      const [firstValue, secondValue] = roll;
      if (isSameValue(roll)) {
        return [onSameRollValue(firstValue)];
      }
      return [onSingleRollValue(firstValue), onSingleRollValue(secondValue)];
    }
  };
};
