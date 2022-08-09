import { AppBar, Tab, Tabs } from '@mui/material'
import { LatLngExpression } from 'leaflet'
import React, {useState} from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import s from './MapPage.module.scss'
import {SwitchButton} from "../../components/UI/SwitchButton/SwitchButton";

interface Props {

}

export const MapPage = (props: Props) => {
    const position: LatLngExpression = [51.505, -0.09];

    const [isEditing, setIsEditing] = useState(false);

    return (
        <section className={s.mapPage}>
            <AppBar position="static">
                <Tabs>
                    <Tab label="Точки назначения" />
                    <Tab label="Пользователи" />
                </Tabs>
            </AppBar>

            <div className={s.editingBlock}>
                <span className={s.editingBlock__title}>Режим редактирования</span>
                <SwitchButton isToggled={isEditing} onToggle={() => setIsEditing(!isEditing)} rounded/>
            </div>
            <MapContainer
                className={s.container}
                center={position} zoom={13}>
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </section>
    )
}