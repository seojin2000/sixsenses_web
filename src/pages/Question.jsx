/**
 * 문제 페이지 입니다.
 *  1. 랜덤의 문제를 가져와서 출제하기(중복 여부는 체크)
 *  2. 참인지 거짓인지 판정
 */
import { useState,useMemo} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'; // 통신모듈
// 아이콘 가져오기
import { AiFillCaretRight } from "react-icons/ai";
// import { IconButton } from "@material-tailwind/react";

const IDIOM_URL = "http://127.0.0.1:5500/src/data/idiom2.json"
const IDIOM_LENGTH = 10
// 문제 개수 확인 
let count = 0;
let correctAnswers = 0;

// 사자성어 데이터 가져오기
async function getAllProducts() {
  const res = await axios.get(IDIOM_URL);
  return res.data.map((product,idx) => {
      const {word,mean} = product
      return ({word,mean}
      );
  });
}


export function Qustion() {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state.nickname;
  const [answer,setAnswer] = useState("");
  const [alldata,setAlldata] = useState("")
  const [question,setQuestion] = useState({
    mean : "어릴 때부터 같이 놀던 가까운 친구",
    word : "죽마고우"
  });
  const [checked,setChecked] = useState(0);
  
  // 문제 정답 여부 체크 
  function onSubmitHandler(evt) {
    evt.preventDefault();
    // 공백체크
    if (answer.length === 0) {
      alert("답을 입력해주세요")
      setAnswer("")
      return 
    }
    if (answer !== question.word) {
      console.log("오답입니다");
      setChecked(1);
    }
    else {
      console.log("정답입니다");
      correctAnswers+=1;
      setChecked(2);
    }
    setAnswer("");

    // 문제 카운팅
    count+=1;
    console.log("문제 개수 확인 : "+count);
    if (count===10) {
      navigate('/Rank',{state:{nickname,correctAnswers}});
      console.log("전송", nickname,correctAnswers);
    }
    
  }

  function onSubmitHandler2(evt) {
    evt.preventDefault();
    onRandomHandler();
  }

  // 입력폼 핸들러 
  function onChangeHandler(evt) {
    let text = evt.target.value;
    setAnswer(text);
  }

  // 랜덤 문제 설정
  function onRandomHandler(evt) {
    //TODO 중복여부 체크 진행 코드 만들기
    const Randomidx = parseInt(Math.random()*IDIOM_LENGTH);
    let ranVal = alldata[Randomidx];
    setQuestion(ranVal);
    setChecked(0);
  }
  
  useMemo(() => {
    console.log('메모이제이션 최초 세팅-데이터')
    getAllProducts()
    .then(data =>{
      setAlldata(data);
    });    
  },[]); 


  /**
   * 메모이제이션에서 데이터를 늦게 가져오게 되어 useEffect에서 데이터를 랜덤으로 지정하는 단계에서 에러가 발생
   * 
   */

  // useEffect( ()=>{
  //   // setTimeout(() => console.log('Initial timeout!'), 1000);
  //   console.log("랜덤 선택");
  //   const Randomidx = parseInt(Math.random()*IDIOM_LENGTH);
  //   let ranVal = alldata[Randomidx];
  //   console.log(ranVal,alldata);
  //   // setQuestion([ranVal.mean,ranVal.answer])
  //   // console.log("선택된 값 :",question );
  // },[]);

  
  // 조건부 렌더링 방식으로 처리
  function formChange() {
    if (checked===0) { 
      return (
        <form id="inputForm" onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center gap-4 w-full px-6">
        <input
            type="text"
            className="outline outline-offset-2 
                        outline-black-500/50 w-3/4 
                        px-4 py-2 rounded-md
                        text-lg placeholder:text-center"
            value={answer}
            placeholder="정답을 입력하세요"
            onChange={onChangeHandler}/>
          <div
              className="flex justify-center items-center mt-20 
              :text-white transition-colors px-6 py-2 rounded-md cursor-pointer">

              
            <button
                className="outline outline-offset-2 outline-green-500/50 
                hover:bg-green-500 hover:text-white 
                transition-colors px-4 py-1 rounded-md"
                type="button"
                onClick={onSubmitHandler}>
                <AiFillCaretRight />
            </button>
            </div>
    </form>
      );
    }
    else if (checked===1) {
      let showWord = question.word
      return (
        <form id="inputForm" className="flex flex-col justify-center items-center gap-4 w-full px-6">
            <p className="text-red-500 font-semibold">오답!</p>
            <p className="px-4 py-2 rounded-md text-x1 ">{showWord}</p>
            

            <div
              className="flex justify-center items-center mt-20
              :text-white transition-colors rounded-md cursor-pointer">
            <button
                className="outline outline-offset-2 outline-green-500/50 
                hover:bg-green-500 hover:text-white 
                transition-colors px-4 py-1 rounded-md"
                    type="button"
                    onClick={onSubmitHandler2}>
                    <AiFillCaretRight />
                </button>
            </div>
        </form>
      );
    }
    else {
      let showWord = question.word
      console.log(showWord);
      return (
        <form id="inputForm" className="flex flex-col justify-center items-center gap-4 w-full px-6">
            <p className="text-blue-500 font-semibold">정답!</p>
            <p className="px-4 py-2 rounded-md text-x1 ">{showWord}</p>
            

            <div
              className="flex justify-center items-center mt-20
              :text-white transition-colors rounded-md cursor-pointer">
            <button
                className="outline outline-offset-2 outline-green-500/50 
                hover:bg-green-500 hover:text-white 
                transition-colors px-4 py-1 rounded-md "
                    type="button"
                    onClick={onSubmitHandler2}>
                    <AiFillCaretRight />
                </button>
            </div>
        </form>
    );
    }
  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-[390px] h-[874px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="pb-6 text-center">
            <p className="text-xl font-bold px-4">{question.mean}</p>
        </div>

      
      {formChange()}
    </div>
    </div>
  );
}

export default Qustion;