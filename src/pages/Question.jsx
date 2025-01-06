import { useState,useMemo,useEffect} from 'react';
import axios from 'axios'; // 통신모듈

const IDIOM_URL = "http://127.0.0.1:5500/miniproj/src/data/idiom2.json"
const IDIOM_LENGTH = 10


async function getAllProducts() {
  const res = await axios.get(IDIOM_URL);
  return res.data.map((product,idx) => {
      const {word,mean} = product
      return ({word,mean}
      );
  });
}


function Qustion() {
  const [answer,setAnswer] = useState("");
  const [alldata,setAlldata] = useState("")
  const [question,setQuestion] = useState(["어릴 때부터 같이 놀던 가까운 친구를 뜻","죽마고우"]);

  function onChangeHandler2(evt) {
    let text = evt.target.value;
    setAnswer(text);

  }
  function onSubmitHandler2(evt) {
    console.log(evt.target.value)
    if (answer.length === 0) {
      alert("답을 입력해주세요")
      setAnswer("")
      return 
    }
    if (answer !== question[1]) {
      console.log("오답입니다");
    }
    else {
      console.log("정답입니다");
    }
    setAnswer("");
  }

  useMemo(() => {
    console.log('메모이제이션 최초 세팅-데이터')
    getAllProducts()
    .then(data =>{
      console.log("전체 데이터 : ",data);
      setAlldata(data);
    });    
  },[]); 

  useEffect( ()=>{
    console.log("랜덤 선택");
    const Randomidx = parseInt(Math.random()*IDIOM_LENGTH);
    let ranVal = alldata[Randomidx];
    console.log(ranVal,alldata);
    // setQuestion([ranVal.mean,ranVal.answer])
    // console.log("선택된 값 :",question );
  },[]);

  
  const buttonStyle = {
    marginLeft : '1.5em'
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler2}>
      <p> 안녕하세요</p>
      {/* <p> {question[0]}</p> */}
      <br/>
      <input 
      type='text'
      className='Anwser'
      input={answer}
      
      onChange={onChangeHandler2}
      />
      {/* 버튼 타입을 안하면 새로고침이 발생할수 있다. */}
      <button type="button" style={buttonStyle}> 정답</button>

      </form>
    </div>
  );
}

export default Qustion;