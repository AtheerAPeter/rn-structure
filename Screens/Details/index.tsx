import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../@Types/INavigation';
import {useFoodById} from '../../Hooks/useFoodById';
import {ScreenWidth} from '../../Theme/dimentions';

type Props = StackScreenProps<RootStackParamList, 'Details'>;

const Details = (props: Props) => {
  const id = props.route.params.id;

  const {food, foodQuery} = useFoodById(id);
  const back = () => {
    props.navigation.goBack();
  };

  if (foodQuery.isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={back} style={styles.backBtn}>
        <Text>X</Text>
      </TouchableOpacity>
      <Image style={styles.image} source={{uri: food?.image}} />
      <View style={styles.type}>
        <Text style={styles.title}>{food?.name}</Text>
        <Text style={styles.description}>{food?.description}</Text>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: ScreenWidth,
    height: ScreenWidth,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  type: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  description: {marginTop: 10},
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
