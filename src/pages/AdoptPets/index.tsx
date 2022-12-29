/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-29 22:38:07
 */
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table, Tag } from 'antd';

import { delAdoptApi, queryAdoptListApi } from '@/api';
import { filterObject } from '@/utils/filter';
const { Item } = Form;

const initQuery = {
  size: 10,
  page: 0,
};
interface QueryProps {
  size: number;
  page: number;
  [key: string]: any;
}

interface PetProps {
  province: string;
  city: string;
  county: string;
  name: string;
  phone: string;
  hasexperience: number;
  adoptway: number;
  appointtime: string;
  id: number;
  address: string;
  adoptid: number;
  remark: string;
  isfinish: number;
}

interface TableProps {
  totalCount: number;
  list: PetProps[];
}

const AdoptPets: React.FC = () => {
  const [query, setQuery] = useState<QueryProps>(initQuery);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableProps>({
    list: [],
    totalCount: 0,
  });

  // 修改分页
  const handlePageChange = (page: number, size: number) => {
    setQuery(({ ...q }) => {
      q.size = size;
      q.page = page - 1;
      return q;
    });
  };

  // 获取列表数据
  const getData = async () => {
    const { data } = await queryAdoptListApi(query);

    setTableData(data as TableProps);
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

  // 删除
  const handleDelPets = (id?: number) => {
    Modal.error({
      title: '确定删除嘛？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      closable: true,
      onOk: async () => {
        const res = await delAdoptApi({ id });
        message.success(res.msg);
        getData();
      },
    });
  };

  const columns = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 130,
    },
    { title: '省', dataIndex: 'province', width: 100 },
    { title: '市', dataIndex: 'city', width: 100 },
    { title: '县/区', dataIndex: 'county', width: 100 },
    {
      title: '有无养宠经验',
      width: 150,
      render: (v: PetProps) => {
        return <div>{v?.hasexperience === 1 ? '有' : '无'}</div>;
      },
    },
    {
      title: '领养方式',
      width: 100,
      render: (v: PetProps) => {
        return (
          <div>
            {v?.adoptway === 0 ? (
              <Tag color="magenta">本地自取</Tag>
            ) : (
              <Tag color="geekblue">远程运输</Tag>
            )}
          </div>
        );
      },
    },
    { title: '领养时间', dataIndex: 'appointtime', width: 200 },
    { title: '地址', dataIndex: 'address', width: 150 },
    { title: '备注', dataIndex: 'remark', width: 150 },
    {
      title: '是否领养完成',
      width: 150,
      render: (v: PetProps) => {
        return (
          <div>
            {v?.isfinish === 0 ? (
              <Tag color="orange">未完成</Tag>
            ) : (
              <Tag color="#87d068">已完成</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: '操作',
      width: 150,
      render: (v: PetProps) => {
        return (
          <div className="flex">
            <Button size="middle" className="mr-8 rounded-4">
              修改
            </Button>
            <Button
              size="middle"
              className="mr-8 rounded-4"
              onClick={() => handleDelPets(v?.id)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [query]);
  return (
    <div className="p-20">
      <div className="rounded-[20px] bg-white p-20">
        <Form form={form} name="horizontal_login" layout="inline">
          <Item name="name" label="姓名">
            <Input
              placeholder="请输入姓名"
              allowClear
              style={{ width: 150 }}
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="phone" label="手机号">
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
          scroll={{ x: 900, y: 380 }}
        />
      </div>
    </div>
  );
};

export default AdoptPets;
