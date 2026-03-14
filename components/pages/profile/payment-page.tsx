"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CreditCard,
  Plus,
  ChevronRight,
  Check,
  Smartphone,
  Wallet,
  Receipt,
  X,
} from "lucide-react"

interface PaymentPageProps {
  onClose: () => void
}

const paymentMethods = [
  {
    id: 1,
    type: "wechat",
    name: "微信支付",
    icon: Smartphone,
    bound: true,
    account: "已绑定",
    default: true,
  },
  {
    id: 2,
    type: "alipay",
    name: "支付宝",
    icon: Wallet,
    bound: true,
    account: "139****8888",
    default: false,
  },
  {
    id: 3,
    type: "card",
    name: "银行卡",
    icon: CreditCard,
    bound: false,
    account: "",
    default: false,
  },
]

const recentTransactions = [
  {
    id: 1,
    type: "挂号费",
    doctor: "王明华 主任医师",
    amount: -50,
    date: "2026-03-15 14:00",
    status: "待支付",
  },
  {
    id: 2,
    type: "挂号费",
    doctor: "李素芳 副主任医师",
    amount: -38,
    date: "2026-03-10 10:00",
    status: "已支付",
  },
  {
    id: 3,
    type: "VIP会员",
    doctor: "年度会员续费",
    amount: -199,
    date: "2026-03-01 09:30",
    status: "已支付",
  },
  {
    id: 4,
    type: "退款",
    doctor: "取消预约退款",
    amount: 50,
    date: "2026-02-28 16:20",
    status: "已完成",
  },
]

export default function PaymentPage({ onClose }: PaymentPageProps) {
  const [showAddCard, setShowAddCard] = useState(false)
  const [defaultMethod, setDefaultMethod] = useState(1)

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
        <h1 className="text-base font-bold text-foreground">支付管理</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Payment Methods */}
        <div className="mb-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
            <div className="h-4 w-1 rounded-full bg-primary" />
            支付方式
          </h3>
          <div className="rounded-2xl bg-card shadow-sm">
            {paymentMethods.map((method, idx) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => {
                    if (method.bound) {
                      setDefaultMethod(method.id)
                    } else {
                      setShowAddCard(true)
                    }
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3.5 ${
                    idx !== paymentMethods.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {method.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {method.bound ? method.account : "未绑定"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.bound && defaultMethod === method.id && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                        默认
                      </span>
                    )}
                    {method.bound ? (
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          defaultMethod === method.id
                            ? "bg-primary"
                            : "border border-border"
                        }`}
                      >
                        {defaultMethod === method.id && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              交易记录
            </h3>
            <button className="flex items-center gap-0.5 text-xs text-muted-foreground">
              查看全部
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="rounded-2xl bg-card shadow-sm">
            {recentTransactions.map((transaction, idx) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between px-4 py-3.5 ${
                  idx !== recentTransactions.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      transaction.amount > 0
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    <Receipt
                      className={`h-5 w-5 ${
                        transaction.amount > 0
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {transaction.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.doctor}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold ${
                      transaction.amount > 0
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}元
                  </p>
                  <span
                    className={`text-[10px] ${
                      transaction.status === "待支付"
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">
                添加银行卡
              </h3>
              <button onClick={() => setShowAddCard(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  持卡人姓名
                </label>
                <input
                  type="text"
                  placeholder="请输入持卡人姓名"
                  className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  银行卡号
                </label>
                <input
                  type="text"
                  placeholder="请输入银行卡号"
                  className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">
                  预留手机号
                </label>
                <input
                  type="tel"
                  placeholder="请输入预留手机号"
                  className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowAddCard(false)}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              确认添加
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
