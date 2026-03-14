"use client"

import { X, Camera, ImageIcon, Zap, RotateCcw, ScanLine, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"

interface CameraPageProps {
  onClose: () => void
  onConsultDoctor?: (image: string) => void
}

// Mock analysis results
const mockAnalysisResults = [
  {
    id: 1,
    condition: "轻度痤疮",
    confidence: 85,
    severity: "轻度",
    description: "检测到面部有少量粉刺和丘疹，属于轻度痤疮症状。",
    recommendations: [
      "使用含水杨酸的洁面产品",
      "避免用手触摸或挤压痘痘",
      "保持面部清洁，每天洗脸2次",
      "选择无油配方的护肤品",
    ],
    needDoctor: false,
  },
  {
    id: 2,
    condition: "皮肤干燥",
    confidence: 78,
    severity: "中度",
    description: "皮肤表面有轻微脱屑现象，可能存在水分流失。",
    recommendations: [
      "增加保湿产品的使用频率",
      "选择含透明质酸的护肤品",
      "避免过度清洁",
      "多喝水保持身体水分",
    ],
    needDoctor: false,
  },
]

export default function CameraPage({ onClose, onConsultDoctor }: CameraPageProps) {
  const [flashOn, setFlashOn] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleCapture = () => {
    setIsCapturing(true)
    // Simulate capture animation
    setTimeout(() => {
      setIsCapturing(false)
      setCapturedImage("/images/article-acne.jpg") // Use mock image
      setIsAnalyzing(true)
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResult(true)
      }, 2000)
    }, 500)
  }

  const handleSelectFromGallery = () => {
    // 打开设备相册
    galleryInputRef.current?.click()
  }

  const handleGalleryImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        setCapturedImage(imageData)
        setIsAnalyzing(true)
        setTimeout(() => {
          setIsAnalyzing(false)
          setShowResult(true)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setShowResult(false)
    setIsAnalyzing(false)
  }

  // Analysis Result Page
  if (showResult) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col bg-background">
        <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
          <button onClick={handleRetake} className="rounded-full bg-muted p-2" aria-label="返回">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">AI 分析结果</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Captured Image - 移除AI已分析标签 */}
          <div className="relative aspect-square w-full">
            <Image
              src={capturedImage || "/images/article-acne.jpg"}
              alt="分析图片"
              fill
              className="object-cover"
            />
          </div>

          <div className="px-5 py-4">
            {/* Analysis Results */}
            {mockAnalysisResults.map((result, idx) => (
              <div key={result.id} className={`rounded-xl bg-card p-4 shadow-sm ${idx > 0 ? "mt-3" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-foreground">{result.condition}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      result.severity === "轻度" 
                        ? "bg-primary/10 text-primary" 
                        : result.severity === "中度"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {result.severity}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-primary">{result.confidence}%</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{result.description}</p>
                
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-xs font-medium text-foreground">护理建议</p>
                  <ul className="mt-2 space-y-1.5">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Warning */}
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-500/10 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <p className="text-xs font-medium text-amber-600">温馨提示</p>
                <p className="mt-1 text-xs text-amber-600/80">
                  AI分析结果仅供参考，不能作为医学诊断依据。如症状持续或加重，请及时就医。
                </p>
              </div>
            </div>

            {/* Actions - 移除历史分析记录按钮 */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground"
              >
                重新拍摄
              </button>
              <button
                onClick={() => {
                  if (capturedImage && onConsultDoctor) {
                    onConsultDoctor(capturedImage)
                  } else {
                    onClose()
                  }
                }}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                咨询医生
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Analyzing State
  if (isAnalyzing) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-foreground">
        <div className="relative h-48 w-48 overflow-hidden rounded-2xl">
          <Image
            src={capturedImage || "/images/article-acne.jpg"}
            alt="分析中"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-card/30 border-t-primary" />
            <p className="mt-4 text-sm font-medium text-card">AI 正在分析...</p>
            <p className="mt-1 text-xs text-card/70">请稍候</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 z-50 flex flex-col bg-foreground ${isCapturing ? "bg-card" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <button onClick={onClose} className="rounded-full bg-card/20 p-2" aria-label="关闭">
          <X className="h-5 w-5 text-card" />
        </button>
        <h2 className="text-base font-bold text-card">AI 识肤拍照</h2>
        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`rounded-full p-2 ${flashOn ? "bg-primary" : "bg-card/20"}`}
          aria-label="闪光灯"
        >
          <Zap className={`h-5 w-5 ${flashOn ? "text-primary-foreground" : "text-card"}`} />
        </button>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        {/* Scan Frame */}
        <div className="relative aspect-square w-full max-w-[300px]">
          {/* Corner markers */}
          <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-2xl border-l-3 border-t-3 border-primary" />
          <div className="absolute right-0 top-0 h-8 w-8 rounded-tr-2xl border-r-3 border-t-3 border-primary" />
          <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-2xl border-b-3 border-l-3 border-primary" />
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-2xl border-b-3 border-r-3 border-primary" />

          {/* Center scan line animation */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center gap-2">
              <ScanLine className="h-6 w-6 animate-pulse text-primary" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-card/70">
          将皮肤患处对准取景框
        </p>
        <p className="mt-1 text-center text-xs text-card/50">
          确保光线充足，距离15-20cm拍摄效果最佳
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-around px-8 pb-12 pt-6">
        <button 
          onClick={handleSelectFromGallery}
          className="flex flex-col items-center gap-1.5" 
          aria-label="相册"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card/20">
            <ImageIcon className="h-5 w-5 text-card" />
          </div>
          <span className="text-[10px] text-card/70">相册</span>
        </button>

        <button
          onClick={handleCapture}
          className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card/30 bg-primary transition-transform active:scale-90"
          aria-label="拍照"
        >
          <Camera className="h-8 w-8 text-primary-foreground" />
        </button>

        <button className="flex flex-col items-center gap-1.5" aria-label="翻转">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card/20">
            <RotateCcw className="h-5 w-5 text-card" />
          </div>
          <span className="text-[10px] text-card/70">翻转</span>
        </button>
      </div>

      {/* 隐藏的相册选择input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleGalleryImageSelect}
        className="hidden"
      />
    </div>
  )
}
