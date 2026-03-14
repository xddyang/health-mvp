"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Sun,
  Shield,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Droplets,
  Umbrella,
  Glasses,
} from "lucide-react"

interface SunscreenGuidePageProps {
  onClose: () => void
}

const uvIndex = {
  level: 8,
  description: "很强",
  advice: "建议减少户外活动，外出需做好全面防护",
}

const sunscreenTypes = [
  {
    id: 1,
    name: "物理防晒",
    description: "通过反射紫外线起到防护作用",
    pros: ["温和不刺激", "适合敏感肌", "即涂即防护"],
    cons: ["质地较厚重", "可能泛白", "需要卸妆"],
    suitable: "敏感肌、孕妇、儿童",
  },
  {
    id: 2,
    name: "化学防晒",
    description: "通过吸收紫外线转化为热能释放",
    pros: ["质地轻薄", "不泛白", "肤感好"],
    cons: ["需提前涂抹", "部分成分有刺激", "需要定时补涂"],
    suitable: "油性皮肤、追求肤感的人群",
  },
  {
    id: 3,
    name: "物化结合",
    description: "结合两种防晒方式的优点",
    pros: ["防护更全面", "肤感改善", "减少单一缺点"],
    cons: ["价格较高", "成分复杂"],
    suitable: "大多数肤质",
  },
]

const faqs = [
  {
    question: "防晒霜要涂多少量才够？",
    answer: "面部防晒需要约1元硬币大小的用量（约1g），才能达到标注的SPF值。用量不足会大大降低防护效果。",
  },
  {
    question: "SPF和PA分别代表什么？",
    answer: "SPF是防护UVB的指数，数值越高防护时间越长。PA是防护UVA的等级，+号越多防护能力越强。日常选择SPF30+、PA+++即可。",
  },
  {
    question: "阴天需要涂防晒吗？",
    answer: "需要！阴天云层只能阻挡部分紫外线，UVA穿透力很强，即使阴天也能到达地面，造成皮肤老化。",
  },
  {
    question: "防晒霜需要卸妆吗？",
    answer: "物理防晒和防水型防晒霜建议使用卸妆产品清洁。普通化学防晒如果不防水，用洁面产品清洗即可。",
  },
  {
    question: "防晒霜多久补涂一次？",
    answer: "户外活动建议每2小时补涂一次。如果出汗、游泳后需要及时补涂。室内工作可根据情况中午补涂一次。",
  },
  {
    question: "眼周可以涂防晒吗？",
    answer: "可以，但建议选择温和的物理防晒或眼部专用防晒。涂抹时避免进入眼睛，也可以佩戴太阳镜加强防护。",
  },
]

const physicalProtection = [
  { icon: Umbrella, label: "遮阳伞", tip: "选择UPF50+的防晒伞" },
  { icon: Glasses, label: "太阳镜", tip: "选择UV400防护的镜片" },
  { icon: Shield, label: "防晒衣", tip: "选择UPF40+的面料" },
]

export default function SunscreenGuidePage({ onClose }: SunscreenGuidePageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [expandedType, setExpandedType] = useState<number | null>(null)

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">防晒指南</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* UV Index Card */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">今日紫外线指数</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">{uvIndex.level}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
                  {uvIndex.description}
                </span>
              </div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Sun className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 p-3">
            <AlertTriangle className="h-4 w-4 shrink-0 text-white" />
            <p className="text-xs text-white">{uvIndex.advice}</p>
          </div>
        </div>

        <div className="px-5 py-4">
          {/* Sunscreen Types */}
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              防晒霜类型
            </h3>
            <div className="mt-3 space-y-2">
              {sunscreenTypes.map((type) => (
                <div key={type.id} className="rounded-xl bg-card shadow-sm">
                  <button
                    onClick={() => setExpandedType(expandedType === type.id ? null : type.id)}
                    className="flex w-full items-center justify-between p-4"
                  >
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-foreground">{type.name}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        expandedType === type.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedType === type.id && (
                    <div className="border-t border-border px-4 pb-4 pt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-primary">优点</p>
                          <ul className="mt-1 space-y-1">
                            {type.pros.map((pro, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="h-1 w-1 rounded-full bg-primary" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-destructive">缺点</p>
                          <ul className="mt-1 space-y-1">
                            {type.cons.map((con, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span className="h-1 w-1 rounded-full bg-destructive" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-3 rounded-lg bg-muted p-2">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">适合人群：</span>
                          {type.suitable}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Physical Protection */}
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              物理防晒装备
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {physicalProtection.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-xl bg-card p-4 text-center shadow-sm">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-foreground">{item.label}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{item.tip}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Application Tips */}
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              正确涂抹方法
            </h3>
            <div className="mt-3 rounded-xl bg-card p-4 shadow-sm">
              <div className="space-y-3">
                {[
                  { step: 1, title: "取适量", desc: "面部约1元硬币大小" },
                  { step: 2, title: "点涂", desc: "额头、鼻子、两颊、下巴各点一些" },
                  { step: 3, title: "轻拍", desc: "用指腹轻轻拍开，不要来回搓揉" },
                  { step: 4, title: "等待", desc: "出门前15-30分钟涂抹，让防晒成膜" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              常见问题
            </h3>
            <div className="mt-3 space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl bg-card shadow-sm">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-4"
                  >
                    <span className="text-left text-sm text-foreground">{faq.question}</span>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        expandedFaq === idx ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <div className="border-t border-border px-4 pb-4 pt-3">
                      <p className="text-xs leading-relaxed text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
