"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Check,
} from "lucide-react"

interface UserInfoPageProps {
  onClose: () => void
}

export default function UserInfoPage({ onClose }: UserInfoPageProps) {
  const [showEditName, setShowEditName] = useState(false)
  const [showEditGender, setShowEditGender] = useState(false)
  const [showEditBirthday, setShowEditBirthday] = useState(false)
  
  const [userName, setUserName] = useState("小明")
  const [gender, setGender] = useState("男")
  const [birthday, setBirthday] = useState("1995-06-15")

  const infoItems = [
    { label: "头像", value: "", type: "avatar" },
    { label: "昵称", value: userName, type: "name" },
    { label: "性别", value: gender, type: "gender" },
    { label: "生日", value: birthday, type: "birthday" },
    { label: "手机号", value: "138****8888", type: "phone" },
    { label: "绑定微信", value: "已绑定", type: "wechat" },
  ]

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 bg-card px-4 pb-4 pt-12 shadow-sm">
        <button
          onClick={onClose}
          className="rounded-full bg-muted p-2"
          aria-label="返回"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">个人资料</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="rounded-2xl bg-card shadow-sm">
          {infoItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.type === "name") setShowEditName(true)
                if (item.type === "gender") setShowEditGender(true)
                if (item.type === "birthday") setShowEditBirthday(true)
              }}
              className={`flex w-full items-center justify-between px-4 py-4 ${
                idx !== infoItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.type === "avatar" ? (
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">小</span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Camera className="h-3 w-3 text-primary-foreground" />
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Edit Name Modal */}
      {showEditName && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">修改昵称</h3>
              <button onClick={() => setShowEditName(false)}>
                <span className="text-sm text-muted-foreground">取消</span>
              </button>
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="请输入昵称"
              maxLength={20}
            />
            <p className="mt-2 text-right text-xs text-muted-foreground">
              {userName.length}/20
            </p>
            <button
              onClick={() => setShowEditName(false)}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              保存
            </button>
          </div>
        </div>
      )}

      {/* Edit Gender Modal */}
      {showEditGender && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">选择性别</h3>
              <button onClick={() => setShowEditGender(false)}>
                <span className="text-sm text-muted-foreground">取消</span>
              </button>
            </div>
            <div className="space-y-2">
              {["男", "女", "保密"].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGender(g)
                    setShowEditGender(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl bg-muted px-4 py-3"
                >
                  <span className="text-sm text-foreground">{g}</span>
                  {gender === g && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Birthday Modal */}
      {showEditBirthday && (
        <div className="absolute inset-0 z-60 flex items-end bg-foreground/50">
          <div className="w-full rounded-t-3xl bg-card p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">选择生日</h3>
              <button onClick={() => setShowEditBirthday(false)}>
                <span className="text-sm text-muted-foreground">取消</span>
              </button>
            </div>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground focus:outline-none"
            />
            <button
              onClick={() => setShowEditBirthday(false)}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
