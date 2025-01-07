import React, { useState } from 'react';
import userData from '../data/users.json';
import '../TailWindStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Rank = () => {
  const [isToggled, setIsToggled] = useState(false);
  const location = useLocation();
  const nickname = location.state?.nickname;  // state에서 nickname 가져오기, ?: ull 방지
  const correctAnswers = location.state?.correctAnswers;  // correctAnswers 가져오기
  const navigate = useNavigate();

  // 점수가 높은 순으로 정렬하고 상위 5명만 선택
  const topFiveUsers = userData.users
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const users = userData.users;
  
  // 특정 이름의 사용자 주변 순위 사용자들을 가져오는 함수
  const getSurroundingRankUsers = () => {
    const sortedUsers = userData.users.sort((a, b) => b.score - a.score);
    
    // name과 일치하는 사용자의 인덱스 찾기WWW
    const currentIndex = sortedUsers.findIndex(user => user.name === nickname);
    if (currentIndex === -1) {
      return (
        topFiveUsers,
        console.log('일차하는 닉네임 없음')
      );
      
    }
    
    // 상위 1명과 하위 1명, 그리고 현재 사용자를 포함한 배열 생성
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(sortedUsers.length, currentIndex + 2);
    
    return sortedUsers.slice(start, end);
  };

  // 현재 토글 상태에 따라 보여줄 사용자 리스트 선택
  const displayUsers = isToggled ? getSurroundingRankUsers() : topFiveUsers;

  // name과 일치하는 사용자 찾기
  const currentUser = users.find(user => user.name === nickname) || users[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <div className="w-[390px] h-[844px] mx-auto bg-white relative ">
      <div className="flex flex-col h-full p-4">
        

        {/* 헤더 영역 */}
        <div className="pt-20 pb-6">
          <h1 className="text-center text-xl mb-2">
            {nickname}님 총 {correctAnswers}개 맞췄습니다.
          </h1>
          <h2 className="text-center text-lg">
            전체 {}등입니다
          </h2>
        </div>

        {/* 리스트 영역 */}
        <div className="flex-1 overflow-y-auto">
          {displayUsers.map((user, index) => (
            <div key={user.id} className="flex justify-between py-3 border-b">
              <div className="flex">
                <span className="mr-2">{index + 1}.</span>
                <span className={user.name === nickname ? 'font-bold' : ''}>
                  {user.name}
                </span>
              </div>
              <span>{user.score}개</span>
            </div>
          ))}
        </div>

        {/* 재도전 버튼 영역 */}
        <div className="py-6">
          <button 
            className="w-full bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors"
            onClick={() => navigate('/')}
          >
            재도전
          </button>
        </div>
      </div>

      {/* 토글 스위치 */}
      <div className="absolute top-8 right-8 flex items-center">
        <span className="text-sm mr-2">
          {isToggled ? '전체 등수보기' : '내 등수 보기'}
        </span>
        <div
          className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300"
          onClick={() => setIsToggled(!isToggled)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
              isToggled ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Rank;