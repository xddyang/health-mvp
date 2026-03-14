"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Droplets,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface SkincareGuidePageProps {
  onClose: () => void
}

const skinTypes = [
  { id: "dry", label: "干性皮肤", icon: Droplets },
  { id: "oily", label: "油性皮肤", icon: Sun },
  { id: "combination", label: "混合性皮肤", icon: Sparkles },
  { id: "sensitive", label: "敏感性皮肤", icon: Moon },
]

const routines: Record<string, {
  morning: { step: string; product: string; tip: string }[]
  evening: { step: string; product: string; tip: string }[]
  weekly: { step: string; frequency: string; tip: string }[]
  tips: string[]
}> = {
  dry: {
    morning: [
      { step: "洁面", product: "温和氨基酸洁面", tip: "用温水轻柔按摩，避免过度清洁" },
      { step: "爽肤水", product: "保湿型化妆水", tip: "轻拍至吸收，可叠加2-3遍" },
      { step: "精华", product: "透明质酸精华", tip: "趁皮肤湿润时涂抹效果更好" },
      { step: "面霜", product: "滋润型保湿霜", tip: "干燥部位可多涂一层" },
      { step: "防晒", product: "保湿型防晒霜", tip: "取足量均匀涂抹，避免搓揉" },
    ],
    evening: [
      { step: "卸妆", product: "卸妆油/膏", tip: "打圈按摩乳化后再清洗" },
      { step: "洁面", product: "温和洁面乳", tip: "轻柔打圈，时间不超过1分钟" },
      { step: "爽肤水", product: "保湿化妆水", tip: "可用化妆棉湿敷3-5分钟" },
      { step: "精华", product: "修护型精华", tip: "配合按摩促进吸收" },
      { step: "眼霜", product: "滋润型眼霜", tip: "用无名指轻点涂抹" },
      { step: "面霜", product: "修护晚霜", tip: "晚霜可选择更滋润的质地" },
    ],
    weekly: [
      { step: "深层清洁面膜", frequency: "每周1次", tip: "敷后及时保湿" },
      { step: "保湿面膜", frequency: "每周2-3次", tip: "可在爽肤水后使用" },
      { step: "去角质", frequency: "每2周1次", tip: "选择温和的酶类去角质产品" },
    ],
    tips: [
      "避免使用含酒精的护肤品",
      "洗脸水温不宜过高",
      "室内使用加湿器保持湿度",
      "多喝水，注意内补水分",
    ],
  },
  oily: {
    morning: [
      { step: "洁面", product: "控油洁面凝胶", tip: "T区可重点清洁" },
      { step: "爽肤水", product: "收敛型化妆水", tip: "可用化妆棉擦拭" },
      { step: "精华", product: "烟酰胺精华", tip: "控油同时注意保湿" },
      { step: "乳液", product: "清爽型乳液", tip: "油性皮肤也需要保湿" },
      { step: "防晒", product: "清爽型防晒", tip: "选择质地轻薄的产品" },
    ],
    evening: [
      { step: "卸妆", product: "卸妆水/凝胶", tip: "选择清爽型卸妆产品" },
      { step: "洁面", product: "深层清洁洁面", tip: "可配合洁面仪使用" },
      { step: "爽肤水", product: "二次清洁水", tip: "帮助清理残余污垢" },
      { step: "精华", product: "水杨酸精华", tip: "从低浓度开始，逐渐建立耐受" },
      { step: "乳液/凝露", product: "控油保湿凝露", tip: "质地要清爽不黏腻" },
    ],
    weekly: [
      { step: "清洁面膜", frequency: "每周1-2次", tip: "T区可重点护理" },
      { step: "补水面膜", frequency: "每周2次", tip: "油皮也需要补水" },
      { step: "去角质", frequency: "每周1次", tip: "避免过度去角质" },
    ],
    tips: [
      "不要因为出油就频繁洗脸",
      "选择标注无油配方的产品",
      "控油的同时注意保湿平衡",
      "饮食清淡，少吃辛辣油腻",
    ],
  },
  combination: {
    morning: [
      { step: "洁面", product: "温和泡沫洁面", tip: "T区和两颊可分开清洁" },
      { step: "爽肤水", product: "平衡型化妆水", tip: "T区控油，两颊保湿" },
      { step: "精华", product: "多效修护精华", tip: "不同部位可用不同产品" },
      { step: "乳液/面霜", product: "分区护理", tip: "T区乳液，两颊面霜" },
      { step: "防晒", product: "轻薄型防晒", tip: "全脸均匀涂抹" },
    ],
    evening: [
      { step: "卸妆", product: "卸妆乳", tip: "全脸温和卸妆" },
      { step: "洁面", product: "氨基酸洁面", tip: "根据当天皮肤状态调整" },
      { step: "爽肤水", product: "保湿化妆水", tip: "两颊可多拍几遍" },
      { step: "精华", product: "修护型精华", tip: "针对性解决问题" },
      { step: "眼霜", product: "清爽型眼霜", tip: "眼周皮肤较薄，轻柔涂抹" },
      { step: "乳液/面霜", product: "分区使用", tip: "根据部位选择产品" },
    ],
    weekly: [
      { step: "清洁面膜", frequency: "T区每周1次", tip: "重点清洁T区" },
      { step: "保湿面膜", frequency: "全脸每周2次", tip: "两颊重点保湿" },
      { step: "去角质", frequency: "每周1次", tip: "分区温和去角质" },
    ],
    tips: [
      "学会分区护理是关键",
      "T区和两颊可以用不同产品",
      "根据季节调整护肤品",
      "保持护肤步骤的一致性",
    ],
  },
  sensitive: {
    morning: [
      { step: "洁面", product: "无泡沫洁面", tip: "选择不含皂基的产品" },
      { step: "爽肤水", product: "舒缓型喷雾", tip: "避免含酒精的产品" },
      { step: "精华", product: "修护精华", tip: "选择成分简单的产品" },
      { step: "面霜", product: "舒缓保湿霜", tip: "建立健康的皮肤屏障" },
      { step: "防晒", product: "物理防晒霜", tip: "选择温和不刺激的配方" },
    ],
    evening: [
      { step: "卸妆", product: "温和卸妆乳", tip: "避免卸妆水摩擦皮肤" },
      { step: "洁面", product: "温和洁面", tip: "用手轻柔清洗" },
      { step: "爽肤水", product: "修护化妆水", tip: "选择无香精产品" },
      { step: "精华", product: "神经酰胺精华", tip: "修护皮肤屏障" },
      { step: "面霜", product: "修护霜", tip: "加强屏障修护" },
    ],
    weekly: [
      { step: "舒缓面膜", frequency: "每周1-2次", tip: "选择无刺激配方" },
      { step: "去角质", frequency: "不建议", tip: "敏感肌避免去角质" },
    ],
    tips: [
      "精简护肤步骤，少即是多",
      "新产品先在耳后测试",
      "避免频繁更换护肤品",
      "选择无香精、无酒精的产品",
      "出现过敏及时就医",
    ],
  },
}

