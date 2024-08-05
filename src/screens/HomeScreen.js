import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

const dummyAnimeList = [
  { id: 1, title: 'Attack on Titan', thumbnail: 'https://via.placeholder.com/150?text=AoT' },
  { id: 2, title: 'My Hero Academia', thumbnail: 'https://via.placeholder.com/150?text=MHA' },
  { id: 3, title: 'Demon Slayer', thumbnail: 'https://via.placeholder.com/150?text=DS' },
  { id: 4, title: 'One Piece', thumbnail: 'https://via.placeholder.com/150?text=OP' },
  { id: 5, title: 'Naruto', thumbnail: 'https://via.placeholder.com/150?text=Naruto' },
];

const HomeScreen = () => {
  const videoUrl = 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

  const renderAnimeItem = ({ id, title, thumbnail }) => (
    <TouchableOpacity key={id} style={styles.animeItem}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <Text style={styles.animeTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.videoPlayerContainer}>
          <VideoPlayer videoUrl={videoUrl} />
        </View>
        <View style={styles.animeListContainer}>
          <Text style={styles.sectionTitle}>Anime Pilihan</Text>
          <View style={styles.animeList}>
            {dummyAnimeList.map(renderAnimeItem)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  videoPlayerContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  animeListContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  animeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animeItem: {
    width: '48%',
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  animeTitle: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
});

export default HomeScreen;