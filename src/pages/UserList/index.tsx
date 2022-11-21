/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-20 18:10:44
 */

import React, { useEffect, useRef, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import { Button, Cascader, Form, Input, message, Table } from 'antd';
import { Modal } from 'antd';

import { delUserApi, getUserListApi } from '@/api';
import AddUserModal, { UserItemProps } from '@/components/RegisterModal';
import { filterObject } from '@/utils/filter';

const cityFormate = new DivisionUtil(CityOptions);

const initQuery = {
  size: 10,
  page: 0,
};

const { Item } = Form;
interface QueryProps {
  size: number;
  page: number;
  [key: string]: any;
}

interface TableProps {
  totalCount: number;
  list: [];
}

const AdminList: React.FC = () => {
  const [query, setQuery] = useState<QueryProps>(initQuery);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableProps>({
    list: [],
    totalCount: 0,
  });
  const [modalVisible, setVisible] = useState(false);
  const userRef = useRef({});

  // 获取列表数据
  const getData = async () => {
    const { data } = await getUserListApi(query);
    setTableData(data as TableProps);
  };

  // 删除
  const handleDelUser = (id?: number) => {
    Modal.error({
      title: '确定删除嘛？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      closable: true,
      onOk: async () => {
        const res = await delUserApi({ id });
        message.success(res.msg);
        getData();
      },
    });
  };

  // 表格列
  const columns = [
    { title: '姓名', dataIndex: 'username', width: 100 },
    { title: '手机号', dataIndex: 'userphone', width: 100 },
    { title: '省', dataIndex: 'province', width: 100 },
    { title: '市', dataIndex: 'city', width: 100 },
    { title: '县/区', dataIndex: 'county', width: 100 },

    {
      title: '操作',
      width: 150,
      render: (v: UserItemProps) => {
        return (
          <>
            <Button
              size="middle"
              className="mr-8 rounded-4"
              onClick={() => {
                setVisible(true);
                userRef.current = v;
              }}>
              修改
            </Button>
            <Button
              size="middle"
              className="mr-8 rounded-4"
              onClick={() => handleDelUser(v?.id)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  // 修改分页
  const handlePageChange = (page: number, size: number) => {
    setQuery(({ ...q }) => {
      q.size = size;
      q.page = page - 1;
      return q;
    });
  };

  const handleOnsubmit = async () => {
    const values = await form.getFieldsValue();
    setQuery(({ ...q }) =>
      Object.assign({ page: 0, size: q.size }, filterObject(values))
    );
  };

  const handleOnReset = () => {
    form.resetFields();
    setQuery(initQuery);
  };

  const handleCloseModal = () => {
    setVisible(false);
    userRef.current = {};
  };

  useEffect(() => {
    getData();
  }, [query]);
  return (
    <div className="p-20">
      <div className="rounded-[20px] bg-white p-20">
        <Form form={form} name="horizontal_login" layout="inline">
          <Item name="username" label="用户名">
            <Input
              placeholder="请输入用户名"
              allowClear
              style={{ width: 150 }}
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="userphone" label="手机号">
            <Input
              placeholder="请输入手机号"
              style={{ width: 150 }}
              allowClear
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="province" label="省/直辖市">
            <Input
              placeholder="请输入省份"
              style={{ width: 150 }}
              allowClear
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="city" label="市">
            <Input
              placeholder="请输入市"
              style={{ width: 150 }}
              allowClear
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="county" label="区/县">
            <Input
              placeholder="请输入区/县名"
              style={{ width: 150 }}
              allowClear
              onBlur={handleOnsubmit}
            />
          </Item>

          <Item>
            <Button
              className="rounded-4"
              type="primary"
              onClick={handleOnReset}>
              重置
            </Button>
          </Item>
        </Form>
      </div>
      <div className="mt-20 flex justify-end rounded-[20px] bg-white p-20 ">
        <Button
          className="rounded-4"
          type="primary"
          onClick={() => {
            setVisible(true);
          }}>
          添加用户
        </Button>
      </div>
      <div className="mt-20 rounded-[20px] bg-white p-20">
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={tableData.list}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            current: query.page + 1,
            pageSize: query.size,
            total: tableData.totalCount,
            showTotal: total => `共 ${total} 条结果`,
            onChange: handlePageChange,
          }}
          scroll={{ x: 900, y: 290 }}
        />
      </div>
      <AddUserModal
        visible={modalVisible}
        onClose={handleCloseModal}
        userForm={userRef.current}
        submitcb={() => {
          handleCloseModal();
          getData();
        }}
      />
    </div>
  );
};

export default AdminList;
