import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn';
import {Colors} from '@/constants/Colors';
import {IMAGES} from '@/assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBackButton} from '@react-navigation/elements';
import {
  getLocalizedText,
  goBack,
  loadRecentSearches,
  updateRecentSearches,
} from '@/components/common/commonFunction';
import CustomImage from '@/components/common/CustomImage';
import CustomTextInput from '@/components/common/CustomTextInput';
import {useAppDispatch, useAppSelector} from '@/Hooks/hooks';
import {
  flipImage,
  rightRTL,
  rowReverseRTL,
  textRTL,
} from '@/utils/arabicStyles';
import CommonText from '@/components/common/CommonText';
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from '@/api/Seeker/homeApi';
import {debounce} from 'lodash';
import ShadowCard from '@/components/common/ShadowCard';
import ServicesModal from '@/components/modals/ServicesModal';
import {clearRecentSearches, removeRecentSearch} from '@/Hooks/asyncStorage';
const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const {language, recentSearch} = useAppSelector(state => state.auth);
  const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  const [search, setSearch] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  // const [selectedCatId, setSelectedCatId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const {
    data: searchData,
    isLoading: searchLoading,
    isFetching,
    error,
  } = useGetCategoriesQuery(
    {
      page: currentPage,
      query: debouncedSearchTerm,
    },
    {
      // Skip the query if search term is empty or shouldn't fetch
      skip: debouncedSearchTerm.trim() === '' || !shouldFetch,
    },
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data,
    isLoading: isSubCatLoading,
    refetch,
  } = useGetSubCategoriesQuery({categories: selectedCategory?._id});
  const subCategories = data?.data?.sub_categories;

  React.useEffect(() => {
    dispatch(loadRecentSearches());
  }, [dispatch]);
  React.useEffect(() => {
    if (searchData && shouldFetch) {
      const newItems = searchData?.data?.categories || [];
      const pagination = searchData?.data?.pagination;

      if (currentPage === 1) {
        // First page - replace all data
        setMenuItems(newItems);
      } else {
        // Subsequent pages - append to existing data
        setMenuItems(prev => [...prev, ...newItems]);
        setIsFetchingMore(false);
      }

      // Update pagination info
      if (pagination) {
        setHasMoreData(pagination.total_pages > currentPage);
      } else {
        setHasMoreData(false);
      }
    }
  }, [searchData, currentPage, shouldFetch]);

  const handleRemove = (item: string) => {
    dispatch(removeRecentSearch(item));
  };

  const handleClearAll = () => {
    dispatch(clearRecentSearches());
  };

  const handleRecentSearchPress = React.useCallback((item: string) => {
    if (!item || item.trim() === '') return;

    setSearch(item);
    setMenuItems([]);
    setCurrentPage(1);
    setDebouncedSearchTerm(item);
    setShouldFetch(true);
    setHasMoreData(true);
    setIsFetchingMore(false);
  }, []);
  const debouncedSearch = React.useCallback(
    debounce((text: string) => {
      if (text.trim() !== '') {
        setDebouncedSearchTerm(text);
        setCurrentPage(1);
        setShouldFetch(true);
        setHasMoreData(true);
        setIsFetchingMore(false);

        dispatch(updateRecentSearches(text));
      } else {
        setDebouncedSearchTerm('');
        setMenuItems([]);
        setShouldFetch(false);
        setCurrentPage(1);
        setHasMoreData(true);
        setIsFetchingMore(false);
      }
    }, 600),
    [dispatch],
  );
  const onTextSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === '') {
      setMenuItems([]);
      setDebouncedSearchTerm('');
      setCurrentPage(1);
      setShouldFetch(false);
      setHasMoreData(true);
      setIsFetchingMore(false);

      debouncedSearch.cancel();
      return;
    }

    setMenuItems([]);
    debouncedSearch(text);
  };
  const renderRecentSearches = () => {
    if (search.trim() !== '') return null;

    return (
      <View>
        <View style={styles.headerRow}>
          <CommonText text={'Recent Search'} style={styles.headerText} />
          <TouchableOpacity onPress={handleClearAll}>
            <CommonText text={'Clear All'} style={styles.clearAll} />
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {recentSearch && recentSearch.length > 0 ? (
            recentSearch.map((item: any, index: number) => (
              <View style={styles.itemRow}>
                <CommonText
                  onPress={() => handleRecentSearchPress(item)}
                  text={item}
                  style={styles.itemText}
                />
                <TouchableOpacity onPress={() => handleRemove(item)}>
                  <Image source={IMAGES.close2} style={styles.removeIcon} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <CommonText
              style={styles.noRecentText}
              text={'No recent searches'}
            />
          )}
        </View>
      </View>
    );
  };
  const loadMoreData = () => {
    if (
      isFetchingMore ||
      !hasMoreData ||
      searchLoading ||
      debouncedSearchTerm.trim() === '' ||
      !shouldFetch
    ) {
      return;
    }

    setIsFetchingMore(true);
    setCurrentPage(prev => prev + 1);
  };
  const renderEmptyComponent = () => {
    if (
      !searchLoading &&
      menuItems.length === 0 &&
      debouncedSearchTerm.trim() !== ''
    ) {
      return (
        <View style={styles.emptyContainer}>
          <CommonText style={styles.searchingText} text={'No Data Found'} />
        </View>
      );
    }
    return null;
  };
  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.seeker_primary} />
      </View>
    );
  };
  const renderSearchContent = () => {
    if (
      searchLoading &&
      currentPage === 1 &&
      debouncedSearchTerm.trim() !== '' &&
      shouldFetch
    ) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.seeker_primary} />
          <CommonText style={styles.searchingText} text={'Searching...'} />
        </View>
      );
    }

    // Show search results
    if (debouncedSearchTerm.trim() !== '' && shouldFetch) {
      return (
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => item._id || `item-${index}`}
          renderItem={({item, index}: any) => {
            return (
              <ShadowCard
                key={index}
                onCardPress={() => {
                  setSelectedCategory(item);
                  setIsModalVisible(true);
                }}
                style={{width: '100%', marginBottom: hp(24)}}>
                <View style={styles.cardContent}>
                  <View style={styles.imageContainer}>
                    <CustomImage
                      uri={item?.image}
                      size={hp(50)}
                      containerStyle={styles.serviceImage}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <CommonText
                      text={getLocalizedText(
                        item?.title,
                        item?.title_ar,
                        language,
                      )}
                      style={styles.serviceTitle}
                    />
                    <CommonText
                      text={getLocalizedText(
                        item?.title,
                        item?.title_ar,
                        language,
                      )}
                      style={styles.serviceDescription}
                    />
                  </View>
                </View>
              </ShadowCard>
            );
          }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.75}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.contentContainer,
            menuItems.length === 0 && styles.emptyListContainer,
          ]}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
        />
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton
          onPress={() => goBack()}
          backImage={() => (
            <CustomImage
              source={IMAGES.backArrow2}
              size={hp(24)}
              imageStyle={{...flipImage(language)}}
            />
          )}
        />

        <CustomTextInput
          value={search}
          mainStyle={{flex: 1}}
          onChangeText={onTextSearch}
          placeholderTextColor="#3A3A3A"
          placeholder="Car Battery Replacement"
          containerStyle={{paddingHorizontal: wp(15), gap: wp(5)}}
          leftIcon={<CustomImage source={IMAGES.search} size={hp(28)} />}
        />
      </View>
      {/* Show recent searches when no search is active */}
      {!search.trim() && renderRecentSearches()}

      {/* Show search content */}
      {renderSearchContent()}
      <ServicesModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedCategory={selectedCategory}
        subCategories={subCategories ?? []}
        isSubCatLoading={isSubCatLoading || isFetching}
      />
    </SafeAreaView>
  );
};

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: wp(20),
      paddingTop: hp(30),
    },
    rightIcon: {
      borderRadius: hp(50),
      paddingVertical: hp(5),
      paddingHorizontal: wp(10),
      backgroundColor: Colors.black,
      position: 'absolute',
      top: 15,
      ...rightRTL(_language, 15),
    },
    offerLabel: {
      ...commonFontStyle(600, 1.3, Colors.white),
    },
    header: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
    },
    cardsContainer: {
      flex: 1,
      marginTop: hp(20),
    },
    cardContent: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      paddingHorizontal: wp(20),
    },
    imageContainer: {
      width: hp(60),
      height: hp(60),
      borderRadius: hp(12),
      backgroundColor: Colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp(10),
    },
    serviceImage: {
      borderRadius: hp(8),
      backgroundColor: '#F6FAFD',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    serviceTitle: {
      ...commonFontStyle(700, 2, Colors.black),
      marginBottom: hp(11),
      ...textRTL(_language),
    },
    serviceDescription: {
      ...commonFontStyle(500, 1.6, Colors._878787),
      ...textRTL(_language),
    },
    searchBar: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      backgroundColor: Colors._E7E7E7,
      borderRadius: hp(25),
      height: hp(50),
      marginRight: 20,
      marginBottom: hp(25),
      width: '90%',
    },
    contentContainer: {
      flexGrow: 1,
      marginHorizontal: wp(10),
      paddingVertical: 20,
    },
    emptyListContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchIcon: {
      width: wp(20),
      height: hp(25),
      marginRight: wp(8),
      marginLeft: wp(12),
      tintColor: Colors._4C4C4C,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerLoader: {
      paddingVertical: hp(20),
      alignItems: 'center',
    },
    searchingText: {
      marginTop: hp(10),
      ...commonFontStyle('i_400', 1.9, Colors.black),
    },
    input: {
      flex: 1,
      ...commonFontStyle(400, 2, Colors.black),
      color: Colors.black,
    },
    filterIcon: {
      width: wp(22),
      height: hp(18),
      marginRight: wp(15),
      tintColor: Colors.black,
    },
    headerRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      marginBottom: hp(20),
      marginTop: hp(38),

      justifyContent: 'space-between',
    },
    headerText: {
      ...commonFontStyle(600, 2.5, Colors.black),
    },
    clearAll: {
      ...commonFontStyle(400, 1.7, '#313131'),
    },
    flatList: {
      flexGrow: 0,
    },
    itemRow: {
      ...rowReverseRTL(_language),
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp(12),
    },
    itemText: {
      ...commonFontStyle(400, 1.9, '#868686'),
      flex: 1,
      ...textRTL(_language),
    },
    removeIcon: {
      width: wp(12),
      height: hp(12),
      color: Colors._888888,
      marginLeft: wp(10),
      fontWeight: 'bold',
      tintColor: '#AAAAAA',
    },
    noRecentText: {
      ...commonFontStyle('i_400', 1.9, Colors._888888),
      marginTop: hp(10),
      textAlign: 'center',
    },
  });
};

export default SearchScreen;
