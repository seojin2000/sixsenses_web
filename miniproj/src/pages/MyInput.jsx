import {useNavigate} from 'react-router-dom'
import React from "react";

import {  
    useState,       // 상태변수 -> 화면갱신
} from "react";

function MyInput() {
    const [nickname,setnickname] = useState("");

    // 다음 페이지 전달
    const navigate = useNavigate();

    function onChangeHandler(evt) {
        let ori_text = evt.target.value;
        setnickname(ori_text)

    }
    function onSubmitHandler(evt) {
        evt.preventDefault();
        if (nickname.length===0) {
            // 공백 체크 
            alert("닉네임을 입력해주세요")
        }
        else if (nickname==='김강빈') {
            // 추후에 유효성 검사
            alert("다른 닉네임으로 입력해주세요")
        }
        else {
            navigate('/Qustion?query='+ nickname,{state:{nickname}});
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
