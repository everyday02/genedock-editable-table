import _ from 'lodash';

function transformTablePropertyByType(property) {
  console.info(property);
  if (_.isArray(property)) {
    return {value: property[0], config: property[1]};
  }
  return {value: property};
}

function transformConfigFromGendock(config) {
  const tansformConfig = {};
  switch (config.type) {
    case 'text':
      tansformConfig.type = 'input';
      if (config.codes) {
        tansformConfig.type = 'select';
        tansformConfig.options = config.codes;
      }
      return tansformConfig;
    case 'interger':
      tansformConfig.type = 'number';
      return tansformConfig;
    case 'float':
      tansformConfig.type = 'number';
      return tansformConfig;
    case 'date':
      tansformConfig.type = 'date';
      return config;
    case 'datetime':
      tansformConfig.type = 'datetime';
      return tansformConfig;
    default:
      return tansformConfig;
  }
}

function transformColumnsFromGenedock(columns) {
  const formatColumns = [];
  for (let i = 0; i < columns.length; i += 1) {
    formatColumns.push({
      key: columns[i].id,
      dataIndex: columns[i].id,
      title: columns[i].name,
      ...columns[i],
      editable: transformConfigFromGendock(columns[i])
    });
  }
  formatColumns.push({
    title: '操作',
    operation: true
  });
  return formatColumns;
}

function transformTableDataFromObject(columns, srcData) {
  const tableData = [];
  for (let i = 0; i < columns.length; i += 1) {
    if (srcData[columns[i].id]) {
      tableData.push({
        name: columns[i].id,
        value: srcData[columns[i].id],
        editable: columns[i].editable
      });
    }
  }
  console.info(tableData);
  return tableData;
}

exports.transformTablePropertyByType = transformTablePropertyByType;
exports.transformConfigFromGendock = transformConfigFromGendock;
exports.transformColumnsFromGenedock = transformColumnsFromGenedock;
exports.transformTableDataFromObject = transformTableDataFromObject;
