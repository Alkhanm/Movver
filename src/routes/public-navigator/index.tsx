/** Rotas públicas da aplicação.
 * Podem ser acessadas antes do login ou após o logout.
 */
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import Login from '../../components/auth/login'
import Register from '../../components/auth/register'



const Stack = createStackNavigator()

const PublicNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

export default PublicNavigator;