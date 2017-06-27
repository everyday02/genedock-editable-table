import React, {Component} from 'react';
import {Table, Popconfirm, Button, Icon} from 'antd';
import InputTableCell from './CellTypes/InputTableCell';
import DateTableCell from './CellTypes/DateTableCell';
import SelectTableCell from './CellTypes/SelectTableCell';
import NumberTableCell from './CellTypes/NumberTableCell';
import RateTableCell from './CellTypes/RateTableCell';
import SliderTableCell from './CellTypes/SliderTableCell';
import {transformTableDataFromObject} from './Utils/TableUtils';

class EditableFieldTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: null,
      editIndex: -1,
      data: props.data,
      tableData: transformTableDataFromObject(props.columns, props.data),
      editable: false,
      columns: props.columns,
      tableColumns: this.generateTableColumns()
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    this.state = {data};
  }

  handleChange(key, index, value) {
    const {data, tableData} = this.state;
    const {onRowSave} = this.props;

    data[tableData[index].name] = value;
    tableData[index].value = value;

    if (onRowSave) onRowSave(data);

    this.setState({data, tableData, editable: false});
  }

  handleSaveAll() {
    const {data} = this.state;
    const {onAllSave} = this.props;

    if (onAllSave) onAllSave(data);
  }

  edit(index) {
    this.setState({editIndex: index, editable: true});
  }

  editDone(index, action) {
    this.setState({
      editIndex: index,
      status: action
    });
  }

  getDataSource() {
    const {data} = this.state;
    return data;
  }

  render() {
    const props = {...this.props};
    const {tableData, tableColumns} = this.state;
    console.info(tableData);
    props.onRowClick = this.wrapperRowClick();

    return (
      <Table
        {...props}
        dataSource={tableData}
        columns={this.wrapperColumnsRender(tableColumns)} />
    );
  }


  generateTableColumns() {
    const tableColumns = [];
    tableColumns.push({
      key: 'name',
      title: '属性名',
      width: '30%',
      dataIndex: 'name'
    });
    tableColumns.push({
      key: 'value',
      title: '属性值',
      width: '50%',
      dataIndex: 'value'
    });
    tableColumns.push({
      title: '操作',
      width: '20%',
      operation: true
    });
    return tableColumns;
  }

  wrapperRowClick() {
    const {clickRowToEdit} = this.props;
    if (clickRowToEdit) {
      return (record, index) => {
        this.edit(index);
        if (this.props.onRowClick) this.props.onRowClick(record, index);
      };
    }
    return null;
  }

  wrapperColumnsRender(columns) {
    columns.map((item) => {
      if (item.operation) {
        item.render = (text, record, index) => this.operationRender(this.state.data, text, record, index);
        return item;
      }
      if (!item.render) {
        item.render = (text, record, index) => this.renderColumns(this.state.data, index, item.dataIndex, text, record.editable || {});
      }
      return item;
    });
    return columns;
  }

  renderColumns(data, index, key, text, config) {
    const {status, editIndex} = this.state;
    if (key === 'name') return <div>{text}</div>;
    if (editIndex !== index) return <div>{text}</div>;
    if (!this.state.editable) return <div>{text}</div>;
    switch (config.type) {
      case 'date':
        return (
          <DateTableCell
            value={text}
            config={config}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
            />);
      case 'datetime':
        return (<DateTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      case 'datemonth':
        return (<DateTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      case 'select':
        return (<SelectTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      case 'number':
        return (<NumberTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      case 'rate':
        return (<RateTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      case 'slider':
        return (<SliderTableCell
          value={text}
          config={config}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
          />);
      default:
        return (
          <InputTableCell
            value={text}
            config={config}
            onChange={value => this.handleChange(key, index, value)}
            status={status}
            />);
    }
  }

  operationRender(data, text, record, index) {
    const {editable, editIndex} = this.state;
    return (
      <div className="editable-row-operations" onClick={(e) => {e.stopPropagation();}}>
        {
          (editable && (editIndex === index)) ?
            <span>
              <Button
                onClick={() => this.editDone(index, 'save')}
                size="small"
                style={{marginRight: 8}}
                type="primary">保存</Button>
              <Popconfirm title="确认取消吗?" onConfirm={() => this.editDone(index, 'cancel')}>
                <Button size="small" type="info">取消</Button>
              </Popconfirm>
            </span>
            :
            <a>
              <Icon
                style={{fontSize: 18, color: '#007087'}}
                type="edit" onClick={() => this.edit(index)} />
            </a>
        }
      </div>
    );
  }

}

export default EditableFieldTable;
