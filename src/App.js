import React, { useState, useEffect } from "react";
import ListsView from "./components/ListsView";
import ListCreationView from "./components/ListCreationView";
import Loader from "./components/Loader";
import FailureView from "./components/FailureView";
import "./App.css";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

const API_STATUS = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

function App() {
  // State to toggle between all lists and list creation view
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [lists, setLists] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL);
  const [selectedLists, setSelectedLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLists = async () => {
    setApiStatus(API_STATUS.LOADING);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      // Group items by list_number
      if (Array.isArray(data.lists)) {
        const grouped = [
          {
            id: 1,
            list_name: "List 1",
            items: data.lists.filter((item) => item.list_number === 1),
          },
          {
            id: 2,
            list_name: "List 2",
            items: data.lists.filter((item) => item.list_number === 2),
          },
        ];
        setLists(grouped);
      } else {
        setLists([]);
      }
      setApiStatus(API_STATUS.SUCCESS);
    } catch (error) {
      console.error("Fetch error:", error);
      setApiStatus(API_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleListSelect = (listId) => {
    setErrorMessage("");
    setSelectedLists(
      (prev) =>
        prev.includes(listId)
          ? prev.filter((id) => id !== listId)
          : prev.length < 2
          ? [...prev, listId]
          : prev // Don't allow more than 2
    );
  };

  const handleCreateNewList = () => {
    if (selectedLists.length !== 2) {
      setErrorMessage("You should select exactly 2 lists to create a new list");
      return;
    }
    setIsCreatingList(true);
    setErrorMessage("");
  };

  const handleCancelListCreation = () => {
    setIsCreatingList(false);
    setSelectedLists([]);
    setErrorMessage("");
  };

  // Placeholder for update logic
  const handleUpdateList = (updatedLists) => {
    setLists(updatedLists);
    setIsCreatingList(false);
    setSelectedLists([]);
    setErrorMessage("");
  };

  let content;
  if (apiStatus === API_STATUS.LOADING) {
    content = <Loader />;
  } else if (apiStatus === API_STATUS.FAILURE) {
    content = <FailureView onRetry={fetchLists} />;
  } else if (apiStatus === API_STATUS.SUCCESS) {
    content = isCreatingList ? (
      <ListCreationView
        lists={lists}
        selectedLists={selectedLists}
        onCancel={handleCancelListCreation}
        onUpdate={handleUpdateList}
      />
    ) : (
      <ListsView
        lists={lists}
        selectedLists={selectedLists}
        onListSelect={handleListSelect}
        onCreateNewList={handleCreateNewList}
        errorMessage={errorMessage}
      />
    );
  } else {
    content = null;
  }

  return (
    <div className="App">
      <h1 className="app-title">List Creation</h1>
      {content}
    </div>
  );
}

export default App;
