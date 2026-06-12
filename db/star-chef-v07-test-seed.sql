-- Star Chef - AI Menu Engine v0.7
-- Huazhu pilot seed data for database smoke testing.
-- Run after db/star-chef-v06-schema.sql.

begin;

delete from audit_logs where action like 'v0.7.%';
delete from approvals where comment like 'v0.7%';
delete from project_quality_gate_status
where project_id in (select id from projects where code = 'HZ-JQ-2026');
delete from menu_plan_items
where menu_plan_id in (
  select id from menu_plans
  where project_id in (select id from projects where code = 'HZ-JQ-2026')
    and menu_date = date '2026-06-03'
    and meal_period = 'lunch'
);
delete from menu_plans
where project_id in (select id from projects where code = 'HZ-JQ-2026')
  and menu_date = date '2026-06-03'
  and meal_period = 'lunch';
delete from import_rows
where batch_id in (
  select id from import_batches
  where source_file_name in ('v0.7_huazhu_weekly_menu_seed.xlsx', 'v0.7_landing_supplier_quote_seed.xlsx')
);
delete from import_batches
where source_file_name in ('v0.7_huazhu_weekly_menu_seed.xlsx', 'v0.7_landing_supplier_quote_seed.xlsx');
delete from supplier_quote_batches
where source_file_name = 'v0.7_landing_supplier_quote_seed.xlsx';
delete from recipe_items
where recipe_id in (select id from recipes where version = 'v0.7-test');
delete from recipes where version = 'v0.7-test';
delete from dish_aliases where source_system = 'v0.7 seed';

insert into app_users (wecom_user_id, name, mobile, status) values
('dan.ops', 'Dan Ops', '15719389546', 'active'),
('chef.huazhu', '华住厨师长', '13800000001', 'active'),
('buyer.huazhu', '华住采购经理', '13800000002', 'active'),
('finance.huazhu', '华住财务', '13800000003', 'active'),
('admin.starchef', 'Star Chef 系统管理员', '13800000004', 'active')
on conflict (wecom_user_id) do update set
  name = excluded.name,
  mobile = excluded.mobile,
  status = excluded.status;

insert into user_project_roles (user_id, project_id, role_id, is_primary)
select u.id, p.id, v.role_id, true
from projects p
join (values
  ('dan.ops', 'operations'),
  ('chef.huazhu', 'chef'),
  ('buyer.huazhu', 'procurement'),
  ('finance.huazhu', 'finance'),
  ('admin.starchef', 'admin')
) as v(wecom_user_id, role_id) on true
join app_users u on u.wecom_user_id = v.wecom_user_id
where p.code = 'HZ-JQ-2026'
on conflict (user_id, project_id, role_id) do update set is_primary = excluded.is_primary;

insert into ingredients (standard_name, category, origin, brand, specification, storage_method, shelf_life_days, status) values
('牛肉', '肉禽', '华东', '蓝鼎', '冻品/切块', '冷冻', 180, 'active'),
('拉面', '主食', '上海', '蓝鼎', '2.5kg/袋', '冷藏', 7, 'active'),
('鸡肉', '肉禽', '华东', '蓝鼎', '冻品/块', '冷冻', 180, 'active'),
('虾仁', '水产', '浙江', '蓝鼎', '51/60', '冷冻', 180, 'active'),
('油麦菜', '蔬菜', '上海', '批发市场', '散装', '冷藏', 3, 'active'),
('糯米粉', '主食', '江苏', '蓝鼎', '25kg/袋', '常温', 180, 'active'),
('小龙虾', '水产', '湖北', '蓝鼎', '熟冻', '冷冻', 120, 'active')
on conflict (standard_name) do update set
  category = excluded.category,
  origin = excluded.origin,
  brand = excluded.brand,
  specification = excluded.specification,
  storage_method = excluded.storage_method,
  shelf_life_days = excluded.shelf_life_days,
  status = excluded.status;

insert into dish_aliases (dish_id, source_name, source_system, confidence, status, owner_role_id, approved_by, approved_at)
select d.id, v.source_name, 'v0.7 seed', v.confidence, 'approved', 'chef', u.id, now()
from (values
  ('红烧牛肉拉面', '红烧牛肉拉面', 1.0000),
  ('毛豆香菇炖鸡', '毛豆香菇炖鸡', 0.9800),
  ('香辣小龙虾', '香辣小龙虾', 0.9700),
  ('玉米甜豆炒虾仁', '玉米甜豆炒虾仁', 0.9900),
  ('清炒油麦菜', '清炒油麦菜', 1.0000),
  ('酒酿圆子', '酒酿圆子', 1.0000)
) as v(standard_name, source_name, confidence)
join dishes d on d.standard_name = v.standard_name
join app_users u on u.wecom_user_id = 'chef.huazhu'
on conflict (source_name, source_system) do update set
  dish_id = excluded.dish_id,
  confidence = excluded.confidence,
  status = excluded.status,
  approved_by = excluded.approved_by,
  approved_at = excluded.approved_at;

