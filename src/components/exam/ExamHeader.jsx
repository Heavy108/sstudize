import ExamTimer from "./ExamTimer";
const ExamHeader = ({ timeRemaining, onSubmit, onTimeUp }) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Competitive Exam Portal
          </h1>
          <div className="flex items-center space-x-4">
            <ExamTimer timeRemaining={timeRemaining} onTimeUp={onTimeUp} />
            <button
              onClick={onSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExamHeader;