// pages/dashboard.tsx or app/dashboard/page.tsx
import React, { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { RecentDocuments } from "./recent";

// TypeScript interfaces
interface CourseItem {
  id: string;
  title: string;
  image: string;
  totalDocs: number;
}

const courses: CourseItem[] = [
  {
    id: "mech-eng",
    title: "Mechanical Engineering",
    image: "/images/math.jpg",
    totalDocs: 24,
  },
  {
    id: "cs",
    title: "Computer Science",
    image: "/images/CS.png",
    totalDocs: 18,
  },
  {
    id: "ee",
    title: "Electrical Engineering",
    image: "/images/JAVA.jpeg",
    totalDocs: 15,
  },
  {
    id: "civil",
    title: "Civil Engineering",
    image: "/images/CN.jpeg",
    totalDocs: 12,
  },
];

const CourseCard: React.FC<{ course: CourseItem }> = ({ course }) => {
  return (
    <Link href={`/dashboard/courses/${course.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <div className="h-32 bg-slate-200 relative">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-slate-800">{course.title}</h3>
            <p className="text-slate-500 text-sm">
              {course.totalDocs} document{course.totalDocs !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

function Dashboard(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <header className="mb-10">
          <h1 className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Hey Geeks 👋
          </h1>
        </header>

        <RecentDocuments />

        {/* Enrolled Courses Section */}
        <section>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl text-slate-800">
                Enrolled Courses
              </h2>
              <Link
                href="/dashboard/courses"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <p className="text-slate-500 mt-1">
              Continue learning from your enrolled courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-sm">
              Explore More Courses
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
