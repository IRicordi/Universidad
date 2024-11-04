import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/Translations/i18n'; 
import { useTranslation } from 'react-i18next';

import HomeScreen from './src/components/HomeScreen';
import AthletesScreen from './src/components/AthletesScreen';
import AthleteDetailScreen from './src/components/AthleteDetailScreen';
import ClubsScreen from './src/components/ClubsScreen';
import ClubDetailScreen from './src/components/ClubDetailScreen';
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

function TabNavigator() {
  const { t } = useTranslation();
  
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
          title: t('navigation.home'),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ 
          title: t('navigation.calendar'),
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ 
          title: t('navigation.favorites'),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

const ClubStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerLeft: () => {
          if (route.name === 'ClubDetail') {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            );
          }
          return (
            <Ionicons
              name="menu"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          );
        }
      })}
    >
      <Stack.Screen 
        name="ClubsList" 
        component={ClubsScreen}
        options={{
          title: t('screenTitles.clubsList'),
          headerShown: true
        }}
      />
      <Stack.Screen 
        name="ClubDetail" 
        component={ClubDetailScreen}
        options={{
          title: t('screenTitles.clubDetails'),
          headerShown: true
        }}
      />
    </Stack.Navigator>
  );
};

const AthleteStack = createNativeStackNavigator();

const AthleteStackNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <AthleteStack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerLeft: () => {
          if (route.name === 'AthleteDetail') {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            );
          }
          return (
            <Ionicons
              name="menu"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          );
        }
      })}
    >
      <AthleteStack.Screen 
        name="AthletesList" 
        component={AthletesScreen}
        options={{
          title: t('screenTitles.athletesList'),
          headerShown: true
        }}
      />
      <AthleteStack.Screen 
        name="AthleteDetail" 
        component={AthleteDetailScreen}
        options={{
          title: t('screenTitles.athleteDetails'),
          headerShown: true
        }}
      />
    </AthleteStack.Navigator>
  );
};

function DrawerNavigator({ onResetAuth }) {
  const { t } = useTranslation();
  
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
          title: t('navigation.home'),
          headerShown: true
        }}
      />
      <Drawer.Screen 
        name="Athletes" 
        component={AthleteStackNavigator}
        options={{
          title: t('navigation.athletes'),
          headerShown: false
        }}
      />
      <Drawer.Screen 
        name="Clubs" 
        component={ClubStackNavigator}
        options={{
          title: t('navigation.clubs'),
          headerShown: false
        }}
      />
      <Drawer.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{
          title: t('navigation.calendar')
        }}
      />
      <Drawer.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          title: t('navigation.favorites')
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: t('navigation.profile')
        }}
      />
      {__DEV__ && (
        <Drawer.Screen 
          name="DevTools" 
          options={{ 
            title: t('navigation.devTools'),
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
  const { t } = useTranslation();

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
    await AsyncStorage.setItem('isGuest', 'true');
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
    <I18nextProvider i18n={i18n}>
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
                  title: t('navigation.login')
                }}
              >
                {props => <LogInScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
              <Stack.Screen 
                name="Register" 
                options={{ 
                  headerShown: true,
                  title: t('navigation.register')
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
    </I18nextProvider>
  );
}