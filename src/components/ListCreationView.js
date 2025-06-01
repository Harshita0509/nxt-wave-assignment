import React, { useState } from "react";
import "./ListCreationView.css";

const getListById = (lists, id) => lists.find((list) => list.id === id);

const ListCreationView = ({ lists, selectedLists, onCancel, onUpdate }) => {
  const [firstListId, secondListId] = selectedLists;
  const firstList = getListById(lists, firstListId);
  const secondList = getListById(lists, secondListId);

  // Initial state for items in each list
  const [firstItems, setFirstItems] = useState(firstList.items);
  const [secondItems, setSecondItems] = useState(secondList.items);
  const [newListItems, setNewListItems] = useState([]);

  // Move item from one list to another
  const moveItem = (item, from, to, setFrom, setTo) => {
    setFrom((prev) => prev.filter((i) => i.id !== item.id));
    setTo((prev) => [item, ...prev]);
  };

  // Render a list container
  const renderList = (
    title,
    items,
    moveLeft,
    moveRight,
    leftIcon,
    rightIcon
  ) => (
    <div className="list-creation-list-container">
      <h3 className="list-creation-list-title">{title}</h3>
      <ul className="list-creation-list-items">
        {items.map((item) => (
          <li key={item.id} className="list-creation-list-item">
            <div>
              <strong>{item.name}</strong>
              <br />
              <span style={{ color: "#666", fontSize: 13 }}>
                {item.description}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {moveLeft && (
                <button
                  onClick={() => moveLeft(item)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                  title="Move Left"
                >
                  {leftIcon}
                </button>
              )}
              {moveRight && (
                <button
                  onClick={() => moveRight(item)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                  title="Move Right"
                >
                  {rightIcon}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // Move logic for arrows
  const moveToNewFromFirst = (item) =>
    moveItem(item, firstItems, newListItems, setFirstItems, setNewListItems);
  const moveToNewFromSecond = (item) =>
    moveItem(item, secondItems, newListItems, setSecondItems, setNewListItems);
  const moveToFirstFromNew = (item) =>
    moveItem(item, newListItems, firstItems, setNewListItems, setFirstItems);
  const moveToSecondFromNew = (item) =>
    moveItem(item, newListItems, secondItems, setNewListItems, setSecondItems);

  // Handle update
  const handleUpdate = () => {
    const updatedLists = lists.map((list) => {
      if (list.id === firstListId) {
        return { ...list, items: firstItems };
      } else if (list.id === secondListId) {
        return { ...list, items: secondItems };
      }
      return list;
    });
    // Optionally, you can add the new list to the lists array here
    onUpdate(updatedLists);
  };

  return (
    <div className="list-creation-root">
      <div className="list-creation-list-row">
        {renderList(
          firstList.list_name,
          firstItems,
          null,
          moveToNewFromFirst,
          null,
          "→"
        )}
        {renderList(
          "New List",
          newListItems,
          moveToFirstFromNew,
          moveToSecondFromNew,
          "←",
          "→"
        )}
        {renderList(
          secondList.list_name,
          secondItems,
          moveToNewFromSecond,
          null,
          "←",
          null
        )}
      </div>
      <div className="list-creation-btn-row">
        <button className="list-creation-cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="list-creation-update-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ListCreationView;
