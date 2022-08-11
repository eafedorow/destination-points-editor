import React from 'react'
import s from './Form.module.scss'
import {Button, InputLabel, Paper, TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface Props {

}


export const Form = (props: Props) => {

    const navigate = useNavigate();

    function loginHandler() {
        navigate('/map')
    }
    return (
        <Paper className={s.formWrapper} elevation={6}>
            <h1>Авторизация</h1>
            <form className={s.form}>
                    <TextField
                        className={s.form__textField}
                        id="outlined-basic"
                        label="Логин"
                        defaultValue="admin"
                        variant="outlined"
                        required
                    />
                    <TextField
                        className={s.form__textField}
                        id="outlined-password-input"
                        label="Пароль"
                        defaultValue="admin"
                        type="password"
                        variant="outlined"
                        required
                    />
                    <Button
                        className='submitBtn'
                        variant="outlined"
                        color="primary"
                        onClick={loginHandler}
                    >Вход</Button>
            </form>
            <span className={s.form__annotation}>
                Данная версия веб-приоложения является тестовой. Все приведенные точки назначения не отображают реального местоположения объектов предприятия.
                Для входа используйте: <br/>
                Логин: <b>admin</b> <br/>
                Пароль: <b>admin</b> <br/>
            </span>
        </Paper>

    )
}