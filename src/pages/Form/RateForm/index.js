import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table, InputNumber, Space, Flex } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import userReducer, { initialState } from '../../../reducers/userReducer';
import { LineChart } from '@mui/x-charts/LineChart';

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
  const [modifiedFirstRow, setModifiedFirstRow] = useState(false)
  const [eleRate, setEleRate] = useState(1)
  const [salesRate, setSalesRate] = useState(1)
  const [acRate, setAcRate] = useState(1)
  const [hourRate, setHourRate] = useState(1)
  const dispatch = useDispatch();  // Define dispatch here


  const keys = Object.keys(userData["0"] || {});
  // Create dynamic columns
  const dynCol = keys.map((key) => ({
    title: String(key),
    dataIndex: String(key),
    editable: true,
  }));

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
      title: 'profit/year',
      dataIndex: 'year',
      editable: true,
    },
  ].concat(dynCol);

  const firstRowData = defaultColumns.reduce((acc, current) => {
    acc[current.dataIndex] = 0;
    return acc;
  }, {});

  const [dataSource, setDataSource] = useState([firstRowData]);
  const [dataGraph, setDataGraph] = useState([]);

  const [count, setCount] = useState(2);

  const implementFirstRow = (originalData) => {
    const profit = originalData.saleprice - originalData.electricitycost;
    const totalchargekwh = (originalData.acchargepower) * (originalData.averageworkhour);
    const year = profit * totalchargekwh * 365;
    const userDataKeys = keys

    return {
      ...originalData,
      profit: profit,
      totalchargekwh: totalchargekwh,
      year: year,
      ...userDataKeys.reduce((acc, key) => {
        acc[key] = (userData["0"][key] * year);
        return acc;
      }, {}),
    };
  }

  if(dataSource.length === 1 && !modifiedFirstRow) {
    const isComplete = dataSource[0].saleprice !==0 
    && dataSource[0].electricitycost !==0
    && dataSource[0].acchargepower !==0
    && dataSource[0].averageworkhour !==0

    if (isComplete) {   
      setDataSource([implementFirstRow(dataSource[0])])
      setModifiedFirstRow(true)
      }
  }

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const onChange = (value) => {
    if (value !== acRate * 0.01) {
      setAcRate(value * 0.01);
    }
    console.log('changed', value);
  };

  function transformTableData(tableData) {
    const result = Object.keys(tableData[0])
      .filter((key) => key === 'profit' || key === 'totalchargekwh' )
      .map((key) => ({
        curve: key,
        data: tableData.map((item) => item[key]),
      }));
  
    return result;
  }

  const handleAdd = () => {
    const latestData = dataSource[dataSource.length - 1];
    const profit = latestData.saleprice - latestData.electricitycost;
    const year = profit * latestData.totalchargekwh * 365;
    const tpower = year * 1;
    const newData = {
      key: count,
      electricitycost: parseFloat(parseFloat(latestData.electricitycost * eleRate).toFixed(2)),
      saleprice: parseFloat(parseFloat(latestData.saleprice * salesRate).toFixed(2)),
      profit: parseFloat(parseFloat(profit).toFixed(2)),
      acchargepower: parseFloat(parseFloat(latestData.acchargepower).toFixed(2)),
      averageworkhour: parseFloat(parseFloat(latestData.averageworkhour* acRate).toFixed(2)), // Assuming you want to keep the original averageworkhour
      totalchargekwh: parseFloat(parseFloat(latestData.acchargepower * acRate * latestData.averageworkhour).toFixed(2)), 
      year: parseFloat(parseFloat(year).toFixed(2)),
      tpower: parseFloat(parseFloat(tpower).toFixed(2)),
      ...keys.reduce((acc, key) => {
        acc[key] = parseFloat(parseFloat(userData["0"][key] * year).toFixed(2));
        return acc;
      }, {}),
    };

    setDataSource([...dataSource, newData])
    setDataGraph(transformTableData([...dataSource, newData]))
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
        dispatch,
        dataSource,
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
      <LineChart
        series={dataGraph}
      />
    </div>
  );
};
export default App;