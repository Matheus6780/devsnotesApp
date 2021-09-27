import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListScreen from '../screens/ListScreen'
import EditNoteScreen from '../screens/EditNoteScreen'

const Stack = createStackNavigator()

export default () => {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#222'
            },
            headerTintColor: 'white'
        }}>
            <Stack.Screen name="List" component={ListScreen}/>
            <Stack.Screen name="EditNote" component={EditNoteScreen}/>
        </Stack.Navigator>
    )
}