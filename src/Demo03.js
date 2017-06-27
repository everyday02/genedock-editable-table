import React, {Component} from 'react';
import {notification, Button} from 'antd';

import EditableFieldTable from './EditableFieldTable';
import {transformColumnsFromGenedock} from './Utils/TableUtils';

class Demo02 extends Component {

  handleTableData() {
    console.info(this.tableInstance.getDataSource());
    notification.open({
      message: 'Table Data',
      description: JSON.stringify(this.tableInstance.getDataSource()),
      style: {
        width: 600,
        marginLeft: 335 - 600
      }
    });
  }

  render() {
    const dataSource = {IT01: 'IT01', IT02: 'IT02', IT03: 'IT03', IT04: 'IT04', IT05: 'IT05'};

    const columns = [{
      id: 'IT01',
      name: 'Test Name',
      type: 'text'
    }, {
      id: 'IT02',
      name: 'Result',
      type: 'float'
    }, {
      id: 'IT03',
      name: 'Units',
      type: 'text',
      codes: [
        {value: 'x10E9/L', name: 'x10E9/L'},
        {value: 'x10E8/L', name: 'x10E8/L'}
      ]
    }, {
      id: 'IT04',
      name: 'Units',
      type: 'date'
    }, {
      id: 'IT05',
      name: 'Units',
      type: 'datetime'
    }];
    /**
      [
        {name: 'IT01', value: 'IT01'},
        {name: 'IT02', value: 'IT02'},
        {name: 'IT03', value: 'IT03'}
      ]
    */
    return (
      <div style={{padding: '20px 100px 20px 100px'}}>
        <Button
          onClick={this.handleTableData.bind(this)}
          type="primary">获取表格所有数据</Button>
        <h1>Editable Table Demo </h1>
        <EditableFieldTable
          ref={(instance) => {
            this.tableInstance = instance;
          }}
          rowKey="name"
          clickRowToEdit
          pagination={false}
          data={dataSource}
          columns={transformColumnsFromGenedock(columns)} />
      </div>
    );
  }
}

export default Demo02;
