import QuestionHeader from "./QuestionHeader";
import QuestionOptions from "../ui/QuestionOptions";
import NavigationControls from "../navigation/NavigationControls";
const QuestionDisplay = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  currentSubject,
  selectedAnswer,
  reviewLater,
  onAnswerSelect,
  onReviewLater,
  onNavigate,
  getQuestionStatus,
}) => {
  const questionStatus = getQuestionStatus(question.id);
  const isReviewLater = reviewLater.has(question.id);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <QuestionHeader
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        currentSubject={currentSubject}
        questionId={question.id}
        reviewLater={reviewLater}
        onReviewLater={onReviewLater}
      />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {question.question}
          </h2>

          <QuestionOptions
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={onAnswerSelect}
          />
        </div>

        <NavigationControls
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          onNavigate={onNavigate}
          questionStatus={questionStatus}
          isReviewLater={isReviewLater}
        />
      </div>
    </div>
  );
};
export default QuestionDisplay;