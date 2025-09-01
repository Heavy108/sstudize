const StatisticsCards = ({ answeredCount, reviewCount, unansweredCount }) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
        <div className="text-sm text-gray-600">Answered</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-yellow-600">{reviewCount}</div>
        <div className="text-sm text-gray-600">Review Later</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-gray-600">
          {unansweredCount}
        </div>
        <div className="text-sm text-gray-600">Unanswered</div>
      </div>
    </div>
  );
};
export default StatisticsCards;
