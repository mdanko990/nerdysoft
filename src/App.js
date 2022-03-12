import "./App.css";
import List from "./components/List/List";
import SearchBar from "./components/SearchBar/SearchBar";
import AddBar from "./components/AddBar/AddBar";
import {useState, useEffect} from "react";

function App() {
  const [data,setData]=useState([]);
  const [foundData, setFoundData] = useState([]);

  const getData = () => {
    fetch("data.json")
      .then(resp => resp.json())
      .then(data => setData(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const searchAnnouncement = (searchText) => {
    const dataTemp = [...data].filter(el => {
      return el.title.toLowerCase().includes(searchText.toLowerCase());
    });

    setFoundData(dataTemp);
  };

  const addAnnouncement = (newAnnouncement) => {
    setData([...data, newAnnouncement]);
  };

  const editAnnouncement = (announcement) => {
    const newData = [...data].map(el => {
      if (el.id === +announcement.id) {
        return {
          id: el.id,
          title: announcement.title,
          description: announcement.description,
          date: el.date
        };
      }
      return el;
    });
    
    setData(newData);
  };

  const deleteAnnouncement = (id) => {
    const newData = data.filter(el => el.id !== +id);
    
    setData(newData);
  };

  const includesSimilarWords = (text1, text2) => {
    let isSimilar = false;
    text1.split(' ').forEach(word => {
      if (text2.includes(word)) {
        isSimilar=true;
      }
    });

    return isSimilar;
  };

  const similarAnnouncements = (id) => {
    const announcement = data.find(el => el.id===id);
    const similar = data.filter(el => {
      return (includesSimilarWords(el.title, announcement.title) || 
      includesSimilarWords(el.description, announcement.description)) &&
      el.id !== announcement.id;
    });
    
    return similar;
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Announcement</h1>
        <SearchBar searchAnnouncement={searchAnnouncement}/>
        <AddBar dataLength={data.length}
          addAnnouncement={addAnnouncement}/>
      </header>
      <main className="main">
        <List data={data}
          foundData={foundData}
          editAnnouncement={editAnnouncement}
          deleteAnnouncement={deleteAnnouncement}
          similarAnnouncements={similarAnnouncements}/>
      </main>
      <footer className="footer">
        
      </footer>
    </div>
  );
}

export default App;
