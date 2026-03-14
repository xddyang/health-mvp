"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Heart,
  Eye,
  ThumbsUp,
  Trash2,
} from "lucide-react"
import ArticleDetailPage from "../article-detail-page"

interface FavoritesPageProps {
  onClose: () => void
}

const mockFavorites = [
  {
    id: 1,
    image: "/images/article-eczema.jpg",
    title: "春季湿疹高发期，如何有效预防？",
    author: "王明华 主任医师",
    views: "2.3万",
    likes: 856,
    savedDate: "2026-03-12",
  },
  {
    id: 2,
    image: "/images/article-acne.jpg",
    title: "告别反复痤疮，科学战痘全攻略",
    author: "李素芳 副主任医师",
    views: "1.8万",
    likes: 632,
    savedDate: "2026-03-10",
  },
  {
    id: 3,
    image: "/images/article-sunburn.jpg",
    title: "紫外线与皮肤老化：你不知道的真相",
    author: "张建国 主任医师",
    views: "3.1万",
    likes: 1204,
    savedDate: "2026-03-08",
  },
]

export default function FavoritesPage({ onClose }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
    setShowDeleteConfirm(null)
  }

  if (selectedArticleId !== null) {
    return (
      <ArticleDetailPage
        articleId={selectedArticleId}
        onClose={() => setSelectedArticleId(null)}
      />
    )
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
          <h1 className="text-base font-bold text-foreground">收藏内容</h1>
        </div>
        <span className="text-xs text-muted-foreground">
          共 {favorites.length} 篇
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">暂无收藏内容</p>
            <p className="mt-1 text-xs text-muted-foreground">
              浏览文章时点击收藏按钮即可保存
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl bg-card shadow-sm"
              >
                <button
                  onClick={() => setSelectedArticleId(item.id)}
                  className="flex w-full gap-3 p-3 text-left"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.author}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        {item.likes}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        收藏于 {item.savedDate}
                      </span>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(item.id)}
                  className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
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
              取消收藏
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              确定要取消收藏这篇文章吗？
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
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
