"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Bot,
  User,
  Calendar,
  Clock,
  Download,
  Share2,
  MessageCircle,
  FileText,
  Pill,
} from "lucide-react"

interface ConsultationDetailPageProps {
  recordId: number
  onClose: () => void
}

const mockConsultationDetails: Record<number, {
  id: number
  type: "ai" | "doctor"
  title: string
  date: string
  duration: string
  status: string
  summary: string
  diagnosis: string
  symptoms: string[]
  prescription?: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  advice: string[]
  followUp?: string
  doctor?: {
    name: string
    title: string
    avatar: string
  }
  messages: {
    role: "user" | "ai" | "doctor"
    content: string
    time: string
  }[]
}> = {
  1: {
    id: 1,
    type: "ai",
    title: "脸上长痘痘咨询",
    date: "2026-03-13",
    duration: "15分钟",
    status: "已完成",
    summary: "用户咨询面部痤疮问题，AI提供了初步诊断建议和护理方案。",
    diagnosis: "轻度痤疮（粉刺型）",
    symptoms: ["面部T区有少量粉刺", "偶尔出现红肿丘疹", "皮肤偏油性"],
    advice: [
      "使用含水杨酸的洁面产品，每日清洁2次",
      "避免用手触摸或挤压痘痘",
      "选择无油配方的护肤品和化妆品",
      "保持规律作息，避免熬夜",
      "饮食清淡，少吃辛辣油腻食物",
    ],
    followUp: "如症状持续2周无改善，建议预约皮肤科医生面诊",
    messages: [
      { role: "ai", content: "您好！我是肤康AI助手。请问有什么皮肤问题需要咨询？", time: "14:30" },
      { role: "user", content: "我脸上最近长了一些痘痘，主要在额头和鼻子两侧，应该怎么处理？", time: "14:31" },
      { role: "ai", content: "根据您的描述，这可能是T区痤疮，通常与油脂分泌旺盛有关。请问您平时的皮肤是偏油性还是偏干性？痘痘是红肿的还是白头粉刺？", time: "14:31" },
      { role: "user", content: "皮肤比较油，痘痘大部分是白头粉刺，偶尔有几颗红肿的", time: "14:32" },
      { role: "ai", content: "了解了。根据您的描述，您的情况属于轻度痤疮（粉刺型）。建议您：\n1. 使用含水杨酸的洁面产品\n2. 避免用手挤压\n3. 选择无油配方护肤品\n4. 保持规律作息\n\n如果2周后无改善，建议就医。", time: "14:33" },
      { role: "user", content: "好的，谢谢！", time: "14:34" },
    ],
  },
  2: {
    id: 2,
    type: "doctor",
    title: "王明华 · 主任医师",
    date: "2026-03-10",
    duration: "20分钟",
    status: "已完成",
    summary: "湿疹复诊，根据恢复情况调整用药方案，病情控制良好。",
    diagnosis: "慢性湿疹（稳定期）",
    symptoms: ["双手背轻度红斑", "轻微瘙痒", "皮肤干燥"],
    prescription: [
      { name: "糠酸莫米松乳膏", dosage: "适量外用", frequency: "每日2次", duration: "2周" },
      { name: "维生素E乳膏", dosage: "适量外用", frequency: "每日3次", duration: "长期" },
      { name: "氯雷他定片", dosage: "10mg", frequency: "每日1次", duration: "1周" },
    ],
    advice: [
      "继续外用药物，症状好转后逐渐减量",
      "加强保湿，选择医用级保湿霜",
      "避免接触刺激性物质",
      "注意手部防护，洗碗时戴手套",
    ],
    followUp: "2周后复诊评估",
    doctor: {
      name: "王明华",
      title: "主任医师",
      avatar: "/images/doctor-1.jpg",
    },
    messages: [
      { role: "doctor", content: "您好，请问用药后感觉怎么样？", time: "10:00" },
      { role: "user", content: "王医生好，用药后好多了，痒的感觉减轻了很多，红斑也消退了不少。", time: "10:01" },
      { role: "doctor", content: "很好，恢复情况不错。现在可以开始减量用药了。糠酸莫米松每天改为1次，继续用2周，然后停用。保湿霜要坚持使用。", time: "10:02" },
      { role: "user", content: "好的，那抗过敏药还需要吃吗？", time: "10:03" },
      { role: "doctor", content: "如果不痒的话可以不吃了。如果偶尔有轻微瘙痒，可以临时吃1片。注意避免接触刺激物，洗碗做家务时记得戴手套。", time: "10:04" },
    ],
  },
  3: {
    id: 3,
    type: "ai",
    title: "皮肤干燥问题",
    date: "2026-03-08",
    duration: "10分钟",
    status: "已完成",
    summary: "用户咨询季节性皮肤干燥问题，AI提供了护理建议。",
    diagnosis: "季节性皮肤干燥",
    symptoms: ["面部紧绷感", "局部脱屑", "上妆不服帖"],
    advice: [
      "使用温和氨基酸洁面，避免皂基产品",
      "爽肤水后趁湿润涂保湿精华",
      "选择含透明质酸、神经酰胺的保湿霜",
      "每周敷2-3次保湿面膜",
      "室内使用加湿器保持湿度",
    ],
    messages: [
      { role: "ai", content: "您好！我是肤康AI助手。请问有什么皮肤问题需要咨询？", time: "09:15" },
      { role: "user", content: "最近皮肤特别干，脸上有点脱皮，上妆也不服帖", time: "09:16" },
      { role: "ai", content: "春季气候干燥，皮肤水分流失较快，是皮肤干燥的高发期。请问您目前使用什么护肤品？洗脸时用的是什么洁面产品？", time: "09:16" },
      { role: "user", content: "我用的是泡沫洁面，然后涂个乳液就结束了", time: "09:17" },
      { role: "ai", content: "建议调整一下护肤步骤：\n1. 换用温和氨基酸洁面\n2. 加入保湿精华\n3. 乳液换成保湿霜\n4. 每周敷2-3次面膜\n\n另外室内可以使用加湿器，保持环境湿度。", time: "09:18" },
    ],
  },
  4: {
    id: 4,
    type: "doctor",
    title: "李素芳 · 副主任医师",
    date: "2026-03-05",
    duration: "25分钟",
    status: "已完成",
    summary: "痤疮初诊，进行详细问诊后开具处方。",
    diagnosis: "中度痤疮（丘疹脓疱型）",
    symptoms: ["面部多发性丘疹", "部分脓疱", "炎症后色素沉着"],
    prescription: [
      { name: "阿达帕林凝胶", dosage: "适量外用", frequency: "每晚1次", duration: "8周" },
      { name: "夫西地酸乳膏", dosage: "适量外用", frequency: "每日2次", duration: "2周" },
      { name: "多西环素胶囊", dosage: "100mg", frequency: "每日1次", duration: "4周" },
    ],
    advice: [
      "阿达帕林需要建立耐受，从少量开始",
      "用药期间严格防晒",
      "不要用手挤压痘痘",
      "饮食清淡，少吃甜食和奶制品",
    ],
    followUp: "4周后复诊评估疗效",
    doctor: {
      name: "李素芳",
      title: "副主任医师",
      avatar: "/images/doctor-2.jpg",
    },
    messages: [
      { role: "doctor", content: "您好，请坐。我看您预约的是痤疮问题，能详细说说情况吗？", time: "15:30" },
      { role: "user", content: "医生好，我脸上痘痘反反复复有两年了，最近又严重了，有些还化脓。", time: "15:31" },
      { role: "doctor", content: "让我看看。您这是中度痤疮，丘疹脓疱型。之前有做过什么治疗吗？", time: "15:32" },
      { role: "user", content: "用过一些祛痘产品，效果不太好", time: "15:33" },
      { role: "doctor", content: "护肤品对中度痤疮效果有限，需要规范用药。我给您开阿达帕林凝胶和抗生素，坚持用8周应该能看到明显改善。", time: "15:35" },
    ],
  },
  5: {
    id: 5,
    type: "ai",
    title: "防晒产品咨询",
    date: "2026-03-01",
    duration: "8分钟",
    status: "已完成",
    summary: "用户咨询防晒产品选择和使用方法，AI提供了详细建议。",
    diagnosis: "防晒知识咨询",
    symptoms: [],
    advice: [
      "日常使用SPF30、PA+++防晒即可",
      "户外活动选择SPF50+、PA++++",
      "面部用量约一元硬币大小",
      "出门前15-30分钟涂抹",
      "每2-3小时补涂一次",
    ],
    messages: [
      { role: "ai", content: "您好！我是肤康AI助手。请问有什么皮肤问题需要咨询？", time: "11:20" },
      { role: "user", content: "想问问防晒霜怎么选，SPF和PA该选多少？", time: "11:21" },
      { role: "ai", content: "防晒霜的选择要看使用场景：\n\n日常通勤：SPF30、PA+++\n户外活动：SPF50+、PA++++\n\n另外要选择广谱防晒，同时防护UVA和UVB。您主要是日常使用还是经常户外活动？", time: "11:22" },
      { role: "user", content: "主要是上班通勤，偶尔周末会出去玩", time: "11:23" },
      { role: "ai", content: "那建议您准备两支：\n1. 日常用轻薄型SPF30\n2. 户外用SPF50+\n\n涂抹时面部要用约1元硬币大小，出门前15分钟涂，每2-3小时补涂。", time: "11:24" },
    ],
  },
}

