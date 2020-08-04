import {Table} from 'antd';
import React from 'react';

const data = [
  {a: 1, b: 2, c: 3},
  {a: 2, b: 3, c: 4},
  {a: 3, b: 4, c: 5}
];

export function App() {
  return (
    <Table rowSelection={{type: 'checkbox', onChange: (values) => console.log(values)}} dataSource={data}>
      <Table.Column key="a" dataIndex="a" />
      <Table.Column key="b" dataIndex="b" />
      <Table.Column key="c" dataIndex="c" />
    </Table>
  )
};
