import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {hp, wp, commonFontStyle} from '@/utils/responsiveFn'
import {Colors} from '@/constants/Colors'
import {IMAGES} from '@/assets/images'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {HeaderBackButton} from '@react-navigation/elements'
import { navigationRef } from '@/navigation/RootContainer'

const initialSearches = [
  'Spark plug replacement',
  'Brake fluid exchange',
  'Oil change and filter replacement',
  'Serpentine belt inspection',
  'Wiper blade inspection',
  'Battery testing',
  'Tire replacement',
  'Engine air filter',
  'Belts and hoses',
  'Brake pads',
]

const SearchScreen = () => {
  const [search, setSearch] = useState('')
  const [recentSearches, setRecentSearches] = useState(initialSearches)

  const filteredSearches = search
    ? recentSearches.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      )
    : recentSearches

  const displayCount = filteredSearches.length > 2 ? 4 : 2
  const displaySearches = filteredSearches.slice(0, displayCount)

  const handleRemove = (item: string) => {
    setRecentSearches(recentSearches.filter(i => i !== item))
  }

  const handleClearAll = () => {
    setRecentSearches([])
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigationRef.current?.goBack()} style={{marginBottom: hp(25)}} />
        <View style={styles.searchBar}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder='Car Battery Replacement'
            value={search}
            onChangeText={setSearch}
            placeholderTextColor='#3A3A3A'
          />
          <TouchableOpacity>
            <Image source={IMAGES.filter} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Recent Search</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displaySearches}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Image source={IMAGES.close2} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
        style={styles.flatList}
        keyboardShouldPersistTaps='handled'
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp(20),
    paddingTop: hp(30),
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors._E7E7E7,
    borderRadius: hp(25),
    height: hp(50),
    marginRight: 20,
    marginBottom: hp(25),
    width: '90%',
  },
  searchIcon: {
    width: wp(20),
    height: hp(25),
    marginRight: wp(8),
    marginLeft: wp(12),
    tintColor: Colors._4C4C4C,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(20),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
  },
  itemText: {
    ...commonFontStyle(400, 1.9, '#868686'),
    flex: 1,
  },
  removeIcon: {
    width: wp(12),
    height: hp(12),
    color: Colors._888888,
    marginLeft: wp(10),
    fontWeight: 'bold',
    tintColor: '#AAAAAA'
  },
})

export default SearchScreen
