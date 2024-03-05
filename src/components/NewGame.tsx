import { ChangeEvent, useState } from "react";
import {useStore} from "../store/useStore";
import {GameStates} from "../store/enum";

interface IForm { name: string; value: string }

export const NewGame = () => {
    const [fields, setFields] = useState<IForm[]>([{ name: 'player0', value: 'Player 1' }])
    const [_, dispatch] = useStore()
    const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFields(fields.map((field) => field.name === name ? { ...field, value } : field))
    }

    const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const playerNames = []
        formData.forEach((value, key) => {
            playerNames.push(value)
        })
        dispatch({ action: GameStates.StartGame, payload: { playerNames: playerNames } })
    }

    return (
        <div>
            <h1>New Game</h1>
            <p>Enter Player names</p>
            <form onSubmit={onSubmit}>
                {fields?.map((field, index) => <input name={field.name} value={field.value} onChange={onFieldChange} />)}
                <button onClick={() => setFields([...fields, { name: `player${fields.length}`, value: `Player ${fields.length + 1}` }])} type="button">Add Player</button>
                <button type="submit">Start Game</button>
            </form>
        </div>
    )
}
