const addJwtToCookies = (jwtToken: string) => {
  const expirationDays = 30; // You can set the expiration time for the JWT as needed
  const d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `jwt=${jwtToken}; Secure; SameSite=Strict; ${expires}; path=/`;
};

const getJwtToken = (): string | undefined => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('jwt' + '=')) {
      return cookie.substring('jwt'.length + 1, cookie.length);
    }
  }
  return undefined;
};

export { addJwtToCookies, getJwtToken };

