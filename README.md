# MBTI Lab

基于**荣格八维**、MBTI 与九型人格的自测小站。

## 在线地址（GitHub Pages）

| 测试 | 链接 |
|------|------|
| 八维测 | https://sherly2026.github.io/MBTI-Lab/ |
| 灵塑（动物塑） | https://sherly2026.github.io/MBTI-Lab/animal/ |
| 史鉴（古代人物） | https://sherly2026.github.io/MBTI-Lab/history/ |

仓库设置：Settings → Pages → Source 选 **GitHub Actions**。

## 1. 八维测

| 项目 | 内容 |
|------|------|
| 题量 | 32 题（每维 4 题） |
| 计分 | 八维 → Grant 功能栈匹配 16 型 |
| 结果 | 主类型、次近类型、功能栈、八维条形图 |

## 2. 灵塑（MBTI 动物塑）

| 项目 | 内容 |
|------|------|
| 题量 | 24 题 |
| 逻辑 | MBTI + 同型多动物加权 |
| 结果 | 性格解说、功能栈、配图 |

## 3. 史鉴（古代人物对照）

| 项目 | 内容 |
|------|------|
| 题量 | 33 题（八维 24 + 九型 9） |
| 逻辑 | 八维定 MBTI，九型定主型/翼型，再在该型人物池中匹配 |
| 人物池 | 16 型 × 每型 3 人 = 48 位中国古代人物 |
| 结果 | 详细性格对照解析、现代对应、功能栈、同型其他人选、视觉形象 |

人物结果为类型学**隐喻对照**，不构成对历史人物的心理或史实鉴定。

## 本地运行

```bash
python -m http.server 5173
```

- 八维测：`http://localhost:5173/app/`
- 灵塑：`http://localhost:5173/app/animal/`
- 史鉴：`http://localhost:5173/app/history/`

## 目录

```text
app/
  index.html              # 八维测
  animal/                 # 灵塑
  history/                # 史鉴
.github/workflows/deploy-pages.yml
```

## 说明

本工具用于自我探索与学习，**不构成**临床诊断或职业鉴定。
