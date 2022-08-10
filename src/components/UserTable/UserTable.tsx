import {
    Button,
    IconButton,
    Tooltip
} from '@mui/material'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, {useState} from 'react'
import s from './UserTable.module.scss'
import {IUser} from "../../model/IUser";

interface Props {

}

const mockUsers: IUser[] = [
    {
        id: 1,
        login: 'test1@test.ru',
        name: 'Evgenii',
        role: 0
    },
    {
        id: 2,
        login: 'test2@test.ru',
        name: 'Admin',
        role: 1
    },
]

export const UserTable = (props: Props) => {
    const [users, setUsers] = useState<IUser[]>(mockUsers);
    return (
        <div className={s.tableWrapper}>
            <Button
                variant="outlined"
                color="primary"
            >
                Добавить
            </Button>
            <TableContainer className={s.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left">Номер</TableCell>
                            <TableCell align="left">Логин</TableCell>
                            <TableCell align="left">Имя</TableCell>
                            <TableCell align="left">Роль</TableCell>
                            <TableCell width={32} ></TableCell>
                            <TableCell width={32}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.login}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.role === 0 ? ("Пользователь") : ("Администратор")}</TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Изменить">
                                        <IconButton aria-label="изменить"  disabled={row.id === 1} >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Удалить">
                                        <IconButton aria-label="удалить">
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}