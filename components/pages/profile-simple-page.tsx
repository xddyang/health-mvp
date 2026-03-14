"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"

interface ProfileSimplePageProps {
  onClose: () => void
}

export default function ProfileSimplePage({ onClose }: ProfileSimplePageProps) {
  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button
          onClick={onClose}
          className="rounded-full bg-muted p-2"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">个人中心</h1>
      </div>

      <div className="px-5 py-6">
        {/* Profile Card */}
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">晓</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">晓东</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">178****6465</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Stats - 简化版 */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="mt-1 text-xs text-muted-foreground">拍照识肤记录</p>
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-2xl font-bold text-primary">5</p>
            <p className="mt-1 text-xs text-muted-foreground">AI问诊记录</p>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-6 rounded-2xl bg-primary/5 p-4">
          <p className="text-sm font-medium text-foreground">关于肤康</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            肤康是一款基于AI技术的皮肤健康管理应用，通过智能拍照识肤和AI问诊功能，为用户提供专业的皮肤健康分析和护理建议。
          </p>
          <p className="mt-3 text-[11px] text-muted-foreground/70">
            版本 1.0.0 (MVP)
          </p>
        </div>

        {/* Contact */}
        <div className="mt-4 rounded-2xl bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-foreground">联系我们</p>
          <p className="mt-2 text-xs text-muted-foreground">
            如有任何问题或建议，请联系：1552614119@qq.com
          </p>
        </div>
      </div>
    </div>
  )
}
