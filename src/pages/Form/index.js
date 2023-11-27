import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Cascader, Select, Space} from 'antd';
import './index.css';

const { Option } = Select;

const FormHome = () => {
  // const [evProvider, setEvProvider] = useState(0);
  // const [evAmount, setEvAmount] = useState(0);
  // const [installProvider, setInstallProvider] = useState(0);
  // const [installAmount, setInstallAmount] = useState(0);
  // const [operatorProvider, setOperatorProvider] = useState(0);
  // const [operatorAmount, setOperatorAmount] = useState(0);
  // const [carProvider, setCarProvider] = useState(0);
  // const [carAmount, setCarAmount] = useState(0);
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const providerList = Array.from(new Set([
    formData.evProvider,
    formData.installProvider,
    formData.operatorProvider,
    formData.carProvider,
  ]))

  const obj = {key: '1'};

  const changeColumns = () => {
    for (const key of providerList) {
          obj[key] = key;
    }
    console.log([obj])
    setDataSource([obj])
  } 
  

  // dataSourceList()

  // const dataSource = [
  //   {
  //     key: '1',
  //     T_Power: formData.evProvider,
  //     holderOne: formData.evAmount,
  //     holderTwo: formData.installProvider,
  //   },
  // ];
  // console.log(dataSource)


  const columns = providerList.map(item => ({
    title: item,
    dataIndex: item,
    key: item,  
  }))
  
  // const columns = [
  //   {
  //     title: 'T-Power',
  //     dataIndex: 'T_Power',
  //     key: 'T_Power',
  //   },
  //   {
  //     title: 'Invester One',
  //     dataIndex: 'holderOne',
  //     key: 'holderOne',
  //   },
  //   {
  //     title: 'Invester Two',
  //     dataIndex: 'holderTwo',
  //     key: 'holderTwo',
  //   },
  // ];

  const onFinish = (values) => {
    console.log('Success:', values);
    setFormData(values)
    changeColumns()
    // setEvProvider(values.evProvider)
    // setEvAmount(values.evAmount)
    // setInstallProvider(values.installProvider)
    // setOperatorProvider(values.operatorProvider)
    // setCarProvider(values.carProvider)
    // setCarAmount(values.carAmount)
  };

  return (
  <div className="page">
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 14,
        }}
        wrapperCol={{
          span: 50,
        }}
        style={{
          width: 900,
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
          style={{
            marginBottom: 0,
          }}
          >
          <Form.Item
            name="evProvider"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <Input placeholder="EV Provider" />
          </Form.Item>
          <Form.Item
            name="evAmount"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input placeholder="EV Amount" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Install cost"
          style={{
            marginBottom: 0,
          }}
          >
          <Form.Item
            name="installProvider"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <Input placeholder="EV Provider" />
          </Form.Item>
          <Form.Item
            name="installAmount"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input placeholder="EV Amount" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Operator cost"
          style={{
            marginBottom: 0,
          }}
          >
          <Form.Item
            name="operatorProvider"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <Input placeholder="Operator Provider" />
          </Form.Item>
          <Form.Item
            name="operatorAmount"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input placeholder="EV Amount" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Car Part Rent"
          style={{
            marginBottom: 0,
          }}
          >
          <Form.Item
            name="carProvider"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
            }}
          >
            <Input placeholder="Car Rent Provider" />
          </Form.Item>
          <Form.Item
            name="carAmount"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 8px',
            }}
          >
            <Input placeholder="Car Part Rent Amount" />
          </Form.Item>
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
            offset: 16,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Calculate Share
          </Button>
        </Form.Item>
      </Form>      
    </div>

    <div className="share">
      <Table 
        pagination={false} 
        dataSource={dataSource} 
        columns={columns}
        style={{
          width: 500,
        }}
      />
    </div>
  </div>
  )
};
export default FormHome;