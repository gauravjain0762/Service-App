import {IMAGES} from '@/assets/images';
import {Platform} from 'react-native';

export const payment_method = [
  {
    id: 2,
    title: 'Pay by Cash',
    img: IMAGES.cashPay,
    value: 'COD',
  },
  {
    id: 3,
    title: 'Pay by Card',
    img: IMAGES.cardPay,
    value: 'card',
  },
  ...(Platform.OS === 'ios'
    ? [
        {
          id: 4,
          title: 'Apple Pay',
          img: IMAGES.apple,
          value: 'applePay',
        },
      ]
    : []),
];
