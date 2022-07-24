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
import Icon from 'react-native-dynamic-vector-icons';

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
        <Icon name="left" type="AntDesign" size={25} color="black" />
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
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
