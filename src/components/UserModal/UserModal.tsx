import React, {useState} from 'react'
import s from './UserModal.module.scss'
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

interface Props {
    title: string;
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
    acceptClick: (name: string, login: string, role: number) => void;
}

export const UserModal = ({isOpen, setIsOpen, acceptClick, title}: Props) => {

    const [role, setRole] = useState("0");
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [isError, setIsError] = useState(false)

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
    };

    const modalClasses = [s.modal, isOpen ? s.active : " "];

    return (
        <div className={modalClasses.join(' ')} onClick={() => setIsOpen(false)}>
            <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                <h2 className={s.modal__title}>{title}</h2>
                <TextField
                    id="outlined-basic"
                    label="Имя"
                    variant="outlined"
                    color={isError ? 'error' : "primary"}
                    value={name}
                    onChange={(e) => {
                        setIsError(false)
                        setName(e.target.value)
                    }}
                    helperText={isError ? "Обязательное поле" : ""}
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Логин"
                    variant="outlined"
                    color={isError ? 'error' : "primary"}
                    value={login}
                    onChange={(e) => {
                        setIsError(false)
                        setLogin(e.target.value)
                    }}
                    helperText={isError ? "Обязательное поле" : ""}
                    required
                />
                <FormControl variant="filled">
                    <InputLabel id="demo-simple-select-filled-label">Роль в системе</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        label="Роль в системе"
                        value={role.toString()}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Администратор</MenuItem>
                        <MenuItem value={1}>Пользователь</MenuItem>
                    </Select>
                </FormControl>
                <div className={s.buttonsContainer}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setIsOpen(false)}
                    >
                        Отменить
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            if(name && login && role){
                                acceptClick(name, login, Number(role))
                            } else {
                                setIsError(true)
                            }
                        }}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}