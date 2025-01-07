import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react"; // useEffect 추가
import '../TailWindStyle.css';

function FlashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/input');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="w-[390px] h-[844px] bg-white relative flex flex-col justify-center items-center">
                {/* 로딩 스피너 */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mb-8"></div>
                
                {/* 로딩 텍스트 */}
                <h1 className="text-2xl font-bold mb-4 animate-pulse">사자성어 퀴즈</h1>
                <p className="text-gray-600 text-center px-4">
                    잠시만 기다려주세요...
                </p>
            </div>
        </div>
    );
}

export default FlashScreen;