import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, Sparkles, Tv, Film, Package, Crown, Lock, Star } from 'lucide-react';

export default function StreamingAdvisor() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [internetProvider, setInternetProvider] = useState('');
  const [currentServices, setCurrentServices] = useState([]);
  
  const messagesEndRef = useRef(null);
  
  // Streaming services for checklist
  const streamingServices = [
    'Netflix',
    'Disney+',
    'Hulu',
    'Amazon Prime Video',
    'Apple TV+',
    'Max (HBO Max)',
    'Paramount+',
    'Peacock',
    'Discovery+',
    'ESPN+',
    'YouTube TV',
    'Sling TV',
    'FuboTV',
    'Showtime',
    'Starz',
    'AMC+',
    'BET+',
    'Crunchyroll',
    'Shudder',
    'Other'
  ];

  // Internet providers list
  const internetProviders = [
    'Xfinity (Comcast)',
    'Spectrum',
    'AT&T',
    'Verizon Fios',
    'Cox',
    'Optimum',
    'CenturyLink',
    'Frontier',
    'Mediacom',
    'Wow!',
    'Google Fiber',
    'T-Mobile Home Internet',
    'Verizon 5G Home',
    'Other',
    'None / Not sure'
  ];

  // Handle service selection
  const toggleService = (service) => {
    setCurrentServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Handle onboarding completion
  const completeOnboarding = () => {
    setShowOnboarding(false);
    console.log('User Info:', { zipCode, internetProvider, currentServices });
  };

  // Go to next onboarding step
  const nextStep = () => {
    if (onboardingStep === 1 && zipCode.length === 5) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2 && internetProvider) {
      setOnboardingStep(3);
    }
  };

  // Go to previous step
  const prevStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuery = async () => {
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery('');
    setLoading(true);

    try {
      // Call our backend API (which talks to Claude securely)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: currentQuery,
          userInfo: {
            zipCode: zipCode,
            internetProvider: internetProvider,
            currentServices: currentServices
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response
      }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ONBOARDING WIZARD */}
        {showOnboarding ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
              
              {/* Header */}
              <div className="text-center mb-8">
                <Tv className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome to StreamSmart AI! 🎉
                </h1>
                <p className="text-gray-600">
                  Let's find the best streaming deals for you
                </p>
                
                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <div className={`w-3 h-3 rounded-full ${onboardingStep >= 1 ? 'bg-purple-600' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${onboardingStep >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${onboardingStep >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`} />
                </div>
              </div>

              {/* STEP 1: Zip Code */}
              {onboardingStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      What's your zip code?
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      This helps us show you local provider options and availability
                    </p>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="Enter 5-digit zip code"
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      maxLength="5"
                    />
                  </div>
                  
                  <button
                    onClick={nextStep}
                    disabled={zipCode.length !== 5}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all text-lg"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* STEP 2: Internet Provider */}
              {onboardingStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      Who's your internet provider?
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Many internet providers include free streaming services!
                    </p>
                    <select
                      value={internetProvider}
                      onChange={(e) => setInternetProvider(e.target.value)}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select your provider...</option>
                      {internetProviders.map(provider => (
                        <option key={provider} value={provider}>{provider}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!internetProvider}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Current Streaming Services */}
              {onboardingStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-2">
                      What streaming services do you currently pay for?
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Select all that apply (we'll help you find better deals!)
                    </p>
                    
                    <div className="max-h-96 overflow-y-auto border-2 border-gray-200 rounded-lg p-4 space-y-2">
                      {streamingServices.map(service => (
                        <label
                          key={service}
                          className="flex items-center p-3 hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={currentServices.includes(service)}
                            onChange={() => toggleService(service)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="ml-3 text-gray-900">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={completeOnboarding}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-all"
                    >
                      Start Saving! 🚀
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* MAIN CHAT INTERFACE */}
            {/* Header */}
            <div className="text-center mb-8 pt-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Tv className="w-12 h-12 text-purple-300" />
                <h1 className="text-5xl font-bold text-white">StreamSmart AI</h1>
              </div>
              <p className="text-purple-200 text-lg">
                Find streaming free with your phone, internet & credit cards 💳📱
              </p>
            </div>

            {/* Chat Container */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      Find Your Best Streaming Value! 💎
                    </h2>
                    <p className="text-gray-600 mb-6">
                      I'll check if you already get streaming FREE first
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {[
                        "What's the best package deal for the services I have?",
                        "Where can I watch Yellowstone?",
                        "How can I save money on streaming?",
                        "Does my internet provider include any free services?"
                      ].map((example, i) => (
                        <button
                          key={i}
                          onClick={() => setQuery(example)}
                          className="p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-gray-700 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div key={idx}>
                    {msg.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="max-w-[80%] p-4 rounded-2xl bg-purple-600 text-white">
                          {msg.content}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="max-w-[90%] p-4 rounded-2xl bg-gray-100 text-gray-800 whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <Loader className="w-6 h-6 animate-spin text-purple-600" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                    placeholder="Ask about streaming perks, bundles, or where to watch..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={loading}
                  />
                  <button
                    onClick={handleQuery}
                    disabled={loading || !query.trim()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Ask
                  </button>
                </div>
              </div>
            </div>

            {/* Affiliate Disclosure */}
            <div className="mt-4 text-center text-xs text-purple-200">
              💡 StreamSmart earns affiliate commissions when you sign up through our links
            </div>
          </>
        )}
      </div>
    </div>
  );
}