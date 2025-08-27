import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import WebViewRender from './WebViewRender';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from './BackHeader';
const WebViewScreen = () => {
  const {params} = useRoute<any>();
  return (
    <SafeAreaView style={GeneralStyle.container}>
      <View style={styles.mainContainer}>
        <BackHeader text={params?.title} style={GeneralStyle.back} />
        <View style={{flex: 1}}>
          <WebViewRender url={params?.url} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
