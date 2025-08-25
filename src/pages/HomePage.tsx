import React from 'react';
import { ArrowRight, FileText, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-800 mb-6 leading-tight">
            Legal<span className="text-amber-700">Clarify</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Simplifying Legal Documents with AI-Powered Analysis
          </p>
          <p className="text-lg text-amber-600 mb-12 max-w-4xl mx-auto">
            Understanding legal documents shouldn't require a law degree. Our AI-powered platform transforms 
            complex legal text into clear, understandable language, empowering you to make informed decisions.
          </p>

          {/* Video Section */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto bg-amber-50 rounded-2xl shadow-xl overflow-hidden border border-amber-200">
              <div className="aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800"
                >
                  <source
                    src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6 bg-amber-50">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  See How LegalClarify Works
                </h3>
                <p className="text-amber-700">
                  Watch our platform transform complex legal documents into plain English in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/signup"
              className="bg-amber-700 text-amber-50 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-800 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/help"
              className="border-2 border-amber-700 text-amber-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-100 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-800 mb-4">
              Why Choose LegalClarify?
            </h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Our platform bridges the gap between complex legal language and everyday understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-amber-100 hover:bg-amber-200 transition-colors duration-200">
              <div className="bg-amber-700 text-amber-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Document Analysis
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Upload contracts, notices, or court papers and get instant, clear explanations of complex legal terms.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-amber-100 hover:bg-amber-200 transition-colors duration-200">
              <div className="bg-amber-700 text-amber-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                AI-Powered Insights
              </h3>
              <p className="text-amber-700 leading-relaxed">
                Advanced NLP technology extracts key information and translates legal jargon into plain English.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-amber-100 hover:bg-amber-200 transition-colors duration-200">
              <div className="bg-amber-700 text-amber-50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Accessible to All
              </h3>
              <p className="text-amber-700 leading-relaxed">
                No legal background required. Our platform makes legal documents understandable for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-50 mb-6">
            Ready to Simplify Your Legal Documents?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of users who trust LegalClarify for clear legal understanding.
          </p>
          <Link
            to="/signup"
            className="bg-amber-50 text-amber-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-amber-100 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;