# MBTI Lab · 八维测

基于**荣格八维认知功能**（Te / Ti / Fe / Fi / Se / Si / Ne / Ni）的 MBTI 偏好测试小程序。

## 使用方式

### 手机 / 公网（GitHub Pages）

推送到 `main` 并开启 Pages 后，任意设备浏览器打开：

```text
https://sherly2026.github.io/MBTI-Lab/
```

仓库设置：Settings → Pages → Build and deployment → Source 选 **GitHub Actions**。  
首次生效需把含 `app/` 与 `.github/workflows/deploy-pages.yml` 的提交推到 `main`，或在 Actions 里手动跑 **Deploy GitHub Pages**。

### 本地

用浏览器直接打开 `app/index.html`，或：

```bash
python -m http.server 5173
```

然后打开 `http://localhost:5173/app/`。同一 Wi‑Fi 下手机可访问 `http://<电脑局域网IP>:5173/app/`。

## 设计说明

| 项目 | 内容 |
|------|------|
| 题量 | 32 题（每维 4 题） |
| 作答 | 5 点量表：非常不像我 → 非常像我 |
| 计分 | 八维百分制得分 → 按 Grant 功能栈加权匹配 16 型 |
| 结果 | 主类型、次近类型、功能栈、八维条形图 |

题目描述日常情境偏好，不使用专业术语堆砌，便于快速自测与教学演示。

## 目录

```text
app/
  index.html      # 入口
  css/app.css     # 样式
  js/data.js      # 题库、类型资料、计分
  js/app.js       # 界面与流程
```

## 说明

本工具用于自我探索与学习荣格 / MBTI 框架，**不构成**临床诊断或职业鉴定。
