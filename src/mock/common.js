// const delay = Math.floor(Math.random() * 1000);

function fetchData(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
}

export const authResponse = {
  jwt: 'qweqweqwe',
  currentUser: {
    id: 1,
    nickname: "Andrus",
  },
}

export const singIn = () => fetchData(authResponse);

export const currentUser = {
  id: 1,
  nickname: "Andrus",
}

export const getUserData = () => fetchData(currentUser);