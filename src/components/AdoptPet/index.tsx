/*
 * @Author: shanzhilin
 * @Date: 2022-11-08 22:40:44
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-31 22:17:23
 */
import React, { FC } from 'react';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
const { Item } = Form;
import { createAdoptApi } from '@/api';
const cityFormate = new DivisionUtil(CityOptions);

import './index.scss';
interface AdoptPetProps {
  visible: boolean;
  close: () => void;
  item: {
    id?: number;
    [key: string]: any;
  };
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};
const AdoptPet: FC<AdoptPetProps> = ({ visible, close, item }) => {
  const [form] = useForm();

  // 重置
  const onReset = () => {
    form.resetFields();
  };

  // 提交
  const onFinish = async (values: any) => {
    const [province, city, county] = values.cities.map((item: string) =>
      cityFormate.getNameByCode(item)
    );
    values.appointtime = dayjs(values.appointtime).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    const params = { ...values, province, city, county, adoptid: item.id };
    delete params.cities;
    const res = await createAdoptApi(params);
    if (res.success) {
      message.success('申请成功,我们会尽快联系您确认领养流程哦~');
      close();
    } else {
      message.error(res.msg);
    }
  };

  return (
    <Modal
      className="adopt"
      open={visible}
      destroyOnClose
      onCancel={close}
      footer={null}>
      <p className="mt-16 mb-8 text-center text-20 font-bold">领养信息 </p>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '请输入${label}' }}>
        <Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input placeholder="请输入姓名" />
        </Item>
        <Item name="phone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="请输入手机号" />
        </Item>
        <Item name="hasexperience" label="有无领养经验" initialValue={0}>
          <Radio.Group defaultValue={0}>
            <Radio value={0}>无</Radio>
            <Radio value={1}>有</Radio>
          </Radio.Group>
        </Item>
        <Item
          name="cities"
          label="城市"
          rules={[{ required: true, message: '请选择城市' }]}>
          <Cascader options={CityOptions} placeholder="请选择城市" />
        </Item>

        <Item name="address" label="详细地址" rules={[{ required: true }]}>
          <Input placeholder="请输入详细地址" />
        </Item>
        <Item name="adoptway" label="领养方式" initialValue={0}>
          <Radio.Group defaultValue={0}>
            <Radio value={0}>本地自取</Radio>
            <Radio value={1}>远程运输</Radio>
          </Radio.Group>
        </Item>
        <Item name="appointtime" label="预约时间" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Item>
        <Item name="remark" label="备注">
          <Input placeholder="请输入备注" />
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

export default AdoptPet;
