import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, Book, MessageCircle, Phone, Mail, Download } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      items: [
        { title: 'Account Setup', content: 'Learn how to set up your Wealth Map account and configure initial settings for optimal performance.' },
        { title: 'First Property Search', content: 'Step-by-step guide to performing your first property search and understanding the results.' },
        { title: 'Dashboard Overview', content: 'Understanding the main dashboard metrics, charts, and key performance indicators.' }
      ]
    },
    {
      id: 'property-search',
      title: 'Property Search & Analytics',
      icon: <Search className="w-5 h-5" />,
      items: [
        { title: 'Advanced Search Filters', content: 'How to use location, price range, and wealth-based filters to refine your search results.' },
        { title: 'Map Navigation', content: 'Tips for effectively navigating the interactive property map and understanding data layers.' },
        { title: 'Saving & Exporting Data', content: 'How to save searches, bookmark properties, and export analytics data for reporting.' }
      ]
    },
    {
      id: 'wealth-analytics',
      title: 'Wealth Analytics',
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        { title: 'Understanding Wealth Metrics', content: 'How to interpret total portfolio values, property counts, and ownership patterns.' },
        { title: 'Geographic Distribution', content: 'Analyzing wealth distribution across different states and metropolitan areas.' },
        { title: 'Top Wealth Owners', content: 'Understanding high net worth individual rankings and their property portfolios.' }
      ]
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.items.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2 text-lg">Find answers to common questions and get comprehensive support</p>
      </div>

      <div className="px-8 py-8">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search help articles and guides..."
            className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat Support</h3>
            <p className="text-gray-600">Get instant help from our wealth analytics experts</p>
            <div className="mt-4 text-blue-600 font-medium">Available 24/7 →</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600">Speak directly with our technical support team</p>
            <div className="mt-4 text-green-600 font-medium">1-800-WEALTH-MAP →</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600">Send detailed questions for comprehensive assistance</p>
            <div className="mt-4 text-purple-600 font-medium">support@wealthmap.com →</div>
          </div>
        </div>

        {/* Help Sections */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <div key={section.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <div className="text-blue-600">{section.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                
                {expandedSections[section.id] && (
                  <div className="border-t border-gray-100">
                    {section.items.map((item, index) => (
                      <div key={index} className="p-6 border-b border-gray-100 last:border-b-0">
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">{item.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need More Help?</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Can't find what you're looking for? Our expert support team is ready to assist you with personalized guidance.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                  Contact Support Team
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-300 transition-colors">
                  Schedule Demo Call
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;