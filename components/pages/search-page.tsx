"use client"
// Search Page Component
import { useState, useEffect, useMemo } from "react"
import {
  ArrowLeft,
  Search,
  X,
  Clock,
  TrendingUp,
  Trash2,
  Eye,
  ThumbsUp,
} from "lucide-react"
import Image from "next/image"

// 完整的文章数据（避免循环依赖）
const allArticles = [
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
  {
    id: 4,
    image: "/images/article-eczema.jpg",
    tags: ["敏感肌", "屏障修复"],
    match: "78%",
    title: "敏感肌护理：如何修复受损的皮肤屏障",
    description: "敏感肌肤容易泛红、刺痛，了解如何科学修复皮肤屏障是关键。",
    views: "1.5万",
    likes: 523,
    publishDate: "2026-03-01",
    readTime: "4分钟",
  },
  {
    id: 5,
    image: "/images/article-acne.jpg",
    tags: ["儿童皮肤", "湿疹"],
    match: "75%",
    title: "儿童湿疹家庭护理指南",
    description: "婴幼儿湿疹是家长常见的困扰，正确的护理方法能有效缓解症状。",
    views: "2.1万",
    likes: 789,
    publishDate: "2026-02-28",
    readTime: "6分钟",
  },
  {
    id: 6,
    image: "/images/article-sunburn.jpg",
    tags: ["色斑", "美白"],
    match: "72%",
    title: "如何淡化脸上的色斑？专家教你科学美白",
    description: "色斑形成原因复杂，科学护理才能有效淡化，避免踩雷。",
    views: "2.8万",
    likes: 1056,
    publishDate: "2026-02-25",
    readTime: "5分钟",
  },
  {
    id: 7,
    image: "/images/article-eczema.jpg",
    tags: ["过敏", "荨麻疹"],
    match: "70%",
    title: "荨麻疹反复发作怎么办？",
    description: "荨麻疹是常见的过敏性皮肤病，了解诱因和预防方法很重要。",
    views: "1.9万",
    likes: 634,
    publishDate: "2026-02-20",
    readTime: "4分钟",
  },
  {
    id: 8,
    image: "/images/article-acne.jpg",
    tags: ["皮肤干燥", "保湿"],
    match: "68%",
    title: "冬季皮肤干燥脱皮？这样保湿最有效",
    description: "冬季气候干燥，皮肤容易缺水脱屑，学会正确保湿方法很重要。",
    views: "1.6万",
    likes: 478,
    publishDate: "2026-02-15",
    readTime: "3分钟",
  },
]

interface SearchPageProps {
  onClose: () => void
  onSelectArticle: (article: (typeof allArticles)[0]) => void
}

const hotSearches = [
  "湿疹怎么治疗",
  "过敏性皮炎",
  "痤疮护理",
  "银屑病",
  "荨麻疹止痒",
  "敏感肌护肤",
  "儿童皮肤病",
  "防晒霜推荐",
]

const defaultHistory = [
  "脸上长痘痘",
  "皮肤干燥脱皮",
  "被蚊虫叮咬怎么办",
]

export default function SearchPage({ onClose, onSelectArticle }: SearchPageProps) {
  const [query, setQuery] = useState("")
  const [history, setHistory] = useState<string[]>(defaultHistory)
  const [isFocused, setIsFocused] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const input = document.getElementById("search-input")
    if (input) input.focus()
  }, [])

  // 模糊搜索逻辑
  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return allArticles.filter((article) => {
      // 匹配标题
      if (article.title.toLowerCase().includes(searchTerm)) return true
      // 匹配描述
      if (article.description.toLowerCase().includes(searchTerm)) return true
      // 匹配标签
      if (article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) return true
      return false
    })
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    setQuery(searchQuery)
    setHasSearched(true)
    // 添加到历史记录
    setHistory((prev) => {
      const filtered = prev.filter((h) => h !== searchQuery)
      return [searchQuery, ...filtered].slice(0, 10)
    })
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const handleRemoveHistoryItem = (item: string) => {
    setHistory((prev) => prev.filter((h) => h !== item))
  }

  // 实时搜索时显示结果
  const showResults = query.trim().length > 0

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12">
        <button
          onClick={onClose}
          className="rounded-full p-1 transition-colors hover:bg-muted"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div
          className={`flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors ${
            isFocused ? "bg-muted ring-2 ring-primary/20" : "bg-muted"
          }`}
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            id="search-input"
            type="text"
            placeholder="搜索皮肤问题、症状或疾病"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query)
              }
            }}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("")
                setHasSearched(false)
              }}
              className="rounded-full p-0.5 transition-colors hover:bg-foreground/10"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="text-sm font-medium text-primary"
        >
          搜索
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* 搜索结果 */}
        {showResults ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">
                搜索结果 ({searchResults.length})
              </h3>
              {hasSearched && (
                <span className="text-xs text-muted-foreground">
                  已为您找到相关内容
                </span>
              )}
            </div>
            
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {searchResults.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="flex gap-3 rounded-xl bg-card p-3 shadow-sm text-left transition-transform active:scale-[0.98]"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div>
                        <h4 className="text-sm font-bold text-foreground line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="mt-1 flex gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <ThumbsUp className="h-3 w-3" />
                          {article.likes}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  没有找到相关内容
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  试试换个关键词搜索
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Search History */}
            {history.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    搜索历史
                  </h3>
                  <button
                    onClick={handleClearHistory}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                    清空
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {history.map((item) => (
                    <div
                      key={item}
                      className="group flex items-center gap-1 rounded-full bg-card px-3 py-1.5 shadow-sm"
                    >
                      <button
                        onClick={() => handleSearch(item)}
                        className="text-xs text-foreground"
                      >
                        {item}
                      </button>
                      <button
                        onClick={() => handleRemoveHistoryItem(item)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hot Searches */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <TrendingUp className="h-4 w-4 text-destructive" />
                热门搜索
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {hotSearches.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-sm transition-colors hover:bg-muted"
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
                        index < 3
                          ? "bg-destructive text-card"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-xs text-foreground">{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Categories */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                <div className="h-4 w-1 rounded-full bg-primary" />
                常见分类
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { label: "常见皮肤病", desc: "湿疹、皮炎、荨麻疹等" },
                  { label: "痤疮粉刺", desc: "青春痘、黑头、闭口等" },
                  { label: "色素问题", desc: "雀斑、黄褐斑、色沉等" },
                  { label: "皮肤感染", desc: "真菌、细菌、病毒感染" },
                  { label: "过敏反应", desc: "接触性皮炎、药疹等" },
                  { label: "皮肤护理", desc: "保湿、防晒、抗衰老" },
                ].map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => handleSearch(cat.label)}
                    className="rounded-xl bg-card p-3 text-left shadow-sm transition-colors hover:bg-muted"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {cat.label}
                    </span>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {cat.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
