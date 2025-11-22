import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Loader, Sparkles, TrendingUp, DollarSign, Tv, Film, Trophy, Package } from 'lucide-react';

// THIRD-PARTY PERKS DATABASE
const THIRD_PARTY_PERKS = [
  // Credit Cards
  {
    id: 'amex-platinum',
    provider: 'American Express Platinum',
    type: 'credit_card',
    monthlyFee: 57.92,
    annualFee: 695,
    includedServices: [
      { name: 'Walmart+ (includes Paramount+ OR Peacock)', value: 12.95 }
    ],
    streamingValue: 12.95,
    notes: 'Walmart+ included - choose Paramount+ OR Peacock, plus shopping benefits'
  },
  {
    id: 'chase-sapphire-reserve',
    provider: 'Chase Sapphire Reserve',
    type: 'credit_card',
    monthlyFee: 45.83,
    annualFee: 550,
    includedServices: [
      { name: 'DoorDash DashPass (includes Max with ads)', value: 10.99 }
    ],
    streamingValue: 10.99,
    notes: 'DoorDash DashPass membership includes Max streaming'
  },
  // Mobile Carriers
  {
    id: 'verizon-unlimited-plus',
    provider: 'Verizon Unlimited Plus',
    type: 'mobile_carrier',
    monthlyFee: 80,
    includedServices: [
      { name: 'Disney+ Hulu ESPN+ Bundle ($10/mo add-on)', value: 10 }
    ],
    streamingValue: 10,
    notes: 'Disney Bundle available as $10/month add-on perk'
  },
  {
    id: 'tmobile-experience-more',
    provider: 'T-Mobile Experience More',
    type: 'mobile_carrier',
    monthlyFee: 85,
    includedServices: [
      { name: 'Netflix Standard with ads', value: 7.99 },
      { name: 'Apple TV+', value: 9.99 }
    ],
    streamingValue: 17.98,
    notes: 'Netflix + Apple TV+ included free'
  },
  {
    id: 'tmobile-experience-beyond',
    provider: 'T-Mobile Experience Beyond',
    type: 'mobile_carrier',
    monthlyFee: 100,
    includedServices: [
      { name: 'Netflix Standard with ads', value: 7.99 },
      { name: 'Apple TV+', value: 9.99 },
      { name: 'Hulu with ads', value: 9.99 }
    ],
    streamingValue: 27.97,
    notes: 'Best streaming bundle - Netflix + Apple TV+ + Hulu'
  },
  {
    id: 'xfinity-gigabit',
    provider: 'Xfinity Gigabit Internet',
    type: 'internet_provider',
    monthlyFee: 80,
    includedServices: [
      { name: 'Peacock Premium', value: 7.99 }
    ],
    streamingValue: 7.99,
    notes: 'Peacock Premium included with Gigabit plans'
  },
  {
    id: 'spotify-student',
    provider: 'Spotify Premium Student',
    type: 'student_discount',
    monthlyFee: 5.99,
    includedServices: [
      { name: 'Hulu with ads', value: 9.99 },
      { name: 'Spotify Premium', value: 10.99 }
    ],
    streamingValue: 9.99,
    notes: 'VERIFIED: Best student deal - Spotify + Hulu for $5.99/mo'
  },
  {
    id: 'walmart-plus',
    provider: 'Walmart+',
    type: 'retail_membership',
    monthlyFee: 12.95,
    includedServices: [
      { name: 'Paramount+ OR Peacock (choose one)', value: 7.99 }
    ],
    streamingValue: 7.99,
    notes: 'Choose EITHER Paramount+ OR Peacock, plus shopping benefits'
  }
];
// Onboarding state
 
  // Streaming services for checklist
  

  // Internet providers list

  // Handle service selection
  

  // Handle onboarding completion

// BUNDLES DATABASE
const BUNDLES = [
  {
    name: 'Disney Bundle Duo',
    price: 10.99,
    services: ['Disney+ with ads', 'Hulu with ads'],
    savings: 8.99
  },
  {
    name: 'Disney Bundle Trio',
    price: 16.99,
    services: ['Disney+ with ads', 'Hulu with ads', 'ESPN+'],
    savings: 14.98
  },
  {
    name: 'Walmart+',
    price: 12.95,
    services: ['Choice of Paramount+ OR Peacock', 'Free delivery', 'Fuel savings'],
    savings: 0
  }
];

