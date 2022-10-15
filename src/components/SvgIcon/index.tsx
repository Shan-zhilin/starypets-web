import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3024632_2bculyevoio.js',
});

interface iconProps {
  icon: string;
  size: string;
  color: string;
  style: React.CSSProperties;
}

const SvgIcon: React.FC<iconProps> = ({
  size = 24,
  icon,
  color = '#fff',
  style = {},
}) => (
  <Space>
    <IconFont
      type={icon}
      style={{
        fontSize: `${size}px`,
        color,
        verticalAlign: 'middle',
        ...style,
      }}
    />
  </Space>
);

export default SvgIcon