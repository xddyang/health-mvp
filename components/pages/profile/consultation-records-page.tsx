"use client"

import { useState } from "react"
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  ChevronRight,
  Bot,
  User,
} from "lucide-react"
import ConsultationDetailPage from "./consultation-detail-page"

interface ConsultationRecordsPageProps {
  onClose: () => void
}

const mockRecords = [
  {
    id: 1,
    type: "ai",
    title: "脸上长痘痘咨询",
    summary: "关于痤疮的治疗和护理建议",
    date: "2026-03-13 14:30",
    status: "已完成",
  },
  {
    id: 2,
    type: "doctor",
    title: "王明华 · 主任医师",
    summary: "湿疹复诊，调整用药方案",
    date: "2026-03-10 10:00",
    status: "已完成",
  },
  {
    id: 3,
    type: "ai",
    title: "皮肤干燥问题",
    summary: "季节性皮肤干燥的护理方法",
    date: "2026-03-08 09:15",
    status: "已完成",
  },
  {
    id: 4,
    type: "doctor",
    title: "李素芳 · 副主任医师",
    summary: "痤疮初诊，开具处方",
    date: "2026-03-05 15:30",
    status: "已完成",
  },
  {
    id: 5,
    type: "ai",
    title: "防晒产品咨询",
    summary: "关于防晒霜的选择和使用方法",
    date: "2026-03-01 11:20",
    status: "已完成",
  },
]

export default function ConsultationRecordsPage({
  onClose,
}: ConsultationRecordsPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "doctor">("all")
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null)

  const filteredRecords = mockRecords.filter((record) => {
    if (activeTab === "all") return true
    return record.type === activeTab
  })

  if (selectedRecordId !== null) {
    return (
      <ConsultationDetailPage
        recordId={selectedRecordId}
        onClose={() => setSelectedRecordId(null)}
      />
    )
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card px-4 pb-3 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">问诊记录</h1>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-4">
          {[
            { id: "all", label: "全部" },
            { id: "ai", label: "AI问诊" },
            { id: "doctor", label: "医生问诊" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`relative pb-2 text-sm font-medium ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Records List */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">暂无问诊记录</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredRecords.map((record) => (
              <button
                key={record.id}
                onClick={() => setSelectedRecordId(record.id)}
                className="flex items-start gap-3 rounded-xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    record.type === "ai"
                      ? "bg-primary/10"
                      : "bg-secondary"
                  }`}
                >
                  {record.type === "ai" ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-secondary-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-bold text-foreground">
                      {record.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                      {record.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {record.summary}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {record.date}
                  </div>
                </div>
                <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
