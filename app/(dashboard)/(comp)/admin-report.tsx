/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Users, BookOpen, Trophy, Activity, Search, Calendar, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

interface ExamStudentActivity {
  _id: string;
  userId: string;
  userName: string;
  exam: string;
  subject: string;
  chapterNumber: number;
  activityType: "notes_access" | "quiz_submission";
  quizResult?: {
    score: number;
    totalQuestions: number;
    answers: { [key: string]: string };
  };
  timestamp: string;
}

interface CourseStudentActivity {
  _id: string;
  userId: string;
  userName: string;
  year: string;
  branch: string;
  subject: string;
  unitNumber: number;
  activityType: "notes_access" | "quiz_submission";
  quizResult?: {
    score: number;
    totalQuestions: number;
    answers: { [key: string]: string };
  };
  timestamp: string;
}

export default function AdminPanel() {
  const { isLoaded, user } = useUser();
  const [examActivities, setExamActivities] = useState<ExamStudentActivity[]>([]);
  const [courseActivities, setCourseActivities] = useState<CourseStudentActivity[]>([]);
  const [filteredExamActivities, setFilteredExamActivities] = useState<ExamStudentActivity[]>([]);
  const [filteredCourseActivities, setFilteredCourseActivities] = useState<CourseStudentActivity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'exam' | 'course'>('exam');
  
  // Pagination states
  const [examCurrentPage, setExamCurrentPage] = useState<number>(1);
  const [courseCurrentPage, setCourseCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        // Fetch exam activities
        const examResponse = await fetch(`/api/student-activity-exam?isAdmin=${isAdmin}`, {
          headers: { Accept: "application/json" },
        });
        if (!examResponse.ok) {
          const text = await examResponse.text();
          console.error("Exam API response:", text);
          throw new Error(`Failed to fetch exam activities: ${examResponse.status} ${examResponse.statusText}`);
        }
        const examData = await examResponse.json();
        if (!examData.activities) {
          throw new Error("No exam activities found in response");
        }
        setExamActivities(examData.activities);
        setFilteredExamActivities(examData.activities);

        // Fetch course activities
        const courseResponse = await fetch(`/api/student-activity?isAdmin=${isAdmin}`, {
          headers: { Accept: "application/json" },
        });
        if (!courseResponse.ok) {
          const text = await courseResponse.text();
          console.error("Course API response:", text);
          throw new Error(`Failed to fetch course activities: ${courseResponse.status} ${courseResponse.statusText}`);
        }
        const courseData = await courseResponse.json();
        if (!courseData.activities) {
          throw new Error("No course activities found in response");
        }
        setCourseActivities(courseData.activities);
        setFilteredCourseActivities(courseData.activities);

        if (!examData.activities.length && !courseData.activities.length) {
          setError("No activities found.");
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(`Failed to load activities: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded && isAdmin) {
      fetchActivities();
    } else if (isLoaded && !isAdmin) {
      setError("Unauthorized access. Admin role required.");
      setIsLoading(false);
    }
  }, [isLoaded, isAdmin]);

  useEffect(() => {
    const filteredExams = examActivities.filter((activity) =>
      (activity.userName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredCourses = courseActivities.filter((activity) =>
      (activity.userName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExamActivities(filteredExams);
    setFilteredCourseActivities(filteredCourses);
    
    // Reset to first page when search changes
    setExamCurrentPage(1);
    setCourseCurrentPage(1);
  }, [searchQuery, examActivities, courseActivities]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Pagination logic
  const getPaginatedData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number) => {
    return Math.ceil(dataLength / itemsPerPage);
  };

  const paginatedExamActivities = getPaginatedData(filteredExamActivities, examCurrentPage);
  const paginatedCourseActivities = getPaginatedData(filteredCourseActivities, courseCurrentPage);

  const examTotalPages = getTotalPages(filteredExamActivities.length);
  const courseTotalPages = getTotalPages(filteredCourseActivities.length);

  // Pagination handlers
  const handleExamPageChange = (page: number) => {
    setExamCurrentPage(page);
  };

  const handleCoursePageChange = (page: number) => {
    setCourseCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setExamCurrentPage(1);
    setCourseCurrentPage(1);
  };

  // Calculate statistics
  const totalUsers = new Set([
    ...examActivities.map(a => a.userId),
    ...courseActivities.map(a => a.userId)
  ]).size;

  const totalActivities = examActivities.length + courseActivities.length;
  
  const quizSubmissions = [
    ...examActivities.filter(a => a.activityType === 'quiz_submission'),
    ...courseActivities.filter(a => a.activityType === 'quiz_submission')
  ].length;

  const notesAccessed = totalActivities - quizSubmissions;

  // Pagination component
  const PaginationControls = ({ currentPage, totalPages, onPageChange, dataType }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    dataType: string;
  }) => {
    const getPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, dataType === 'exam' ? filteredExamActivities.length : filteredCourseActivities.length)} of {dataType === 'exam' ? filteredExamActivities.length : filteredCourseActivities.length} entries
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                disabled={page === '...'}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : page === '...'
                    ? 'cursor-default text-gray-400'
                    : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Loading Admin Panel...</p>
              <p className="text-sm text-gray-600">Please wait while we fetch the data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Access Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">Student Activity Monitor</p>
                </div>
              </div>
              <div className="flex justify-start items-center space-x-2">
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Active learners</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Activities</p>
                <p className="text-3xl font-bold text-gray-800">{totalActivities}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-indigo-500" />
              <span className="text-sm text-indigo-600 font-medium">All time</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Quiz Submissions</p>
                <p className="text-3xl font-bold text-gray-800">{quizSubmissions}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-600 font-medium">Assessments</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Notes Accessed</p>
                <p className="text-3xl font-bold text-gray-800">{notesAccessed}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <span className="text-sm text-emerald-600 font-medium">Study materials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by student name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 bg-white/80 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
              />
            </div>
            
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('exam')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'exam'
                    ? 'bg-white shadow-md text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Competitive Exams ({filteredExamActivities.length})
              </button>
              <button
                onClick={() => setActiveTab('course')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'course'
                    ? 'bg-white shadow-md text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Engineering Courses ({filteredCourseActivities.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Tables */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'exam' && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6" />
                <div>
                  <h2 className="text-2xl font-bold">Competitive Exam Activities</h2>
                  <p className="text-indigo-100">Monitor student engagement with exam preparation</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {filteredExamActivities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities found</h3>
                  <p className="text-gray-500">No exam activities match your search query.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Student</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Exam</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Subject</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Chapter</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Activity</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Performance</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedExamActivities.map((activity, index) => (
                          <tr key={activity._id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {(activity.userName || "U").charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-800">{activity.userName || "Unknown"}</span>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-medium">
                                {activity.exam}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-gray-600">{activity.subject}</td>
                            <td className="py-4 px-2">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-sm">
                                Chapter {activity.chapterNumber}
                              </span>
                            </td>
                            <td className="py-4 px-2">
                              <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                                activity.activityType === 'quiz_submission' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {activity.activityType === 'quiz_submission' ? 'Quiz Taken' : 'Notes Viewed'}
                              </span>
                            </td>
                            <td className="py-4 px-2">
                              {activity.activityType === "quiz_submission" && activity.quizResult ? (
                                <div className="text-sm">
                                  <div className="font-semibold text-gray-800">
                                    {activity.quizResult.score}/{activity.quizResult.totalQuestions}
                                  </div>
                                  <div className="text-gray-500">
                                    {Math.round((activity.quizResult.score / activity.quizResult.totalQuestions) * 100)}%
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">Study session</span>
                              )}
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-600">
                              {new Date(activity.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <PaginationControls
                    currentPage={examCurrentPage}
                    totalPages={examTotalPages}
                    onPageChange={handleExamPageChange}
                    dataType="exam"
                  />
                </>
              )}
            </div>
          </Card>
        )}

        {activeTab === 'course' && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6" />
                <div>
                  <h2 className="text-2xl font-bold">Engineering Course Activities</h2>
                  <p className="text-emerald-100">Track student progress in engineering subjects</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {filteredCourseActivities.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities found</h3>
                  <p className="text-gray-500">No course activities match your search query.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Student</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Year</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Branch</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Subject</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Unit</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Activity</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Performance</th>
                          <th className="text-left py-4 px-2 font-semibold text-gray-700">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedCourseActivities.map((activity, index) => (
                          <tr key={activity._id} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                            <td className="py-4 px-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-sm font-medium">
                                    {(activity.userName || "U").charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-800">{activity.userName || "Unknown"}</span>
                              </div>
                            </td>
                            <td className="py-4 px-2">
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-sm font-medium">
                                {activity.year}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-gray-600">{activity.branch}</td>
                            <td className="py-4 px-2 text-gray-600">{activity.subject}</td>
                            <td className="py-4 px-2">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-sm">
                                Unit {activity.unitNumber}
                              </span>
                            </td>
                            <td className="py-4 px-2">
                              <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                                activity.activityType === 'quiz_submission' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {activity.activityType === 'quiz_submission' ? 'Quiz Taken' : 'Notes Viewed'}
                              </span>
                            </td>
                            <td className="py-4 px-2">
                              {activity.activityType === "quiz_submission" && activity.quizResult ? (
                                <div className="text-sm">
                                  <div className="font-semibold text-gray-800">
                                    {activity.quizResult.score}/{activity.quizResult.totalQuestions}
                                  </div>
                                  <div className="text-gray-500">
                                    {Math.round((activity.quizResult.score / activity.quizResult.totalQuestions) * 100)}%
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">Study session</span>
                              )}
                            </td>
                            <td className="py-4 px-2 text-sm text-gray-600">
                              {new Date(activity.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <PaginationControls
                    currentPage={courseCurrentPage}
                    totalPages={courseTotalPages}
                    onPageChange={handleCoursePageChange}
                    dataType="course"
                  />
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}