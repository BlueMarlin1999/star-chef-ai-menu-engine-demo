# Star Chef - AI Menu Engine 进度与待办

更新日期：2026-06-26
项目样本：华住项目 / 上海江桥  
当前阶段：v0.8a Supplier Product Pool Import 已建立，并已读取蓝鼎 2026 年 6 月供应商报价单的上海 sheet，生成公开脱敏导入摘要；完整原始行和精确报价保存在本地私有 JSON，不进入公开仓库。

## 1. 当前结论

Star Chef 还不是正式生产系统。它已经从“菜单页面原型”推进到“可建库、可测试、可审计的数据底座”，并进一步明确为 Menu Operations Loop。v0.8a 已经补上供应商报价、新品和时令菜进入菜单引擎的前端工作台，并完成一次真实报价 Excel 的本地读取和公开脱敏摘要展示，但还没有连接真实云数据库、企业微信登录和正式审批流。

当前最重要的判断是：

- 不要直接进入 AI 自动排菜单。
- 不要先批量导入所有历史文件。
- 不要在 P0 数据门禁未通过前展示真实毛利或生成正式采购单。
- 先用华住项目跑通一个可复现循环：Excel 原始数据 -> 标准映射 -> 成本/报价 -> 菜单候选 -> 门禁 -> 审批 -> 审计日志。
- 供应商新品和时令菜只能进入候选池，不能绕过产品库、SOP、价格资料库和项目规则门禁。
- 真实供应商报价公开展示必须脱敏：外部页面只显示统计、价格区间和缺口，不公开每一行精确价格。

## 2. 已完成版本

| 版本 | 状态 | 重点成果 | 主要入口 |
|---|---:|---|---|
| v0.3 | 已完成 | 华住项目业务计算版：餐别、档口、菜池、成本风险、AI 审核变化。 | `index.html` |
| v0.4 | 已完成 | 系统建设包：从业务原型转为系统搭建讨论材料。 | `v04-system-build.html` |
| v0.5 | 已完成 | 正式系统骨架：角色权限、Excel 导入、菜名映射、质量门禁、审批雏形。 | `v05-production-app.html` |
| v0.6 | 已完成 | 数据库落地包：PostgreSQL schema、API 合约、运维手册、数据库分层。 | `v06-database-foundation.html` |
| v0.7 | 已完成 | 数据库测试工具包：Docker 测试库、华住 seed、smoke test、一键运行器、公开说明页。 | `v07-database-test.html` |
| v0.8 | 已完成 | 菜单运营循环：五个 loop、角色责任、门禁、退出条件和下一步导入路线。 | `v08-menu-operations-loop.html` |
| v0.8a | 已完成 | 供应商新品导入工作台：报价/新品/时令菜队列、四库映射、候选菜单、人工调整、门禁，以及蓝鼎上海报价 sheet 的公开脱敏导入摘要。 | `v08a-supplier-product-pool.html` |

## 3. 当前公开链接

- 首页：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/
- v0.8a 供应商新品导入：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/v08a-supplier-product-pool.html
- 供应商协同预览：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/star-chef-supplier-preview/
- v0.8 菜单运营循环：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/v08-menu-operations-loop.html
- v0.7 数据库测试工具包：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/v07-database-test.html
- v0.6 数据库落地包：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/v06-database-foundation.html
- PostgreSQL schema：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/db/star-chef-v06-schema.sql
- v0.7 seed SQL：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/db/star-chef-v07-test-seed.sql
- v0.7 smoke test：https://bluemarlin1999.github.io/star-chef-ai-menu-engine-demo/db/star-chef-v07-smoke-test.sql

## 4. 当前缺口

### P0 阻断项

| 缺口 | 影响 | 处理方向 |
|---|---|---|
| 云端 staging 数据库未创建 | 还不能多人协同、不能保存真实导入记录。 | 本机 PostgreSQL smoke test 已通过；下一步买腾讯云 PostgreSQL staging。 |
| Excel 导入服务未落库 | 供应商报价已能本地读取并生成脱敏摘要，但还不能自动写入数据库。 | 下一步生成 `import_batches`、`import_rows`、`supplier_quote_batches`、`supplier_quotes` 样本并写入测试库。 |
| 企业微信登录未接入 | 角色权限还是样本数据，不是真实组织权限。 | 做企业微信自建应用 OAuth、用户表和项目角色绑定。 |
| 真实成本卡覆盖不足 | 不能算真实毛利。 | 先清洗核心菜成本卡，再补克重和损耗。 |

### P1 重要项

| 缺口 | 影响 | 处理方向 |
|---|---|---|
| 菜名/食材映射台未产品化 | 同菜异名、报价品名不一致会导致成本计算漂移。 | v0.8a 已有交互样机；下一步接真实映射表和审批状态。 |
| 质量门禁还没有后端执行器 | UI 有门禁概念，但还不能自动阻断真实发布。 | 把 P0/P1 门禁写成数据库查询和 API 校验。 |
| 审批流未接企业微信消息 | 不能形成运营、厨师长、采购、财务闭环。 | 先做测试消息和审批状态回写。 |
| 菜单生成还未使用真实数据 | 还不能验证 AI 排菜单质量。 | 等报价、成本卡、项目规则可落库后再做算法。 |