insert into recipes (dish_id, version, serving_weight_g, yield_loss_rate, sop_status, labor_minutes, equipment_required, status)
select d.id, 'v0.7-test', v.serving_weight_g, v.yield_loss_rate, v.sop_status, v.labor_minutes, v.equipment_required, 'active'
from (values
  ('红烧牛肉拉面', 620::numeric, 0.0800::numeric, 'approved', 6::numeric, array['煮面炉','汤锅']),
  ('毛豆香菇炖鸡', 180::numeric, 0.1200::numeric, 'draft', 12::numeric, array['炒灶']),
  ('香辣小龙虾', 220::numeric, 0.1600::numeric, 'draft', 18::numeric, array['炒灶']),
  ('玉米甜豆炒虾仁', 150::numeric, 0.0800::numeric, 'draft', 8::numeric, array['炒灶']),
  ('清炒油麦菜', 160::numeric, 0.1000::numeric, 'approved', 5::numeric, array['炒灶']),
  ('酒酿圆子', 180::numeric, 0.0200::numeric, 'approved', 5::numeric, array['汤锅'])
) as v(standard_name, serving_weight_g, yield_loss_rate, sop_status, labor_minutes, equipment_required)
join dishes d on d.standard_name = v.standard_name
on conflict (dish_id, version) do update set
  serving_weight_g = excluded.serving_weight_g,
  yield_loss_rate = excluded.yield_loss_rate,
  sop_status = excluded.sop_status,
  labor_minutes = excluded.labor_minutes,
  equipment_required = excluded.equipment_required,
  status = excluded.status;

insert into recipe_items (recipe_id, ingredient_id, item_type, gross_weight_g, net_weight_g, loss_rate)
select r.id, i.id, v.item_type, v.gross_weight_g, v.net_weight_g, v.loss_rate
from (values
  ('红烧牛肉拉面', '牛肉', 'main', 120::numeric, 100::numeric, 0.1600::numeric),
  ('红烧牛肉拉面', '拉面', 'main', 180::numeric, 180::numeric, 0.0000::numeric),
  ('毛豆香菇炖鸡', '鸡肉', 'main', 150::numeric, 132::numeric, 0.1200::numeric),
  ('香辣小龙虾', '小龙虾', 'main', 260::numeric, 218::numeric, 0.1600::numeric),
  ('玉米甜豆炒虾仁', '虾仁', 'main', 70::numeric, 66::numeric, 0.0600::numeric),
  ('清炒油麦菜', '油麦菜', 'main', 190::numeric, 171::numeric, 0.1000::numeric),
  ('酒酿圆子', '糯米粉', 'main', 60::numeric, 60::numeric, 0.0000::numeric)
) as v(standard_name, ingredient_name, item_type, gross_weight_g, net_weight_g, loss_rate)
join dishes d on d.standard_name = v.standard_name
join recipes r on r.dish_id = d.id and r.version = 'v0.7-test'
join ingredients i on i.standard_name = v.ingredient_name;

insert into suppliers (name, contact_name, contact_mobile, payment_terms, status) values
('蓝鼎供应商', '蓝鼎对接人', '13800000005', '月结30天', 'active')
on conflict (name) do update set
  contact_name = excluded.contact_name,
  contact_mobile = excluded.contact_mobile,
  payment_terms = excluded.payment_terms,
  status = excluded.status;

