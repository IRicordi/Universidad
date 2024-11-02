import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/components/HomeScreen';
import AthletesScreen from './src/components/AthletesScreen';
import ClubsScreen from './src/components/ClubsScreen';
import AuthScreen from './src/components/AuthScreen';
import ProfileScreen from './src/components/ProfileScreen';
import CalendarScreen from './src/components/CalendarScreen';
import FavoritesScreen from './src/components/FavoritesScreen';
import DevTools from './src/components/DevTools';
import LogInScreen from './src/components/LogInScreen';
import RegisterScreen from './src/components/RegisterScreen';


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Aqui esta el codigo de navegacion entre pantallas
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ 
          title: 'Inicio',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ 
          title: 'Calendario',
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ 
          title: 'Favoritos',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator({ onResetAuth }) {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MainTabs') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Athletes') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Clubs') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: '#2196F3',
      })}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          title: 'Inicio',
          headerShown: true
        }}
      />
      <Drawer.Screen 
        name="Athletes" 
        component={AthletesScreen}
        options={{
          title: 'Deportistas'
        }}
      />
      <Drawer.Screen 
        name="Clubs" 
        component={ClubsScreen}
        options={{
          title: 'Clubes'
        }}
      />
      <Drawer.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          title: 'Calendario'
        }}
      />
      <Drawer.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title: 'Favoritos'
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Perfil'
        }}
      />
      {__DEV__ && (
        <Drawer.Screen 
          name="DevTools" 
          options={{ 
            title: 'Dev Tools',
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'construct' : 'construct-outline'} 
                size={size} 
                color={color} 
              />
            )
          }}
        >
          {props => <DevTools {...props} onResetAuth={onResetAuth} />}
        </Drawer.Screen>
      )}
    </Drawer.Navigator>
  );
}


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleRegister = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleResetAuth = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen 
              name="Auth" 
              options={{ headerShown: false }}
            >
              {props => (
                <AuthScreen
                  {...props}
                  onSkip={handleSkip}
                />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="LogIn" 
              options={{ 
                headerShown: true,
                title: 'Iniciar Sesión'
              }}
            >
              {props => <LogInScreen {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen 
              name="Register" 
              options={{ 
                headerShown: true,
                title: 'Crear Cuenta'
              }}
            >
              {props => <RegisterScreen {...props} onRegister={handleRegister} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen 
            name="Main" 
            options={{ headerShown: false }}
          >
            {props => <DrawerNavigator {...props} onResetAuth={handleResetAuth} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}