-- Star Chef v0.7 smoke test
-- Run after db/star-chef-v06-schema.sql and db/star-chef-v07-test-seed.sql.

create or replace function assert_min_count(check_name text, count_query text, min_count bigint)
returns void
language plpgsql
as $$
declare
  actual_count bigint;
begin
  execute count_query into actual_count;
  if actual_count < min_count then
    raise exception 'Smoke test failed: %, expected at least %, got %', check_name, min_count, actual_count;
  end if;
  raise notice 'Smoke test passed: % -> % rows', check_name, actual_count;
end;
$$;

select assert_min_count(
  'public core tables',
  $$select count(*) from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'$$,
  24
);

select assert_min_count('Huazhu project', $$select count(*) from projects where code = 'HZ-JQ-2026'$$, 1);
select assert_min_count('five role definitions', $$select count(*) from app_roles where id in ('operations','chef','procurement','finance','admin')$$, 5);
select assert_min_count('Huazhu role assignments', $$select count(*) from user_project_roles upr join projects p on p.id = upr.project_id where p.code = 'HZ-JQ-2026'$$, 5);
select assert_min_count('breakfast lunch dinner service rules', $$select count(distinct meal_period) from project_service_rules r join projects p on p.id = r.project_id where p.code = 'HZ-JQ-2026' and r.meal_period in ('breakfast','lunch','dinner')$$, 3);
select assert_min_count('approved dish aliases', $$select count(*) from dish_aliases where source_system = 'v0.7 seed' and status = 'approved'$$, 6);
select assert_min_count('ingredients', $$select count(*) from ingredients where standard_name in ('牛肉','拉面','鸡肉','虾仁','油麦菜','糯米粉','小龙虾')$$, 7);
select assert_min_count('recipes and recipe items', $$select count(*) from recipes r join recipe_items ri on ri.recipe_id = r.id where r.version = 'v0.7-test'$$, 7);
select assert_min_count('supplier quote rows', $$select count(*) from supplier_quotes sq join supplier_quote_batches b on b.id = sq.batch_id where b.source_file_name = 'v0.7_landing_supplier_quote_seed.xlsx'$$, 7);
select assert_min_count('import raw rows preserved', $$select count(*) from import_rows ir join import_batches ib on ib.id = ir.batch_id where ib.source_file_name like 'v0.7_%' and ir.raw_payload <> '{}'::jsonb$$, 5);
select assert_min_count('lunch menu items', $$select count(*) from menu_plan_items mpi join menu_plans mp on mp.id = mpi.menu_plan_id join projects p on p.id = mp.project_id where p.code = 'HZ-JQ-2026' and mp.menu_date = date '2026-06-03' and mp.meal_period = 'lunch'$$, 6);
select assert_min_count('quality gates', $$select count(*) from quality_gates$$, 5);
select assert_min_count('audit logs', $$select count(*) from audit_logs where action like 'v0.7.%'$$, 3);

do $$
declare
  blocked_gate_count integer;
  free_rice_soup_count integer;
  mapped_quote_count integer;
begin
  select count(*)
  into blocked_gate_count
  from project_quality_gate_status s
  join quality_gates q on q.id = s.gate_id
  join projects p on p.id = s.project_id
  where p.code = 'HZ-JQ-2026'
    and q.level in ('P0','P1')
    and s.status = 'blocked';

  if blocked_gate_count < 1 then
    raise exception 'Smoke test failed: quality gate blocking state must exist before production launch';
  end if;

  select count(*)
  into free_rice_soup_count
  from project_service_rules r
  join projects p on p.id = r.project_id
  where p.code = 'HZ-JQ-2026'
    and r.stall_code = 'rice_soup'
    and r.is_free_rice_soup = true;

  if free_rice_soup_count <> 1 then
    raise exception 'Smoke test failed: free rice/soup cost rule missing';
  end if;

  select count(*)
  into mapped_quote_count
  from supplier_quotes
  where mapping_status = 'approved'
    and ingredient_id is not null;

  if mapped_quote_count < 7 then
    raise exception 'Smoke test failed: supplier quote ingredient mapping is incomplete';
  end if;

  raise notice 'Smoke test passed: business gates, free rice/soup rule, and supplier mappings are testable.';
end;
$$;

drop function assert_min_count(text, text, bigint);
