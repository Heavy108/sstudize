import {Flag} from "lucide-react"
const QuestionHeader = ({
  currentQuestionIndex,
  totalQuestions,
  currentSubject,
  questionId,
  reviewLater,
  onReviewLater,
}) => {
  return (
    <div className="border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {currentSubject.charAt(0).toUpperCase() + currentSubject.slice(1)}
          </span>
        </div>
        <button
          onClick={onReviewLater}
          className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
            reviewLater.has(questionId)
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Flag className="h-4 w-4" />
          <span>
            {reviewLater.has(questionId) ? "Remove Flag" : "Review Later"}
          </span>
        </button>
      </div>
    </div>
  );
};
export default QuestionHeader;