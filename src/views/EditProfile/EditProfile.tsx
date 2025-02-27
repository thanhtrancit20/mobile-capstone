import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import { Icon, Text } from '@rneui/base';
import { Avatar } from '@rneui/themed';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Heading } from "@/components/ui/heading"
import { VStack } from '@/components/ui/vstack';
import UserInfoField from '@/src/components/UserInfoField/UserInfoField';

const { width } = Dimensions.get('window');

const departmentMap: Record<number, string> = {
  1: "Computing and Information Technology",
  2: "Nursing",
  3: "Business",
  4: "Engineering",
};

const EditProfile = () => {
  const { userinfo, isFetching, onGetUserInfo } = useGetUserInfo({
    enabled: true,
  });

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className="flex-1">
        <View className="absolute w-full h-full bg-blue-500"></View>

        <View className="relative flex-1 bg-[#f7f7fb] rounded-tl-3xl rounded-tr-3xl mt-32 py-5">
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size={120}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1154/1154987.png' }}
              containerStyle={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="edit" type="material" color="#fff" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.scrollContainer}>
            <View className="w-11/12 px-3">

              <VStack className='items-center mb-5'>
                <Heading>{userinfo?.firstName} {userinfo?.lastName}</Heading>
                <Text className='text-lg'>IRN: {userinfo?.studentId}</Text>
              </VStack>

              <UserInfoField infoField="Status" infoValue={userinfo?.present} />
              <UserInfoField infoField="Gender" infoValue={userinfo?.gender} />
              <UserInfoField infoField="Date of Birth" infoValue={userinfo?.dateOfBirth.toString()} />
              <UserInfoField infoField="Degree Level" infoValue={userinfo?.degreeLevel} />
              <UserInfoField infoField="Department" infoValue={departmentMap[userinfo?.departmentId]} />
              <UserInfoField infoField="Address" infoValue={userinfo?.address} />
              <UserInfoField infoField="Phone Number" infoValue={userinfo?.phoneNumber} />

            </View>
          </View>
        </View>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: -60,
    left: width / 2 - 60,
  },
  avatar: {
    borderWidth: 4,
    borderColor: 'white',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#004AAD',
    borderRadius: 20,
    padding: 6,
  },
  scrollContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  saveButton: {
    backgroundColor: '#004AAD',
    borderRadius: 50,
    paddingVertical: 12,
    marginTop: 10,
  },
});

export default EditProfile;
