// const delay = Math.floor(Math.random() * 1000);

function fetchData(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
}

export const authResponse = {
  id: 1,
  nickname: "Andrus",
  jwt: "qweqweqwe",
};

export const authAdminResponse = {
  id: 1,
  nickname: "AndrusADMIN",
  jwt: "qweasdzxc",
};

export const signUp = () => fetchData(authResponse);

export const adminLogIn = () => fetchData(authAdminResponse);

export const currentUser = {
  id: 1,
  nickname: "Andrus",
};

export const getUserData = () => fetchData(currentUser);

export const getMockActiveQuestions = () => activeQuestions;

const usersList = [
  {
    nickname: "Andrus",
    isAdmin: true,
    isBanned: false,
  },
  {
    nickname: "Jack",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "John",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Jimmy",
    isAdmin: true,
    isBanned: false,
  },
  {
    nickname: "Ales",
    isAdmin: true,
    isBanned: false,
  },
  {
    nickname: "Donald",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Bill",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Alesichka",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Jinna",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Bro",
    isAdmin: false,
    isBanned: false,
  },
  {
    nickname: "Ilya",
    isAdmin: false,
    isBanned: false,
  },
];

export const getUsersList = () => fetchData(usersList);

export const activeQuestions = [
  {
    answered: null,
    asked: "2021-01-28T10:24:43.162Z",
    author: { id: "CURRENT_USER_ID", nickname: "Andrus", isAdmin: true },
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
    text:
      "111 111111111111111  111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 111111111111111 ",
    isPinned: false,
  },
  {
    answered: null,
    asked: "2021-01-28T14:11:47.498Z",
    author: {
      id: "5f6686aa845cbd520ceb599a",
      nickname: "Jayne",
      isAdmin: false,
    },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c7",
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
    isPinned: false,
  },
  {
    answered: null,
    asked: "2021-01-28T14:12:43.162Z",
    author: {
      id: "5f6686aa845cbd520ceb599a",
      nickname: "Jayne",
      isAdmin: false,
    },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c6",
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
    isPinned: false,
  },
  {
    answered: null,
    asked: "2021-01-28T13:24:47.498Z",
    author: {
      id: "5f6686aa845cbd520ceb599a",
      nickname: "Jayne",
      isAdmin: false,
    },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c5",
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
    isPinned: false,
  },
  {
    answered: null,
    asked: "2021-01-28T15:24:43.162Z",
    author: {
      id: "5f6686aa845cbd520ceb599a",
      nickname: "Jayne",
      isAdmin: false,
    },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c4",
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
    isPinned: false,
    isAdmin: false,
  },
  {
    answered: null,
    asked: "2021-01-28T16:24:47.498Z",
    author: {
      id: "5f6686aa845cbd520ceb599a",
      nickname: "Jayne",
      isAdmin: false,
    },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c3",
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
    text: "777",
    isPinned: false,
  },
  {
    answered: null,
    asked: "2021-01-28T10:04:43.162Z",
    author: { id: "CURRENT_USER_ID", nickname: "Andrus", isAdmin: true },
    edited: "false",
    id: "81eeb0c9-b188-41b9-af8e-6b6a03aa49c1",
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
    text: "111 111111111111111  111111111111111 111111111111111",
    isPinned: false,
  },
];
