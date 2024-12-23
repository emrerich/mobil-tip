import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ListGuide() {
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'guides'), (snapshot) => {
            const fetchedGuides = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setGuides(fetchedGuides);
        });

        return () => unsubscribe();
    }, []);

    const renderGuide = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.guideName}</Text>
            <Text>Test Type: {item.testType}</Text>
            <Text>Age Groups:</Text>
            {item.ageGroups.map((group, index) => (
                <Text key={index}>
                    {group.ageGroup}: {group.min} - {group.max} ({group.mean})
                </Text>
            ))}
        </View>
    );

    return (
        <FlatList
            data={guides}
            renderItem={renderGuide}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
