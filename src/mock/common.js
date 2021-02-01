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

export const getMockActiveQuestions = () => activeQuestions;

const activeQuestions = [
  {
    answered: null,
    asked: "2021-01-28T10:24:43.162Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "111 111111111111111  111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 ",
  },
  {
    answered: null,
    asked: "2021-01-28T14:11:47.498Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "222",
  },
  {
    answered: null,
    asked: "2021-01-28T14:12:43.162Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "333",
  },
  {
    answered: null,
    asked: "2021-01-28T13:24:47.498Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "444",
  },
  {
    answered: null,
    asked: "2021-01-28T15:24:43.162Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "555",
  },
  {
    answered: null,
    asked: "2021-01-28T16:24:47.498Z",
    author: {id: "5f6686aa845cbd520ceb599a", nickname: "Jayne"},
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c8",
    likes: [
      "5f6686aa75ad25fac6f523e8",
      "5f6686aad7ec91be5633b806",
      "5f6686aa149973deb1774e76",
      "5f6686aa9844ff2a3d95ed50",
      "5f6686aa9625e0d6c94dc89f",
      "5f6686aa70020dce89700680",
      "5f6686aae92b06b1f1b7c69b",
      "5f6686aa8634ff8b9f0ed389",
      "5f6686aa7e7b176a20e3c6ec",
    ],
    text: "666",
  },
]