"use client"

import { useState } from "react"
import Image from "next/image"
import {
  CalendarDays,
  MapPin,
  Star,
  ChevronRight,
  Clock,
  Filter,
  Search,
  X,
} from "lucide-react"
import DoctorDetailPage from "./doctor-detail-page"
import BookingPage from "./booking-page"
import AllDoctorsPage from "./all-doctors-page"

const departments = [
  { label: "皮肤科", active: true },
  { label: "激光美容", active: false },
  { label: "中医皮肤", active: false },
  { label: "过敏免疫", active: false },
  { label: "皮肤外科", active: false },
]

const doctors = [
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
]

export default function AppointmentPage() {
  const [activeDept, setActiveDept] = useState("皮肤科")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [showDoctorDetail, setShowDoctorDetail] = useState<number | null>(null)
  const [showBooking, setShowBooking] = useState<number | null>(null)
  const [showAllDoctors, setShowAllDoctors] = useState(false)
  const [selectedSort, setSelectedSort] = useState("综合排序")

  const filteredDoctors = doctors.filter(
    (d) =>
      activeDept === "全部" ||
      d.department === activeDept ||
      d.name.includes(searchQuery) ||
      d.specialty.includes(searchQuery)
  )

  return (
    <div className="relative min-h-full bg-background pb-4">
      {/* Doctor Detail Page */}
      {showDoctorDetail !== null && (
        <DoctorDetailPage
          doctorId={showDoctorDetail}
          onClose={() => setShowDoctorDetail(null)}
          onBookAppointment={(id) => {
            setShowDoctorDetail(null)
            setShowBooking(id)
          }}
        />
      )}

      {/* Booking Page */}
      {showBooking !== null && (
        <BookingPage
          doctorId={showBooking}
          onClose={() => setShowBooking(null)}
          onSuccess={() => setShowBooking(null)}
        />
      )}

      {/* All Doctors Page */}
      {showAllDoctors && (
        <AllDoctorsPage
          onClose={() => setShowAllDoctors(false)}
          onDoctorClick={(id) => {
            setShowAllDoctors(false)
            setShowDoctorDetail(id)
          }}
          onBookAppointment={(id) => {
            setShowAllDoctors(false)
            setShowBooking(id)
          }}
        />
      )}

      {/* Header */}
      <div className="bg-card px-5 pb-4 pt-12">
        <h1 className="text-xl font-bold text-foreground">在线挂号</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          选择科室和医生，快速预约
        </p>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2.5"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {searchQuery || "搜索医生、科室"}
            </span>
          </button>
          <button
            onClick={() => setShowFilter(true)}
            className="rounded-xl bg-muted p-2.5"
            aria-label="筛选"
          >
            <Filter className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Departments */}
      <div className="mt-2 flex gap-2 overflow-x-auto px-5 py-2 scrollbar-none">
        {departments.map((dept) => (
          <button
            key={dept.label}
            onClick={() => setActiveDept(dept.label)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeDept === dept.label
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground shadow-sm"
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Upcoming Appointment Banner */}
      <button
        onClick={() => setShowDoctorDetail(1)}
        className="mx-5 mt-3 w-[calc(100%-40px)] rounded-2xl bg-primary/10 p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            您有一个待就诊预约
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">王明华 · 皮肤科</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              3月15日 周三 14:00 · 北京协和医院
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      </button>

      {/* Doctor List */}
      <div className="mt-4 px-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
            <div className="h-5 w-1 rounded-full bg-primary" />
            推荐医生
          </h2>
          <button
            onClick={() => setShowAllDoctors(true)}
            className="flex items-center gap-0.5 text-xs text-muted-foreground"
          >
            全部
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-2xl bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
            >
              <button
                onClick={() => setShowDoctorDetail(doctor.id)}
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
                    {doctor.hospital}
                  </span>
                </div>
                <button
                  onClick={() => setShowBooking(doctor.id)}
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

      {/* Search Modal */}
      {showSearch && (
        <div className="absolute inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12">
            <button
              onClick={() => setShowSearch(false)}
              className="rounded-full p-1"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索医生、科室"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowSearch(false)}
              className="text-sm font-medium text-primary"
            >
              搜索
            </button>
          </div>

          <div className="flex-1 px-5 py-4">
            <p className="text-xs text-muted-foreground">热门搜索</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["湿疹", "痤疮", "皮炎", "过敏", "银屑病", "激光祛斑"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag)
                      setShowSearch(false)
                    }}
                    className="rounded-full bg-card px-3 py-1.5 text-xs text-foreground shadow-sm"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">常见科室</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.label}
                  onClick={() => {
                    setActiveDept(dept.label)
                    setShowSearch(false)
                  }}
                  className="rounded-full bg-card px-3 py-1.5 text-xs text-foreground shadow-sm"
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilter && (
        <div className="absolute inset-0 z-50 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">筛选条件</h3>
              <button onClick={() => setShowFilter(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">排序方式</p>
                <div className="flex flex-wrap gap-2">
                  {["综合排序", "好评优先", "价格最低", "最近可约"].map(
                    (sort) => (
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
                    )
                  )}
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

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  预约时间
                </p>
                <div className="flex flex-wrap gap-2">
                  {["不限", "今天", "明天", "本周", "下周"].map((time) => (
                    <button
                      key={time}
                      className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 rounded-xl bg-muted py-3 text-sm font-medium text-foreground">
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
