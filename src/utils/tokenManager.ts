// tokenManager.ts
export const setFirebaseTokenCookie = (token: string) => {
  console.log("Setting firebase token cookie", token);
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Set expiration to 10 years from now

  document.cookie = `firebaseToken=${token}; path=/; secure; samesite=lax; max-age=${expirationDate.toUTCString()};`;
  console.log("Cookie set: ", document.cookie);
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
