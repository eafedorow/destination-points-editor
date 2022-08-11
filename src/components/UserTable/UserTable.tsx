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
import {UserModal} from "../UserModal/UserModal";
import {marker} from "leaflet";

interface Props {

}

const mockUsers: IUser[] = [
    {
        id: 1,
        login: 'test1@test.ru',
        name: 'Admin',
        role: 1
    },
    {
        id: 2,
        login: 'test2@test.ru',
        name: 'Evgenii',
        role: 0
    },

]



export const UserTable = (props: Props) => {
    const [users, setUsers] = useState<IUser[]>(mockUsers);
    const [isAddUser, setIsAddUser] = useState(false);
    const [isEditUser, setIsEditUser] = useState(false);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    function addUser(name: string, login: string, role: number) {
        const newUser: IUser = {
            id: Date.now(),
            name,
            login,
            role
        }
        setUsers([...users, newUser]);
    }

    function editUser(name: string, login: string, role: number) {

        if(editingUser !== null){
            // ts-ignore because of stupid linter.
            //@ts-ignore
            let existingUser = users[editingUser?.id];
            existingUser = {
                ...existingUser,
                name,
                login,
                role
            }
            // ts-ignore because of stupid linter.
            //@ts-ignore
            users[editingUser?.id] = existingUser;
            setUsers([...users]);
        }

    }

    function removeUser(id: number) {
        const filteredUsers: IUser[] = users.filter((user) => {
            return user.id !== id;
        })
        setUsers(filteredUsers)
    }

=======
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
                onClick={() => setIsAddUser(true)}
            >
                Добавить
            </Button>

            <UserModal
                title={"Добавление пользователя"}
                isOpen={isAddUser}
                setIsOpen={setIsAddUser}
                acceptClick={(name: string, login: string, role: number) => {
                    addUser(name, login, role)
                    setIsAddUser(false)
                }}
            />

            <UserModal
                title={"Редактирование пользователя " + editingUser?.login}
                isOpen={isEditUser}
                setIsOpen={setIsEditUser}
                acceptClick={(name: string, login: string, role: number) => {
                    editUser(name, login, role)
                    setIsEditUser(false)
                }}
            />

=======
            >
                Добавить
            </Button>
            <TableContainer className={s.table} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell width={20} align="left">Номер</TableCell>
                            <TableCell align="left">Логин</TableCell>
                            <TableCell  align="left">Имя</TableCell>
                            <TableCell align="left">Роль</TableCell>
                            <TableCell width={20} ></TableCell>
                            <TableCell width={20}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{index + 1}</TableCell>
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
                                        <IconButton aria-label="изменить"  disabled={row.id === 1} onClick={() => {
                                            setEditingUser(row)
                                            setIsEditUser(true)
                                        }}>
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left">
                                    <Tooltip title="Удалить">
                                        <IconButton aria-label="удалить" onClick={() => {removeUser(row.id)}}>
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