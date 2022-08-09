export const validateEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export const objectHasKeys = (object: Object | null, keys: string[]) => {
  if (object === null) {
    return false;
  }

  for (const key of keys) {
    if (!(key in object)) {
      return false;
    }
  }

  return true;
};
