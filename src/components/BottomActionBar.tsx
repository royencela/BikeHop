import { Pressable, StyleSheet, Text, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomActionBarProps = {
    onAddTag: () => void;
    onSearch: () => void;
};

export default function BottomActionBar({ onAddTag, onSearch }: BottomActionBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, {paddingBottom: insets.bottom + 12}]}>
        
        <Pressable onPress={onAddTag}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
            <Text style={styles.label}>Add Tag</Text>
        </Pressable>

        <Pressable onPress={onSearch}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
            <Text style={styles.label}>Search</Text>
        </Pressable>
        
    </View>
  );
}

const styles = StyleSheet.create({
    bar: {  
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12},
    button: { 
        backgroundColor: '#1e7d4f', paddingHorizontal: 20, minHeight: 44, justifyContent: 'center', borderRadius: 12
    },
    buttonPressed: { 
        opacity: 0.5, backgroundColor: '#145c39', transform: [{ scale: 0.96 }]
    },
    label: { color: '#fff', fontSize: 16, fontWeight: '600' }
});