/**
 * 문제 페이지 입니다.
 */
import { useState,useMemo} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'; // 통신모듈

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


function Qustion() {
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

  
  const buttonStyle = {
    marginLeft : '1.5em'
  }
  // 조건부 렌더링 방식으로 처리
  function formChange() {
    if (checked===0) { 
      return (
        <form id='inputForm' onSubmit={onSubmitHandler}>
          <br/>
          <input 
          type='text'
          className='outline outline-offset-2 outline-blue-500/50'
          value={answer}
          onChange={onChangeHandler}/>
          {/* 버튼 타입을 안하면 새로고침이 발생할수 있다. */}
          <button 
          className='outline outline-offset-2 outline-green-500/50'
          type="button" onClick={onSubmitHandler} style={buttonStyle}> {'>'} </button>
          </form>
      );
    }
    else if (checked===1) {
      let showWord = question.word
      return (
        <form>
          {showWord}
          <p>오답입니다</p>
          <button 
          className='outline outline-offset-2 outline-green-500/50'
          type='button' onClick={onSubmitHandler2} style={buttonStyle}> {'다음 문제'}</button>
        </form>
      );
    }
    else {
      let showWord = question.word
      console.log(showWord);
      return (
        <form>
          {showWord}
          <p>정답입니다</p>
          <button 
          className='outline outline-offset-2 outline-green-500/50'
          type='button' onClick={onSubmitHandler2} style={buttonStyle}> {'다음 문제'}</button>
      </form>
    );
    }
  }

  return (
    <div >
      <p> {question.mean}</p>
      {formChange()}
    </div>
  );
}

export default Qustion;