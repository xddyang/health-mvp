"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  MessageSquare,
  Gift,
  AlertCircle,
  ChevronRight,
  Check,
  Trash2,
} from "lucide-react"

interface NotificationsPageProps {
  onClose: () => void
}

const mockNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "预约提醒",
    content: "您预约的王明华医生门诊将于明天14:00开始，请提前到达。",
    time: "1小时前",
    read: false,
  },
  {
    id: 2,
    type: "system",
    title: "系统通知",
    content: "您的健康档案已更新，皮肤健康评分提升至85分。",
    time: "3小时前",
    read: false,
  },
  {
    id: 3,
    type: "message",
    title: "医生回复",
    content: "李素芳医生回复了您的问诊消息，请查看。",
    time: "昨天",
    read: false,
  },
  {
    id: 4,
    type: "promotion",
    title: "优惠活动",
    content: "春季护肤季，VIP会员专享8折优惠，立即查看。",
    time: "2天前",
    read: true,
  },
  {
    id: 5,
    type: "appointment",
    title: "就诊完成",
    content: "您3月10日的门诊已完成，请对李素芳医生进行评价。",
    time: "3天前",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "账户安全",
    content: "您的账户于新设备登录，如非本人操作请及时修改密码。",
    time: "1周前",
    read: true,
  },
]

const typeIcons = {
  appointment: CalendarDays,
  system: AlertCircle,
  message: MessageSquare,
  promotion: Gift,
}

const typeColors = {
  appointment: "bg-primary/10 text-primary",
  system: "bg-secondary text-secondary-foreground",
  message: "bg-accent text-accent-foreground",
  promotion: "bg-destructive/10 text-destructive",
}

export default function NotificationsPage({ onClose }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleMarkRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">消息通知</h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-destructive px-2 py-0.5 text-[10px] text-card">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-primary"
            >
              全部已读
            </button>
          )}
          <button onClick={handleClearAll} className="text-xs text-muted-foreground">
            清空
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">暂无消息通知</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => {
              const Icon = typeIcons[notification.type as keyof typeof typeIcons]
              return (
                <div
                  key={notification.id}
                  className={`group relative rounded-xl bg-card p-4 shadow-sm transition-colors ${
                    !notification.read ? "border-l-2 border-l-primary" : ""
                  }`}
                >
                  <button
                    onClick={() => handleMarkRead(notification.id)}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        typeColors[notification.type as keyof typeof typeColors]
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={`text-sm ${
                            notification.read
                              ? "text-muted-foreground"
                              : "font-bold text-foreground"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p
                        className={`mt-1 line-clamp-2 text-xs ${
                          notification.read
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {notification.content}
                      </p>
                    </div>
                    <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>

                  {/* Quick Actions */}
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkRead(notification.id)}
                        className="rounded-full bg-muted p-1.5"
                        aria-label="标记已读"
                      >
                        <Check className="h-3 w-3 text-primary" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="rounded-full bg-muted p-1.5"
                      aria-label="删除"
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
