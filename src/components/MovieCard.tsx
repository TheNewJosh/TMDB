import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { posterUrl } from '../services/tmdb';

export default function MovieCard({ movie, onPress }: any) {
  return (
    <TouchableOpacity onPress={() => onPress(movie.id)} style={styles.card}>
      {movie.poster_path ? (
        <Image source={{ uri: posterUrl(movie.poster_path) }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.placeholder]}><Text>No Image</Text></View>
      )}
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>{movie.title}</Text>
        <Text style={styles.meta}>{(movie.release_date || '').slice(0,4)}</Text>
        <Text style={styles.meta}>⭐ {movie.vote_average?.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  poster: { width: 90, height: 135, borderRadius: 6 },
  placeholder: { backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { marginTop: 4, color: '#666' }
});