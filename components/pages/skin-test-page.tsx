"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Droplets,
  Sun,
  Shield,
  Sparkles,
} from "lucide-react"

interface SkinTestPageProps {
  onClose: () => void
  onNavigateToAI?: () => void
}

const questions = [
  {
    id: 1,
    question: "您的皮肤在洗脸后2-3小时会出现什么状态？",
    options: [
      { label: "整体干燥紧绷", score: 1, type: "dry" },
      { label: "T区出油，两颊正常", score: 2, type: "combination" },
      { label: "整体油光满面", score: 3, type: "oily" },
      { label: "感觉舒适，无明显变化", score: 2, type: "normal" },
    ],
  },
  {
    id: 2,
    question: "您的毛孔状态如何？",
    options: [
      { label: "毛孔细小，几乎看不见", score: 1, type: "dry" },
      { label: "T区毛孔较明显", score: 2, type: "combination" },
      { label: "全脸毛孔粗大", score: 3, type: "oily" },
      { label: "毛孔大小适中", score: 2, type: "normal" },
    ],
  },
  {
    id: 3,
    question: "您是否容易出现皮肤敏感问题？",
    options: [
      { label: "经常泛红、刺痛、瘙痒", score: 3, type: "sensitive" },
      { label: "偶尔出现敏感症状", score: 2, type: "sensitive" },
      { label: "很少出现敏感问题", score: 1, type: "normal" },
      { label: "从未出现过敏反应", score: 0, type: "normal" },
    ],
  },
  {
    id: 4,
    question: "您的皮肤是否容易长痘？",
    options: [
      { label: "经常长痘，难以控制", score: 3, type: "acne" },
      { label: "偶尔长几颗痘痘", score: 2, type: "acne" },
      { label: "很少长痘", score: 1, type: "normal" },
      { label: "基本不长痘", score: 0, type: "normal" },
    ],
  },
  {
    id: 5,
    question: "您日常防晒习惯如何？",
    options: [
      { label: "每天涂防晒，定时补涂", score: 3, type: "protection" },
      { label: "晴天外出时涂防晒", score: 2, type: "protection" },
      { label: "偶尔涂防晒", score: 1, type: "protection" },
      { label: "基本不涂防晒", score: 0, type: "protection" },
    ],
  },
]

const skinTypes = {
  dry: { name: "干性皮肤", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  oily: { name: "油性皮肤", icon: Sun, color: "text-amber-500", bg: "bg-amber-500/10" },
  combination: { name: "混合性皮肤", icon: Shield, color: "text-purple-500", bg: "bg-purple-500/10" },
  normal: { name: "中性皮肤", icon: Sparkles, color: "text-green-500", bg: "bg-green-500/10" },
  sensitive: { name: "敏感性皮肤", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
}

export default function SkinTestPage({ onClose, onNavigateToAI }: SkinTestPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: { score: number; type: string } }>({})
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (option: { score: number; type: string }) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: option }))
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResult(true)
      }, 300)
    }
  }

  const calculateResult = () => {
    const typeScores: { [key: string]: number } = {}
    Object.values(answers).forEach((answer) => {
      typeScores[answer.type] = (typeScores[answer.type] || 0) + answer.score
    })
    
    let maxType = "normal"
    let maxScore = 0
    Object.entries(typeScores).forEach(([type, score]) => {
      if (score > maxScore && type !== "protection" && type !== "acne") {
        maxScore = score
        maxType = type
      }
    })
    
    return {
      skinType: skinTypes[maxType as keyof typeof skinTypes] || skinTypes.normal,
      sensitiveScore: typeScores.sensitive || 0,
      acneScore: typeScores.acne || 0,
      protectionScore: typeScores.protection || 0,
    }
  }

  if (showResult) {
    const result = calculateResult()
    const Icon = result.skinType.icon
    
    return (
      <div className="absolute inset-0 z-50 flex flex-col bg-background">
        <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
          <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">测试结果</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="flex flex-col items-center">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full ${result.skinType.bg}`}>
              <Icon className={`h-10 w-10 ${result.skinType.color}`} />
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">{result.skinType.name}</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              根据您的回答，我们分析了您的皮肤类型
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">敏感程度</span>
                <span className="text-sm font-medium text-foreground">
                  {result.sensitiveScore >= 3 ? "较敏感" : result.sensitiveScore >= 2 ? "轻微敏感" : "不敏感"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-destructive"
                  style={{ width: `${Math.min(result.sensitiveScore * 33, 100)}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">痤疮风险</span>
                <span className="text-sm font-medium text-foreground">
                  {result.acneScore >= 3 ? "较高" : result.acneScore >= 2 ? "中等" : "较低"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${Math.min(result.acneScore * 33, 100)}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">防晒意识</span>
                <span className="text-sm font-medium text-foreground">
                  {result.protectionScore >= 3 ? "优秀" : result.protectionScore >= 2 ? "良好" : "需加强"}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.min(result.protectionScore * 33, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-primary/10 p-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              护肤建议
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• 根据您的肤质选择适合的洁面和保湿产品</li>
              <li>• 坚持每日防晒，选择SPF30+的防晒霜</li>
              <li>• 保持良好作息，避免熬夜</li>
              <li>• 如有皮肤问题，建议咨询专业医生</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground"
            >
              返回首页
            </button>
            <button
              onClick={() => {
                onClose()
                onNavigateToAI?.()
              }}
              className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              咨询AI医生
            </button>
          </div>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  
  // Safe access to current question with fallback
  if (currentQuestion < 0 || currentQuestion >= questions.length) {
    return null
  }
  
  const currentQ = questions[currentQuestion]

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">皮肤自测</h1>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>问题 {currentQuestion + 1}/{questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 py-4">
        <h2 className="text-lg font-bold text-foreground">
          {currentQ.question}
        </h2>

        <div className="mt-6 space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className={`flex w-full items-center justify-between rounded-xl bg-card p-4 shadow-sm transition-all active:scale-[0.98] ${
                answers[currentQuestion]?.type === option.type &&
                answers[currentQuestion]?.score === option.score
                  ? "ring-2 ring-primary"
                  : ""
              }`}
            >
              <span className="text-sm text-foreground">{option.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
