import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Check, X, AlertCircle, Search } from 'lucide-react';

interface Meeting {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  preferredDate: string;
  preferredTime: string;
  topics: string[];
  message: string;
  approved: boolean;
  timestamp: string;
}

export default function AdminDashboard() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'upcoming'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('/api/schedule-meeting');
      if (response.ok) {
        const data = await response.json();
        setMeetings(data);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingAction = async (meetingId: string, approved: boolean) => {
    setProcessingId(meetingId);
    try {
      // Update meeting status
      const updateResponse = await fetch('/api/schedule-meeting', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: meetingId,
          updates: { approved }
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update meeting');
      }

      // Send email notification
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId,
          action: approved ? 'approve' : 'decline'
        }),
      });

      if (!emailResponse.ok) {
        console.warn('Meeting updated but email notification failed');
      }

      // Refresh meetings list
      fetchMeetings();
      
      alert(`Meeting ${approved ? 'approved' : 'declined'} successfully!`);
    } catch (error) {
      console.error('Error processing meeting:', error);
      alert('Failed to process meeting. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'pending':
        return !meeting.approved && matchesSearch;
      case 'approved':
        return meeting.approved && matchesSearch;
      case 'upcoming':
        return meeting.approved && new Date(meeting.preferredDate) >= new Date() && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const getStatusBadge = (meeting: Meeting) => {
    if (!meeting.approved) {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending</span>;
    }
    
    const meetingDate = new Date(meeting.preferredDate);
    const today = new Date();
    
    if (meetingDate >= today) {
      return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Upcoming</span>;
    } else {
      return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Completed</span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Meeting Requests</h1>
                <p className="text-gray-600 mt-1">Manage career counseling session requests</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                  {filteredMeetings.length} {filter} meetings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'approved', 'upcoming'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as typeof filter)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
                    filter === filterOption
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.filter(m => !m.approved).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.filter(m => m.approved).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.filter(m => m.approved && new Date(m.preferredDate) >= new Date()).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meetings List */}
        <div className="space-y-6">
          {filteredMeetings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
              <p className="text-gray-600">No meetings match your current filter criteria.</p>
            </div>
          ) : (
            filteredMeetings.map((meeting) => (
              <div key={meeting._id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{meeting.name}</h3>
                        {getStatusBadge(meeting)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{meeting.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{meeting.course} - {meeting.year}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(meeting.preferredDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{meeting.preferredTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!meeting.approved && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleMeetingAction(meeting._id, true)}
                          disabled={processingId === meeting._id}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleMeetingAction(meeting._id, false)}
                          disabled={processingId === meeting._id}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Discussion Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {meeting.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {meeting.message && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Additional Message:</h4>
                      <p className="text-gray-700">{meeting.message}</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Requested on {new Date(meeting.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}