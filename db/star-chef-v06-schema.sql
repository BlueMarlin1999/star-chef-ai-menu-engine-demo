-- Star Chef - AI Menu Engine v0.6
-- PostgreSQL database foundation for the Huazhu pilot.
-- Target cloud: Tencent Cloud PostgreSQL, Shanghai region.
-- Scope: schema, constraints, indexes, and seed data. Not a live database connection.

create extension if not exists pgcrypto;

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  legal_name text,
  created_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  code text not null unique,
  name text not null,
  region text not null,
  address text,
  business_model text not null,
  launch_mode text not null,
  target_cost_rate numeric(5,4) not null check (target_cost_rate > 0 and target_cost_rate < 1),
  status text not null default 'pilot' check (status in ('draft','pilot','active','paused','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table app_roles (
  id text primary key,
  name text not null unique,
  owner_scope text not null,
  can_edit text[] not null default '{}',
  must_approve text[] not null default '{}',
  blocked_from text[] not null default '{}'
);

create table app_users (
  id uuid primary key default gen_random_uuid(),
  wecom_user_id text unique,
  name text not null,
  mobile text,
  status text not null default 'active' check (status in ('active','disabled')),
  created_at timestamptz not null default now()
);

create table user_project_roles (
  user_id uuid not null references app_users(id),
  project_id uuid not null references projects(id),
  role_id text not null references app_roles(id),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, project_id, role_id)
);

create table project_service_rules (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  meal_period text not null check (meal_period in ('breakfast','lunch','dinner','night_meal','late_snack')),
  service_mode text not null check (service_mode in ('set_meal','a_la_carte','self_select','mixed')),
  stall_code text not null,
  stall_name text not null,
  is_open boolean not null default true,
  open_rule text not null,
  target_sku_count integer check (target_sku_count is null or target_sku_count >= 0),
  is_free_rice_soup boolean not null default false,
  created_at timestamptz not null default now(),
  unique (project_id, meal_period, stall_code)
);

