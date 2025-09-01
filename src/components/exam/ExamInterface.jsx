'use client'
import React, { useState, useEffect, useCallback } from "react";
import ExamHeader from "./ExamHeader";
import StartScreen from "./StartScreen";
import NavigationSidebar from "./NavigationSidebar";
import QuestionDisplay from "./QuestionDisplay";
import StatisticsCards from "./StatisticsCards";
import SubmitConfirmationModal from "./SubmitConfirmationModal";
import AutoSaveIndicator from "./AutoSaveIndicator";
import { AlertCircle } from "lucide-react";
const examData = {
  physics: [
    {
      id: 1,
      question:
        "A body of mass 2 kg is moving with velocity 10 m/s. What is its kinetic energy?",
      options: ["50 J", "100 J", "200 J", "25 J"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "The unit of electric current is:",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"],
      correctAnswer: 0,
    },
  ],
  chemistry: [
    {
      id: 4,
      question: "What is the atomic number of Carbon?",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: 2,
    },
    {
      id: 6,
      question: "The pH of pure water is:",
      options: ["6", "7", "8", "9"],
      correctAnswer: 1,
    },
  ],
  math: [
    {
      id: 7,
      question: "What is the value of π (pi) approximately?",
      options: ["3.14", "3.41", "4.13", "1.34"],
      correctAnswer: 0,
    },
    {
      id: 8,
      question: "If 2x + 5 = 15, what is the value of x?",
      options: ["5", "10", "7.5", "2.5"],
      correctAnswer: 0,
    },
    {
      id: 9,
      question: "What is 12! (12 factorial)?",
      options: ["479,001,600", "39,916,800", "3,628,800", "479,016,800"],
      correctAnswer: 0,
    },
  ],
};
const TabWarningModal = ({ isOpen, onClose, switchCount }) => {
  if (!isOpen) return null;

  const remainingAttempts = 3 - switchCount;

  return (
    <div className="fixed inset-0 bg-red-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full border-4 border-red-500">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h3 className="text-xl font-bold text-red-900">Security Warning!</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-800 font-medium mb-3">
            Tab switching is not allowed during the exam!
          </p>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Violation {switchCount} of 3</strong><br/>
              {remainingAttempts > 0 
                ? `You have ${remainingAttempts} warning(s) left. The exam will be auto-submitted after 3 violations.`
                : 'This is your final warning!'
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          I Understand - Continue Exam
        </button>
      </div>
    </div>
  );
};
// import startExam from "@/components/exam/"
const ExamInterface = () => {
  const [currentSubject, setCurrentSubject] = useState("physics");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewLater, setReviewLater] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(360); // 1 hour in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showAutoSave, setShowAutoSave] = useState(false);

  // Get current subject questions
  const subjectQuestions = examData[currentSubject] || [];
  const currentQuestion = subjectQuestions[currentQuestionIndex] || null;
  const subjects = Object.keys(examData);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [lastWarningTime, setLastWarningTime] = useState(0);
  
    const handleAnswerSelect = (optionIndex) => {
      setAnswers((prev) => {
        const newAnswers = {
          ...prev,
          [currentQuestion.id]: optionIndex,
        };

        setTimeout(() => {
          const state = {
            currentSubject,
            currentQuestionIndex,
            answers: newAnswers,
            reviewLater: Array.from(reviewLater),
            timeRemaining,
            examStarted,
          };
          localStorage.setItem("examState", JSON.stringify(state));
          console.log("💾 Immediate save after answer:", state);
        }, 100);

        return newAnswers;
      });
    };

    const handleReviewLater = () => {
      setReviewLater((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(currentQuestion.id)) {
          newSet.delete(currentQuestion.id);
        } else {
          newSet.add(currentQuestion.id);
        }
        return newSet;
      });
    };

    const navigateToQuestion = (direction) => {
      if (
        direction === "next" &&
        currentQuestionIndex < subjectQuestions.length - 1
      ) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else if (direction === "previous" && currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      }
    };

    const switchSubject = (subject) => {
      setCurrentSubject(subject);
      setCurrentQuestionIndex(0); 
    };

    const getQuestionStatus = (questionId) => {
      if (answers[questionId] !== undefined) return "answered";
      if (reviewLater.has(questionId)) return "review";
      return "unanswered";
    };

    const handleSubmitExam = () => {
      const allQuestions = Object.values(examData).flat();
      const totalQuestions = allQuestions.length;
      const attempted = Object.keys(answers).length;
      const notAttempted = totalQuestions - attempted;
      const reviewMarked = reviewLater.size;

      const stats = {
        totalQuestions,
        attempted,
        notAttempted,
        reviewMarked,
      };

      console.log("Exam Stats:", stats);

      localStorage.removeItem("examState");

      setExamStarted(false);
      alert(
        `Exam submitted!\nStats:\nAttempted: ${attempted}\nNot Attempted: ${notAttempted}\nMarked for Review: ${reviewMarked}`
      );
    };

    const startExam = () => {
      setExamStarted(true);
    };

    const answeredCount = Object.keys(answers).filter((id) =>
      subjectQuestions.some((q) => q.id === parseInt(id))
    ).length;
    const reviewCount = Array.from(reviewLater).filter((id) =>
      subjectQuestions.some((q) => q.id === id)
    ).length;
    const unansweredCount = subjectQuestions.length - answeredCount;
  useEffect(() => {
    if (!examStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const now = Date.now();

        if (now - lastWarningTime > 2000) {
          setTabSwitchCount((prev) => {
            const newCount = prev + 1;
            console.log(`⚠️ Tab switch detected! Count: ${newCount}/3`);

            if (newCount >= 3) {
              setTimeout(() => {
                alert("Exam auto-submitted due to multiple tab switches!");
                handleSubmitExam();
              }, 100);
              return newCount;
            } else {
              setShowTabWarning(true);
              setLastWarningTime(now);
              return newCount;
            }
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [examStarted, lastWarningTime, handleSubmitExam]);
  const saveState = useCallback(() => {
    if (!examStarted) return;

    const state = {
      currentSubject,
      currentQuestionIndex,
      answers,
      reviewLater: Array.from(reviewLater),
      timeRemaining,
      examStarted,
      tabSwitchCount, // Add this line
    };

    setShowAutoSave(true);
    setTimeout(() => setShowAutoSave(false), 1000);

    try {
      localStorage.setItem("examState", JSON.stringify(state));
      console.log("✅ Auto-saved to localStorage:", state);
    } catch (error) {
      console.error("❌ Error saving to localStorage:", error);
    }
  }, [
    currentSubject,
    currentQuestionIndex,
    answers,
    reviewLater,
    timeRemaining,
    examStarted,
    tabSwitchCount,
  ]);
 
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("examState");
      if (savedState) {
        const state = JSON.parse(savedState);
        console.log("📥 Loading saved state:", state);

        setCurrentSubject(state.currentSubject || state.subject || "physics");
        setCurrentQuestionIndex(state.currentQuestionIndex || 0);
        setAnswers(state.answers || {});
        setReviewLater(new Set(state.reviewLater || []));
        setTimeRemaining(state.timeRemaining || 3600);
        setExamStarted(state.examStarted || false);
        setTabSwitchCount(state.tabSwitchCount || 0); // Add this line
      }
    } catch (error) {
      console.error("❌ Error loading saved state:", error);
    }
  }, []);

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, timeRemaining]);

  useEffect(() => {
    if (examStarted) {
      const interval = setInterval(() => {
        const state = {
          currentSubject,
          currentQuestionIndex,
          answers,
          reviewLater: Array.from(reviewLater),
          timeRemaining,
          examStarted,
        };

        try {
          localStorage.setItem("examState", JSON.stringify(state));
          console.log("🔄 Regular auto-save (5s interval):", state);

          setShowAutoSave(true);
          setTimeout(() => setShowAutoSave(false), 1000);
        } catch (error) {
          console.error("❌ Error in regular auto-save:", error);
        }
      }, 5000); 

      return () => clearInterval(interval);
    }
  }, [
    currentSubject,
    currentQuestionIndex,
    answers,
    reviewLater,
    timeRemaining,
    examStarted,
  ]);

useEffect(() => {
  if (!examStarted) return;

  // Disable right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  // Disable copy, cut, paste
  const handleCopyCutPaste = (e) => {
    e.preventDefault();
  };

  // Disable text selection
  const handleSelectStart = (e) => {
    e.preventDefault();
  };

  // Optional: Disable Ctrl+C, Ctrl+V
  const handleKeyDown = (e) => {
    if (e.ctrlKey && ["c", "x", "v"].includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  };

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("copy", handleCopyCutPaste);
  document.addEventListener("cut", handleCopyCutPaste);
  document.addEventListener("paste", handleCopyCutPaste);
  document.addEventListener("selectstart", handleSelectStart);
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("copy", handleCopyCutPaste);
    document.removeEventListener("cut", handleCopyCutPaste);
    document.removeEventListener("paste", handleCopyCutPaste);
    document.removeEventListener("selectstart", handleSelectStart);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [examStarted]);


  if (!examStarted) {
    return <StartScreen onStartExam={startExam} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        timeRemaining={timeRemaining}
        onSubmit={() => setShowSubmitConfirm(true)}
        onTimeUp={handleSubmitExam}
      />

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-1">
          <NavigationSidebar
            subjects={subjects}
            currentSubject={currentSubject}
            questions={subjectQuestions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            reviewLater={reviewLater}
            onSubjectChange={switchSubject}
            onQuestionSelect={setCurrentQuestionIndex}
            getQuestionStatus={getQuestionStatus}
          />
        </div>

        {/* Main Question Area */}
        <div className="lg:col-span-3">
          {currentQuestion ? (
            <QuestionDisplay
              question={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={subjectQuestions.length}
              currentSubject={currentSubject}
              selectedAnswer={answers[currentQuestion.id]}
              reviewLater={reviewLater}
              onAnswerSelect={handleAnswerSelect}
              onReviewLater={handleReviewLater}
              onNavigate={navigateToQuestion}
              getQuestionStatus={getQuestionStatus}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">
                No questions available for this subject.
              </p>
            </div>
          )}

          <StatisticsCards
            answeredCount={answeredCount}
            reviewCount={reviewCount}
            unansweredCount={unansweredCount}
          />
        </div>
      </div>

      <SubmitConfirmationModal
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        onConfirm={handleSubmitExam}
        answeredCount={Object.keys(answers).length}
        unansweredCount={
          Object.values(examData).flat().length - Object.keys(answers).length
        }
        reviewCount={reviewLater.size}
        timeRemaining={timeRemaining}
      />
      <TabWarningModal
        isOpen={showTabWarning}
        onClose={() => setShowTabWarning(false)}
        switchCount={tabSwitchCount}
      />
      <AutoSaveIndicator show={showAutoSave} />
    </div>
  );
};

export default ExamInterface;