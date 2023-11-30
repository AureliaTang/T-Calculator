import React, { useState } from 'react';
import { Button, Form, Input, Table, Select, Row, Col } from 'antd';
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
    console.log(values)
    totalIncome(values.power,values.year)
    setFormData(values)
    changeColumns(values)
  };

  const calculateSum = y => {
    return y === 1 ? 1 : calculateSum(y - 1) * 1.05 + 1;
  };

  const totalIncome = (p, y) => {
      let totalIncome = 0;

      if (calculateSum(y) === 1) {
          totalIncome = (0.35 * 365 * 2) * p * y;
      } else if (y > 1) {
          for (let i = 0; i < y; i++) {
              totalIncome += (0.35 * 365 * 2) * p * calculateSum(y);
          }
      }

      console.log(totalIncome);
  };

  // Example usage
  // totalIncome(100, 3);


  return (
  <div className="rate-page">
    <Form
      name="basic"
      labelCol={{
        // span: 14,
      }}
      wrapperCol={{
        offset: 2,
      }}
      style={{
        width: 900,
        margin: 'auto',
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    <Form.Item>
      <Form.Item
        label="AC Charge Power"
        name="power"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: '150',
        }}
      >
        <Input placeholder="Power" />
      </Form.Item>
      <Form.Item
        label="Year"
        name="year"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: '150',
          margin: '0 8px',
        }}
        >
          <Input placeholder="Year" />
        </Form.Item>
        <Form.Item
          style={{
            display: 'inline-block',
            width: '100',
          }}
          >
          <Button type="primary" htmlType="submit">
            Calculate Share
          </Button>
        </Form.Item>
      </Form.Item>

    </Form>      

    {/* <div className="share">
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
    </div> */}
  </div>
  )
};
export default ShareForm;