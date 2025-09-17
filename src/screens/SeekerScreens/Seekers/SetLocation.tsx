import React, {useRef, useState, useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  Keyboard,
} from 'react-native';

import {IMAGES} from '@/assets/images';
import {Colors} from '@/constants/Colors';
import {hp, wp} from '@/utils/responsiveFn';
import BackHeader from '@/components/common/BackHeader';
import SafeareaProvider from '@/components/common/SafeareaProvider';
import MapView, {Marker} from 'react-native-maps';
import BottomModal from '@/components/common/BottomModal';
import {navigationRef} from '@/navigation/RootContainer';
import SearchLocationModal from '@/components/modals/SearchLocationModal';
import AddLocation from '@/components/modals/AddLocation';
import {debounce} from 'lodash';
import {useDispatch} from 'react-redux';
import {requestLocationPermission} from '@/Hooks/locationHandler';
import {
  useGetAutoPlaceCompleteQuery,
  useGetGoogleAddressQuery,
  useGetPlaceDetailsQuery,
} from '@/api/Seeker/addressApi';
import {useAppSelector} from '@/Hooks/hooks';

const isIos = Platform.OS === 'ios';

const SetLocation = () => {
  const mapRef = useRef<any | null>(null);
  const dispatch = useDispatch();

  // States from original code
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(true);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('Home');
  const [search, setSearch] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [position, setPosition] = useState<any>({
    latitude: 25.2854,
    longitude: 51.531,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [address, setAddress] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [regions, setRegions] = useState({latitude: 0, longitude: 0});
  const [isPlaceId, setIsPlaceId] = useState(null);
  const [debouncedSearches, setDebouncedSearches] = useState('');

  // Get user data and language from Redux store (uncomment when available)
  const {userData, language} = useAppSelector((state: any) => state.auth);
const styles = React.useMemo(() => getGlobalStyles(language), [language]);
  // API calls (uncomment when available)
  const {
    data: googleAddressData,
    isLoading: isGoogleAddressLoading,
    error: googleAddressError,
  } = useGetGoogleAddressQuery(
    {latitude: regions.latitude, longitude: regions.longitude},
    {
      skip: !regions.latitude || !regions.longitude,
    },
  );

  const {
    data: placeDetails,
    error,
    isLoading,
  } = useGetPlaceDetailsQuery(
    {
      placeId: isPlaceId?.place_id,
      language: language,
    },
    {
      skip: !isPlaceId,
    },
  );

  const {
    data: searchDetails,
    error: searchError,
    isLoading: searchLoading,
  } = useGetAutoPlaceCompleteQuery(
    {search: debouncedSearches, language},
    {skip: !debouncedSearches},
  );

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Initialize location on component mount
  useEffect(() => {
    getCurrentLocation('');
  }, []);

  // Handle search details (uncomment when API is available)
  useEffect(() => {
    if (searchDetails?.length > 0) {
      setSearchData(searchDetails);
    }
  }, [searchDetails]);

  // Debounced search effect
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearches(search);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [search]);

  // Handle place details (uncomment when API is available)
  useEffect(() => {
    if (placeDetails && isPlaceId) {
      setSearch(isPlaceId?.description);
      setAddress(placeDetails);
      setPosition((prev: any) => ({
        ...prev,
        latitude: placeDetails?.geometry?.location?.lat,
        longitude: placeDetails?.geometry?.location?.lng,
      }));

      // Animate to the selected location
      mapRef?.current?.animateToRegion({
        latitude: placeDetails?.geometry?.location?.lat,
        longitude: placeDetails?.geometry?.location?.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [isPlaceId]);

  // Handle Google address data (uncomment when API is available)
  useEffect(() => {
    if (googleAddressData && googleAddressData.results?.length > 0) {
      const formatted = googleAddressData.results[0];
      setSearch(formatted.formatted_address);
      setAddress(formatted);
    }
  }, [googleAddressData, dispatch]);

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  const onPressCross = () => {
    setSearch('');
    setSearchData([]);
  };

  const onPressConfirmLocation = () => {
    setIsAddressModalVisible(true);
  };

  const onRegionChange = async (region: any, gesture: any) => {
    if (isIos) {
      if (
        region.latitude.toFixed(6) === position?.latitude.toFixed(6) &&
        region.longitude.toFixed(6) === position?.longitude.toFixed(6)
      ) {
        return;
      }
      setPosition(region);
      setRegions({latitude: region.latitude, longitude: region.longitude});
    } else {
      if (gesture?.isGesture) {
        setPosition(region);
        setRegions({latitude: region.latitude, longitude: region.longitude});
      }
    }
  };

  const getCurrentLocation = async (type: string) => {
    // Implement location permission request
    await requestLocationPermission(
      true,
      position => {
        let dataTemp = {
          latitude: position?.latitude,
          longitude: position?.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setRegions({
          latitude: dataTemp?.latitude,
          longitude: dataTemp?.longitude,
        });
        setPosition(dataTemp);

        const timeout1 = setTimeout(() => {
          mapRef?.current?.animateToRegion(dataTemp);
        }, 500);

        const timeout2 = setTimeout(() => {
          setIsMapLoaded(true);
        }, 500);

        return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
        };
      },
      (error: any) => {
        console.log('requestLocationPermission => error => ', error);
      },
    );

    // For now, just set map as loaded with default position
    setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
  };

  const onMapLoad = () => {
    setIsMapLoaded(true);
  };

  // Current location button handler
  const onPressCurrentLocation = () => {
    getCurrentLocation('');
  };

  return (
    <SafeareaProvider style={styles.safeArea} edges={['bottom']}>
      <View style={styles.headerPadding}>
        <BackHeader
          text={'Set Your Location'}
          leftIcon={
            <Pressable onPress={() => navigationRef?.current?.goBack()}>
              <Image source={IMAGES.backArrow} style={styles.backIcon} />
            </Pressable>
          }
        />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={isIos ? 'padding' : isKeyboardVisible ? 'height' : undefined}>
        <View style={styles.flexContainer}>
          {isMapLoaded ? (
            <View style={styles.container}>
              <MapView
                ref={mapRef}
                provider="google"
                region={{
                  latitude: position?.latitude,
                  longitude: position?.longitude,
                  latitudeDelta: position?.latitudeDelta,
                  longitudeDelta: position?.longitudeDelta,
                }}
                onMapReady={onMapLoad}
                onMapLoaded={onMapLoad}
                cacheEnabled={false}
                loadingEnabled={!position}
                onRegionChange={() => {
                  setSearchData([]);
                }}
                onRegionChangeComplete={(region, gesture) => {
                  onRegionChange(region, gesture);
                }}
                style={styles.mapStyle}>
                <Marker
                  coordinate={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                  }}
                />
              </MapView>
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.seeker_primary} />
            </View>
          )}

          {isLocationModalVisible && (
            <BottomModal visible={isLocationModalVisible}>
              <SearchLocationModal
                search={search}
                searchData={searchData}
                onChangeSearch={onChangeSearch}
                onPressCross={onPressCross}
                onPressConfirmLocation={onPressConfirmLocation}
                onSelectPlace={setIsPlaceId}
                setIsAddressModalVisible={setIsAddressModalVisible}
                setIsLocationModalVisible={setIsLocationModalVisible}
              />
            </BottomModal>
          )}

          {isAddressModalVisible && (
            <BottomModal visible={isAddressModalVisible}>
              <AddLocation
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                setIsAddressModalVisible={setIsAddressModalVisible}
                currentLocation={search}
                onConfirm={() => {
                  // setIsLocationModalVisible(true);
                }}
                setIsLocationModalVisible={setIsLocationModalVisible}
                regions={regions}
              />
            </BottomModal>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeareaProvider>
  );
};

export default SetLocation;

const getGlobalStyles = (_language: any) => {
  return StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerPadding: {
    paddingHorizontal: wp(24),
  },
  backIcon: {
    height: hp(22),
    width: wp(15),
    resizeMode: 'contain',
  },
  keyboardContainer: {
    flex: 1,
    marginTop: hp(21),
  },
  flexContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    position: 'absolute',
    bottom: hp(76),
    right: wp(22),
  },
  currentLocationButton: {
    width: wp(47),
    height: wp(47),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  locationIcon: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
  },
  textInput: {
    marginTop: hp(38),
    borderRadius: hp(10),
  },
  continueButton: {
    marginVertical: hp(30),
    backgroundColor: Colors.seeker_primary,
  },
})}