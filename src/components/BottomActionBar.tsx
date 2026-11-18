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

    </View>
  );
}

const styles = StyleSheet.create({
    bar: { },
    button: { },
    buttonPressed: { },
    label: { }
});