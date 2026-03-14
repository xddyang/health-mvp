"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  QrCode,
  Star,
  X,
} from "lucide-react"

interface AppointmentDetailPageProps {
  appointmentId: number
  onClose: () => void
  onCancelAppointment?: () => void
}

const mockAppointmentDetails: Record<number, {
  id: number
  doctor: {
    name: string
    title: string
    department: string
    hospital: string
    avatar: string
    phone: string
  }
  date: string
  time: string
  status: "pending" | "completed" | "cancelled"
  price: number
  location: {
    address: string
    building: string
    floor: string
    room: string
  }
  orderNo: string
  createTime: string
  payMethod: string
  notes: string[]
}> = {
  1: {
    id: 1,
    doctor: {
      name: "王明华",
      title: "主任医师",
      department: "皮肤科",
      hospital: "北京协和医院",
      avatar: "/images/doctor-1.jpg",
      phone: "010-69156789",
    },
    date: "2026-03-15",
    time: "14:00",
    status: "pending",
    price: 50,
    location: {
      address: "北京市东城区帅府园一号",
      building: "门诊楼",
      floor: "3层",
      room: "皮肤科312室",
    },
    orderNo: "AP2026031512345678",
    createTime: "2026-03-12 10:30:45",
    payMethod: "微信支付",
    notes: [
      "请于就诊当日提前15分钟到达",
      "携带身份证和医保卡",
      "如需取消请提前24小时操作",
      "就诊前请保持皮肤清洁，不要化妆",
    ],
  },
  2: {
    id: 2,
    doctor: {
      name: "李素芳",
      title: "副主任医师",
      department: "皮肤科",
      hospital: "上海华山医院",
      avatar: "/images/doctor-2.jpg",
      phone: "021-52889999",
    },
    date: "2026-03-10",
    time: "10:00",
    status: "completed",
    price: 38,
    location: {
      address: "上海市静安区乌鲁木齐中路12号",
      building: "门诊楼",
      floor: "2层",
      room: "皮肤科208室",
    },
    orderNo: "AP2026030812345679",
    createTime: "2026-03-05 14:20:30",
    payMethod: "支付宝",
    notes: [],
  },
  3: {
    id: 3,
    doctor: {
      name: "张建国",
      title: "主任医师",
      department: "皮肤科",
      hospital: "广州南方医院",
      avatar: "/images/doctor-3.jpg",
      phone: "020-61641888",
    },
    date: "2026-03-05",
    time: "09:00",
    status: "completed",
    price: 60,
    location: {
      address: "广州市白云区广州大道北1838号",
      building: "门诊楼",
      floor: "4层",
      room: "皮肤科401室",
    },
    orderNo: "AP2026030212345680",
    createTime: "2026-03-01 09:15:00",
    payMethod: "医保支付",
    notes: [],
  },
  4: {
    id: 4,
    doctor: {
      name: "王明华",
      title: "主任医师",
      department: "皮肤科",
      hospital: "北京协和医院",
      avatar: "/images/doctor-1.jpg",
      phone: "010-69156789",
    },
    date: "2026-02-28",
    time: "15:30",
    status: "cancelled",
    price: 50,
    location: {
      address: "北京市东城区帅府园一号",
      building: "门诊楼",
      floor: "3层",
      room: "皮肤科312室",
    },
    orderNo: "AP2026022512345681",
    createTime: "2026-02-25 11:00:00",
    payMethod: "微信支付",
    notes: [],
  },
}

const statusConfig = {
  pending: { label: "待就诊", color: "bg-primary/10 text-primary", icon: Clock },
  completed: { label: "已完成", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "已取消", color: "bg-destructive/10 text-destructive", icon: X },
}

