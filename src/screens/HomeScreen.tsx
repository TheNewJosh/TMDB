import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchPopular, searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useDebouncedValue from '../hooks/useDebouncedValue';

export default function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const job = debounced ? searchMovies(debounced) : fetchPopular();
    job.then((data: any) => {
      if (!mounted) return;
      console.log(data.results)
      setMovies(data.results || []);
    }).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [debounced]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchWrap}>
        <TextInput placeholder="Search movies..." value={query} onChangeText={setQuery} style={styles.input} />
      </View>

      {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : (
        <FlatList
          data={movies}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={(id: number) => navigation.navigate('Detail', { id })} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: { padding: 12, backgroundColor: '#fff' },
  input: { backgroundColor: '#f1f1f1', padding: 10, borderRadius: 8 }
});