// STREAMING SERVICES
const SERVICES = [
  { name: 'Netflix Standard with ads', price: 7.99 },
  { name: 'Netflix Standard', price: 17.99 },
  { name: 'Disney+ with ads', price: 9.99 },
  { name: 'Disney+ Premium', price: 15.99 },
  { name: 'Hulu with ads', price: 9.99 },
  { name: 'Hulu no ads', price: 18.99 },
  { name: 'Max with ads', price: 10.99 },
  { name: 'Apple TV+', price: 9.99 },
  { name: 'Paramount+ Essential', price: 7.99 },
  { name: 'Peacock Premium', price: 7.99 },
  { name: 'ESPN+', price: 11.99 },
  { name: 'Amazon Prime', price: 14.99 }
];

export default function StreamingAdvisor() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [internetProvider, setInternetProvider] = useState('');
  const [currentServices, setCurrentServices] = useState([]);
  const messagesEndRef = useRef(null);
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
    'Other',
    'None / Not sure'
  ];
  const toggleService = (service) => {
    setCurrentServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
    const completeOnboarding = () => {
    setShowOnboarding(false);
    // You can use zipCode, internetProvider, and currentServices in your responses
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
          query: query,
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

    // DEMO MODE - Personalized responses based on user data
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = '';

      // Special handling for "best package" or "bundle" questions
     if (q.includes('best package') || q.includes('best bundle') || q.includes('best deal') || 
          (q.includes('services') && q.includes('have'))) {
        
        response = `Let me analyze your complete streaming setup:\n\n`;
        response += `📍 **Location:** Zip ${zipCode}\n`;
        response += `🌐 **Internet:** ${internetProvider}\n`;
        response += `📺 **Current Services:** ${currentServices.length > 0 ? currentServices.join(', ') : 'None selected'}\n\n`;
        
        // Calculate current estimated cost
        const serviceCosts = {
          'Netflix': 17.99,
          'Disney+': 9.99,
          'Hulu': 9.99,
          'Amazon Prime Video': 8.99,
          'Apple TV+': 9.99,
          'Max (HBO Max)': 16.99,
          'Paramount+': 7.99,
          'Peacock': 7.99,
          'Discovery+': 6.99,
          'ESPN+': 10.99,
          'YouTube TV': 72.99,
          'Showtime': 10.99,
          'Starz': 9.99,
          'AMC+': 8.99
        };
        
        let totalCurrentCost = 0;
        currentServices.forEach(service => {
          totalCurrentCost += serviceCosts[service] || 10;
        });
        
        response += `💰 **Current Monthly Cost:** ~$${totalCurrentCost.toFixed(2)}\n\n`;
        
        // Check for free perks from internet provider
        let freeServices = [];
        let potentialSavings = 0;
        
        if (internetProvider.includes('Xfinity')) {
          response += `**💎 FREE with Your Internet:**\n`;
          response += `✓ Peacock Premium ($7.99 value) - Included with Xfinity!\n`;
          freeServices.push('Peacock');
          
          if (currentServices.includes('Peacock')) {
            response += `⚠️ **You're overpaying!** Cancel Peacock - it's FREE with Xfinity.\n`;
            potentialSavings += 7.99;
          }
          response += `\n`;
        }
        
        if (internetProvider.includes('AT&T')) {
          response += `**💎 Check Your AT&T Plan:**\n`;
          response += `• AT&T Unlimited Premium includes Max with ads FREE ($10.99 value)\n`;
          if (currentServices.includes('Max (HBO Max)')) {
            response += `⚠️ Verify if Max is included with your plan!\n`;
          }
          response += `\n`;
        }
        
        // Credit card perks section
        response += `**💳 Credit Card Perks to Check:**\n\n`;
        
        response += `**American Express Platinum ($695/year):**\n`;
        if (currentServices.includes('Paramount+') || currentServices.includes('Peacock')) {
          response += `• Walmart+ membership includes YOUR CHOICE of:\n`;
          response += `  - Paramount+ Essential OR Peacock Premium\n`;
          response += `• Plus free delivery & fuel savings\n`;
          response += `💡 If you have Amex Platinum, activate this benefit!\n\n`;
        } else {
          response += `• Includes Walmart+ ($12.95/mo value)\n`;
          response += `• Choose Paramount+ OR Peacock for free\n\n`;
        }
        
        response += `**Chase Sapphire Reserve ($550/year):**\n`;
        if (currentServices.includes('Max (HBO Max)')) {
          response += `• DoorDash DashPass includes Max with ads!\n`;
          response += `💡 Check if you have this card - Max could be free!\n\n`;
        } else {
          response += `• DoorDash DashPass includes Max with ads\n\n`;
        }
        
        response += `**Capital One Venture X ($395/year):**\n`;
        response += `• $10/month streaming credit (apply to any service)\n\n`;
        
        response += `**The Platinum Card from American Express:**\n`;
        response += `• Walmart+ includes streaming choice\n`;
        response += `• Entertainment credit can offset costs\n\n`;
        
        // Analyze bundling opportunities
        response += `**🎯 Bundling Opportunities:**\n\n`;
        
        const hasNetflix = currentServices.includes('Netflix');
        const hasDisney = currentServices.includes('Disney+');
        const hasHulu = currentServices.includes('Hulu');
        const hasESPN = currentServices.includes('ESPN+');
        const hasAmazon = currentServices.includes('Amazon Prime Video');
        const hasAppleTV = currentServices.includes('Apple TV+');
        const hasMax = currentServices.includes('Max (HBO Max)');
        const hasParamount = currentServices.includes('Paramount+');
        
        // Disney Bundle analysis
        if (hasDisney || hasHulu || hasESPN) {
          response += `**Disney Bundle:**\n`;
          if (hasDisney && hasHulu && hasESPN) {
            response += `✓ You have all 3 services separately\n`;
            response += `• Disney Bundle Trio: $16.99/mo (all three)\n`;
            response += `• Currently paying: ~$30/mo separately\n`;
            response += `• **Save $13/month = $156/year!**\n\n`;
            potentialSavings += 13;
          } else if (hasDisney && hasHulu) {
            response += `✓ You have Disney+ and Hulu separately\n`;
            response += `• Disney Bundle Duo: $10.99/mo (both)\n`;
            response += `• Currently paying: $19.98/mo\n`;
            response += `• **Save $9/month = $108/year!**\n\n`;
            potentialSavings += 9;
          } else if (hasDisney || hasHulu) {
            response += `• Consider Disney Bundle Duo: $10.99/mo\n`;
            response += `• Get both Disney+ AND Hulu for just $1 more\n\n`;
          }
        }
        
        // Apple TV+ analysis
        if (hasAppleTV) {
          response += `**Apple TV+:**\n`;
          response += `• Check T-Mobile plans - Experience More/Beyond include it FREE\n`;
          response += `• Apple One bundle includes Apple TV+ with Music & iCloud\n`;
          response += `• Currently: $9.99/mo standalone\n\n`;
        }
        
        // Amazon Prime Video analysis
        if (hasAmazon) {
          response += `**Amazon Prime Video:**\n`;
          response += `• Included with Amazon Prime membership ($14.99/mo)\n`;
          response += `• Also get free shipping, Prime Music, Prime Reading\n`;
          response += `• If you don't use other Prime benefits, consider if worth it\n\n`;
        }
        
        // Max analysis
        if (hasMax) {
          response += `**Max (HBO Max):**\n`;
          response += `• Check AT&T Unlimited Premium - includes Max FREE\n`;
          response += `• Check Chase Sapphire Reserve DashPass benefit\n`;
          response += `• Currently: $16.99/mo for ad-free tier\n\n`;
        }
        
        // Paramount+ analysis
        if (hasParamount) {
          response += `**Paramount+:**\n`;
          response += `• Amex Platinum Walmart+ benefit - choose Paramount+ FREE\n`;
          response += `• Currently: $7.99-12.99/mo\n\n`;
        }
        
        // Summary
        response += `**💡 Summary:**\n\n`;
        
        if (potentialSavings > 0) {
          response += `🎯 **Potential Savings: $${potentialSavings.toFixed(2)}/month ($${(potentialSavings * 12).toFixed(2)}/year)**\n\n`;
        }
        
        response += `**Action Items:**\n`;
        response += `1. Check your internet provider account for free streaming perks\n`;
        response += `2. Review your credit cards for entertainment benefits\n`;
        response += `3. Bundle Disney+, Hulu, ESPN+ if you have 2+ of these\n`;
        response += `4. Verify phone plan perks (T-Mobile, Verizon often include streaming)\n`;
        response += `5. Consider which services you actually watch monthly\n\n`;
        
        response += `Want me to analyze a specific service or card perk in detail?`;
      }
            
      // Handle specific service questions
      else if (q.includes('tmobile') || q.includes('t-mobile')) {
        response = `T-Mobile plans include great streaming perks!\n\n`;
        response += `**T-Mobile Experience More ($85/mo):**\n`;
        response += `✓ Netflix Standard with ads - FREE ($7.99 value)\n`;
        response += `✓ Apple TV+ - FREE ($9.99 value)\n`;
        response += `Total: $18/mo in streaming included!\n\n`;
        
        if (currentServices.includes('Netflix') || currentServices.includes('Apple TV+')) {
          response += `⚠️ **You might be overpaying!** Check if you have T-Mobile Experience More or Beyond - these services might already be included.\n\n`;
        }
        
        response += `Check your T-Mobile plan in the app to see which perks you have!`;
      }
      
      else if (q.includes('student')) {
        response = `**BEST STUDENT DEAL:**\n`;
        response += `Spotify Premium Student: $5.99/month includes:\n`;
        response += `✓ Hulu with ads (normally $9.99)\n`;
        response += `✓ Spotify Premium (normally $10.99)\n\n`;
        
        if (currentServices.includes('Hulu') && currentServices.includes('Spotify')) {
          response += `⚠️ **You're overpaying!** You could save $15/month with the student bundle.\n\n`;
        }
        
        response += `You save $15/month! Just verify your .edu email.\n\n`;
        response += `**Individual Option:**\n`;
        response += `Hulu with ads: $9.99/month\n\n`;
        response += `**Best Value:** The Spotify Student bundle is unbeatable!`;
      }
      
      else if (q.includes('disney') || q.includes('mandalorian')) {
        response = `The Mandalorian is on Disney+.\n\n`;
        
        if (internetProvider.includes('T-Mobile') || internetProvider.includes('Verizon')) {
          response += `**Already Included? 🎁**\n`;
          if (internetProvider.includes('T-Mobile')) {
            response += `• T-Mobile Experience Beyond customers get Disney+ FREE\n\n`;
          }
          if (internetProvider.includes('Verizon')) {
            response += `• Verizon customers can add Disney Bundle for $10/month\n\n`;
          }
        }
        
        response += `**Bundle Options:**\n`;
        response += `• Disney Bundle Duo: $10.99/mo (Disney+ + Hulu, save $9/mo)\n`;
        response += `• Disney Bundle Trio: $16.99/mo (adds ESPN+, save $15/mo)\n\n`;
        
        if (currentServices.includes('Disney+')) {
          response += `**You already have Disney+!** Consider upgrading to a bundle to add Hulu or ESPN+ for just $1-6 more per month.\n\n`;
        }
        
        response += `**Individual:** Disney+ with ads: $9.99/month`;
      }
      
      else if (q.includes('yellowstone') || q.includes('1883') || q.includes('1923')) {
        response = `Yellowstone (and 1883, 1923) are on Paramount+.\n\n`;
        response += `**Individual Options:**\n`;
        response += `• Paramount+ Essential: $7.99/month (with ads)\n`;
        response += `• Paramount+ with Showtime: $12.99/month (no ads + Showtime)\n\n`;
        
        if (currentServices.includes('Paramount+')) {
          response += `✅ **You already have Paramount+!** You're all set to watch.\n\n`;
        } else {
          response += `**Best Value:** Essential at $7.99 is cheapest for Yellowstone access!\n`;
        }
      }
      
      else if (q.includes('netflix')) {
        response = `Looking for Netflix?\n\n`;
        
        if (internetProvider.includes('T-Mobile')) {
          response += `**Already Included? 🎁**\n`;
          response += `• T-Mobile Experience More/Beyond: Netflix Standard with ads FREE!\n`;
          response += `Check your T-Mobile plan in the app\n\n`;
        }
        
        if (currentServices.includes('Netflix')) {
          response += `✅ **You already have Netflix!**\n\n`;
          if (internetProvider.includes('T-Mobile')) {
            response += `⚠️ Make sure you're not paying for it if it's included with T-Mobile!\n`;
          }
        } else {
          response += `**Individual Options:**\n`;
          response += `• Netflix with ads: $7.99/month (2 screens, HD)\n`;
          response += `• Netflix Standard: $17.99/month (2 screens, HD, no ads)\n\n`;
          response += `**Best Value:** The $7.99 ad-supported tier is the best deal.`;
        }
      }
      
      else if (q.includes('save money') || q.includes('save') || q.includes('cheaper')) {
        response = `Let me analyze your current setup:\n\n`;
        response += `📍 **Your Info:**\n`;
        response += `• Location: Zip ${zipCode}\n`;
        response += `• Internet: ${internetProvider}\n`;
        response += `• Current Services: ${currentServices.length > 0 ? currentServices.join(', ') : 'None'}\n\n`;
        
        let totalCurrentCost = currentServices.length * 10; // Rough estimate
        response += `💰 **Estimated Current Cost:** ~$${totalCurrentCost}/month\n\n`;
        
        response += `**Ways to Save:**\n\n`;
        
        if (internetProvider.includes('Xfinity')) {
          response += `1. ✅ Get Peacock FREE with Xfinity (save $7.99/mo)\n`;
        }
        
        if (currentServices.includes('Disney+') && currentServices.includes('Hulu')) {
          response += `2. ⚠️ Bundle Disney+ and Hulu → Save $9/month\n`;
        }
        
        if (currentServices.includes('Netflix') && internetProvider.includes('T-Mobile')) {
          response += `3. ⚠️ Check if Netflix is FREE with your T-Mobile plan\n`;
        }
        
        response += `\n💡 Ask me about specific services for personalized recommendations!`;
      }
      
      else {
        response = `I can help you find the best streaming value based on your setup!\n\n`;
        response += `📍 **Your Info:**\n`;
        response += `• Location: Zip ${zipCode}\n`;
        response += `• Internet: ${internetProvider}\n`;
        response += `• Current Services: ${currentServices.length > 0 ? currentServices.join(', ') : 'None selected'}\n\n`;
        response += `Try asking:\n`;
        response += `• "What's the best package deal for the services I have?"\n`;
        response += `• "Where can I watch [show name]?"\n`;
        response += `• "How can I save money on streaming?"\n`;
        response += `• "Does my internet provider include any free services?"\n\n`;
        response += `Or try the example questions above!`;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
      setLoading(false);
    }, 1500);
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
           {/* MAIN CHAT INTERFACE - Only shows after onboarding */}
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Tv className="w-12 h-12 text-purple-300" />
            <h1 className="text-5xl font-bold text-white">StreamSmart AI</h1>
          </div>
          <p className="text-purple-200 text-lg">
            Check Credit Cards, Phone Plans, Internet & Student Status First! 💳📱💻🎓
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-purple-300">
            <span className="flex items-center gap-1"><Package className="w-4 h-4" /> Credit Cards</span>
            <span className="flex items-center gap-1"><Film className="w-4 h-4" /> Phone/Internet</span>
            <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> Student Deals</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Find Your Best Streaming Value! 💎
                </h2>
                <p className="text-gray-600 mb-6">
                  I'll check if you already get streaming FREE with phone, internet, or student status
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {[
                    "I have T-Mobile, what's included?",
                    "I have Amex Platinum, what streaming?",
                    "I'm a student, what's cheapest?",
                    "Best way to get Disney+?"
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
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
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

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-4 gap-4 text-center">
          {[
            { icon: Package, label: 'Credit Cards', color: 'text-blue-300' },
            { icon: Tv, label: 'Phone Plans', color: 'text-green-300' },
            { icon: Film, label: 'Internet', color: 'text-purple-300' },
            { icon: DollarSign, label: 'Student Deals', color: 'text-yellow-300' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-white font-semibold text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Note */}
                <div className="mt-4 text-center text-xs text-purple-200">
            💡 StreamSmart earns affiliate commissions when you sign up through our links
          </div>
        </>
        )}
      </div>
    </div>
  );
}