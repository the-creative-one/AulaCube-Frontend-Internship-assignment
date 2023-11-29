import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    epriority: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      epriority: currentNote.priority,
    });
  };

  const handleEditNote = () => {
    console.log("Before Update:", note); // Log before update
    editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag,
      note.epriority,
    );
    console.log("After Update:", note); // Log after update
    refClose.current.click();
    props.showAlert("Updated Successfully.", "dark");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log("Updated State:", note);
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Edit Modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="epriority" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select"
                    id="epriority"
                    name="epriority"
                    onChange={onChange}
                    value={note.epriority}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleEditNote}
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 5 ||
                  note.etag.length === 0
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1 className="pb-3 text-center text-primary-emphasis">Your Notes</h1>
        <div className="container m-2">
          <i className="text-secondary">
            <u>{notes.length === 0 && "No Notes to Display"}</u>
          </i>
        </div>

        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};
export default Notes;
