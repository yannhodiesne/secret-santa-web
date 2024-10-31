declare module '#auth-utils' {
  interface User {
    id: string;
    username: string;
    nick: string | null;
    avatar: string;
    role: 'admin' | 'user';
  }
}

export {};
