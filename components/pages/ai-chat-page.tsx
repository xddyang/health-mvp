"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, Stethoscope, PlusCircle, History, ImagePlus, Camera, Upload, X } from "lucide-react"
import Image from "next/image"
import ChatHistoryPage, { type ChatSession, type Message } from "./chat-history-page"
import CameraPage from "./camera-page"

const suggestedQuestions = [
  "脸上长痘痘怎么处理？",
  "皮肤干燥脱皮是什么原因？",
  "被蚊虫叮咬红肿怎么办？",
  "如何判断是否为过敏性皮炎？",
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content:
      "您好！我是肤康AI助手，一位专业的皮肤科智能问诊助手。我可以帮您初步分析皮肤问题，提供护理建议。请描述您的皮肤状况，或者拍照上传以获得更准确的分析。",
    time: "09:30",
  },
]

interface AiChatPageProps {
  onSubPageChange?: (isSubPage: boolean) => void
  pendingImage?: string | null
  onPendingImageUsed?: () => void
}

export default function AiChatPage({ onSubPageChange, pendingImage, onPendingImageUsed }: AiChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [showImageMenu, setShowImageMenu] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [savedSessions, setSavedSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 通知父组件是否在二级页面
  useEffect(() => {
    onSubPageChange?.(showHistory || showCamera)
  }, [showHistory, showCamera, onSubPageChange])

  // 接收从分析结果页带过来的图片
  useEffect(() => {
    if (pendingImage) {
      setSelectedImage(pendingImage)
      onPendingImageUsed?.()
    }
  }, [pendingImage, onPendingImageUsed])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: inputValue || (selectedImage ? "请帮我分析这张图片" : ""),
      time: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: selectedImage || undefined,
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setSelectedImage(null)

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: selectedImage ? getImageAnalysisResponse(inputValue) : getAiResponse(inputValue),
        time: new Date().toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1500)
  }

  // 处理图片选择
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    setShowImageMenu(false)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  // 保存当前对话到历史记录
  const saveCurrentSession = () => {
    if (messages.length > 1) {
      // 只有有实际对话才保存
      const userMessages = messages.filter((m) => m.role === "user")
      if (userMessages.length > 0) {
        const firstUserMessage = userMessages[0].content
        const lastAiMessage = messages.filter((m) => m.role === "ai").pop()
        
        const newSession: ChatSession = {
          id: Date.now(),
          title: firstUserMessage.slice(0, 20) + (firstUserMessage.length > 20 ? "..." : ""),
          lastMessage: lastAiMessage?.content.slice(0, 50) + "..." || "",
          date: "刚刚",
          messageCount: messages.length,
          messages: [...messages],
        }
        
        // 检查是否已存在该会话（编辑现有会话）
        if (currentSessionId) {
          setSavedSessions((prev) =>
            prev.map((s) => (s.id === currentSessionId ? newSession : s))
          )
        } else {
          setSavedSessions((prev) => [newSession, ...prev])
        }
      }
    }
  }

  // 新建对话
  const handleNewChat = () => {
    saveCurrentSession()
    setMessages(initialMessages)
    setCurrentSessionId(null)
  }

  const handleSelectChat = (chatId: number, chatMessages: Message[]) => {
    // 先保存当前对话
    saveCurrentSession()
    // 加载选中的对话
    setMessages(chatMessages)
    setCurrentSessionId(chatId)
    setShowHistory(false)
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* History Page */}
      {showHistory && (
        <ChatHistoryPage
          onClose={() => setShowHistory(false)}
          onSelectChat={handleSelectChat}
          savedSessions={savedSessions}
        />
      )}

      {/* Camera Page */}
      {showCamera && (
        <CameraPage onClose={() => setShowCamera(false)} />
      )}

      {/* Header */}
      <div className="bg-card px-5 pb-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">AI智能问诊</h1>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-[11px] text-muted-foreground">
                  在线中
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(true)}
              className="rounded-full bg-muted p-2 transition-colors hover:bg-accent"
              aria-label="历史记录"
            >
              <History className="h-5 w-5 text-muted-foreground" />
            </button>
            <button
              onClick={handleNewChat}
              className="rounded-full bg-muted p-2 transition-colors hover:bg-accent"
              aria-label="新对话"
            >
              <PlusCircle className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "ai"
                  ? "bg-primary/10"
                  : "bg-muted"
              }`}
            >
              {msg.role === "ai" ? (
                <Bot className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.role === "ai"
                  ? "rounded-tl-sm bg-card shadow-sm"
                  : "rounded-tr-sm bg-primary text-primary-foreground"
              }`}
            >
              {/* 显示图片 */}
              {msg.image && (
                <div className="mb-2 overflow-hidden rounded-lg">
                  <Image
                    src={msg.image}
                    alt="上传的图片"
                    width={200}
                    height={150}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <span
                className={`mt-1 block text-right text-[10px] ${
                  msg.role === "ai"
                    ? "text-muted-foreground"
                    : "text-primary-foreground/70"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="border-t border-border bg-card/50 px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            猜你想问
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleQuickQuestion(q)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        {/* 图片预览 */}
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
              <Image
                src={selectedImage}
                alt="预览图片"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow-md"
              aria-label="移除图片"
            >
              <X className="h-3 w-3 text-white" strokeWidth={3} />
            </button>
          </div>
        )}
        
        <div className="flex items-end gap-2">
          {/* 图片按钮 */}
          <div className="relative">
            <button
              onClick={() => setShowImageMenu(!showImageMenu)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="添加图片"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
            
            {/* 图片选择菜单 */}
            {showImageMenu && (
              <div className="absolute bottom-12 left-0 z-50 w-36 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                <button
                  onClick={() => {
                    setShowImageMenu(false)
                    setShowCamera(true)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Camera className="h-4 w-4 text-primary" />
                  拍照
                </button>
                <div className="h-px bg-border" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  <Upload className="h-4 w-4 text-primary" />
                  从相册选择
                </button>
              </div>
            )}
            
            {/* 隐藏的文件输入 - 仅用于从相册选择 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
          
          <div className="flex-1 rounded-2xl bg-muted px-4 py-2.5">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={selectedImage ? "描述图片中的问题..." : "描述您的皮肤问题..."}
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() && !selectedImage}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all disabled:opacity-40"
            aria-label="发送"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* 点击其他区域关闭菜单 */}
      {showImageMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowImageMenu(false)}
        />
      )}
    </div>
  )
}

// 图片分析的模拟响应
function getImageAnalysisResponse(question: string): string {
  if (question.includes("痘") || question.includes("痤疮")) {
    return "根据您上传的图片分析：\n\n**初步判断**：痤疮（粉刺型）\n**严重程度**：轻度\n\n**分析结果**：\n- 图片显示有少量闭合性粉刺\n- 无明显炎症表现\n- 皮肤出油情况较明显\n\n**护理建议**：\n1. 选用温和控油洁面产品\n2. 可使用含水杨酸的护肤品\n3. 注意饮食清淡，避免辛辣油腻\n4. 保持作息规律\n\n⚠️ 本分析仅供参考，如症状持续建议就医"
  }
  if (question.includes("红") || question.includes("敏感")) {
    return "根据您上传的图片分析：\n\n**初步判断**：皮肤敏感/轻微红血丝\n**严重程度**：轻度\n\n**分析结果**：\n- 面部可见轻微泛红\n- 皮肤屏障可能受损\n- 无明显皮疹或丘疹\n\n**护理建议**：\n1. 使用修复型护肤品\n2. 避免刺激性成分\n3. 加强防晒\n4. 简化护肤步骤\n\n⚠️ 本分析仅供参考，如症状持续建议就医"
  }
  return "根据您上传的图片分析：\n\n**初步判断**：皮肤状态需进一步观察\n\n**分析结果**：\n- 图片清晰度良好\n- 未发现明显异常病变\n- 建议继续观察\n\n**一般护理建议**：\n1. 保持皮肤清洁\n2. 做好日常保湿\n3. 注意防晒\n4. 如有不适及时就医\n\n如需更准确诊断，建议您：\n- 提供更清晰的近距离照片\n- 描述具体症状和持续时间\n- 告知是否有过敏史\n\n⚠️ 本分析仅供参考，不构成医疗建议"
}

function getAiResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes("痘") || lower.includes("痤疮")) {
    return "根据您的描述，这可能是痤疮（青春痘）。建议：\n1. 保持面部清洁，使用温和洁面产品\n2. 避免用手挤压\n3. 选择含水杨酸或苯甲酰过氧化物的护肤品\n4. 如果反复发作，建议到皮肤科就诊\n\n需要更精确的判断，建议您使用拍照功能上传图片。"
  }
  if (lower.includes("干燥") || lower.includes("脱皮")) {
    return "皮肤干燥脱皮可能与以下原因有关：\n1. 季节变化导致空气干燥\n2. 皮肤屏障受损\n3. 过度清洁\n4. 缺乏保湿\n\n建议使用温和保湿霜，避免热水洗脸，如持续加重请及时就医。"
  }
  if (lower.includes("蚊虫") || lower.includes("叮咬")) {
    return "蚊虫叮咬后的处理建议：\n1. 用清水和肥皂清洗叮咬处\n2. 可外涂炉甘石洗剂止痒\n3. ���免搔抓以防感染\n4. 如出现大面积红肿或发烧，请及时就医\n\n您可以拍照让我看看具体情况。"
  }
  if (lower.includes("过敏") || lower.includes("皮炎")) {
    return "过敏性皮炎的常见表现：\n1. 皮肤红斑、丘疹\n2. 明显瘙痒\n3. 可能伴有脱屑\n4. 接触某些物质后加重\n\n建议远离过敏原，使用温和护肤品，必要时就医使用抗组胺药物。您可以使用皮肤自测功能进行初步评估。"
  }
  return "感谢您的描述。为了给您更准确的建议，建议您：\n1. 使用拍照功能上传皮肤图片\n2. 详细描述症状持续时间\n3. 说明是否有用药史\n\n这样我可以为您提供更专业的参考意见。如果症状严重，建议尽快到皮肤科就诊。"
}
