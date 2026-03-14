"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

interface BookingPageProps {
  doctorId: number
  onClose: () => void
  onSuccess: () => void
}

// Mock doctor data for booking
const doctorsData: Record<number, {
  id: number
  name: string
  title: string
  hospital: string
  avatar: string
  price: number
  department: string
}> = {
  1: {
    id: 1,
    name: "王明华",
    title: "主任医师",
    hospital: "北京协和医院",
    avatar: "/images/doctor-1.jpg",
    price: 50,
    department: "皮肤科",
  },
  2: {
    id: 2,
    name: "李素芳",
    title: "副主任医师",
    hospital: "上海华山医院",
    avatar: "/images/doctor-2.jpg",
    price: 38,
    department: "皮肤科",
  },
  3: {
    id: 3,
    name: "张建国",
    title: "主任医师",
    hospital: "广州南方医院",
    avatar: "/images/doctor-3.jpg",
    price: 60,
    department: "皮肤科",
  },
}

// Generate available dates
const generateDates = () => {
  const dates = []
  const today = new Date()
  const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      date: date,
      label: i === 0 ? "今天" : i === 1 ? "明天" : weekDays[date.getDay()],
      day: date.getDate(),
      month: date.getMonth() + 1,
      available: i !== 2 && i !== 5, // Some dates unavailable
    })
  }
  return dates
}

const timeSlots = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: false },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: false },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
]

export default function BookingPage({
  doctorId,
  onClose,
  onSuccess,
}: BookingPageProps) {
  const doctor = doctorsData[doctorId] || doctorsData[1]
  const dates = generateDates()
  const [selectedDate, setSelectedDate] = useState(dates[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!selectedTime) return
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-6 text-xl font-bold text-foreground">预约成功</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          您已成功预约 {doctor.name} 医生
        </p>
        <div className="mt-4 w-full rounded-xl bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm text-muted-foreground">就诊医生</span>
            <span className="text-sm font-medium text-foreground">{doctor.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border py-3">
            <span className="text-sm text-muted-foreground">就诊时间</span>
            <span className="text-sm font-medium text-foreground">
              {selectedDate.month}月{selectedDate.day}日 {selectedTime}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-border py-3">
            <span className="text-sm text-muted-foreground">就诊医院</span>
            <span className="text-sm font-medium text-foreground">{doctor.hospital}</span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="text-sm text-muted-foreground">挂号费用</span>
            <span className="text-sm font-bold text-primary">¥{doctor.price}</span>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary/10 p-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs text-primary">
            请于就诊当日提前15分钟到达医院，携带身份证和医保卡
          </p>
        </div>
        <button
          onClick={onSuccess}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
        >
          完成
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl bg-muted py-3 text-sm font-medium text-foreground"
        >
          返回首页
        </button>
      </div>
    )
  }

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
        <h1 className="text-base font-bold text-foreground">预约挂号</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Doctor Info */}
        <div className="mx-5 mt-4 flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={doctor.avatar}
              alt={doctor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                {doctor.name}
              </span>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                {doctor.title}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {doctor.hospital} · {doctor.department}
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">¥{doctor.price}</span>
            <p className="text-[10px] text-muted-foreground">挂号费</p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-4 px-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            选择日期
          </h3>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dates.map((date) => (
              <button
                key={date.day}
                onClick={() => date.available && setSelectedDate(date)}
                disabled={!date.available}
                className={`flex shrink-0 flex-col items-center rounded-xl px-4 py-3 transition-colors ${
                  selectedDate.day === date.day && date.available
                    ? "bg-primary text-primary-foreground"
                    : date.available
                    ? "bg-card text-foreground shadow-sm"
                    : "bg-muted text-muted-foreground opacity-50"
                }`}
              >
                <span className="text-xs">{date.label}</span>
                <span className="mt-1 text-lg font-bold">{date.day}</span>
                <span className="text-[10px]">{date.month}月</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mt-4 px-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            选择时间
          </h3>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`rounded-xl py-2.5 text-sm transition-colors ${
                  selectedTime === slot.time && slot.available
                    ? "bg-primary text-primary-foreground"
                    : slot.available
                    ? "bg-card text-foreground shadow-sm"
                    : "bg-muted text-muted-foreground line-through opacity-50"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 px-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            就诊地点
          </h3>
          <div className="mt-3 rounded-xl bg-card p-4 shadow-sm">
            <p className="text-sm font-medium text-foreground">{doctor.hospital}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              门诊楼3层 皮肤科诊室
            </p>
            <button className="mt-2 text-xs text-primary">
              查看地图导航 →
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4 px-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <CreditCard className="h-4 w-4 text-primary" />
            支付方式
          </h3>
          <div className="mt-3 space-y-2">
            {[
              { label: "微信支付", checked: true },
              { label: "支付宝", checked: false },
              { label: "医保支付", checked: false },
            ].map((method) => (
              <label
                key={method.label}
                className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm"
              >
                <input
                  type="radio"
                  name="payment"
                  defaultChecked={method.checked}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm text-foreground">{method.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border bg-card px-5 py-3 pb-6">
        <div>
          <p className="text-xs text-muted-foreground">应付金额</p>
          <p className="text-xl font-bold text-primary">¥{doctor.price}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedTime || isSubmitting}
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isSubmitting ? "提交中..." : "确认预约"}
        </button>
      </div>
    </div>
  )
}
