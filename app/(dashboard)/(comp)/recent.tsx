 {/* Recent Documents Carousel */}
import React from 'react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample data
const documents = [
  {
    title: "Python",
    category: "Assignments",
    preview: "/images/PYTHON.jpeg",
    link: "#",
    tagColor: "bg-yellow-300",
    textColor: "text-yellow-800",
  },
  {
    title: "Vector Calculus 1.pdf",
    category: "Lectures",
    preview: "/images/CS.png",
    link: "#",
    tagColor: "bg-green-300",
    textColor: "text-green-800",
  },
  {
    title: "TIM Summary.pdf",
    category: "Summaries",
    preview: "/images/JAVA.jpeg",
    link: "#",
    tagColor: "bg-blue-300",
    textColor: "text-blue-800",
  },
  {
    title: "Klausur WS1819.pdf",
    category: "Exams",
    preview: "/images/CN.jpeg",
    link: "#",
    tagColor: "bg-red-300",
    textColor: "text-red-800",
  },
  {
    title: "ASE-Recap.pdf",
    category: "Summaries",
    preview: "/images/DBMS.jpeg",
    link: "#",
    tagColor: "bg-blue-300",
    textColor: "text-blue-800",
  },
];

export function RecentDocuments() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl text-slate-800">Recent Documents</h2>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</a>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {documents.map((doc, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-40 bg-slate-200 relative">
                  <Image 
                    src={doc.preview} 
                    alt={doc.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${doc.tagColor} ${doc.textColor}`}>
                    {doc.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-slate-800 truncate">{doc.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-slate-500 text-sm">Last opened 2d ago</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
}