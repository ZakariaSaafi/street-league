export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  profileImage?: string;
  bio?: string;
  phone?: string;
  city?: string;
  country?: string;
  sportPreferences?: string[];
  teamIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}