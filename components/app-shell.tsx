"use client"
// MVP Version v1.0 - 肤康皮肤健康助手
import { useState } from "react"
import { Home, MessageSquare, Camera } from "lucide-react"
import HomePage from "@/components/pages/home-page"
import AiChatPage from "@/components/pages/ai-chat-page"
import CameraPage from "@/components/pages/camera-page"

type TabType = "home" | "ai" | "camera"

const tabs: { id: TabType; label: string; icon: typeof Home }[] = [
  { id: "home", label: "首页", icon: Home },
  { id: "camera", label: "拍照", icon: Camera },
  { id: "ai", label: "AI问诊", icon: MessageSquare },
]

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [showCamera, setShowCamera] = useState(false)
  // 控制是否显示tabbar - 二级页面时隐藏
  const [hideTabBar, setHideTabBar] = useState(false)
  // AI问诊页是否在二级页面（相机/历史）
  const [aiPageInSubPage, setAiPageInSubPage] = useState(false)
  // 从分析结果页带过来的图片
  const [pendingImageForChat, setPendingImageForChat] = useState<string | null>(null)

  const handleTabClick = (tabId: TabType) => {
    if (tabId === "camera") {
      setShowCamera(true)
    } else {
      setShowCamera(false)
      setActiveTab(tabId)
    }
  }

  return (
    <div className="relative mx-auto flex h-dvh max-w-[430px] flex-col overflow-hidden bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "home" && (
          <HomePage 
            onNavigateToAI={() => setActiveTab("ai")} 
            onOpenCamera={() => setShowCamera(true)}
            onSubPageChange={setHideTabBar}
          />
        )}
        {activeTab === "ai" && (
          <AiChatPage 
            onSubPageChange={setAiPageInSubPage}
            pendingImage={pendingImageForChat}
            onPendingImageUsed={() => setPendingImageForChat(null)}
          />
        )}
      </main>

      {/* Camera Modal */}
      {showCamera && (
        <CameraPage 
          onClose={() => setShowCamera(false)} 
          onConsultDoctor={(image) => {
            setPendingImageForChat(image)
            setShowCamera(false)
            setActiveTab("ai")
          }}
        />
      )}

      {/* Tab Bar - MVP: 3 tabs, 二级页面或相机页面时隐藏 */}
      {!hideTabBar && !showCamera && !aiPageInSubPage && (
      <nav className="relative z-50 flex shrink-0 items-end justify-around border-t border-border bg-card px-2 pb-6 pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isCamera = tab.id === "camera"
          const isActive = !isCamera && activeTab === tab.id

          if (isCamera) {
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="group -mt-7 flex flex-col items-center"
                aria-label={tab.label}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-active:scale-95">
                  <Camera className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="mt-1 text-[10px] text-muted-foreground">
                  {tab.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex min-w-[56px] flex-col items-center gap-0.5 py-1 transition-colors"
              aria-label={tab.label}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
      )}
    </div>
  )
}
