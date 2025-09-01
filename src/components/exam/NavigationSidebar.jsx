import SubjectNavigation from "../navigation/SubjectNavigation";
import QuestionGrid from "../navigation/QuestionGrid";
import StatusLegend from "../ui/StatusLegend";
const NavigationSidebar = ({
  subjects,
  currentSubject,
  questions,
  currentQuestionIndex,
  answers,
  reviewLater,
  onSubjectChange,
  onQuestionSelect,
  getQuestionStatus,
}) => {
  const answeredCount = Object.keys(answers).length;
  const reviewCount = reviewLater.size;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Question Navigation</h3>

      <SubjectNavigation
        subjects={subjects}
        currentSubject={currentSubject}
        onSubjectChange={onSubjectChange}
      />

      <QuestionGrid
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        reviewLater={reviewLater}
        onQuestionSelect={onQuestionSelect}
        getQuestionStatus={getQuestionStatus}
      />

      <StatusLegend
        answeredCount={answeredCount}
        reviewCount={reviewCount}
        unansweredCount={unansweredCount}
      />
    </div>
  );
};
export default NavigationSidebar;