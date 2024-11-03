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
import { MainColors, StyledContainer, PageTitle } from './Styles';

const { width } = Dimensions.get('window');
const { primary, text, secondary, background, purewhite, tertiary } = MainColors;

const NewsCarousel = () => {
    const newsData = [
        {
          id: 1,
          title: 'Campeonato Nacional de Natación',
          description: 'Los mejores nadadores del país se reúnen este fin de semana para competir en el Campeonato Nacional de Natación. El evento contará con la participación de más de 200 atletas de todo el país...',
          image: require('../../assets/news1.png'), // Primera noticia
        },
        {
          id: 2,
          title: 'Nuevo récord en 100m mariposa',
          description: 'El equipo nacional establece nueva marca en el campeonato internacional. Una hazaña que marca un antes y después en la natación chilena...',
          image: require('../../assets/News2.jpg'), // segunda noticia
        },
        {
          id: 3,
          title: 'Clínica de natación para jóvenes',
          description: 'SwimIt Chile organiza clínicas gratuitas para nuevos talentos. Una oportunidad única para que los jóvenes desarrollen sus habilidades en la natación...',
          image: require('../../assets/News3.jpg'), // tercera noticia
        },
    ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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