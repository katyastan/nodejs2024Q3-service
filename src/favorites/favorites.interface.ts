import { Album } from "src/albums/albums.interface";
import { Artist } from "src/artists/artists.interface";
import { Track } from "src/tracks/tracks.interface";

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse{
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
