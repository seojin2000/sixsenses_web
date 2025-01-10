import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import '../TailWindStyle.css';
import { AiFillCaretRight } from "react-icons/ai";

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || "Guest";

  // 문제 정보
  const [question, setQuestion] = useState({
    word: "",
    hanja: "",
    meaning: ""
  });

  // 정답 입력
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(0); // 0=대기,1=오답,2=정답
  const [count, setCount] = useState(0);     // 풀 문제수
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // (1) DB에서 랜덤 사자성어 불러오기
  const loadRandomIdiom = () => {
    axios
      .get("http://localhost:8080/api/idioms/random")
      .then((res) => {
        if (res.data) {
          setQuestion({
            word: res.data.word,
            hanja: res.data.hanja,
            meaning: res.data.meaning
          });
        } else {
          // DB가 비어있는 경우
          setQuestion({
            word: "???",
            hanja: "???",
            meaning: "DB에 사자성어가 없습니다."
          });
        }
        setChecked(0);
        setAnswer("");
      })
      .catch((err) => {
        console.error(err);
        setQuestion({
          word: "???",
          hanja: "???",
          meaning: "문제 불러오기 실패"
        });
      });
  };

  // 컴포넌트 초기 로드시 문제 불러오기
  useEffect(() => {
    loadRandomIdiom();
  }, []);

  // (2) 정답 체크
  const onCheckAnswer = (evt) => {
    evt.preventDefault();

    if (!answer.trim()) {
      alert("정답을 입력해주세요");
      return;
    }
    if (answer.trim() === question.word) {
      setChecked(2); // 정답
      setCorrectAnswers(prev => prev + 1);
    } else {
      setChecked(1); // 오답
    }
    setCount(prev => prev + 1);
  };

  // (3) 다음 문제 or 랭킹 이동
  const onNextQuestion = (evt) => {
    evt.preventDefault();
      if (count >= 9) {
          // 10문제 풀면 점수를 저장하고 랭킹 페이지로 이동
          saveQuizResult(nickname, correctAnswers); // 마지막 문제 후 결과 저장
          axios
              .post("http://localhost:8080/api/users/updateScore", null, {
                  params: {
                      nickname: nickname,
                      score: correctAnswers, // 맞힌 문제 수
                  },
              })
              .then((response) => {
                  console.log(response.data);
                  navigate("/Rank", { state: { nickname, correctAnswers } });
              })
              .catch((err) => {
                  console.error("점수 저장 실패:", err);
                  navigate("/Rank", { state: { nickname, correctAnswers } });
              });
      } else {
          loadRandomIdiom();
      }
  };

  // (3-1) 퀴즈 끝난 후 정보를 Quiz_result에도 저장
    const saveQuizResult = async (nickname, score) => {
        try {
            const response = await axios.post("http://localhost:8080/api/quiz/saveResult", {
                nickname: nickname,
                score: score,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data); // 성공 메시지 출력
        } catch (error) {
            console.error("Error saving quiz result:", error);
        }
    };

  // 조건부 렌더링
  const renderForm = () => {
    if (checked === 0) {
      // 정답 입력 전
      return (
        <form id="inputForm" onSubmit={onCheckAnswer}  className="flex flex-col items-center gap-4 w-full px-6">
          <input
            type="text"
            className="outline outline-offset-2 outline-black-500/50 w-3/4 px-4 py-2 rounded-md text-lg placeholder:text-center"
            value={answer}
            placeholder="정답을 입력하세요"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            type="button"
            className="outline outline-offset-2 outline-green-500/50 hover:bg-green-500 hover:text-white transition-colors px-4 py-1 rounded-md"
            onClick={onCheckAnswer}>
            <AiFillCaretRight />
          </button>
        </form>
      );
    } else if (checked === 1) {
      // 오답
      return (
        <div className="flex flex-col items-center gap-4 w-full px-6">
          <p className="text-red-500 font-semibold">오답입니다</p>
          <p>{question.word} ({question.hanja})</p>
          {/* <p className="text-gray-500 text-sm">{question.meaning}</p> */}
          <button
            className="outline outline-offset-2 outline-green-500/50 hover:bg-green-500 hover:text-white transition-colors px-4 py-1 rounded-md"
            onClick={onNextQuestion}
          >
            <AiFillCaretRight />
          </button>
        </div>
      );
    } else {
      // 정답
      return (
        <div className="flex flex-col items-center gap-4 w-full px-6">
          <p className="text-blue-500 font-semibold">정답입니다</p>
          <p>{question.word} ({question.hanja})</p>
          <button
            className="outline outline-offset-2 outline-green-500/50 hover:bg-green-500 hover:text-white transition-colors px-4 py-1 rounded-md"
            onClick={onNextQuestion}
          >
            <AiFillCaretRight />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <div className="w-[390px] h-[874px] bg-white rounded-lg shadow-lg flex flex-col justify-start items-center px-4">
      <div className="w-full text-center pt-2">
      <p className="text-lg font-semibold">문제 {count + 1}/10</p>
    </div>
        <div className="text-center absolute bottom-1/2 p-4">
          <p className="text-xl font-bold pb-5">{question.meaning}</p>
          {renderForm()}
        </div>
        
      </div>
    </div>
  );
}

export default Question;