create table dishes (
  id uuid primary key default gen_random_uuid(),
  standard_name text not null unique,
  category text not null,
  cuisine text,
  flavor_tags text[] not null default '{}',
  allergen_tags text[] not null default '{}',
  cooking_method text,
  default_sale_price numeric(10,2),
  popularity_score numeric(5,2),
  status text not null default 'active' check (status in ('draft','active','paused','retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table dish_aliases (
  id uuid primary key default gen_random_uuid(),
  dish_id uuid not null references dishes(id),
  source_name text not null,
  source_system text not null,
  confidence numeric(5,4) not null check (confidence >= 0 and confidence <= 1),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  owner_role_id text not null references app_roles(id),
  approved_by uuid references app_users(id),
  approved_at timestamptz,
  unique (source_name, source_system)
);

create table ingredients (
  id uuid primary key default gen_random_uuid(),
  standard_name text not null unique,
  category text not null,
  origin text,
  brand text,
  specification text,
  storage_method text,
  shelf_life_days integer check (shelf_life_days is null or shelf_life_days >= 0),
  status text not null default 'active' check (status in ('draft','active','paused','retired')),
  created_at timestamptz not null default now()
);

create table recipes (
  id uuid primary key default gen_random_uuid(),
  dish_id uuid not null references dishes(id),
  version text not null,
  serving_weight_g numeric(10,2),
  yield_loss_rate numeric(5,4) check (yield_loss_rate is null or (yield_loss_rate >= 0 and yield_loss_rate < 1)),
  sop_status text not null default 'missing' check (sop_status in ('missing','draft','approved')),
  labor_minutes numeric(10,2),
  equipment_required text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','active','retired')),
  created_at timestamptz not null default now(),
  unique (dish_id, version)
);

create table recipe_items (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  ingredient_id uuid not null references ingredients(id),
  item_type text not null check (item_type in ('main','secondary','seasoning')),
  gross_weight_g numeric(10,2) not null check (gross_weight_g >= 0),
  net_weight_g numeric(10,2) check (net_weight_g is null or net_weight_g >= 0),
  loss_rate numeric(5,4) check (loss_rate is null or (loss_rate >= 0 and loss_rate < 1))
);

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  contact_name text,
  contact_mobile text,
  payment_terms text,
  status text not null default 'active' check (status in ('active','paused','blacklisted')),
  created_at timestamptz not null default now()
);

create table supplier_quote_batches (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  supplier_id uuid references suppliers(id),
  source_file_name text not null,
  price_period daterange,
  tax_included boolean not null default true,
  delivery_included boolean not null default true,
  status text not null default 'imported' check (status in ('imported','mapping_required','approved','rejected')),
  imported_by uuid references app_users(id),
  imported_at timestamptz not null default now()
);

create table supplier_quotes (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references supplier_quote_batches(id) on delete cascade,
  ingredient_id uuid references ingredients(id),
  source_item_name text not null,
  specification text,
  purchase_unit text not null,
  min_order_qty numeric(12,3),
  unit_price numeric(12,4) not null check (unit_price >= 0),
  tax_rate numeric(6,4),
  account_period_days integer,
  supply_risk_score numeric(5,2),
  mapping_status text not null default 'pending' check (mapping_status in ('pending','approved','rejected')),
  data_issue text
);

create table import_batches (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  import_type text not null check (import_type in ('weekly_menu','sale_price_reference','cost_card','supplier_quote','sop')),
  source_file_name text not null,
  source_hash text,
  row_count integer not null default 0 check (row_count >= 0),
  status text not null default 'uploaded' check (status in ('uploaded','parsed','mapping_required','validated','blocked','approved')),
  owner_role_id text not null references app_roles(id),
  imported_by uuid references app_users(id),
  imported_at timestamptz not null default now()
);

create table import_rows (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references import_batches(id) on delete cascade,
  row_number integer not null,
  raw_payload jsonb not null,
  normalized_payload jsonb not null default '{}'::jsonb,
  validation_status text not null default 'pending' check (validation_status in ('pending','valid','warning','blocked')),
  validation_message text,
  unique (batch_id, row_number)
);

create table field_mappings (
  id uuid primary key default gen_random_uuid(),
  import_type text not null,
  source_header text not null,
  canonical_field text not null,
  data_type text not null check (data_type in ('text','number','date','boolean','json')),
  is_required boolean not null default false,
  owner_role_id text not null references app_roles(id),
  status text not null default 'active' check (status in ('active','retired')),
  unique (import_type, source_header)
);

create table menu_plans (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  menu_date date not null,
  meal_period text not null,
  status text not null default 'draft' check (status in ('draft','review','approved','published','locked')),
  created_by uuid references app_users(id),
  created_at timestamptz not null default now(),
  unique (project_id, menu_date, meal_period)
);

create table menu_plan_items (
  id uuid primary key default gen_random_uuid(),
  menu_plan_id uuid not null references menu_plans(id) on delete cascade,
  dish_id uuid not null references dishes(id),
  stall_code text not null,
  dish_category text not null,
  sale_price numeric(10,2),
  target_cost_rate numeric(5,4),
  estimated_cost numeric(10,2),
  serving_weight_g numeric(10,2),
  innovation_flag boolean not null default false,
  repeat_flag boolean not null default false,
  feasibility_status text not null default 'pending' check (feasibility_status in ('pending','approved','blocked')),
  unique (menu_plan_id, dish_id, stall_code)
);

create table quality_gates (
  id text primary key,
  level text not null check (level in ('P0','P1','P2')),
  name text not null,
  rule text not null,
  owner_role_id text not null references app_roles(id),
  blocking_effect text not null
);

create table project_quality_gate_status (
  project_id uuid not null references projects(id),
  gate_id text not null references quality_gates(id),
  status text not null default 'blocked' check (status in ('pass','warning','blocked')),
  evidence jsonb not null default '{}'::jsonb,
  updated_by uuid references app_users(id),
  updated_at timestamptz not null default now(),
  primary key (project_id, gate_id)
);

create table approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  object_type text not null check (object_type in ('import_batch','dish_alias','menu_plan','cost_card','supplier_quote','quality_gate')),
  object_id uuid,
  role_id text not null references app_roles(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected','blocked')),
  comment text,
  approved_by uuid references app_users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table file_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  file_name text not null,
  file_type text not null,
  storage_uri text not null,
  sha256 text,
  uploaded_by uuid references app_users(id),
  uploaded_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  actor_user_id uuid references app_users(id),
  actor_role_id text references app_roles(id),
  action text not null,
  object_type text not null,
  object_id text,
  before_payload jsonb,
  after_payload jsonb,
  created_at timestamptz not null default now()
);

create index idx_projects_org on projects(organization_id);
create index idx_dish_alias_source on dish_aliases(source_name);
create index idx_import_batches_project_type on import_batches(project_id, import_type, status);
create index idx_import_rows_payload on import_rows using gin(raw_payload);
create index idx_supplier_quotes_ingredient on supplier_quotes(ingredient_id, mapping_status);
create index idx_menu_plans_project_date on menu_plans(project_id, menu_date, meal_period);
create index idx_menu_items_dish on menu_plan_items(dish_id);
create index idx_audit_project_time on audit_logs(project_id, created_at desc);

insert into organizations (name, legal_name)
values ('Star Kitchen', '星座厨房')
on conflict (name) do nothing;

insert into app_roles (id, name, owner_scope, can_edit, must_approve, blocked_from) values
('operations', '运营经理', '项目经营负责人', array['项目主档','餐别档口规则','周菜单草案','目标成本率'], array['周菜单发布','数据缺口放行','企业微信确认任务'], array['直接修改成本卡生效值','绕过采购确认生成正式采购单']),
('chef', '厨师长', '出品与生产负责人', array['菜品可做性','SOP 工时','窗口陈列','备餐份数'], array['可生产性','替代菜','关闭档口不生成任务'], array['修改合同餐标','修改财务目标成本率']),
('procurement', '采购经理', '供应链负责人', array['供应商报价','食材映射','锁价锁量','替代食材'], array['采购清单','缺报价项','保供风险'], array['发布菜单','修改菜品售价']),
('finance', '财务/CFO', '成本与利润负责人', array['成本率目标','成本卡审核','费用参数','毛利口径'], array['真实毛利计算口径','成本卡生效','项目损益看板'], array['绕过厨师长发布不可生产菜单','绕过采购确认报价']),
('admin', '系统管理员', '系统与数据安全负责人', array['用户权限','字段映射','系统参数','备份策略'], array['权限变更','生产发布'], array['代替业务角色确认菜单'])
on conflict (id) do update set
  name = excluded.name,
  owner_scope = excluded.owner_scope,
  can_edit = excluded.can_edit,
  must_approve = excluded.must_approve,
  blocked_from = excluded.blocked_from;

insert into projects (organization_id, code, name, region, address, business_model, launch_mode, target_cost_rate)
select id, 'HZ-JQ-2026', '华住项目', '上海江桥', '上海市嘉定区江桥', '零点 + 自选混合', '单项目双周试运行', 0.36
from organizations
where name = 'Star Kitchen'
on conflict (code) do update set
  name = excluded.name,
  region = excluded.region,
  business_model = excluded.business_model,
  launch_mode = excluded.launch_mode,
  target_cost_rate = excluded.target_cost_rate;

insert into project_service_rules (project_id, meal_period, service_mode, stall_code, stall_name, is_open, open_rule, target_sku_count, is_free_rice_soup)
select p.id, v.meal_period, v.service_mode, v.stall_code, v.stall_name, v.is_open, v.open_rule, v.target_sku_count, v.is_free_rice_soup
from projects p
cross join (values
  ('breakfast','mixed','noodle','面档',true,'早餐只开一个面档，早餐 SKU 池管理。',20,false),
  ('lunch','mixed','noodle','面档',true,'午餐面档、特色档和三个炒菜档齐开。',null,false),
  ('lunch','mixed','special','特色档',true,'特色档独立生成，避免与炒菜档重复。',null,false),
  ('lunch','mixed','stir_fry_1','炒菜1',true,'三个炒菜窗口错位陈列，采购按菜池去重。',12,false),
  ('lunch','mixed','stir_fry_2','炒菜2',true,'三个炒菜窗口价格一致，选品错位。',12,false),
  ('lunch','mixed','stir_fry_3','炒菜3',true,'三个炒菜窗口价格一致，选品错位。',12,false),
  ('dinner','mixed','noodle','面档',true,'晚餐只开面档和一个炒菜档口。',null,false),
  ('dinner','mixed','stir_fry_1','炒菜1',true,'晚餐只开一个炒菜窗口，不做三窗口错位。',12,false),
  ('lunch','mixed','rice_soup','米饭汤品',true,'米饭和汤免费自取，但成本必须进入项目核算。',null,true)
) as v(meal_period, service_mode, stall_code, stall_name, is_open, open_rule, target_sku_count, is_free_rice_soup)
where p.code = 'HZ-JQ-2026'
on conflict (project_id, meal_period, stall_code) do update set
  service_mode = excluded.service_mode,
  stall_name = excluded.stall_name,
  is_open = excluded.is_open,
  open_rule = excluded.open_rule,
  target_sku_count = excluded.target_sku_count,
  is_free_rice_soup = excluded.is_free_rice_soup;

insert into quality_gates (id, level, name, rule, owner_role_id, blocking_effect) values
('gate_standard_dish_mapping','P0','标准菜名映射','Top 菜必须完成标准菜名确认。','chef','阻断真实毛利、采购去重和 SOP 匹配'),
('gate_cost_card','P0','成本卡命中','售价、成本卡、克重齐全后才允许计算真实毛利。','finance','阻断真实毛利'),
('gate_supplier_quote_mapping','P0','供应商报价映射','成本卡食材名必须映射到报价单标准食材。','procurement','阻断采购建议和成本刷新'),
('gate_sop_labor','P1','SOP 与工时','核心菜需要 SOP、人工干预时间和设备约束。','chef','阻断自动备餐倒排'),
('gate_contract_rules','P1','合同规则字段化','重复率、创新率、菜数、餐标必须结构化。','operations','阻断自动排菜单')
on conflict (id) do update set
  level = excluded.level,
  name = excluded.name,
  rule = excluded.rule,
  owner_role_id = excluded.owner_role_id,
  blocking_effect = excluded.blocking_effect;

insert into dishes (standard_name, category, cuisine, flavor_tags, cooking_method, default_sale_price, status) values
('毛豆香菇炖鸡','大荤','中式快餐',array['家常','咸鲜'],'炖',10,'active'),
('红烧牛肉拉面','面档','面点',array['红烧','咸鲜'],'煮',26,'active'),
('香辣小龙虾','特色','中式快餐',array['香辣','高客单'],'炒',28,'active'),
('玉米甜豆炒虾仁','小荤','中式快餐',array['清爽','鲜甜'],'炒',6,'active'),
('清炒油麦菜','素菜','中式快餐',array['清淡'],'炒',3,'active'),
('酒酿圆子','主食/甜品','甜品',array['甜','温热'],'煮',3,'active')
on conflict (standard_name) do update set
  category = excluded.category,
  cuisine = excluded.cuisine,
  flavor_tags = excluded.flavor_tags,
  cooking_method = excluded.cooking_method,
  default_sale_price = excluded.default_sale_price,
  status = excluded.status;

insert into field_mappings (import_type, source_header, canonical_field, data_type, is_required, owner_role_id) values
('weekly_menu','项目','project_name','text',true,'operations'),
('weekly_menu','日期','menu_date','date',true,'operations'),
('weekly_menu','餐别','meal_period','text',true,'operations'),
('weekly_menu','档口','stall_code','text',true,'operations'),
('weekly_menu','菜名','source_dish_name','text',true,'chef'),
('sale_price_reference','菜名','source_dish_name','text',true,'operations'),
('sale_price_reference','售价','sale_price','number',true,'operations'),
('cost_card','菜名','source_dish_name','text',true,'finance'),
('cost_card','主料','main_ingredient_name','text',true,'finance'),
('cost_card','克重','gross_weight_g','number',true,'finance'),
('supplier_quote','品名','source_item_name','text',true,'procurement'),
('supplier_quote','规格','specification','text',false,'procurement'),
('supplier_quote','单位','purchase_unit','text',true,'procurement'),
('supplier_quote','单价','unit_price','number',true,'procurement')
on conflict (import_type, source_header) do update set
  canonical_field = excluded.canonical_field,
  data_type = excluded.data_type,
  is_required = excluded.is_required,
  owner_role_id = excluded.owner_role_id,
  status = 'active';
