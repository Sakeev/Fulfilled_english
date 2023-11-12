import React, { useRef } from "react";
import {
  BtnBold,
  BtnItalic,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { isTeacher } from "../../../helpers/funcs";

const Dictation = ({ inps, setInps, chatRender, setShowVocab }) => {
  const inputRef = useRef();

  function handleHtmlChange(e) {
    setShowVocab(false);
    setInps({ ...inps, dictation: e.target.value });
    chatRender({ ...inps, dictation: e.target.value });
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
  );
};

export default Dictation;
