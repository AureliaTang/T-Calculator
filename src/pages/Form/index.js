import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Cascader, Select, Space} from 'antd';
import './index.css';

const { Option } = Select;


const onFinish = (values) => {
  console.log('Success:', values);

};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const dataSource = [
  {
    key: '1',
    T_Power: '10%',
    holderOne: '30%',
    holderTwo: '60%',
  },
];

const columns = [
  {
    title: 'T-Power',
    dataIndex: 'T_Power',
    key: 'T_Power',
  },
  {
    title: 'Invester One',
    dataIndex: 'holderOne',
    key: 'holderOne',
  },
  {
    title: 'Invester Two',
    dataIndex: 'holderTwo',
    key: 'holderTwo',
  },
];

const selectBefore = (
  <Select defaultValue="tpower">
    <Option value="tpower">T-power</Option>
    <Option value="CompA">Invester One</Option>
    <Option value="CompB">Invester Two</Option>
  </Select>
);

const FormHome = () => {

  return (
  <div className="page">
    <Form
      name="basic"
      labelCol={{
        span: 14,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="EV cost"
        name="evCost"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
       <Input addonBefore={selectBefore} defaultValue='' />
      </Form.Item>

      <Form.Item
        label="Install"
        name="install"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input addonBefore={selectBefore} defaultValue="" />
      </Form.Item>

      <Form.Item
        label="Operator Cost"
        name="operatorCost"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input 
          addonBefore={selectBefore} 
          defaultValue=""
        />
      </Form.Item>

      <Form.Item
        label="Car Part Rent"
        name="carPartRent"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        
        <Input addonBefore={selectBefore} defaultValue="" />
      </Form.Item>

      <Form.Item
        label="Contract Year"
        name="contractYear"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Calculate Share
        </Button>
      </Form.Item>
    </Form>
    <div className="share">
      <Table pagination={false} dataSource={dataSource} columns={columns} />
    </div>
  </div>
  )
};
export default FormHome;