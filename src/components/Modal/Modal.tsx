import {Button, Paper, TextField} from '@mui/material';
import React, {useState} from 'react'
import s from "./Modal.module.scss"
import {IPoint} from "../../model/IPoint";

interface Props {
    title: string;
    defaultName: string;
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
    acceptClick: (name: string) => void;
}

export const Modal = ({title, defaultName, isOpen, setIsOpen, acceptClick}: Props) => {
    const [pointName, setPointName] = useState("");
    const [error, setError] = useState(false)

    const modalWrapperClasses = [s.modalWrapper, isOpen ? s.active : " "];
    const modalClasses = [s.modal, isOpen ? s.active : " "];

    function closeModal() {
        setPointName("")
        setIsOpen(false)
    }

    return (
        <div
            onClick={closeModal}
            className={modalWrapperClasses.join(" ")}
        >
            <Paper
                className={modalClasses.join(' ')}
                elevation={8}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={s.modal__title}>{title}</h2>
                <TextField
                    className={s.modal__namefield}
                    id="outlined-basic"
                    color={error ? 'error' : "primary"}
                    value={pointName ? pointName : defaultName}
                    defaultValue={defaultName}
                    onChange={(e) => {
                        setError(false)
                        setPointName(e.target.value)
                    }}
                    label="Наименование"
                    variant="outlined"
                    helperText={error ? "Введите наименование" : ""}
                    required
                />
                <div className={s.modal__buttons}>
                    <Button
                        className='submitBtn'
                        color="secondary"
                        onClick={closeModal}
                    >Отменить</Button>
                    <Button
                        className='submitBtn'
                        color="primary"
                        onClick={() => {
                            if(pointName) {
                                acceptClick(pointName)
                            } else {
                                setError(true)
                            }
                        }}
                    >Сохранить</Button>
                </div>
            </Paper>
        </div>
    )
}