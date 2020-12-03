import React, { useState } from 'react';
import styled from 'styled-components/macro'

import {todos as getTodos }from '../db';

import './App.css';


const App = () => {
  const [boards, setBoards] = useState(getTodos);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isShadow, setIsShadow] = useState(false);

  function dragOverHandler(e) {
    e.preventDefault();
    setIsShadow(true);
  };
  
  function dragLeaveHandler(e) {
    setIsShadow(false);
  };
  
  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
    setIsShadow(true);
  };
  
  function dragEndHandler(e) {
    setIsShadow(false);

  };
  
  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex +1,  0, currentItem)

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      };
      if (b.id === currentBoard.id) {
        return currentBoard;
      };
      return b;
    }))
  };

  function dropCardHandler(e, board) {
    board.items.push();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board;
      };
      if (b.id === currentBoard.id) {
        return currentBoard;
      };
      return b;
    }))
  };

  return (
    <Container>
       {boards.map(board => 
        <Board 
          onDragOver={(e => dragOverHandler(e))}
          onDrop={(e => dropCardHandler(e, board))}

          key={board.id}>
          <BoardTitle>{board.title}</BoardTitle>
            {board.items.map( item =>
              <Item 
                key={item.id}
                isShadow={isShadow}
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
              >
              {item.title}
              </Item>
            )}
        </Board>
       )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

	text-align: center;
`;

const Board = styled.div`
  min-width: 300px;
  min-height: 400px;
  border: 5px solid blue;
  padding: 20px 10px;
  border-radius: 12px;
  margin: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-decoration: none;
`;

const BoardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Item = styled.div`
  width: 100%;
  border: 2px solid lightblue;
  padding: 10px;
  border-radius: 6px;
  margin: 5px;
  cursor: grab;
  background-color: antiquewhite;
  box-shadow: ${({isShadow}) => isShadow ? '0 4px 3px gray' : 'none'};

  :hover {
    background-color: grey;
  }
`;