export default function AppointmentDetailPage({
  appointmentId,
  onClose,
  onCancelAppointment,
}: AppointmentDetailPageProps) {
  const appointment = mockAppointmentDetails[appointmentId] || mockAppointmentDetails[1]
  const [copied, setCopied] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [reviewContent, setReviewContent] = useState("")

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const StatusIcon = statusConfig[appointment.status].icon

  return (
    <div className="absolute inset-0 z-60 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button onClick={onClose} className="rounded-full bg-muted p-2" aria-label="返回">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">预约详情</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Status Banner */}
        <div className={`px-5 py-4 ${
          appointment.status === "pending" ? "bg-primary" : 
          appointment.status === "completed" ? "bg-muted" : "bg-destructive/10"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
              appointment.status === "pending" ? "bg-primary-foreground/20" : "bg-card"
            }`}>
              <StatusIcon className={`h-6 w-6 ${
                appointment.status === "pending" ? "text-primary-foreground" : 
                appointment.status === "completed" ? "text-muted-foreground" : "text-destructive"
              }`} />
            </div>
            <div>
              <span className={`text-lg font-bold ${
                appointment.status === "pending" ? "text-primary-foreground" : 
                appointment.status === "completed" ? "text-foreground" : "text-destructive"
              }`}>
                {statusConfig[appointment.status].label}
              </span>
              {appointment.status === "pending" && (
                <p className="mt-0.5 text-xs text-primary-foreground/80">
                  请于 {appointment.date} {appointment.time} 准时就诊
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          {/* Doctor Info */}
          <div className="rounded-xl bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={appointment.doctor.avatar}
                  alt={appointment.doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {appointment.doctor.name}
                  </span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                    {appointment.doctor.title}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {appointment.doctor.department}
                </p>
                <p className="text-xs text-muted-foreground">
                  {appointment.doctor.hospital}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Info */}
          <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              预约信息
            </h3>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {appointment.date} {appointment.time}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">{appointment.doctor.hospital}</p>
                  <p className="text-xs text-muted-foreground">
                    {appointment.location.building} {appointment.location.floor} {appointment.location.room}
                  </p>
                  <p className="text-xs text-muted-foreground">{appointment.location.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{appointment.doctor.phone}</span>
              </div>
            </div>
            {appointment.status === "pending" && (
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 py-2 text-sm font-medium text-primary">
                <Navigation className="h-4 w-4" />
                导航到医院
              </button>
            )}
          </div>

          {/* QR Code for pending */}
          {appointment.status === "pending" && (
            <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <QrCode className="h-4 w-4 text-primary" />
                就诊二维码
              </h3>
              <div className="mt-3 flex flex-col items-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-xl bg-muted">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">到院后出示此二维码签到</p>
              </div>
            </div>
          )}

          {/* Order Info */}
          <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <div className="h-4 w-1 rounded-full bg-primary" />
              订单信息
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">订单编号</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground">{appointment.orderNo}</span>
                  <button onClick={() => handleCopy(appointment.orderNo)}>
                    {copied ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">创建时间</span>
                <span className="text-xs text-foreground">{appointment.createTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">支付方式</span>
                <span className="text-xs text-foreground">{appointment.payMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">挂号费用</span>
                <span className="text-sm font-bold text-primary">¥{appointment.price}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes.length > 0 && (
            <div className="mt-4 rounded-xl bg-amber-500/10 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                温馨提示
              </h3>
              <ul className="mt-2 space-y-1.5">
                {appointment.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-amber-600/80">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-600" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      {appointment.status === "pending" && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-border bg-card px-5 py-3 pb-6">
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground"
          >
            取消预约
          </button>
          <button className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground">
            修改预约
          </button>
        </div>
      )}

      {appointment.status === "completed" && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-3 border-t border-border bg-card px-5 py-3 pb-6">
          <button className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground">
            查看病历
          </button>
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
          >
            评价医生
          </button>
        </div>
      )}

      {/* Cancel Confirmation */}
      {showCancelConfirm && (
        <div className="absolute inset-0 z-70 flex items-center justify-center bg-foreground/50 px-8">
          <div className="w-full max-w-sm rounded-2xl bg-card p-5">
            <h3 className="text-center text-base font-bold text-foreground">确认取消</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要取消此预约吗？取消后可能需要重新排队预约。
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
              >
                再想想
              </button>
              <button
                onClick={() => {
                  setShowCancelConfirm(false)
                  onCancelAppointment?.()
                  onClose()
                }}
                className="flex-1 rounded-xl bg-destructive py-2.5 text-sm font-medium text-card"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="absolute inset-0 z-70 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">评价医生</h3>
              <button onClick={() => setShowReviewModal(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating ? "fill-primary text-primary" : "text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {rating === 5 ? "非常满意" : rating === 4 ? "满意" : rating === 3 ? "一般" : rating === 2 ? "不满意" : "非常不满意"}
            </p>

            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="分享您的就诊体验..."
              rows={4}
              className="mt-4 w-full resize-none rounded-xl bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />

            <button
              onClick={() => setShowReviewModal(false)}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              提交评价
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
