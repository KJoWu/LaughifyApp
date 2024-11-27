import { Image, StyleSheet, Platform, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FBE9E7', dark: '#2C2A4A' }}
      headerImage={
        <Image
          source={require('@/assets/images/pic1.png')} // Replace with an app-specific image
          style={styles.headerImage}
        />
      }>
  
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E53935',
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  sectionContainer: {
    gap: 10,
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5C6BC0',
  },
  highlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
});
