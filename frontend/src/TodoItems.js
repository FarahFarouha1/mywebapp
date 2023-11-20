import React from 'react';

function TodoItems({ entries, delete: deleteItem }) {
  const createTasks = item => (
    <li onClick={() => deleteItem(item.key)} key={item.key}>
      {item.text}
    </li>
  );

  const listItems = entries.map(createTasks);

  return <ul className="theList">{listItems}</ul>;
}

export default TodoItems;
