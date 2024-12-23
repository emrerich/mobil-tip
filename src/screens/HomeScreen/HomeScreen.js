import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { db, auth } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import LoadingModal from '../../utils/LoadingModal';

export default function HomeScreen(props) {
    const [entityText, setEntityText] = useState('');
    const [entities, setEntities] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showMoreUsers, setShowMoreUsers] = useState(false);

    const navigation = useNavigation();
    const userID = props.extraData.id;
    const entityRef = collection(db, 'entities');
    const usersRef = collection(db, 'users');

    useEffect(() => {
        setLoading(true);

        // Kullanıcı rolünü kontrol et
        const fetchUserRole = async () => {
            try {
                const userDoc = doc(db, 'users', userID);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setIsAdmin(userData.role === 'admin'); // Admin kontrolü
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();

        // Entity'leri dinle
        const q = query(
            entityRef,
            where("authorID", "==", userID),
            orderBy('createdAt', 'desc')
        );

        const unsubscribeEntities = onSnapshot(q,
            (querySnapshot) => {
                const newEntities = [];
                querySnapshot.forEach(doc => {
                    const entity = doc.data();
                    entity.id = doc.id;
                    newEntities.push(entity);
                });
                setEntities(newEntities);
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);
            }
        );

        // Kullanıcıları dinle
        const unsubscribeUsers = onSnapshot(usersRef, (querySnapshot) => {
            const allUsers = [];
            querySnapshot.forEach(doc => {
                const user = doc.data();
                user.id = doc.id;
                allUsers.push(user);
            });
            setUsers(allUsers);
        });

        return () => {
            unsubscribeEntities();
            unsubscribeUsers();
        };
    }, []);

    const onAddButtonPress = async () => {
        if (entityText && entityText.length > 0) {
            setLoading(true);
            try {
                const data = {
                    text: entityText,
                    authorID: userID,
                    createdAt: serverTimestamp(),
                };
                await addDoc(entityRef, data);
                setEntityText('');
                Keyboard.dismiss();
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const onLogoutPress = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            alert(error.message);
        }
    };

    const renderEntity = ({ item, index }) => (
        <View style={styles.entityContainer}>
            <Text style={styles.entityText}>
                {index + 1}. {item.text}
            </Text>
        </View>
    );

    const renderUser = ({ item, index }) => (
        <View style={styles.entityContainer}>
            <Text style={styles.entityText}>
                {index + 1}. {item.fullName} - {item.email}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Admin için özel bölüm */}
            {isAdmin && (
            <View style={styles.adminContainer}>
                <Text style={styles.adminText}>Welcome, Admin!</Text>

                {/* Kılavuz ekle butonu */}
                <TouchableOpacity
                    style={[styles.adminButton, { marginBottom: 10 }]}
                    onPress={() => navigation.navigate('AddGuide')}
                >
                    <Text style={styles.buttonText}>Add Guide</Text>
                </TouchableOpacity>

                {/* Kullanıcı listesi */}
                <Text style={styles.sectionTitle}>User List:</Text>
                <FlatList
                    data={showMoreUsers ? users : users.slice(0, 3)} // İlk 3 kullanıcıyı göster
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
                {!showMoreUsers && users.length > 3 && (
                    <TouchableOpacity
                        style={styles.showMoreButton}
                        onPress={() => setShowMoreUsers(true)}
                    >
                        <Text style={styles.buttonText}>Show More</Text>
                    </TouchableOpacity>
                )}
            </View>
        )}


            {/* Normal kullanıcılar için entity listesi */}
            {entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <LoadingModal isVisible={loading} />
        </View>
    );
}
