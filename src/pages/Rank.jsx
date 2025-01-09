import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Rank = () => {
  const [isToggled, setIsToggled] = useState(false); // 토글 상태
  const [users, setUsers] = useState([]); // 전체 사용자 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentRank, setCurrentRank] = useState(0); // 현재 사용자 등수
  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.state?.nickname; // 현재 사용자 닉네임
  const correctAnswers = location.state?.correctAnswers;

  // 사용자 데이터와 본인 등수 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전체 사용자 데이터 가져오기
        const usersResponse = await axios.get('http://localhost:8080/api/users/rankings');
        setUsers(usersResponse.data);

        // 본인 등수 가져오기
        const rankResponse = await axios.get(`http://localhost:8080/api/users/rank?nickname=${nickname}`);
        setCurrentRank(rankResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nickname]);

  // 본인 등수를 기준으로 위/아래 두 개씩 사용자 가져오기
  const getSurroundingUsers = () => {
    if (currentRank <= 0) return []; // 본인 등수가 없을 경우 빈 배열 반환

    const start = Math.max(0, currentRank - 2); // 배열 인덱스는 0부터 시작하므로 -2
    const end = Math.min(users.length, currentRank + 1); // 본인 등수 +1
    return users.slice(start, end);
  };

  // 토글 상태에 따라 표시할 사용자 목록 결정
  const displayUsers = isToggled ? getSurroundingUsers() : users;

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-96 h-[844px] bg-white rounded-lg shadow-lg relative">
          {/* 토글 스위치 */}
          <div className="absolute top-4 right-4 flex items-center">
            <span className="text-sm mr-2">내 등수 기준 보기</span>
            <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    isToggled ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => setIsToggled(!isToggled)}
            >
              <div
                  className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                      isToggled ? "translate-x-6" : "translate-x-0"
                  }`}
              ></div>
            </div>
          </div>

          <div className="flex flex-col h-full p-4">
            {/* 본인 정보 */}
            <div className="pt-16 pb-6">
              <h1 className="text-center text-xl mb-2">
                {nickname}님 총 {correctAnswers}개 맞췄습니다.
              </h1>
              <h2 className="text-center text-lg">
                전체 {currentRank > 0 ? currentRank : "등수를 계산할 수 없습니다."}등입니다
              </h2>
            </div>

            {/* 사용자 랭킹 리스트 */}
            <div className="flex-1 overflow-y-auto">
              {displayUsers.map((user, index) => (
                  <div key={user.id} className="flex justify-between py-3 border-b">
                    <div className="flex">
                  <span className="mr-2">
                    {isToggled
                        ? users.findIndex(u => u.id === user.id) + 1 // 실제 등수 표시
                        : index + 1}.
                  </span>
                      <span className={user.nickname === nickname ? "font-bold" : ""}>
                    {user.nickname}
                  </span>
                    </div>
                    <span>{user.score}개</span>
                  </div>
              ))}
            </div>

            {/* 재도전 버튼 */}
            <div className="py-6">
              <button
                  className="w-full bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors"
                  onClick={() => navigate("/")}
              >
                재도전
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Rank;
