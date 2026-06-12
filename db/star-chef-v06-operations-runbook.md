# Star Chef v0.6 Database Operations Runbook

This runbook describes how to buy, deploy, secure, and maintain the first Star Chef database.

## Recommended Purchase

Use Tencent Cloud PostgreSQL for the first production pilot.

| Decision | Recommendation |
| --- | --- |
| Cloud vendor | Tencent Cloud |
| Product | TencentDB for PostgreSQL |
| Region | Shanghai |
| First environment | `starchef-prod-pilot` |
| Database version | PostgreSQL 15 or newer |
| Initial size | 2 vCPU / 4 GB RAM, 50-100 GB storage |
| Network | Private VPC only |
| Public access | Disabled |
| Backup retention | 7-30 days |
| High availability | Enable after the Huazhu pilot confirms production usage |

## Why PostgreSQL

Star Chef needs relational integrity, strong audit records, JSON staging rows, complex menu queries, and future AI retrieval. PostgreSQL handles all of these well. It is a better long-term fit than spreadsheet-only workflows and a safer first choice than a document database.

## Cost Bands

Actual price must be checked on the cloud console before purchase.

| Stage | Monthly Budget | Notes |
| --- | ---: | --- |
| Static prototype | 0 RMB | Current GitHub Pages demo, no database |
| Local development | 0-100 RMB | Local PostgreSQL or a small temporary cloud database |
| Huazhu pilot | 300-1,000 RMB | Cloud PostgreSQL + API server + backups |
| Multi-project production | 1,000-5,000+ RMB | Higher storage, backup, monitoring, high availability |

## Environment Layout

| Environment | Purpose | Access |
| --- | --- | --- |
| `local` | Developer testing | Developer laptop only |
| `staging` | Data import rehearsal and user acceptance | Internal team |
| `prod-pilot` | Huazhu two-week pilot | Enterprise WeChat users only |
| `prod` | Multi-project production | Role-controlled internal users |

Do not let users upload real production Excel files into `local` or static GitHub Pages.

## Security Rules

1. The database must not be open to the public internet.
2. Only the API server should connect to PostgreSQL.
3. Database admin accounts must not be used by the application.
4. Each environment must have a different database password.
5. Excel source files must be stored in object storage, not inside PostgreSQL.
6. Important changes must write to `audit_logs`.
7. P0 gate overrides must require explicit approval and expiry.

## Backup Policy

| Frequency | Action | Owner |
| --- | --- | --- |
| Daily | Automated cloud snapshot | System admin |
| Weekly | Verify one backup can be restored into staging | System admin |
| Monthly | Export schema and review storage growth | System admin + CFO |
| Before schema changes | Manual snapshot | System admin |

## Maintenance Rhythm

### Daily

- Check failed imports.
- Check P0 blocked quality gates.
- Check database CPU, memory, storage, and connection count.
- Check application error logs.

### Weekly

- Review supplier quote import issues.
- Review dish mapping backlog.
- Review slow queries.
- Restore one backup into staging if this is the assigned recovery-test week.

### Monthly

- Review cloud bill.
- Archive old import files.
- Review role permissions.
- Review audit log exceptions.
- Refresh target cost and menu rule assumptions.

## Ownership

| Area | Primary Owner | Backup |
| --- | --- | --- |
| Database instance | System admin | CTO / vendor engineer |
| Project master data | Operations manager | Finance |
| Dish and SOP data | Chef lead | Operations manager |
| Supplier quote data | Procurement manager | Finance |
| Cost card activation | Finance / CFO | Operations manager |
| Enterprise WeChat users | System admin | HR / operations |
| Backup and recovery | System admin | CTO / vendor engineer |

## First Go-Live Checklist

- [ ] Tencent Cloud account and billing are confirmed.
- [ ] VPC and security group are created.
- [ ] PostgreSQL instance is created in Shanghai.
- [ ] Application database user is created with least privilege.
- [ ] Schema from `star-chef-v06-schema.sql` is applied.
- [ ] Staging environment is connected before production.
- [ ] Enterprise WeChat callback domain is configured.
- [ ] Object storage bucket is created for original Excel files.
- [ ] Daily backup policy is enabled.
- [ ] First restore test is completed.
- [ ] Huazhu project roles are assigned.
- [ ] Weekly menu, supplier quote, cost card, and SOP imports are tested.

## What Not To Do

- Do not buy a large database before the Huazhu pilot data flow is proven.
- Do not expose PostgreSQL to public internet for convenience.
- Do not let AI write directly to production tables without human approval.
- Do not calculate real gross margin from unmapped supplier quotes.
- Do not overwrite imported source rows; append corrections and keep audit history.

## v0.7 Entry Criteria

Move to v0.7 only after:

1. The schema is reviewed by operations, chef, procurement, and finance.
2. The first Huazhu Excel import templates are agreed.
3. The cloud vendor and budget are approved.
4. One technical owner is assigned for database setup.
5. Enterprise WeChat app creation permissions are available.
