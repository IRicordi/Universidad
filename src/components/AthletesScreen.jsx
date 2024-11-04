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
import { useTranslation } from 'react-i18next';

const AthletesScreen = () => {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { t } = useTranslation();

    useEffect(() => {
        loadAthletes();
    }, []);

    const loadAthletes = async () => {
        try {
            const athletesRef = collection(FIREBASE_DB, 'swimmers');
            const q = query(athletesRef, orderBy('name', 'asc'));
            const querySnapshot = await getDocs(q);
            
            const athletesList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setAthletes(athletesList);
        } catch (error) {
            console.error('Error cargando deportistas:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderAthleteItem = useMemo(() => ({ item }) => (
      <TouchableOpacity
          style={styles.athleteCard}
          onPress={() => navigation.navigate('AthleteDetail', { athlete: item })}
      >
          <View style={styles.athleteInfo}>
              <Text style={styles.athleteName}>{item.name}</Text>
              <Text style={styles.athleteDetails}>
                  {item.Club} • {item.Edad} años
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
                data={athletes}
                keyExtractor={(item) => item.id}
                renderItem={renderAthleteItem}
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
    athleteCard: {
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
    athleteInfo: {
        flex: 1,
    },
    athleteName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    athleteDetails: {
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

export default React.memo(AthletesScreen);