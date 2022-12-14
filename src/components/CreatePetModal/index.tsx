/*
 * @Author: shanzhilin
 * @Date: 2022-12-27 21:53:25
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-12-28 22:34:32
 */
import React, { FC, useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import CityOptions, { DivisionUtil } from '@pansy/china-division';
import {
  Button,
  Cascader,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Space,
  Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
const { Item } = Form;
import { addPetApi, updatePetInfoApi } from '@/api';
const cityFormate = new DivisionUtil(CityOptions);

import './index.scss';

export interface PetItemProps {
  id?: number;
  petpics?: any;
  variety?: string;
  attention?: number;
  province?: string;
  city?: string;
  county?: string;
  description?: string;
  headpics?: string;
  createtime?: string;
  petname?: string;
  contact?: string;
  contactphone?: string;
  [key: string]: any;
}
interface PetProps {
  visible: boolean;
  close: () => void;
  upData: () => void;
  item: PetItemProps;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
const CreatePet: FC<PetProps> = ({ visible, close, item, upData }) => {
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  const cityChangeRef = useRef(false);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // ??????
  const onReset = () => {
    form.resetFields();
  };

  // ??????
  const onFinish = async () => {
    const values = form.getFieldsValue();
    const [province, city, county] = cityChangeRef.current
      ? values.cities.map((item: string) => cityFormate.getNameByCode(item))
      : values.cities;
    const params = { ...values, province, city, county };
    Object.keys(item || {}).length && (params.id = item?.id);

    const images = fileList.map(item => item?.response?.url || item?.url);
    params.petpics = images.join(';');
    delete params.cities;
    const res = Object.keys(item || {}).length
      ? await updatePetInfoApi(params)
      : await addPetApi(params);
    if (res.success) {
      message.success(res.msg);
      close();
      upData();
      onReset();
      setFileList([]);
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    if (Object.keys(item || {}).length) {
      const _from = {
        ...item,
        cities: [item?.province, item?.city, item?.county],
      };
      const _pets = (
        !Array.isArray(item.petpics) ? [item.petpics] : item.petpics
      ).map((item: string, index: number) => {
        return {
          uid: index,
          name: 'image.png',
          status: 'done',
          url: item,
        };
      });
      setFileList(_pets);
      form.setFieldsValue(_from);
    }
  }, [visible]);

  const onClose = () => {
    onReset();
    close();
    setFileList([]);
  };

  return (
    <Drawer
      open={visible}
      width={600}
      title={Object.keys(item || {}).length ? '??????????????????' : '????????????'}
      destroyOnClose
      onClose={onClose}
      extra={
        <Space>
          <Button type="primary" className="mr-14" onClick={onFinish}>
            ??????
          </Button>
          <Button onClick={onClose}>??????</Button>
        </Space>
      }>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        validateMessages={{ required: '?????????${label}' }}>
        <Item name="variety" label="??????" rules={[{ required: true }]}>
          <Input placeholder="???????????????: ?????? ???" />
        </Item>
        <Item name="contact" label="?????????" rules={[{ required: true }]}>
          <Input placeholder="??????????????????" />
        </Item>
        <Item name="petpics" label="??????" rules={[{ required: true }]}>
          <Upload
            action="/api/upload/image"
            listType="picture-card"
            fileList={fileList}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            onPreview={handlePreview}
            onChange={handleChange}>
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Item>
        <Item name="contactphone" label="?????????" rules={[{ required: true }]}>
          <Input placeholder="??????????????????????????????" />
        </Item>
        <Item name="petname" label="????????????" rules={[{ required: true }]}>
          <Input placeholder="?????????????????????" />
        </Item>
        <Item
          name="cities"
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

        <Item name="description" label="????????????" rules={[{ required: true }]}>
          <Input placeholder="?????????????????????" />
        </Item>
      </Form>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Drawer>
  );
};

export default CreatePet;
