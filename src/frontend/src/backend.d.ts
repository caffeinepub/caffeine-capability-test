import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Entry {
    name: string;
    score: bigint;
}
export interface Image {
    id: string;
    contentType: string;
    blob: ExternalBlob;
    filename: string;
    uploader: Principal;
}
export interface ApiResponse {
    contentType: string;
    name: string;
    imageId: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addLeaderboardEntry(name: string, score: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllImageMetadata(): Promise<Array<Image>>;
    getAllImages(): Promise<Array<ApiResponse>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCounter(): Promise<bigint>;
    getImageMetadata(imageId: string): Promise<Image | null>;
    getLeaderboard(): Promise<Array<Entry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    incrementAndGetCounter(): Promise<bigint>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    testJsonResponse(): Promise<string>;
    uploadImage(filename: string, contentType: string, blob: ExternalBlob): Promise<string>;
}
