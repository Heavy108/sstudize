const QuestionGrid = ({
  questions,
  currentQuestionIndex,
  answers,
  reviewLater,
  onQuestionSelect,
  getQuestionStatus,
}) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Questions</h4>
      <div className="grid grid-cols-3 gap-2">
        {questions.map((question, index) => {
          const status = getQuestionStatus(question.id);
          const isCurrentQuestion = index === currentQuestionIndex;
          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={`p-2 rounded text-sm font-medium transition-colors ${
                isCurrentQuestion
                  ? "bg-blue-600 text-white"
                  : status === "answered"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : status === "review"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default QuestionGrid;
