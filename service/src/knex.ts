import knex from 'knex';

knex.QueryBuilder.extend(
  'page',
  async function (page: number = 1, pageSize: number = 10): Promise<any> {
    const offset = (page - 1) * pageSize;
    const rows = await this.offset(offset).limit(pageSize);
    const total = await this.clearSelect().count('* as count').first();
    return {
      rows,
      total: total.count,
      page: Number(page),
      pageSize: Number(pageSize),
      pageCount: Math.ceil(total.count / (pageSize || 1)),
    };
  }
);
knex.QueryBuilder.extend('findOne', function () {
  return this.first();
});
knex.QueryBuilder.extend('find', function (num?: number) {
  if (num && num > 0) return this.limit(num);
  return this;
});

knex.QueryBuilder.extend('orderby', function (order: string) {
  return this.orderByRaw(order);
});
knex.QueryBuilder.extend('groupby', function (group: string) {
  return this.groupByRaw(group);
});
knex.QueryBuilder.extend(
  'value',
  async function (field?: string): Promise<any> {
    const data = await this.first();
    const row = data || {};
    const _field = field || Object.keys(row)[0];
    return row[_field];
  }
);
knex.QueryBuilder.extend('_where', function (...args) {
  const ifHave = args[3];
  if (!ifHave) return this.where(args[0], args[1], args[2]);
  const value = args[2];
  if (value !== null && typeof value !== 'undefined' && String(value))
    return this.where(args[0], args[1] || '=', args[2]);
  return this;
});

export default knex;
