"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Eye,
  ThumbsUp,
  User,
  FileText,
  Stethoscope,
  X,
} from "lucide-react"

interface SearchResultsPageProps {
  query: string
  onClose: () => void
  onArticleClick: (articleId: number) => void
  onDoctorClick: (doctorId: number) => void
}

type TabType = "all" | "articles" | "doctors" | "qa"

const tabs: { id: TabType; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "articles", label: "文章" },
  { id: "doctors", label: "医生" },
  { id: "qa", label: "问答" },
]

// Mock search results
const mockArticles = [
  {
    id: 1,
    image: "/images/article-eczema.jpg",
    title: "湿疹的成因与科学护理方法",
    description: "详解湿疹的常见诱因，以及日常护理和药物治疗的正确方式。",
    author: "李医生",
    views: "1.5万",
    likes: 423,
    tags: ["湿疹", "护理"],
  },
  {
    id: 2,
    image: "/images/article-acne.jpg",
    title: "痤疮治疗全指南：从预防到康复",
    description: "痤疮的分型、治疗方案选择以及如何预防痤疮复发。",
    author: "王主任",
    views: "2.3万",
    likes: 856,
    tags: ["痤疮", "治疗"],
  },
  {
    id: 3,
    image: "/images/article-sunburn.jpg",
    title: "敏感肌的日常防护与修复",
    description: "敏感肌肤的成因分析，以及如何选择合适的护肤产品。",
    author: "张医生",
    views: "1.8万",
    likes: 567,
    tags: ["敏感肌", "护肤"],
  },
]

const mockDoctors = [
  {
    id: 1,
    name: "王明华",
    title: "主任医师",
    hospital: "北京协和医院",
    avatar: "/images/doctor-1.jpg",
    specialty: "湿疹、银屑病、皮炎",
    rating: 4.9,
  },
  {
    id: 2,
    name: "李素芳",
    title: "副主任医师",
    hospital: "上海华山医院",
    avatar: "/images/doctor-2.jpg",
    specialty: "痤疮、色素性皮肤病",
    rating: 4.8,
  },
]

const mockQA = [
  {
    id: 1,
    question: "湿疹反复发作怎么办？",
    answer: "湿疹反复发作需要从以下几方面入手：1. 找出并避免诱发因素；2. 保持皮肤湿润；3. 规范使用外用药物...",
    doctor: "王明华 主任医师",
    likes: 234,
  },
  {
    id: 2,
    question: "脸上长痘痘可以挤吗？",
    answer: "不建议自行挤压痘痘，这样容易导致感染、留疤。正确的做法是：1. 保持面部清洁；2. 使用祛痘产品...",
    doctor: "李素芳 副主任医师",
    likes: 189,
  },
]

export default function SearchResultsPage({
  query,
  onClose,
  onArticleClick,
  onDoctorClick,
}: SearchResultsPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [searchValue, setSearchValue] = useState(query)
  const [showFilter, setShowFilter] = useState(false)

  const filteredArticles = mockArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  )

  const filteredDoctors = mockDoctors.filter(
    (d) =>
      d.name.includes(query) ||
      d.specialty.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card px-4 pb-3 pt-12 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-muted"
            aria-label="返回"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchValue && (
              <button onClick={() => setSearchValue("")}>
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

        {/* Tabs */}
        <div className="mt-3 flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-3 text-xs text-muted-foreground">
          找到 {filteredArticles.length + filteredDoctors.length + mockQA.length} 条相关结果
        </p>

        {/* Articles */}
        {(activeTab === "all" || activeTab === "articles") &&
          filteredArticles.length > 0 && (
            <div className="mb-4">
              {activeTab === "all" && (
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">
                    相关文章
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onArticleClick(article.id)}
                    className="flex gap-3 rounded-xl bg-card p-3 text-left shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="line-clamp-2 text-sm font-bold text-foreground">
                        {article.title}
                      </h4>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {article.description}
                      </p>
                      <div className="mt-auto flex items-center gap-3 pt-2">
                        <span className="text-[11px] text-muted-foreground">
                          {article.author}
                        </span>
                        <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {article.likes}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* Doctors */}
        {(activeTab === "all" || activeTab === "doctors") &&
          filteredDoctors.length > 0 && (
            <div className="mb-4">
              {activeTab === "all" && (
                <div className="mb-2 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">
                    相关医生
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => onDoctorClick(doctor.id)}
                    className="flex items-center gap-3 rounded-xl bg-card p-3 text-left shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
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
                        {doctor.hospital}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        擅长: {doctor.specialty}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                      预约
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* Q&A */}
        {(activeTab === "all" || activeTab === "qa") && mockQA.length > 0 && (
          <div className="mb-4">
            {activeTab === "all" && (
              <div className="mb-2 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  相关问答
                </span>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {mockQA.map((qa) => (
                <div
                  key={qa.id}
                  className="rounded-xl bg-card p-3 shadow-sm"
                >
                  <h4 className="text-sm font-bold text-foreground">
                    {qa.question}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {qa.answer}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-primary">
                      {qa.doctor}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      {qa.likes} 人觉得有用
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">筛选</h3>
              <button onClick={() => setShowFilter(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  内容类型
                </p>
                <div className="flex flex-wrap gap-2">
                  {["全部", "文章", "医生", "问答", "视频"].map((type) => (
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
                <p className="mb-2 text-sm font-medium text-foreground">
                  排序方式
                </p>
                <div className="flex flex-wrap gap-2">
                  {["综合排序", "最新发布", "最多浏览", "最多点赞"].map(
                    (sort) => (
                      <button
                        key={sort}
                        className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                      >
                        {sort}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  时间范围
                </p>
                <div className="flex flex-wrap gap-2">
                  {["不限", "一周内", "一月内", "三月内", "一年内"].map(
                    (time) => (
                      <button
                        key={time}
                        className="rounded-full bg-muted px-4 py-1.5 text-xs text-foreground"
                      >
                        {time}
                      </button>
                    )
                  )}
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
