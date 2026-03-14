"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Star,
  Calendar,
  Edit3,
  Trash2,
} from "lucide-react"

interface MyReviewsPageProps {
  onClose: () => void
}

const mockReviews = [
  {
    id: 1,
    doctor: {
      name: "王明华",
      title: "主任医师",
      avatar: "/images/doctor-1.jpg",
    },
    rating: 5,
    content: "王医生非常专业耐心，详细解答了我的问题，用药后湿疹明显好转了。非常感谢！",
    date: "2026-03-10",
    appointmentDate: "2026-03-08",
  },
  {
    id: 2,
    doctor: {
      name: "李素芳",
      title: "副主任医师",
      avatar: "/images/doctor-2.jpg",
    },
    rating: 5,
    content: "李医生态度很好，给出了很实用的护肤建议，痘痘情况改善了很多。",
    date: "2026-03-05",
    appointmentDate: "2026-03-03",
  },
  {
    id: 3,
    doctor: {
      name: "张建国",
      title: "主任医师",
      avatar: "/images/doctor-3.jpg",
    },
    rating: 4,
    content: "医术精湛，诊断准确。就是等候时间稍长，但看诊质量很高。",
    date: "2026-02-28",
    appointmentDate: "2026-02-26",
  },
]

export default function MyReviewsPage({ onClose }: MyReviewsPageProps) {
  const [reviews, setReviews] = useState(mockReviews)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-4 pb-4 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-bold text-foreground">我的评价</h1>
        </div>
        <span className="text-xs text-muted-foreground">
          共 {reviews.length} 条
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">暂无评价记录</p>
            <p className="mt-1 text-xs text-muted-foreground">
              就诊后可以对医生进行评价
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl bg-card p-4 shadow-sm"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={review.doctor.avatar}
                      alt={review.doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {review.doctor.name}
                      </span>
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                        {review.doctor.title}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      就诊日期: {review.appointmentDate}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                {/* Content */}
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {review.content}
                </p>

                {/* Actions */}
                <div className="mt-3 flex justify-end gap-2 border-t border-border pt-3">
                  <button className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs text-foreground">
                    <Edit3 className="h-3 w-3" />
                    编辑
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(review.id)}
                    className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5 text-xs text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    删除
                  </button>
                </div>
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
              删除评价
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要删除这条评价吗？删除后将无法恢复。
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
