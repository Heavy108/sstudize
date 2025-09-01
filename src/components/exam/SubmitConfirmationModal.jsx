import { AlertCircle } from "lucide-react";
const SubmitConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  unansweredCount,
  reviewCount,
  timeRemaining,
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-gray-900">Submit Exam?</h3>
        </div>
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to submit your exam? You have:
          </p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• {answeredCount} questions answered</li>
            <li>• {unansweredCount} questions unanswered</li>
            <li>• {reviewCount} questions marked for review</li>
            <li>• {formatTime(timeRemaining)} time remaining</li>
          </ul>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Exam
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default SubmitConfirmationModal;
