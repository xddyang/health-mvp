"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  Clock,
  BookmarkCheck,
  Heart,
} from "lucide-react"

interface ArticleDetailPageProps {
  article?: {
    id: number
    title: string
    image: string
    tags: string[]
    description: string
    views: string
    likes: number
    content?: string
    author?: string
    authorTitle?: string
    publishDate?: string
    readTime?: string
  }
  articleId?: number
  onClose: () => void
  onDoctorClick?: (doctorId: number) => void
}

// Mock article data
const articlesData: Record<number, {
  id: number
  title: string
  image: string
  author: { name: string; title: string; avatar: string; id: number }
  publishDate: string
  readTime: string
  views: string
  likes: number
  comments: number
  tags: string[]
  content: string[]
  relatedArticles: { id: number; title: string; image: string }[]
}> = {
  1: {
    id: 1,
    title: "春季湿疹高发期，如何有效预防？",
    image: "/images/article-eczema.jpg",
    author: {
      id: 1,
      name: "王明华",
      title: "主任医师",
      avatar: "/images/doctor-1.jpg",
    },
    publishDate: "2026年3月10日",
    readTime: "5分钟",
    views: "2.3万",
    likes: 856,
    comments: 123,
    tags: ["湿疹护理", "过敏防护", "春季养生"],
    content: [
      "春季气温回升，空气中花粉、尘螨等过敏原增多，是湿疹的高发季节。湿疹是一种常见的皮肤炎症，表现为皮肤红斑、丘疹、水疱、渗出、结痂等，常伴有剧烈瘙痒。",
      "## 湿疹的常见诱因",
      "1. **环境因素**：花粉、尘螨、霉菌、动物皮屑等\n2. **气候变化**：温度和湿度的急剧变化\n3. **食物过敏**：海鲜、牛奶、鸡蛋等\n4. **精神压力**：焦虑、紧张等情绪波动\n5. **皮肤屏障受损**：过度清洁、使用刺激性产品",
      "## 预防湿疹的有效方法",
      "**保持皮肤湿润**\n使用温和、无香料的保湿霜，每天至少涂抹2-3次，尤其是洗澡后要及时涂抹锁住水分。推荐选择含有神经酰胺、透明质酸等成分的保湿产品。",
      "**注意饮食调理**\n避免食用容易引起过敏的食物，如海鲜、辛辣刺激食物。多吃富含维生素A、C、E的蔬果，有助于增强皮肤屏障功能。",
      "**保持环境清洁**\n定期清洁居室，使用空气净化器过滤过敏原。床上用品每周清洗一次，使用防螨床品。春季外出时可佩戴口罩，减少花粉接触。",
      "**选择合适的衣物**\n穿着宽松、透气的棉质衣物，避免羊毛、化纤等可能刺激皮肤的材质。新衣服要先清洗再穿。",
      "## 湿疹发作时的处理",
      "如果湿疹已经发作，建议：\n1. 不要用手抓挠，以免加重病情\n2. 可外用炉甘石洗剂止痒\n3. 严重时遵医嘱使用外用激素药膏\n4. 必要时服用抗组胺药物\n5. 症状持续不退应及时就医",
      "## 温馨提示",
      "湿疹是一种慢性病，需要长期管理。建议建立个人皮肤健康档案，记录发作规律和诱因，有针对性地预防。如有任何疑问，欢迎使用AI问诊功能或预约专业医生咨询。",
    ],
    relatedArticles: [
      { id: 2, title: "告别反复痤疮，科学战痘全攻略", image: "/images/article-acne.jpg" },
      { id: 3, title: "紫外线与皮肤老化：你不知道的真相", image: "/images/article-sunburn.jpg" },
    ],
  },
  2: {
    id: 2,
    title: "告别反复痤疮，科学战痘全攻略",
    image: "/images/article-acne.jpg",
    author: {
      id: 2,
      name: "李素芳",
      title: "副主任医师",
      avatar: "/images/doctor-2.jpg",
    },
    publishDate: "2026年3月8日",
    readTime: "6分钟",
    views: "1.8万",
    likes: 632,
    comments: 98,
    tags: ["痤疮治疗", "日常护理", "医美"],
    content: [
      "痤疮（俗称青春痘）是最常见的皮肤问题之一，不仅影响外观，还可能造成心理负担。本文将为您详解痤疮的成因和科学治疗方法。",
      "## 痤疮的形成原因",
      "痤疮的形成与以下因素密切相关：\n1. **皮脂分泌旺盛**：雄激素刺激皮脂腺分泌过多油脂\n2. **毛囊角化异常**：角质堵塞毛孔\n3. **细菌感染**：痤疮丙酸杆菌在毛囊内繁殖\n4. **炎症反应**：免疫系统对细菌的反应",
      "## 痤疮的分级",
      "根据严重程度，痤疮可分为：\n- **轻度**：以粉刺为主，少量丘疹\n- **中度**：丘疹、脓疱较多\n- **重度**：大量炎性丘疹、脓疱、结节、囊肿",
      "## 科学治疗方案",
      "**日常护理**\n1. 使用温和的洁面产品，每天洗脸2次\n2. 不要过度清洁或使用磨砂膏\n3. 选择标注\"不致粉刺\"的护肤品和化妆品\n4. 保持规律作息，避免熬夜",
      "**外用药物**\n- 维A酸类：调节角质代谢，疏通毛孔\n- 过氧化苯甲酰：杀菌、溶解角栓\n- 抗生素软膏：控制细菌感染\n- 壬二酸：抗炎、美白",
      "**口服药物**\n严重痤疮可能需要口服：\n- 抗生素\n- 异维A酸（需严格遵医嘱）\n- 抗雄激素药物（女性）",
      "## 常见误区",
      "1. **可以挤痘痘？** 不建议！容易感染和留疤\n2. **油性皮肤不需要保湿？** 错误！保湿有助于修复屏障\n3. **晒太阳能杀菌治痘？** 紫外线会加重炎症后色沉",
      "## 何时就医",
      "以下情况建议及时就医：\n- 痤疮反复发作，影响生活\n- 出现囊肿、结节等重度痤疮\n- 留下明显疤痕\n- 伴有其他症状如月经不调",
    ],
    relatedArticles: [
      { id: 1, title: "春季湿疹高发期，如何有效预防？", image: "/images/article-eczema.jpg" },
      { id: 3, title: "紫外线与皮肤老化：你不知道的真相", image: "/images/article-sunburn.jpg" },
    ],
  },
  3: {
    id: 3,
    title: "紫外线与皮肤老化：你不知道的真相",
    image: "/images/article-sunburn.jpg",
    author: {
      id: 3,
      name: "张建国",
      title: "主任医师",
      avatar: "/images/doctor-3.jpg",
    },
    publishDate: "2026年3月5日",
    readTime: "4分钟",
    views: "3.1万",
    likes: 1204,
    comments: 156,
    tags: ["防晒知识", "光老化", "抗衰老"],
    content: [
      "紫外线是导致皮肤老化的首要外因，占皮肤老化因素的80%以上。了解光老化的机制，是科学防晒抗衰老的第一步。",
      "## 什么是光老化",
      "光老化（Photoaging）是指长期紫外线照射导致的皮肤老化，表现为：\n- 皮肤松弛、皱纹加深\n- 皮肤粗糙、毛孔粗大\n- 色斑、色素不均\n- 皮肤干燥、失去光泽\n- 血管扩张、红血丝",
      "## 紫外线的分类",
      "**UVA（长波紫外线）**\n- 穿透力强，可达真皮层\n- 破坏胶原蛋白，导致皱纹\n- 全年存在，阴天也不例外\n\n**UVB（中波紫外线）**\n- 导致晒伤、晒红\n- 刺激黑色素生成\n- 中午时段最强",
      "## 如何科学防晒",
      "**选择合适的防晒霜**\n- SPF值：防护UVB能力，日常SPF30即可\n- PA值：防护UVA能力，PA+++以上\n- 用量要足：面部约1元硬币大小\n- 及时补涂：每2-3小时补涂一次",
      "**物理防晒同样重要**\n- 遮阳伞、太阳帽\n- 防晒衣、墨镜\n- 避开正午强烈阳光",
      "## 已经晒伤怎么办",
      "1. 立即冷敷，镇静舒缓\n2. 涂抹芦荟凝胶���保湿���\n3. 避免再次日晒\n4. 严重晒伤应就医处理",
      "## 光老化的修复",
      "已经出现的光老化可以通过以下方式改善：\n- 使用含维A酸、维C的护肤品\n- 医美项目如光子嫩肤、点阵激光\n- 坚持防晒是最基本的前提",
    ],
    relatedArticles: [
      { id: 1, title: "春季湿疹高发期，如何有效预防？", image: "/images/article-eczema.jpg" },
      { id: 2, title: "告别反复痤疮，科学战痘全攻略", image: "/images/article-acne.jpg" },
    ],
  },
}

