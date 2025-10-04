import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  BarChart2, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  TrendingUp,
  BookOpen,
  Copy
} from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface Stat {
  label: string;
  value: number;
  icon: React.ElementType;
}

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

interface JargonAnalysis {
  jargonsFound: Record<string, JargonInfo>;
  simplifiedText?: string;
  totalJargons: number;
  jargonSummary?: string;
  complexityAnalysis?: ComplexityAnalysis;
}

interface Document {
  _id: string;
  fileName: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'analyzed' | 'error';
  classification?: string;
  confidence?: number;
  keyTerms?: string[];
  summary?: string;
  importantDates?: Array<{type: string; date: string}>;
  partiesInvolved?: string[];
  jargonAnalysis?: JargonAnalysis;
}

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [quickStats, setQuickStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const navigate = useNavigate();

  const getActivityIcon = (status: 'uploaded' | 'processing' | 'analyzed' | 'error') => {
    switch (status) {
      case 'analyzed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'uploaded':
        return <Upload className="h-4 w-4 text-amber-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded': return 'Uploaded';
      case 'processing': return 'Processing...';
      case 'analyzed': return 'Analyzed';
      case 'error': return 'Error';
      default: return status;
    }
  };

  const getComplexityColor = (complexity?: string) => {
    if (!complexity) return 'text-gray-600 bg-gray-100';
    switch (complexity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to upload a file.');
        return;
      }

      // Validate file type and size
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File size must be less than 10MB.');
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append('document', file);

      try {
        const res = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (res.ok) {
          const data = await res.json();
          const newDoc = data.document;
          setDocuments(prevDocs => [newDoc, ...prevDocs]);
          
          // Update stats
          updateStats([newDoc, ...documents]);
          
          alert('Document uploaded and analysis started!');
          
          // Optionally, poll for updates if status is processing
          if (newDoc.status === 'processing') {
            pollDocumentStatus(newDoc._id);
          }
          
        } else {
          const errorData = await res.json();
          alert(errorData.message || 'File upload failed.');
        }
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Something went wrong. Please try again.');
      } finally {
        setUploading(false);
        // Reset the input
        event.target.value = '';
      }
    }
  };

  const pollDocumentStatus = async (documentId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:5000/documents/${documentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const updatedDoc = await res.json();
          
          if (updatedDoc.status !== 'processing') {
            // Update the document in the list
            setDocuments(prevDocs => 
              prevDocs.map(doc => 
                doc._id === documentId ? updatedDoc : doc
              )
            );
            clearInterval(pollInterval);
            
            if (updatedDoc.status === 'analyzed') {
              alert(`Analysis complete for ${updatedDoc.fileName}!`);
            } else if (updatedDoc.status === 'error') {
              alert(`Analysis failed for ${updatedDoc.fileName}.`);
            }
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
        clearInterval(pollInterval);
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 5 minutes
    setTimeout(() => clearInterval(pollInterval), 300000);
  };

  const updateStats = (docs: Document[]) => {
    const totalDocuments = docs.length;
    const thisMonthCount = docs.filter(doc => {
      const uploadDate = new Date(doc.uploadDate);
      const now = new Date();
      return uploadDate.getMonth() === now.getMonth() && uploadDate.getFullYear() === now.getFullYear();
    }).length;
    const processingCount = docs.filter(doc => doc.status === 'processing').length;
    const analyzedCount = docs.filter(doc => doc.status === 'analyzed').length;

    setQuickStats([
      { label: 'Total Documents', value: totalDocuments, icon: FileText },
      { label: 'This Month', value: thisMonthCount, icon: BarChart2 },
      { label: 'Analyzed', value: analyzedCount, icon: TrendingUp },
      { label: 'Processing', value: processingCount, icon: Clock },
    ]);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const userRes = await fetch('http://localhost:5000/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userRes.json();

        const docsRes = await fetch('http://localhost:5000/documents', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const docsData = await docsRes.json();

        if (userRes.ok && docsRes.ok) {
          setUser(userData);
          setDocuments(docsData);
          updateStats(docsData);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center text-amber-800">
        <p className="text-xl font-semibold animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 font-sans p-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-8">
        <div className="flex-1 space-y-6">
          <div className="bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-300">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">
              Hello, {user?.firstName}!
            </h1>
            <p className="text-amber-700">Welcome to your dashboard. Upload legal documents for AI-powered classification and jargon analysis.</p>
          </div>

          <div className="bg-amber-100 p-8 rounded-2xl shadow-lg border border-amber-300">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Upload Legal Document</h2>
            <div className="border-4 border-dashed border-amber-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <Upload className={`h-16 w-16 text-amber-500 mb-4 ${uploading ? 'animate-bounce' : ''}`} />
              <p className="text-xl font-semibold text-amber-700 mb-2">
                {uploading ? 'Uploading and analyzing...' : 'Drop your PDF here or click to browse'}
              </p>
              <p className="text-sm text-amber-600 mb-6">Supported formats: PDF (Max size: 10MB)</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${uploading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800'} text-amber-50 py-3 px-8 rounded-lg font-semibold transition-colors`}
              >
                {uploading ? 'Processing...' : '+ Choose File'}
              </label>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Our AI analyzes:</h3>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Contract type classification</li>
                <li>Key terms and conditions</li>
                <li>Important dates and deadlines</li>
                <li>Parties involved</li>
                <li>Legal jargon simplification</li>
                <li>Document complexity assessment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-300">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center text-amber-700">
                  <stat.icon className="h-6 w-6 text-amber-600 mr-4" />
                  <div>
                    <span className="font-semibold text-lg">{stat.value}</span>
                    <span className="ml-2 text-sm text-amber-600">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-300">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Recent Activity</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div key={doc._id} className="border border-amber-200 rounded-lg p-3 bg-amber-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <div className="mt-1 mr-3">
                          {getActivityIcon(doc.status)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-amber-800 text-sm truncate">{doc.fileName}</p>
                          <p className="text-xs text-amber-600">{new Date(doc.uploadDate).toLocaleString()}</p>
                          <p className="text-xs text-amber-600">{getStatusText(doc.status)}</p>
                          {doc.classification && (
                            <p className="text-xs font-semibold text-green-700 mt-1">
                              {doc.classification} ({Math.round((doc.confidence || 0) * 100)}%)
                            </p>
                          )}
                          {doc.jargonAnalysis?.complexityAnalysis && (
                            <p className="text-xs mt-1">
                              <span className={`px-1 rounded text-xs ${getComplexityColor(doc.jargonAnalysis.complexityAnalysis.complexity)}`}>
                                {doc.jargonAnalysis.complexityAnalysis.complexity} Complexity
                              </span>
                              <span className="text-amber-600 ml-2">
                                {doc.jargonAnalysis.totalJargons} jargon(s)
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                      {doc.status === 'analyzed' && (
                        <button
                          onClick={() => setSelectedDocument(doc)}
                          className="text-amber-600 hover:text-amber-800 ml-2"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-amber-600">No documents uploaded yet.</p>
              )}
            </div>
          </div>

          <div className="bg-amber-700 p-6 rounded-2xl shadow-lg text-white text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2" />
            <p className="text-lg font-semibold mb-4">Need to analyze text?</p>
            <button
              onClick={() => navigate('/jargon-simplifier')}
              className="w-full bg-amber-50 text-amber-800 py-3 px-6 rounded-lg font-semibold hover:bg-amber-200 transition-colors"
            >
              Try Jargon Simplifier
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Document Details Modal with Jargon Analysis */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-amber-800">Document Analysis</h3>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-amber-600 hover:text-amber-800 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Basic Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-800">File Name:</h4>
                  <p className="text-gray-700">{selectedDocument.fileName}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-800">Classification:</h4>
                  <p className="text-gray-700">
                    {selectedDocument.classification} 
                    <span className="text-green-600 ml-2">
                      ({Math.round((selectedDocument.confidence || 0) * 100)}% confidence)
                    </span>
                  </p>
                </div>
                
                {selectedDocument.summary && (
                  <div>
                    <h4 className="font-semibold text-amber-800">Summary:</h4>
                    <p className="text-gray-700">{selectedDocument.summary}</p>
                  </div>
                )}
                
                {selectedDocument.keyTerms && selectedDocument.keyTerms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800">Key Terms:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedDocument.keyTerms.map((term, index) => (
                        <li key={index}>{term}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedDocument.importantDates && selectedDocument.importantDates.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800">Important Dates:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedDocument.importantDates.map((date, index) => (
                        <li key={index}>{date.type}: {date.date}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedDocument.partiesInvolved && selectedDocument.partiesInvolved.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-800">Parties Involved:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedDocument.partiesInvolved.map((party, index) => (
                        <li key={index}>{party}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column - Jargon Analysis */}
              <div className="space-y-4">
                {selectedDocument.jargonAnalysis && (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Legal Jargon Analysis
                      </h4>
                      
                      {/* Complexity Analysis */}
                      {selectedDocument.jargonAnalysis.complexityAnalysis && (
                        <div className="mb-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-blue-700">Complexity:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getComplexityColor(selectedDocument.jargonAnalysis.complexityAnalysis.complexity)}`}>
                                {selectedDocument.jargonAnalysis.complexityAnalysis.complexity}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">Density:</span>
                              <span className="ml-2 font-medium text-blue-800">
                                {selectedDocument.jargonAnalysis.complexityAnalysis.score}%
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">Jargons Found:</span>
                              <span className="ml-2 font-medium text-blue-800">
                                {selectedDocument.jargonAnalysis.totalJargons}
                              </span>
                            </div>
                            <div>
                              <span className="text-blue-700">Total Words:</span>
                              <span className="ml-2 font-medium text-blue-800">
                                {selectedDocument.jargonAnalysis.complexityAnalysis.totalWords}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Jargons Found */}
                      {selectedDocument.jargonAnalysis.jargonsFound && 
                       Object.keys(selectedDocument.jargonAnalysis.jargonsFound).length > 0 && (
                        <div>
                          <h5 className="font-medium text-blue-800 mb-2">Legal Terms Found:</h5>
                          <div className="max-h-40 overflow-y-auto space-y-2">
                            {Object.entries(selectedDocument.jargonAnalysis.jargonsFound).map(([jargon, info], index) => (
                              <div key={index} className="p-2 bg-blue-100 rounded text-sm">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <strong className="text-blue-900">{jargon}:</strong>
                                    <p className="text-blue-800 mt-1">{info.meaning}</p>
                                  </div>
                                  <span className="text-blue-600 text-xs bg-blue-200 px-2 py-1 rounded">
                                    {info.occurrences}x
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedDocument.jargonAnalysis.totalJargons === 0 && (
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <p className="text-blue-700 text-sm">
                            This document contains minimal legal jargon and should be easy to understand.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Jargon Summary */}
                    {selectedDocument.jargonAnalysis.jargonSummary && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Simplified Summary</h4>
                        <div className="text-sm text-green-700 whitespace-pre-line">
                          {selectedDocument.jargonAnalysis.jargonSummary}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Show message if no jargon analysis available */}
                {!selectedDocument.jargonAnalysis && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Jargon analysis not available for this document. This may be due to processing limitations or document format.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Show Simplified Text Toggle */}
            {selectedDocument.jargonAnalysis?.simplifiedText && selectedDocument.jargonAnalysis.totalJargons > 0 && (
              <div className="mt-6">
                <details className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <summary className="font-semibold text-amber-800 cursor-pointer hover:text-amber-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    View Simplified Document Text (with jargon explanations)
                  </summary>
                  <div className="mt-3">
                    <div className="flex justify-end mb-2">
                      <button
                        onClick={() => copyToClipboard(selectedDocument.jargonAnalysis!.simplifiedText!)}
                        className="flex items-center text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded hover:bg-amber-200 transition-colors"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Text
                      </button>
                    </div>
                    <div className="p-3 bg-white rounded border text-sm text-gray-700 max-h-60 overflow-y-auto">
                      <div className="whitespace-pre-wrap">
                        {selectedDocument.jargonAnalysis.simplifiedText}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      Legal jargon has been replaced with simplified explanations in parentheses.
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;