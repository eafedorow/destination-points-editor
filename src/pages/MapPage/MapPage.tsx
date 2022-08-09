import { AppBar, Tab, Tabs } from '@mui/material'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import s from './MapPage.module.scss'

interface Props {

}

export const MapPage = (props: Props) => {
    const position: LatLngExpression = [51.505, -0.09]
    return (
        <div>
            <AppBar position="static">
                <Tabs>
                    <Tab label="Точки назначения" />
                    <Tab label="Пользователи" />
                </Tabs>
            </AppBar>
            <MapContainer
                className={s.container}
                center={position} zoom={13}>
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

        </div>
    )
}