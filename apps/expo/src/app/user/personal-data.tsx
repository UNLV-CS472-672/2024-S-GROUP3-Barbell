import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const borderRadius = 12;
const styles = StyleSheet.create({
  userTile: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userInfoTile: {
    textAlign: 'center',
    padding: 8
  },
  userInfoTileUpper: {
    fontSize: 18,
  },
  userInfoTileLower: {
  },
  userTileItem: {
    flex: 1,
    textAlign: 'center',
    padding: 4,
    backgroundColor: '#ffffff',
    margin: 12,
    borderRadius: borderRadius
  },
});

// const PersonalData = ({ user }) => { // TODO: how to get prisma user model type for param?
const PersonalData = () => {
  const user = { name: 'user', height: '180cm', weight: '80kg', age: 22 };
  const userInfoItems = [
    { title: 'Height', value: user?.height },
    { title: 'Weight', value: user?.weight },
    { title: 'Age', value: user?.age },
  ];

  return (
    <SafeAreaView>
      <Text>Personal Data</Text>
      <Text>{user.name}</Text>
      <FlatList contentContainerStyle={styles.userTile} data={userInfoItems} renderItem={( { item }) => (
        <View style={styles.userTileItem}>
          <Text style={[styles.userInfoTile, styles.userInfoTileUpper]}>{item.value}</Text>
          <Text style={[styles.userInfoTile, styles.userInfoTileLower]}>{item.title}</Text>
        </View>
      )}/>
    </SafeAreaView>
  )
}

export default PersonalData;
