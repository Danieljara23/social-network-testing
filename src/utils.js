export const getRandomName = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getRandomPicture = async () => {
  const profileImageUrl = await fetch(
    `https://avatars.dicebear.com/api/avataaars/${getRandomName()}.svg`
  ).then((response) => response.json());

  console.log(profileImageUrl);
};
