declare module '#auth-utils' {
  interface User {
    id: string;
    username: string;
    avatar: string;
    role: 'admin' | 'user';
  }
}

export {};
