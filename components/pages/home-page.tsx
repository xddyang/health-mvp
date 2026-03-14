"use client"

import { useState, useEffect } from "react"
import {
  Search,
  User,
  ChevronRight,
  Eye,
  ThumbsUp,
  Flame,
  Shield,
  Camera,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import SearchPage from "./search-page"
import ArticleDetailPage from "./article-detail-page"
import ProfileSimplePage from "./profile-simple-page"

// MVP: 简化快捷入口，只保留核心功能
const quickActions = [
  { icon: Camera, label: "拍照识肤", color: "bg-primary/10 text-primary", action: "camera" },
  { icon: MessageSquare, label: "AI问诊", color: "bg-accent text-accent-foreground", action: "ai" },
]

// MVP: 简化文章数据，移除医生信息
export const articles = [
  {
    id: 1,
    image: "/images/article-eczema.jpg",
    tags: ["湿疹护理", "过敏防护"],
    match: "95%",
    title: "春季湿疹高发期，如何有效预防？",
    description: "春季气温回升，空气中花粉增多，是湿疹的高发季节。专家教你科学预防和护理方法。",
    views: "2.3万",
    likes: 856,
    publishDate: "2026-03-10",
    readTime: "5分钟",
  },
  {
    id: 2,
    image: "/images/article-acne.jpg",
    tags: ["痤疮治疗", "日常护理"],
    match: "88%",
    title: "告别反复痤疮，科学战痘全攻略",
    description: "痤疮困扰着众多年轻人，正确认识痤疮成因，采取科学治疗方案是关键。",
    views: "1.8万",
    likes: 632,
    publishDate: "2026-03-08",
    readTime: "6分钟",
  },
  {
    id: 3,
    image: "/images/article-sunburn.jpg",
    tags: ["防晒知识", "光老化"],
    match: "82%",
    title: "紫外线与皮肤老化：你不知道的真相",
    description: "紫外线是皮肤老化的头号敌人，了解光老化机制，科学防晒抗衰老。",
    views: "3.1万",
    likes: 1204,
    publishDate: "2026-03-05",
    readTime: "4分钟",
  },
]

const hotTopics = [
  "#春季过敏怎么办",
  "#儿童湿疹护理",
  "#医美术后修复",
  "#敏感肌换季指南",
]

interface HomePageProps {
  onNavigateToAI?: () => void
  onOpenCamera?: () => void
  onSubPageChange?: (isSubPage: boolean) => void
}

export default function HomePage({ onNavigateToAI, onOpenCamera, onSubPageChange }: HomePageProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  // 通知父组件当前是否在二级页面
  const isInSubPage = showSearch || selectedArticle !== null || showProfile
  useEffect(() => {
    onSubPageChange?.(isInSubPage)
  }, [isInSubPage, onSubPageChange])

  // MVP: 简化版个人中心
  if (showProfile) {
    return <ProfileSimplePage onClose={() => setShowProfile(false)} />
  }

  if (showSearch) {
    return (
      <SearchPage
        onClose={() => setShowSearch(false)}
        onSelectArticle={(article) => {
          setShowSearch(false)
          setSelectedArticle(article)
        }}
      />
    )
  }

  if (selectedArticle) {
    return (
      <ArticleDetailPage
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    )
  }

  return (
    <div className="min-h-full bg-background pb-4">
      {/* Header */}
      <div className="bg-card px-5 pb-4 pt-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-primary">肤康</span>
          </div>
          {/* MVP: 简化个人中心入口 */}
          <button 
            onClick={() => setShowProfile(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80" 
            aria-label="个人中心"
          >
            <User className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Greeting */}
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-foreground text-balance">
            早安，小明
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            今日天气晴朗，注意防晒护肤
          </p>
        </div>

        {/* Search */}
        <button
          onClick={() => setShowSearch(true)}
          className="mt-4 flex w-full items-center gap-3 rounded-xl bg-muted px-4 py-3"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            搜索皮肤问题、症状或疾病
          </span>
        </button>
      </div>

      {/* Quick Actions - MVP: 简化为2个核心入口 */}
      <div className="mt-4 grid grid-cols-2 gap-3 px-5">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              onClick={() => {
                if (action.action === "camera" && onOpenCamera) {
                  onOpenCamera()
                } else if (action.action === "ai" && onNavigateToAI) {
                  onNavigateToAI()
                }
              }}
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm transition-transform active:scale-95"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-foreground">
                  {action.label}
                </span>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {action.action === "camera" ? "AI智能分析皮肤" : "在线咨询问诊"}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Hot Topics */}
      <div className="mt-5 px-5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Flame className="h-4 w-4 shrink-0 text-destructive" />
          {hotTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setShowSearch(true)}
              className="shrink-0 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="mt-5 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-primary" />
            <h2 className="text-base font-bold text-foreground">
              智能推荐
            </h2>
          </div>
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-0.5 text-xs text-muted-foreground"
          >
            更多
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-4">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="overflow-hidden rounded-2xl bg-card shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm">
                  <span className="text-xs font-bold text-primary">
                    {article.match}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-foreground text-balance">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {article.likes}
                    </span>
                  </div>
                  <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    查看详情
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