export default function ArticleDetailPage({
  article: articleProp,
  articleId,
  onClose,
  onDoctorClick,
}: ArticleDetailPageProps) {
  const [currentArticleId, setCurrentArticleId] = useState(articleId || articleProp?.id || 1)
  const article = articlesData[currentArticleId] || articlesData[1]
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(article.likes)
  const [showShareSuccess, setShowShareSuccess] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleShare = () => {
    setShowShareSuccess(true)
    setTimeout(() => {
      setShowShareSuccess(false)
    }, 2000)
  }
  
  // Reset states when article changes - 直接重置滚动位置，模拟打开新页面
  const handleArticleChange = (newArticleId: number) => {
    // 先重置滚动位置到顶部（无动画，直接到顶）
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
    setCurrentArticleId(newArticleId)
    setIsLiked(false)
    setIsBookmarked(false)
    setLikeCount(articlesData[newArticleId]?.likes || 0)
  }

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-card/80 px-4 pb-3 pt-12 backdrop-blur-md">
        <button
          onClick={onClose}
          className="rounded-full bg-muted/80 p-2 transition-colors hover:bg-muted"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="rounded-full bg-muted/80 p-2 transition-colors hover:bg-muted"
            aria-label={isBookmarked ? "取消收藏" : "收藏"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5 text-foreground" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="rounded-full bg-muted/80 p-2 transition-colors hover:bg-muted"
            aria-label="分享"
          >
            <Share2 className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="px-5 pb-24">
          {/* Tags */}
          <div className="-mt-8 relative z-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-xl font-bold leading-tight text-foreground text-balance">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}阅读
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {article.views}
            </span>
            <span>{article.publishDate}</span>
          </div>

          {/* Article Content */}
          <article className="mt-6 space-y-4">
            {article.content.map((paragraph, idx) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="mt-6 flex items-center gap-2 text-base font-bold text-foreground"
                  >
                    <div className="h-5 w-1 rounded-full bg-primary" />
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              return (
                <p
                  key={idx}
                  className="whitespace-pre-line text-sm leading-relaxed text-foreground/90"
                >
                  {paragraph}
                </p>
              )
            })}
          </article>

          {/* Related Articles */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
              <div className="h-5 w-1 rounded-full bg-primary" />
              相关推荐
            </h3>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {article.relatedArticles.map((related) => (
                <button
                  key={related.id}
                  onClick={() => handleArticleChange(related.id)}
                  className="w-40 shrink-0 rounded-xl bg-card shadow-sm transition-transform active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="line-clamp-2 p-2 text-xs font-medium text-foreground">
                    {related.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar - MVP: 简化，只保留点赞和收藏 */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-12 border-t border-border bg-card px-5 py-3 pb-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-sm ${
              isLiked ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {likeCount}
          </span>
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="flex items-center gap-1.5"
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-primary" />
          ) : (
            <Bookmark className="h-5 w-5 text-muted-foreground" />
          )}
          <span className={`text-sm ${isBookmarked ? "text-primary" : "text-muted-foreground"}`}>
            收藏
          </span>
        </button>
      </div>

      {/* 分享成功弹窗 */}
      {showShareSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/20">
          <div className="rounded-xl bg-card px-6 py-4 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">分享成功</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
