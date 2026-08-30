export const HOME_SONG = {
  src: '/audio/xiang-an.mp3',
  fallbackDuration: 234.072,
  lyrics: [
    { at: 11.88, text: '清晨的灯还亮在窗' },
    { at: 16.42, text: '桌上的书翻过几章' },
    { at: 19.80, text: '行测的题做了又想' },
    { at: 22.86, text: '申论的字写了又改几行' },
    { at: 26.50, text: '有时候路显得很长' },
    { at: 29.90, text: '有时候心也会迷茫' },
    { at: 32.94, text: '可昨天不会替你登场' },
    { at: 36.34, text: '今天的你还要继续向前闯' },
    { at: 40.12, text: '一道题，一页纸，一段时光' },
    { at: 43.76, text: '一点点，把未知变成日常' },
    { at: 47.44, text: '别急着问还有多远的地方' },
    { at: 50.40, text: '先把今天走得坦荡' },
    { at: 53.42, text: '乘一程云帆，向心中的岸启航' },
    { at: 57.06, text: '穿过几阵风，也穿过几场迷茫' },
    { at: 60.88, text: '行测练判断，申论写下主张' },
    { at: 64.28, text: '一笔一画，都在靠近梦想' },
    { at: 67.18, text: '乘一程云帆，朝想去的地方' },
    { at: 70.84, text: '不用比谁快，也不用四处张望' },
    { at: 74.52, text: '今天坐书桌，明天走进考场' },
    { at: 77.86, text: '走过的每一步，终会有回响' },
    { at: 84.26, text: '资料分析算到天亮' },
    { at: 90.34, text: '判断推理绕过几场' },
    { at: 93.82, text: '有些答案曾经勉强' },
    { at: 96.88, text: '后来才懂方法比答案更长' },
    { at: 100.50, text: '申论不是辞藻漂亮' },
    { at: 104.06, text: '也不是模板写满纸张' },
    { at: 107.30, text: '读懂材料理清思想' },
    { at: 110.34, text: '才能让每一句话都有分量' },
    { at: 114.22, text: '一道题，一次错，一次成长' },
    { at: 117.80, text: '一次次，把慌张变成平常' },
    { at: 121.32, text: '那些没人知道的晚上' },
    { at: 124.40, text: '都在替未来积攒力量' },
    { at: 127.40, text: '乘一程云帆，向心中的岸启航' },
    { at: 131.08, text: '穿过几阵风，也穿过几场迷茫' },
    { at: 134.90, text: '行测练判断，申论写下主张' },
    { at: 138.30, text: '一笔一画，都在靠近梦想' },
    { at: 141.18, text: '乘一程云帆，朝想去的地方' },
    { at: 144.86, text: '不用比谁快，也不用四处张望' },
    { at: 148.54, text: '今天坐书桌，明天走进考场' },
    { at: 151.86, text: '走过的每一步，终会有回响' },
    { at: 157.70, text: '是遇到难题，不再慌张' },
    { at: 161.68, text: '是面对材料，学会判断' },
    { at: 165.02, text: '是一次次想清楚以后' },
    { at: 168.40, text: '再写下自己的主张' },
    { at: 171.44, text: '有人陪你看过几页文章' },
    { at: 174.94, text: '有人提醒你别急着找答案' },
    { at: 178.48, text: '云起的时候，帆自然会扬' },
    { at: 181.80, text: '剩下的路，要由你自己去闯' },
    { at: 187.30, text: '乘一程云帆，向心中的岸启航' },
    { at: 191.72, text: '走过这段路，也走过年少时光' },
    { at: 195.28, text: '行测有方法，申论自有文章' },
    { at: 198.70, text: '提笔的时候，心里已有方向' },
    { at: 201.76, text: '乘一程云帆，朝想去的地方' },
    { at: 205.42, text: '等有一天，你真的站在人群中央' },
    { at: 209.04, text: '回头看那些，伏案许久的晚上' },
    { at: 212.46, text: '你会发现，坚持早已经有了模样' },
  ],
} as const;

export function getAudioPreload(saveData: boolean): 'auto' | 'metadata' {
  return saveData ? 'metadata' : 'auto';
}

export function getLyricIndex(currentTime: number): number {
  let active = -1;
  for (let index = 0; index < HOME_SONG.lyrics.length; index += 1) {
    if (HOME_SONG.lyrics[index].at > currentTime) break;
    active = index;
  }
  return active;
}
