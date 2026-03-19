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
  ImageIcon,
  ZoomIn,
  AlertTriangle,
} from "lucide-react"

interface SearchResultsPageProps {
  query: string
  onClose: () => void
  onArticleClick: (articleId: number) => void
  onDoctorClick: (doctorId: number) => void
}

type TabType = "all" | "articles" | "images" | "doctors" | "qa"

const tabs: { id: TabType; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "articles", label: "文章" },
  { id: "images", label: "图片案例" },
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

// 皮肤病图片案例数据
const mockImages = [
  {
    id: 1,
    image: "/images/case-eczema-1.jpg",
    title: "湿疹 - 手部",
    disease: "湿疹",
    stage: "急性期",
    description: "手部急性湿疹表现，可见红斑、丘疹、水疱",
    severity: "中度",
    tags: ["湿疹", "手部", "急性期"],
  },
  {
    id: 2,
    image: "/images/case-eczema-2.jpg",
    title: "湿疹 - 面部",
    disease: "湿疹",
    stage: "亚急性期",
    description: "面部湿疹，皮肤干燥、脱屑，轻度红斑",
    severity: "轻度",
    tags: ["湿疹", "面部", "亚急性期"],
  },
  {
    id: 3,
    image: "/images/case-acne-1.jpg",
    title: "痤疮 - 丘疹型",
    disease: "痤疮",
    stage: "活动期",
    description: "面部丘疹型痤疮，可见红色炎性丘疹",
    severity: "中度",
    tags: ["痤疮", "丘疹", "炎症"],
  },
  {
    id: 4,
    image: "/images/case-acne-2.jpg",
    title: "痤疮 - 囊肿型",
    disease: "痤疮",
    stage: "活动期",
    description: "严重囊肿型痤疮，需要专业治疗",
    severity: "重度",
    tags: ["痤疮", "囊肿", "重度"],
  },
  {
    id: 5,
    image: "/images/case-psoriasis-1.jpg",
    title: "银屑病 - 斑块型",
    disease: "银屑病",
    stage: "稳定期",
    description: "典型银屑病斑块，边界清晰，覆银白色鳞屑",
    severity: "中度",
    tags: ["银屑病", "斑块", "鳞屑"],
  },
  {
    id: 6,
    image: "/images/case-urticaria-1.jpg",
    title: "荨麻疹",
    disease: "荨麻疹",
    stage: "急性期",
    description: "急性荨麻疹风团，隆起性红斑",
    severity: "轻度",
    tags: ["荨麻疹", "风团", "过敏"],
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

  const filteredImages = mockImages.filter(
    (img) =>
      img.title.toLowerCase().includes(query.toLowerCase()) ||
      img.disease.toLowerCase().includes(query.toLowerCase()) ||
      img.description.toLowerCase().includes(query.toLowerCase()) ||
      img.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  )

  const [selectedImage, setSelectedImage] = useState<typeof mockImages[0] | null>(null)

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
          找到 {filteredArticles.length + filteredImages.length + filteredDoctors.length + mockQA.length} 条相关结果
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

        {/* Images */}
        {(activeTab === "all" || activeTab === "images") &&
          filteredImages.length > 0 && (
            <div className="mb-4">
              {activeTab === "all" && (
                <div className="mb-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">
                    图片案例
                  </span>
                </div>
              )}
              
              {/* 图片案例 Tab 特有的提示 */}
              {activeTab === "images" && (
                <div className="mb-3 flex items-start gap-2 rounded-lg bg-amber-50 p-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                  <p className="text-xs text-amber-700">
                    以下图片仅供医学参考，实际诊断请咨询专业医生。部分图片可能引起不适。
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {filteredImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={img.image}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {/* 严重程度标签 */}
                      <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        img.severity === "重度" 
                          ? "bg-red-500 text-white" 
                          : img.severity === "中度"
                          ? "bg-amber-500 text-white"
                          : "bg-green-500 text-white"
                      }`}>
                        {img.severity}
                      </span>
                      {/* 放大图标 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/20 group-hover:opacity-100">
                        <ZoomIn className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-2.5 text-left">
                      <h4 className="text-xs font-bold text-foreground line-clamp-1">
                        {img.title}
                      </h4>
                      <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                        {img.stage}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {img.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary"
                          >
                            {tag}
                          </span>
                        ))}
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

      {/* Image Detail Modal */}
      {selectedImage && (
        <div 
          className="absolute inset-0 z-60 flex items-center justify-center bg-foreground/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 图片 */}
            <div className="relative aspect-square w-full">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 rounded-full bg-foreground/50 p-1.5"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              {/* 严重程度 */}
              <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                selectedImage.severity === "重度" 
                  ? "bg-red-500 text-white" 
                  : selectedImage.severity === "中度"
                  ? "bg-amber-500 text-white"
                  : "bg-green-500 text-white"
              }`}>
                {selectedImage.severity}
              </span>
            </div>
            
            {/* 信息 */}
            <div className="p-4">
              <h3 className="text-base font-bold text-foreground">
                {selectedImage.title}
              </h3>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">疾病类型</span>
                  <span className="text-xs font-medium text-foreground">{selectedImage.disease}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">病程阶段</span>
                  <span className="text-xs font-medium text-foreground">{selectedImage.stage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">严重程度</span>
                  <span className={`text-xs font-medium ${
                    selectedImage.severity === "重度" 
                      ? "text-red-500" 
                      : selectedImage.severity === "中度"
                      ? "text-amber-500"
                      : "text-green-500"
                  }`}>{selectedImage.severity}</span>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {selectedImage.description}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedImage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 提示和操作按钮 */}
              <div className="mt-4 rounded-lg bg-muted p-3">
                <p className="text-[11px] text-muted-foreground">
                  此图片仅供参考，如有类似症状请及时就医，以获得专业诊断和治疗建议。
                </p>
              </div>

              <button className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground">
                咨询相关医生
              </button>
            </div>
          </div>
        </div>
      )}

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
