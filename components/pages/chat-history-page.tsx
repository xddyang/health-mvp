"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Trash2,
  ChevronRight,
  MoreVertical,
  Clock,
  X,
} from "lucide-react"

interface ChatHistoryPageProps {
  onClose: () => void
  onSelectChat: (chatId: number, messages: Message[]) => void
  savedSessions?: ChatSession[]
}

export type { ChatSession, Message }

interface Message {
  id: number
  role: "user" | "ai"
  content: string
  time: string
  image?: string
}

interface ChatSession {
  id: number
  title: string
  lastMessage: string
  date: string
  messageCount: number
  messages: Message[]
}

// 完整的mock历史对话数据，包含每个对话的详细消息
const mockChatHistory: ChatSession[] = [
  {
    id: 1,
    title: "脸上长痘痘咨询",
    lastMessage: "建议使用含水杨酸的护肤品，避免用手挤压...",
    date: "今天 14:30",
    messageCount: 4,
    messages: [
      { id: 1, role: "ai", content: "您好！我是肤康AI助手。请问有什么可以帮助您的？", time: "14:25" },
      { id: 2, role: "user", content: "我脸上最近长了一些痘痘，应该怎么处理？", time: "14:26" },
      { id: 3, role: "ai", content: "根据您的描述，这可能是痤疮。建议：\n1. 保持面部清洁，使用温和洁面产品\n2. 避免用手挤压\n3. 选择含水杨酸或苯甲酰过氧化物的护肤品\n4. 如果反复发作，建议到皮肤科就诊", time: "14:27" },
      { id: 4, role: "user", content: "好的，谢谢医生", time: "14:30" },
    ],
  },
  {
    id: 2,
    title: "皮肤干燥脱皮问题",
    lastMessage: "皮肤干燥可能与季节变化有关，建议加强保湿...",
    date: "昨天 10:15",
    messageCount: 4,
    messages: [
      { id: 1, role: "ai", content: "您好！我是肤康AI助手。请问有什么可以帮助您的？", time: "10:10" },
      { id: 2, role: "user", content: "最近皮肤特别干燥，还有点脱皮，怎么回事？", time: "10:11" },
      { id: 3, role: "ai", content: "皮肤干燥脱皮可能与以下原因有关：\n1. 季节变化导致空气干燥\n2. 皮肤屏障受损\n3. 过度清洁\n4. 缺乏保湿\n\n建议使用温和保湿霜，避免热水洗脸，如持续加重请及时就医。", time: "10:13" },
      { id: 4, role: "user", content: "明白了，我去买点保湿霜", time: "10:15" },
    ],
  },
  {
    id: 3,
    title: "过敏性皮炎咨询",
    lastMessage: "过敏性皮炎需要远离过敏原，可以使用温和的护肤品...",
    date: "3月10日",
    messageCount: 4,
    messages: [
      { id: 1, role: "ai", content: "您好！我是肤康AI助手。请问有什么可以帮助您的？", time: "09:00" },
      { id: 2, role: "user", content: "我怀疑自己是过敏性皮炎，应该怎么判断？", time: "09:02" },
      { id: 3, role: "ai", content: "过敏性皮炎的常见表现：\n1. 皮肤红斑、丘疹\n2. 明显瘙痒\n3. 可能伴有脱屑\n4. 接触某些物质后加重\n\n建议远离过敏原，使用温和护肤品，必要时就医使用抗组胺药物。", time: "09:04" },
      { id: 4, role: "user", content: "好的，我会注意观察的", time: "09:05" },
    ],
  },
  {
    id: 4,
    title: "湿疹护理方法",
    lastMessage: "湿疹发作时要保持皮肤清洁干燥，避免搔抓...",
    date: "3月8日",
    messageCount: 4,
    messages: [
      { id: 1, role: "ai", content: "您好！我是肤康AI助手。请问有什么可以帮助您的？", time: "15:00" },
      { id: 2, role: "user", content: "湿疹发作了，有什么护理方法吗？", time: "15:02" },
      { id: 3, role: "ai", content: "湿疹护理建议：\n1. 保持皮肤清洁干燥\n2. 避免搔抓，可以轻拍止痒\n3. 使用温和无刺激的护肤品\n4. 穿宽松棉质衣物\n5. 如症状严重请及时就医", time: "15:04" },
      { id: 4, role: "user", content: "谢谢，我先试试这些方法", time: "15:05" },
    ],
  },
]

export default function ChatHistoryPage({
  onClose,
  onSelectChat,
  savedSessions = [],
}: ChatHistoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  // 合并已保存的对话和mock数据
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const allSessions = [...savedSessions, ...mockChatHistory]
    // 按时间排序，新的在前
    return allSessions.sort((a, b) => b.id - a.id)
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.includes(searchQuery) ||
      session.lastMessage.includes(searchQuery)
  )

  const handleDelete = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setShowDeleteConfirm(null)
    setActiveMenu(null)
  }

  const handleClearAll = () => {
    setSessions([])
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-muted"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">历史对话</h1>
          <button
            onClick={handleClearAll}
            className="text-xs text-muted-foreground"
            disabled={sessions.length === 0}
          >
            清空
          </button>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索对话记录"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {searchQuery ? "没有找到相关对话" : "暂无历史对话"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              开始新对话，与AI助手交流皮肤问题
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredSessions.map((session) => (
              <div key={session.id} className="relative">
                <div
                  onClick={() => onSelectChat(session.id, session.messages)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelectChat(session.id, session.messages)}
                  className="flex w-full cursor-pointer items-start gap-3 rounded-xl bg-card p-4 text-left shadow-sm transition-transform active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-bold text-foreground">
                        {session.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveMenu(
                            activeMenu === session.id ? null : session.id
                          )
                        }}
                        className="rounded-full p-1 hover:bg-muted"
                      >
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {session.lastMessage}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.date}
                      </span>
                      <span>{session.messageCount} 条消息</span>
                    </div>
                  </div>
                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
                </div>

                {/* Dropdown Menu */}
                {activeMenu === session.id && (
                  <div className="absolute right-4 top-12 z-10 rounded-xl bg-card p-1 shadow-lg">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteConfirm(session.id)
                        setActiveMenu(null)
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      <Trash2 className="h-4 w-4" />
                      删除对话
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-foreground/50 px-8">
          <div className="w-full max-w-sm rounded-2xl bg-card p-5">
            <h3 className="text-center text-base font-bold text-foreground">
              确认删除
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要删除这条对话记录吗？删除后将无法恢复。
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 rounded-xl bg-destructive py-2.5 text-sm font-medium text-card"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