with quote_batch as (
  insert into supplier_quote_batches (project_id, supplier_id, source_file_name, price_period, tax_included, delivery_included, status, imported_by)
  select p.id, s.id, 'v0.7_landing_supplier_quote_seed.xlsx', daterange(date '2026-06-01', date '2026-06-08', '[]'), true, true, 'approved', u.id
  from projects p
  join suppliers s on s.name = '蓝鼎供应商'
  join app_users u on u.wecom_user_id = 'buyer.huazhu'
  where p.code = 'HZ-JQ-2026'
  returning id
)
insert into supplier_quotes (batch_id, ingredient_id, source_item_name, specification, purchase_unit, min_order_qty, unit_price, tax_rate, account_period_days, supply_risk_score, mapping_status, data_issue)
select qb.id, i.id, v.source_item_name, v.specification, v.purchase_unit, v.min_order_qty, v.unit_price, 0.0600, 30, v.supply_risk_score, 'approved', null
from quote_batch qb
join (values
  ('牛肉', '牛肉切块', '冻品/切块', 'kg', 5::numeric, 42.0000::numeric, 2.50::numeric),
  ('拉面', '拉面', '2.5kg/袋', 'kg', 2::numeric, 6.8000::numeric, 1.00::numeric),
  ('鸡肉', '鸡肉块', '冻品/块', 'kg', 5::numeric, 18.0000::numeric, 1.80::numeric),
  ('虾仁', '虾仁', '51/60', 'kg', 3::numeric, 56.0000::numeric, 2.80::numeric),
  ('油麦菜', '油麦菜', '散装', 'kg', 5::numeric, 5.2000::numeric, 1.20::numeric),
  ('糯米粉', '糯米粉', '25kg/袋', 'kg', 25::numeric, 7.6000::numeric, 0.80::numeric),
  ('小龙虾', '小龙虾', '熟冻', 'kg', 3::numeric, 48.0000::numeric, 3.00::numeric)
) as v(ingredient_name, source_item_name, specification, purchase_unit, min_order_qty, unit_price, supply_risk_score)
join ingredients i on i.standard_name = v.ingredient_name;

with menu as (
  insert into menu_plans (project_id, menu_date, meal_period, status, created_by)
  select p.id, date '2026-06-03', 'lunch', 'review', u.id
  from projects p
  join app_users u on u.wecom_user_id = 'dan.ops'
  where p.code = 'HZ-JQ-2026'
  returning id
)
insert into menu_plan_items (menu_plan_id, dish_id, stall_code, dish_category, sale_price, target_cost_rate, estimated_cost, serving_weight_g, innovation_flag, repeat_flag, feasibility_status)
select m.id, d.id, v.stall_code, v.dish_category, v.sale_price, 0.3600, v.estimated_cost, v.serving_weight_g, v.innovation_flag, v.repeat_flag, v.feasibility_status
from menu m
join (values
  ('红烧牛肉拉面', 'noodle', '面档', 26::numeric, 8.60::numeric, 620::numeric, false, false, 'approved'),
  ('香辣小龙虾', 'special', '特色', 28::numeric, 10.20::numeric, 220::numeric, true, false, 'pending'),
  ('毛豆香菇炖鸡', 'stir_fry_1', '大荤', 10::numeric, 4.50::numeric, 180::numeric, false, false, 'pending'),
  ('玉米甜豆炒虾仁', 'stir_fry_2', '小荤', 6::numeric, 2.80::numeric, 150::numeric, false, false, 'pending'),
  ('清炒油麦菜', 'stir_fry_3', '素菜', 3::numeric, 1.05::numeric, 160::numeric, false, false, 'approved'),
  ('酒酿圆子', 'stir_fry_1', '甜品', 3::numeric, 0.95::numeric, 180::numeric, false, false, 'approved')
) as v(standard_name, stall_code, dish_category, sale_price, estimated_cost, serving_weight_g, innovation_flag, repeat_flag, feasibility_status)
join dishes d on d.standard_name = v.standard_name;

with weekly_batch as (
  insert into import_batches (project_id, import_type, source_file_name, source_hash, row_count, status, owner_role_id, imported_by)
  select p.id, 'weekly_menu', 'v0.7_huazhu_weekly_menu_seed.xlsx', 'v07-weekly-menu-seed', 6, 'validated', 'operations', u.id
  from projects p
  join app_users u on u.wecom_user_id = 'dan.ops'
  where p.code = 'HZ-JQ-2026'
  returning id
), quote_import as (
  insert into import_batches (project_id, import_type, source_file_name, source_hash, row_count, status, owner_role_id, imported_by)
  select p.id, 'supplier_quote', 'v0.7_landing_supplier_quote_seed.xlsx', 'v07-supplier-quote-seed', 7, 'approved', 'procurement', u.id
  from projects p
  join app_users u on u.wecom_user_id = 'buyer.huazhu'
  where p.code = 'HZ-JQ-2026'
  returning id
)
insert into import_rows (batch_id, row_number, raw_payload, normalized_payload, validation_status, validation_message)
select weekly_batch.id, v.row_number, v.raw_payload::jsonb, v.normalized_payload::jsonb, 'valid', 'v0.7 seed row accepted'
from weekly_batch
cross join (values
  (1, '{"日期":"2026-06-03","餐别":"午餐","档口":"面档","菜名":"红烧牛肉拉面"}', '{"menu_date":"2026-06-03","meal_period":"lunch","stall_code":"noodle","source_dish_name":"红烧牛肉拉面"}'),
  (2, '{"日期":"2026-06-03","餐别":"午餐","档口":"特色档","菜名":"香辣小龙虾"}', '{"menu_date":"2026-06-03","meal_period":"lunch","stall_code":"special","source_dish_name":"香辣小龙虾"}'),
  (3, '{"日期":"2026-06-03","餐别":"午餐","档口":"炒菜1","菜名":"毛豆香菇炖鸡"}', '{"menu_date":"2026-06-03","meal_period":"lunch","stall_code":"stir_fry_1","source_dish_name":"毛豆香菇炖鸡"}')
) as v(row_number, raw_payload, normalized_payload)
union all
select quote_import.id, v.row_number, v.raw_payload::jsonb, v.normalized_payload::jsonb, 'valid', 'v0.7 seed quote accepted'
from quote_import
cross join (values
  (1, '{"品名":"牛肉切块","单位":"kg","单价":42}', '{"source_item_name":"牛肉切块","purchase_unit":"kg","unit_price":42}'),
  (2, '{"品名":"虾仁","单位":"kg","单价":56}', '{"source_item_name":"虾仁","purchase_unit":"kg","unit_price":56}')
) as v(row_number, raw_payload, normalized_payload);

