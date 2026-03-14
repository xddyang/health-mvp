"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Share2,
  Star,
  MapPin,
  Clock,
  Award,
  GraduationCap,
  Users,
  MessageCircle,
  CalendarDays,
  ChevronRight,
  Heart,
} from "lucide-react"

interface DoctorDetailPageProps {
  doctorId: number
  onClose: () => void
  onBookAppointment: (doctorId: number) => void
}

// Mock doctor data
const doctorsData: Record<number, {
  id: number
  name: string
  title: string
  department: string
  hospital: string
  avatar: string
  rating: number
  patients: string
  specialty: string[]
  available: boolean
  nextSlot: string
  price: number
  introduction: string
  education: string[]
  experience: string[]
  reviews: { id: number; user: string; rating: number; content: string; date: string }[]
}> = {
  1: {
    id: 1,
    name: "王明华",
    title: "主任医师",
    department: "皮肤科",
    hospital: "北京协和医院",
    avatar: "/images/doctor-1.jpg",
    rating: 4.9,
    patients: "3200+",
    specialty: ["湿疹", "银屑病", "皮炎", "荨麻疹"],
    available: true,
    nextSlot: "今天 14:00",
    price: 50,
    introduction: "王明华医生从事皮肤科临床工作20余年，擅长各类皮肤病的诊断与治疗，尤其在湿疹、银屑病、皮炎等慢性皮肤病的治疗方面有丰富经验。对患者认真负责，深受好评。",
    education: [
      "北京大学医学部 博士",
      "北京协和医学院 硕士",
      "首都医科大学 学士",
    ],
    experience: [
      "北京协和医院皮肤科 主任医师（2015-至今）",
      "北京协和医院皮肤科 副主任医师（2010-2015）",
      "北京协和医院皮肤科 主治医师（2005-2010）",
    ],
    reviews: [
      { id: 1, user: "李**", rating: 5, content: "王医生非常专业，态度也很好，我的湿疹在他的治疗下好了很多。", date: "2026-03-10" },
      { id: 2, user: "张**", rating: 5, content: "看诊很仔细，解释得很清楚，推荐！", date: "2026-03-08" },
      { id: 3, user: "王**", rating: 4, content: "医术精湛，就是挂号有点难。", date: "2026-03-05" },
    ],
  },
  2: {
    id: 2,
    name: "李素芳",
    title: "副主任医师",
    department: "皮肤科",
    hospital: "上海华山医院",
    avatar: "/images/doctor-2.jpg",
    rating: 4.8,
    patients: "2800+",
    specialty: ["痤疮", "色素性皮肤病", "敏感肌", "医美"],
    available: true,
    nextSlot: "今天 16:30",
    price: 38,
    introduction: "李素芳医生专注于痤疮、色素性皮肤病的诊治，在医学美容方面有深入研究。对待患者耐心细致，善于根据个人情况制定个性化治疗方案。",
    education: [
      "复旦大学医学院 博士",
      "上海交通大学医学院 硕士",
    ],
    experience: [
      "上海华山医院皮肤科 副主任医师（2018-至今）",
      "上海华山医院皮肤科 主治医师（2012-2018）",
    ],
    reviews: [
      { id: 1, user: "陈**", rating: 5, content: "李医生的治疗方案很有效，我的痘痘终于好了！", date: "2026-03-09" },
      { id: 2, user: "刘**", rating: 5, content: "很温柔的医生，解答问题很详细。", date: "2026-03-06" },
    ],
  },
  3: {
    id: 3,
    name: "张建国",
    title: "主任医师",
    department: "皮肤科",
    hospital: "广州南方医院",
    avatar: "/images/doctor-3.jpg",
    rating: 4.7,
    patients: "4100+",
    specialty: ["皮肤肿瘤", "免疫性皮肤病", "疑难杂症"],
    available: false,
    nextSlot: "明天 09:00",
    price: 60,
    introduction: "张建国医生是皮肤肿瘤和免疫性皮肤病领域的专家，多年来一直致力于皮肤病的临床和科研工作，发表论文50余篇。对疑难杂症有丰富的诊治经验。",
    education: [
      "中山大学医学院 博士",
      "暨南大学医学院 硕士",
    ],
    experience: [
      "广州南方医院皮肤科 主任医师（2012-至今）",
      "广州南方医院皮肤科 副主任医师（2006-2012）",
      "广州南方医院皮肤科 主治医师（2000-2006）",
    ],
    reviews: [
      { id: 1, user: "黄**", rating: 5, content: "医术高超，疑难杂症都能解决。", date: "2026-03-07" },
      { id: 2, user: "周**", rating: 4, content: "等候时间长，但看诊质量很高。", date: "2026-03-03" },
    ],
  },
}

export default function DoctorDetailPage({
  doctorId,
  onClose,
  onBookAppointment,
}: DoctorDetailPageProps) {
  const doctor = doctorsData[doctorId] || doctorsData[1]
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<"intro" | "reviews">("intro")

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card px-4 pb-3 pt-12 shadow-sm">
        <button
          onClick={onClose}
          className="rounded-full bg-muted p-2"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">医生主页</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="rounded-full bg-muted p-2"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-destructive text-destructive" : "text-foreground"
              }`}
            />
          </button>
          <button className="rounded-full bg-muted p-2">
            <Share2 className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Doctor Info Card */}
        <div className="bg-card px-5 py-4">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={doctor.avatar}
                alt={doctor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">
                  {doctor.name}
                </h2>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {doctor.title}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {doctor.hospital} · {doctor.department}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-bold text-foreground">
                    {doctor.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {doctor.patients} 患者好评
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {doctor.specialty.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <Award className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">从业</p>
              <p className="text-sm font-bold text-foreground">20年</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <Users className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">服务患者</p>
              <p className="text-sm font-bold text-foreground">{doctor.patients}</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <MessageCircle className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs text-muted-foreground">好评率</p>
              <p className="text-sm font-bold text-foreground">98%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-2 flex gap-6 border-b border-border bg-card px-5">
          <button
            onClick={() => setActiveTab("intro")}
            className={`relative py-3 text-sm font-medium ${
              activeTab === "intro" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            医生简介
            {activeTab === "intro" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`relative py-3 text-sm font-medium ${
              activeTab === "reviews" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            患者评价 ({doctor.reviews.length})
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "intro" ? (
          <div className="p-5">
            {/* Introduction */}
            <div className="rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="h-4 w-1 rounded-full bg-primary" />
                个人简介
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {doctor.introduction}
              </p>
            </div>

            {/* Education */}
            <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                教育背景
              </h3>
              <ul className="mt-3 space-y-2">
                {doctor.education.map((edu, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Award className="h-4 w-4 text-primary" />
                工作经历
              </h3>
              <ul className="mt-3 space-y-2">
                {doctor.experience.map((exp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-5">
            {doctor.reviews.map((review) => (
              <div
                key={review.id}
                className="mb-3 rounded-xl bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    {review.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 border-t border-border bg-card px-5 py-3 pb-6">
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span
              className={doctor.available ? "text-primary" : "text-muted-foreground"}
            >
              {doctor.nextSlot} 可预约
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {doctor.hospital}
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary">¥{doctor.price}</span>
          <span className="text-xs text-muted-foreground">/次</span>
        </div>
        <button
          onClick={() => onBookAppointment(doctor.id)}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          立即预约
        </button>
      </div>
    </div>
  )
}
