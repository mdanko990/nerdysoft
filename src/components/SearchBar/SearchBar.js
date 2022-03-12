import "./SearchBar.css";
import {useRef} from "react";

function SearchBar({searchAnnouncement}) {
  const searchInput = useRef(null);

  const handleSearch = () => {
    searchAnnouncement(searchInput.current.value);
  };

  return (
    <div>
        <input className="searchbar_input"
          type="text"
          placeholder="Search"
          ref={searchInput}
          onKeyUp={handleSearch}/>
    </div>
  );
}

export default SearchBar;
