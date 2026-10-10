const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });
export const bn = (n: number) => nf.format(n);
export const taka = (n: number) => `${bn(n)} টাকা`;

export const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const UNIT_SHORT: Record<string, string> = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitLabel = (u: string) => UNIT_LABEL[u] ?? `প্রতি ${u}`;
export const unitShort = (u: string) => UNIT_SHORT[u] ?? u;

export function banglaDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
}
