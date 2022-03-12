import "./List.css";
import Announcement from "../Announcement/Announcement";

function List({data, foundData, editAnnouncement, deleteAnnouncement, similarAnnouncements}) {
  const buildList = (list) => {
    return (
      <div className="list-block">
        <ul className="list">
          {
            list.map(announcement => {
              return (
                <li className="list_item" key={announcement.id}>
                  <Announcement
                    announcement={announcement}
                    editAnnouncement={editAnnouncement}
                    deleteAnnouncement={deleteAnnouncement}
                    similarAnnouncements={similarAnnouncements}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  return (
    <>
    {
      data.length===0
      ?
      <div>Add announcement</div>
      :
      foundData.length===0
      ?
      buildList(data)
      :
      buildList(foundData)
    }
    </>
  );
}

export default List;
