# MBTI Lab

基于**荣格八维认知功能**与 MBTI 类型学的自测小站，目前包含两套测试。

## 在线地址（GitHub Pages）

| 测试 | 链接 |
|------|------|
| 八维测 | https://sherly2026.github.io/MBTI-Lab/ |
| 灵塑（动物塑） | https://sherly2026.github.io/MBTI-Lab/animal/ |

仓库设置：Settings → Pages → Source 选 **GitHub Actions**。

## 1. 八维测

| 项目 | 内容 |
|------|------|
| 题量 | 32 题（每维 4 题） |
| 作答 | 5 点量表 |
| 计分 | 八维得分 → Grant 功能栈匹配 16 型 |
| 结果 | 主类型、次近类型、功能栈、八维条形图 |

## 2. 灵塑（MBTI 动物塑）

| 项目 | 内容 |
|------|------|
| 题量 | 24 题（每维 3 题） |
| 逻辑 | 先匹配 MBTI，再在该型动物池中按功能权重选出主塑 |
| 同型多塑 | 每型 2–3 种动物，结果页展示主塑与同型其他塑 |
| 结果 | 性格解说、特质标签、功能栈、视觉海报 / 动物摄影 |

动物塑是类型学的**隐喻表达**，用于自我探索与审美想象，不构成科学鉴定。

## 本地运行

```bash
python -m http.server 5173
```

- 八维测：`http://localhost:5173/app/`
- 灵塑：`http://localhost:5173/app/animal/`

## 目录

```text
app/
  index.html           # 八维测
  css/ app.js/ data.js
  animal/
    index.html         # 灵塑
    css/animal.css
    js/data.js         # 题库 + 动物映射 + 计分
    js/app.js
.github/workflows/deploy-pages.yml
```

## 说明

本工具用于自我探索与学习荣格 / MBTI 框架，**不构成**临床诊断或职业鉴定。
