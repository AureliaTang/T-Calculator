import React, { useState } from 'react';
import { Button, Form, Input, Table, Select } from 'antd';
import './index.css';

const { Option } = Select;

const ShareForm = () => {
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

  const columns = providerList.map((item, index) => ({
    title: item,
    dataIndex: item,
    key: index,
  }))

  const obj = {key: '1'};

  const changeColumns = (values) => {
    for (const key of providerList) {
          obj[key] = key;
    }
    const shareMap = []

    const denominator = parseInt(values.evAmount) 
                      + parseInt(values.installAmount) 
                      + parseInt(values.operatorAmount) 
                      + parseInt(values.carAmount)

    shareMap[0] = [values.evProvider, values.evAmount/denominator]
    shareMap[1] = [values.installProvider, values.installAmount/denominator]
    shareMap[2] = [values.operatorProvider, values.operatorAmount/denominator]
    shareMap[3] = [values.carProvider, values.carAmount/denominator]

    const sumMap = {}

    for (let [key, value] of shareMap) {
      if(sumMap.hasOwnProperty(key)) {
        sumMap[key] = sumMap[key] + Math.round(value * 100) / 100
      } else{
        sumMap[key] = Math.round(value * 100) / 100
      }
    }
    setDataSource([sumMap])
  } 


  const onFinish = (values) => {
    setFormData(values)
    changeColumns(values)
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
            <Input placeholder="Install Cost Provider" />
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
            <Input placeholder="Install Cost Amount" />
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
            <Input placeholder="Install Cost Provider" />
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
            <Input placeholder="Install Cost Amount" />
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
        >
          <Input placeholder="Contract Year" />
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
      { 
        dataSource.length !== 0 &&
          <Table 
            pagination={false} 
            dataSource={dataSource} 
            columns={columns}
            style={{
              width: 500,
            }}
          />
      }
    </div>
  </div>
  )
};
export default ShareForm;