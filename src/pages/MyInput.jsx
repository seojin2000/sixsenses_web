/**
 * 1. 로그인(닉네임 페이지 관련 코드)
 *  - 공백,중복 체크 확인하기
 */
import {useNavigate} from 'react-router-dom'
import React from "react";
import '../TailWindStyle.css';

import axios from "axios"; //API 호출

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

        if (nickname.trim().length === 0) {
            alert("닉네임을 입력해주세요");
            return;
        }

        // 1. 닉네임 중복 확인 API 호출
        axios.get(`http://localhost:8080/auth/check-nickname`, { params: { nickname } })
            .then((response) => {
                // 2. 닉네임 중복 여부 처리
                if (!response.data) {
                    // 닉네임 중복 없음 -> 로그인 요청
                    axios.post(`http://localhost:8080/auth/login`, null, { params: { nickname } })
                        .then((loginResponse) => {
                            alert(loginResponse.data); // 로그인 성공 메시지 출력
                            navigate('/Qustion', { state: { nickname } }); // 성공 시 다음 페이지로 이동
                        })
                        .catch((loginError) => {
                            console.error(loginError);
                            alert("로그인 중 문제가 발생했습니다.");
                        });
                } else {
                    alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("중복 확인 중 문제가 발생했습니다.");
            });
    }

    return (
        // TailWindStyle CSS를 사용하여 폼 구축진행
        <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
        <div className="w-[390px] h-[874px] bg-white rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className="flex flex-col h-full p-4 w-full">
            <form onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center w-full h-full">
                <div>
                    <h1 className="text-4xl font-bold">사자성어 퀴즈!</h1>
                </div>
                <div className="pt-20 pb-6 text-center">
                    <h1 className="text-xl font-bold">이름(별명)을 입력해주세요</h1>
                </div>
                <div className="pb-20 mb-20 w-full flex justify-center">
                    <input
                        className="outline outline-offset-2 
                        outline-black-500/50 w-3/4 
                        px-4 py-2 rounded-md
                        text-lg placeholder:text-center"
                        type="text"
                        value={nickname}
                        placeholder="이름(별명)을 입력해주세요"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="flex justify-center items-center mt-20 
                    outline outline-offset-2 outline-red-500 hover:bg-red-500 
                    :text-white transition-colors px-6 py-2 rounded-md cursor-pointer">
                    <button
                        className="text-lg font-semibold"
                        size="md"
                        type="button"
                        onClick={onSubmitHandler}>
                        게임 시작
                    </button>
                </div>
            </form>
        </div>
        </div>
        </div>
    );}

export default MyInput
