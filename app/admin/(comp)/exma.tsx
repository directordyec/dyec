/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2, BookOpen, FileQuestion, GraduationCap, Trophy, Target } from "lucide-react";

import { toast } from "sonner";
import CourseSelectorGrid from "./CourseSelectorGrid";
import NotesViewer from "./NotesViewer";
import QuizSection from "./QuizSection";

interface Chapter {
  chapterNumber: number;
  notesFileUrl: string;
  summary: string;
  quiz: { question: string; options: string[]; answer: string }[];
}

interface Subject {
  name: string;
  chapters: Chapter[];
}

// Add Unit interface to match what NotesViewer expects
interface Unit {
  unitNumber: number;
  notesFileUrl: string;
  summary: string;
  quiz: { question: string; options: string[]; answer: string }[];
}

type ViewMode = "notes" | "quiz";

export default function Exams() {
  const { isLoaded, user } = useUser();
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedChapterData, setSelectedChapterData] = useState<Chapter | null>(null);
  const [quiz, setQuiz] = useState<{ question: string; options: string[]; answer: string }[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("notes");

  const userId = user?.id || null;
  const userName = user?.fullName || "Unknown User";

  useEffect(() => {
    if (selectedExam && userId) {
      fetchSubjects(selectedExam);
    }
  }, [selectedExam, userId]);

  useEffect(() => {
    if (selectedChapterData && userId && viewMode === "notes") {
      logNotesAccess();
    }
  }, [selectedChapterData, userId, viewMode]);

  const fetchSubjects = async (exam: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/notes?exam=${encodeURIComponent(exam)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.exams && data.exams.length > 0) {
        let allSubjects: Subject[] = [];
        data.exams.forEach((exam: any) => {
          if (exam.subjects && Array.isArray(exam.subjects)) {
            allSubjects = [...allSubjects, ...exam.subjects];
          }
        });

        const uniqueSubjects = Array.from(
          new Map(allSubjects.map((subject) => [subject.name, subject])).values()
        );

        setSubjects(uniqueSubjects);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
      toast.error("Failed to load subjects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logNotesAccess = async () => {
    if (!userId || !selectedExam || !selectedSubject || !selectedChapter) {
      console.warn("Cannot log notes access: Missing required fields", {
        userId,
        selectedExam,
        selectedSubject,
        selectedChapter,
      });
      return;
    }

    const chapterNumber = parseInt(selectedChapter);
    if (isNaN(chapterNumber)) {
      console.warn("Invalid chapter number:", selectedChapter);
      toast.error("Invalid chapter selection.");
      return;
    }

    try {
      const response = await fetch("/api/student-activity-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          exam: selectedExam,
          subject: selectedSubject,
          chapterNumber,
          activityType: "notes_access",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      console.log("Notes access logged successfully:", {
        userId,
        exam: selectedExam,
        subject: selectedSubject,
        chapterNumber,
      });
    } catch (error) {
      console.error("Error logging notes access:", error);
      toast.error("Failed to log notes access. Please try again.");
    }
  };

  const handleExamChange = (value: string) => {
    setSelectedExam(value);
    setSelectedSubject("");
    setSelectedChapter("");
    setSubjects([]);
    setSelectedChapterData(null);
    setQuiz([]);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setViewMode("notes");
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedChapter("");
    setSelectedChapterData(null);
    setQuiz([]);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setViewMode("notes");
  };

  const handleChapterChange = (value: string) => {
    setSelectedChapter(value);
    const subject = subjects.find((s) => s.name === selectedSubject);
    const chapter = subject?.chapters.find((c) => c.chapterNumber.toString() === value);
    if (chapter) {
      setSelectedChapterData(chapter);
      const shuffledQuiz = chapter.quiz.sort(() => 0.5 - Math.random());
      setQuiz(shuffledQuiz.slice(0, Math.min(10, shuffledQuiz.length)));
    } else {
      setSelectedChapterData(null);
      setQuiz([]);
    }
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setViewMode("notes");
  };

  const handleAnswerChange = (questionIndex: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!userId || !selectedExam || !selectedSubject || !selectedChapter) {
      console.warn("Cannot submit quiz: Missing required fields", {
        userId,
        selectedExam,
        selectedSubject,
        selectedChapter,
      });
      toast.error("Please select all required fields.");
      return;
    }

    const chapterNumber = parseInt(selectedChapter);
    if (isNaN(chapterNumber)) {
      console.warn("Invalid chapter number:", selectedChapter);
      toast.error("Invalid chapter selection.");
      return;
    }

    const score = quiz.reduce((acc, question, index) => {
      return userAnswers[index.toString()] === question.answer ? acc + 1 : acc;
    }, 0);

    try {
      const response = await fetch("/api/student-activity-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          exam: selectedExam,
          subject: selectedSubject,
          chapterNumber,
          activityType: "quiz_submission",
          quizResult: {
            score,
            totalQuestions: quiz.length,
            answers: userAnswers,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      toast.success("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error logging quiz submission:", error);
      toast.error("Failed to submit quiz. Please try again.");
      return;
    }

    setQuizSubmitted(true);
    setQuizScore({ score, total: quiz.length });
  };

  const toggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Convert Chapter to Unit format for NotesViewer
  const convertChapterToUnit = (chapter: Chapter): Unit => {
    return {
      unitNumber: chapter.chapterNumber,
      notesFileUrl: chapter.notesFileUrl,
      summary: chapter.summary,
      quiz: chapter.quiz,
    };
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl rotate-12 opacity-25 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-pink-100 to-indigo-100 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="flex flex-col items-center gap-6 bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 relative z-10">
          <div className="relative">
            <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-indigo-200 animate-ping"></div>
          </div>
          <div className="text-center">
            <p className="text-indigo-800 font-bold text-xl mb-2">Loading Your Portal</p>
            <p className="text-indigo-600">Preparing your learning experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl rotate-12 opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-24 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg rotate-45 opacity-25"></div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/50 relative z-10">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Please sign in to access your competitive exam preparation materials and track your progress.
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4 border border-red-100">
            <p className="text-sm text-red-700">
              🔒 Secure access to premium study content
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle geometric grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(99,102,241,.03)_25%,rgba(99,102,241,.03)_26%,transparent_27%,transparent_74%,rgba(99,102,241,.03)_75%,rgba(99,102,241,.03)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl rotate-12 opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-24 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg rotate-45 opacity-25"></div>
        <div className="absolute bottom-16 right-1/3 w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-35 animate-pulse"></div>
        
        {/* Educational icons */}
        <div className="absolute top-24 right-1/3 text-indigo-300 opacity-20 animate-bounce" style={{animationDelay: '1s'}}>
          <Trophy className="w-10 h-10" />
        </div>
        <div className="absolute bottom-40 left-24 text-amber-400 opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}>
          <Target className="w-8 h-8" />
        </div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-12">
            {/* Header badge */}
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-full text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
                <GraduationCap className="inline w-4 h-4 mr-2" />
                Competitive Excellence
              </span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-800">Master Your</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Competitive Exams
              </span>
            </h1>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center mt-6 mb-8 space-x-2">
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
            
            {/* Subtitle */}
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-indigo-700 mb-4 leading-relaxed">
                Access premium study materials, practice with AI-powered quizzes, and track your progress
              </p>
              <p className="text-base text-indigo-600">
                Select your exam details below to begin your journey to success
              </p>
            </div>
          </div>

          {/* Enhanced Course Selector with better styling */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-12">
            <CourseSelectorGrid
              selectedExam={selectedExam}
              selectedSubject={selectedSubject}
              selectedChapter={selectedChapter}
              subjects={subjects}
              isLoading={isLoading}
              onExamChange={handleExamChange}
              onSubjectChange={handleSubjectChange}
              onChapterChange={handleChapterChange}
            />
          </div>

          {selectedChapterData && (
            <div className="space-y-8">
              {/* Enhanced Mode Toggle Buttons */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/50">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleViewMode("notes")}
                      className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                        viewMode === "notes"
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105"
                          : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      <BookOpen className={`h-5 w-5 transition-transform duration-300 ${viewMode === "notes" ? "scale-110" : "group-hover:scale-110"}`} />
                      <span>Study Materials</span>
                      {viewMode === "notes" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => toggleViewMode("quiz")}
                      className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                        viewMode === "quiz"
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                          : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                      }`}
                      disabled={quiz.length === 0}
                    >
                      <FileQuestion className={`h-5 w-5 transition-transform duration-300 ${viewMode === "quiz" ? "scale-110" : "group-hover:scale-110"}`} />
                      <span>Take Quiz</span>
                      {quiz.length === 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          N/A
                        </div>
                      )}
                      {viewMode === "quiz" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Sections with enhanced styling */}
              {viewMode === "notes" && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                    <div className="flex items-center gap-3 text-white">
                      <BookOpen className="h-6 w-6" />
                      <h2 className="text-2xl font-bold">Study Materials</h2>
                      <div className="ml-auto bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                        Chapter {selectedChapterData.chapterNumber}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <NotesViewer unitData={convertChapterToUnit(selectedChapterData)} />
                  </div>
                </div>
              )}
              
              {viewMode === "quiz" && quiz.length > 0 && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
                    <div className="flex items-center gap-3 text-white">
                      <FileQuestion className="h-6 w-6" />
                      <h2 className="text-2xl font-bold">Practice Quiz</h2>
                      <div className="ml-auto bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                        {quiz.length} Questions
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <QuizSection
                      quiz={quiz}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      onSubmitQuiz={handleSubmitQuiz}
                      quizSubmitted={quizSubmitted}
                      quizScore={quizScore}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}