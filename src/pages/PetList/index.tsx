/*
 * @Author: shanzhilin
 * @Date: 2022-11-06 14:44:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-27 22:04:08
 */
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table } from 'antd';

import { delPetsApi, getPetsManageListApi } from '@/api';
import CreatePetModal from '@/components/CreatePetModal';
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

interface TableProps {
  totalCount: number;
  list: [];
}
const PetList: React.FC = () => {
  const [query, setQuery] = useState<QueryProps>(initQuery);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<TableProps>({
    list: [],
    totalCount: 0,
  });
  const [visible, setVisible] = useState(false);

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
    const { data } = await getPetsManageListApi(query);
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
        const res = await delPetsApi({ id });
        message.success(res.msg);
        getData();
      },
    });
  };

  const columns = [
    { title: '品种', dataIndex: 'variety', width: 100 },
    {
      title: '图片',
      width: 150,
      render: (v: any) => {
        return (
          <img
            src={v?.petpics}
            style={{ width: '100px', height: '100px', objectFit: 'contain' }}
          />
        );
      },
    },
    { title: '省', dataIndex: 'province', width: 100 },
    { title: '市', dataIndex: 'city', width: 100 },
    { title: '县/区', dataIndex: 'county', width: 100 },
    { title: '关注度', dataIndex: 'attention', width: 100 },
    { title: '描述', dataIndex: 'description', width: 400 },
    { title: '发现时间', dataIndex: 'createtime', width: 200 },
    { title: '联系人', dataIndex: 'contact', width: 100 },
    { title: '联系电话', dataIndex: 'contactphone', width: 150 },
    {
      title: '操作',
      width: 150,
      render: (v: any) => {
        return (
          <div className="flex">
            <Button size="middle" className="mr-8 rounded-4" onClick={() => {}}>
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
          <Item name="contact" label="联系人">
            <Input
              placeholder="请输入联系人"
              allowClear
              style={{ width: 150 }}
              onBlur={handleOnsubmit}
            />
          </Item>
          <Item name="contactphone" label="手机号">
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
      <div className="my-20 flex justify-end rounded-[20px] bg-white p-20">
        <Button
          type="primary"
          className="rounded-4"
          onClick={() => setVisible(true)}>
          添加宠物
        </Button>
      </div>
      <div className="rounded-[20px] bg-white p-20">
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
      <CreatePetModal
        visible={visible}
        close={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default PetList;