export default function SkincareGuidePage({ onClose }: SkincareGuidePageProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"morning" | "evening" | "weekly">("morning")

  if (!selectedType) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col bg-background">
        <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
          <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">护肤方案</h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-foreground">选择您的肤质</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              我们将为您推荐专属的护肤方案
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {skinTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 shadow-sm transition-all active:scale-[0.98]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{type.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-xl bg-primary/10 p-4">
            <p className="text-center text-sm text-primary">
              不确定自己的肤质？可以先进行皮肤自测
            </p>
          </div>
        </div>
      </div>
    )
  }

  const routine = routines[selectedType]
  const currentRoutine = activeTab === "morning" ? routine.morning : activeTab === "evening" ? routine.evening : routine.weekly

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button onClick={() => setSelectedType(null)} className="rounded-full bg-muted p-2" aria-label="返回">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">
          {skinTypes.find((t) => t.id === selectedType)?.label}护肤方案
        </h1>
      </div>

      <div className="flex gap-2 border-b border-border bg-card px-5 py-3">
        {[
          { id: "morning", label: "早间护肤", icon: Sun },
          { id: "evening", label: "晚间护肤", icon: Moon },
          { id: "weekly", label: "周护理", icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="space-y-3">
          {currentRoutine.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground">{item.step}</h3>
                  <p className="mt-0.5 text-xs text-primary">
                    {"product" in item ? item.product : item.frequency}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{item.tip}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-card p-4 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            护肤小贴士
          </h3>
          <ul className="mt-3 space-y-2">
            {routine.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
