export default class StringUtils {
  public static generateRandomString(length: number): string {
    let result = "";
    const characters = StringUtils.CHARACTERS;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i = i + 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static formatURL(url: string, scheme: string = "https://"): string {
    if (url.startsWith(scheme)) {
      return url;
    }

    return `${scheme}${url}`;
  }

  private static readonly CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
}
