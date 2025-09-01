import { BookOpen } from "lucide-react";
import photo from "@/assets/left.png";
import Image from "next/image";

const StartScreen = ({ onStartExam }) => {
  return (
      <div className="bg-white  flex flex-col md:flex-row overflow-hidden w-full ">
        {/* Left Side: Image */}
        <div className="w-full md:w-[60%] ">
          <Image
            src={photo}
            alt="Exam Illustration"
            className="w-full h-[45rem] m-4 object-contain"
            priority
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-center md:text-left">
          <BookOpen className="mx-auto md:mx-0 h-16 w-16 text-blue-600 mb-4" />

          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Competitive Exam
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Physics, Chemistry & Mathematics
          </p>

          {/* Optional Info Box */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-blue-800">
              <strong>Duration:</strong> 1 Hour
              <br />
              <strong>Questions:</strong> 9 Total
              <br />
              <strong>Subjects:</strong> Physics (3), Chemistry (3), Math (3)
            </p>
          </div>

          <button
            onClick={onStartExam}
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Start Exam
          </button>
        </div>
      </div>
  );
};

export default StartScreen;