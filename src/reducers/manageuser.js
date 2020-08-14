const initialState = {
  members: {
    data: [
      {
        name: 'Gian',
        email: 'gian@gmail.com',
        role: 'Siswa'
      },
      {
        name: 'Beni',
        email: 'beni@gmail.com',
        role: 'Student'
      }
    ]
  }
};

export default function userReducer(state = initialState, action) {
  return state;
}
