import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import type { Tag } from "../types/tag";

const dbPromise = SQLite.openDatabaseAsync("bikehop.db");

type TagRow = {
    id: string;
    short_name: string | null;
    description: string | null;
    photo_file: string;      
    latitude: number;      
    longitude: number;     
    taken_at: string;
    has_rack: number | null;      
    has_railing: number | null;      
    has_cctv: number | null;
    folding_bike_allowed: number | null;      
    is_enclosed: number | null;      
    near_guard_post: number | null;
    marker_source: string;      
    first_logged: string;      
    last_logged: string;
}

export async function initDb(): Promise<void> {
    const db = await dbPromise;
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tags (
            id TEXT PRIMARY KEY,
            short_name TEXT,
            description TEXT,
            photo_file TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            taken_at TEXT NOT NULL,
            has_rack INTEGER,
            has_railing INTEGER,
            has_cctv INTEGER,
            folding_bike_allowed INTEGER,
            is_enclosed INTEGER,
            near_guard_post INTEGER,
            marker_source TEXT NOT NULL,
            first_logged TEXT NOT NULL,
            last_logged TEXT NOT NULL
        );
    `);
}

function toDb(value: boolean | null): number | null {
    if (value === null) return null;
    return value ? 1 : 0;
}

function fromDb(value: number | null): boolean | null {
    if (value === null) return null;
    return value === 1;
}

export function newTagId(): string {
    return Crypto.randomUUID();
}

export async function saveTag(tag: Tag): Promise<void> {
    const db = await dbPromise;
    await db.runAsync(`
        INSERT OR REPLACE INTO tags (
            id, short_name, description, photo_file, latitude, longitude, taken_at,
            has_rack, has_railing, has_cctv, folding_bike_allowed, is_enclosed,
            near_guard_post, marker_source, first_logged, last_logged
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [
        tag.id,
        tag.shortName ?? null,
        tag.description ?? null,
        tag.photo.uri,
        tag.photo.latitude,
        tag.photo.longitude,
        tag.photo.takenAt,
        toDb(tag.hasRack),
        toDb(tag.hasRailing),
        toDb(tag.hasCctv),
        toDb(tag.foldingBikeAllowed),
        toDb(tag.isEnclosed),
        toDb(tag.nearGuardPost),
        tag.markerSource,
        tag.firstLogged,
        tag.lastLogged
    ]);
}

export async function listTags(): Promise<Tag[]> {
    const db = await dbPromise;
    const rows = await db.getAllAsync<TagRow>(`SELECT * FROM tags ORDER BY first_logged DESC`);

    return rows.map((row) => ({
        id: row.id,
        shortName: row.short_name ?? undefined,
        description: row.description ?? undefined,
        photo: {
            uri: row.photo_file,
            latitude: row.latitude,
            longitude: row.longitude,
            takenAt: row.taken_at
        },
        hasRack: fromDb(row.has_rack),
        hasRailing: fromDb(row.has_railing),
        hasCctv: fromDb(row.has_cctv),
        foldingBikeAllowed: fromDb(row.folding_bike_allowed),
        isEnclosed: fromDb(row.is_enclosed),
        nearGuardPost: fromDb(row.near_guard_post),
        markerSource: row.marker_source,
        firstLogged: row.first_logged,
        lastLogged: row.last_logged
    }));
}