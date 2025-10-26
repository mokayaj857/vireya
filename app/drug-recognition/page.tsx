"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Pill, AlertCircle, ShieldCheck, Info, Clock, Sparkles, CheckCircle } from "lucide-react"

// Mock API function - replace with your actual API call
const drugRecognizeUpload = async (file: File) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return {
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    purpose: "A nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation caused by conditions such as headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.",
    dosage: "Adults: 200-400mg every 4-6 hours as needed. Do not exceed 1200mg in 24 hours unless directed by a doctor. Take with food or milk to reduce stomach upset.",
    warnings: [
      "May increase risk of heart attack or stroke, especially with long-term use",
      "Can cause stomach bleeding or ulcers",
      "Avoid if you have asthma, kidney disease, or are pregnant in third trimester"
    ],
    recommendations: [
      "Consult your doctor if pain persists for more than 10 days",
      "Do not take with other NSAIDs or blood thinners without medical advice",
      "Stay hydrated while taking this medication"
    ],
    confidence: 0.95
  }
}

export default function DrugRecognitionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onSelectFile = useCallback((f: File | null) => {
    setError(null)
    setResult(null)
    setFile(f)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }, [previewUrl])

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    onSelectFile(f)
  }, [onSelectFile])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0] || null
    if (f) onSelectFile(f)
  }, [onSelectFile])

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const canSubmit = useMemo(() => !!file && !loading, [file, loading])

  const submit = useCallback(async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const json = await drugRecognizeUpload(file)
      setResult(json)
    } catch (e: any) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }, [file])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        
        {/* Header - Elegant & Minimal */}
        <div className="text-center mb-12 lg:mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-shadow">
            <Sparkles className="w-4 h-4 text-drug-teal" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Analysis</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Drug Recognition
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Instant identification with comprehensive safety information
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12">
          
          {/* Upload Section */}
          <div className="space-y-5 slide-in-left">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`
                relative rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden group
                ${isDragging 
                  ? 'border-drug-teal bg-drug-teal/5 scale-[0.98] shadow-lg' 
                  : previewUrl 
                  ? 'border-gray-200 bg-white shadow-md hover:shadow-xl' 
                  : 'border-dashed border-gray-300 bg-white hover:border-drug-teal/50 hover:bg-gray-50/50 shadow-sm hover:shadow-md'
                }
                aspect-[4/3] sm:aspect-[16/10]
              `}
              onClick={() => !previewUrl && inputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    alt="Uploaded medication"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectFile(null)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-drug-teal to-drug-emerald">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Image uploaded</p>
                        <p className="text-xs text-gray-500">Ready for analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 sm:p-8">
                  <div className={`
                    w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500
                    ${isDragging 
                      ? 'scale-110 shadow-xl' 
                      : 'group-hover:scale-105 shadow-lg'
                    }
                  `}
                  style={{ background: isDragging ? 'linear-gradient(135deg, #166c73 0%, #198c6b 100%)' : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' }}
                  >
                    <Upload className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${isDragging ? 'text-white' : 'text-gray-400 group-hover:text-drug-teal'}`} />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {isDragging ? 'Drop to upload' : 'Upload medication image'}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">
                    Drag and drop or click to browse
                  </p>
                  
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">
                    <Pill className="w-4 h-4" />
                    <span>PNG, JPG, JPEG</span>
                  </div>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onInputChange}
              />
            </div>

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="w-full h-14 sm:h-16 rounded-xl font-semibold text-base sm:text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              style={{ 
                background: canSubmit ? 'linear-gradient(135deg, #166c73 0%, #198c6b 100%)' : '#e5e7eb'
              }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing medication...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Drug
                  </>
                )}
              </span>
            </button>

            {error && (
              <div className="p-4 sm:p-5 rounded-xl bg-red-50 border border-red-200 fade-in">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-red-900 mb-1 text-sm sm:text-base">Analysis failed</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="slide-in-right">
            {loading ? (
              <div className="h-full min-h-[500px] rounded-2xl bg-white shadow-md border border-gray-200 flex flex-col items-center justify-center p-8 sm:p-12">
                <div className="relative mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-drug-teal border-r-drug-emerald border-b-transparent border-l-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Pill className="w-8 h-8 sm:w-10 sm:h-10 text-drug-teal animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Processing image</h3>
                <p className="text-gray-500 text-center text-sm sm:text-base">Analyzing medication details...</p>
              </div>
            ) : result ? (
              <div className="space-y-4 sm:space-y-5">
                
                {/* Hero Card - Drug Name */}
                <div className="relative rounded-2xl p-6 sm:p-8 text-white shadow-xl overflow-hidden scale-in bg-gradient-to-br from-drug-teal to-drug-emerald">
                  <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 rounded-full opacity-10 blur-3xl bg-white" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex-1 min-w-0">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-3">
                          Identified Medication
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 break-words">{result.name}</h2>
                        {result.genericName && result.genericName !== result.name && (
                          <p className="text-white/80 text-base sm:text-lg">{result.genericName}</p>
                        )}
                      </div>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <Pill className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>
                    
                    {result.confidence && (
                      <div className="pt-6 border-t border-white/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-white/90">Confidence Level</span>
                          <span className="text-lg font-bold">{(result.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <div 
                            className="h-full bg-white rounded-full shadow-lg transition-all duration-1000 ease-out"
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Cards */}
                {result.purpose && (
                  <div className="p-5 sm:p-6 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm bg-gradient-to-br from-drug-teal to-drug-emerald">
                        <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">What it does</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{result.purpose}</p>
                      </div>
                    </div>
                  </div>
                )}

                {result.dosage && (
                  <div className="p-5 sm:p-6 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-in" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm bg-gradient-to-br from-drug-teal to-drug-emerald">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Dosage & Usage</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{result.dosage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {result.warnings && result.warnings.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-xl bg-amber-50 border-2 border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-in" style={{ animationDelay: '300ms' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Important Warnings</h3>
                        <ul className="space-y-2.5">
                          {result.warnings.map((warning: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="p-5 sm:p-6 rounded-xl bg-emerald-50 border-2 border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-in" style={{ animationDelay: '400ms' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
                        <ul className="space-y-2.5">
                          {result.recommendations.map((rec: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[500px] rounded-2xl bg-white shadow-md border border-gray-200 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6 shadow-sm">
                  <Pill className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Ready to analyze</h3>
                <p className="text-sm sm:text-base text-gray-500 max-w-xs">
                  Upload a medication image to receive instant identification and safety information
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200 text-center fade-in" style={{ animationDelay: '500ms' }}>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Medical Disclaimer:</span> This tool provides information for educational purposes only. Always consult a licensed healthcare professional before taking any medication. Do not use this tool as a substitute for professional medical advice.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }

        .slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  )
}
