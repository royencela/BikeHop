import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { capturePhoto } from './src/services/capturePhoto';
import BottomActionBar from './src/components/BottomActionBar';

export default function App() {

  const handleAddTag = async () => {
    const photo = await capturePhoto();
    if (!photo) return;
    console.log('Captured photo:', photo);
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        
        <View style={styles.content} />

        <BottomActionBar
          onAddTag={ handleAddTag }
          onSearch={() => console.log('Search pressed')}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
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
