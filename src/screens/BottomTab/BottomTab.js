import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import { ListGuide } from '../Guides';
import Mypatients from '../Mypatients'; // Mypatients sayfasını import et
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Stilleri import et
import styles from './Styles';

// Tab Navigator oluşturma
const Tab = createBottomTabNavigator();

// Kullanıcı rolünü al
const getUserRole = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, 'users', userId); // Firestore'da 'users' koleksiyonunda kullanıcı verilerini alıyoruz.
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.role; // Kullanıcının rolü (doctor, patient vb.)
  } else {
    console.log('No such user!');
    return null;
  }
};

export default function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      // Kullanıcıyı bulduk, rolünü alıyoruz
      getUserRole(user.uid).then(role => {
        setUserRole(role); // Kullanıcı rolünü state'e kaydediyoruz
      });
    }
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Tab ikonlarını tanımlama
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              case 'Analysis':
                iconName = focused ? 'information-circle' : 'information-circle-outline';
                break;
              default:
                iconName = 'ellipse-outline';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          // Tab bar stilleri
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerStyle: styles.header, // Header stilleri
          tabBarStyle: styles.tabBar, // Tab bar stilleri
        })}
      >
        {/* Home, Profile ve Settings sayfalarını ekle */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={/* SettingsScreen */ () => null} />

        {/* Analysis kısmı kullanıcının rolüne göre gösterilecek */}
        <Tab.Screen
          name="Analysis"
          component={userRole === 'patient' ? ListGuide : Mypatients} // Rol 'patient' ise ListGuide, 'doctor' ise Mypatients
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
