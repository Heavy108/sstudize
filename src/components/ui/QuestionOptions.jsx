const QuestionOptions = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedAnswer === index
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            checked={selectedAnswer === index}
            onChange={() => onAnswerSelect(index)}
            className="h-4 w-4 text-blue-600 mr-3"
          />
          <span className="text-gray-900">{option}</span>
        </label>
      ))}
    </div>
  );
};
export default QuestionOptions;

