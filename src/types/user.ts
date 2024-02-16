// Details zu user

// Definition der Struktur der user data, die wir von der API erwarten.
// Dazu gehören das user object mit seinen properties und das verschachtelte avatar object

export interface UserData {
  user: {
    id: number; 
    username: string;
    email: string;
    avatar: {
      id: number;
      height: number;
      width: number;
      url: string;
      formats: {
        large: { height: number; width: number; url: string };
        medium: { height: number; width: number; url: string };
        small: { height: number; width: number; url: string };
        thumbnail: { height: number; width: number; url: string };
      };
    };
  };
}
