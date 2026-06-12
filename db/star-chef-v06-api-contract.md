# Star Chef v0.6 API Contract

This contract defines the first backend surface for `Star Chef - AI Menu Engine`.
It is written for the Huazhu Jiangqiao pilot and assumes a future PostgreSQL database plus an Enterprise WeChat embedded web app.

## Principles

- Do not calculate real gross margin until P0 gates pass.
- Keep every imported Excel file as an immutable source asset.
- Keep raw rows, normalized rows, mapping decisions, approvals, and audit logs separate.
- Role permissions must come from Enterprise WeChat identity plus `user_project_roles`.
- AI recommendations are advisory. Human approval is required for menu publish, cost-card activation, and procurement generation.

## Authentication

### `GET /api/auth/wecom/callback`

Purpose: Exchange Enterprise WeChat OAuth code for a Star Chef session.

Query:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `code` | string | yes | Enterprise WeChat OAuth code |
| `state` | string | yes | Anti-CSRF and target project context |

Response:

```json
{
  "user": {
    "id": "uuid",
    "wecomUserId": "zhangsan",
    "name": "张三"
  },
  "projects": [
    {
      "projectId": "uuid",
      "projectCode": "HZ-JQ-2026",
      "projectName": "华住项目",
      "roles": ["operations"]
    }
  ]
}
```

## Project Context

### `GET /api/projects/{projectCode}/workspace`

Purpose: Load the project cockpit.

Response:

```json
{
  "project": {
    "code": "HZ-JQ-2026",
    "name": "华住项目",
    "region": "上海江桥",
    "businessModel": "零点 + 自选混合",
    "targetCostRate": 0.36
  },
  "serviceRules": [],
  "qualityGates": [],
  "pendingApprovals": [],
  "readiness": {
    "score": 32,
    "p0BlockedCount": 3
  }
}
```

## Excel Import

### `POST /api/projects/{projectCode}/imports`

Purpose: Upload and register an Excel import batch.

Request: multipart form data

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `importType` | enum | yes | `weekly_menu`, `sale_price_reference`, `cost_card`, `supplier_quote`, `sop` |
| `file` | file | yes | Original Excel file |
| `ownerRoleId` | string | yes | Role responsible for the data |

Response:

```json
{
  "batchId": "uuid",
  "status": "uploaded",
  "sourceFileName": "蓝鼎2026.6.1-6.7周菜单.xlsx"
}
```

### `POST /api/imports/{batchId}/parse`

Purpose: Parse the workbook into raw rows and proposed field mappings.

Response:

```json
{
  "batchId": "uuid",
  "rowCount": 234,
  "status": "mapping_required",
  "headers": ["项目", "日期", "餐别", "档口", "菜名"],
  "mappingSuggestions": [
    {
      "sourceHeader": "菜名",
      "canonicalField": "source_dish_name",
      "confidence": 0.98,
      "required": true
    }
  ]
}
```

### `POST /api/imports/{batchId}/field-mappings`

Purpose: Confirm or override field mappings before validation.

Request:

```json
{
  "mappings": [
    {
      "sourceHeader": "菜名",
      "canonicalField": "source_dish_name",
      "dataType": "text"
    }
  ]
}
```

Response:

```json
{
  "batchId": "uuid",
  "status": "parsed",
  "normalizedRowCount": 234
}
```

## Dish Mapping

### `GET /api/projects/{projectCode}/dish-mappings`

Purpose: List pending source-to-standard dish mappings.

Response:

```json
{
  "items": [
    {
      "mappingId": "uuid",
      "sourceName": "香辣小龙虾",
      "standardName": "香辣小龙虾",
      "category": "特色",
      "confidence": 0.86,
      "ownerRoleId": "procurement",
      "status": "pending",
      "costCardReady": false,
      "supplierQuoteReady": false
    }
  ]
}
```

### `POST /api/dish-mappings/{mappingId}/decision`

Purpose: Approve or reject a dish mapping.

Request:

```json
{
  "decision": "approved",
  "standardDishId": "uuid",
  "comment": "采购确认同名同规格，需补供应商报价映射。"
}
```

Response:

```json
{
  "mappingId": "uuid",
  "status": "approved",
  "auditLogId": "uuid"
}
```

## Quality Gates

### `GET /api/projects/{projectCode}/quality-gates`

Purpose: Return current P0/P1 gate status.

Response:

```json
{
  "gates": [
    {
      "gateId": "gate_cost_card",
      "level": "P0",
      "name": "成本卡命中",
      "status": "blocked",
      "ownerRoleId": "finance",
      "blockingEffect": "阻断真实毛利",
      "evidence": {
        "missingCostCardDishCount": 77
      }
    }
  ]
}
```

### `POST /api/projects/{projectCode}/quality-gates/{gateId}/override-request`

Purpose: Request a controlled exception. P0 override must be approved by operations and finance.

Request:

```json
{
  "reason": "客户临时要求本周先出菜单，但真实毛利不展示，只展示目标成本上限。",
  "expiresAt": "2026-06-20T23:59:59+08:00"
}
```

Response:

```json
{
  "approvalId": "uuid",
  "status": "pending"
}
```

## Menu Planning

### `POST /api/projects/{projectCode}/menu-plans/generate-draft`

Purpose: Generate a draft menu only from validated data.

Request:

```json
{
  "startDate": "2026-06-15",
  "endDate": "2026-06-21",
  "mealPeriods": ["lunch"],
  "mode": "guarded_ai"
}
```

Response when P0 blocked:

```json
{
  "status": "blocked",
  "message": "P0 gates are not clear. Draft generation is not allowed.",
  "blockingGates": ["gate_cost_card", "gate_supplier_quote_mapping"]
}
```

Response when allowed:

```json
{
  "status": "draft_created",
  "menuPlanIds": ["uuid"],
  "reviewRequiredBy": ["operations", "chef", "procurement", "finance"]
}
```

## Approvals

### `POST /api/approvals/{approvalId}/decision`

Request:

```json
{
  "decision": "approved",
  "comment": "厨师长确认可生产。"
}
```

Response:

```json
{
  "approvalId": "uuid",
  "status": "approved",
  "auditLogId": "uuid"
}
```

## Audit

### `GET /api/projects/{projectCode}/audit-logs`

Query:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `objectType` | string | no | Filter by table or workflow object |
| `actorRoleId` | string | no | Filter by role |
| `from` | datetime | no | Start time |
| `to` | datetime | no | End time |

Response:

```json
{
  "items": [
    {
      "createdAt": "2026-06-12T12:00:00+08:00",
      "actor": "采购经理",
      "action": "approve_dish_mapping",
      "objectType": "dish_alias",
      "summary": "确认 香辣小龙虾 -> 香辣小龙虾"
    }
  ]
}
```

## First Implementation Order

1. `GET /api/projects/{projectCode}/workspace`
2. `POST /api/projects/{projectCode}/imports`
3. `POST /api/imports/{batchId}/parse`
4. `POST /api/imports/{batchId}/field-mappings`
5. `GET /api/projects/{projectCode}/dish-mappings`
6. `POST /api/dish-mappings/{mappingId}/decision`
7. `GET /api/projects/{projectCode}/quality-gates`
8. `GET /api/projects/{projectCode}/audit-logs`

Menu generation should wait until the above eight endpoints are stable.
