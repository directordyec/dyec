/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle } from 'lucide-react';

export default function MeetingScheduler() {
   const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    course: string;
    year: string;
    preferredDate: string;
    preferredTime: string;
    topics: string[];
    message: string;
  }>({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    preferredDate: '',
    preferredTime: '',
    topics: [],
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    course?: string;
    year?: string;
    preferredDate?: string;
    preferredTime?: string;
    topics?: string;
  }>({});

  const counselingTopics = [
    'Career Path Guidance',
    'GATE Exam Preparation',
    'Industry Insights',
    'Skill Development',
    'Job Market Analysis',
    'Higher Studies Planning',
    'Interview Preparation',
    'Resume Building'
  ];

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Clear error when user starts typing
  if (name in errors) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }
};


  const handleTopicChange = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      course?: string;
      year?: string;
      preferredDate?: string;
      preferredTime?: string;
      topics?: string;
    } = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        const response = await fetch('/api/schedule-meeting', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setErrors(errorData);
            return;
        }

        const result = await response.json();
        console.log('Meeting scheduled:', result);
        setIsSubmitted(true);
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
    }
};

  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Meeting Scheduled!</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-green-50 rounded-2xl p-6 mb-6">
            <p className="text-green-800 text-lg mb-4">
              Thank you for scheduling a career counseling session with Director Sanjay Zawar.
            </p>
            <div className="space-y-2 text-green-700">
              <p><strong>Date:</strong> {new Date(formData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> {formData.preferredTime}</p>
              <p><strong>Topics:</strong> {formData.topics.join(', ')}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">What&apos;s Next?</h3>
            <div className="text-blue-700 text-left space-y-2">
              <p>• You&apos;ll receive a confirmation email within 24 hours</p>
              <p>• Meeting location details will be shared via email</p>
              <p>• Please bring your resume and any specific questions</p>
              <p>• Contact us if you need to reschedule</p>
            </div>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
          >
            Schedule Another Meeting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Career Counseling Session</h1>
              <p className="text-indigo-100">Schedule a meeting with Director Sanjay Zawar</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Clock className="w-6 h-6 mb-2" />
              <p className="font-semibold">Duration</p>
              <p className="text-sm text-indigo-100">60 minutes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <MapPin className="w-6 h-6 mb-2" />
              <p className="font-semibold">Location</p>
              <p className="text-sm text-indigo-100">In-person meeting</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <User className="w-6 h-6 mb-2" />
              <p className="font-semibold">Director</p>
              <p className="text-sm text-indigo-100">Sanjay Zawar</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Field *
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.course ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                    placeholder="e.g., B.Tech CSE"
                  />
                  {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.year ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>
              </div>
            </div>

            {/* Meeting Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Meeting Preferences
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={getMinDate()}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.preferredDate ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                />
                {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time Slot *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.preferredTime ? 'border-red-300' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Discussion Topics * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {counselingTopics.map((topic, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.topics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
                {errors.topics && <p className="text-red-500 text-sm mt-1">{errors.topics}</p>}
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              placeholder="Any specific questions or topics you'd like to discuss..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Schedule Meeting
            </button>
            <p className="text-sm text-gray-500 mt-3">
              You&apos;ll receive a confirmation email within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}