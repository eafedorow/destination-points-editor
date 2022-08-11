import React, {useState} from 'react'
import s from './HelpModal.module.scss'
import {Button} from "@mui/material";
import img01 from '../../assets/img/helpInfo/01.png'
import img02 from '../../assets/img/helpInfo/02.png'
import img03 from '../../assets/img/helpInfo/03.png'
import img04 from '../../assets/img/helpInfo/04.png'
import img05 from '../../assets/img/helpInfo/05.png'
import img06 from '../../assets/img/helpInfo/06.png'
import img07 from '../../assets/img/helpInfo/07.png'
import img08 from '../../assets/img/helpInfo/08.png'
import img09 from '../../assets/img/helpInfo/09.png'
import img10 from '../../assets/img/helpInfo/10.png'
import img11 from '../../assets/img/helpInfo/11.png'
import img12 from '../../assets/img/helpInfo/12.png'
import img13 from '../../assets/img/helpInfo/13.png'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

interface Props {
    title: string;
    isOpen: boolean;
    setIsOpen: (newState: boolean) => void;
}

export const HelpModal = ({isOpen, setIsOpen, title}: Props) => {

    const [page, setPage] = useState(1);

    const modalClasses = [s.modal, isOpen ? s.active : " "];

    function modalPageClasses(id: number) {
        if(page === id){
            return ""
        } else {
            return s.none;
        }
    }

    return (
        <div className={modalClasses.join(' ')} onClick={() => setIsOpen(false)}>
            <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
                <div className={s.modal__pageCounter}>
                    {page}/7
                </div>
                <div className={s.modal__page + " " + modalPageClasses(1)}>
                    <h2 className={s.modal__title}>{title}</h2>
                    <span className={s.modal__page__text}>Администраторское веб-приложение для редактирования точек назначения.</span>
                    <img src={img01} style={{height: 200, width: 200, margin: '0 auto'}} alt="helpImg"/>
                    <span className={s.modal__page__text}>Данное веб-приложение предназначено для редактирования точек назначения в базе данных для навигационной системы по территории предприятия ОАО «Северсталь-метиз».</span>
                    <div className={s.modal__page__links}>
                        <p className={s.modal__page__link}>
                            GITHUB:
                            <a href="https://github.com/eafedorow/destination-points-editor"> https://github.com/eafedorow/destination-points-editor</a>
                        </p>
                        <p className={s.modal__page__link}>
                            АВТОР:
                            <a href="mailto: eafedorow@yandex.ru"> eafedorow@yandex.ru</a>
                        </p>
                    </div>
                </div>

                <div className={s.modal__page + " " + modalPageClasses(2)}>
                    <h2 className={s.modal__title}>Точки назначения</h2>
                    <span className={s.modal__page__text}>Область размещения точек назначения определена прямоугольной фигурой.</span>
                    <img className={s.modal__page__img} src={img02} alt="helpImg"/>
                    <span className={s.modal__page__text}>Таких областей размещения на карте может быть несколько. Для того чтобы сфокусировать камеру на области необходимо кликнуть по выделенной области.</span>
                </div>

                <div className={s.modal__page + " " + modalPageClasses(3)}>
                    <h2 className={s.modal__title}>Настройки приложения</h2>
                    <span className={s.modal__page__text}>В верхнем меню приложения расположены кнопки настроек работы приложения.</span>
                    <img className={s.modal__page__img} src={img03} alt="helpImg"/>
                    <span className={s.modal__page__text}>Для того чтобы редактировать список точек назначения необходимо активировать режим редактирования. Для того чтобы изменить режим отображения точек назначения необходимо активировать режим постоянного отображения.</span>
                    <img className={s.modal__page__img} src={img05} alt="helpImg"/>
                </div>
                <div className={s.modal__page + " " + modalPageClasses(4)}>
                    <h2 className={s.modal__title}>Редактирования точек назначения 1</h2>
                    <span className={s.modal__page__text}>Для редактирования точек назначения необходимо активировать режим редактирования в настройках.</span>
                    <img className={s.modal__page__img} src={img04} alt="helpImg"/>
                    <span className={s.modal__page__text}>При нажатии на иконку точки назначения всплывает окно выбора действия.</span>
                    <img className={s.modal__page__img} src={img06} alt="helpImg"/>
                </div>
                <div className={s.modal__page + " " + modalPageClasses(5)}>
                    <h2 className={s.modal__title}>Редактирования точек назначения 2</h2>
                    <span className={s.modal__page__text}>При нажатии на кнопку «Изменить» появляется следующее окно.</span>
                    <img className={s.modal__page__img} src={img07} alt="helpImg"/>
                    <span className={s.modal__page__text}>Для того чтобы изменить название необходимо ввести в текстовое поле новое наименование и нажать «Сохранить».</span>
                    <img className={s.modal__page__img} src={img08} alt="helpImg"/>
                </div>
                <div className={s.modal__page + " " + modalPageClasses(6)}>
                    <h2 className={s.modal__title}>Создание точки назначения</h2>
                    <span className={s.modal__page__text}>Для создании точки назначения необходимо нажать на любую точку на карте. После нажатия появится окно создания новой точки назначения.</span>
                    <img className={s.modal__page__img} src={img09} alt="helpImg"/>
                    <span className={s.modal__page__text}>Для того чтобы сохранить новую точку необходимо заполнить текстовое поле и нажать «Сохранить».</span>
                    <img className={s.modal__page__img} src={img10} alt="helpImg"/>
                </div>
                <div className={s.modal__page + " " + modalPageClasses(7)}>
                    <h2 className={s.modal__title}>Пользователи</h2>
                    <span className={s.modal__page__text}>Во второй вкладке приложения находится информация о пользователях.</span>
                    <img className={s.modal__page__img} src={img11} alt="helpImg"/>
                    <span className={s.modal__page__text}>Для того чтобы добавить пользователя необходимо нажать «Добавить».</span>
                    <img className={s.modal__page__img} src={img12} alt="helpImg"/>
                    <span className={s.modal__page__text}>Кнопки для редактирования данных пользователей.</span>
                    <img className={s.modal__page__img} src={img13} alt="helpImg"/>
                </div>
                <div className={s.buttons}>
                    <div className={s.buttons__container}>
                        <Button
                            color="secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Закрыть
                        </Button>

                        <div className={s.buttons__pageControllers}>
                            {page > 1 &&
                                <Button
                                    color="primary"
                                    onClick={() => setPage(prev => prev - 1)}
                                >
                                    <ArrowBackOutlinedIcon sx={{ fontSize: 15 }}/> Назад
                                </Button>
                            }
                            {page < 7 &&
                                <Button
                                    color="primary"
                                    onClick={() => setPage(prev => prev + 1)}
                                >
                                    Далее <ArrowForwardOutlinedIcon sx={{fontSize: 15}}/>
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}