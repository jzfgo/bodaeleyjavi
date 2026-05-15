import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export function trackSectionView(section: string) {
  logEvent(analytics, "gallery_section_view", { section });
}

export function trackPhotoView(filename: string, group: string, position: number) {
  logEvent(analytics, "photo_view", { filename, group, position });
}

export function trackPhotoDownload(filename: string, group: string) {
  logEvent(analytics, "photo_download", { filename, group });
}
