import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export type CapturedPhoto = {
    uri: string;
    latitude: number;
    longitude: number;
    takenAt: string; // ISO 8601
}

export async function capturePhoto(): Promise<CapturedPhoto | null> {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        return null;
    }

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: 'images', quality: 0.8, exif: true });
    if (result.canceled) {
        return null;
    }

    // TODO (b): show our own confirm screen here (photo preview + location + AI markers)
    // and only continue if the user taps "Use photo".

    const locPermission = await Location.requestForegroundPermissionsAsync();
    if (!locPermission.granted) {
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    return {
        uri: result.assets[0].uri,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        takenAt: new Date().toISOString(),
    };
}
