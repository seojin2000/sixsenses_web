import React, { useState } from 'react';
import userData from '../json/users.json';

const ListPage = () => {
  const [isToggled, setIsToggled] = useState(false);
  
  // 점수가 높은 순으로 정렬하고 상위 5명만 선택
  const topFiveUsers = userData.users
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const users =  userData.users
  return (
    <div className="w-[390px] h-[844px] mx-auto bg-white relative">
      <div className="flex flex-col h-full p-4">
        {/* 헤더 영역 */}
        <div className="pt-8 pb-6">
          <h1 className="text-center text-xl mb-2">모두 {users[0].name}개 맞췄습니다.</h1>
          <h2 className="text-center text-lg">전체 {userData.totalParticipants}등입니다</h2>
        </div>

        {/* 리스트 영역 */}
        <div className="flex-1 overflow-y-auto">
          {topFiveUsers.map((user, index) => (
            <div key={user.id} className="flex justify-between py-3 border-b">
              <div className="flex">
                <span className="mr-2">{index + 1}.</span>
                <span>{user.name}</span>
              </div>
              <span>{user.score}개</span>
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="py-6">
          <button className="w-full bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors">
            재도전
          </button>
        </div>
      </div>

      {/* 토글 스위치 */}
      <div className="absolute top-4 right-4 flex items-center">
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
  );
};

export default ListPage;