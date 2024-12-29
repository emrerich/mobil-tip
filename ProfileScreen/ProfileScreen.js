import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles'; // Styles dosyasını import et

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const [userName, setUserName] = useState(''); // Kullanıcı adını saklamak için state

  // Firebase'den kullanıcı adı bilgisi almak için useEffect kullanıyoruz
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.fullName || 'No name provided'); // displayName bilgisi varsa göster, yoksa default metin
    }
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out? ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth); // Firebase'den çıkış yap
              navigation.replace("Login"); // Login ekranına yönlendir
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Profil Fotoğrafı */}
      <Image
        source={require('./assets/icon.png')} // Profil fotoğrafı olarak icon.png'yi yükle
        style={styles.profileImage}
      />

      <Text style={styles.title}>Profile Page</Text>

      {/* Firebase'den alınan kullanıcı adını burada gösteriyoruz */}
      <Text style={styles.userName}>Hello, {userName}</Text>
      
      <Text style={styles.subtitle}>Welcome to your profile!</Text>

      {/* Çıkış Butonu */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
