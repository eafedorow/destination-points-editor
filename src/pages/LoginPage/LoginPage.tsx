import React from 'react'
import s from './LoginPage.module.scss'
import {Form} from "../../components/Form/Form";
interface Props {

}

export const LoginPage = (props: Props) => {
    return (
        <section className={s.loginPage}>
            <Form/>
        </section>
    )
}