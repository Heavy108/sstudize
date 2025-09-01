import { CheckCircle,Flag,Circle } from "lucide-react";
const StatusLegend = ({ answeredCount, reviewCount, unansweredCount }) => {
  return (
    <div className="space-y-2 text-sm">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Progress</h4>
      <div className="flex items-center space-x-2 text-black">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <span>Answered: {answeredCount}</span>
      </div>
      <div className="flex items-center space-x-2 text-black">
        <Flag className="h-4 w-4 text-yellow-600" />
        <span>Review Later: {reviewCount}</span>
      </div>
      <div className="flex items-center space-x-2 text-black">
        <Circle className="h-4 w-4 text-gray-600" />
        <span>Unanswered: {unansweredCount}</span>
      </div>
    </div>
  );
};
export default StatusLegend;
