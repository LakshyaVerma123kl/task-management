import Link from "next/link";
import { CheckCircle2, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(15,23,42,1),rgba(15,23,42,0.6))]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Manage Tasks with
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ease & Efficiency
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your ultimate task management solution. Stay organized, boost
              productivity, and achieve your goals with our intuitive and
              powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 rounded-xl text-lg font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-blue-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Organize Tasks
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Create, edit, and manage your tasks with an intuitive interface.
                Keep everything organized in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-purple-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Track Progress
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Monitor task completion with status indicators. Filter and
                search to find exactly what you need.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-green-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Secure & Private
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Your data is protected with industry-standard encryption. JWT
                authentication keeps your account secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already managing their tasks
            efficiently
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Free Today
          </Link>
        </div>
      </section>
    </div>
  );
}
