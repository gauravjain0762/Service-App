// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
// } from 'react-native';
// import BackHeader from '@/components/common/BackHeader';
// import CustomImage from '@/components/common/CustomImage';
// import CommonText from '@/components/common/CommonText';
// import {IMAGES} from '@/assets/images';
// import {Colors} from '@/constants/Colors';
// import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
// import {GeneralStyle} from '@/constants/GeneralStyle';
// import LanguageModal from '@/components/common/LanguageModel';

// const Profile = () => {
//   const [isLanguageModalVisible, setIsLanguageModalVisible] =
//     useState<boolean>(false);

//   const openLanguageModal = () => {
//     setIsLanguageModalVisible(true);
//   };

//   const closeLanguageModal = () => {
//     setIsLanguageModalVisible(false);
//   };

//   const handleLanguageSelect = () => {
//     closeLanguageModal();
//   };

//   const ACTIONS = [
//     {
//       key: 'language',
//       label: 'Language',
//       icon: IMAGES.language,
//       rightContent: () => (
//         <View style={styles.languageSection}>
//           <CustomImage source={IMAGES.flag} size={hp(20)} />
//           <CustomImage source={IMAGES.downArrow} size={hp(20)} />
//         </View>
//       ),
//       onPress: () => openLanguageModal(),
//     },
//     {
//       key: 'contact_us',
//       label: 'Contact us',
//       icon: IMAGES.phone,
//       rightIcon: IMAGES.rightArrow,
//       onPress: () => {},
//     },
//     {
//       key: 'about_us',
//       label: 'About us',
//       icon: IMAGES.iBtn,
//       rightIcon: IMAGES.rightArrow,
//       onPress: () => {},
//     },
//     {
//       key: 'privacy_policy',
//       label: 'Privacy Policy',
//       icon: IMAGES.privacy,
//       rightIcon: IMAGES.rightArrow,
//       onPress: () => {},
//     },
//     {
//       key: 'terms_conditions',
//       label: 'Terms & Conditions',
//       icon: IMAGES.file,
//       rightIcon: IMAGES.rightArrow,
//       onPress: () => {},
//     },
//     {
//       key: 'logout',
//       label: 'Logout',
//       icon: IMAGES.logout,
//       onPress: () => {},
//     },
//     {
//       key: 'delete_account',
//       label: 'Delete Account',
//       icon: IMAGES.delete,
//       onPress: () => {},
//     },
//   ];

//   const renderItem = ({item, index}: any) => (
//     <TouchableOpacity
//       key={index}
//       style={[styles.actionRow, item.style]}
//       onPress={item.onPress}
//       activeOpacity={0.7}>
//       <CustomImage source={item.icon} size={hp(22)} />
//       <CommonText text={item.label} style={styles.actionText} />
//       {item.rightContent ? (
//         item.rightContent()
//       ) : item.rightIcon ? (
//         <CustomImage source={item.rightIcon} size={hp(16)} />
//       ) : null}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={GeneralStyle.container}>
//       <BackHeader text="Profile" />

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.avatarSection}>
//           <CustomImage
//             source={IMAGES.new_profile}
//             size={hp(80)}
//             containerStyle={styles.avatar}
//           />
//           <CommonText text="Jason Wiliams" style={styles.name} />
//         </View>

//         <FlatList
//           data={ACTIONS}
//           scrollEnabled={false}
//           renderItem={renderItem}
//           keyExtractor={item => item.key}
//           contentContainerStyle={styles.actionList}
//         />
//       </ScrollView>

//       <LanguageModal
//         visible={isLanguageModalVisible}
//         onClose={() => setIsLanguageModalVisible(false)}
//         onLanguageSelect={() => handleLanguageSelect()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingBottom: hp(100),
//   },
//   avatarSection: {
//     alignItems: 'center',
//     marginTop: hp(24),
//     marginBottom: hp(32),
//   },
//   avatar: {
//     borderRadius: hp(40),
//     backgroundColor: Colors._EBFCF4,
//     marginBottom: hp(12),
//   },
//   name: {
//     ...commonFontStyle(700, 2.4, Colors.black),
//   },
//   actionList: {
//     marginHorizontal: wp(16),
//   },
//   actionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: hp(16),
//     backgroundColor: Colors._F9F9F9,
//     borderRadius: hp(30),
//     marginBottom: hp(8),
//     paddingHorizontal: wp(16),
//   },
//   actionText: {
//     flex: 1,
//     marginLeft: wp(12),
//     ...commonFontStyle(500, 2, Colors.black),
//   },
//   languageSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: wp(2),
//   },
//   deleteRow: {
//     backgroundColor: Colors._F2EDED,
//   },
// });

// export default Profile;
