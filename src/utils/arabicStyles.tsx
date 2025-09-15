import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export const textRTL = (language: string|any): TextStyle => {
  return {textAlign: language === 'ar' ? 'right' : 'left'};
};
export const textLTR = (language: string|any): TextStyle => {
  return {textAlign: language === 'en' ? 'right' : 'left'};
};
export const flipImage = (language: string|any): ViewStyle|any => {
  return {transform: [{scaleX: language == 'en' ? 1 : -1}]};
};

export const rowReverseRTL = (language: string|any): ViewStyle => {
  return {
    flexDirection: language === 'ar' ? 'row-reverse' : 'row',
  };
};
export const alignItemsRTL = (language: string|any): ViewStyle => {
  return {
    alignItems: language === 'en' ? 'flex-start' : 'flex-end',
  };
};

export const alignItemsLTR = (language: string|any): ViewStyle => {
  return {
    alignItems: language === 'en' ? 'flex-end' : 'flex-start',
  };
};

export const alignSelfRTL = (language: string|any): ViewStyle => {
  return {
    alignSelf: language === 'ar' ? 'flex-start' : 'flex-end',
  };
};

export const alignSelfLTR = (language:string|any): ViewStyle => {
  return {
    alignSelf: language === 'ar' ? 'flex-end' : 'flex-start',
  };
};

export const marginRTLRight = (language: string|any, number: any): ViewStyle => {
  return {
    marginRight: language == 'en' ? 0 : number,
    marginLeft: language == 'ar' ? 0 : number,
  };
};

export const paddingRTLRight = (language: string|any, number: any): ViewStyle => {
  return {
    paddingRight: language == 'ar' ? 0 : number,
    paddingLeft: language == 'en' ? 0 : number,
  };
};

export const marginRTLLeft = (language: string|any, number: any): ViewStyle => {
  return {
    marginLeft: language == 'en' ? 0 : number,
    marginRight: language == 'ar' ? 0 : number,
  };
};

export const paddingRTLLeft = (language: string|any, number: any): ViewStyle => {
  return {
    paddingLeft: language == 'ar' ? 0 : number,
    paddingRight: language == 'en' ? 0 : number,
  };
};

export const rightRTL = (language: string|any, number: any): ViewStyle => {
  return {
    right: language === 'ar' ? undefined : number,
    left: language === 'en' ? undefined : number,
  };
};
export const leftRTL = (language: string|any, number: any): ViewStyle => {
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
  alignSelfLTR,
  paddingRTLRight,
  marginRTLRight,
};

export default Theme;
