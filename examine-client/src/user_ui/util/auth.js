import jwtdecode from "jwt-decode";

export const auth = (tokenID) => {
  const decodedToken = tokenID ? jwtdecode(tokenID) : undefined;
  const valid = tokenID && decodedToken.exp * 1000 > Date.now() ? true : false;
  return valid;
};
