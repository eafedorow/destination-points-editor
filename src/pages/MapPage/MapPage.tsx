import {AppBar, Button, Tab, Tabs, useTheme} from '@mui/material'
import {Icon, LatLngExpression, LeafletMouseEvent} from 'leaflet'
import React, {useState} from 'react'
import {MapContainer, Marker, Popup, TileLayer, Tooltip} from 'react-leaflet'
import s from './MapPage.module.scss'
import {SwitchButton} from "../../components/UI/SwitchButton/SwitchButton";
import {IPoint} from "../../model/IPoint";
import pointImage from '../../assets/img/point.png'
import { MarkerItem } from '../../components/MarkerItem/MarkerItem'
import {SetBoundsDefault} from "../../components/SetBoundsDefault/SetBoundsDefault";
import {PointModal} from "../../components/PointModal/PointModal";
import { TabPanel } from '../../components/TabPanel/TabPanel'
import SwipeableViews from 'react-swipeable-views'
import {Tooltip as MUITooltip} from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {UserTable} from "../../components/UserTable/UserTable";
import {useNavigate} from "react-router-dom";
import {HelpModal} from "../../components/HelpModal/HelpModal";


interface Props {

}

const mockPoints: IPoint[] = [
    {
        id: 0,
        name: 'Ворота A-2',
        position: [59.132458, 37.858985],
    },
    {
        id: 1,
        name: 'Ворота C-2',
        position: [59.129761, 37.868440],
    },
    {
        id: 2,
        name: 'Инструментальный цех',
        position: [59.130390, 37.860070],
    },
    {
        id: 3,
        name: 'Проходная №1',
        position: [59.134614, 37.860623],
    },
    {
        id: 4,
        name: 'Проходная №2',
        position: [59.132836, 37.873129],
    },
    {
        id: 5,
        name: 'Проходная №3',
        position: [59.128436, 37.860283],
    },
    {
        id: 6,
        name: 'ОАО Юниспринг',
        position: [59.131476, 37.848765],
    },
    {
        id: 7,
        name: 'Открытые склады',
        position: [59.130240, 37.853284],
    },
    {
        id: 8,
        name: 'Стоматология',
        position: [59.133473, 37.872478],
    },
    {
        id: 9,
        name: 'Столовая',
        position: [59.131798, 37.866194],
    },
    {
        id: 10,
        name: 'Парковка',
        position: [59.128860, 37.861919],
    },
    {
        id: 11,
        name: 'Ворота A-1',
        position: [59.134301, 37.855435],
    },
    {
        id: 12,
        name: 'Ворота A-3',
        position: [59.132413, 37.855604],
    },
    {
        id: 13,
        name: 'Ворота A-4',
        position: [59.134221, 37.850799],
    },
    {
        id: 14,
        name: 'Автомастерская',
        position: [59.132929, 37.849433],
    },
    {
        id: 15,
        name: 'Ворота C-3',
        position: [59.129786, 37.861528],
    },
    {
        id: 16,
        name: 'Ворота B-2',
        position: [59.132354, 37.863652],
    },
    {
        id: 17,
        name: 'Ворота B-1',
        position: [59.133768, 37.863462],
    },
    {
        id: 18,
        name: 'АБК ВОХР',
        position: [59.133692, 37.861015],
    },
    {
        id: 19,
        name: 'Администрация',
        position: [59.131831, 37.872624],
    },
    {
        id: 20,
        name: 'Сталепрокатный цех',
        position: [59.131789, 37.857028],
    },
]


export const MapPage = (props: Props) => {
    const position: LatLngExpression = [59.132033, 37.860372];

    const [endpoints, setEndpoints] = useState<IPoint[]>(mockPoints);
    const [isEditing, setIsEditing] = useState(false);
    const [posForNewPoint, setPosForNewPoint] = useState<LatLngExpression>([0,0]);
    const [isPointCreating, setIsPointCreating] = useState(false);

    const [isHelpModal, setIsHelpModal] = useState(true);

    const [editingPoint, setEditingPoint] = useState<IPoint | null>(null);
    const [defaultValue, setDefaultValue] = useState("");
    const [isPointEditing, setIsPointEditing] = useState(false);


    const [isPointsNamesDisplay, setIsPointsNamesDisplay] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [value, setValue] = useState(0);


    const navigate = useNavigate();

    const theme = useTheme();

    const mapClick = (e: LeafletMouseEvent) => {
        if (isEditing && zoomLevel >= 15) {
            setPosForNewPoint(e.latlng);
            setIsPointCreating(true);
        }
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        if(newValue === 1){
            setIsEditing(false);
        }
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
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
            <AppBar className={s.menu} position="static">
                <div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab label="Точки назначения" value={0}/>
                        <Tab label="Пользователи" value={1}/>
                        <div className={s.buttonsContainer}>
                            <MUITooltip title="Как работает приложение?">
                                <Button
                                    className={s.helpButton}
                                    variant="contained"
                                    color="info"
                                    onClick={() => {
                                        setValue(0);
                                        setIsHelpModal(true)
                                    }}
                                >
                                    <HelpOutlineIcon />
                                </Button>
                            </MUITooltip>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                Выйти
                            </Button>
                        </div>
                    </Tabs>
                </div>

            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel  value={value} index={0} dir={theme.direction}>
                    <div className={s.editingBlock}>
                        <div className={s.editingBlock__element}>
                            <span className={s.editingBlock__title}>Режим редактирования</span>
                            <SwitchButton isToggled={isEditing} onToggle={() => setIsEditing(!isEditing)} rounded/>
                        </div>
                        <div className={s.editingBlock__element}>
                            <span className={s.editingBlock__title}>Отобразить все наименования точек</span>
                            <SwitchButton isToggled={isPointsNamesDisplay} onToggle={() => setIsPointsNamesDisplay(!isPointsNamesDisplay)} rounded/>
                        </div>
                    </div>

                    <PointModal
                        isOpen={isPointCreating}
                        acceptClick={(name: string) => addPoint(name)}
                        setIsOpen={setIsPointCreating}
                        defaultName={""}
                        title={"Создание точки назначения"}
                    />
                    <PointModal
                        isOpen={isPointEditing}
                        acceptClick={(name: string) => editPoint(name)}
                        defaultName={defaultValue}
                        setIsOpen={setIsPointEditing}
                        title={"Изменение точки назначения"}
                    />
                    <HelpModal
                        isOpen={isHelpModal}
                        setIsOpen={setIsHelpModal}
                        title={"Информация о приложении"}
                    />

                    <MapContainer
                        className={s.container}
                        center={position} zoom={zoomLevel}
                        minZoom={13}
                    >
                        <MarkerItem onMapClick={mapClick} />
                        <TileLayer
                            noWrap={false}
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {zoomLevel >= 14 &&
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
                                            setDefaultValue(marker.name);
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
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <UserTable/>
                </TabPanel>
            </SwipeableViews>
        </section>
    )
}