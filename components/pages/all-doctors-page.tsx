"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  MapPin,
  X,
} from "lucide-react"

interface AllDoctorsPageProps {
  onClose: () => void
  onDoctorClick: (doctorId: number) => void
  onBookAppointment: (doctorId: number) => void
}

const allDoctors = [
  {
    id: 1,
    name: "王明华",
    title: "主任医师",
    department: "皮肤科",
    hospital: "北京协和医院",
    avatar: "/images/doctor-1.jpg",
    rating: 4.9,
    patients: "3200+",
    specialty: "湿疹、银屑病、皮炎",
    available: true,
    nextSlot: "今天 14:00",
    price: 50,
  },
  {
    id: 2,
    name: "李素芳",
    title: "副主任医师",
    department: "皮肤科",
    hospital: "上海华山医院",
    avatar: "/images/doctor-2.jpg",
    rating: 4.8,
    patients: "2800+",
    specialty: "痤疮、色素性皮肤病",
    available: true,
    nextSlot: "今天 16:30",
    price: 38,
  },
  {
    id: 3,
    name: "张建国",
    title: "主任医师",
    department: "皮肤科",
    hospital: "广州南方医院",
    avatar: "/images/doctor-3.jpg",
    rating: 4.7,
    patients: "4100+",
    specialty: "皮肤肿瘤、免疫性皮肤病",
    available: false,
    nextSlot: "明天 09:00",
    price: 60,
  },
  {
    id: 4,
    name: "陈丽华",
    title: "副主任医师",
    department: "激光美容",
    hospital: "北京协和医院",
    avatar: "/images/doctor-1.jpg",
    rating: 4.8,
    patients: "1800+",
    specialty: "激光祛斑、医美抗衰",
    available: true,
    nextSlot: "今天 15:00",
    price: 45,
  },
  {
    id: 5,
    name: "刘伟民",
    title: "主任医师",
    department: "中医皮肤",
    hospital: "北京中医医院",
    avatar: "/images/doctor-3.jpg",
    rating: 4.9,
    patients: "5200+",
    specialty: "中医调理、慢性皮肤病",
    available: true,
    nextSlot: "明天 10:00",
    price: 55,
  },
  {
    id: 6,
    name: "赵敏",
    title: "主治医师",
    department: "过敏免疫",
    hospital: "上海瑞金医院",
    avatar: "/images/doctor-2.jpg",
    rating: 4.6,
    patients: "1500+",
    specialty: "过敏性皮炎、荨麻疹",
    available: true,
    nextSlot: "今天 11:00",
    price: 30,
  },
]

const departments = ["全部", "皮肤科", "激光美容", "中医皮肤", "过敏免疫", "皮肤外科"]
const sortOptions = ["综合排序", "好评优先", "价格最低", "最近可约"]

export default function AllDoctorsPage({
  onClose,
  onDoctorClick,
  onBookAppointment,
}: AllDoctorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [selectedDept, setSelectedDept] = useState("全部")
  const [selectedSort, setSelectedSort] = useState("综合排序")

  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.includes(searchQuery) ||
      doctor.specialty.includes(searchQuery) ||
      doctor.hospital.includes(searchQuery)
    const matchesDept =
      selectedDept === "全部" || doctor.department === selectedDept
    return matchesSearch && matchesDept
  })

  // Sort doctors based on selection
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (selectedSort) {
      case "好评优先":
        return b.rating - a.rating
      case "价格最低":
        return a.price - b.price
      case "最近可约":
        return a.available === b.available ? 0 : a.available ? -1 : 1
      default:
        return 0
    }
  })

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card px-4 pb-3 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full bg-muted p-2"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索医生、科室、医院"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="rounded-xl bg-muted p-2"
          >
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Department Tabs */}
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                selectedDept === dept
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-xs text-muted-foreground">
          共 {sortedDoctors.length} 位医生
        </span>
        <button
          onClick={() => setShowFilter(true)}
          className="text-xs text-primary"
        >
          {selectedSort}
        </button>
      </div>

      {/* Doctor List */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="flex flex-col gap-3">
          {sortedDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
            >
              <button
                onClick={() => onDoctorClick(doctor.id)}
                className="flex w-full gap-3 text-left"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={doctor.avatar}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      {doctor.name}
                    </h3>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {doctor.title}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {doctor.hospital} · {doctor.department}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        {doctor.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {doctor.patients} 患者好评
                    </span>
                  </div>
                </div>
              </button>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                  {doctor.specialty}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span
                    className={`text-xs font-medium ${
                      doctor.available ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {doctor.nextSlot}
                  </span>
                  <MapPin className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {doctor.hospital.slice(0, 4)}
                  </span>
                </div>
                <button
                  onClick={() => onBookAppointment(doctor.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    doctor.available
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {doctor.available ? `¥${doctor.price} 预约` : "预约"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">筛选条件</h3>
              <button onClick={() => setShowFilter(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">科室</p>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`rounded-full px-4 py-1.5 text-xs ${
                        selectedDept === dept
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">排序</p>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSelectedSort(sort)}
                      className={`rounded-full px-4 py-1.5 text-xs ${
                        selectedSort === sort
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  价格区间
                </p>
                <div className="flex flex-wrap gap-2">
                  {["不限", "30元以下", "30-50元", "50-100元", "100元以上"].map(
                    (price) => (
                      <button
                        key={price}
                        className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                      >
                        {price}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  医生职称
                </p>
                <div className="flex flex-wrap gap-2">
                  {["不限", "主任医师", "副主任医师", "主治医师"].map(
                    (title) => (
                      <button
                        key={title}
                        className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                      >
                        {title}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSelectedDept("全部")
                  setSelectedSort("综合排序")
                }}
                className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground"
              >
                重置
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
