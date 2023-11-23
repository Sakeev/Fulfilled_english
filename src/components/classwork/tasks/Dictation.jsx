import React, { useRef } from 'react'
import {
    BtnBold,
    BtnItalic,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg'
import { isTeacher } from '../../../helpers/funcs'

const Dictation = ({ inps, setInps, chatRender, setShowVocab }) => {
    const inputRef = useRef()

    const checkTab = (e) => {
        if (e.keyCode === 9) {
            // Добавляем отступ к инпуту или текстовой области
            e.preventDefault() // Предотвращаем дефолтное поведение Tab (переключение фокуса)
            // Вы можете установить свой собственный отступ
            const updatedValue = inps.dictation + '\u00A0\u00A0\u00A0\u00A0' // Например, два пробела
            setInps({ ...inps, dictation: updatedValue })
            chatRender({ ...inps, dictation: updatedValue })
        }
    }

    function handleHtmlChange(e) {
        setShowVocab(false)
        setInps({ ...inps, dictation: e.target.value })
        chatRender({ ...inps, dictation: e.target.value })
    }

    const handleColorChange = () => {
        const selectedColor = inputRef.current.value
        document.execCommand('styleWithCSS', false, true) // Включаем использование стилей CSS
        document.execCommand('foreColor', false, selectedColor)
        const selected = window.getSelection().toString()
        if (
            selected.trim() &&
            window.getSelection().focusNode.parentElement.parentElement
                .className === 'rsw-ce'
        ) {
            const span = document.createElement('span')
            span.style.color = inputRef.current.value

            const range = window.getSelection().getRangeAt(0)
            range.surroundContents(span)
        }
    }

    return (
        <div>
            <h2>Dictation</h2>
            <div>
                <EditorProvider>
                    <Editor
                        containerProps={{
                            style: {
                                height: '60vh',
                                maxHeight: '500px',
                                maxWidth: '525px',
                                overflow: 'auto',
                                width: '90%',
                                margin: '20px 0',
                            },
                        }}
                        value={inps.dictation || ''}
                        onKeyDown={checkTab}
                        onChange={handleHtmlChange}
                    >
                        {isTeacher() && (
                            <Toolbar>
                                <BtnBold />
                                <Separator />
                                <BtnItalic />
                                <Separator />
                                <BtnUnderline />
                                <Separator />
                                <BtnStrikeThrough />
                                <Separator />
                                <input
                                    ref={inputRef}
                                    onChange={handleColorChange}
                                    type="color"
                                />
                            </Toolbar>
                        )}
                    </Editor>
                </EditorProvider>
            </div>
        </div>
    )
}

export default Dictation
