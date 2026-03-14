"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  X,
} from "lucide-react"

interface HelpPageProps {
  onClose: () => void
}

const faqCategories = [
  {
    title: "账户问题",
    questions: [
      {
        q: "如何修改手机号？",
        a: "进入「我的」-「个人资料」-「手机号」，点击修改并按提示完成验证即可更换手机号。",
      },
      {
        q: "忘记密码怎么办？",
        a: "在登录页面点击「忘记密码」，通过手机验证码或邮箱验证即可重置密码。",
      },
      {
        q: "如何注销账号？",
        a: "进入「设置」-「账号安全」-「注销账号」，请注意注销后数据将无法恢复。",
      },
    ],
  },
  {
    title: "预约挂号",
    questions: [
      {
        q: "如何预约医生？",
        a: "在「挂号」页面选择科室和医生，选择就诊时间后完成支付即可预约成功。",
      },
      {
        q: "可以取消预约吗？",
        a: "就诊前24小时可以免费取消预约，在「我的」-「预约管理」中操作取消。",
      },
      {
        q: "如何查看预约信息？",
        a: "进入「我的」-「预约管理」可以查看所有预约记录和详细信息。",
      },
    ],
  },
  {
    title: "AI问诊",
    questions: [
      {
        q: "AI问诊准确吗？",
        a: "AI问诊基于专业医学知识库，可提供初步参考建议，但不能替代医生诊断，如有严重症状请及时就医。",
      },
      {
        q: "AI问诊收费吗？",
        a: "AI问诊对所有用户免费开放，VIP会员可享受更多专属服务。",
      },
      {
        q: "如何上传图片给AI分析？",
        a: "在AI问诊对话框中点击「拍照」按钮，可以拍摄或上传皮肤图片进行分析。",
      },
    ],
  },
  {
    title: "支付问题",
    questions: [
      {
        q: "支持哪些支付方式？",
        a: "目前支持微信支付、支付宝、银行卡和医保支付。",
      },
      {
        q: "如何申请退款？",
        a: "取消预约后退款将原路返回，一般1-3个工作日到账。",
      },
      {
        q: "如何开具发票？",
        a: "进入「我的」-「支付管理」-「交易记录」，选择需要开票的订单申请电子发票。",
      },
    ],
  },
]

export default function HelpPage({ onClose }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "账户问题"
  )
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackContent, setFeedbackContent] = useState("")

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">帮助与反馈</h1>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索常见问题"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Quick Actions */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-xs text-foreground">客服电话</span>
          </button>
          <button
            onClick={() => setShowFeedback(true)}
            className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm"
          >
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-xs text-foreground">意见反馈</span>
          </button>
          <button className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-sm">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-xs text-foreground">邮件联系</span>
          </button>
        </div>

        {/* FAQ */}
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
          <FileText className="h-4 w-4 text-primary" />
          常见问题
        </h3>

        <div className="space-y-2">
          {faqCategories.map((category) => (
            <div key={category.title} className="rounded-xl bg-card shadow-sm">
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.title
                      ? null
                      : category.title
                  )
                }
                className="flex w-full items-center justify-between p-4"
              >
                <span className="text-sm font-medium text-foreground">
                  {category.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    expandedCategory === category.title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategory === category.title && (
                <div className="border-t border-border px-4 pb-4">
                  {category.questions.map((item) => (
                    <div key={item.q} className="border-b border-border last:border-0">
                      <button
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === item.q ? null : item.q
                          )
                        }
                        className="flex w-full items-center justify-between py-3"
                      >
                        <span className="text-left text-sm text-foreground">
                          {item.q}
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                            expandedQuestion === item.q ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {expandedQuestion === item.q && (
                        <p className="pb-3 text-xs leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">意见反馈</h3>
              <button onClick={() => setShowFeedback(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  反馈类型
                </label>
                <div className="flex flex-wrap gap-2">
                  {["功能建议", "问题反馈", "投诉建议", "其他"].map((type) => (
                    <button
                      key={type}
                      className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  反馈内容
                </label>
                <textarea
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  placeholder="请详细描述您的问题或建议..."
                  rows={4}
                  className="w-full resize-none rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  联系方式（选填）
                </label>
                <input
                  type="text"
                  placeholder="手机号或邮箱"
                  className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFeedback(false)}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              提交反馈
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
