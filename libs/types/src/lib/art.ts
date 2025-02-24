export interface ArtItem {
  id: string;
  type: string;
  artist: string;
  title: string;
  description: string;
  funded: boolean;
  location?: string;
}
