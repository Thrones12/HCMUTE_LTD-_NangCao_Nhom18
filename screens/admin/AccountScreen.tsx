import { View, Text } from 'react-native'
import React, { useContext } from "react";
import { ButtonComponent } from '@/components'
import { AuthContext } from "@/contexts/AuthContext";

const AccountScreen = () => {
const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>AccountScreen</Text>
      <ButtonComponent text='Logout' onPress={logout} type='primary' />
    </View>

  )
}

export default AccountScreen