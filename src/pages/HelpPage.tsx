import React from 'react';
import { HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

const HelpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-amber-700 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Help Center</h1>
          <p className="text-xl text-amber-700">
            Find answers to common questions and learn how to use LegalClarify effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-amber-100 p-8 rounded-2xl shadow-sm">
            <Book className="h-8 w-8 text-amber-700 mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Getting Started</h3>
            <p className="text-amber-700 mb-4">
              Learn the basics of using our platform to analyze legal documents.
            </p>
            <ul className="space-y-2 text-amber-700">
              <li>• How to upload documents</li>
              <li>• Understanding AI analysis results</li>
              <li>• Navigating the dashboard</li>
            </ul>
          </div>

          <div className="bg-amber-100 p-8 rounded-2xl shadow-sm">
            <MessageCircle className="h-8 w-8 text-amber-700 mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 mb-4">FAQ</h3>
            <p className="text-amber-700 mb-4">
              Common questions about features, pricing, and legal accuracy.
            </p>
            <ul className="space-y-2 text-amber-700">
              <li>• What file formats are supported?</li>
              <li>• How accurate is the AI analysis?</li>
              <li>• Is my data secure and private?</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-100 p-8 rounded-2xl shadow-sm text-center">
          <Mail className="h-12 w-12 text-amber-700 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-amber-800 mb-4">
            Still Need Help?
          </h3>
          <p className="text-amber-700 mb-6">
            Our support team is here to help you with any questions or issues.
          </p>
          <a
            href="mailto:support@legalclarify.com"
            className="bg-amber-700 text-amber-50 px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;