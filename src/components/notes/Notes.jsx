import { useRef, useEffect } from "react";
import { useClassWork } from "../../contexts/ClassWorkContextProvider";
import { formatText } from "../../helpers/funcs";
import deleteIcon from "assets/icons/notes-delete.svg";
import styles from "./Notes.module.scss";
import { Button } from "components/ui";

export const Note = ({ note, deleteNotes }) => {
  const contentRef = useRef(null);

  const handleDelete = () => {
    deleteNotes(note.id);
  };

  return (
    <div className={styles.note}>
      <div className={styles.noteTop}>
        <h3>Note from lesson {note.lesson}</h3>
        <Button className={styles.notesButton} onClick={handleDelete}>
          <img src={deleteIcon} alt="" />
        </Button>
      </div>
      <div className={styles.noteBody}>
        <p
          ref={contentRef}
          dangerouslySetInnerHTML={{
            __html: formatText(note),
          }}
        ></p>
      </div>
    </div>
  );
};

const Notes = () => {
  const { getNotes, notes, deleteNotes } = useClassWork();

  useEffect(() => {
    getNotes();
  }, []);
  console.log(notes);
  return (
    <>
      <div className={styles.notes_container}>
        <div className={styles.notes_title}>
          <span>Notes</span>
        </div>
        <div className={styles.noteList}>
          {notes.length > 0 ? (
            <>
              <div>
                {notes.slice(0, notes.length / 2).map((note, index) => (
                  <Note key={index} note={note} deleteNotes={deleteNotes} />
                ))}
              </div>
              <div>
                {notes.slice(notes.length / 2).map((note, index) => (
                  <Note key={index} note={note} deleteNotes={deleteNotes} />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
