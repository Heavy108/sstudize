import { CheckCircle,Flag } from "lucide-react";
const NavigationControls = ({
  currentQuestionIndex,
  totalQuestions,
  onNavigate,
  questionStatus,
  isReviewLater,
}) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <button
        onClick={() => onNavigate("previous")}
        disabled={currentQuestionIndex === 0}
        className="flex items-center space-x-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <span>← Previous</span>
      </button>

      <div className="flex items-center space-x-2">
        {questionStatus === "answered" && (
          <CheckCircle className="h-5 w-5 text-green-600" />
        )}
        {isReviewLater && <Flag className="h-5 w-5 text-yellow-600" />}
      </div>

      <button
        onClick={() => onNavigate("next")}
        disabled={currentQuestionIndex === totalQuestions - 1}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        <span>Next →</span>
      </button>
    </div>
  );
};
export default NavigationControls;
