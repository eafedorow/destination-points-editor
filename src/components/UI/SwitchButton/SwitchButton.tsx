import React, {useState} from 'react'
import s from './SwitchButton.module.scss'
import cx from 'classnames'

interface Props {
    rounded?: boolean;
    isToggled: boolean;
    onToggle: () => void;
}

export const SwitchButton = ({rounded, isToggled, onToggle}: Props) => {

    const sliderCX = cx(s.slider, rounded ? s.rounded : "");

    return (
        <label className={s.switch}>
            <input type="checkbox" checked={isToggled} onChange={onToggle}/>
            <span className={sliderCX}/>
        </label>
    )
}