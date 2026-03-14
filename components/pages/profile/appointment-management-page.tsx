"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  ChevronRight,
  X,
} from "lucide-react"
import AppointmentDetailPage from "./appointment-detail-page"

interface AppointmentManagementPageProps {
  onClose: () => void
}

const mockAppointments = [
  {
    id: 1,
    doctor: {
      name: "王明华",
      title: "主任医师",
      department: "皮肤科",
      hospital: "北京协和医院",
      avatar: "/images/doctor-1.jpg",
    },
    date: "2026-03-15",
    time: "14:00",
    status: "pending",
    price: 50,
  },
  {
    id: 2,
    doctor: {
      name: "李素芳",
      title: "副主任医师",
      department: "皮肤科",
      hospital: "上海华山医院",
      avatar: "/images/doctor-2.jpg",
    },
    date: "2026-03-10",
    time: "10:00",
    status: "completed",
    price: 38,
  },
  {
    id: 3,
    doctor: {
      name: "张建国",
      title: "主任医师",
      department: "皮肤科",
      hospital: "广州南方医院",
      avatar: "/images/doctor-3.jpg",
    },
    date: "2026-03-05",
    time: "09:00",
    status: "completed",
    price: 60,
  },
  {
    id: 4,
    doctor: {
      name: "王明华",
      title: "主任医师",
      department: "皮肤科",
      hospital: "北京协和医院",
      avatar: "/images/doctor-1.jpg",
    },
    date: "2026-02-28",
    time: "15:30",
    status: "cancelled",
    price: 50,
  },
]

const statusLabels = {
  pending: { label: "待就诊", color: "bg-primary/10 text-primary" },
  completed: { label: "已完成", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "已取消", color: "bg-destructive/10 text-destructive" },
}

export default function AppointmentManagementPage({
  onClose,
}: AppointmentManagementPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all"
  )
  const [showCancelConfirm, setShowCancelConfirm] = useState<number | null>(null)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return apt.status === "pending"
    if (activeTab === "completed")
      return apt.status === "completed" || apt.status === "cancelled"
    return true
  })

  if (selectedAppointmentId !== null) {
    return (
      <AppointmentDetailPage
        appointmentId={selectedAppointmentId}
        onClose={() => setSelectedAppointmentId(null)}
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
          <h1 className="text-base font-bold text-foreground">预约管理</h1>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-4">
          {[
            { id: "all", label: "全部" },
            { id: "pending", label: "待就诊" },
            { id: "completed", label: "已完成" },
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

      {/* Appointments List */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">暂无预约记录</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="rounded-xl bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {apt.date} {apt.time}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      statusLabels[apt.status as keyof typeof statusLabels].color
                    }`}
                  >
                    {statusLabels[apt.status as keyof typeof statusLabels].label}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={apt.doctor.avatar}
                      alt={apt.doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {apt.doctor.name}
                      </span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                        {apt.doctor.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {apt.doctor.department}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {apt.doctor.hospital}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>

                {apt.status === "pending" && (
                  <div className="mt-3 flex gap-2 border-t border-border pt-3">
                    <button
                      onClick={() => setShowCancelConfirm(apt.id)}
                      className="flex-1 rounded-xl bg-muted py-2 text-xs font-medium text-foreground"
                    >
                      取消预约
                    </button>
                    <button 
                      onClick={() => setSelectedAppointmentId(apt.id)}
                      className="flex-1 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground"
                    >
                      查看详情
                    </button>
                  </div>
                )}

                {apt.status === "completed" && (
                  <div className="mt-3 flex gap-2 border-t border-border pt-3">
                    <button 
                      onClick={() => setSelectedAppointmentId(apt.id)}
                      className="flex-1 rounded-xl bg-muted py-2 text-xs font-medium text-foreground"
                    >
                      查看病历
                    </button>
                    <button className="flex-1 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground">
                      再次预约
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm !== null && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-foreground/50 px-8">
          <div className="w-full max-w-sm rounded-2xl bg-card p-5">
            <h3 className="text-center text-base font-bold text-foreground">
              确认取消
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要取消此预约吗？取消后可能需要重新排队预约。
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
              >
                再想想
              </button>
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 rounded-xl bg-destructive py-2.5 text-sm font-medium text-card"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
