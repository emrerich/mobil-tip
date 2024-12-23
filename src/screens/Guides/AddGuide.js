import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function AddGuide() {
    const [guideName, setGuideName] = useState('');
    const [testType, setTestType] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [mean, setMean] = useState('');
    const [geometricMean, setGeometricMean] = useState('');
    const [confidenceInterval, setConfidenceInterval] = useState('');
    const [ageGroups, setAgeGroups] = useState([]);

    const navigation = useNavigation();

    // Yaş grubu ekleme işlemi
    const addAgeGroup = () => {
        if (!ageGroup || !min || !max || !mean || !geometricMean || !confidenceInterval) {
            Alert.alert('Error', 'Please fill all fields for the age group!');
            return;
        }

        const newAgeGroup = {
            ageGroup,
            min: parseFloat(min),
            max: parseFloat(max),
            mean,
            geometricMean,
            confidenceInterval,
        };

        setAgeGroups([...ageGroups, newAgeGroup]);

        // Clear the fields for next input
        setAgeGroup('');
        setMin('');
        setMax('');
        setMean('');
        setGeometricMean('');
        setConfidenceInterval('');
    };

    // Kılavuz ekleme işlemi
    const onAddGuidePress = async () => {
        if (!guideName || !testType || ageGroups.length === 0) {
            Alert.alert('Error', 'Please fill all fields and add at least one age group!');
            return;
        }

        try {
            const guideData = {
                guideName,
                testType,
                ageGroups,
            };

            await addDoc(collection(db, 'guides'), guideData);
            Alert.alert('Success', 'Guide added successfully!');
            setGuideName('');
            setTestType('');
            setAgeGroups([]);
        } catch (error) {
            console.error('Error adding guide: ', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Geri Dön Butonu */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
            {/* Listeleri Görme Butonu */}
            <TouchableOpacity style={styles.listButton} onPress={() => navigation.navigate('ListGuide')}>
                <Text style={styles.buttonText}>View Guides</Text>
            </TouchableOpacity>
            
            <TextInput
                style={styles.input}
                placeholder="Guide Name"
                value={guideName}
                onChangeText={setGuideName}
            />
            <TextInput
                style={styles.input}
                placeholder="Test Type (e.g., IgA)"
                value={testType}
                onChangeText={setTestType}
            />
            <Text style={styles.sectionTitle}>Add Age Group</Text>
            <TextInput
                style={styles.input}
                placeholder="Age Group (e.g., 0-30 days)"
                value={ageGroup}
                onChangeText={setAgeGroup}
            />
            <TextInput
                style={styles.input}
                placeholder="Min Value"
                value={min}
                onChangeText={setMin}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Max Value"
                value={max}
                onChangeText={setMax}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Mean (e.g., 6.79 ± 0.45)"
                value={mean}
                onChangeText={setMean}
            />
            <TextInput
                style={styles.input}
                placeholder="Geometric Mean (e.g., 6.77 ± 0.45)"
                value={geometricMean}
                onChangeText={setGeometricMean}
            />
            <TextInput
                style={styles.input}
                placeholder="Confidence Interval (e.g., 6.62–6.95)"
                value={confidenceInterval}
                onChangeText={setConfidenceInterval}
            />
            <TouchableOpacity style={styles.addButton} onPress={addAgeGroup}>
                <Text style={styles.buttonText}>Add Age Group</Text>
            </TouchableOpacity>
            <FlatList
                data={ageGroups}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <Text style={styles.ageGroupText}>
                        {index + 1}. {item.ageGroup}: {item.min} - {item.max} ({item.mean})
                    </Text>
                )}
            />
            <TouchableOpacity style={styles.saveButton} onPress={onAddGuidePress}>
                <Text style={styles.buttonText}>Save Guide</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    listButton: {
        backgroundColor: '#17a2b8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    ageGroupText: {
        fontSize: 16,
        marginVertical: 5,
    },
});
