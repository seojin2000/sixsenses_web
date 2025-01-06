import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import MyInput from "../pages/MyInput";
import Question from '../pages/Question';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyInput />} /> // 닉네임
                <Route path="/Qustion" element={<Question />} /> // 문제를 푸는곳
            </Routes>
        </BrowserRouter>
    );
};

export default Router;