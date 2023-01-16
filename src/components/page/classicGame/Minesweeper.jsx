import { useEffect } from "react";
import { useState } from "react";
import { Mw as CSS } from "../../../style/page/MineStyle";

function Minesweeper() {
  // 지뢰찾기 데이터
  const [mines, setMines] = useState([]);
  const [randomMines, setRandomMines] = useState([]);

  // 지뢰찾기 9 x 9는 10개

  // 지뢰찾기 (a X a) a값을 받아 지뢰배열 생성
  const makeGameList = (num) => {
    let gameList = [];

    for (let i = 0; i < num; i++) {
      gameList[i] = [];
    }

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        gameList[i][j] = { num: i * num + j, isMines: false, roundMines: 0, click: false };
      }
    }
    setMines(gameList);
  };

  // 지뢰 만들기 (난수를 생성해 randomMines 저장)
  const makeMines = (num) => {
    // 지뢰 (난수)
    let minesList = [];

    const makeRandom = (idx) => {
      const randomRowNum = Math.floor(Math.random() * num);
      const randomColNum = Math.floor(Math.random() * num);
      let existNum = false;

      minesList.forEach((innerList) => {
        if (innerList[0] === randomRowNum && innerList[1] === randomColNum) {
          existNum = true;
        }
      });

      if (existNum) {
        makeRandom(idx);
      } else {
        minesList[idx] = [randomRowNum, randomColNum];
      }
    };

    for (let idx = 0; idx < 10; idx++) {
      makeRandom(idx);
    }
    setRandomMines(minesList);
  };

  const makeBoxValue = (num) => {
    const editGameList = mines;

    editGameList.forEach((d, idx) => {
      editGameList[idx].forEach((value, idx2) => {
        if (randomMines.find((ele) => idx === ele[0] && idx2 === ele[1])) {
          editGameList[idx][idx2].isMines = true;
        }
      });
    });

    // 지뢰 테이블 (근처에 지뢰가 몇개 있는 지 설정)
    const findMines = (idx, idx2) => {
      let cnt = 0;

      let numI = idx - 1 < 0 ? idx : idx - 1;
      let numJ = idx2 - 1 < 0 ? idx2 : idx2 - 1;
      let numIBound = idx + 1 === num ? idx : idx + 1;
      let numJBound = idx2 + 1 === num ? idx2 : idx2 + 1;

      for (let i = numI; i <= numIBound; i++) {
        for (let j = numJ; j <= numJBound; j++) {
          if (editGameList[i][j].isMines && !editGameList[idx][idx2].isMines) {
            cnt++;
          }
        }
      }

      return cnt;
    };

    editGameList.forEach((d, idx) => {
      editGameList[idx].forEach((value, idx2) => {
        editGameList[idx][idx2].roundMines = findMines(idx, idx2);
      });
    });

    setMines(editGameList);
  };

  //지뢰배열을 이용해 화면에 구현
  const MakeBox = () => {
    const clickMe = (idx, idx2, value) => {
      const { isMines, roundMines } = value;
      const newMines = mines;
      newMines[idx][idx2].click = true;

      setMines([...newMines]);
    };

    makeBoxValue(9);

    return mines.map((d, idx) => (
      <>
        {mines[idx].map((value, idx2) => (
          <CSS.Btn
            active={mines[idx][idx2].click}
            onClick={(e) => clickMe(idx, idx2, value)}
            value={randomMines.find((ele) => value.num === ele) ? "붐" : "빈"}
          >
            {mines[idx][idx2].click ? (value.isMines ? "💥" : value.roundMines) : "-"}
          </CSS.Btn>
        ))}
        <br></br>
      </>
    ));
  };

  useEffect(() => {
    makeGameList(9);
    makeMines(9);
  }, []);

  return (
    <CSS.Container>
      <MakeBox />
    </CSS.Container>
  );
}

export default Minesweeper;
