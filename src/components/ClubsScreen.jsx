import React, { useState, useEffect, useMemo } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';
import { FIREBASE_DB } from '../Config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
// Cambia la importación de i18n a ser relativa desde el componente
import { useTranslation } from 'react-i18next';

const ClubsScreen = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { t } = useTranslation();

    useEffect(() => {
        loadClubs();
    }, []);

    const loadClubs = async () => {
        try {
            const clubsRef = collection(FIREBASE_DB, 'clubs');
            const q = query(clubsRef, orderBy('name', 'asc'));
            const querySnapshot = await getDocs(q);
            
            const clubsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setClubs(clubsList);
        } catch (error) {
            console.error('Error cargando clubes:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderClubItem = useMemo(() => ({ item }) => (
        <TouchableOpacity
            style={styles.clubCard}
            onPress={() => navigation.navigate('ClubDetail', { club: item })}
        >
            <View style={styles.clubInfo}>
                <Text style={styles.clubName}>{item.name}</Text>
                <Text style={styles.clubLocation}>
                    {item.comuna}, {item.region}
                </Text>
            </View>
            <View style={styles.arrow}>
                <Text>→</Text>
            </View>
        </TouchableOpacity>
    ), []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066CC" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={clubs}
                keyExtractor={(item) => item.id}
                renderItem={renderClubItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
    },
    clubCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    clubInfo: {
        flex: 1,
    },
    clubName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    clubLocation: {
        fontSize: 14,
        color: '#666',
    },
    arrow: {
        marginLeft: 10,
        opacity: 0.3,
    },
    separator: {
        height: 12,
    },
});

export default React.memo(ClubsScreen);