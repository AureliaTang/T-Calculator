import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, InputNumber, Space, Flex } from 'antd';
import { useSelector } from 'react-redux';
import './index.css';
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
  // useEffect(() => {
  //   // Implement logic here if needed
  // }, [acRate]);
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
  const [modifiedFirstRow, setModifiedFirstRow] = useState(false)
  const [eleRate, setEleRate] = useState(1)
  const [salesRate, setSalesRate] = useState(1)
  const [acRate, setAcRate] = useState(1)
  const [hourRate, setHourRate] = useState(1)

  const keys = Object.keys(userData["0"] || {});
  // Create dynamic columns
  const dynCol = keys.map((key) => ({
    title: String(key),
    dataIndex: String(key),
    editable: true,
  }));

  const onChange = (value) => {
    if (value !== acRate * 0.01) {
      setAcRate(value * 0.01);
    }
    console.log('changed', value);
  };

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      electricitycost: 0,
      saleprice: 0,
      profit: 0,
      acchargepower: 0,
      averageworkhour: 0,
      totalchargekwh: 0,
      year: 0,
    },
  ]);
  const [count, setCount] = useState(2);

  const implementFirstRow = (originalData) => {
    const profit = originalData.saleprice - originalData.electricitycost;
    const totalchargekwh = originalData.acchargepower * originalData.averageworkhour;
    const year = profit * totalchargekwh * 365;
    const userDataKeys = keys

    return {
      ...originalData,
      profit: profit.toFixed(2),
      totalchargekwh: totalchargekwh.toFixed(2),
      year: year.toFixed(2),
      ...userDataKeys.reduce((acc, key) => {
        acc[key] = (userData["0"][key] * year).toFixed(2);
        return acc;
      }, {}),
    };
  }

  if(dataSource.length === 1 && !modifiedFirstRow) {
    if(dataSource[0].saleprice !==0 
      && dataSource[0].electricitycost !==0
      && dataSource[0].acchargepower !==0
      && dataSource[0].averageworkhour !==0) {
        setModifiedFirstRow(true)
        setDataSource([implementFirstRow(dataSource[0])])
    }
  }

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
  ].concat(dynCol);

  if(userData.length >=1) {
    console.log(Object.keys(userData["0"]))
  }

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
      ...keys.reduce((acc, key) => {
        acc[key] = (userData["0"][key] * year).toFixed(2);
        return acc;
      }, {}),
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

  return (
    <div className='home-page'>
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