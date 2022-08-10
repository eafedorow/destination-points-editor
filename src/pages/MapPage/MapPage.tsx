import { AppBar, Button, Tab, Tabs } from '@mui/material'
import {Icon, LatLngExpression, LeafletMouseEvent} from 'leaflet'
import React, {useEffect, useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents} from 'react-leaflet'
import s from './MapPage.module.scss'
import {SwitchButton} from "../../components/UI/SwitchButton/SwitchButton";
import {IPoint} from "../../model/IPoint";
import pointImage from '../../assets/img/point.png'
import { MarkerItem } from '../../components/MarkerItem/MarkerItem'
import {CustomTooltip} from "../../components/CustomTooltip/CustomTooltip";
import {SetBoundsDefault} from "../../components/SetBoundsDefault/SetBoundsDefault";
import {Modal} from "../../components/Modal/Modal";

interface Props {

}

const mockPoints: IPoint[] = [
    {
        id: 0,
        name: 'Ворота 1',
        position: [59.132111, 37.854814],
    },
    {
        id: 1,
        name: 'Ворота 2',
        position: [59.129761, 37.868440],
    },
    {
        id: 2,
        name: 'Инструментальный цех',
        position: [59.130390, 37.860070],
    },
]


export const MapPage = (props: Props) => {
    const position: LatLngExpression = [59.132033, 37.860372];

    const [endpoints, setEndpoints] = useState<IPoint[]>(mockPoints);
    const [isEditing, setIsEditing] = useState(false);
    const [posForNewPoint, setPosForNewPoint] = useState<LatLngExpression | null>(null);

    const [isPointCreating, setIsPointCreating] = useState(false);
    const [isPointsNamesDisplay, setIsPointsNamesDisplay] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [value, setValue] = useState(0);

    const mapClick = (e: LeafletMouseEvent) => {
        if (isEditing) {
            setPosForNewPoint(e.latlng);

            setIsPointCreating(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        if(newValue==1){
            setIsEditing(false);
        }
    };

    return (
        <section className={s.mapPage}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Точки назначения" />
                    <Tab label="Пользователи" />
                </Tabs>
            </AppBar>
            <div className={s.editingBlock}>
                <span className={s.editingBlock__title}>Режим редактирования</span>
                <SwitchButton isToggled={isEditing} onToggle={() => setIsEditing(!isEditing)} rounded/>
                <span className={s.editingBlock__title}>Отобразить все наименования точек</span>
                <SwitchButton isToggled={isPointsNamesDisplay} onToggle={() => setIsPointsNamesDisplay(!isPointsNamesDisplay)} rounded/>
            </div>


            <Modal
                isOpen={isPointCreating}
                setIsOpen={setIsPointCreating}
                title={"Создание точки назначения"}
            />

            {/*<MarkerCreationModal*/}
            {/*    isOpen={updateMarkerDialogState}*/}
            {/*    title={"Изменение точки назначения"}*/}
            {/*    markerName={initDialogMarker?.name ?? ""}*/}
            {/*    onSaveClick={onUpdateMarkerDialogSaveClick}*/}
            {/*    onCancelClick={onUpdateMarkerDialogCancelClick}*/}
            {/*/>*/}

            <MapContainer
                className={s.container}
                center={position} zoom={zoomLevel}
                minZoom={15}
            >
                <MarkerItem onMapClick={mapClick} />
                <TileLayer
                    noWrap={false}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {zoomLevel >= 15 &&
                    endpoints.map((marker, index) => (
                        <Marker
                            position={marker.position}
                            key={marker.id}
                            icon={new Icon({iconUrl: pointImage, iconSize: [32, 32], iconAnchor: [20, 20]})}
                        >
                            <CustomTooltip name={marker.name} isPermanent={isPointsNamesDisplay}/>
                            <Popup>
                                <Button disabled={!isEditing} size="small">Изменить</Button><br />
                                <Button disabled={!isEditing} size="small">Удалить</Button>
                            </Popup>
                        </Marker>
                    ))
                }
                <SetBoundsDefault zoomLevel={zoomLevel} setZoomLevel={setZoomLevel}/>
            </MapContainer>
        </section>
    )
}