import {IMAGES} from '@/assets/images';

export const payment_method = [
//   {
//     id: 1,
//     title: 'Loyalty Credit',
//     img: IMAGES.loyalty_card,
//     isWallet: true,
//     value: 'loyalty',
//   },
  {
    id: 2,
    title: 'Pay by Cash',
    img: IMAGES.cashPay,
    isSelected: true,
    value: 'COD',
  },
  {
    id: 3,
    title: 'Pay by Card',
    img: IMAGES.cardPay,
    value: 'card',
  },
  {
    id: 4,
    title: 'Apple Pay',
    img: IMAGES.apple,
    value: 'applePay',
  },
];
