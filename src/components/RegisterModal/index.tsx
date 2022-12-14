/*
 * @Author: shanzhilin
 * @Date: 2022-10-30 20:50:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-11-20 18:37:52
 */
import React, { useEffect, useRef } from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import { Button, Cascader, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { createUserApi, updateUserApi } from '@/api';

import './index.scss';
const { Item } = Form;

const cityFormate = new DivisionUtil(CityOptions);

export interface UserItemProps {
  username?: string;
  userphone?: string;
  province?: string;
  city?: string;
  county?: string;
  headPics?: string[];
  id?: number;
}

interface UserProps {
  userForm?: Partial<UserItemProps>;
  visible: boolean;
  onClose: () => void;
  submitcb?: () => void;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};

const RegisterModal: React.FC<UserProps> = ({
  userForm,
  visible,
  onClose,
  submitcb,
}) => {
  const [form] = useForm();
  const cityChangeRef = useRef(false);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const [province, city, county] = cityChangeRef.current
      ? values.address.map((item: string) => cityFormate.getNameByCode(item))
      : values.address;
    const params = { ...values, province, city, county };

    Object.keys(userForm || {}).length && (params.id = userForm?.id);
    delete params.address;
    const res = Object.keys(userForm || {}).length
      ? await updateUserApi(params)
      : await createUserApi(params);
    message.info(res.msg);
    onReset();
    submitcb && submitcb();
  };

  useEffect(() => {
    if (Object.keys(userForm || {}).length) {
      const _from = {
        ...userForm,
        address: [userForm?.province, userForm?.city, userForm?.county],
      };
      form.setFieldsValue(_from);
    }
  }, [visible]);

  return (
    <Modal
      className="register"
      open={visible}
      onCancel={() => {
        onReset();
        onClose();
      }}
      footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">
        {Object.keys(userForm || {}).length ? '??????????????????' : '??????'}
      </p>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '?????????${label}' }}>
        <Item name="username" label="??????" rules={[{ required: true }]}>
          <Input placeholder="???????????????" />
        </Item>
        <Item name="userphone" label="?????????" rules={[{ required: true }]}>
          <Input placeholder="??????????????????" />
        </Item>
        <Item name="password" label="??????" rules={[{ required: true }]}>
          <Input.Password placeholder="???????????????" />
        </Item>
        <Item
          name="address"
          label="??????"
          rules={[{ required: true, message: '???????????????' }]}>
          <Cascader
            options={CityOptions}
            placeholder="???????????????"
            onBlur={() => {
              cityChangeRef.current = true;
            }}
          />
        </Item>

        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="mr-14  w-[150px]">
            ??????
          </Button>
          <Button htmlType="button" onClick={onReset} className="w-[150px]">
            ??????
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
