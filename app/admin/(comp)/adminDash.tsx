import { Shield} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
                <p className="text-gray-500">Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your central hub for managing and overseeing all system operations. 
            Access your administrative tools and monitor your platform from here.
          </p>
        </div>
      </main>
    </div>
  );
}