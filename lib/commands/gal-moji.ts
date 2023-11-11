import { CommandBase } from "../command-base";

/**
 * ギャル文字に変換する
 *
 * Powered by ギャル文字一括変換装置
 * http://www.gal-moji.com/moji/gyaru_moji_pc_org.asp
 */
export default class GyaruMoji extends CommandBase {
  constructor() {
    super();
    this.name = "gal";
    this.description = 'convert text into "Gyaru Moji"';
  }

  async exec(...args: string[]): Promise<string> {
    const text = args[0];
    const encoded = encodeURIComponent(text);
    const html = await fetch(
      "http://www.gal-moji.com/moji/gyaru_moji_pc_org.asp",
      {
        headers: {
          accept: "text/html",
          "accept-language": "ja",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          pragma: "no-cache",
          Referer: "http://www.gal-moji.com/moji/gyaru_moji_pc_org.asp",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `txt0=${encoded}&hemkan=2`,
        method: "POST",
      }
    ).then((res) => res.text());
    const matchRes = html
      .split("\n")
      .map((line) => line.trim())
      .join("")
      .match(/<textarea [^<>]*?name="txt0"[^<>]*?>(.+?)<\/textarea>/i);
    if (!matchRes) {
      return "failed to request";
    }
    return matchRes[1];
  }
}
