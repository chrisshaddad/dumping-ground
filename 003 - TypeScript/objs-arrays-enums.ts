enum Role {
  ADMIN,
  USER,
  AUTHOR,
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [Role];
} = {
  name: 'Chriss',
  age: 24,
  hobbies: ['bla'],
  role: [Role.ADMIN],
};
