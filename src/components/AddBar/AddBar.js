import "./AddBar.css";
import {useEffect, useRef} from "react";

function AddBar({dataLength, addAnnouncement}) {
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const addBtn = useRef(null);
  const formBlock = useRef(null);

  useEffect(()=>checkChanging());
  
  const checkChanging = () => {
    if(titleInput.current.value === "" || descriptionInput.current.value === "") {
      addBtn.current.disabled = true;
    } else {
      addBtn.current.disabled = false;
    }
  };

  const handleLinkClick = () => {
    if (formBlock.current.style.display === "none" ||
    formBlock.current.style.display === "") {
      formBlock.current.style.display = "flex";
    } else {
      formBlock.current.style.display = "none";
    }
  };


  const handleAddClick = () => {
    const newAnnouncement = {
      id: dataLength,
      title: titleInput.current.value,
      description: descriptionInput.current.value,
      date: new Date()
    };
    titleInput.current.value = "";
    descriptionInput.current.value = "";
    addAnnouncement(newAnnouncement);
  };

  return (
    <div className="addbar">
      <button className="add-link" onClick={handleLinkClick}>Do you want to add new announcement?</button>
      <div className="addbar-form-block" ref={formBlock}>
        <form className="addbar-form">
          <input className="addbar-form-title"
            type="text"
            placeholder="title"
            ref={titleInput}
            onChange={checkChanging}
            />
          <textarea className="addbar-form-description"
            placeholder="description"
            ref={descriptionInput}
            onChange={checkChanging}
            ></textarea>
        </form>
        <button className="addbar-form-btn"
          onClick={handleAddClick}
          ref={addBtn}
          >Add</button>
      </div>
    </div>
  );
}

export default AddBar;
