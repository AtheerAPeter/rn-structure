import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../@Types/INavigation';
import {useFood} from '../../Hooks/useFood';
import {IFood} from '../../@Types/IFood';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenWidth} from '../../Theme/dimentions';
import {Colors} from '../../Theme/colors';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const Home = (props: Props) => {
  const {food, foodQuery, fetchNextPage} = useFood({
    queryEnabled: true,
  });

  const goToDetailsScreen = (id: number) => {
    return () => {
      props.navigation.navigate('Details', {id});
    };
  };

  const renderItem = ({item}: ListRenderItemInfo<IFood>) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={goToDetailsScreen(item.id)}>
        <Image style={styles.cardImage} source={{uri: item.image}} />
        <View style={styles.cardType}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: IFood) => item.id.toString();

  if (foodQuery.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        onEndReached={fetchNextPage}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
        numColumns={2}
        keyExtractor={keyExtractor}
        data={food}
        renderItem={renderItem}
      />
      {foodQuery.isFetchingNextPage && (
        <Text style={styles.loadMoreText}>Loading More...</Text>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.accent,
    marginBottom: 20,
    borderRadius: 5,
  },
  cardImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '70%',
    width: ScreenWidth / 2 - 20,
  },
  cardType: {
    padding: 5,
  },
  cardTitle: {fontWeight: 'bold'},
  cardPrice: {},
  columnWrapper: {justifyContent: 'space-between'},
  list: {paddingHorizontal: 10},
  loadMoreText: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