export default function ConsultationDetailPage({ recordId, onClose }: ConsultationDetailPageProps) {
  const record = mockConsultationDetails[recordId] || mockConsultationDetails[1]
  const [activeTab, setActiveTab] = useState<"summary" | "chat">("summary")

  return (
    <div className="absolute inset-0 z-60 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">问诊详情</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full bg-muted p-2" aria-label="下载">
            <Download className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="rounded-full bg-muted p-2" aria-label="分享">
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border bg-card px-5">
        {[
          { id: "summary", label: "诊断摘要", icon: FileText },
          { id: "chat", label: "对话记录", icon: MessageCircle },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`relative flex items-center gap-1.5 py-3 text-sm font-medium ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "summary" ? (
          <div className="px-5 py-4">
            {/* Record Info */}
            <div className="rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                {record.type === "ai" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                ) : (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={record.doctor?.avatar || "/images/doctor-1.jpg"}
                      alt={record.doctor?.name || "医生"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-foreground">{record.title}</h2>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {record.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {record.duration}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                  {record.status}
                </span>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="h-4 w-1 rounded-full bg-primary" />
                诊断结果
              </h3>
              <p className="mt-2 text-sm font-medium text-primary">{record.diagnosis}</p>
              <p className="mt-2 text-xs text-muted-foreground">{record.summary}</p>
            </div>

            {/* Symptoms */}
            {record.symptoms.length > 0 && (
              <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <div className="h-4 w-1 rounded-full bg-primary" />
                  主要症状
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {record.symptoms.map((symptom, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prescription */}
            {record.prescription && record.prescription.length > 0 && (
              <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Pill className="h-4 w-4 text-primary" />
                  处方用药
                </h3>
                <div className="mt-3 space-y-3">
                  {record.prescription.map((med, idx) => (
                    <div key={idx} className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium text-foreground">{med.name}</p>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>用法：{med.dosage}</span>
                        <span>频次：{med.frequency}</span>
                        <span>疗程：{med.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advice */}
            <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="h-4 w-1 rounded-full bg-primary" />
                医嘱建议
              </h3>
              <ul className="mt-2 space-y-2">
                {record.advice.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Up */}
            {record.followUp && (
              <div className="mt-4 rounded-xl bg-amber-500/10 p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-amber-600">
                  <Calendar className="h-4 w-4" />
                  复诊提醒
                </h3>
                <p className="mt-1 text-xs text-amber-600/80">{record.followUp}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-4">
            <div className="space-y-3">
              {record.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === "ai"
                        ? "bg-primary/10"
                        : msg.role === "doctor"
                        ? "bg-secondary"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <Bot className="h-4 w-4 text-primary" />
                    ) : msg.role === "doctor" ? (
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={record.doctor?.avatar || "/images/doctor-1.jpg"}
                          alt="医生"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-card shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
                    <span
                      className={`mt-1 block text-right text-[10px] ${
                        msg.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
