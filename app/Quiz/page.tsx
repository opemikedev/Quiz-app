"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { quiz } from "../data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  category?: string;
}
const shuffleArray = (array: QuizQuestion[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
const getResultMessage = (percentage: number) => {
  if (percentage >= 90)
    return {
      message: "🏆 Union Master! Perfect score! 1",
      image: "/union/PerfectSmile.png",
    };
  if (percentage >= 75)
    return {
      message: "🌟 Great job! Almost perfect!",
      image: "/union/closePerfectSmile.png",
    };
  if (percentage >= 50)
    return {
      message: "📚 Solid effort! Keep going!",
      image: "union/closeAnger.png",
    };
  return {
    message: "😡 Go and study more about union",
    image: "/union/angry.png",
  };
};

const Page = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState(quiz.questions);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  // const [attempts, setAttempts] = useState<number>(0);
  // const [quizStarted, setQuizStarted] = useState<boolean>(false);

  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const questionHandleRef = useRef(false);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Shuffle questions on component mount
  useEffect(() => {
    setShuffledQuestions(shuffleArray(quiz.questions));
  }, []);

  const { question, answers, correctAnswer } =
    shuffledQuestions[activeQuestion];

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer === correctAnswer);
  };

  const nextQuestion = () => {
    if (questionHandleRef.current) return;
    questionHandleRef.current = true;

    setSelectedAnswerIndex(null);
    setTimeLeft(10);

    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== shuffledQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }

    setChecked(false);
  };

  const resetQuiz = () => {
    setShuffledQuestions(shuffleArray(quiz.questions));
    setActiveQuestion(0);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setTimeLeft(10);
    setIsTimerRunning(true);
  };

  const handleTimeExposed = useCallback(() => {
    if (questionHandleRef.current) return;
    questionHandleRef.current = true;

    setIsTimerRunning(false);
    setResult((prev) => ({ ...prev, wrongAnswers: prev.wrongAnswers + 1 }));
    setSelectedAnswerIndex(null);
    setChecked(false);

    if (activeQuestion < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setActiveQuestion((prev) => prev + 1);
        setIsTimerRunning(true);
      }, 500);
    } else {
      setShowResult(true);
    }
  }, [activeQuestion, shuffledQuestions.length]);

  useEffect(() => {
    if (!isTimerRunning || showResult) return;

    setTimeLeft(10);
    questionHandleRef.current = false;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExposed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuestion, isTimerRunning, showResult, handleTimeExposed]);

  return (
    <div className="min-h-screen py-12 px-4 relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source
          src="https://videos.cdn.union.build/app-union-background-10.webm"
          type="video/webm"
        />
      </video>

      <div className="max-w-2xl mx-auto bg-[#101013] rounded-xl shadow-lg overflow-hidden relative z-10">
        {!showResult && (
          <div className="bg-[#101013] p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                Question {activeQuestion + 1}
                <span className="text-[#4BB7C3]">
                  {" "}
                  / {shuffledQuestions.length}
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#4BB7C3] flex items-center justify-center">
                  <span className="text-xs font-bold">{timeLeft}</span>
                </div>
                <span>sec</span>
              </div>
            </div>
            <div className="w-full bg-black rounded-full h-2">
              <div
                className="bg-[#4BB7C3] h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="p-6">
          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-medium mb-6 text-white">
                  {question}
                </h3>

                <ul className="space-y-3 mb-8">
                  {answers.map((answer, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onAnswerSelected(answer, idx)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedAnswerIndex === idx
                          ? "border-[#4BB7C3] bg-[#4BB7C3] text-white font-medium"
                          : "border-gray-700 hover:bg-gray-800 text-white"
                      }`}
                    >
                      <span>{answer}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex justify-end">
                  {checked ? (
                    <Button
                      onClick={nextQuestion}
                      className="px-6 py-3 bg-[#4BB7C3] hover:bg-[#3aa7b3]"
                    >
                      {activeQuestion === shuffledQuestions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      className="px-6 py-3 text-gray-500"
                    >
                      {activeQuestion === shuffledQuestions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Quiz Results</h3>

              {(() => {
                const resultData = getResultMessage(
                  Math.round(
                    (result.score / (shuffledQuestions.length * 5)) * 100
                  )
                );
                return (
                  <div className="mb-6">
                    <div className="flex justify-center mb-4">
                      <Image
                        src={resultData.image}
                        width={100}
                        height={100}
                        alt="Result badge"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <p className="text-lg font-medium p-4 bg-[#4BB7C3]/10 rounded-lg border border-[#4BB7C3]">
                      {resultData.message}
                    </p>
                  </div>
                );
              })()}

              <div className="mb-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-700"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#4BB7C3]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${
                        (result.score / (shuffledQuestions.length * 5)) *
                        100 *
                        2.51
                      } 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                    {Math.round(
                      (result.score / (shuffledQuestions.length * 5)) * 100
                    )}
                    %
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Total Questions</p>
                  <p className="text-xl font-bold">
                    {shuffledQuestions.length}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Total Score</p>
                  <p className="text-xl font-bold">
                    {result.score}/{shuffledQuestions.length * 5}
                  </p>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Correct</p>
                  <p className="text-xl font-bold text-green-400">
                    {result.correctAnswers}
                  </p>
                </div>
                <div className="bg-red-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Wrong</p>
                  <p className="text-xl font-bold text-red-400">
                    {result.wrongAnswers}
                  </p>
                </div>
              </div>

              <Button
                onClick={resetQuiz}
                className="px-8 py-4 bg-[#4BB7C3] hover:bg-[#3aa7b3]"
              >
                Restart Quiz
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
