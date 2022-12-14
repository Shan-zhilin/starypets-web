module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      spacing: {
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        20: '20px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        50: '50px',
        'save': '1200px'
      },
      borderRadius: {
        none: '0',
        DEFAULT: '4px',
        full: '9999px',
        2: '2px',
        4: '4px',
        8: '8px',
        10: '10px',
      },
      fontSize: {
        11: ['11px', '17px'],
        12: ['12px', '18px'],
        13: ['13px', '19px'],
        14: ['14px', '20px'],
        16: ['16px', '22px'],
        18: ['18px', '26px'],
        20: ['20px', '28px'],
        26: ['26px', '34px'],
      },
      fontFamily: {
        qy: 'QingYuan',
      },
      colors: {
        transparent: 'transparent',
        gray: {
          darkest: '#111111',
          dark: '#333333',
          DEFAULT: '#666666',
          light: '#999999',
          lightest: '#98999B',
          f8f8f8: '#f8f8f8',
        },
        white: '#ffffff',
        primary: '#FF5831',
        gold: '#BC7B36',
        background: '#F5F5F5',
        baseBack: '#FCF8EE',
        link: '#0081FF',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(270deg, #ff5831 0%, #fe813f 100%)',
      },
    },
    // 去除tailwind预设样式，防止样式覆盖
    corePlugins: {
      preflight: false,
    },
    plugins: [require('@tailwindcss/line-clamp')],
};