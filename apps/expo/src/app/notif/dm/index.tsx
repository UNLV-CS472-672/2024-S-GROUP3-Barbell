import React from 'react'
import { Image, Button, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: '#1E1E1E',
    
  },

  screenName: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
  },

  splitTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  separator: {
    height: 2,
    backgroundColor: '#CACACA',
    marginHorizontal: 0,
    opacity: 0.5,
  },

  chats: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  chatDiv: {
    height: 2,
    backgroundColor: '#CACACA',
    marginHorizontal: 16,
    opacity: 0.5,
  },
})

const Separator = () => (
    <View style={styles.separator} />
  );

const Chats = () => (
  <View>
    <TouchableOpacity 
            className='px-6 py-5'
            onPress={() => {router.replace('/')}}>
            <Text className='font-IstokWeb pb-1 pr-2 text-right text-[#FFFFFF]'>
            Recieved
            </Text>
            <View style={styles.chats}>
              <Image source={require('assets/buttons/Arrow40.png')}
              className=''></Image>
              <View>
                <Text className='font-IstokWeb px-4 pb-1  text-left text-[#FFFFFF]'>
                John Doe
                </Text>
                <Text className='font-IstokWeb px-4 pb-1  text-left text-[#FFFFFF]'>
                Last Message Recieved
                </Text>
              </View>
            </View>
          </TouchableOpacity>
    <View style={styles.chatDiv}></View>
  </View>
);

const DM = () => {
  return (
    <View style={styles.container}>
      <View style={styles.screenName}>
          <TouchableOpacity 
            onPress={() => {router.replace('/')}}>
            <Image source={require('assets/buttons/Arrow40.png')}
            className='top-3'></Image>
          </TouchableOpacity>
        <Text className='font-koulen text-4xl font-semibold text-[#CACACA] text-center px-16'>Direct Messages</Text>
        <TouchableOpacity 
            onPress={() => {router.replace('/')}}>
            <Image source={require('assets/buttons/WriteNew40.png')}
            className='top-3'></Image>
          </TouchableOpacity>
      </View>
      <View style={{height:5}} />
        <View style={styles.splitTop}>
          <TouchableOpacity className="mb-4 rounded-[18px] bg-[#FFFFFF] bg-cover px-8 py-2">
            <Text className="font-koulen text-center text-xl font-semibold">
              Notifications
            </Text>
          </TouchableOpacity>
          <Text className="mb-4 rounded-[18px] bg-[#48476D] px-12 py-2 font-koulen text-center text-xl font-semibold text-[#FFFFFF]">
            Directs
          </Text>
          <TouchableOpacity className="mb-4 rounded-[18px] bg-[#FFFFFF] px-12 py-2">
            <Text className="font-koulen text-center text-xl font-semibold ">
              Groups
            </Text>
          </TouchableOpacity>
        </View>
        <Separator/>
        <Chats />
        <Chats />
    </View>
  )
}

export default DM