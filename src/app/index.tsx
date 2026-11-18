import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { capturePhoto } from '../services/capturePhoto';
import BottomActionBar from '../components/BottomActionBar';

export default function App() {

  const handleAddTag = async () => {
    const photo = await capturePhoto();
    if (!photo) return;
    console.log('Captured photo:', photo);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content} />

      <BottomActionBar
        onAddTag={handleAddTag}
        onSearch={() => console.log('Search pressed')}
      />
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  content: {
    flex: 1,
  },
});
