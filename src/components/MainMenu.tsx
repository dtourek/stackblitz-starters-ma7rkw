import { ChangeEvent, useState } from "react";
import {useStore} from "../store/useStore";
import {GameStates} from "../store/enum";
import {Button} from "./Button";

interface IForm { name: string; value: string }

export const MainMenu = () => {
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
                <div style={{display: 'flex', flexFlow: 'column'}}>
                    {fields?.map((field, index) => <input style={{ marginBottom: 10 }} key={field.name} name={field.name} value={field.value} onChange={onFieldChange} />)}
                </div>
                <Button onClick={() => setFields([...fields, { name: `player${fields.length}`, value: `Player ${fields.length + 1}` }])} type="button" buttonType="secondary">Add Player</Button>
                <Button type="submit" buttonType="primary">Start Game</Button>
            </form>
        </div>
    )
}
