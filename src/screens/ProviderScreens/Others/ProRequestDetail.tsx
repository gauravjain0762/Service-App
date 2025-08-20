import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import {GeneralStyle} from '@/constants/GeneralStyle';
import BackHeader from '@/components/common/BackHeader';
import CommonText from '@/components/common/CommonText';
import ShadowCard from '@/components/common/ShadowCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonFontStyle, hp, wp} from '@/utils/responsiveFn';
import ServiceDetailCard from '@/components/Provider/ServiceDetailCard';
import {useGetRequestsDetailsQuery} from '@/api/Provider/homeApi';
import {useRoute} from '@react-navigation/native';
import {getLocalizedText} from '@/components/common/commonFunction';
import {useAppSelector} from '@/Hooks/hooks';

const ProRequestDetail = () => {
  const {params} = useRoute<any>();
  const {language} = useAppSelector(state => state.auth);

  const {
    data: requestData,
    isLoading: requestLoading,
    refetch: refetchRequestList,
  } = useGetRequestsDetailsQuery<any>(
    {
      request_id: params?.request_id,
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  const requestDetails = requestData?.data?.job;
  return (
    <SafeAreaView style={GeneralStyle.container}>
      <BackHeader text="Request Detail" style={GeneralStyle.back} />

      <ScrollView
        bounces={false}
        contentContainerStyle={{
          paddingBottom: hp(20),
        }}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <CommonText text="Service Type" style={styles.sectionLabel} />

          <ShadowCard style={styles.card}>
            <View style={styles.cardHeader}>
              <CommonText
                text={getLocalizedText(
                  requestDetails?.category_id?.title,
                  requestDetails?.category_id?.title_ar,
                  language,
                )}
                style={styles.serviceTitle}
              />
              <CommonText
                text={requestDetails?.job_code}
                style={styles.requestId}
              />
            </View>

            <CommonText
              text={getLocalizedText(
                requestDetails?.sub_category_id?.title,
                requestDetails?.sub_category_id?.title_ar,
                language,
              )}
              style={styles.serviceSubtitle}
            />
          </ShadowCard>
        </View>

        <View style={styles.bottomContainer}>
          <CommonText
            text="Service Detail"
            style={{
              marginBottom: hp(23),
              ...commonFontStyle(700, 2.2, Colors.black),
            }}
          />
          <ServiceDetailCard  requestDetails={requestDetails} language={language}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProRequestDetail;

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: wp(24),
    marginBottom: hp(30),
  },
  sectionLabel: {
    marginLeft: wp(32),
    ...commonFontStyle(400, 1.9, Colors._919191),
  },
  card: {
    width: '100%',
    gap: hp(10),
    padding: hp(22),
    marginTop: hp(21),
    alignItems: 'flex-start',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    ...commonFontStyle(600, 2, Colors.black),
  },
  requestId: {
    ...commonFontStyle(600, 1.9, Colors._55B4FD),
  },
  serviceSubtitle: {
    ...commonFontStyle(400, 1.7, Colors._898989),
  },
  bottomContainer: {
    flex: 1,
    paddingTop: hp(40),
    paddingHorizontal: wp(24),
    backgroundColor: Colors._F5F5F5,
  },
});
