import { AppBar, Button, Tab, Tabs } from '@mui/material'
import {Icon, LatLngExpression, LeafletMouseEvent} from 'leaflet'
import React, {useEffect, useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents} from 'react-leaflet'
import s from './MapPage.module.scss'
import {SwitchButton} from "../../components/UI/SwitchButton/SwitchButton";
import {IPoint} from "../../model/IPoint";
import pointImage from '../../assets/img/point.png'
import { MarkerItem } from '../../components/MarkerItem/MarkerItem'
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
    const [posForNewPoint, setPosForNewPoint] = useState<LatLngExpression>([0,0]);
    const [isPointCreating, setIsPointCreating] = useState(false);


    const [editingPoint, setEditingPoint] = useState<IPoint | null>(null);
    const [isPointEditing, setIsPointEditing] = useState(false);


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

    const addPoint = (name:string) => {
        const newPoint: IPoint = {
            name,
            id: Date.now(),
            position: posForNewPoint
        }

        setEndpoints([...endpoints, newPoint]);
        setIsPointCreating(false)
    }

    const editPoint = (name:string) => {
        if(editingPoint !== null) {
            // @ts-ignore
            const id = editingPoint.id
            let existingPoint = endpoints[id];
            existingPoint = {
                ...existingPoint,
                name
            }
            endpoints[id] = existingPoint;
            setEndpoints([...endpoints]);
            setIsPointEditing(false)
        } else {
            return
        }
    }

    const removePoint = (id: number) => {
        const filteredEndpoints = endpoints.filter((endp) => {
            return endp.id !== id;
        })

        setEndpoints(filteredEndpoints)
    }

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
                acceptClick={(name: string) => addPoint(name)}
                setIsOpen={setIsPointCreating}
                title={"Создание точки назначения"}
            />


            <Modal
                isOpen={isPointEditing}
                acceptClick={(name: string) => editPoint(name)}
                defaultName={editingPoint?.name}
                setIsOpen={setIsPointEditing}
                title={"Изменение точки назначения"}
            />

            <MapContainer
                className={s.container}
                center={position} zoom={zoomLevel}
                minZoom={14}
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
                            <Tooltip key={marker.name+isPointsNamesDisplay} sticky={!isPointsNamesDisplay} permanent={isPointsNamesDisplay}>
                                <span>{marker.name}</span>
                            </Tooltip>
                            <Popup>
                                <Button disabled={!isEditing} size="small" onClick={() => {
                                    setEditingPoint(marker)
                                    setIsPointEditing(true)
                                }}>
                                    Изменить</Button><br />
                                <Button onClick={() => removePoint(marker.id)} disabled={!isEditing} size="small">Удалить</Button>
                            </Popup>
                        </Marker>
                    ))
                }
                <SetBoundsDefault zoomLevel={zoomLevel} setZoomLevel={setZoomLevel}/>
            </MapContainer>
        </section>
    )
}