insert into project_quality_gate_status (project_id, gate_id, status, evidence, updated_by)
select p.id, v.gate_id, v.status, v.evidence::jsonb, u.id
from projects p
join (values
  ('gate_standard_dish_mapping', 'pass', '{"mapped_dishes":6,"note":"v0.7样本菜名已确认"}', 'chef.huazhu'),
  ('gate_cost_card', 'warning', '{"recipes":6,"approved_sop":3,"note":"成本卡可测，但SOP仍需补齐"}', 'finance.huazhu'),
  ('gate_supplier_quote_mapping', 'pass', '{"mapped_quotes":7,"supplier":"蓝鼎供应商"}', 'buyer.huazhu'),
  ('gate_sop_labor', 'blocked', '{"missing_approved_sop":3,"note":"厨师长需补齐SOP与工时"}', 'chef.huazhu'),
  ('gate_contract_rules', 'blocked', '{"missing_fields":["重复率上限","创新率目标"],"note":"合同规则仍未完全字段化"}', 'dan.ops')
) as v(gate_id, status, evidence, updated_by) on true
join app_users u on u.wecom_user_id = v.updated_by
where p.code = 'HZ-JQ-2026'
on conflict (project_id, gate_id) do update set
  status = excluded.status,
  evidence = excluded.evidence,
  updated_by = excluded.updated_by,
  updated_at = now();

insert into approvals (project_id, object_type, object_id, role_id, status, comment, approved_by, approved_at)
select p.id, 'menu_plan', mp.id, 'operations', 'approved', 'v0.7 菜单测试计划进入review状态，允许测试流程继续。', u.id, now()
from projects p
join menu_plans mp on mp.project_id = p.id and mp.menu_date = date '2026-06-03' and mp.meal_period = 'lunch'
join app_users u on u.wecom_user_id = 'dan.ops'
where p.code = 'HZ-JQ-2026'
union all
select p.id, 'quality_gate', null, 'chef', 'blocked', 'v0.7 SOP未完全批准，不能进入自动备餐倒排。', u.id, now()
from projects p
join app_users u on u.wecom_user_id = 'chef.huazhu'
where p.code = 'HZ-JQ-2026';

insert into audit_logs (project_id, actor_user_id, actor_role_id, action, object_type, object_id, before_payload, after_payload)
select p.id, u.id, 'admin', 'v0.7.seed.loaded', 'database_seed', 'star-chef-v07-test-seed.sql', null, '{"status":"loaded","scope":"huazhu pilot"}'::jsonb
from projects p
join app_users u on u.wecom_user_id = 'admin.starchef'
where p.code = 'HZ-JQ-2026'
union all
select p.id, u.id, 'procurement', 'v0.7.quote.mapped', 'supplier_quote_batch', 'v0.7_landing_supplier_quote_seed.xlsx', null, '{"mapped_quotes":7,"supplier":"蓝鼎供应商"}'::jsonb
from projects p
join app_users u on u.wecom_user_id = 'buyer.huazhu'
where p.code = 'HZ-JQ-2026'
union all
select p.id, u.id, 'operations', 'v0.7.menu.reviewed', 'menu_plan', mp.id::text, '{"status":"draft"}'::jsonb, '{"status":"review","items":6}'::jsonb
from projects p
join menu_plans mp on mp.project_id = p.id and mp.menu_date = date '2026-06-03' and mp.meal_period = 'lunch'
join app_users u on u.wecom_user_id = 'dan.ops'
where p.code = 'HZ-JQ-2026';

commit;
