"use client";
import Image from "next/image";
import {
  AcademicCapIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleDashboardNavigation = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.jpg"
              alt="Disha Yash Eduteck"
              width={80}
              height={70}
              className="cursor-pointer rounded-xl hover:opacity-90 transition-opacity shadow-md"
            />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Disha Yash Eduteck
            </h2>
          </div>
          <div className="flex items-center space-x-6">
            <SignedIn>
              <button
                onClick={handleDashboardNavigation}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Enter Dashboard
              </button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                  Log in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Sign up for free
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle geometric grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.05)_75%,rgba(68,68,68,.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl rotate-12 opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-24 w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg rotate-45 opacity-25"></div>
          <div className="absolute bottom-16 right-1/3 w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-35 animate-pulse"></div>
          
          {/* Educational icons */}
          <div className="absolute top-24 right-1/3 text-indigo-300 opacity-20 animate-bounce" style={{animationDelay: '1s'}}>
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-24 text-amber-400 opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Main heading with modern typography */}
          <div className="mb-8">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
                Educational Excellence
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-800">Free study notes,</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                summaries & answers
              </span>
              <br />
              <span className="text-gray-700">for your studies</span>
            </h1>
            
            {/* Modern decorative elements */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced subtitle */}
          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed">
              Study easier, faster & better with our comprehensive learning platform
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              Join thousands of students who trust our platform for quality educational resources and AI-powered learning tools
            </p>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mb-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="relative z-10 flex items-center">
                      Get Started Today
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={handleDashboardNavigation}
                  className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Go to Dashboard
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl rotate-12 opacity-15"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Services we provide!
              </span>
            </h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      Engineering & GATE exam notes
                    </h3>
                    <p className="text-gray-600">
                      Find comprehensive notes for engineering subjects and competitive exams like GATE
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      Learn & Test
                    </h3>
                    <p className="text-gray-600">
                      Learn from our curated notes and test your understanding immediately with our built-in assessments
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      AI-Generated Quizzes
                    </h3>
                    <p className="text-gray-600">
                      Practice with intelligently generated quizzes tailored to your learning progress
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      Verified Content
                    </h3>
                    <p className="text-gray-600">
                      Access accurate and verified notes from trusted sources and educational experts
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Sign up for free
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={handleDashboardNavigation}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Enter Dashboard
                  </button>
                </SignedIn>
              </div>
            </div>
            
           <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 rounded-2xl transform -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-10 rounded-2xl transform translate-y-2 -translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"></div>
              <Image
                src="/display.png"
                alt="Dashboard Preview"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl relative z-10 border-4 border-white/50 backdrop-blur-sm"
              />
              <div className="absolute -bottom-4 -right-4 z-20 bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-2xl shadow-2xl hidden md:block">
                <DocumentTextIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with diagonal pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10"></div>
        
        {/* Leadership content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section title with decorative elements */}
          <div className="flex flex-col items-center mb-20">
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mb-6 rounded-full"></div>
            <h2 className="text-4xl font-bold text-white">
              <span className="inline-block relative">
                Leadership
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-amber-500 rounded-full transform scale-x-50"></span>
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-400 mt-6 rounded-full"></div>
          </div>
          
          {/* Leader profile card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-5 items-stretch">
              {/* Image container - 2 columns on md screens */}
              <div className="md:col-span-2 relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-orange-600/30 mix-blend-overlay"></div>
                <div className="h-full">
                  <Image
                    src="/personal.jpg"
                    alt="Sanjay Zawar"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-400 opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-orange-500 opacity-70"></div>
              </div>
              
              {/* Content container - 3 columns on md screens */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">Director</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Sanjay Zawar
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mb-6"></div>
                
                <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
                  A visionary leader with over 15 years of experience in education technology. 
                  Sanjay leads Disha Yash Eduteck with a passion for transforming education through 
                  innovative approaches and making quality learning resources accessible to all students.
                </p>
                
                {/* Quote */}
                <blockquote className="border-l-4 border-amber-400 pl-4 mb-8 italic text-gray-300">
                  &quot;Education is not just about acquiring knowledge, but developing the ability to think critically
                  and apply what you&apos;ve learned to real-world challenges.&quot;
                </blockquote>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-amber-400">15+</div>
                    <div className="text-sm text-gray-300">Years Experience</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-amber-400">50+</div>
                    <div className="text-sm text-gray-300">Projects</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-amber-400">200K+</div>
                    <div className="text-sm text-gray-300">Students Reached</div>
                  </div>
                </div>
                
                {/* Social links */}
                <div className="flex space-x-5 mb-8">
                  <a href="#" className="bg-white/10 hover:bg-amber-400 transition-colors p-3 rounded-full text-white">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-amber-400 transition-colors p-3 rounded-full text-white">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-amber-400 transition-colors p-3 rounded-full text-white">
                    <FaInstagram size={20} />
                  </a>
                </div>
                
                {/* CTA button */}
                <div>
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg">
                        Join our community
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <button
                      onClick={handleDashboardNavigation}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-300 font-bold shadow-lg"
                    >
                      Enter Dashboard
                    </button>
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl rotate-12 opacity-15"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(68,68,68,.02)_25%,rgba(68,68,68,.02)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.02)_75%,rgba(68,68,68,.02)_76%,transparent_77%,transparent)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
                  About Us
                </span>
              </div>
              
              <h2 className="text-4xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  We encourage self-based learning for better understanding
                </span>
              </h2>
              
              <div className="flex justify-start items-center mb-8 space-x-2">
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our company connects students and encourages them to learn from hand-written, self preparatory
                  notes. With the practice AI-Generated quiz, it makes the learning more progressive and self 
                  analysable. We believe in the power of personalized learning experiences that adapt to each 
                  student&apos;s unique needs and pace.
                </p>
              </div>
              
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Join us today
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={handleDashboardNavigation}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore more
                </button>
              </SignedIn>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-2xl -rotate-2 opacity-30 group-hover:rotate-0 transition-all duration-300"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl rotate-1 opacity-50 group-hover:rotate-0 transition-all duration-300"></div>
              <Image
                src="/about_us.jpg"
                alt="Happy Students"
                width={700}
                height={200}
                className="rounded-2xl shadow-2xl relative z-10 border-4 border-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-slate-100 to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full opacity-20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(68,68,68,.03)_25%,rgba(68,68,68,.03)_26%,transparent_27%,transparent_74%,rgba(68,68,68,.03)_75%,rgba(68,68,68,.03)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
                Ready to Start?
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Start Your Learning Journey Today
              </span>
            </h2>
            
            <div className="flex justify-center items-center mb-8 space-x-2">
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
            
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who trust our platform for quality educational resources. 
              Access comprehensive study materials and enhance your learning experience.
            </p>
            
            <div className="inline-block">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="group relative bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-4 rounded-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={handleDashboardNavigation}
                  className="group relative bg-gradient-to-r from-gray-800 to-gray-700 text-white px-8 py-4 rounded-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    Access Dashboard
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full"></div>
          <div className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Logo and About */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src="/logo.jpg"
                  alt="Disha Yash Eduteck"
                  width={60}
                  height={60}
                  className="rounded-xl shadow-lg"
                />
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Disha Yash Eduteck
                </h2>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  Empowering students with quality education resources and innovative learning tools since 2021.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 p-3 rounded-xl text-gray-300 hover:text-white transform hover:scale-110">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 p-3 rounded-xl text-gray-300 hover:text-white transform hover:scale-110">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 p-3 rounded-xl text-gray-300 hover:text-white transform hover:scale-110">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>

            {/* For students */}
            <div>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">For students</h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Search study materials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Rewards store
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Community Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Help & Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* For companies */}
            <div>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">For companies</h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Find talents
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Employer branding
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 block">
                      Arrange a demo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-wrap gap-6 mb-6 md:mb-0">
                  <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
                    Terms of Use
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
                    Privacy
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
                    Imprint
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
                    About us
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300">
                    Privacy Settings
                  </a>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                    <span className="text-gray-300">English (US)</span>
                    <svg
                      className="w-4 h-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="inline-block bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
                <span className="text-gray-400">
                  Copyright © <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">Disha Yash Eduteck</span> 2021 - 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}