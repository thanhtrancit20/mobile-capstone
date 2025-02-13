import { HStack } from '@/components/ui/hstack';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Avatar } from '@rneui/themed';
import { Button, Icon, ListItem } from '@rneui/base';
import { VStack } from '@/components/ui/vstack';
import { BR } from '@expo/html-elements';
const Settings = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-full w-full p-8 flex flex-col justify-between">
        <View>
          <HStack space="lg" alignItems="center">
            <Avatar
              size={80}
              rounded
              source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
              // title="Bj"
              containerStyle={{ backgroundColor: 'grey' }}>
              <Avatar.Accessory
                size={23}
                style={{ backgroundColor: 'white' }}
                containerStyle={{ backgroundColor: 'white', borderRadius: 50 }}
                iconProps={{
                  name: 'camerao',
                  color: 'black',
                  size: 15,
                }}
                type="antdesign"
              />
            </Avatar>
            <View>
              <Text className="text-3xl font-semibold">Sabrina Aryan</Text>
              <Text className="text-gray-500 mb-3">SabrinaAry208@gmailcom</Text>
              <Button size="sm" containerStyle={{ borderRadius: 7, width: 120 }}>
                Edit Profile
              </Button>
            </View>
          </HStack>
          <View className="mt-12 -ml-4">
            <ListItem>
              <Icon name="infocirlceo" type="antdesign" color="black" />
              <ListItem.Content>
                <ListItem.Title>Information</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="black" size={23} />
            </ListItem>
            <ListItem>
              <Icon name="logout" type="antdesign" color="black" />
              <ListItem.Content>
                <ListItem.Title>Log out</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron color="black" size={23} />
            </ListItem>
          </View>
        </View>
        <View>
          <View
            className="mb-2"
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text className="text-center text-sm text-gray-500">App Version 2.3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
