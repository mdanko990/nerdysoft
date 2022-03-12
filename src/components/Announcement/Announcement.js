import "./Announcement.css";
import {useRef, useState} from "react";

function Announcement({announcement, editAnnouncement, deleteAnnouncement, similarAnnouncements}) {
  const [similar, setSimilar] = useState([]);

  const titleH3 = useRef(null);
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const editBtn = useRef(null);
  const deleteBtn = useRef(null);
  const detailsBtn = useRef(null);
  const editBlock = useRef(null);
  const detailsBlock = useRef(null);

  const getDate = (date) => {
    const dateObj = new Date(date);

    return `${dateObj.getDate()}.${dateObj.getMonth()+1}.${dateObj.getYear()}`;
  };

  const findThreeSimilar = () => {
    setSimilar(similarAnnouncements(announcement.id));
  };

  const handleEditClick = () => {
    const newAnnouncement = {
      id: announcement.id,
      title: titleInput.current.value,
      description: descriptionInput.current.value,
    };
    
    if (editBlock.current.style.display === "none" || editBlock.current.style.display === "") {
      editBtn.current.innerHTML = "Save";
      editBlock.current.style.display = "flex";
      deleteBtn.current.disabled = true;
      detailsBtn.current.disabled = true;
    } else {
      editBtn.current.innerHTML = "Edit";
      editBlock.current.style.display = "none";
      deleteBtn.current.disabled = false;
      detailsBtn.current.disabled = false;
      newAnnouncement.title = titleInput.current.value;
      newAnnouncement.description = descriptionInput.current.value;
      editAnnouncement(newAnnouncement);
    }

  };

  const handleDeleteClick = () => {
    deleteAnnouncement(announcement.id);
  };

  const handleDetailsClick = () => {
    if (detailsBlock.current.style.display === "none" ||
    detailsBlock.current.style.display === "") {
      detailsBlock.current.style.display = "flex";
      findThreeSimilar();
      editBtn.current.disabled = true;
      deleteBtn.current.disabled = true;
    } else {
      detailsBlock.current.style.display = "none";
      editBtn.current.disabled = false;
      deleteBtn.current.disabled = false;
    }
  };

  return (
    <>
      <div className="announcement_main">
        <h3 ref={titleH3}>{announcement.title}</h3>
        <div className="announcement_btn-block">
          <button className="announcement_btn"
            onClick={handleEditClick}
            ref={editBtn}>Edit</button>
          <button className="announcement_btn"
            onClick={handleDeleteClick}
            ref={deleteBtn}>Delete</button>
          <button className="announcement_btn"
            onClick={handleDetailsClick}
            ref={detailsBtn}>Details</button>
        </div>
      </div>
      <div className="announcement_edit" ref={editBlock}>
        <ul className="edit_list">
          <li className="edit_item">
            <input className="edit_title"
            type="text"
            defaultValue={announcement.title}
            ref={titleInput}/>
          </li>
          <li className="edit_item">
            <textarea className="edit_description"
            ref={descriptionInput}
            defaultValue={announcement.description}
            ></textarea>
          </li>
        </ul>
      </div>
      <div className="announcement_details" ref={detailsBlock}>
        <ul className="details_list">
          <li className="details_item">
            <textarea className="details_description"
              defaultValue={announcement.description}
              disabled
              ></textarea>
          </li>
          <li className="details_item">
            <p className="details_date">Date: <span>{getDate(announcement.date)}</span></p>
          </li>
          <li className="details_item">
            <p>Top 3 similar announcements:</p>
            <ul className="details_similar_list">
              {
                similar.map(el => {
                  return (<li key={el.id} className="details_similar_item">
                    <ul className="similar_info_list">
                      <li className="similar_info_item"><p>Date: <span>{getDate(el.date)}</span></p></li>
                      <li className="similar_info_item"><p>{el.title}</p></li>
                      <li className="similar_info_item"><p>{el.description}</p></li>
                    </ul>
                  </li>)
                })
              }
              {
                similar.length < 3 ?
                <li>Add more announcements to get more similar announcement</li>
                : false
              }
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Announcement;
