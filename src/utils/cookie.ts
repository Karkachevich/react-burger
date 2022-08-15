export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: number | Date | string } = {}
) {
  let exp = props.expires;
  if (typeof exp === "number" && exp) {
    const date = new Date();
    date.setTime(date.getTime() + exp * 1000);
    exp = props.expires = date;
  }

  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}
