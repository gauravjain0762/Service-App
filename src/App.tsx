import {Animated, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import RootContainer from '@/navigation/RootContainer';
import SplashScreen from 'react-native-splash-screen';
import './i18n/i18n';
import {persistor, store} from '@/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getLanguageKey} from '@/components/common/commonFunction';
import ToastConfig from '@/components/ToastConfig';
import {GeneralStyle} from './constants/GeneralStyle';

const App = ({}) => {
  const lineAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    getLanguageKey();
    SplashScreen.hide();
  }, []);

  const startLineAnimation = () => {
    // Reset the animation value to 1 before starting it
    lineAnim.setValue(1);

    Animated.timing(lineAnim, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false, // width anim can't use native driver
    }).start();
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SafeAreaView style={GeneralStyle.flex}> */}
          <RootContainer />
          <Toast
            config={ToastConfig(lineAnim)}
            position="bottom"
            topOffset={0}
            visibilityTime={3000}
            onShow={() => {
              startLineAnimation();
            }}
          />
        {/* </SafeAreaView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
