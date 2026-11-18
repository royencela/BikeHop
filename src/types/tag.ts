import type { CapturedPhoto } from '../services/capturePhoto';

export type Tag = {
    id: string;
    shortName?: string;
    description?: string;
    photo: CapturedPhoto;
    hasRack: boolean | null;
    hasRailing: boolean | null;
    hasCctv: boolean | null;
    foldingBikeAllowed: boolean | null;
    markerSource: string;
    firstLogged: string; // ISO 8601
    lastLogged: string; // ISO 8601
    isEnclosed: boolean | null;
    nearGuardPost: boolean | null;
}