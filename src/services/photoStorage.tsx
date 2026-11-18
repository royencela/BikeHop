import { File, Directory, Paths } from "expo-file-system";

export async function savePhoto(cacheUri: string): Promise<string> {
    const dir = new Directory(Paths.document, "photos")
    if (!dir.exists) dir.create();

    const fileName = `${Date.now()}.jpg`;
    await new File(cacheUri).copy(new File(dir, fileName));
    return fileName;
}

export function photoUri(fileName: string): string {
    return new File(Paths.document, 'photos', fileName).uri;
} 