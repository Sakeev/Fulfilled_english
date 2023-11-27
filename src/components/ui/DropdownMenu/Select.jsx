import React, { useState, Children, cloneElement } from 'react'
import styles from './Select.module.scss'

export const MenuItem = ({ value, children, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(value)
    }

    return (
        <div className={styles.menu_item} onClick={handleClick}>
            {children}
        </div>
    )
}

// ----------------------------------------------------------

export const Select = ({ children, onSelect, label }) => {
    const [selectedValue, setSelectedValue] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelect = (value) => {
        setSelectedValue(label)
        setOpen(false)
        onSelect(value)
    }

    return (
        <div style={{ position: 'relative', width: '200px', height: '25px' }}>
            <div className={styles.select_menu} onClick={handleOpen}>
                {selectedValue || 'Select Option'}
            </div>
            {open && (
                <div className={styles.select_list}>
                    {Children.map(children, (child) =>
                        cloneElement(child, {
                            onClick: handleSelect,
                            isSelected: selectedValue === child.props.value,
                        })
                    )}
                </div>
            )}
        </div>
    )
}
