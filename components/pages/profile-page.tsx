"use client"

import { useState } from "react"
import {
  ChevronRight,
  Settings,
  Bell,
  FileText,
  Heart,
  CreditCard,
  HelpCircle,
  Shield,
  LogOut,
  Star,
  CalendarCheck,
  Camera,
} from "lucide-react"

import UserInfoPage from "./profile/user-info-page"
import ConsultationRecordsPage from "./profile/consultation-records-page"
import AppointmentManagementPage from "./profile/appointment-management-page"
import FavoritesPage from "./profile/favorites-page"
import MyReviewsPage from "./profile/my-reviews-page"
import NotificationsPage from "./profile/notifications-page"
import SettingsPage from "./profile/settings-page"
import HealthReportPage from "./profile/health-report-page"
import PaymentPage from "./profile/payment-page"
import HelpPage from "./profile/help-page"
import CameraPage from "./camera-page"

type SubPage =
  | "none"
  | "userInfo"
  | "consultation"
  | "appointments"
  | "favorites"
  | "reviews"
  | "notifications"
  | "settings"
  | "health"
  | "payment"
  | "help"
  | "privacy"
  | "camera"

const stats = [
  { label: "咨询记录", value: "12", icon: FileText, page: "consultation" as SubPage },
  { label: "收藏文章", value: "28", icon: Heart, page: "favorites" as SubPage },
  { label: "预约记录", value: "5", icon: CalendarCheck, page: "appointments" as SubPage },
  { label: "拍照记录", value: "8", icon: Camera, page: "consultation" as SubPage },
]

const menuSections = [
  {
    title: "我的服务",
    items: [
      { icon: FileText, label: "问诊记录", badge: "", page: "consultation" as SubPage },
      { icon: CalendarCheck, label: "预约管理", badge: "1", page: "appointments" as SubPage },
      { icon: Heart, label: "收藏内容", badge: "", page: "favorites" as SubPage },
      { icon: Star, label: "我的评价", badge: "", page: "reviews" as SubPage },
    ],
  },
  {
    title: "其他设置",
    items: [
      { icon: Bell, label: "消息通知", badge: "3", page: "notifications" as SubPage },
      { icon: CreditCard, label: "支付管理", badge: "", page: "payment" as SubPage },
      { icon: Shield, label: "隐私安全", badge: "", page: "privacy" as SubPage },
      { icon: HelpCircle, label: "帮助与反馈", badge: "", page: "help" as SubPage },
      { icon: Settings, label: "系统设置", badge: "", page: "settings" as SubPage },
    ],
  },
]

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState<SubPage>("none")

  const renderSubPage = () => {
    switch (currentPage) {
      case "userInfo":
        return <UserInfoPage onClose={() => setCurrentPage("none")} />
      case "consultation":
        return <ConsultationRecordsPage onClose={() => setCurrentPage("none")} />
      case "appointments":
        return <AppointmentManagementPage onClose={() => setCurrentPage("none")} />
      case "favorites":
        return <FavoritesPage onClose={() => setCurrentPage("none")} />
      case "reviews":
        return <MyReviewsPage onClose={() => setCurrentPage("none")} />
      case "notifications":
        return <NotificationsPage onClose={() => setCurrentPage("none")} />
      case "settings":
        return <SettingsPage onClose={() => setCurrentPage("none")} />
      case "health":
        return <HealthReportPage onClose={() => setCurrentPage("none")} onStartSkinTest={() => setCurrentPage("camera")} />
      case "camera":
        return <CameraPage onClose={() => setCurrentPage("none")} />
      case "payment":
        return <PaymentPage onClose={() => setCurrentPage("none")} />
      case "help":
        return <HelpPage onClose={() => setCurrentPage("none")} />
      case "privacy":
        return <SettingsPage onClose={() => setCurrentPage("none")} />
      default:
        return null
    }
  }

  if (currentPage !== "none") {
    return renderSubPage()
  }

  return (
    <div className="min-h-full bg-background pb-4">
      {/* Header / Profile Card */}
      <div className="bg-card px-5 pb-6 pt-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">我的</h1>
          <button
            onClick={() => setCurrentPage("settings")}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="设置"
          >
            <Settings className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Profile Info */}
        <button
          onClick={() => setCurrentPage("userInfo")}
          className="mt-5 flex w-full items-center gap-4 text-left"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-2xl font-bold text-primary">小</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">小明</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              138****8888
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                VIP会员
              </span>
              <span className="text-[11px] text-muted-foreground">
                有效期至2026.12.31
              </span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <button
                key={stat.label}
                onClick={() => setCurrentPage(stat.page)}
                className="flex flex-col items-center gap-1 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {stat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Health Card */}
      <div className="mx-5 mt-4 rounded-2xl bg-primary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary-foreground/80">
              我的健康档案
            </p>
            <p className="mt-1 text-lg font-bold text-primary-foreground">
              皮肤健康评分 85分
            </p>
            <p className="mt-0.5 text-xs text-primary-foreground/60">
              上次评估: 2026年2月28日
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20">
            <Shield className="h-7 w-7 text-primary-foreground" />
          </div>
        </div>
        <button
          onClick={() => setCurrentPage("health")}
          className="mt-3 w-full rounded-xl bg-primary-foreground/20 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/30"
        >
          查看完整报告
        </button>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="mt-4 px-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="h-4 w-1 rounded-full bg-primary" />
            {section.title}
          </h3>
          <div className="rounded-2xl bg-card shadow-sm">
            {section.items.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted ${
                    idx !== section.items.length - 1
                      ? "border-b border-border"
                      : ""
                  } ${idx === 0 ? "rounded-t-2xl" : ""} ${
                    idx === section.items.length - 1 ? "rounded-b-2xl" : ""
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                  <span className="flex-1 text-left text-sm text-foreground">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-card">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="mt-6 px-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-medium text-destructive shadow-sm transition-colors hover:bg-muted">
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </div>
    </div>
  )
}
