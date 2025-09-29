import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';
import { fetchMovieDetails, posterUrl } from '../services/tmdb';
import MovieContext from '../context/MovieContext';

export default function DetailScreen({ route }: any) {
  const { id } = route.params;
  const [movie, setMovie] = useState<any>(null);
  const { state, dispatch } = useContext(MovieContext);

  useEffect(() => {
    let mounted = true;
    fetchMovieDetails(id).then((data) => mounted && setMovie(data));
    return () => { mounted = false; };
  }, [id]);

  if (!movie) return <View style={{flex:1,justifyContent:'center'}}><Text>Loading...</Text></View>;

  const isFav = state.favorites.includes(movie.id);

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      {movie.poster_path && <Image source={{ uri: posterUrl(movie.poster_path) }} style={styles.poster} />}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>Release: {movie.release_date}</Text>
      <Text style={styles.meta}>Runtime: {movie.runtime} mins</Text>
      <Text style={styles.genres}>Genres: {movie.genres.map((g: any) => g.name).join(', ')}</Text>
      <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <View style={{marginBottom:50}}>
      <Button  title={isFav ? 'Remove favorite' : 'Add to favorites'} onPress={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: movie.id })} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  poster: { width: '100%', height: 450, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  meta: { color: '#666', marginBottom: 4 },
  genres: { marginBottom: 8 },
  rating: { marginBottom: 8 },
  overview: { lineHeight: 20 }
});