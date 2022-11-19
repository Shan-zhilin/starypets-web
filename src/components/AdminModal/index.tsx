/*
 * @Author: shanzhilin
 * @Date: 2022-11-19 20:01:30
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-19 23:14:51
 */
import React, { useEffect, useRef } from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import {
  Button,
  Cascader,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
} from 'antd';

import { createAdminApi, updateAdminApi } from '@/api';

import './index.scss';
const cityFormate = new DivisionUtil(CityOptions);
export interface AdminItemProps {
  adminname?: string;
  admintype: number;
  checkstatus: number;
  city: string;
  county: string;
  hasexperience: number;
  id: number;
  identity: string;
  phone: string;
  province: string;
  [key: string]: any;
}

// 有无领养经验
export enum ExperienceStatus {
  '无',
  '有',
}

// 管理员类型
export enum AdminStatus {
  '超级管理员',
  '普通管理员',
}

// 审核状态
export enum CheckStatus {
  '未审核',
  '已通过',
  '已拒绝',
}

// 领养经验
export const AdoptOptions = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '无',
    value: 0,
  },
  {
    label: '有',
    value: 1,
  },
];

// 管理员类型
export const AdminTypeOptions = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '普通管理员',
    value: 1,
  },
  {
    label: '超级管理员',
    value: 0,
  },
];

// 审核状态
export const JudgeStatusOptions = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '未审核',
    value: 0,
  },
  {
    label: '已通过',
    value: 1,
  },
  {
    label: '已拒绝',
    value: 2,
  },
];

interface AdminProps {
  adminForm?: Partial<AdminItemProps>;
  visible: boolean;
  close: () => void;
  submitcb?: () => void;
}

const { Item } = Form;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};
const AdminModal: React.FC<AdminProps> = ({
  adminForm,
  visible,
  close,
  submitcb,
}) => {
  const [form] = Form.useForm();
  const cityChangeRef = useRef(false);

  // 重置
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const [province, city, county] = cityChangeRef.current
      ? values.cities.map((item: string) => cityFormate.getNameByCode(item))
      : values.cities;
    const params = { ...values, province, city, county };
    Object.keys(adminForm || {}).length && (params.id = adminForm?.id);
    delete params.cities;
    const res = Object.keys(adminForm || {}).length
      ? await updateAdminApi(params)
      : await createAdminApi(params);
    message.info(res.msg);
    onReset();
    submitcb && submitcb();
  };

  useEffect(() => {
    if (Object.keys(adminForm || {}).length) {
      const _from = {
        ...adminForm,
        cities: [adminForm?.province, adminForm?.city, adminForm?.county],
      };
      form.setFieldsValue(_from);
    }
  }, [visible]);
  return (
    <Modal
      className="admin"
      open={visible}
      destroyOnClose
      onCancel={() => {
        onReset();
        close();
      }}
      footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">管理员信息</p>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Item name="adminname" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item name="identity" label="身份信息" rules={[{ required: true }]}>
          <Input placeholder="身份信息" />
        </Item>
        <Item name="hasexperience" label="有无领养经验" initialValue={0}>
          <Radio.Group>
            <Radio value={0}>无</Radio>
            <Radio value={1}>有</Radio>
          </Radio.Group>
        </Item>
        <Item
          name="cities"
          label="城市"
          rules={[{ required: true, message: '请选择城市' }]}>
          <Cascader
            options={CityOptions}
            placeholder="请选择城市"
            onBlur={() => {
              cityChangeRef.current = true;
            }}
          />
        </Item>

        <Item name="admintype" label="管理员类型" initialValue="">
          <Select
            placeholder="管理员类型"
            style={{ width: 130 }}
            options={AdminTypeOptions}
          />
        </Item>
        <Item name="checkstatus" label="审核状态" initialValue="">
          <Select
            placeholder="审核状态"
            style={{ width: 130 }}
            options={JudgeStatusOptions}
          />
        </Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-14  w-[150px]">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset} className="w-[150px]">
            重置
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default AdminModal;
