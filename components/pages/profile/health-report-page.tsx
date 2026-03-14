"use client"

import {
  ArrowLeft,
  Shield,
  TrendingUp,
  Droplets,
  Sun,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ChevronRight,
} from "lucide-react"

interface HealthReportPageProps {
  onClose: () => void
  onStartSkinTest?: () => void
}

const skinMetrics = [
  { label: "皮肤水分", value: 72, status: "good", icon: Droplets },
  { label: "油脂平衡", value: 65, status: "normal", icon: TrendingUp },
  { label: "防晒指数", value: 80, status: "good", icon: Sun },
  { label: "敏感程度", value: 35, status: "good", icon: AlertTriangle },
]

const recentScans = [
  {
    id: 1,
    date: "2026-03-12",
    score: 85,
    issues: ["轻微干燥", "T区出油"],
    improvement: "+3",
  },
  {
    id: 2,
    date: "2026-03-05",
    score: 82,
    issues: ["换季敏感", "轻微泛红"],
    improvement: "+2",
  },
  {
    id: 3,
    date: "2026-02-28",
    score: 80,
    issues: ["皮肤干燥", "细纹增加"],
    improvement: "-1",
  },
]

const recommendations = [
  "每日保湿霜使用量增加至每天3次",
  "选择SPF50+的防晒霜，每2小时补涂",
  "减少刺激性护肤品的使用",
  "保持充足睡眠，避免熬夜",
]

export default function HealthReportPage({ onClose, onStartSkinTest }: HealthReportPageProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button
          onClick={onClose}
          className="rounded-full bg-muted p-2"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">健康档案</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Score Card */}
        <div className="bg-primary px-5 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/80">皮肤健康评分</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary-foreground">
                  85
                </span>
                <span className="text-sm text-primary-foreground/80">/100分</span>
                <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs text-primary-foreground">
                  +3分
                </span>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/60">
                上次评估: 2026年3月12日
              </p>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary-foreground/10 p-3">
            <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
            <p className="text-xs text-primary-foreground">
              您的皮肤状态良好，继续保持当前的护肤习惯
            </p>
          </div>
        </div>

        {/* Skin Metrics */}
        <div className="px-5 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="h-4 w-1 rounded-full bg-primary" />
            皮肤指标
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {skinMetrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.label}
                  className="rounded-xl bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`h-4 w-4 ${
                        metric.status === "good"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {metric.value}%
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        metric.status === "good"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {metric.status === "good" ? "良好" : "正常"}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${
                        metric.status === "good" ? "bg-primary" : "bg-muted-foreground"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Scans */}
        <div className="px-5 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="h-4 w-1 rounded-full bg-primary" />
            历史记录
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            {recentScans.map((scan) => (
              <button
                key={scan.id}
                className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      {scan.date}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {scan.issues.join(" · ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">
                      {scan.score}
                    </span>
                    <span className="text-xs text-muted-foreground">分</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      scan.improvement.startsWith("+")
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {scan.improvement}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="px-5 py-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="h-4 w-1 rounded-full bg-primary" />
            护肤建议
          </h3>
          <div className="mt-3 rounded-xl bg-card p-4 shadow-sm">
            <ul className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 pt-2">
          <button 
            onClick={onStartSkinTest}
            className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
          >
            开始新的皮肤检测
          </button>
        </div>
      </div>
    </div>
  )
}
