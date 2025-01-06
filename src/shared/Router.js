/**
 * Route 페이지 관련 코드
 * 페이지 순서를 정해서 진행시키기
 * <BrowserRouter>
 *      <Routes>
 *          <Route>
 * 순으로 묶어서 진행
 */
import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import MyInput from "../pages/MyInput";
import Question from '../pages/Question';
import Rank from '../pages/Rank';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyInput />} /> // 닉네임
                <Route path="/Qustion" element={<Question />} /> // 문제를 푸는곳                
                <Route path="/Rank" element={<Rank />} /> // 랭킹 페이지
                
            </Routes>
        </BrowserRouter>
    );
};

export default Router;