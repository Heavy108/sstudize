import {Clock} from "lucide-react"
const ExamTimer = ({ timeRemaining, onTimeUp }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = timeRemaining < 300; // Less than 5 minutes

  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
        isLowTime ? "bg-red-100" : "bg-red-50"
      }`}
    >
      <Clock
        className={`h-5 w-5 ${isLowTime ? "text-red-700" : "text-red-600"}`}
      />
      <span
        className={`font-mono text-lg font-bold ${
          isLowTime ? "text-red-700 animate-pulse" : "text-red-600"
        }`}
      >
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};
export default ExamTimer;