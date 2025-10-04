import React, { useState } from 'react';
import { BookOpen, Sparkles, AlertCircle, CheckCircle, Copy } from 'lucide-react';

interface JargonInfo {
  meaning: string;
  occurrences: number;
  originalTerm: string;
}

interface ComplexityAnalysis {
  complexity: string;
  score: number;
  jargonCount: number;
  totalWords: number;
}

interface SimplificationResult {
  originalText: string;
  simplifiedText: string;
  jargonsFound: Record<string, JargonInfo>;
  totalJargons: number;
  complexityAnalysis: ComplexityAnalysis;
  jargonSummary: string;
}

const JargonSimplifierPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<SimplificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to use this feature.');
      }

      const response = await fetch('http://localhost:5000/simplify-jargons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: inputText })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          originalText: data.original_text,
          simplifiedText: data.simplified_text,
          jargonsFound: data.jargons_found,
          totalJargons: data.total_jargons,
          complexityAnalysis: data.complexity_analysis,
          jargonSummary: data.jargon_summary
        });
      } else {
        setError(data.message || 'Failed to analyze text.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-300 mb-6">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-amber-700 mr-3" />
            <h1 className="text-3xl font-bold text-amber-800">Legal Jargon Simplifier</h1>
          </div>
          <p className="text-amber-700">
            Paste any legal text below and our AI will identify legal jargon and provide simplified explanations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Input Text</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your legal text here for analysis..."
              className="w-full h-64 p-4 border border-amber-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {inputText.length} characters
              </span>
              <button
                onClick={handleSimplify}
                disabled={loading || !inputText.trim()}
                className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-colors ${
                  loading || !inputText.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-700 text-white hover:bg-amber-800'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Simplify Jargons
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-center p-3 bg-red-100 border border-red-300 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Analysis Results</h2>
            
            {!result && !loading && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Enter text and click "Simplify Jargons" to see results</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Complexity Analysis */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Complexity Analysis</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Complexity Level:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getComplexityColor(result.complexityAnalysis.complexity)}`}>
                        {result.complexityAnalysis.complexity}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-700">Jargon Density:</span>
                      <span className="ml-2 font-medium text-blue-800">{result.complexityAnalysis.score}%</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Legal Terms Found:</span>
                      <span className="ml-2 font-medium text-blue-800">{result.totalJargons}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Total Words:</span>
                      <span className="ml-2 font-medium text-blue-800">{result.complexityAnalysis.totalWords}</span>
                    </div>
                  </div>
                </div>

                {/* Legal Terms Found */}
                {result.totalJargons > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3">Legal Terms Explained</h3>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {Object.entries(result.jargonsFound).map(([jargon, info], index) => (
                        <div key={index} className="bg-white p-3 rounded border border-green-200">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <strong className="text-green-900">{jargon}</strong>
                              <p className="text-green-800 text-sm mt-1">{info.meaning}</p>
                            </div>
                            <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                              {info.occurrences}x
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Jargons Message */}
                {result.totalJargons === 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">No complex legal jargon detected!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      This text appears to be written in plain language and should be easily understood.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Simplified Text Output */}
        {result && result.simplifiedText && result.totalJargons > 0 && (
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-amber-800">Simplified Text</h2>
              <button
                onClick={() => copyToClipboard(result.simplifiedText)}
                className="flex items-center px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </button>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="whitespace-pre-wrap text-gray-800">
                {result.simplifiedText}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Legal jargon has been replaced with simplified explanations in parentheses.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JargonSimplifierPage;