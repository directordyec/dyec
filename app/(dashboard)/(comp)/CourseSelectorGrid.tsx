"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Library, Bookmark } from "lucide-react";

const engineeringYears = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
];

const branches = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
];

interface Subject {
  name: string;
  units: {
    unitNumber: number;
    notesFileUrl: string;
    summary: string;
    quiz: { question: string; options: string[]; answer: string }[];
  }[];
}

interface CourseSelectorGridProps {
  selectedYear: string;
  selectedBranch: string;
  selectedSubject: string;
  selectedUnit: string;
  subjects: Subject[];
  isLoading: boolean;
  onYearChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onUnitChange: (value: string) => void;
}

const MotionCard = motion(Card);

export default function CourseSelectorGrid({
  selectedYear,
  selectedBranch,
  selectedSubject,
  selectedUnit,
  subjects,
  isLoading,
  onYearChange,
  onBranchChange,
  onSubjectChange,
  onUnitChange,
}: CourseSelectorGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <MotionCard
        className="p-6 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
        variants={item}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-blue-100 rounded-full">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-900">Year</h2>
        </div>
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
            <SelectValue placeholder="Choose your year" />
          </SelectTrigger>
          <SelectContent>
            {engineeringYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </MotionCard>

      <MotionCard
        className={`p-6 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 ${
          !selectedYear ? "opacity-50 pointer-events-none" : ""
        }`}
        variants={item}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-blue-100 rounded-full">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-900">Branch</h2>
        </div>
        <Select
          value={selectedBranch}
          onValueChange={onBranchChange}
          disabled={!selectedYear}
        >
          <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
            <SelectValue placeholder="Choose your branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </MotionCard>

      <MotionCard
        className={`p-6 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 ${
          !selectedBranch ? "opacity-50 pointer-events-none" : ""
        }`}
        variants={item}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-blue-100 rounded-full">
            <Library className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-900">Subject</h2>
        </div>
        <Select
          value={selectedSubject}
          onValueChange={onSubjectChange}
          disabled={!selectedBranch || isLoading}
        >
          <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
            <SelectValue
              placeholder={
                isLoading ? "Loading subjects..." : "Choose your subject"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.name} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isLoading && (
          <div className="mt-2 flex justify-center">
            <div className="animate-pulse h-1 w-full bg-blue-200 rounded"></div>
          </div>
        )}
      </MotionCard>

      <MotionCard
        className={`p-6 bg-white/90 backdrop-blur-sm border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 ${
          !selectedSubject ? "opacity-50 pointer-events-none" : ""
        }`}
        variants={item}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-blue-100 rounded-full">
            <Bookmark className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-blue-900">Unit</h2>
        </div>
        <Select
          value={selectedUnit}
          onValueChange={onUnitChange}
          disabled={!selectedSubject || isLoading}
        >
          <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
            <SelectValue
              placeholder={isLoading ? "Loading units..." : "Choose your unit"}
            />
          </SelectTrigger>
          <SelectContent>
            {subjects
              .find((s) => s.name === selectedSubject)
              ?.units.map((unit) => (
                <SelectItem
                  key={unit.unitNumber}
                  value={unit.unitNumber.toString()}
                >
                  Unit {unit.unitNumber}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {isLoading && (
          <div className="mt-2 flex justify-center">
            <div className="animate-pulse h-1 w-full bg-blue-200 rounded"></div>
          </div>
        )}
      </MotionCard>
    </motion.div>
  );
}
