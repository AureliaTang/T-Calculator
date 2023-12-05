import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, InputNumber, Space, Flex } from 'antd';
import { useSelector } from 'react-redux';
import userReducer, { initialState } from '../../../reducers/userReducer';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  const userData = useSelector((state) => state.user);
  const [eleRate, setEleRate] = useState(1)
  const [salesRate, setSalesRate] = useState(1)
  const [acRate, setAcRate] = useState(1)
  const [hourRate, setHourRate] = useState(1)


  // console.log("*********")
  // console.log(userData)
  // const [avghour, setHourRate] = useState(1)


  const onChange = (value) => {
    setAcRate(value*0.01)
    console.log('changed', value);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      electricitycost: .25,
      saleprice: .6,
      profit: .35,
      acchargepower: 60,
      averageworkhour: 2,
      totalchargekwh: 120,
      year: 15330,
      // operation: 2,
    },
  ]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'electricity cost',
      dataIndex: 'electricitycost',
      width: '30%',
      editable: true,
    },
    {
      title: 'sale price',
      dataIndex: 'saleprice',
      editable: true,
    },
    {
      title: 'profit',
      dataIndex: 'profit',
      editable: true,
    },
    {
      title: 'ac charge power',
      dataIndex: 'acchargepower',
      width: '30%',
      editable: true,
    },
    {
      title: 'average work hour',
      dataIndex: 'averageworkhour',
      editable: true,
    },
    {
      title: 'totalchargekwh',
      dataIndex: 'totalchargekwh',
      editable: true,
    },
    {
      title: 'averageworkhour',
      dataIndex: 'averageworkhour',
      editable: true,
    },
    {
      title: 'profit/year',
      dataIndex: 'year',
      editable: true,
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];
  const handleAdd = () => {
    const latestData = dataSource[dataSource.length - 1];

    const profit = latestData.saleprice - latestData.electricitycost;
    const year = profit * latestData.totalchargekwh * 365;
    const tpower = year * 1;
    
    const newData = {
      key: count,
      electricitycost: latestData.electricitycost * eleRate.toFixed(2),
      saleprice: latestData.saleprice * salesRate.toFixed(2),
      profit: profit.toFixed(2),
      acchargepower: latestData.acchargepower,
      averageworkhour: latestData.averageworkhour* acRate.toFixed(2), // Assuming you want to keep the original averageworkhour
      totalchargekwh: latestData.acchargepower * acRate * latestData.averageworkhour, // Update this line
      year: year.toFixed(2),
      tpower: tpower.toFixed(2),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleDel = () => {
    setDataSource([...dataSource].slice(0,dataSource.length-1));
    setCount(count - 1);
  }

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // useEffect(() => {
  //   console.log(userData)
  // }, [userData]);

  return (
    <div>
      <div>111{JSON.stringify(userData, null, 2)}222</div>
      <Flex justify="space-between" align="center">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{}}
        >
          Add a row
        </Button>
        <Button
          onClick={handleDel}
          disabled={dataSource.length<=1}
          type="primary"
          style={{
            // marginBottom: 16,
            // marginRight: 12
          }}
        >
          Delete a row
        </Button>
        <Space>
          average work hour ratio
          <InputNumber
            defaultValue={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace('%', '')}
            onChange={onChange}
          />
        </Space>
      </Flex>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
export default App;