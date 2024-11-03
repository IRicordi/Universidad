import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { MainColors } from './Styles';

const { width } = Dimensions.get('window');
const { primary, text, secondary, background, purewhite, tertiary } = MainColors;

const NewsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const newsData = [
        {
          id: 1,
          title: "Disponible la lista de sustancias prohibidas para 2025",
          description: "Nueva lista de sustancias prohibidas para 2025 incluye cambios en formoterol, donaciones de sangre y clasificación del hidracfinil.Tenga en cuenta que el Organismo Mundial Antidopaje ha publicado una lista actualizada de Sustancias prohibidas que entrarán en vigencia el 1 de enero de 2025.",
          image: require('../../assets/news1.png'), // Primera noticia
        },
        {
          id: 2,
          title: "Sudamericano máster de natación: Delegación chilena obtiene 96 medallas y Andrea Müller premiada como mejor marca técnica",
          description: "Más de 200 nadadores de la delegación chilena dieron todo en los 5 días de competencia, en donde acumularon 96 medallas (29 de oro), sumado a múltiples récords sudamericanos y un récord mundial..",
          image: require('../../assets/News2.jpg'), // segunda noticia
        },
        {
          id: 3,
          title: "17 medallas y un récord sudamericano para Chile en el primer día del Sudamericano Master de Natación",
          description: "La delegación chilena tuvo un buen debut, tras conseguir 17 medallas (7 de oro) y un récord sudamericano por parte de Andrea Müller en los 100 metros mariposa (1:08.09).",
          image: require('../../assets/News3.jpg'), // tercera noticia
        },
    ];

    const scrollToNextItem = () => {
        const nextIndex = (currentIndex + 1) % newsData.length;
        
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        scrollViewRef.current?.scrollTo({
            x: nextIndex * width,
            animated: true,
        });
        
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        const timer = setInterval(scrollToNextItem, 20000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleScroll = (event) => {
        const contentOffset = event.nativeEvent.contentOffset;
        const index = Math.round(contentOffset.x / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    const goToSlide = (index) => {
        scrollViewRef.current?.scrollTo({
            x: index * width,
            animated: true,
        });
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {newsData.map((item, index) => (
                    <Animated.View 
                        key={item.id} 
                        style={[
                            styles.slide,
                            { opacity: fadeAnim }
                        ]}
                    >
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </Animated.View>
                ))}
            </ScrollView>

            <View style={styles.pagination}>
                {newsData.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => goToSlide(index)}
                    >
                        <View
                            style={[
                                styles.paginationDot,
                                index === currentIndex && styles.paginationDotActive,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 450,
        backgroundColor: background,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 20,
        width: width - 40, 
        alignSelf: 'center',
    },
    slide: {
        width: width - 40, 
        height: '100%',
        backgroundColor: tertiary,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 15,
        backgroundColor: tertiary,
        height: 200,
        paddingBottom: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: text,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    description: {
        fontSize: 14,
        color: text,
        paddingHorizontal: 10,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: tertiary,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: secondary,
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: primary,
    },
});

export default NewsCarousel;