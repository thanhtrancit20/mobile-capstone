import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { useGetUserInfo } from '@/src/queries/Auth/useGetUserInfo';
import { Icon, Text } from '@rneui/base';
import { Avatar, Button } from '@rneui/themed';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const EditProfile = () => {
  const { data: userinfo, isFetching, onGetUserInfo } = useGetUserInfo();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (userinfo) {
      setValue('firstName', userinfo.firstName);
      setValue('lastName', userinfo.lastName);
      setValue('username', userinfo.username);
      setValue('email', userinfo.email);
      setValue('phoneNumber', userinfo.phoneNumber);
    }
  }, [userinfo, setValue]);

  const onSubmit = (formData) => {
    console.log('Updated Data:', formData);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View className='flex-1'>
        <View className='absolute w-full h-full bg-blue-200'></View>

        <View className='relative flex-1 bg-white rounded-tl-3xl rounded-tr-3xl mt-32 py-5'>
          <View style={styles.avatarContainer}>
            <Avatar
              rounded
              size={120}
              source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
              containerStyle={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name='edit' type='material' color='#fff' size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.scrollContainer}>
            <Text className='text-3xl font-extrablack'>Edit Profile</Text>
            <View className='w-11/12 px-3'>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>First Name</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name='firstName'
                  render={({ field: { onChange, value } }) => (
                    <Input className='mb-3 rounded-2xl' size='lg'>
                      <InputField type='text' placeholder='First name' value={value} onChangeText={onChange} />
                    </Input>
                  )}
                />

                <FormControlLabel>
                  <FormControlLabelText>Last Name</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name='lastName'
                  render={({ field: { onChange, value } }) => (
                    <Input className='mb-3 rounded-2xl' size='lg'>
                      <InputField type='text' placeholder='Last name' value={value} onChangeText={onChange} />
                    </Input>
                  )}
                />

                <FormControlLabel>
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name='username'
                  render={({ field: { value } }) => (
                    <Input className='mb-3 rounded-2xl bg-gray-300' size='lg' isReadOnly={true}>
                      <InputField type='text' placeholder='Username' value={value} />
                    </Input>
                  )}
                />

                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { value } }) => (
                    <Input className='mb-3 rounded-2xl bg-gray-300' size='lg' isReadOnly={true}>
                      <InputField type='text' placeholder='Email' value={value} />
                    </Input>
                  )}
                />

                <FormControlLabel>
                  <FormControlLabelText>Phone Number</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name='phoneNumber'
                  render={({ field: { onChange, value } }) => (
                    <Input className='mb-3 rounded-2xl' size='lg'>
                      <InputField type='text' placeholder='Phone number' value={value} onChangeText={onChange} />
                    </Input>
                  )}
                />
              </FormControl>

              <Button title='Save Change' buttonStyle={styles.saveButton} onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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

