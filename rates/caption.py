"""Kurdish caption for the daily rates board (house RTL rules from instagram/caption.py: RLM per line, Eastern digits)."""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import compute, date_ku, f

RLM = '‏'
DIG = str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩')
k = lambda s: str(s).translate(DIG).replace(',', '،')


def make(d):
    e, cur, gold = compute(d)
    u, p = d['usd'], d.get('prev') or {}
    dl = u['erbil']['sell'] - p['erbil_sell'] if p else 0
    g21 = next(x for x in gold if x[0] == 21)
    chg = (f' ({"▲" if dl > 0 else "▼"} {k(f(abs(dl)))} لە چاو دوێنێ)' if dl else ' (بێ گۆڕانکاری)') if p else ''
    lines = [
        f'💵 نرخی دۆلار و زێڕ ئەمڕۆ، {k(date_ku(d["date"]))}',
        '',
        f'🔹 هەولێر: ١٠٠ دۆلار = {k(f(u["erbil"]["sell"]))} دینار{chg}',
        f'🔹 بەغدا: ١٠٠ دۆلار = {k(f(u["baghdad"]["sell"]))} دینار',
        f'🟡 زێڕی عەیاری ٢١: مسقاڵێک {k(f(g21[2]))} دینار ({k(g21[1])} دۆلار)',
        f'🌍 ئۆنسە لە بازاڕی جیهانی: {k(f(d["xau_usd"]))} دۆلار',
        '',
        '📌 هەموو ڕۆژێک نوێترین نرخەکان لە @dinarchi.iq. فۆڵۆمان بکەن و بۆ هاوڕێکانتانی بنێرن.',
        '',
        '📚 سەرچاوە: نرخی دۆلار لە «Shafaq News»؛ نرخی دراوەکانی تر و زێڕ بەپێی نرخی جیهانی و نرخی دۆلار لە بازاڕی هەولێر هەژمار کراون. نرخی زێڕ بەبێ کرێی دروستکردنە.',
        '',
        '#نرخی_دۆلار #هەولێر #سلێمانی #زێڕ #دینار #دینارچی',
    ]
    return '\n'.join(RLM + l if l else '' for l in lines)


if __name__ == '__main__':
    print(make(json.load(open(sys.argv[1]))))
