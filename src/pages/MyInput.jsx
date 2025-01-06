import {useNavigate} from 'react-router-dom'
import React from "react";

import {  
    useState,       // 상태변수 -> 화면갱신
} from "react";

function MyInput() {
    // 별명(닉네임) 입력 초기 설정
    const [nickname,setnickname] = useState("");

    // 다음 페이지 전달
    const navigate = useNavigate();

    // input 값 입력시 변경되게 설정
    function onChangeHandler(evt) {
        let ori_text = evt.target.value;
        setnickname(ori_text)

    }
    // 제출했을 때 반응하는 핸들러
    function onSubmitHandler(evt) {
        evt.preventDefault();
        // 공백 체크 
        if (nickname.length===0) {
            alert("닉네임을 입력해주세요")
        }
        // 중복 체크
        //TODO 1.추후에 유효성 체크
        else if (nickname==='김강빈') {
            // 추후에 유효성 검사
            alert("다른 닉네임으로 입력해주세요")
        }
        // navigate를 사용하여 다음페이지 전달
        else {
            navigate('/Qustion',{state:{nickname}});
            console.log("전송", nickname);
        }
        setnickname("");
    }

    const inputstyle = {
        border : '1px solid black',
        borderRadius : '5px',
        height : '3em',
        width : '30em',
        textAlign : 'center'
    }
    
    const buttonstyle = {
        backgroundColor : 'red',
        color : 'white',
        border : '1px solid black',
        borderRadius : '5px',
        margin : '10em',
        height : '3em',
        width : '8em'
    }

    return (
        
        <div >
            닉네임을 입력해주세요
            <form onSubmit={onSubmitHandler}>
                <input 
                type="text"
                value={nickname}
                placeholder="닉네임을 입력해주세요" onChange={onChangeHandler}
                style={inputstyle}/>
                <br/>
                <button onClick={() => {
                }} style={buttonstyle}> 게임 시작</button>
            </form>
        </div>
    );}

export default MyInput
