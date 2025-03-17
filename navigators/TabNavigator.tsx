import React from 'react'
import { StyleSheet } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CustomIcon from '../components/CustomIcon'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard: true,
            tabBarShowLabel:false,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground:()=>(
                <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles}/>
            ), 
        headerShown:false}}>
            <Tab.Screen name='Favorite' component={Song} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='like' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
            <Tab.Screen name='History' component={PlayList} options={{
                tabBarIcon:({focused,color,size})=>(
                    <CustomIcon name='bell' size={25} color={focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
                )
            }}></Tab.Screen>
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
    tabBarStyle:{
        height:45,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent',
    },
    BlurViewStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
})
export default TabNavigator