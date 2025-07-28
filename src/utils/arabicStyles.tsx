import {ViewStyle} from 'react-native';

export const textRTL = (language: string): any => {
  return {textAlign: language === 'ar' ? 'right' : 'left'};
};
export const textLTR = (language: string): any => {
  return {textAlign: language === 'en' ? 'right' : 'left'};
};
export const flipImage = (language: string): any => {
  return {transform: [{scaleX: language == 'en' ? 1 : -1}]};
};

export const rowReverseRTL = (language: string): ViewStyle => {
  return {
    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
  };
};
export const alignItemsRTL = (language: string): any => {
  return {
    alignItems: language === 'ar' ? 'flex-start' : 'flex-end',
  };
};

export const alignItemsLTR = (language: string): any => {
  return {
    alignItems: language === 'en' ? 'flex-end' : 'flex-start',
  };
};

export const alignSelfRTL = (language: string): any => {
  return {
    alignSelf: language === 'ar' ? 'flex-start' : 'flex-end',
  };
};

export const alignItemsFlexRTL = (language: string): any => {
  return {
    alignItems: language === 'ar' ? 'flex-end' : 'flex-start',
  };
};

export const marginRTLRight = (language: string, number: any): any => {
  return {
    marginRight: language == 'ar' ? 0 : number,
    marginLeft: language == 'en' ? 0 : number,
  };
};

export const paddingRTLRight = (language: string, number: any): any => {
  return {
    paddingRight: language == 'ar' ? 0 : number,
    paddingLeft: language == 'en' ? 0 : number,
  };
};

export const marginRTLLeft = (language: string, number: any): any => {
  return {
    marginLeft: language == 'ar' ? 0 : number,
    marginRight: language == 'en' ? 0 : number,
  };
};

export const paddingRTLLeft = (language: string, number: any): any => {
  return {
    paddingLeft: language == 'ar' ? 0 : number,
    paddingRight: language == 'en' ? 0 : number,
  };
};

export const rightRTL = (language: string, number: any): any => {
  return {
    right: language === 'ar' ? undefined : number,
    left: language === 'en' ? undefined : number,
  };
};
export const leftRTL = (language: string, number: any): any => {
  return {
    left: language === 'ar' ? undefined : number,
    right: language === 'en' ? undefined : number,
  };
};

const Theme = {
  textRTL,
  alignSelfRTL,
  rowReverseRTL,
  marginRTLLeft,
  paddingRTLLeft,
  alignItemsRTL,
  alignItemsFlexRTL,
  paddingRTLRight,
  marginRTLRight,
};

export default Theme;
