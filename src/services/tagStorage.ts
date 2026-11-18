import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import type { Tag } from "../types/tag";

const dbPromise = SQLite.openDatabaseAsync("bikehop.db");

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