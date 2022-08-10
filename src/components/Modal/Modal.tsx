import {Button, Paper, TextField} from '@mui/material';
import React, {useState} from 'react'
import s from "./Modal.module.scss"

interface Props {
    title: string;
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
}

export const Modal = ({title, isOpen, setIsOpen}: Props) => {
    const modalWrapperClasses = [s.modalWrapper, isOpen ? s.active : " "];
    const modalClasses = [s.modal, isOpen ? s.active : " "];
    return (
        <div
            onClick={() => setIsOpen(false)}
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
                    label="Наименование"
                    variant="outlined"
                    required
                />
                <div className={s.modal__buttons}>
                    <Button
                        className='submitBtn'
                        color="secondary"
                        onClick={() => setIsOpen(false)}
                    >Отменить</Button>
                    <Button
                        className='submitBtn'
                        color="primary"
                        onClick={() => {setIsOpen(false);
                            console.log(isOpen)}}
                    >Сохранить</Button>
                </div>
            </Paper>
        </div>
    )
}