## 5. 下一步优先级

### 第 1 优先级：把 v0.8a 前端样机升级为真实供应商报价导入服务

目标：把供应商报价 Excel 从文件变成可追溯的数据库记录，并输出映射缺口报告。

待办：

- [x] 固化 v0.8 Menu Operations Loop 设计规格。
- [x] 发布 v0.8 公开说明页。
- [x] 发布供应商协同预览页，用于外部讨论报价字段、规格标准、锁价锁量和保供能力。
- [x] 发布 v0.8a 供应商新品导入工作台，用样本数据演示报价、新品、时令菜如何进入候选菜单。
- [x] 读取蓝鼎供应商报价 Excel：上海 sheet 939 行，148 行缺价格，55 行缺规格。
- [x] 生成公开脱敏导入摘要：只展示统计、价格区间、缺口和候选物料。
- [x] 保留本地私有原始行 JSON：完整精确报价不提交公开仓库。
- [ ] 生成报价导入样本：`import_batches`、`import_rows`、`supplier_quote_batches`、`supplier_quotes`。
- [x] 输出供应商报价初版缺口报告：缺价格、缺规格、品类覆盖率和导入门禁。
- [ ] 输出供应商报价数据库版缺口报告：缺单位、缺价格、缺税率、缺标准食材映射。
- [ ] 把导入结果写入本机 PostgreSQL smoke test。
- [x] 把真实导入摘要接入 v0.8a 页面。
- [ ] 把 v0.8a 页面里的样本候选队列替换为数据库导入结果。

### 第 2 优先级：执行 v0.8b 成本卡与 SOP 完整性循环

目标：先把真实 Excel 原始行保存下来，不急着让 AI 做判断。

待办：

- [ ] 成本卡导入：菜名、主辅料、调料、克重、损耗、SOP 状态。
- [ ] 菜名映射确认：同菜异名、成本卡名称、周菜单名称统一到标准菜名。
- [ ] SOP 状态标记：approved、draft、missing。
- [ ] 输出成本卡缺口报告：缺成本卡、缺克重、缺损耗、缺 SOP。

### 第 3 优先级：执行 v0.8c 周菜单候选循环

目标：先把周菜单落库，再基于门禁生成候选，不直接发布正式菜单。

待办：

- [ ] 周菜单导入：日期、餐别、档口、菜名、售价、菜品类别。
- [ ] 字段映射表维护：支持同一个 Excel 表头多种叫法。
- [ ] 导入后输出缺口报告：缺标准菜名、缺成本卡、缺报价、缺 SOP。

### 第 4 优先级：建立角色权限和审批闭环

目标：让运营经理、厨师长、采购经理、财务各自只处理自己该负责的数据。

待办：

- [ ] 企业微信自建应用配置。
- [ ] OAuth 登录和用户表绑定。
- [ ] 项目角色绑定：运营、厨师长、采购、财务、管理员。
- [ ] 审批对象：菜单计划、供应商报价、成本卡、质量门禁。
- [ ] 审计日志：记录修改前、修改后、操作者、角色、时间。

### 第 5 优先级：菜单引擎算法

目标：等数据底座稳定后，再让 AI 生成可执行菜单。

待办：

- [ ] 菜品池按餐别和档口拆分。
- [ ] 三个炒菜档口错位陈列，但采购按菜池去重。
- [ ] 菜品重复率、创新率、荤素比、颜色、口味、设备负载约束。
- [ ] 成本率和毛利边界。
- [ ] 输出厨师长确认清单和采购建议清单。

## 6. 暂不做

- 暂不大规模导入所有历史文件。
- 暂不做多项目复制。
- 暂不做完整 AI 推荐算法。
- 暂不做移动端小程序。
- 暂不展示真实毛利。

## 7. 推荐近期里程碑

| 里程碑 | 验收标准 |
|---|---|
| M1 数据库 smoke test | Docker/PostgreSQL 中 schema、seed、smoke 全部通过。 |
| M2 v0.8 循环设计 | 五个运营循环、角色责任、门禁、退出条件公开可 review。 |
| M3 三类 Excel 导入 | 供应商报价、成本卡、周菜单均能进入 import_batches / import_rows。 |
| M4 映射与门禁 | 缺菜名、缺成本、缺报价能自动阻断。 |
| M5 企业微信测试流 | 运营、厨师长、采购、财务能收到并处理测试审批。 |
| M6 华住双周试运行 | 用真实数据生成一周菜单草案和缺口报告。 |

## 8. 当前负责人视角

- 运营经理：项目规则、餐别档口、菜单发布和客户履约。
- 厨师长：标准菜名、SOP、备餐可行性、窗口陈列。
- 采购经理：供应商报价、食材映射、保供风险、锁价锁量。
- 财务/CFO：成本卡、目标成本率、真实毛利、例外审批。
- 系统管理员：数据库、权限、备份、审计、企业微信。
