import React from "react";
import ErrorMessage from "./ErrorMessage";
import "./ListsView.css";

const ListsView = ({
  lists = [],
  selectedLists = [],
  onListSelect = () => {},
  onCreateNewList = () => {},
  errorMessage = "",
}) => {
  if (!Array.isArray(lists)) return null;
  return (
    <div className="lists-view-root">
      <div className="lists-view-list-row">
        {lists.map((list) => (
          <div
            key={list.id}
            className={`lists-view-list-container${
              selectedLists.includes(list.id) ? " selected" : ""
            }`}
          >
            <label className="lists-view-list-label">
              <input
                type="checkbox"
                checked={selectedLists.includes(list.id)}
                onChange={() => onListSelect(list.id)}
                style={{ marginRight: "8px" }}
              />
              <span style={{ fontWeight: 600 }}>{list.list_name}</span>
            </label>
            <ul className="lists-view-list-items">
              {list.items.map((item) => (
                <li key={item.id} className="lists-view-list-item">
                  <strong>{item.name}</strong>
                  <br />
                  <span style={{ color: "#666", fontSize: "13px" }}>
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="lists-view-create-btn" onClick={onCreateNewList}>
        Create a new list
      </button>
      {errorMessage && (
        <div style={{ marginTop: "18px" }}>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default ListsView;
