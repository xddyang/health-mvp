"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  Bell,
  Shield,
  Trash2,
  Info,
  LogOut,
} from "lucide-react"

interface SettingsPageProps {
  onClose: () => void
}

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false)

  const settingsSections = [
    {
      title: "通用设置",
      items: [
        {
          icon: isDarkMode ? Moon : Sun,
          label: "深色模式",
          type: "toggle",
          value: isDarkMode,
          onChange: () => setIsDarkMode(!isDarkMode),
        },
        {
          icon: Globe,
          label: "语言",
          type: "link",
          value: "简体中文",
        },
        {
          icon: Bell,
          label: "推送通知",
          type: "toggle",
          value: pushNotifications,
          onChange: () => setPushNotifications(!pushNotifications),
        },
      ],
    },
    {
      title: "隐私与安全",
      items: [
        {
          icon: Shield,
          label: "隐私设置",
          type: "link",
        },
        {
          icon: Shield,
          label: "修改密码",
          type: "link",
        },
        {
          icon: Shield,
          label: "账号安全",
          type: "link",
        },
      ],
    },
    {
      title: "其他",
      items: [
        {
          icon: Trash2,
          label: "清除缓存",
          type: "action",
          onClick: () => setShowClearCacheConfirm(true),
          valueText: "23.5 MB",
        },
        {
          icon: Info,
          label: "关于我们",
          type: "link",
        },
        {
          icon: Info,
          label: "用户协议",
          type: "link",
        },
        {
          icon: Info,
          label: "隐私政策",
          type: "link",
        },
        {
          icon: Info,
          label: "当前版本",
          type: "text",
          value: "v2.1.0",
        },
      ],
    },
  ]

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
        <h1 className="text-base font-bold text-foreground">系统设置</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              {section.title}
            </h3>
            <div className="rounded-2xl bg-card shadow-sm">
              {section.items.map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={item.type === "action" ? item.onClick : undefined}
                    className={`flex w-full items-center justify-between px-4 py-3.5 ${
                      idx !== section.items.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.type === "toggle" ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation()
                            item.onChange?.()
                          }}
                          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                            item.value ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${
                              item.value
                                ? "translate-x-[22px]"
                                : "translate-x-0.5"
                            }`}
                          />
                        </div>
                      ) : item.type === "link" ? (
                        <>
                          {item.value && (
                            <span className="text-xs text-muted-foreground">
                              {item.value}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </>
                      ) : item.type === "action" ? (
                        <>
                          {item.valueText && (
                            <span className="text-xs text-muted-foreground">
                              {item.valueText}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-card py-3 text-sm font-medium text-destructive shadow-sm"
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </div>

      {/* Clear Cache Confirmation */}
      {showClearCacheConfirm && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-foreground/50 px-8">
          <div className="w-full max-w-sm rounded-2xl bg-card p-5">
            <h3 className="text-center text-base font-bold text-foreground">
              清除缓存
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要清除所有缓存数据吗？这将释放 23.5 MB 的存储空间。
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowClearCacheConfirm(false)}
                className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
              >
                取消
              </button>
              <button
                onClick={() => setShowClearCacheConfirm(false)}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-foreground/50 px-8">
          <div className="w-full max-w-sm rounded-2xl bg-card p-5">
            <h3 className="text-center text-base font-bold text-foreground">
              退出登录
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要退出当前账号吗？
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
              >
                取消
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-xl bg-destructive py-2.5 text-sm font-medium text-card"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
