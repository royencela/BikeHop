import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { capturePhoto } from '../services/capturePhoto';
import BottomActionBar from '../components/BottomActionBar';
import { savePhoto } from '../services/photoStorage';
import { saveTag, newTagId, listTags } from '../services/tagStorage';
import type { Tag } from '../types/tag';

export default function App() {

  const handleAddTag = async () => {
    const photo = await capturePhoto();
    if (!photo) return;
    const fileName = await savePhoto(photo.uri);
    const now = new Date().toISOString();
    const tag: Tag  = {
      id: newTagId(),
      photo: { ...photo, uri: fileName },
      hasRack: null,
      hasRailing: null,
      hasCctv: null,
      foldingBikeAllowed: null,
      isEnclosed: null,
      nearGuardPost: null,
      markerSource: 'user',
      firstLogged: now,
      lastLogged: now,
    }
    await saveTag(tag);

    const tags = await listTags();
    console.log(`Saved. Total tags: ${tags.length}`);

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
