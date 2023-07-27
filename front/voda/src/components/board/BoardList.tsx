import React, { useState, useContext } from 'react';

import styled from 'styled-components';
import { ThemeContext } from '../../App';
import { SimpleTheme, Theme } from '../../styles/theme';

import Title from '../Title';
// import { BoardType } from '../../../interface/BoardType'

const BoardList = () => {
    // const [boardList, setBoardList] = useState<BoardType[]>([])
  
    // const boardLength = boardList.length
  
    // useEffect(() => {
    //   axios.get('http://localhost:3001/board')
    //     .then((response) => {
    //       setBoardList(response.data)
    //     })
  
    //     .catch(function(error) {
    //       console.log(error)
    //     })
    // }, [])
  
    return (
      <div className="board-list">
        <Title title="Board list"/>
  
        {/* <h4>Total post : {boardLength}</h4> */}
  
        <table>
          <colgroup>
            <col width="15%"/>
            <col width="65%"/>
            <col width="20%"/>
          </colgroup>
  
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
  
          <tbody>
            {/* {
              boardList.map((board, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="title"><Link to={`/board/${board.id}`}>{board.title}</Link></td>
                    <td>{dayjs(board.created_at).format('YYYY.MM.DD')}</td>
                  </tr>
                )
              })
            } */}
          </tbody>
        </table>
      </div>
    )
  }
  
  export default BoardList