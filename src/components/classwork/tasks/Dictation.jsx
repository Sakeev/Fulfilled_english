import React, { useRef } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { isTeacher } from "../../../helpers/funcs";

const Dictation = ({ inps, setInps, setTyping, setShowVocab }) => {
  const inputRef = useRef();

  function handleHtmlChange(e) {
    setShowVocab(false);
    setInps({ ...inps, dictation: e.target.value });
    setTyping((prev) => !prev);
  }

  const handleColorChange = () => {
    const selectedColor = inputRef.current.value;
    document.execCommand("styleWithCSS", false, true); // Включаем использование стилей CSS
    document.execCommand("foreColor", false, selectedColor);
    const selected = window.getSelection().toString();
    if (
      selected.trim() &&
      window.getSelection().focusNode.parentElement.parentElement.className ===
        "rsw-ce"
    ) {
      const span = document.createElement("span");
      span.style.color = inputRef.current.value;

      const range = window.getSelection().getRangeAt(0);
      range.surroundContents(span);
    }
  };

  return (
    <div>
      <h2>Dictation</h2>
      <div>
        <EditorProvider>
          <Editor
            containerProps={{
              style: {
                height: "60vh",
                maxHeight: "500px",
                width: "90%",
                margin: "20px 0",
              },
            }}
            value={inps.dictation || ""}
            onChange={handleHtmlChange}
          >
            {isTeacher() && (
              <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
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
  );
};

export default Dictation;
