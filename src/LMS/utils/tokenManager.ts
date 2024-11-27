// tokenManager.ts
export const setFirebaseTokenCookie = (token: string) => {
  console.log("Setting firebase token cookie", token);
  document.cookie = `firebaseToken=${token}; path=/; secure; samesite=lax`;
};

export const getFirebaseToken = (): string | null => {
  const cookie = document.cookie.split(";").find((cookie) => {
    console.log("Cookie: ", cookie);
    return cookie.includes("firebaseToken");
  });

  if (cookie) {
    return cookie.split("=")[1];
  }

  return null;
};
