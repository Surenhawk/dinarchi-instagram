const UPC=()=>document.documentElement.getAttribute('data-theme')==='light'?'#047857':UPC(), DNC=()=>document.documentElement.getAttribute('data-theme')==='light'?'#BE123C':DNC();
// build 132: 3D art (light theme only; dark keeps its line icons). Files live in /static/art, ~5 KB each.
const ART={USD100:'flag-usd',EUR100:'flag-eur',GBP100:'flag-gbp',TRY100:'flag-try',JPY100:'flag-jpy',TMN_1M:'flag-irr',SAR100:'flag-sar',AED100:'flag-aed',QAR100:'flag-qar',KWD100:'flag-kwd',CNY100:'flag-cny',SYP100:'flag-syp',XAU_MITHQAL_24:'gold',XAU_MITHQAL_21:'gold',XAU_MITHQAL_18:'gold',IQD:'wallet',
  // build 133: every remaining asset gets 3D art: silver bars, the oil barrel, world gold/silver, forex pairs on their flag badge, stocks + indexes
  XAG_KG_USD:'silver',MTL_XAU:'gold',MTL_XAG:'silver',OIL_WTI:'barrel',OIL_BRENT:'barrel',
  FX_EUR:'flag-eur',FX_GBP:'flag-gbp',FX_JPY:'flag-jpy',FX_TRY:'flag-try',IDX_DXY:'flag-usd',IDX_SPY:'index',IDX_QQQ:'index',IDX_DIA:'index',
  STK_AAPL:'stocks',STK_MSFT:'stocks',STK_NVDA:'stocks',STK_TSLA:'stocks',STK_AMZN:'stocks',STK_GOOGL:'stocks',STK_META:'stocks'};   // currencies = gold-rim flag badges (suren's pick)
const ART_BIG={USD100:'usd',IDX_DXY:'usd'};   // hero + converter: the dollar keeps its 3D cash stack, as in the sample
const artSrc=(k,lg)=>{ const f=(lg&&ART_BIG[k])||ART[k]; return f?`/static/art/${f}${lg&&f!=='wallet'?'-lg':''}.webp?v=133`:''; };
const artImg=(k,cls)=>ART[k]?`<img class="art3d ${cls||''}" src="${artSrc(k)}" alt="" loading="lazy" decoding="async">`:'';
function setArt(id,k,lg){ const el=$(id); if(!el)return; const s=artSrc(k,lg); el.hidden=!s; if(s&&el.getAttribute('src')!==s) el.src=s; }
const tg = window.Telegram?.WebApp;
if (tg){ tg.ready(); tg.expand(); try{var _tc=(document.documentElement.getAttribute('data-theme')==='light')?'#FCFBF8':'#070a10';tg.setHeaderColor(_tc);tg.setBackgroundColor(_tc);}catch(e){} }
// Auto-bust a STALE cached frontend: Telegram's WebView often serves an old index.html even
// after a deploy. The server injects window.__BUILD__; if the live /api/build differs, hard-
// reload once with a version query so the newest UI always wins (no manual cache-clearing).
(function(){ try{ fetch('/api/build',{cache:'no-store'}).then(r=>r.json()).then(d=>{
  if(window.__BUILD__ && d && d.build && d.build!==window.__BUILD__ && location.search.indexOf('v=')<0){
    location.replace(location.pathname+'?v='+encodeURIComponent(d.build));
  }}).catch(function(){}); }catch(e){} })();
const haptic = () => { try{ tg?.HapticFeedback?.selectionChanged(); }catch(e){} };

const ASSETS = {
  USD100:{name:'دۆلار', full:'دۆلاری ئەمریکی', name_ar:'دولار', full_ar:'الدولار الأمريكي', unit:'$100', sym:'$', sym_ar:'$', per:100, hasCity:true},
  EUR100:{name:'یۆرۆ', full:'یۆرۆی ئەوروپی', name_ar:'يورو', full_ar:'اليورو', unit:'€100', sym:'€', sym_ar:'€', per:100, hasCity:true},
  GBP100:{name:'پاوەند', full:'پاوەندی بەریتانی', name_ar:'باوند', full_ar:'الباوند البريطاني', unit:'£100', sym:'£', sym_ar:'£', per:100, hasCity:true},
  TRY100:{name:'لیرە', full:'لیرەی تورکی', name_ar:'ليرة', full_ar:'الليرة التركية', unit:'₺100', sym:'₺', sym_ar:'₺', per:100, hasCity:true},
  TMN_1M:{name:'تمەن', full:'تمەنی ئێرانی', name_ar:'تومان', full_ar:'التومان الإيراني', unit:'1M TMN', sym:'ملیۆن تمەن', sym_ar:'مليون تومان', per:1, hasCity:true},
  SAR100:{name:'ریاڵی سعودی', full:'ریاڵی سعودی', name_ar:'ريال سعودي', full_ar:'الريال السعودي', unit:'SAR 100', sym:'ریاڵ', sym_ar:'ريال', per:100, hasCity:true},
  AED100:{name:'درهەمی ئیمارات', full:'درهەمی ئیماراتی', name_ar:'درهم إماراتي', full_ar:'الدرهم الإماراتي', unit:'AED 100', sym:'درهەم', sym_ar:'درهم', per:100, hasCity:true},
  QAR100:{name:'ریاڵی قەتەر', full:'ریاڵی قەتەری', name_ar:'ريال قطري', full_ar:'الريال القطري', unit:'QAR 100', sym:'ریاڵ', sym_ar:'ريال', per:100, hasCity:true},
  KWD100:{name:'دیناری کوێت', full:'دیناری کوێتی', name_ar:'دينار كويتي', full_ar:'الدينار الكويتي', unit:'KWD 100', sym:'دینار', sym_ar:'دينار', per:100, hasCity:true},
  CNY100:{name:'یوانی چین', full:'یوانی چینی', name_ar:'يوان صيني', full_ar:'اليوان الصيني', unit:'CNY 100', sym:'یوان', sym_ar:'يوان', per:100, hasCity:true},
  JPY100:{name:'یەنی ژاپۆن', full:'یەنی ژاپۆنی', name_ar:'ين ياباني', full_ar:'الين الياباني', unit:'JPY 100', sym:'یەن', sym_ar:'ين', per:100, hasCity:true},
  SYP100:{name:'لیرەی سووریا', full:'لیرەی سووری', name_ar:'ليرة سورية', full_ar:'الليرة السورية', unit:'SYP 100', sym:'لیرە', sym_ar:'ليرة', per:100, hasCity:true},
  XAU_MITHQAL_24:{name:'زێڕی ٢٤', full:'زێڕی عەیار ٢٤', name_ar:'ذهب ٢٤', full_ar:'الذهب، عيار ٢٤', unit:'MITHQAL', sym:'مسقاڵ', sym_ar:'مثقال', per:1, hasCity:false},
  XAU_MITHQAL_21:{name:'زێڕی ٢١', full:'زێڕی عەیار ٢١', name_ar:'ذهب ٢١', full_ar:'الذهب، عيار ٢١', unit:'MITHQAL', sym:'مسقاڵ', sym_ar:'مثقال', per:1, hasCity:false},
  XAU_MITHQAL_18:{name:'زێڕی ١٨', full:'زێڕی عەیار ١٨', name_ar:'ذهب ١٨', full_ar:'الذهب، عيار ١٨', unit:'MITHQAL', sym:'مسقاڵ', sym_ar:'مثقال', per:1, hasCity:false},
  XAG_KG_USD:{name:'زیو', full:'زیوی کیلۆ', name_ar:'فضة', full_ar:'الفضة (كيلو)', unit:'KG $', sym:'$', sym_ar:'$', per:1, hasCity:false, usd:true},
};
const CITIES = {
  sulaymaniyah:{ku:'سلێمانی', ar:'السليمانية'}, erbil:{ku:'هەولێر', ar:'أربيل'},
  baghdad:{ku:'بەغدا', ar:'بغداد'}, basra:{ku:'بەسرە', ar:'البصرة'}, duhok:{ku:'دهۆک', ar:'دهوك'},
};
// 4200d covers the full USD100 history (starts 2016-03). 'All' must mean all —
// it previously said so while only asking for a year.
const RANGES = [{d:0,k:'range_1d'},{d:7,k:'range_7'},{d:30,k:'range_month'},
                {d:365,k:'range_year'},{d:4200,k:'range_all'}];

const I18N = {
  status_open:{ku:'بازاڕ کراوەیە', ar:'السوق مفتوح'},
  status_closed:{ku:'بازاڕ داخراوە', ar:'السوق مغلق'},
  change_today:{ku:'گۆڕانی ئەمڕۆ', ar:'تغيّر اليوم'},
  all_market:{ku:'هەموو بازاڕ', ar:'كل السوق'},
  sec_assets:{ku:'دراو و کانزاکان', ar:'العملات والمعادن'},
  watch_add:{ku:'زیادکردن', ar:'إضافة'},
  sec_news:{ku:'هەواڵی دارایی', ar:'الأخبار المالية'},
  sec_convert:{ku:'گۆڕینی دراو', ar:'تحويل العملات'},
  tab_market:{ku:'بازاڕ', ar:'السوق'},
  tab_news:{ku:'هەواڵ', ar:'الأخبار'},
  tab_race:{ku:'پێشبڕکێ', ar:'المسابقة'}, rc_title:{ku:'پێشبڕکێ', ar:'مسابقة التوقعات'},
  rc_tier:{ku:'پلەی', ar:'مستوى'},
  rc_week_tab:{ku:'هەفتانە', ar:'أسبوعي'}, rc_month_tab:{ku:'مانگانە', ar:'شهري'}, rc_all_tab:{ku:'هەموو کات', ar:'كل الأوقات'},
  rc_board:{ku:'ڕیزبەندی', ar:'الترتيب'}, rc_you_rank:{ku:'ڕیزبەندیی تۆ', ar:'ترتيبك'},
  rc_pts:{ku:'خاڵ', ar:'نقطة'}, rc_top_tier:{ku:'بەرزترین پلە', ar:'أعلى مستوى'},
  rc_of_right:{ku:'{c} لە {t} ڕاست', ar:'{c} من {t} صح'}, rc_novote_yet:{ku:'هێشتا دەنگی نەداوە', ar:'لم يصوّت بعد'},
  rc_how:{ku:'چۆن کار دەکات', ar:'كيف يعمل'}, rc_month_empty:{ku:'ئەم مانگە هێشتا کەس خاڵی نییە — یەکەم بە', ar:'لا نقاط هذا الشهر بعد — كن الأول'},
  rc_bronze:{ku:'برۆنز', ar:'البرونز'}, rc_silver:{ku:'زیو', ar:'الفضة'}, rc_gold:{ku:'زێڕ', ar:'الذهب'}, rc_diamond:{ku:'ئەڵماس', ar:'الماس'}, rc_master:{ku:'شارەزا', ar:'الخبير'},
  rc_left:{ku:'{n} ڕۆژ ماوە', ar:'باقي {n} يوم'}, rc_last_day:{ku:'دوا ڕۆژە', ar:'اليوم الأخير'},
  rc_promote:{ku:'{n}ی سەرەوە بەرز دەبنەوە', ar:'أول {n} يصعدون'},
  rc_this_week:{ku:'ئەم هەفتەیە', ar:'هذا الأسبوع'},
  rc_day:{ku:'ڕۆژ', ar:'يوم'}, rc_you:{ku:'تۆ', ar:'أنت'},
  rc_zone_up:{ku:'بەرزبوونەوە', ar:'الصعود'}, rc_zone_dn:{ku:'دابەزین', ar:'الهبوط'},
  rc_note1:{ku:'هەر پێشبینییەکی ڕاست = <b>10</b> خاڵ', ar:'كل توقع صحيح = <b>10</b> نقاط'},
  rc_note2:{ku:'هەموو شەممەیەک، <b>5</b>ی سەرەوە دەچنە پلەی سەرەوە', ar:'كل سبت، أول <b>5</b> يصعدون مستوى'},
  rc_note3:{ku:'بۆ ئەوەی لە ڕیزبەندیدا بیت، لانیکەم <b>3</b> ڕۆژ لە هەفتەدا دەنگ بدە', ar:'لتدخل الترتيب، صوّت <b>3</b> أيام في الأسبوع على الأقل'},
  rc_rules:{ku:'یاساکان', ar:'القواعد'}, rc_voters:{ku:'{n} بەشداربوو', ar:'{n} مشارك'}, rc_player:{ku:'بەشداربوو', ar:'مشارك'}, rc_last_week:{ku:'براوەکانی هەفتەی ڕابردوو', ar:'فائزو الأسبوع الماضي'},
  rc_tm_h:{ku:'پێشبڕکێی دینارچی', ar:'مسابقة دينارچي'},
  rc_tm_s:{ku:'باشترین پێشبینیکەرانی دۆلار، هەفتانە و مانگانە', ar:'أفضل متوقّعي الدولار، أسبوعياً وشهرياً'},
  rc_tm_1:{ku:'هەموو ڕۆژێک لە کارتی «بۆچوونی بازاڕ» دەنگ بدە: دۆلار بەرز دەبێتەوە یان نزم؟', ar:'صوّت كل يوم في بطاقة «رأي السوق»: الدولار يصعد أم ينزل؟'},
  rc_tm_2:{ku:'هەر پێشبینییەکی ڕاست 10 خاڵ · خاڵەکانی هەموو هەفتەکانی مانگ کۆدەکرێنەوە', ar:'كل توقع صحيح 10 نقاط · تُجمع نقاط كل أسابيع الشهر'},
  rc_tm_3:{ku:'یەک هەژمار بۆ هەر کەسێک', ar:'حساب واحد لكل شخص'},
  rc_tm_4:{ku:'هاوڕێیەکت بانگهێشت کرد و دەستی بە پێشبینی کرد؟ +2 خاڵ بۆ تۆ ئەم مانگە (تا 5 هاوڕێ)', ar:'دعوت صديقاً وبدأ يتوقّع؟ +2 نقطة إلك هذا الشهر (حتى 5 أصدقاء)'},
  rc_invite:{ku:'هاوڕێیەک بانگهێشت بکە', ar:'ادعُ صديقاً'},
  rc_invite_s:{ku:'+2 خاڵ کاتێک دەست بە پێشبینی دەکات', ar:'+2 نقطة عندما يبدأ يتوقّع'},
  rc_bonus:{ku:'+{n} بانگهێشت', ar:'+{n} دعوة'},
  rc_share_txt:{ku:'دۆلار سبەی بەرز دەبێتەوە یان نزم؟ پێشبینی بکە و لە ڕیزبەندیی دینارچیدا بەرز ببەوە 👇', ar:'الدولار باچر يصعد لو ينزل؟ توقّع واصعد بترتيب دينارچي 👇'},
  rc_auth:{ku:'پێشبڕکێ تەنیا لە ناو تێلێگرام کار دەکات', ar:'المسابقة تعمل داخل تيليغرام فقط'},
  rc_empty:{ku:'هێشتا کەس لێرە نییە — یەکەم دەنگ بدە', ar:'لا أحد هنا بعد — كن أول من يصوّت'},
  rc_empty_t:{ku:'هێشتا کەس لە ڕیزبەندیدا نییە', ar:'لا أحد في الترتيب بعد'}, rc_empty_s:{ku:'یەکەم پێشبینیی ئەم هەفتەیە بکە و ناوت بخەرە ناو لیستەکە', ar:'قدّم أول توقّع لهذا الأسبوع وأدخل اسمك في القائمة'}, rc_predict:{ku:'پێشبینی بکە', ar:'توقّع الآن'},
  rc_up_k:{ku:'بەرزبوونەوە', ar:'ترقية'}, rc_up_h:{ku:'بەخێربێیت بۆ', ar:'مرحباً بك في'},
  rc_up_s:{ku:'لە {n}ی سەرەوەی گروپەکەت بوویت', ar:'كنت ضمن أول {n} في مجموعتك'},
  rc_dn_k:{ku:'دابەزین', ar:'هبوط'}, rc_dn_h:{ku:'ئێستا لە', ar:'أنت الآن في'},
  rc_dn_s:{ku:'هەفتەی داهاتوو دووبارە هەوڵ بدە', ar:'حاول مجدداً الأسبوع القادم'},
  rc_idle_s:{ku:'دوو هەفتە دەنگت نەدا — سێ دەنگ لە هەفتەدا بەسە', ar:'ما صوّتت لأسبوعين — ثلاثة أصوات في الأسبوع تكفي'},
  rc_go:{ku:'بەردەوام بە', ar:'متابعة'},
  rc_say1:{ku:'لە {t} پێشبینی، {c}ی ڕاست بووە', ar:'من {t} توقع، {c} كانت صحيحة'},
  rc_say2:{ku:'ئێستا {s} ڕۆژە لەسەر یەک ڕاستە · باشترینی {b} ڕۆژ', ar:'الآن {s} أيام متتالية صحيحة · الأفضل {b} يوم'},
  rc_say_none:{ku:'هێشتا پێشبینی جێبەجێکراوی نییە', ar:'لا توقعات محسومة بعد'},
  rc_last10:{ku:'دواین 10 پێشبینی', ar:'آخر 10 توقعات'}, rc_last10_you:{ku:'دواین 10ی <i>تۆ</i>', ar:'آخر 10 لك <i>أنت</i>'},
  rc_right:{ku:'ڕاست', ar:'صح'}, rc_wrong:{ku:'هەڵە', ar:'خطأ'}, rc_novote:{ku:'دەنگی نەداوە', ar:'لم يصوّت'},
  rc_ord:{ku:'یەکەم|دووەم|سێیەم', ar:'الأول|الثاني|الثالث'},
  tab_convert:{ku:'ئاڵوگۆڕ', ar:'تحويل'},
  dinar:{ku:'دینار', ar:'دينار'},
  dollar:{ku:'دۆلار', ar:'دولار'},
  gold_word:{ku:'زێڕ', ar:'الذهب'},
  karat_word:{ku:'عەیار', ar:'عيار'},
  unit_g:{ku:'گرام', ar:'غرام'},
  unit_m:{ku:'مسقاڵ', ar:'مثقال'},
  unit_oz:{ku:'ئۆنسە', ar:'أونصة'},
  unit_kg:{ku:'کیلۆ', ar:'كيلو'},
  mithqal_eq:{ku:'1 مسقاڵ = 5 گرام', ar:'1 مثقال = 5 غرام'},
  million_word:{ku:'ملیۆن', ar:'مليون'},
  with_majority:{ku:'لەگەڵ زۆرینەیت', ar:'أنت مع الأغلبية'},
  res_today:{ku:'ئەنجامی ئەمڕۆ', ar:'نتيجة اليوم'},
  res_last:{ku:'ئەنجامی دوایین دەنگدانت', ar:'نتيجة آخر تصويت لك'},
  res_up:{ku:'دۆلار بەرز بووەوە', ar:'ارتفع الدولار'},
  res_down:{ku:'دۆلار نزم بووەوە', ar:'انخفض الدولار'},
  res_right:{ku:'تۆ ڕاست بوویت', ar:'كنت مُحقاً'},
  res_wrong:{ku:'ئەم جارە هەڵە بوویت', ar:'لم تكن مُحقاً هذه المرة'},
  res_acc:{ku:'ڕاستی', ar:'الدقة'},
  /* the verdict line: a dim lead-in + a coloured claim. Two keys, never one interpolated
     string, so the bold half can be green/red without building markup from translations. */
  vres_pre:{ku:'دەنگدانی پێشوو،', ar:'تصويتك السابق،'},
  vres_right:{ku:'بۆچوونەکەت ڕاست بوو', ar:'كان رأيك صحيحاً'},
  vres_wrong:{ku:'بۆچوونەکەت هەڵە بوو', ar:'كان رأيك خاطئاً'},
  vres_acc:{ku:'لە پێشبینییەکانت ڕاستە', ar:'من توقعاتك صحيحة'},
  res_streak:{ku:'بە یەک لەسەر یەک', ar:'متتالية'},
  res_best:{ku:'باشترین {n}', ar:'الأفضل {n}'},
  res_of:{ku:'{c} لە {t}', ar:'{c} من {t}'},
  bk_key_facts:{ku:'کرێ و نرخە گرنگەکان', ar:'الرسوم والأسعار الرئيسية'},
  bk_services:{ku:'خزمەتگوزارییەکان', ar:'الخدمات'},
  bk_no_facts:{ku:'زانیاری وردی کرێ هێشتا تۆمار نەکراوە', ar:'لم تُسجَّل تفاصيل الرسوم بعد'},
  bk_no_products:{ku:'زانیاری وردی خزمەتگوزاری هێشتا تۆمار نەکراوە', ar:'لم تُسجَّل تفاصيل الخدمات بعد'},
  against_majority:{ku:'بەپێچەوانەی زۆرینەیت', ar:'أنت عكس الأغلبية'},
  // مووچە lost-salary calculator
  mc_q:{ku:'حکومەت چەندی لە مووچەکەت بڕیوە؟', ar:'كم اقتطعت الحكومة من راتبك؟'},
  mc_teaser_s:{ku:'حیسابی بکە بە پێی مووچەکەت', ar:'احسبها — حسب راتبك'},
  mc_sub:{ku:'لە 2015ـەوە تا ئێستا · بە پێی مووچەی مانگانەت', ar:'من 2015 حتى الآن · حسب راتبك الشهري'},
  mc_sal:{ku:'مووچەی مانگانەت (دینار)', ar:'راتبك الشهري (دينار)'},
  mc_since:{ku:'لە کەیەوە فەرمانبەریت؟', ar:'منذ متى أنت موظف؟'},
  mc_since0:{ku:'پێش 2015 / لە 2015', ar:'قبل 2015 / من 2015'},
  mc_era1:{ku:'بڕینی بودجە و جەنگی داعش', ar:'قطع الموازنة وحرب داعش'},
  mc_era2:{ku:'سیستەمی پاشەکەوت', ar:'نظام الادخار الإجباري'},
  mc_era3:{ku:'کۆرۆنا و داڕمانی نەوت', ar:'كورونا وانهيار النفط'},
  mc_era4:{ku:'ململانێی بودجە لەگەڵ بەغدا', ar:'خلاف الموازنة مع بغداد'},
  mc_zero:{ku:'مانگ هیچت وەرنەگرت', ar:'شهراً لم تستلم شيئاً'},
  mc_part:{ku:'مانگ بە بڕین درا', ar:'شهراً استلمت منقوصاً'},
  mc_and:{ku:'و', ar:'و'},
  mc_loss:{ku:'د.ع زیانت', ar:'د.ع خسارتك'},
  mc_total:{ku:'کۆی گشتی — ئەوەی حکومەت قەرزارتە', ar:'المجموع — ما تدين به الحكومة لك'},
  mc_est:{ku:'دیناری عێراقی · خەمڵاندن', ar:'دينار عراقي · تقدير'},
  mc_eq1:{ku:'یەکسانە بە', ar:'يساوي'},
  mc_eq_gold:{ku:'مسقاڵ زێڕی 24', ar:'مثقال ذهب ٢٤'},
  mc_eq_or:{ku:'یان', ar:'أو'},
  mc_eq_months:{ku:'مانگی تەواوی مووچەکەت', ar:'شهراً كاملاً من راتبك'},
  mc_stamp:{ku:'قەرزی حکومەتە لە تۆ', ar:'دَين الحكومة عليك'},
  mc_nat:{ku:'لە هەرێمدا 1,190,391 کەس مووچە وەردەگرن — کۆی قەرزی حکومەت بۆ هاوڵاتیان: 23—31 ترلیۆن دینار', ar:'في الإقليم 1,190,391 شخصاً يتقاضون رواتب — إجمالي دين الحكومة للمواطنين: 23—31 تريليون دينار'},
  mc_src:{ku:'سەرچاوە: داتای بڵاوکراوە 2015—2025', ar:'المصدر: بيانات منشورة 2015—2025'},
  mc_share:{ku:'بڵاوی بکەرەوە', ar:'شاركها'},
  mc_share_mine:{ku:'لە 2015ـەوە نزیکەی', ar:'من 2015 اقتُطع من راتبي نحو'},
  mc_share_cut:{ku:'د.ع لە مووچەم بڕاوە', ar:'د.ع'},
  mc_share_try:{ku:'تۆش حیسابی بکە 👇', ar:'احسبها أنت أيضاً 👇'},
  gram_one:{ku:'گرامێک', ar:'الغرام'},
  iqd_sym:{ku:'د.ع', ar:'د.ع'},
  market_word:{ku:'بازاڕ', ar:'السوق'},
  range_1d:{ku:'ئەمڕۆ', ar:'اليوم'},
  range_7:{ku:'٧ ڕۆژ', ar:'٧ أيام'},
  range_30:{ku:'٣٠ ڕۆژ', ar:'٣٠ يوماً'},
  range_month:{ku:'مانگێک', ar:'شهر'},
  range_year:{ku:'ساڵێک', ar:'سنة'},
  range_all:{ku:'هەموو', ar:'الكل'},
  ago_min:{ku:'پێش {n} خولەک', ar:'قبل {n} دقيقة'},
  ago_hour:{ku:'پێش {n} کاتژمێر', ar:'قبل {n} ساعة'},
  // Dinar Pressure Index (official vs parallel spread)
  press_title:{ku:'فشاری دینار', ar:'ضغط الدينار'},
  press_official:{ku:'نرخی فەرمی', ar:'السعر الرسمي'},
  press_parallel:{ku:'نرخی بازاڕ', ar:'سعر السوق'},
  press_gap:{ku:'جیاوازی', ar:'الفجوة'},
  press_note:{ku:'جیاوازی نێوان نرخی فەرمیی بانکی ناوەندی و نرخی بازاڕی ڕاستەقینە',
              ar:'الفجوة بين السعر الرسمي للبنك المركزي وسعر السوق الفعلي'},
  press_low:{ku:'نزم', ar:'منخفض'},
  press_moderate:{ku:'مامناوەند', ar:'متوسط'},
  press_elevated:{ku:'بەرز', ar:'مرتفع'},
  press_high:{ku:'زۆر بەرز', ar:'مرتفع جداً'},
  // alerts + share
  sec_alerts:{ku:'ئاگادارکردنەوەکان', ar:'التنبيهات'},
  tab_alerts:{ku:'ئاگاداری', ar:'تنبيهات'},
  new_alert:{ku:'ئاگاداری نوێ', ar:'تنبيه جديد'},
  alert_title:{ku:'ئاگادارکردنەوەی نرخ', ar:'تنبيه سعري'},
  dir_above:{ku:'سەروو', ar:'فوق'},
  dir_below:{ku:'خواروو', ar:'تحت'},
  set_alert:{ku:'دانانی ئاگاداری', ar:'ضبط التنبيه'},
  share_rates:{ku:'ناردنی نرخەکان', ar:'مشاركة الأسعار'},
  cur_price:{ku:'نرخی ئێستا', ar:'السعر الحالي'},
  no_alerts:{ku:'هیچ ئاگادارییەکت نییە', ar:'لا توجد تنبيهات بعد'},
  alert_armed:{ku:'چالاک', ar:'نشط'},
  alert_done:{ku:'کرا', ar:'تم'},
  auth_needed:{ku:'تکایە لە ئەپی تێلێگرامەوە بیکەرەوە', ar:'افتح من تطبيق تيليجرام'},
  limit_reached:{ku:'گەیشتیتە سنووری ئاگارییەکان', ar:'بلغت الحد الأقصى للتنبيهات'},
  toast_set:{ku:'ئاگاداری دانرا ✓', ar:'تم ضبط التنبيه ✓'},
  toast_del:{ku:'سڕایەوە', ar:'تم الحذف'},
  toast_shared:{ku:'نێردرا بۆ چاتەکەت ✓', ar:'أُرسلت إلى محادثتك ✓'},
  toast_fail:{ku:'هەڵەیەک ڕوویدا', ar:'حدث خطأ'},
  no_chart:{ku:'داتای پێویست نییە', ar:'لا توجد بيانات كافية'},
  sharing:{ku:'ناردن…', ar:'جارٍ الإرسال…'},
  // engagement: since / streak / crowd
  since_label:{ku:'لەدوای کۆتا سەردانت', ar:'منذ آخر زيارة'},
  crowd_title:{ku:'بۆچوونی بازاڕ', ar:'رأي السوق'},
  people_today:{ku:'کەس ئەمڕۆ', ar:'شخص اليوم'},
  crowd_q:{ku:'{day}، دۆلار بەرز دەبێتەوە یان نزم؟', ar:'{day}، هل يرتفع الدولار أم ينخفض؟'},
  your_vote:{ku:'دەنگی تۆ', ar:'صوتك'},
  voted_thanks:{ku:'سوپاس بۆ بەشداریت', ar:'شكراً لمشاركتك'},
  mood_bull:{ku:'ئاراستە بەرەوژوورە', ar:'الميل صاعد'},
  mood_bear:{ku:'ئاراستە بەرەوخوارە', ar:'الميل هابط'},
  mood_flat:{ku:'ئاراستە جێگیرە', ar:'الميل محايد'},
  sh_telegram:{ku:'تێلێگرام', ar:'تيليجرام'}, sh_whatsapp:{ku:'واتسئاپ', ar:'واتساب'}, sh_x:{ku:'X', ar:'X'},
  sh_messenger:{ku:'مەسنجەر', ar:'ماسنجر'}, sh_copy:{ku:'کۆپی', ar:'نسخ'},
  share_sub:{ku:'نرخی ئەمڕۆ لەگەڵ هاوڕێکانت هاوبەش بکە', ar:'شارك أسعار اليوم مع أصدقائك'},
  send_card:{ku:'وێنەی کارت بنێرە بۆ چاتەکەم', ar:'أرسل بطاقة الصورة إلى محادثتي'},
  vote_up:{ku:'بەرز', ar:'يرتفع'},
  vote_down:{ku:'نزم', ar:'ينخفض'},
  votes_total:{ku:'{n} دەنگ', ar:'{n} صوت'},
  be_first:{ku:'یەکەم کەس بە کە دەنگ دەدەیت', ar:'كن أول من يصوّت'},
  toast_voted:{ku:'دەنگت تۆمارکرا ✓', ar:'تم تسجيل صوتك ✓'},
  load_more:{ku:'هەواڵی زیاتر', ar:'أخبار أقدم'},
  loading_more:{ku:'باردەکرێت…', ar:'جارٍ التحميل…'},
  news_end:{ku:'کۆتایی هەواڵەکان', ar:'نهاية الأخبار'},
  // news reader
  orig_headline:{ku:'دەقی ڕەسەن', ar:'النص الأصلي'},
  read_full:{ku:'خوێندنەوەی هەواڵی تەواو', ar:'قراءة الخبر كاملاً'},
  share_lbl:{ku:'هاوبەشی بکە', ar:'شارك'},
  source_lbl:{ku:'سەرچاوە', ar:'المصدر'},
  copied:{ku:'لینک کۆپی کرا ✓', ar:'تم نسخ الرابط ✓'},
  markets_title:{ku:'بازاڕەکان', ar:'الأسواق'},
  search_ph:{ku:'گەڕان بەدوای دراو، زێڕ، کریپتۆ…', ar:'ابحث عن عملة، ذهب، كريبتو…'},
  cat_all:{ku:'هەموو', ar:'الكل'},
  cat_currency:{ku:'دراو', ar:'عملات'},
  cat_metal:{ku:'زێڕ و کانزا', ar:'معادن'},
  cat_crypto:{ku:'کریپتۆ', ar:'كريبتو'},
  cat_stock:{ku:'پشک', ar:'أسهم'},
  cat_index:{ku:'ئیندێکس', ar:'مؤشرات'},
  cat_forex:{ku:'دراوی جیهانی', ar:'فوركس'},
  cat_oil:{ku:'نەوت', ar:'نفط'},
  scope_local:{ku:'نرخی ناوخۆ', ar:'سعر محلي'},
  scope_global:{ku:'جیهانی', ar:'عالمي'},
  scope_local_tab:{ku:'بازاڕی ناوخۆ', ar:'السوق المحلي'},
  scope_global_tab:{ku:'بازاڕی جیهانی', ar:'السوق العالمي'},
  no_results:{ku:'هیچ ئەنجامێک نەدۆزرایەوە', ar:'لا نتائج'},
  news_empty:{ku:'هێشتا هیچ هەواڵێک نییە', ar:'لا توجد أخبار بعد'}, news_empty_s:{ku:'کە هەواڵێکی نوێ بڵاوبووەوە، لێرە دەیبینیت', ar:'ستظهر هنا فور نشر خبر جديد'},
  load_fail:{ku:'نەتوانرا بار بکرێت', ar:'تعذّر التحميل'}, load_fail_s:{ku:'دووبارە هەوڵ بدەرەوە', ar:'أعد المحاولة'}, reload_btn:{ku:'نوێکردنەوە', ar:'تحديث'},
  global_24h:{ku:'٢٤ کاتژمێر · جیهانی', ar:'٢٤ ساعة · عالمي'},
  opens_in:{ku:'بازاڕ دەکرێتەوە دوای', ar:'يفتح السوق بعد'},
  hr:{ku:'کاتژمێر', ar:'ساعة'},
  min:{ku:'خولەک', ar:'دقيقة'},
  // bank tab
  tab_bank:{ku:'بانک', ar:'المصارف'},
  sec_bank:{ku:'بانک و فینتێک', ar:'المصارف والدفع'},
  sal_title:{ku:'مووچەی ئەم مانگە', ar:'رواتب هذا الشهر'},
  sal_federal:{ku:'حکوومەتی ناوەندی', ar:'الحكومة الاتحادية'},
  sal_kri:{ku:'هەرێمی کوردستان', ar:'إقليم كردستان'},
  sal_released:{ku:'دەرچوو', ar:'صُرفت'},
  sal_distributing:{ku:'دابەشدەکرێت', ar:'قيد الصرف'},
  sal_sent:{ku:'نێردراوە', ar:'أُرسلت'},
  sal_delayed:{ku:'دواخراوە', ar:'متأخرة'},
  sal_pending:{ku:'چاوەڕوانی هەواڵ', ar:'بانتظار الإعلان'},
  // big plain-language verdict (driven by the KRI status — the audience that worries most)
  sv_distributing:{ku:'مووچە دابەشدەکرێت', ar:'يجري صرف الرواتب'},
  sv_sent:{ku:'پارەی مووچە نێردراوە بۆ هەرێم — بەمزووانە دادەبەزرێت', ar:'تم إرسال أموال الرواتب للإقليم — الصرف قريباً'},
  sv_delayed:{ku:'مووچە دواخراوە', ar:'الرواتب متأخرة'},
  sv_pending:{ku:'چاوەڕێی ناردنی مووچەین لە بەغداوە', ar:'بانتظار تحويل الرواتب من بغداد'},
  sv_sub_good:{ku:'بەپێی نوێترین هەواڵ', ar:'بحسب آخر الأخبار'},
  sv_sub_wait:{ku:'هێشتا بڕیاری ناردنی پارە نەدراوە', ar:'لم يصدر بعد قرار بإرسال الأموال'},
  sp_sent_wait:{ku:'بەغدا پارە دەنێرێت', ar:'بغداد ترسل المال'},
  sp_sent_done:{ku:'بەغدا پارەی نارد', ar:'بغداد أرسلت المال'},
  sp_paid_wait:{ku:'دابەشکردنی مووچە', ar:'توزيع الرواتب'},
  sp_paid_done:{ku:'مووچە دابەشکرا', ar:'صُرفت الرواتب'},
  bk_all:{ku:'هەموو', ar:'الكل'},
  bk_fintech:{ku:'فینتێک', ar:'فينتك'},
  bk_kri:{ku:'هەرێم', ar:'الإقليم'},
  bk_ann_badge:{ku:'بەم زووانە', ar:'قريباً'},
  bk_ann_title:{ku:'دەوڵەمەندترین ڕێبەری بانکی عێراق', ar:'الدليل المصرفي الأغنى في العراق'},
  bk_ann_body:{ku:'هەموو زانیاریەکی پێویست دەربارەی بانکەکانی عێراق لە یەک شوێندا — بەردەوام نوێ دەکرێتەوە.', ar:'كل ما تحتاجه عن مصارف العراق في مكان واحد — يُحدَّث باستمرار.'},
  bk_ann_f1:{ku:'گواستنەوەی دۆلار', ar:'تحويلات الدولار'},
  bk_ann_f2:{ku:'کارتی نێودەوڵەتی', ar:'البطاقات الدولية'},
  bk_ann_f3:{ku:'نرخی ڕاستەقینە', ar:'الأسعار الحقيقية'},
  bk_ann_f4:{ku:'ئۆفەرەکان', ar:'العروض'},
  bk_transfer:{ku:'گواستنەوەی نێودەوڵەتی', ar:'تحويل دولي'},
  bk_card:{ku:'کارتی دۆلاری', ar:'بطاقة دولارية'},
  bk_cash:{ku:'دراوی کاش', ar:'سحب دولار'},
  bk_yes:{ku:'هەیە', ar:'متاح'},
  bk_limited:{ku:'سنووردار', ar:'محدود'},
  bk_no:{ku:'نییە', ar:'غير متاح'},
  bk_global:{ku:'ڤیزا/ماستەرکارد', ar:'فيزا/ماستركارد'},
  bk_domestic:{ku:'ناوخۆیی', ar:'محلية'},
  bk_unknown:{ku:'نادیار', ar:'غير معروف'},
  bk_unverified:{ku:'پشتڕاست نەکراوەتەوە', ar:'غير مؤكد'},
  bk_updates:{ku:'نوێکارییەکان و ئۆفەرەکان', ar:'التحديثات والعروض'},
  bk_no_updates:{ku:'هیچ نوێکارییەک نییە لە ئێستادا', ar:'لا توجد تحديثات حالياً'},
  bk_visit:{ku:'ماڵپەڕ', ar:'الموقع'},
  bk_facebook:{ku:'فەیسبووک', ar:'فيسبوك'},
  bk_search_ph:{ku:'گەڕان بەدوای بانک…', ar:'ابحث عن مصرف…'},
  bk_has_offers:{ku:'ئۆفەر', ar:'عرض'},
  bk_call:{ku:'پەیوەندی', ar:'اتصال'},
  bk_location:{ku:'نەخشە', ar:'الخريطة'},
  bk_social:{ku:'سۆشیال', ar:'تواصل'},
  bk_status_t:{ku:'دۆخی خزمەتگوزاری', ar:'حالة الخدمات'},
  bk_rates_t:{ku:'نرخ، قەرز و کرێ', ar:'المعدلات والقروض والرسوم'},
  bk_source:{ku:'سەرچاوە', ar:'المصدر'},
  bk_free:{ku:'بەخۆڕایی', ar:'مجاناً'},
  bkp_accounts:{ku:'هەژمارەکان', ar:'الحسابات'},
  bkp_deposits:{ku:'سپردەکان', ar:'الودائع'},
  bkp_financing:{ku:'قەرز و تەمویل', ar:'التمويل والقروض'},
  bkp_cards:{ku:'کارتەکان', ar:'البطاقات'},
  bkp_transfers:{ku:'گواستنەوەکان', ar:'التحويلات'},
  bkp_fees:{ku:'کرێی خزمەتگوزاری', ar:'رسوم الخدمات'},
  bkp_digital:{ku:'دیجیتاڵ', ar:'رقمي'},
  bk_branches:{ku:'لقەکان و شارەکان', ar:'الفروع والمدن'},
  bk_type_state:{ku:'دەوڵەتی', ar:'حكومي'},
  bk_type_private:{ku:'تایبەت', ar:'خاص'},
  bk_type_islamic:{ku:'ئیسلامی', ar:'إسلامي'},
  bk_type_foreign:{ku:'بیانی', ar:'أجنبي'},
  bk_type_fintech:{ku:'فینتێک', ar:'فينتك'},
};

function detectLang(){
  // priority: explicit in-app toggle > language the user picked in the BOT (cached) >
  // Telegram client language > Kurdish default.
  try{ const s=localStorage.getItem('lang'); if(s==='ku'||s==='ar') return s; }catch(e){}
  try{ const b=localStorage.getItem('botLang'); if(b==='ku'||b==='ar') return b; }catch(e){}
  const lc=(tg?.initDataUnsafe?.user?.language_code||'').toLowerCase();
  return lc.startsWith('ar') ? 'ar' : 'ku';
}
// City order is a trust signal: Arabic users (mostly Baghdad/Basra) see those first; Kurdish users
// see Sulaymaniyah/Erbil first. Applied to the city segment AND the default selected city.
function cityOrder(lang){ return lang==='ar'
  ? ['baghdad','basra','erbil','sulaymaniyah','duhok']
  : ['sulaymaniyah','erbil','duhok','baghdad','basra']; }
// Duhok comes from one channel and only on some days: its button appears only while the board has a Duhok price.
const SOMETIMES_CITIES=new Set(['duhok']);
function citiesFor(asset){ const have=new Set((state.board||[]).filter(r=>r.asset===asset).map(r=>r.city));
  return cityOrder(state.lang).filter(c=>!SOMETIMES_CITIES.has(c)||have.has(c)); }

const state = {panOff:0, asset:'USD100', city:cityOrder(detectLang())[0], range:30, board:[], marketOpen:true, reversed:false, updated:null, lang:detectLang(), newsCat:'all', news:[], newsHasMore:false, newsOffset:0, _loadingMore:false, convFrom:'USD100', convTo:'IQD', convSide:'from', convUnit:'m', alerts:[], alertMax:20, alertDir:'above', alertAsset:'USD100', seen:new Set(), pulse:[], sentiment:null, _sinceDone:false, markets:[], mkByKey:{}, watch:['USD100','XAU_MITHQAL_24','EUR100'], mktScope:'local', banks:[], bankFilter:'all', bankQuery:'', _banksLoaded:false, chartType:'line'};
try{ const ct=localStorage.getItem('chartType'); if(ct==='candle'||ct==='line') state.chartType=ct; }catch(e){}

// Signed Telegram launch params — proves who the user is to the alerts/share API.
const initData = tg?.initData || '';
// Stable per-device id so low-stakes actions (the mood vote) work even when signed
// initData is unavailable; the backend only trusts it for sentiment, never for alerts.
let devId = ''; try{ devId = localStorage.getItem('dev_id') || ''; if(!devId){ devId = (crypto?.randomUUID ? crypto.randomUUID() : 'd'+Date.now()+Math.random().toString(36).slice(2)); localStorage.setItem('dev_id', devId); } }catch(e){}
const authHeaders = (json) => { const h = json ? {'Content-Type':'application/json'} : {}; if(initData) h['X-Init-Data']=initData; if(devId) h['X-Device-Id']=devId; return h; };
const bellSvg = (s=18,col='currentColor') => `<svg viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="width:${s}px;height:${s}px"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`;
function toast(msg, kind){ const t=$('toast'); t.textContent=msg; t.className='toast on '+(kind||''); clearTimeout(t._t); t._t=setTimeout(()=>{t.className='toast '+(kind||'');},2300); }
// Sensible +/- step per asset class when nudging an alert target.
function stepFor(code){ if(code.startsWith('XAU')) return 5000; if(code==='XAG_KG_USD') return 5; if(code==='TRY100') return 25; if(code==='TMN_1M') return 100; return 250; }
// News categories (chip row). Keys match config.NEWS_CATEGORIES; icons are inline
// Lucide-style line SVGs so they take dim→gold like the rest of the UI.
// Order mirrors config.NEWS_CATEGORIES (logical, local→global): currency & monetary
// (dollar, bank) → commodities (gold, oil) → global (world, crypto).
const CATS=[
  {key:'all',    ku:'هەموو',  ar:'الكل', ic:'<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>'},
  {key:'dollar', ku:'دۆلار',  ar:'الدولار', ic:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'},
  {key:'salary', ku:'مووچە',  ar:'الرواتب', ic:'<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>'},
  {key:'gold',   ku:'زێڕ',    ar:'الذهب', ic:'<circle cx="12" cy="12" r="8"/><path d="M9 10.5 12 8l3 2.5M12 8v8"/>'},
  {key:'prices', ku:'نرخەکان', ar:'الأسعار', ic:'<path d="M4 9h16l-1.2-4H5.2z"/><path d="M5 9v10h14V9"/><path d="M9.5 19v-5h5v5"/>'},
  {key:'revenue',ku:'داهات/نەوت', ar:'الموازنة/النفط', ic:'<circle cx="12" cy="12" r="9"/><path d="M12 12V3.2"/><path d="M12 12l7.6 4.6"/>'},
];
const catOf = k => CATS.find(c=>c.key===k);
const catLabel = k => { const c=catOf(k); return c ? (state.lang==='ar'?c.ar:c.ku) : ''; };
const svgIcon = ic => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg>`;
// Deep link: a "📊 Open Live Chart" button passes startapp=<asset>[_<city>] so the app
// opens straight to that asset's chart.
try{ const sp=tg?.initDataUnsafe?.start_param; if(sp){ const [a,c]=sp.split('_');
  if(ASSETS[a]) state.asset=a; if(c && CITIES[c]) state.city=c; } }catch(e){}
const T = k => (I18N[k] && (I18N[k][state.lang]||I18N[k].ku)) || k;
const aName = a => state.lang==='ar' ? a.name_ar : a.name;
const aFull = a => state.lang==='ar' ? a.full_ar : a.full;
const aSym  = a => state.lang==='ar' ? a.sym_ar : a.sym;
// amount-prefixed name so a bare value is never ambiguous: "١٠٠ درهەم" = 100 dirham → X dinar.
// per=100 currencies get the ١٠٠ prefix; the million-toman unit shows its own label; gold/silver (per 1) stay as-is.
const unitName = a => a.per===100 ? '١٠٠ '+aName(a) : (/1M/.test(a.unit||'') ? aSym(a) : aName(a));
const cityName = c => c ? (CITIES[c] ? CITIES[c][state.lang]||CITIES[c].ku : c) : '';
const $ = id => document.getElementById(id);
const fmt = n => n==null ? '—' : Math.round(n).toLocaleString('en-US');
// global (crypto/USD) assets aren't in the local ASSETS map; they come from /api/markets
const isGlobal = k => !ASSETS[k];
const fmtUsd = p => p==null?'—' : p>=1000?Math.round(p).toLocaleString('en-US')
  : p>=1?p.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
  : p.toLocaleString('en-US',{maximumFractionDigits:6});
const pctOf = r => { if(!r||!r.delta) return null; const p=r.value-r.delta; return p ? r.delta/p*100 : null; };
const current = (a,c)=>{ const A=ASSETS[a]; return state.board.find(x=>x.asset===a && (A.hasCity?x.city===c:true)); };

/* numTween writes a ROLLING NUMBER into an element. Named apart from the streak card's
   tween() (a generic 0→1 driver that returns nothing) — both are top-level in this one
   script, so sharing the name let the later declaration win and silently killed every
   caller of this one. */
function numTween(el,to,f){ const from=el._v??to; el._v=to; if(from===to){el.textContent=f(to);return;}
  const t0=performance.now(),dur=650; cancelAnimationFrame(el._raf);
  const step=t=>{const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3); el.textContent=f(from+(to-from)*e); if(p<1)el._raf=requestAnimationFrame(step);}; el._raf=requestAnimationFrame(step); }

function countUp(el,to,suffix=''){ const from=el._cv??to; el._cv=to; if(from===to){el.textContent=Math.round(to)+suffix;return;}
  const t0=performance.now(),dur=620; cancelAnimationFrame(el._cr); clearTimeout(el._ct);
  const step=t=>{const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3); el.textContent=Math.round(from+(to-from)*e)+suffix; if(p<1)el._cr=requestAnimationFrame(step);}; el._cr=requestAnimationFrame(step);
  el._ct=setTimeout(()=>{el.textContent=Math.round(to)+suffix;},dur+80); }
/* odometer: each digit rolls vertically to its target; flashes up/down on a real move */
function setOdometer(el,str,dir){ const chars=str.split('');
  if(el._odoLen!==chars.length){ el.innerHTML=chars.map(c=>/\d/.test(c)
      ? `<span class="odo-d"><span class="odo-strip">${'0123456789'.split('').map(d=>`<span>${d}</span>`).join('')}</span></span>`
      : `<span class="odo-sep">${c}</span>`).join(''); el._odoLen=chars.length; }
  const cols=el.children;
  chars.forEach((c,i)=>{ const node=cols[i]; if(!node)return;
    if(/\d/.test(c)){ const strip=node.firstChild; if(strip) strip.style.transform=`translateY(${-parseInt(c,10)}em)`; }
    else node.textContent=c; });
  el._odoStr=str;
  if(dir){ el.classList.remove('odo-up','odo-down'); void el.offsetWidth; el.classList.add('odo-'+dir); clearTimeout(el._odoT); el._odoT=setTimeout(()=>el.classList.remove('odo-up','odo-down'),780); }
}
function openLink(u){ if(!u)return; try{
  // App deep links (fb-messenger://, whatsapp://, etc.) must hit the OS, NOT
  // Telegram's https-only in-app browser — open them directly so the app launches.
  if(!/^https?:\/\//i.test(u)){ window.location.href=u; return; }
  // t.me/share/url must go through Telegram's OWN handler (native share dialog),
  // not the in-app browser, or the share doesn't fire.
  if(tg && tg.openTelegramLink && /^https?:\/\/(t\.me|telegram\.me)\//i.test(u)){ tg.openTelegramLink(u); return; }
  if(tg && tg.openLink){ tg.openLink(u); return; }
  window.open(u,'_blank');
}catch(e){ try{ window.open(u,'_blank'); }catch(_){} } }
function ripple(e){ const b=e.currentTarget,r=b.getBoundingClientRect(),s=Math.max(r.width,r.height);
  const sp=document.createElement('span'); sp.className='r'; sp.style.width=sp.style.height=s+'px';
  sp.style.left=((e.clientX||r.left+r.width/2)-r.left-s/2)+'px'; sp.style.top=((e.clientY||r.top+r.height/2)-r.top-s/2)+'px';
  b.appendChild(sp); setTimeout(()=>sp.remove(),600); }
document.querySelectorAll('.rip').forEach(b=>b.addEventListener('pointerdown',ripple));

/* ---- custom SVG chart (no external lib) ---- */
function fmtCompact(v){ v=+v; const a=Math.abs(v);
  if(a>=1e6) return (v/1e6).toFixed(2)+'M';
  if(a>=1e4) return Math.round(v/1e3)+'k';
  if(a>=1e3) return (v/1e3).toFixed(1)+'k';
  if(a>=100) return v.toFixed(0);
  if(a>=1) return v.toFixed(2);
  return v.toFixed(4); }
/* --- TradingView-style price axis: round "nice" gridlines that bracket the data, with labels
   precise enough to actually read (fmtCompact collapsed 154,350 → "154k", all lines the same). --- */
function niceStep(range, ticks){
  range = range>0 ? range : (Math.abs(range)||1);
  const raw=range/ticks, mag=Math.pow(10,Math.floor(Math.log10(raw))), n=raw/mag;
  return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*mag;
}
function niceAxis(lo, hi, ticks){
  if(hi<=lo) hi=lo+(Math.abs(lo)*0.001||1);
  const step=niceStep(hi-lo, ticks);
  return {nlo:Math.floor(lo/step)*step, nhi:Math.ceil(hi/step)*step, step};
}
function fmtTick(v, step){                       // precise, width-aware axis/price label
  const a=Math.abs(v);
  if(a>=1e6){ const d=Math.max(0,Math.min(3,6-Math.floor(Math.log10(step)))); return (v/1e6).toFixed(d)+'M'; }
  if(a>=1e4) return Math.round(v).toLocaleString('en-US');                       // 154,350 — full, exact
  const d=Math.max(0,Math.min(4,-Math.floor(Math.log10(step))));
  return v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
}
function chartGeom(wrap){
  const W=Math.max(280,Math.round(wrap.clientWidth||340)), H=Math.max(120,Math.round(wrap.clientHeight||150));
  return {W,H,padX:8,padT:14,padB:22,padR:52,plotW:W-2*8-52};   // padR=price gutter, padB=time-axis gutter
}
/* The armed alert for whatever the chart is currently showing: a gold hairline with a small bell
   at its START and an OUTLINED pill on the axis.
   Two rules keep this from turning the chart into a mess:
     · the price tag is SOLID and filled, the alert is a hairline and an outline — one loud
       element on the axis, one quiet one;
     · the bell rides the start of the line, never the pill. Six digits plus a glyph inside a
       ~50px pill never breathes.
   Returns '' when nothing is armed or the target sits outside the visible range, so a far-off
   alert can never squash the price scale. */
function alertOverlay(W,padX,padR,Y,lo,hi,step){
  try{
    const A=ASSETS[state.asset], wantCity=(A&&A.hasCity)?state.city:null;
    const a=(state.alerts||[]).find(x=>x.active===1 && !x.triggered_at && x.asset===state.asset
              && ((x.city||null)===wantCity || !x.city));
    if(!a) return {svg:'',y:null};
    const t=+a.target; if(!isFinite(t) || t<=lo || t>=hi) return {svg:'',y:null};
    const y=+Y(t).toFixed(1);
    return {y, svg:
        `<path class="ck-alert" d="M-3.4 1.6c0-.2 1.2-.8 1.2-3.4a2.2 2.2 0 0 1 4.4 0c0 2.6 1.2 3.2 1.2 3.4Z`
      + `M-1 2.5a1.2 1.2 0 0 0 2 0" fill="none" stroke="var(--gold)" stroke-width="1"`
      + ` stroke-linejoin="round" stroke-linecap="round" opacity=".9"`
      + ` transform="translate(${(padX+5).toFixed(1)},${y})" vector-effect="non-scaling-stroke"/>`
      + `<line class="ck-alert" x1="${(padX+12).toFixed(1)}" y1="${y}" x2="${(W-padR).toFixed(1)}" y2="${y}"`
      + ` stroke="var(--gold)" stroke-width="1" stroke-dasharray="5 4" opacity=".5" vector-effect="non-scaling-stroke"/>`
      + `<rect class="ck-alert" x="${(W-padR+3).toFixed(1)}" y="${(y-8.5).toFixed(1)}" width="${padR-6}" height="17"`
      + ` rx="4.5" fill="var(--panel)" stroke="var(--gold)" stroke-width="1" opacity=".95"/>`
      + `<text class="ck-alert" x="${(W-padR/2).toFixed(1)}" y="${(y+3.6).toFixed(1)}" text-anchor="middle"`
      + ` font-size="11" font-weight="600" font-family="var(--num)" fill="var(--gold)">${esc(fmtTick(t,step))}</text>`};
  }catch(e){ return {svg:'',y:null}; }
}

/* An axis label half-hidden behind a tag is worse than no label — the reader can trust neither.
   Drop any gridline label that lands within 13px of something already occupying that band. */
function axisLabels(rows,taken){
  return rows.filter(r=>!taken.some(t=>t!=null && Math.abs(t-r.y)<13))
    .map(r=>`<text class="ch-gridlbl"${r.v!=null?` data-v="${r.v}"`:''} x="${r.x}" y="${(r.y+4).toFixed(1)}" text-anchor="end">${esc(r.txt)}</text>`)
    .join('');
}

const CK_DEFS=`<defs><linearGradient id="ckU" x1="0" y1="0" x2="0" y2="1">`
  +`<stop offset="0" stop-color="#3df08d"/><stop offset="1" stop-color="#149a55"/></linearGradient>`
  +`<linearGradient id="ckD" x1="0" y1="0" x2="0" y2="1">`
  +`<stop offset="0" stop-color="#ff6f78"/><stop offset="1" stop-color="#a8232f"/></linearGradient>`
  +`<filter id="ckS" x="-50%" y="-50%" width="200%" height="200%">`
  +`<feDropShadow dx="0" dy="1.4" stdDeviation="1.3" flood-color="#000" flood-opacity=".55"/></filter></defs>`;
function priceTag(W,padR,y,col,txt){   // a TradingView-style price label pinned to the right axis
  return `<line class="ch-pt" x1="8" y1="${y}" x2="${(W-padR+2).toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="1" stroke-dasharray="3 3" opacity=".7"/>`
    +`<rect class="ch-pt" x="${(W-padR+2).toFixed(1)}" y="${(+y-8).toFixed(1)}" width="${padR-3}" height="16" rx="3" fill="${col}"/>`
    +`<text class="ch-pt" x="${W-3}" y="${(+y+4).toFixed(1)}" text-anchor="end" font-size="11" font-weight="700" font-family="var(--num)" fill="#06121f">${esc(txt)}</text>`;
}
// --- time axis (TradingView-style): the label format scales with the chosen range ---
const WD_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];   // Sun..Sat — short English (compact, no overlap)
const MONTHS_KU=['کانوونی دووەم','شوبات','ئازار','نیسان','ئایار','حوزەیران','تەمموز','ئاب','ئەیلوول','تشرینی یەکەم','تشرینی دووەم','کانوونی یەکەم'];
const MONTHS_AR=['كانون الثاني','شباط','آذار','نيسان','أيار','حزيران','تموز','آب','أيلول','تشرين الأول','تشرين الثاني','كانون الأول'];
function _bgParts(t){ const o={};
  try{ new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Baghdad',weekday:'long',day:'numeric',
    month:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false})
    .formatToParts(new Date(t*1000)).forEach(p=>o[p.type]=p.value); }catch(e){}
  return o; }
function fmtXTick(t, range){
  const p=_bgParts(t); if(!p.day) return '';
  if(range===0) return (p.hour||'00')+':'+(p.minute||'00');                       // today → time of day
  const wd=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(p.weekday);
  if(range===7) return WD_EN[wd]||'';                                              // week → day of the week (EN, fits)
  if(range===30) return p.day+'/'+p.month;                                         // month → DD/MM
  if(range>=1000) return String(p.year);                                           // multi-year → YYYY
  return p.month+'/'+String(p.year).slice(-2);                                     // year → MM/YY
}

/* A decade of daily closes is ~3,100 points into a phone-width chart — several
   per pixel, so the line renders as noise and the draw animation crawls. Bucket
   long spans to one point per month (the month's last close). */
function bucketMonthly(points){
  const byMonth={};
  for(const p of points){
    const d=new Date(p.time*1000);
    byMonth[d.getUTCFullYear()+'-'+d.getUTCMonth()]=p;   // last wins = month close
  }
  return Object.values(byMonth).sort((a,b)=>a.time-b.time);
}

/* Merge candles that share a bucket: open of the first, close of the last, the
   extreme high and low. Used to coarsen a series the server only serves at a finer
   grain — a year of daily bars is ~310 candles into a viewport that holds ~27. */
function groupCandles(candles, keyFn){
  const by={}, order=[];
  candles.forEach((c,i)=>{ const k=keyFn(c,i), g=by[k];
    if(!g){ by[k]={time:c.time,o:c.o,h:c.h,l:c.l,c:c.c}; order.push(k); }
    else { g.h=Math.max(g.h,c.h); g.l=Math.min(g.l,c.l); g.c=c.c; } });
  return order.map(k=>by[k]).sort((a,b)=>a.time-b.time);
}
/* How many candles the viewport holds — the one place the width/slot maths lives, so the
   chart and the code choosing a bucket can never disagree about it. */
function candleFit(){
  const g=chartGeom($('chart'));
  return Math.max(6,Math.floor(g.plotW/Math.max(6,Math.min(g.plotW/8,CANDLE_W))));
}
/* "Everything" has to fit on one screen, so merge equal runs of consecutive candles. */
function compressToFit(cs){
  const f=candleFit(); if(cs.length<=f) return cs;
  const k=Math.ceil(cs.length/f);
  return groupCandles(cs,(c,i)=>Math.floor(i/k));
}

function bucketMonthlyCandles(candles){
  const byMonth={};
  for(const c of candles){
    const d=new Date(c.time*1000), k=d.getUTCFullYear()+'-'+d.getUTCMonth(), m=byMonth[k];
    if(!m) byMonth[k]={time:c.time, o:c.o, h:c.h, l:c.l, c:c.c};
    else { m.h=Math.max(m.h,c.h); m.l=Math.min(m.l,c.l); m.c=c.c; m.time=c.time; }
  }
  return Object.values(byMonth).sort((a,b)=>a.time-b.time);
}
/* Coarsest first. The axis picks the first of these that gives every visible tick a
   DIFFERENT label — tying the format to the range constant instead produced "2025 2025
   2026 2026" on the all-time view and a repeated "Wed" on the week, which is what made
   the timeframes look identically labelled. */
const TICK_FMTS=[
  t=>{const p=_bgParts(t); return String(p.year||'');},                          // 2026
  t=>{const p=_bgParts(t); return p.month+'/'+String(p.year).slice(-2);},        // 08/26
  t=>{const p=_bgParts(t); const w=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        .indexOf(p.weekday); return WD_EN[w]||'';},                              // Wed
  t=>{const p=_bgParts(t); return p.day+'/'+p.month;},                           // 26/08
  t=>{const p=_bgParts(t); return (p.hour||'00')+':'+(p.minute||'00');},         // 14:30
];
function pickTickFmt(times){
  const span=times[times.length-1]-times[0];
  for(let i=0;i<TICK_FMTS.length;i++){
    if(i===2 && span>8*86400) continue;              // weekday names only read within a week
    const v=times.map(TICK_FMTS[i]);
    if(v.every(Boolean) && new Set(v).size===v.length) return TICK_FMTS[i];
  }
  return TICK_FMTS[3];
}
function chartXAxis(times, xAt, H, range){
  const n=times.length; if(n<2) return '';
  /* The number of labels has to follow the PIXELS the candles occupy, not be a constant 5.
     A short series right-anchors into a narrow band — the year view is 11 candles in ~90px —
     and five labels crammed in there overlap each other. So: lay out provisional ticks, see
     how wide their text actually is, then thin the ticks until each has room. */
  const ticksAt=k=>{ const a=[]; for(let j=0;j<=k;j++) a.push(Math.round(j/k*(n-1))); return a; };
  const CHAR_W=5.6, MIN_GAP=8;   // 10.5px Rajdhani numerals; measured ~5.6px per glyph
  /* Anchors differ — the first label runs rightwards from its tick, the last leftwards, the
     rest are centred — so spacing alone under-counts how close the first PAIR really is.
     Walk the actual boxes and drop to fewer ticks until every neighbour clears MIN_GAP. */
  const clears=(a,f)=>{ let prevR=-1e9;
    for(let k=0;k<a.length;k++){
      const x=xAt(a[k]), w=f(times[a[k]]).length*CHAR_W;
      const l=k===0?x:(k===a.length-1?x-w:x-w/2);
      if(l-prevR<MIN_GAP) return false;
      prevR=l+w;
    }
    return true; };
  let at=ticksAt(4), fmt=pickTickFmt(at.map(i=>times[i]));
  for(let N=4;N>=1;N--){
    const a=ticksAt(N), f=pickTickFmt(a.map(i=>times[i]));
    if(clears(a,f)||N===1){ at=a; fmt=f; break; }
  }
  let s='';
  at.forEach((i,k)=>{ const a=k===0?'start':k===at.length-1?'end':'middle';
    s+=`<text class="ch-xlbl" x="${xAt(i).toFixed(1)}" y="${(H-6).toFixed(1)}" text-anchor="${a}">${esc(fmt(times[i]))}</text>`; });
  return s;
}
// Full date for the OPENED article: "day month year" — month name localized (Kurdish/Arabic),
// numerals kept English. (List headlines keep the relative "x ago" via metaTime.)
function newsFullDate(n){
  const iso=n&&n.published_at; if(!iso) return '';
  try{ const d=new Date(iso); if(isNaN(d.getTime())) return '';
    const p={}; new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Baghdad',day:'numeric',month:'numeric',year:'numeric'})
      .formatToParts(d).forEach(x=>p[x.type]=x.value);
    const m=(state.lang==='ar'?MONTHS_AR:MONTHS_KU)[parseInt(p.month,10)-1]||'';
    return `${p.day} ${m} ${p.year}`;
  }catch(e){ return ''; }
}
function drawChart(points){
  const wrap=$('chart');
  if(!points||points.length<2){ wrap.innerHTML=''; CHART=null; return; }
  const {W,H,padX,padT,padB,padR,plotW}=chartGeom(wrap);
  const v=points.map(p=>p.value), dlo=Math.min(...v), dhi=Math.max(...v);
  const {nlo,nhi,step}=niceAxis(dlo,dhi,4), lo=nlo, hi=nhi, sp=(hi-lo)||1, n=v.length;
  CHART={mode:'line',pts:points,n,W,H,padX,padT,padB,plotW,lo,hi,sp};
  const X=i=>padX+(i/(n-1))*plotW, Y=x=>padT+(1-(x-lo)/sp)*(H-padT-padB);
  let grid=''; const lbls=[];
  for(let val=nlo; val<=nhi+step*1e-3; val+=step){ const y=+Y(val).toFixed(1);
    grid+=`<line class="ch-grid" x1="${padX}" y1="${y}" x2="${(W-padR).toFixed(1)}" y2="${y}" stroke-width="1"/>`;
    lbls.push({x:W-4,y,txt:fmtTick(val,step)}); }
  let line='M'+X(0).toFixed(1)+' '+Y(v[0]).toFixed(1);
  for(let i=1;i<n;i++) line+=' L'+X(i).toFixed(1)+' '+Y(v[i]).toFixed(1);
  /* BASELINE line: green above the period's opening price, red below it, split by a clip at the
     open. Same semantics the candles use, so switching line↔candle never changes the language of
     the chart — and it answers "am I up or down since then?" without reading a number. */
  const openY=Y(v[0]);
  const base=(H-padB).toFixed(1), area=line+` L${X(n-1).toFixed(1)} ${openY.toFixed(1)} L${X(0).toFixed(1)} ${openY.toFixed(1)} Z`;
  const up=v[n-1]>=v[0], col=up?UPC():DNC(), ex=X(n-1).toFixed(1), ey=Y(v[n-1]).toFixed(1);
  wrap.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible">
    <defs><linearGradient id="agU" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${UPC()}" stop-opacity=".26"/><stop offset="1" stop-color="${UPC()}" stop-opacity="0"/></linearGradient>
    <linearGradient id="agD" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${DNC()}" stop-opacity=".26"/><stop offset="1" stop-color="${DNC()}" stop-opacity="0"/></linearGradient>
    <clipPath id="clUp"><rect x="0" y="0" width="${W}" height="${Math.max(0,openY).toFixed(1)}"/></clipPath>
    <clipPath id="clDn"><rect x="0" y="${openY.toFixed(1)}" width="${W}" height="${Math.max(0,H-openY).toFixed(1)}"/></clipPath></defs>
    ${grid}
    <path d="${area}" fill="url(#agU)" clip-path="url(#clUp)" class="ch-area"/>
    <path d="${area}" fill="url(#agD)" clip-path="url(#clDn)" class="ch-area"/>
    <line x1="${padX}" y1="${openY.toFixed(1)}" x2="${(W-padR).toFixed(1)}" y2="${openY.toFixed(1)}" stroke="#7c849a" stroke-width="1" stroke-dasharray="4 4" opacity=".55" vector-effect="non-scaling-stroke"/>
    <path d="${line}" fill="none" stroke="${UPC()}" stroke-width="2.5" clip-path="url(#clUp)" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" class="ch-line"/>
    <path d="${line}" fill="none" stroke="${DNC()}" stroke-width="2.5" clip-path="url(#clDn)" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    ${alertOverlay(W,padX,padR,Y,lo,hi,step).svg}
    ${priceTag(W,padR,ey,col,fmtTick(v[n-1],step))}
    ${axisLabels(lbls,[+ey,alertOverlay(W,padX,padR,Y,lo,hi,step).y])}
    ${chartXAxis(points.map(p=>p.time), X, H, state.range)}
    <circle cx="${ex}" cy="${ey}" r="3.4" fill="${col}" vector-effect="non-scaling-stroke"/></svg>`;
  wrap.insertAdjacentHTML('beforeend','<div class="cross-x"></div><div class="cross-dot"></div><div class="cross-tip"></div>');
  const lp=wrap.querySelector('.ch-line'), L=lp.getTotalLength();
  lp.style.strokeDasharray=L; lp.style.strokeDashoffset=L; lp.getBoundingClientRect();
  lp.style.transition='stroke-dashoffset 1.05s cubic-bezier(.4,0,.2,1)'; lp.style.strokeDashoffset='0';
}

/* Changing timeframe used to swap one set of candles for a completely different set in a
   single frame. Instead every candle of the OUTGOING series is matched to a candle of the
   incoming one by position, and the two are interpolated — so 27 candles visibly reshape
   into the new 27 while the price scale slides underneath them. Re-bucketing per frame was
   deliberately NOT done: bucket boundaries shift as you interpolate and the motion reads
   as random. The DOM is built once and only attributes are written per frame; nothing is
   re-serialised, which is what keeps this affordable on a cheap Android.
   (Duplicate-`function` trap: this file is ONE script scope — `tween` here is the
   streak card's tween(ms, ease, onUpdate, delay, onDone).) */
function morphCandles(wrap, prev, to){
  const groups=[...wrap.querySelectorAll('.ck-body > g')];
  const n=to.cs.length, pcs=prev.cs||[], pn=pcs.length;
  if(!groups.length || !pn) return;
  const grid=[...wrap.querySelectorAll('.ch-grid[data-v]')];
  const glbl=[...wrap.querySelectorAll('.ch-gridlbl[data-v]')];
  const fade=[...wrap.querySelectorAll('.ch-xlbl,.ch-pt,.ck-alert')];
  // the price tag and alert sit at fixed prices; hide them until the scale has settled
  fade.forEach(e=>{ e.style.opacity=0; });
  const src=i=>pcs[pn===1?0:Math.round(i*(pn-1)/(n-1||1))];
  const plotH=to.H-to.padT-to.padB;
  groups.forEach(g=>g.style.animation='none');       // the entry fade would fight the morph
  tween(560,'io2',t=>{
    const lo=prev.lo+(to.lo-prev.lo)*t, sp=(prev.sp+(to.sp-prev.sp)*t)||1;
    const Y=v=>to.padT+(1-(v-lo)/sp)*plotH;
    grid.forEach(l=>{ const y=Y(+l.dataset.v).toFixed(1); l.setAttribute('y1',y); l.setAttribute('y2',y); });
    glbl.forEach(x=>x.setAttribute('y',(Y(+x.dataset.v)+4).toFixed(1)));
    for(let i=0;i<n;i++){
      const a=src(i), b=to.cs[i], m=k=>a[k]+(b[k]-a[k])*t;
      const yh=Y(m('h')), yl=Y(m('l')), yo=Y(m('o')), yc=Y(m('c'));
      const top=Math.min(yo,yc), h=Math.max(2,Math.abs(yc-yo));
      const kids=groups[i].children;
      kids[0].setAttribute('y1',yh.toFixed(1)); kids[0].setAttribute('y2',yl.toFixed(1));
      kids[1].setAttribute('y',top.toFixed(1));  kids[1].setAttribute('height',h.toFixed(1));
      kids[2].setAttribute('y',(top+0.6).toFixed(1));
      kids[2].setAttribute('height',Math.min(2,h/3).toFixed(1));
    }
  },0,()=>{ fade.forEach(e=>{ e.style.transition='opacity .22s'; e.style.opacity=''; }); });
}

/* ---- candlestick chart: REAL OHLC, rendered 1:1 (crisp), grid + last-price tag + scrub ---- */
const CANDLE_W=9;          // px per candle including its gap — constant across every timeframe
let ALL_CS=[];             // the full fetched series; the chart shows a window onto it
function drawCandles(candles,opts){
  const wrap=$('chart'); const prev=(opts&&opts.morph&&CHART&&CHART.mode==='candle')?CHART:null;
  if(!candles||!candles.length){ wrap.innerHTML=`<div class="ch-empty">${T('no_chart')||''}</div>`; CHART=null; return; }
  const {W,H,padX,padT,padB,padR,plotW}=chartGeom(wrap);
  /* A candle is the SAME WIDTH in every timeframe — it was plotW/n before, so 7 fat candles on
     the week view and 100 slivers on the year view. Fixed width means the viewport holds however
     many fit, and the rest are reached by dragging. */
  ALL_CS=candles;
  const per=Math.max(6,Math.min(plotW/8,CANDLE_W));   // px per candle incl. gap
  const slot=per, slotW=per;
  const fit=Math.max(6,Math.floor(plotW/per));
  const maxOff=Math.max(0,candles.length-fit);
  state.panOff=Math.max(0,Math.min(state.panOff||0,maxOff));
  const end=candles.length-state.panOff, cs=candles.slice(Math.max(0,end-fit),end);
  const lead=Math.max(0,fit-cs.length);              // empty slots, pushed to the left
  const xAt=i=>padX+(lead+i+0.5)*slotW;
  const dlo=Math.min(...cs.map(c=>c.l)), dhi=Math.max(...cs.map(c=>c.h));
  const {nlo,nhi,step}=niceAxis(dlo,dhi,4), lo=nlo, hi=nhi, sp=(hi-lo)||1, n=cs.length;
  const bw=Math.max(3,per*0.66);                      // fixed geometry, never derived from n
  const Y=x=>padT+(1-(x-lo)/sp)*(H-padT-padB);
  CHART={mode:'candle',cs,n,W,H,padX,padT,padB,slot,lead,lo,hi,sp,bw,xAt};
  let grid=''; const lbls=[];
  // data-v carries each gridline's PRICE so a scale change can be animated, not just redrawn
  for(let val=nlo; val<=nhi+step*1e-3; val+=step){ const y=+Y(val).toFixed(1);
    grid+=`<line class="ch-grid" data-v="${val}" x1="${padX}" y1="${y}" x2="${(W-padR).toFixed(1)}" y2="${y}" stroke-width="1"/>`;
    lbls.push({x:W-4,y,txt:fmtTick(val,step),v:val}); }
  /* Bodies get a vertical gradient, a highlight along the top edge and a soft shadow, so a
     candle reads as an object rather than a flat rectangle. */
  let body='';
  const anim=state._panning?'':' class="candle"';
  cs.forEach((c,i)=>{ const xc=xAt(i), up=c.c>=c.o, col=up?UPC():DNC();
    const yh=Y(c.h).toFixed(1), yl=Y(c.l).toFixed(1), yo=Y(c.o), yc=Y(c.c);
    const top=Math.min(yo,yc), h=Math.max(2,Math.abs(yc-yo)), x=(xc-bw/2);
    body+=`<g${anim} style="animation-delay:${(i*0.011).toFixed(3)}s">`
        + `<line x1="${xc.toFixed(1)}" y1="${yh}" x2="${xc.toFixed(1)}" y2="${yl}" stroke="${col}" stroke-width="1.6" vector-effect="non-scaling-stroke"/>`
        + `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="1.4" fill="url(#ck${up?'U':'D'})" filter="url(#ckS)"/>`
        + `<rect x="${(x+0.6).toFixed(1)}" y="${(top+0.6).toFixed(1)}" width="${Math.max(0,bw-1.2).toFixed(1)}" height="${Math.min(2,h/3).toFixed(1)}" rx=".8" fill="#fff" opacity=".28"/></g>`; });
  const last=cs[cs.length-1], lcol=last.c>=last.o?UPC():DNC();
  const ptY=+Y(last.c).toFixed(1), al=alertOverlay(W,padX,padR,Y,lo,hi,step);
  wrap.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:100%;overflow:visible">`
    +CK_DEFS
    +`<clipPath id="ckPlot"><rect x="${padX}" y="0" width="${plotW.toFixed(1)}" height="${H}"/></clipPath>`
    +`${grid}<g class="ck-body" clip-path="url(#ckPlot)">${body}</g>`
    +`${al.svg}${priceTag(W,padR,ptY,lcol,fmtTick(last.c,step))}`
    +`${axisLabels(lbls,[ptY,al.y])}${chartXAxis(cs.map(c=>c.time),xAt,H,state.range)}</svg>`;
  wrap.insertAdjacentHTML('beforeend','<div class="cross-x"></div><div class="cross-tip"></div>');
  if(prev) morphCandles(wrap,prev,{cs,lo,hi,sp,padT,padB,H,bw,xAt});
}
const ICON_LINE=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16l5-6 4 4 4-6 5 5"/></svg>`;
const ICON_CANDLE=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M7 3v4M7 15v6M17 3v6M17 17v4"/><rect x="4.5" y="7" width="5" height="8" rx="1"/><rect x="14.5" y="9" width="5" height="8" rx="1"/></svg>`;
function renderChartTog(){ const tg=$('chartTog'); if(!tg)return;
  tg.innerHTML=`<div class="ctg">
    <button data-ct="line" class="${state.chartType!=='candle'?'on':''}" aria-label="line">${ICON_LINE}</button>
    <button data-ct="candle" class="${state.chartType==='candle'?'on':''}" aria-label="candlestick">${ICON_CANDLE}</button></div>`;
  tg.querySelectorAll('button').forEach(b=>b.onclick=()=>{ const t=b.dataset.ct; if(t===state.chartType)return;
    state.chartType=t; haptic(); try{localStorage.setItem('chartType',t);}catch(e){} renderChartTog(); loadHistory(); }); }

/* ---- chart scrub: drag to reveal value/date at any point ---- */
let CHART=null;
function fmtChartDate(t){ const d=new Date(t*1000);
  try{ return state.range===0
    ? d.toLocaleTimeString('en-GB',{timeZone:'Asia/Baghdad',hour:'2-digit',minute:'2-digit'})
    : d.toLocaleDateString(state.lang==='ar'?'ar-IQ':'en-GB',{day:'2-digit',month:'short',timeZone:'Asia/Baghdad'}); }
  catch(e){ return ''; } }
function chartScrub(e){ if(!CHART||CHART.n<1)return; const wrap=$('chart'),rect=wrap.getBoundingClientRect();
  const cx=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
  if(CHART.mode==='candle'){
    let idx=Math.floor((cx/rect.width*CHART.W-CHART.padX)/CHART.slot)-(CHART.lead||0);
    idx=Math.max(0,Math.min(CHART.n-1,idx)); const c=CHART.cs[idx];
    const xpx=(CHART.padX+((CHART.lead||0)+idx+0.5)*CHART.slot)/CHART.W*rect.width;
    const line=wrap.querySelector('.cross-x'),tip=wrap.querySelector('.cross-tip'),dot=wrap.querySelector('.cross-dot');
    if(line){ line.style.left=xpx+'px'; line.style.opacity=1; } if(dot) dot.style.opacity=0;
    if(tip){ const up=c.c>=c.o, col=up?UPC():DNC();
      tip.innerHTML=`<b style="color:${col}">${fmt(c.c)}</b><span>O ${fmtCompact(c.o)} · H ${fmtCompact(c.h)} · L ${fmtCompact(c.l)}</span><span>${fmtChartDate(c.time)}</span>`;
      tip.style.opacity=1; const tw=tip.offsetWidth||90; tip.style.left=Math.max(0,Math.min(rect.width-tw,xpx-tw/2))+'px'; }
    return;
  }
  if(CHART.n<2)return;
  const vbx=cx/rect.width*CHART.W;
  let idx=Math.round((vbx-CHART.padX)/CHART.plotW*(CHART.n-1));
  idx=Math.max(0,Math.min(CHART.n-1,idx)); const p=CHART.pts[idx];
  const xvb=CHART.padX+(idx/(CHART.n-1))*CHART.plotW;
  const yvb=CHART.padT+(1-(p.value-CHART.lo)/CHART.sp)*(CHART.H-CHART.padT-CHART.padB);
  const xpx=xvb/CHART.W*rect.width, ypx=yvb/CHART.H*rect.height;
  const line=wrap.querySelector('.cross-x'),dot=wrap.querySelector('.cross-dot'),tip=wrap.querySelector('.cross-tip');
  if(line){ line.style.left=xpx+'px'; line.style.opacity=1; }
  if(dot){ dot.style.left=xpx+'px'; dot.style.top=ypx+'px'; dot.style.opacity=1; }
  if(tip){ tip.innerHTML=`<b>${fmt(p.value)}</b><span>${fmtChartDate(p.time)}</span>`; tip.style.opacity=1;
    const tw=tip.offsetWidth||60; tip.style.left=Math.max(0,Math.min(rect.width-tw,xpx-tw/2))+'px'; }
}
function chartScrubEnd(){ const wrap=$('chart'); wrap.querySelectorAll('.cross-x,.cross-dot,.cross-tip').forEach(el=>el.style.opacity=0); }
(function(){ const ch=$('chart');
  /* DRAG PANS, HOLD SCRUBS — the convention every serious chart app uses. Both gestures used to
     be a plain drag, so panning through history and reading a point could not coexist. A press
     that stays put for 260ms becomes the crosshair; a press that moves horizontally first pans.

     Three things make the drag feel native rather than steppy:
      · POINTER CAPTURE. The chart is only 150px tall, so a horizontal swipe leaves it almost
        immediately and every later move event was being delivered somewhere else — the pan
        died mid-gesture. Capture keeps the whole swipe.
      · The data window still steps one whole candle at a time, but the candle group is
        translated by the leftover pixels each move, so the candles track the finger 1:1
        instead of jumping every 9px.
      · A flick carries on with decaying momentum and settles on a whole candle. */
  let _pdX=0,_pdOff=0,_pMode='',_pHold=null,_pId=null,_vx=0,_lastX=0,_lastT=0,_glide=0;
  const perPx=()=>{ const w=$('chart'); return w?Math.max(6,Math.min(chartGeom(w).plotW/8,CANDLE_W)):CANDLE_W; };
  const shift=dx=>{ const g=ch.querySelector('.ck-body');
    if(g) g.setAttribute('transform',dx?`translate(${dx.toFixed(2)},0)`:''); };
  function panTo(off,dx){
    const next=Math.round(off);
    if(next!==state.panOff){ state.panOff=next; state._panning=1; redrawChart(); state._panning=0; }
    shift(dx);
  }
  const endGesture=()=>{ clearTimeout(_pHold); if(_pMode==='scrub') chartScrubEnd();
    if(_pMode!=='pan') shift(0); _pMode=''; };
  ch.addEventListener('pointerdown',e=>{
    _glide=0;                                        // a new touch stops any momentum
    _pdX=_lastX=e.clientX; _lastT=performance.now(); _vx=0;
    _pdOff=state.panOff||0; _pMode=''; _pId=e.pointerId;
    try{ ch.setPointerCapture(e.pointerId); }catch(_){}
    clearTimeout(_pHold);
    _pHold=setTimeout(()=>{ if(!_pMode){ _pMode='scrub'; chartScrub(e); } },260);
  });
  ch.addEventListener('pointermove',e=>{
    if(_pId!=null && e.pointerId!==_pId) return;
    const held=e.pressure>0||e.buttons||e.pointerType==='touch';
    if(!held) return;
    if(!_pMode && Math.abs(e.clientX-_pdX)>6){ _pMode='pan'; clearTimeout(_pHold); }
    if(_pMode==='pan'){
      e.preventDefault();
      const now=performance.now(), dt=now-_lastT;
      if(dt>0){ _vx=0.75*_vx+0.25*((e.clientX-_lastX)/dt); }   // px per ms, smoothed
      _lastX=e.clientX; _lastT=now;
      const per=perPx(), raw=_pdOff+(e.clientX-_pdX)/per;      // drag RIGHT ⇒ back in time
      panTo(raw,(raw-Math.round(raw))*per);
    } else if(_pMode==='scrub'){ chartScrub(e); }
  });
  const release=e=>{
    if(_pId!=null && e && e.pointerId!==_pId) return;
    try{ if(e) ch.releasePointerCapture(e.pointerId); }catch(_){}
    _pId=null;
    if(_pMode==='pan'){
      const per=perPx();
      let v=_vx/per;                                  // candles per ms
      _pMode='';
      if(Math.abs(v)>0.004){                          // a flick: glide, then settle
        const id=++_glide; let off=state.panOff||0, last=performance.now();
        (function step(now){
          if(id!==_glide) return;
          const dt=Math.min(48,now-last); last=now;
          off+=v*dt; v*=Math.pow(0.995,dt);
          panTo(off,0);
          // drawCandles clamps at the ends; resync so the glide stops dead there
          if(Math.round(off)!==state.panOff){ off=state.panOff; v=0; }
          if(Math.abs(v)>0.0004) requestAnimationFrame(step); else shift(0);
        })(performance.now());
      } else shift(0);
      return;
    }
    endGesture();
  };
  ch.addEventListener('pointerup',release);
  ch.addEventListener('pointercancel',release);
})();

/* ---- data ---- */
// Instant-cache paint: render the LAST-KNOWN board from localStorage immediately on
// open (real numbers, not skeletons) — then loadAll refreshes in the background. This
// is what makes repeat opens feel instant (the shwe-style "offline data" trick).
function paintCachedBoard(){ try{ const b=JSON.parse(localStorage.getItem('board_cache'));
  if(b&&b.rows&&b.rows.length){ state.board=b.rows; state.marketOpen=b.market_open; state.marketHours=b.market_hours;
    state.updated=b.rows.reduce((m,r)=>r.observed_at>m?r.observed_at:m,'');
    renderStatus(); renderTape(); renderHero(); renderAssets(); renderConv(); return true; } }catch(e){} return false; }
async function loadAll(){
  renderNewsCats();                       // chips render instantly (not gated on news)
  // Everything below is independent of the board, so it goes out FIRST. It used to wait for
  // the board round-trip to finish, which pushed the whole second wave ~0.5s later.
  loadSentiment();                        // engagement layer (independent, non-blocking)
  loadAlerts();                           // keeps the bell badge fresh on the home screen
  loadPressure();                         // the wedge: Dinar Pressure Index (official vs parallel)
  loadMarkets().then(()=>{ renderAssets(); if(isGlobal(state.asset)) renderHero(); });  // watchlist prices (crypto)
  try{
    const pre=window.__pre&&window.__pre.board; if(window.__pre) window.__pre.board=null;
    let b=pre?await pre:null;             // the early fetch from <head>, first open only
    if(!b) b=await fetch('/api/board').then(r=>r.json());
    state.board=b.rows; state.marketOpen=b.market_open; state.marketHours=b.market_hours;
    state.updated=b.rows.reduce((m,r)=>r.observed_at>m?r.observed_at:m,'');
    try{ localStorage.setItem('board_cache', JSON.stringify(b)); }catch(e){}   // for next open's instant paint
    renderStatus(); renderTape(); renderHero(); renderAssets(); renderConv();
    renderSince();                        // "since you last checked" (once, after board)
  }catch(e){}
  if(state._newsLoaded) loadNews();       // news loads lazily on first News-tab view (not boot)
}
// Dinar Pressure Index (the wedge) — PARKED for now per user (not deployed yet). Flip to
// true to switch it on; the backend keeps quietly building pressure_history in the meantime,
// so the chart is already populated when it goes live.
const WEDGE_ENABLED = false;
async function loadPressure(){
  if(!WEDGE_ENABLED){ var pe=$('press'); if(pe) pe.style.display='none'; return; }
  try{ const p=await fetch('/api/pressure?days=30').then(r=>r.json()); renderPressure(p); }catch(e){}
}
function renderPressure(p){
  const el=$('press'), cur=p&&p.current;
  if(!cur){ el.style.display='none'; return; }
  el.style.display='';
  const lvl=cur.level||'moderate';
  const lc={low:'var(--up)',moderate:'var(--gold)',elevated:'#ffb24a',high:'var(--down)'}[lvl];
  $('pressIdx').textContent=cur.index; $('pressIdx').style.color=lc;
  const le=$('pressLvl'); le.className='press-lvl '+lvl; le.textContent=T('press_'+lvl);
  $('pressOff').textContent=fmt(cur.official);
  $('pressPar').textContent=fmt(cur.parallel);
  $('pressGap').textContent='+'+cur.spread_pct+'% · '+fmt(cur.spread_iqd);
  $('pressDot').style.left=Math.max(2,Math.min(98,cur.index))+'%';
  const h=(p.history||[]).slice(-30), sp=$('pressSpark');
  if(h.length<3){ sp.style.display='none'; }   // hide the lonely-bar look until history builds
  else{ sp.style.display='flex';
    sp.innerHTML=h.map(x=>`<i style="height:${Math.max(2,(x.idx||0)/100*26).toFixed(0)}px"></i>`).join(''); }
}
async function loadHistory(){
  const glob=isGlobal(state.asset), a=ASSETS[state.asset];
  const city=(!glob && a && a.hasCity)?state.city:'';
  const intr=state.range===0?'&intraday=1':'';
  /* The button IS the candle: pick «week» and every candle covers a week, «month» a month,
     «year» a year. The screen holds ~27 of them and a swipe walks further back at that same
     candle size. Bucketing happens on the SERVER, so a decade of history arrives as ~120
     monthly candles instead of 3,114 daily rows — that payload is also why the chart used
     to be slow to appear.
     15-minute candles were tried and dropped: 98% of them held a single quote, so they
     rendered as flat dojis. An hour is the finest grain this data actually fills. */
  const TF={ 0   :{days:7,    bucket:'hour',  group:0},        // 1 candle = 1 hour
             7   :{days:1460, bucket:'week',  group:0},        // 1 candle = 1 week
             30  :{days:4200, bucket:'month', group:0},        // 1 candle = 1 month
             365 :{days:4200, bucket:'year',  group:0},        // 1 candle = 1 year
             4200:{days:4200, bucket:'month', group:'fit'} };  // everything, on one screen
  const tf=TF[state.range]||TF[30];
  try{
    const long=state.range>=1000;   // multi-year → aggregate to monthly
    if(state.chartType==='candle'){
      const q=glob?`asset=${state.asset}`:`asset=${state.asset}&city=${city}`;
      const j=await fetch(`/api/ohlc?${q}&days=${tf.days}&bucket=${tf.bucket}`).then(r=>r.json());
      let cs=j.candles||[];
      if(tf.group==='fit') cs=compressToFit(cs);
      else if(tf.group) cs=groupCandles(cs,c=>Math.floor(c.time/tf.group));
      ALL_CS=cs; state.panOff=0;                     // new range → back to the newest candles
      drawCandles(cs,{morph:true}); return;
    }
    if(glob){            // crypto line: derive from OHLC closes (no /history for global assets)
      const j=await fetch(`/api/ohlc?asset=${state.asset}&days=${state.range}${intr}`).then(r=>r.json());
      let pts=(j.candles||[]).map(c=>({time:c.time,value:c.c}));
      if(long) pts=bucketMonthly(pts);
      drawChart(pts); return;
    }
    const url = state.range===0
      ? `/api/intraday?asset=${state.asset}&city=${city}`
      : `/api/history?asset=${state.asset}&city=${city}&days=${state.range}`;
    const j=await fetch(url).then(r=>r.json());
    let pts=j.points||[]; if(long) pts=bucketMonthly(pts);
    drawChart(pts);
  }catch(e){}
}

/* ---- renders ---- */
function renderStatus(){ const s=$('status');
  if(state.marketOpen){s.className='status open';$('statusTxt').textContent=T('status_open');}
  else{s.className='status closed';$('statusTxt').textContent=T('status_closed');} }
// ONE representative dinar value per asset — no city breakdown (user: against the dinar,
// don't mention cities). Uses the selected city's rate, else the first city that has one.
function repRate(code,a){ if(!a.hasCity) return current(code,null);
  return current(code,state.city) || Object.keys(CITIES).map(c=>current(code,c)).find(Boolean) || null; }
/* ---- ticker marquee: JS-driven so a finger can pause + scrub it, then it resumes
   leftward (the original direction) from wherever it was released. ---- */
let _tkPos=0,_tkHalf=0,_tkSpeed=0,_tkDrag=false,_tkSX=0,_tkSP=0,_tkLast=null;
const _TK_DUR=26000;   // ms to travel one full copy of the strip (slowed a notch from 20s)
function measureTicker(){ const t=$('tape'); _tkHalf=t?t.scrollWidth/2:0; _tkSpeed=_tkHalf>0?_tkHalf/_TK_DUR:0; }
function _tkFrame(ts){ const t=$('tape');
  if(t){ if(_tkLast==null)_tkLast=ts; const dt=Math.min(ts-_tkLast,64); _tkLast=ts;
    if(!_tkDrag && _tkSpeed>0) _tkPos-=_tkSpeed*dt;                 // drift left when free
    if(_tkHalf>0){ while(_tkPos<=-_tkHalf)_tkPos+=_tkHalf; while(_tkPos>0)_tkPos-=_tkHalf; }  // seamless wrap (strip is doubled)
    t.style.transform='translateX('+_tkPos+'px)'; }
  requestAnimationFrame(_tkFrame); }
function initTicker(){ const tp=document.querySelector('.tape'); if(!tp||tp._tkInit)return; tp._tkInit=1;
  tp.addEventListener('pointerdown',e=>{ _tkDrag=true; _tkSX=e.clientX; _tkSP=_tkPos; tp.classList.add('grabbing'); try{tp.setPointerCapture(e.pointerId);}catch(_){} });
  tp.addEventListener('pointermove',e=>{ if(_tkDrag)_tkPos=_tkSP+(e.clientX-_tkSX); });   // scrub either way while held
  const end=()=>{ _tkDrag=false; tp.classList.remove('grabbing'); };   // release → resume original (leftward) drift from here
  tp.addEventListener('pointerup',end); tp.addEventListener('pointercancel',end);
  // measuring reads scrollWidth = a forced layout of the whole page; do it after the first paint
  const go=()=>{ measureTicker(); requestAnimationFrame(_tkFrame);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measureTicker); };   // re-measure once webfonts settle
  requestAnimationFrame(()=>setTimeout(go,0)); }
function renderTape(){ const it=[];
  for(const [code,a] of Object.entries(ASSETS)){ const r=repRate(code,a); if(!r)continue;
    const up=r.delta>0,dn=r.delta<0, cur=a.usd?'$':'د.ع';
    // IQD value group, then = , then the foreign currency BY NAME in the user's language (not the
    // symbol — many users don't read $/€/₺). The د.ع label sits BEFORE the amount. unitName gives
    // "١٠٠ دۆلار" / "ملیۆن تمەن" / "زێڕی ٢٤" etc → "د.ع 155,850 = ١٠٠ دۆلار".
    const unit=unitName(a);
    it.push(`<span class="ti"><span class="tv"><span class="tcur">${cur}</span><span>${fmt(r.value)}</span></span><span class="teq">=</span><span class="tu">${esc(unit)}</span><span class="ta${up||dn?' ap':''}" style="color:${up?'var(--up)':dn?'var(--down)':'var(--dim)'}">${up?'▲':dn?'▼':'·'}</span><span class="dot"></span></span>`);}
  $('tape').innerHTML=it.join('')+it.join(''); _tkMeasureSoon(); }
// scrollWidth forces a layout; measure once after the frame that paints the new strip, not mid-render
let _tkMq=0;
function _tkMeasureSoon(){ if(_tkMq) return; _tkMq=1; requestAnimationFrame(()=>setTimeout(()=>{ _tkMq=0; measureTicker(); },0)); }
function renderHeroGlobal(){ const m=state.mkByKey[state.asset]; if(!m)return; setArt('heroArt',ART[state.asset]?state.asset:null,1);
  $('heroName').textContent=m.name[state.lang]||m.name.en; $('heroCity').textContent=T('global_24h');
  const hu=$('heroUnit');
  if(m.logo){ hu.classList.add('logo'); hu.innerHTML=`<img class="unit-logo" src="${esc(m.logo)}" alt="${esc(m.symbol)}" onerror="this.parentNode.classList.remove('logo');this.parentNode.textContent='${esc(m.symbol)}'">`; }
  else { hu.classList.remove('logo'); hu.textContent=m.symbol; }
  $('heroName').style.fontFamily=(m.cat==='crypto'?'var(--eng)':'');   // Latin font only for English crypto names
  const ne=$('heroVal'), s=fmtUsd(m.price); ne.style.fontFamily='';     // prices in the standard number font (Rajdhani)
  const dir=(ne._odoKey==='G:'+state.asset && ne._odoStr!==undefined && ne._odoStr!==s)?(m.change>0?'up':m.change<0?'down':null):null;
  ne._odoKey='G:'+state.asset; setOdometer(ne,s,dir);
  $('heroQuote').innerHTML=`<b>${T('dollar')}</b>`;   // just the currency, in gold
  const chip=$('heroChip');
  if(m.change!=null){const up=m.change>0,dn=m.change<0;chip.className='chip '+(up?'up':dn?'down':'flat');chip.innerHTML=`<span class="ap">${up?'▲':dn?'▼':'·'}</span> ${Math.abs(m.change).toFixed(2)}%`;}
  else{chip.className='chip flat';chip.textContent='—';} }
function renderHero(){ if(isGlobal(state.asset)) return renderHeroGlobal();
  const a=ASSETS[state.asset], r=current(state.asset,state.city);
  $('heroName').style.fontFamily=''; $('heroVal').style.fontFamily='';   // back to Kurdish/Rajdhani for local
  $('heroName').textContent=aFull(a); setArt('heroArt',state.asset,1); $('heroCity').textContent=a.hasCity?cityName(state.city):T('all_market');
  $('heroUnit').classList.remove('logo'); $('heroUnit').textContent=a.unit;
  if(r){ const ne=$('heroVal'), key=state.asset+'|'+(a.hasCity?state.city:''), s=fmt(r.value);
    const dir=(ne._odoKey===key && ne._odoStr!==undefined && ne._odoStr!==s)?(r.delta>0?'up':r.delta<0?'down':null):null;
    ne._odoKey=key; setOdometer(ne,s,dir);
    $('heroQuote').innerHTML=`<b>${a.usd?T('dollar'):T('dinar')}</b>`; }   // just the currency, in gold
  else $('heroQuote').textContent='';
  const chip=$('heroChip');
  if(r&&r.delta){const up=r.delta>0;chip.className='chip '+(up?'up':'down');chip.innerHTML=`<span class="ap">${up?'▲':'▼'}</span> ${up?'+':'−'}${fmt(Math.abs(r.delta))}`;}
  else{chip.className='chip flat';chip.textContent='—';}
  if(r){const lo=r.low,hi=r.high,pos=(hi>lo)?Math.max(2,Math.min(98,(r.value-lo)/(hi-lo)*100)):50;
    $('hrFill').style.width=pos+'%';$('hrDot').style.left=pos+'%';$('hrLo').textContent=fmt(lo);$('hrHi').textContent=fmt(hi);} }
function watchInfo(k){
  if(ASSETS[k]){ const a=ASSETS[k], r=current(k,a.hasCity?state.city:null);
    return r?{name:unitName(a), val:fmt(r.value), pct:pctOf(r), up:r.delta>0, dn:r.delta<0}:null; }
  const m=state.mkByKey[k]; if(!m)return null;
  return {name:(m.name[state.lang]||m.name.en), val:fmtUsd(m.price), pct:m.change, up:m.change>0, dn:m.change<0, eng:m.cat==='crypto'}; }
function renderAssets(){   // the home strip is now the user's WATCHLIST
  const chips=state.watch.map(k=>{ const w=watchInfo(k); if(!w)return '';
    const sel=k===state.asset, pt=w.pct==null?'—':`<span class="ap">${w.up?'▲':w.dn?'▼':''}</span> ${Math.abs(w.pct).toFixed(2)}%`;
    return `<div class="achip ${sel?'on':''} ${w.up?'u':w.dn?'d':''}" data-a="${esc(k)}">${artImg(k,'ac-art')}<div class="ac-name${w.eng?' eng':''}">${esc(w.name)}</div><div class="ac-val${w.eng?' eng':''}">${w.val}</div><div class="ac-d ${w.up?'up':w.dn?'down':'flat'}">${pt}</div></div>`;
  }).join('');
  $('aswipe').innerHTML=chips+`<div class="achip add" data-add="1"><span class="plus">＋</span><span class="allbl">${T('watch_add')}</span></div>`;
  $('aswipe').querySelectorAll('.achip').forEach(c=>c.onclick=()=>{ if(c.dataset.add){openMarkets();return;} state.asset=c.dataset.a;trackAsset(c.dataset.a);haptic();selectionChanged(); }); }
function newsAgo(m){return m<60?T('ago_min').replace('{n}',m):T('ago_hour').replace('{n}',Math.round(m/60));}
// Absolute timestamp (Baghdad tz) shown alongside the relative "x ago" — user wants every
// item time-stamped exactly so pieces can be related in time. e.g. "28 Jun · 14:32".
function newsStamp(n){ const iso=n.published_at; if(!iso) return '';
  try{ const d=new Date(iso); if(isNaN(d.getTime())) return '';
    return d.toLocaleString(state.lang==='ar'?'ar-IQ':'en-GB',
      {timeZone:'Asia/Baghdad',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:false})
      .replace(',',' ·'); }catch(e){ return ''; } }
function metaTime(n){ const s=newsStamp(n);
  return `<span>${newsAgo(n.mins_ago)}</span>`+(s?`<span class="d"></span><span class="nm-ts">${s}</span>`:''); }
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
// A url() value is only safe if it has no CSS-breaking chars (quotes/parens/space/backslash/
// angle brackets). Covers image URLs already stored before the backend guard was added.
function safeImg(u){ u=String(u||''); return (/^https?:\/\//.test(u) && !/['"()\\<>\s]/.test(u)) ? u : ''; }
function openNews(el){const u=el.getAttribute('data-link');if(!u)return;try{if(window.Telegram&&Telegram.WebApp&&Telegram.WebApp.openLink)Telegram.WebApp.openLink(u);else window.open(u,'_blank');}catch(e){}}
function renderNewsCats(){ $('ncats').innerHTML=CATS.map(c=>`<button class="nchip ${c.key===state.newsCat?'on':''}" data-k="${c.key}">${svgIcon(c.ic)}<span>${state.lang==='ar'?c.ar:c.ku}</span></button>`).join('');
  $('ncats').querySelectorAll('.nchip').forEach(b=>b.onclick=()=>{state.newsCat=b.dataset.k;track('news_cat:'+b.dataset.k);haptic();renderNewsCats();loadNews();}); }
/* salary (مووچە) tracker board — Federal vs KRG status derived from the news */
const SAL_ICON={distributing:'✓',sent:'✓',released:'✓',delayed:'⚠',pending:'⏳'};
function salBadge(status){ status=status||'pending'; const cls={distributing:'good',sent:'good',released:'good',delayed:'bad',pending:'wait'}[status]||'wait';
  return `<span class="sal-badge ${cls}">${SAL_ICON[status]||'⏳'} ${T('sal_'+status)}</span>`; }
function salHeadline(r){ const h = state.lang==='ar' ? (r.title_ar||r.title) : (r.title_ku||r.title); return h||null; }
function salCard(region,r){ r=r||{status:'pending'};
  const h=salHeadline(r); const news=h?`<div class="sal-news">${esc(h)}</div>`:`<div class="sal-news" style="color:var(--dim)">—</div>`;
  const meta=r.source?`<div class="sal-meta">${esc(r.source)}</div>`:'';
  return `<div class="sal-card" data-url="${r.url?esc(r.url):''}"><div class="sal-region"><span>${T('sal_'+region)}</span>${salBadge(r.status)}</div>${news}${meta}</div>`; }
// The KRG two-step pipeline — Baghdad sends the money → KRG distributes it. Each window changes
// LABEL + turns green with a tick as the real, officially-confirmed status advances. One glance
// tells a Kurdistan employee exactly where their pay is. The arrow always points step1 → step2.
function salPipe(kri){ const st=(kri&&kri.status)||'pending';
  const sentDone = st==='sent'||st==='distributing';     // Baghdad confirmed-sent (official only)
  const paidDone = st==='distributing';                  // KRG actually distributing
  const s1cls = sentDone?'done':'wait';
  const s2cls = paidDone?'done':(sentDone?'active':'wait');
  const dot=s=>s==='done'?'✓':s==='active'?'●':'○';
  const lbl1 = sentDone ? T('sp_sent_done') : T('sp_sent_wait');
  const lbl2 = paidDone ? T('sp_paid_done') : T('sp_paid_wait');
  // both ku+ar are RTL, so step2 sits on the LEFT → the flow arrow points left (←) toward it
  return `<div class="sal-pipe"><div class="sp-step ${s1cls}"><span class="sp-dot">${dot(s1cls)}</span>${lbl1}</div>`
    +`<div class="sp-arrow ${sentDone?'lit':''}">←</div>`
    +`<div class="sp-step ${s2cls}"><span class="sp-dot">${dot(s2cls)}</span>${lbl2}</div></div>`; }
const HOURGLASS = `<svg class="hg" viewBox="0 0 26 32" aria-hidden="true">`
  + `<defs><clipPath id="hgGlass"><path d="M6 5 H20 L13 16 Z M6 27 H20 L13 16 Z"/></clipPath></defs>`
  + `<g clip-path="url(#hgGlass)" fill="#e7bd63">`
  + `<rect class="hg-top" x="6" y="5" width="14" height="11"/>`
  + `<rect class="hg-bot" x="6" y="16" width="14" height="11"/>`
  + `<rect class="hg-stream" x="12.3" y="15" width="1.4" height="4"/></g>`
  + `<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">`
  + `<path d="M5 5 H21"/><path d="M5 27 H21"/><path d="M6 5 L13 16 L6 27"/><path d="M20 5 L13 16 L20 27"/></g></svg>`;
function salVerdict(kri){ const st=(kri&&kri.status)||'pending';
  const tone={distributing:'good',sent:'good',delayed:'bad',pending:'wait'}[st]||'wait';
  const icHtml = tone==='wait' ? HOURGLASS : `<span class="sv-emoji">${ {good:'💰',bad:'⚠️'}[tone] }</span>`;
  const sub = (st==='distributing'||st==='sent'||st==='delayed') ? T('sv_sub_good') : T('sv_sub_wait');
  return `<div class="sal-verdict v-${tone}"><div class="sv-ic ${tone==='wait'?'sand':''}">${icHtml}</div><div class="sv-tx"><div class="sv-msg">${T('sv_'+st)}</div><div class="sv-sub">${sub}</div></div></div>`; }
async function loadSalary(){ try{ const s=await fetch('/api/salary?lang='+state.lang).then(r=>r.json()); const b=s.salary||{};
  const kri=b.kri||{status:'pending'};
  $('salaryBoard').innerHTML=`<div class="sal-head">${T('sal_title')}</div>` + salVerdict(kri) + salPipe(kri) + mcTeaser();
  const t=$('mcTeaser'); if(t) t.onclick=openMucha;
}catch(e){} }

/* ---- مووچە lost-salary calculator ----
   VERIFIED month ledger Jan2015→Dec2025 (archive research 2026-07-27, full sourcing in
   research/mucha_ledger_research.md). Reconciles EXACTLY to The National Context anchors:
   70 full / 44 partial / 18 unpaid. c: 0=full · fraction=cut share · 1=never paid ·
   'b1'=پاشەکەوت Decree 64 era (2016-02→2018-02, official 15-75%, quarter-salary practice;
   bracket fn is a labeled approximation) · 'b2'=revised era (2018-03→2019-02: <400k exempt,
   800-900k→18%, top→30% — Shafaq 2018-03-28). Never repaid (acknowledged as debt, 2019).
   2014 excluded: delayed but no verified permanent loss. */
const MC_LEDGER=[];
(function(){ const p=(y,m,c)=>MC_LEDGER.push({y,m,c});
  for(let m=1;m<=8;m++) p(2015,m,0);  for(let m=9;m<=12;m++) p(2015,m,1);   // Sep-Dec never paid (NC/ICSSI)
  for(let m=1;m<=12;m++) p(2016,m,'b1');                                    // Decree 64, all partial
  for(let m=1;m<=11;m++) p(2017,m,'b1'); p(2017,12,1);                      // Dec 2017 never paid
  for(let m=1;m<=2;m++) p(2018,m,'b1'); for(let m=3;m<=11;m++) p(2018,m,'b2'); p(2018,12,0);
  for(let m=1;m<=2;m++) p(2019,m,'b2'); for(let m=3;m<=12;m++) p(2019,m,0); // savings abolished Mar 2019
  for(let m=1;m<=3;m++) p(2020,m,0); for(let m=4;m<=8;m++) p(2020,m,1);
  p(2020,9,0.21); p(2020,10,0.21); p(2020,11,1); p(2020,12,1);              // COVID: 7 zero + 21% cuts
  for(let m=1;m<=6;m++) p(2021,m,0.21); for(let m=7;m<=12;m++) p(2021,m,0); // cut ended Jul 2021 (Rudaw)
  for(let m=1;m<=12;m++) p(2022,m,0);                                       // full year, delays only
  for(let m=1;m<=9;m++) p(2023,m,0); for(let m=10;m<=12;m++) p(2023,m,1);   // Oct-Dec never paid (MoF)
  for(let m=1;m<=11;m++) p(2024,m,0); p(2024,12,1);                         // Dec never paid
  for(let m=1;m<=10;m++) p(2025,m,0); p(2025,11,1); p(2025,12,1);           // Nov-Dec unpaid (Rudaw 2026-01)
})();
const MC_ERAS=[{y0:2015,y1:2015,yr:'2015',k:'mc_era1'},{y0:2016,y1:2019,yr:'2016—19',k:'mc_era2'},
               {y0:2020,y1:2021,yr:'2020—21',k:'mc_era3'},{y0:2023,y1:2025,yr:'2023—25',k:'mc_era4'}];
// b1: Decree 64 official range 15-75% (approximation of unrecovered full schedule)
// b2: verified revision — <400k exempt, ≤900k → 18%, above → 30%
const mcCut=(r,S)=>{ if(r.c==='b1') return S>=1500000?0.75 : S>=900000?0.60 : S>=400000?0.40 : 0.25;
  if(r.c==='b2') return S<400000?0 : S<=900000?0.18 : 0.30; return r.c; };
function mcStats(rows,S){ let zero=0,part=0,loss=0;
  rows.forEach(r=>{ const c=mcCut(r,S); if(c===1)zero++; else if(c>0)part++; loss+=S*c; });
  return {zero,part,loss}; }

/* ── قەرزی خەڵک debt clock + calculator — KURDISH-ONLY feature ──
   ar users never see the card/teaser/sheet (renderDebtCard + mcTeaser + openMucha all gate on lang).
   Clock: documented base (Draw ≥23T end-2025 + Nov/Dec-2025 payroll ≈1.9T ⇒ 25.3T, anchored 2026-07-01)
   + accrual at payroll rate (945.8bn/mo ⇒ ≈359,647 د.ع/s): salaries are earned continuously and paid
   late, so the clock shows earned-but-unpaid. Step QX_BASE/QX_ANCHOR when Baghdad settles months. */
const QX_BASE=25300000000000, QX_ANCHOR=Date.UTC(2026,6,1), QX_RATE=359647, QX_TAIL=9;
const qxVal=()=>QX_BASE+(Date.now()-QX_ANCHOR)/1000*QX_RATE;
const qxUsdRate=()=>{ const u=current('USD100',state.city); return u?u.value/100:1558.5; };
function qxSetNum(el,s){ const h=s.slice(0,-QX_TAIL);
  if(el._h!==h){ el._h=h; el.innerHTML=h+'<span class="qx-tail">'+s.slice(-QX_TAIL)+'</span>'; }
  else{ const t=el.querySelector('.qx-tail'); if(t) t.textContent=s.slice(-QX_TAIL); } }
let _qxSec=0;
function qxUpdate(){
  const card=$('debtCard'), sheetOn=$('muchaSheet').classList.contains('on');
  const cardOn=card&&card.style.display!=='none';
  if(!cardOn&&!sheetOn) return;
  const v=Math.floor(qxVal()), s=fmt(v);
  if(cardOn) qxSetNum($('qxNum'),s);
  if(sheetOn){ const n=$('mc2Nat'); if(n) qxSetNum(n,s); }
  const sec=Math.floor(Date.now()/1000);
  if(sec!==_qxSec){ _qxSec=sec; const usd=(v/qxUsdRate()/1e9).toFixed(2);
    if(cardOn) $('qxUsd').textContent=usd;
    const su=$('mc2NatUsd'); if(su) su.textContent=usd; }
}
// rAF gives the smooth per-frame count; the 1s interval is the heartbeat that keeps the
// clock honest when the webview throttles rAF (background tabs, energy saver).
// ~15 updates/s is plenty for the rolling tail; each update re-lays out the card, so nothing runs
// while the card is off screen (and the mucha sheet is closed) or the app is in the background.
let _qxVis=!('IntersectionObserver' in window), _qxT=0;
if(!_qxVis){ const _qc=$('debtCard'); if(_qc) new IntersectionObserver(es=>{ _qxVis=es[es.length-1].isIntersecting; }).observe(_qc); }
const _qxLive=()=>_qxVis || $('muchaSheet').classList.contains('on');
(function qxLoop(ts){ if(ts-_qxT>=66 && _qxLive()){ _qxT=ts; qxUpdate(); } requestAnimationFrame(qxLoop); })(0);
setInterval(()=>{ if(_qxLive()) qxUpdate(); },1000);
function renderDebtCard(){ const el=$('debtCard'); if(el) el.style.display = state.lang==='ku' ? '' : 'none'; try{ renderEcon(); }catch(e){} }   // the هاوکێشەی دینار card follows lang/city too (its consts sit at file end: TDZ on the boot call)

const MC_ERA_TT={mc_era1:'بڕینی بودجە و جەنگی داعش',mc_era2:'سیستەمی پاشەکەوت',mc_era3:'کۆرۆنا و داڕمانی نەوت',mc_era4:'ململانێی بودجە لەگەڵ بەغدا'};
/* salary is per-SESSION only (sessionStorage): every fresh app open starts empty —
   the user types their own amount each time. The since-year stays remembered. */
function mcVals(){ let S=0,since=2015;
  try{ S=+sessionStorage.getItem('mc_sal')||0; since=+localStorage.getItem('mc_since')||2015; }catch(e){}
  return {S,since}; }
function renderMucha(){
  const {S,since}=mcVals();
  $('muchaBody').innerHTML=
    `<div class="mc2-natw"><div class="mc2-nat">`+
      `<span class="mc2-live"><i></i>LIVE</span>`+
      `<div class="mc2-k">کۆی قەرزی خەڵک لای حکومەت</div>`+
      `<div class="mc2-num" id="mc2Nat"></div>`+
      `<div class="mc2-denom">دیناری عێراقی</div>`+
      `<div class="mc2-row"><span class="lbl">بە دۆلاری ئەمریکی</span><span class="val"><small>ملیار دۆلار</small><b id="mc2NatUsd">—</b></span></div>`+
    `</div></div>`+
    `<div class="mc2-q">تۆ چەندت لای حکومەتە؟</div>`+
    `<div class="mc2-qs">مووچەی مانگانەت بنووسە — ئەو بڕەی هەموو مانگێک وەریدەگریت</div>`+
    `<div class="mc2-in"><label>مووچەی مانگانە · دینار</label><div class="row"><input id="mcSal" inputmode="numeric" autocomplete="off" placeholder="900,000" value="${S?S.toLocaleString('en-US'):''}"><span class="cur">د.ع</span></div></div>`+
    `<div class="mc2-yl">لە کەیەوە فەرمانبەریت؟ — ساڵی دامەزراندنت</div>`+
    `<div class="mc2-yrs" id="mcYrs">`+[[2015,'پێش 2015',1],[2016,'2016'],[2018,'2018'],[2020,'2020'],[2023,'2023']]
      .map(([v,l,k])=>`<span class="y${k?' k':''}${v===since?' on':''}" data-y="${v}">${l}</span>`).join('')+`</div>`+
    `<div class="mc2-res" id="mcRes"><div class="mc2-rb"><div class="mc2-rbi">`+
      `<div class="k">حکومەت ئەم بڕە قەرزاری تۆیە</div>`+
      `<div class="num" id="mcMy">0</div>`+
      `<div class="u">دیناری عێراقی · خەمڵاندن</div>`+
      `<div class="mc2-row"><span class="lbl">بە دۆلاری ئەمریکی · نرخی ئەمڕۆ</span><span class="val"><small>دۆلار</small><b id="mcMyUsd">0</b></span></div>`+
      `<div class="mc2-facts">`+
        `<div class="f"><b id="mcZ">0</b><span>مانگی بێ‌مووچە</span></div>`+
        `<div class="f"><b id="mcP">0</b><span>مانگی بڕاو</span></div>`+
        `<div class="f door" id="mcDoor"><svg viewBox="0 0 24 24"><path d="M4 19h16M6 19V9l6-4 6 4v10M10 19v-5h4v5"/></svg><span>وردەکاری بڕینەکان</span><svg class="ch" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></div>`+
      `</div>`+
      `<div class="mc2-brk" id="mcBrk"><div class="in" id="mcBrkRows"></div></div>`+
      `<div class="mc2-bot"><div class="stamp">قەرزی تۆیە لەلای حکومەت</div>`+
      `<button class="share" id="mcShare"><svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>بڵاوی بکەرەوە</button></div>`+
    `</div></div></div>`+
    `<div class="mc2-src">سەرچاوە: داتای بڵاوکراوە · 2015—2025</div>`;
  qxSetNum($('mc2Nat'),fmt(Math.floor(qxVal())));
  $('mc2NatUsd').textContent=(qxVal()/qxUsdRate()/1e9).toFixed(2);
  const inp=$('mcSal');
  function recalc(){
    const S2=parseInt((inp.value||'').replace(/[^\d]/g,''))||0;
    inp.value=S2?S2.toLocaleString('en-US'):'';
    try{sessionStorage.setItem('mc_sal',S2||'');}catch(_){}
    const res=$('mcRes');
    if(S2<100000){ res.classList.remove('on'); return; }
    const since2=mcVals().since, mine=MC_LEDGER.filter(r=>r.y>=since2);
    const st=mcStats(mine,S2);
    $('mcZ').textContent=st.zero; $('mcP').textContent=st.part;
    $('mcMy').textContent=fmt(st.loss);
    $('mcMyUsd').textContent=fmt(st.loss/qxUsdRate());
    $('mcBrkRows').innerHTML=MC_ERAS.map(e=>{
      const es=mcStats(mine.filter(r=>r.y>=e.y0&&r.y<=e.y1),S2);
      if(!es.loss) return '';
      const bits=[]; if(es.zero)bits.push(`<b>${es.zero}</b> مانگ هیچت وەرنەگرت`); if(es.part)bits.push(`<b>${es.part}</b> مانگ بە بڕین درا`);
      return `<div class="r"><div class="top"><span class="t">${MC_ERA_TT[e.k]}</span><span class="yr">${e.yr}</span></div>`+
        `<div class="s">${bits.join(' و ')}.</div>`+
        `<div class="a"><span class="albl">زیانت لەم قۆناغە</span><span class="aval"><small>د.ع</small><b>${fmt(es.loss)}</b></span></div></div>`;
    }).join('');
    res.classList.add('on');
    window._mcTotal=st.loss;
  }
  inp.addEventListener('input',recalc);
  $('mcYrs').querySelectorAll('.y').forEach(b=>b.onclick=()=>{
    try{localStorage.setItem('mc_since',b.dataset.y);}catch(_){}
    haptic();
    $('mcYrs').querySelectorAll('.y').forEach(x=>x.classList.toggle('on',x===b));
    recalc();
  });
  $('mcDoor').onclick=()=>{ haptic(); $('mcDoor').classList.toggle('open'); $('mcBrk').classList.toggle('open'); };
  $('mcShare').onclick=()=>{ track('mucha_calc_share'); haptic();
    const total=window._mcTotal||0;
    const txt=`💼 تۆ چەندت لای حکومەتە؟\n\nلە 2015ـەوە نزیکەی ${fmt(total)} د.ع لە مووچەم بڕاوە.\n\nتۆش حیسابی بکە 👇`;
    openLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/dinarchi_bot')}&text=${encodeURIComponent(txt)}`); };
  if(S) recalc();
}
function mcTeaser(){
  if(state.lang!=='ku') return '';
  return `<div class="mc-teaser" id="mcTeaser"><div class="ic">`+
    `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9.5 14.5 5 5m0-5-5 5"/></svg></div>`+
    `<div><div class="tt">تۆ چەندت لای حکومەتە؟</div><div class="ss">بیکەرەوە و بە پێی مووچەکەت حیسابی بکە</div></div><div class="go">‹</div></div>`;
}
function openMucha(){ if(state.lang!=='ku') return; track('mucha_calc_open'); haptic(); renderMucha();
  $('muchaSheet').classList.add('on'); lockScroll(true); }
function closeMucha(){ const sh=$('muchaSheet'); sh.classList.add('closing'); lockScroll(false);
  setTimeout(()=>sh.classList.remove('on','closing','tall'),340); }
$('muchaClose').onclick=closeMucha; $('muchaBg').onclick=closeMucha;
{ const dc=$('debtCard'); if(dc) dc.onclick=openMucha; }
async function loadNews(){ const sb=$('salaryBoard');
  if(state.newsCat==='salary'){ sb.classList.add('on'); loadSalary(); } else { sb.classList.remove('on'); sb.innerHTML=''; }
  const ck='news_cache_'+state.newsCat+'_'+state.lang;
  state.newsHasMore=false; state.newsOffset=0;
  try{ const c=JSON.parse(localStorage.getItem(ck)); if(c&&c.length){ state.news=c; renderNews(c); } }catch(e){}   // instant from cache
  try{ const nw=await fetch(`/api/news?cat=${state.newsCat}&lang=${state.lang}`).then(r=>r.json());
    state.news=nw.news||[]; state.newsHasMore=!!nw.has_more; state.newsOffset=nw.offset||state.news.length; renderNews(state.news);
    try{ localStorage.setItem(ck, JSON.stringify(state.news)); }catch(e){} }catch(e){
    if(!state.news||!state.news.length){ $('news').innerHTML=`<div class="st-empty err"><b>${T('load_fail')}</b><span>${T('load_fail_s')}</span><button class="st-btn" id="newsRetry">${T('reload_btn')}</button></div>`; const rb=$('newsRetry'); if(rb) rb.onclick=()=>{haptic();loadNews();}; } } }
// STACKING: pull the next page of OLDER stories and append them, so the user can keep reading
// back through the retention window without anything auto-disappearing on them.
async function loadMoreNews(){ if(state._loadingMore||!state.newsHasMore)return; state._loadingMore=true;
  const btn=$('newsMore'); if(btn){ btn.disabled=true; btn.textContent=T('loading_more'); }
  try{ const nw=await fetch(`/api/news?cat=${state.newsCat}&lang=${state.lang}&offset=${state.newsOffset}`).then(r=>r.json());
    const more=nw.news||[]; state.news=state.news.concat(more);
    state.newsHasMore=!!nw.has_more; state.newsOffset=nw.offset||(state.newsOffset+more.length);
    renderNews(state.news); }catch(e){}
  state._loadingMore=false; }
// News↔rates fusion: pull the live consensus number for a dollar/gold story from the
// board already loaded in state — real current fact, shown beside the news (no prediction).
const OZ_PER_MITHQAL=31.1035/5;   // Iraqi gold mithqal = 5g; troy ounce = 31.1035g
function liveRateFor(cat){ if(!state.board||!state.board.length) return null;
  if(cat==='dollar'){ const r=state.board.find(x=>x.asset==='USD100'&&x.city===state.city)||state.board.find(x=>x.asset==='USD100'); return r?{value:r.value,delta:r.delta,usd:false}:null; }
  if(cat==='gold'){ const g=state.board.find(x=>x.asset==='XAU_MITHQAL_24'), u=state.board.find(x=>x.asset==='USD100');
    if(!g||!u||!u.value) return null; const ounceUsd=g.value*OZ_PER_MITHQAL/(u.value/100);   // ounce of gold in USD
    return {value:ounceUsd,delta:g.delta||0,usd:true}; }
  return null; }
function rateChip(cat,cls){ const r=liveRateFor(cat); if(!r) return '';
  const up=r.delta>0,dn=r.delta<0,arr=up?' ▲':dn?' ▼':'', col=up?'var(--up)':dn?'var(--down)':'var(--gold-2)';
  const body=r.usd?`<b>$</b> ${fmt(r.value)}`:`${fmt(r.value)} <b>د.ع</b>`;
  return `<span class="news-rate ${cls||''}" style="color:${col}">${body}${arr}</span>`; }
function newsHero(n){ const c=catOf(n.cat_key);
  const dek=n.brief?`<div class="nh-dek">${esc(n.brief)}</div>`:'';
  return `<div class="news-hero" data-i="0"><div class="nh-body"><div class="nh-top"><div class="nh-cat">${svgIcon(c?.ic||'')}${esc(catLabel(n.cat_key))}</div>${rateChip(n.cat_key,'nh-rate')}</div><div class="nh-title">${esc(n.title)}</div>${dek}<div class="news-meta"><span>${esc(n.source)}</span><span class="d"></span>${metaTime(n)}</div></div></div>`; }
function newsCardHtml(n,i){
  const dek=n.brief?`<div class="news-dek">${esc(n.brief)}</div>`:'';
  return `<div class="news-card ${n.tone}" data-i="${i}" style="cursor:pointer;animation-delay:${.05*i+.05}s"><div class="news-top"><span class="news-cat">${svgIcon(catOf(n.cat_key)?.ic||'')}${esc(catLabel(n.cat_key))}</span>${rateChip(n.cat_key)}</div><div class="news-title">${esc(n.title)}</div>${dek}<div class="news-meta"><span>${esc(n.source)}</span><span class="d"></span>${metaTime(n)}</div></div>`; }
function renderNews(items){ if(!items||!items.length){ $('news').innerHTML=`<div class="st-empty"><b>${T('news_empty')}</b><span>${T('news_empty_s')}</span></div>`; return; }
  const hero=newsHero(items[0]); const rest=items.slice(1).map((n,i)=>newsCardHtml(n,i+1)).join('');
  const foot = state.newsHasMore
    ? `<button id="newsMore" class="news-more">${T('load_more')}</button>`
    : (items.length>6 ? `<div class="news-end">${T('news_end')}</div>` : '');
  $('news').innerHTML=hero+rest+foot;
  $('news').querySelectorAll('[data-i]').forEach(c=>c.onclick=()=>openReader(state.news[+c.dataset.i]));
  const mb=$('newsMore'); if(mb) mb.onclick=loadMoreNews; }

/* ---- banks (directory tab) ---- */
const BK_FILTERS=[{k:'all',t:'bk_all'},{k:'fintech',t:'bk_fintech'},{k:'kri',t:'bk_kri'}];
function renderBankFilters(){ $('bkFilters').innerHTML=BK_FILTERS.map(f=>`<button class="bk-chip ${f.k===state.bankFilter?'on':''}" data-k="${f.k}">${T(f.t)}</button>`).join('');
  $('bkFilters').querySelectorAll('.bk-chip').forEach(b=>b.onclick=()=>{state.bankFilter=b.dataset.k;haptic();renderBankFilters();loadBanks();}); }
const bankName = b => state.lang==='ar' ? (b.name_ar||b.name_en) : (b.name_ku||b.name_en||b.name_ar);
const bankTypeLabel = t => T('bk_type_'+t);
const bankCity = hq => { const k=(hq||'').toLowerCase(); return CITIES[k] ? (CITIES[k][state.lang]||CITIES[k].ku) : (hq||''); };
// Premium gold monogram avatar (consistent, never broken); a curated b.logo image overrides.
function bankInitials(b){ const s=(b.short||b.name_en||'?').replace(/[^A-Za-z ]/g,'').trim().split(/\s+/).filter(Boolean);
  return ((s.length>1 ? s[0][0]+s[1][0] : (s[0]||'?').slice(0,2))).toUpperCase(); }
function bankLogo(b,lg){ const cls='bk-logo'+(lg?' lg':''); const ini=bankInitials(b);
  // curated app-icon/logo (b.logo) → Clearbit brand logo → the site's own apple-touch-icon → gold monogram
  if(b.logo) return `<div class="${cls}"><img src="${esc(b.logo)}" onerror="this.parentNode.textContent='${ini}'"></div>`;
  let host=''; try{ if(b.website) host=new URL(b.website).hostname; }catch(e){}
  if(host) return `<div class="${cls}"><img src="https://logo.clearbit.com/${host}" data-ati="https://${host}/apple-touch-icon.png" onerror="if(this.dataset.ati){this.src=this.dataset.ati;this.dataset.ati='';}else{this.parentNode.textContent='${ini}';}"></div>`;
  return `<div class="${cls}">${ini}</div>`; }
const BK_ICON={
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  city:'<path d="M3 21h18M5 21V7l5-3v17M19 21V11l-5-3"/>',
};
const bkSvg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
function badgeMeta(kind,val){
  if(kind==='card'){ if(val==='global')return {cls:'good',label:T('bk_global')}; if(val==='domestic')return {cls:'warn',label:T('bk_domestic')}; if(val==='no')return {cls:'bad',label:T('bk_no')}; return {cls:'muted',label:T('bk_unknown')}; }
  if(val==='yes')return {cls:'good',label:T('bk_yes')}; if(val==='limited')return {cls:'warn',label:T('bk_limited')}; if(val==='no')return {cls:'bad',label:T('bk_no')}; return {cls:'muted',label:T('bk_unknown')};
}
function badge(kind,val,labelKey){ const m=badgeMeta(kind,val); return `<span class="bkbadge ${m.cls}"><span class="bdot"></span>${T(labelKey)}: ${m.label}</span>`; }
async function loadBanks(){ try{ const q=state.bankFilter==='all'?'':(state.bankFilter==='kri'?'?region=kri':'?type='+state.bankFilter);
  const r=await fetch('/api/banks'+q).then(r=>r.json()); state.banks=r.banks||[]; renderBanks(); }catch(e){} }
function filteredBanks(){ const q=(state.bankQuery||'').trim().toLowerCase(); if(!q) return state.banks;
  return state.banks.filter(b=>[b.name_ku,b.name_ar,b.name_en,b.short].some(x=>(x||'').toLowerCase().includes(q))); }
function renderBanks(){ const items=filteredBanks();
  $('bankList').innerHTML=items.map((b,i)=>{
  const offer=b.offers>0?`<span class="bk-offer">🎁 ${T('bk_has_offers')}</span>`:'';
  const en=b.short?`<span class="bank-en">${esc(b.short)}</span>`:'';
  const unv=b.status_verified_at?'':`<div class="bk-unver">⚠ ${T('bk_unverified')}</div>`;
  return `<div class="bank-card" data-k="${esc(b.key)}" style="animation-delay:${.03*i}s">
    <div class="bk-row">${bankLogo(b)}<div class="bk-main">
      <div class="bank-name">${esc(bankName(b))}${en}</div>
      <div class="bank-sub"><span>${esc(bankCity(b.hq))}</span>${offer}</div>
    </div><span class="bank-type">${esc(bankTypeLabel(b.type))}</span></div>
    <div class="bank-badges">${badge('transfer',b.intl_transfer,'bk_transfer')}${badge('card',b.usd_card,'bk_card')}${badge('cash',b.usd_cash,'bk_cash')}</div>${unv}
  </div>`; }).join('') || `<div class="bk-empty">${T('no_results')}</div>`;
  $('bankList').querySelectorAll('.bank-card').forEach(c=>c.onclick=()=>openBank(c.dataset.k)); }
function srow(labelKey,kind,val){ const m=badgeMeta(kind,val); return `<div class="bk-srow"><span class="lbl">${T(labelKey)}</span><span class="bkbadge ${m.cls}"><span class="bdot"></span>${m.label}</span></div>`; }
function bankActions(b){ const a=[];
  if(b.phone) a.push(`<a class="bk-act" href="tel:${esc(b.phone)}">${bkSvg(BK_ICON.phone)}<span>${T('bk_call')}</span></a>`);
  if(b.website) a.push(`<a class="bk-act" href="${esc(b.website)}" target="_blank" rel="noopener">${bkSvg(BK_ICON.globe)}<span>${T('bk_visit')}</span></a>`);
  const loc=b.address||b.hq; if(loc) a.push(`<a class="bk-act" href="https://maps.google.com/?q=${enc((b.name_en||'')+' '+loc)}" target="_blank" rel="noopener">${bkSvg(BK_ICON.pin)}<span>${T('bk_location')}</span></a>`);
  const social=b.facebook||b.instagram||b.telegram; if(social) a.push(`<a class="bk-act" href="${esc(social)}" target="_blank" rel="noopener">${bkSvg(BK_ICON.share)}<span>${T('bk_social')}</span></a>`);
  return a.length?`<div class="bk-actions">${a.join('')}</div>`:''; }
async function openBank(key){ track('bank_sheet'); haptic(); const sh=$('bankSheet'); $('bankBody').innerHTML='<div class="bk-empty">…</div>';
  sh.classList.remove('closing'); sh.classList.add('on'); $('bankBody').scrollTop=0; lockScroll(true);
  try{ const r=await fetch('/api/bank/'+encodeURIComponent(key)).then(r=>r.json()); renderBankDetail(r.bank,r.updates||[],r.rates,r.products); }catch(e){ $('bankBody').innerHTML=`<div class="bk-empty">${T('toast_fail')}</div>`; } }
// Status notes localized (keyed by the English seed string). User-facing ku/ar only —
// internal "CONFIRM" guidance is dropped. Unknown notes render nothing (no English leak).
const BANK_NOTES={
  "State trade-finance bank; widest international access.":{ku:"بانکی دەوڵەتی بۆ دارایی بازرگانی؛ فراوانترین دەستگەیشتنی نێودەوڵەتی.",ar:"مصرف حكومي للتمويل التجاري؛ أوسع وصول دولي."},
  "Largest state bank; mostly domestic services.":{ku:"گەورەترین بانکی دەوڵەتی؛ زۆربەی خزمەتگوزارییەکان ناوخۆیین.",ar:"أكبر مصرف حكومي؛ خدماته محلية غالباً."},
  "Capital Bank (Jordan) group; strong international rails.":{ku:"سەر بە گرووپی Capital Bank (ئوردن)؛ ڕێگای نێودەوڵەتی بەهێز.",ar:"ضمن مجموعة Capital Bank (الأردن)؛ قنوات دولية قوية."},
  "Digital-forward private bank.":{ku:"بانکی تایبەتی دیجیتاڵ‌خواز.",ar:"مصرف خاص ذو توجّه رقمي."},
  "Reported barred from the CBI dollar auction (2024). CONFIRM — may change.":{ku:"ڕاپۆرتکراوە لە لێلانی دۆلاری بانکی ناوەندی قەدەغەکراوە (٢٠٢٤).",ar:"ورد أنه مُنع من مزاد الدولار للبنك المركزي (2024)."},
  "Reported barred from USD transactions (2024). CONFIRM — may change.":{ku:"ڕاپۆرتکراوە لە مامەڵەی دۆلار قەدەغەکراوە (٢٠٢٤).",ar:"ورد أنه مُنع من التعامل بالدولار (2024)."},
  "US Treasury (OFAC) designated, 2024. CONFIRM current status.":{ku:"لەلایەن وەزارەتی دارایی ئەمریکا (OFAC) ناوی تۆمارکراوە (٢٠٢٤).",ar:"مُدرج من الخزانة الأمريكية (OFAC) عام 2024."},
  "Most-used private bank in the KRI for international access.":{ku:"بەکارهاتووترین بانکی تایبەت لە هەرێم بۆ دەستگەیشتنی نێودەوڵەتی.",ar:"أكثر المصارف الخاصة استخداماً في الإقليم للوصول الدولي."},
  "Reported among banks restricted from USD (2024). CONFIRM — may change.":{ku:"ڕاپۆرتکراوە لەناو ئەو بانکانەی لە دۆلار سنووردارکراون (٢٠٢٤).",ar:"ورد ضمن المصارف المقيّدة بالدولار (2024)."},
  "Largest Iraqi payment issuer (10M+ users); Mastercard.":{ku:"گەورەترین دەرکەری پارەدانی عێراقی (١٠ ملیۆن+ بەکارهێنەر)؛ ماستەرکارد.",ar:"أكبر مُصدّر مدفوعات عراقي (+10 مليون مستخدم)؛ ماستركارد."},
  "Popular app-first digital bank.":{ku:"بانکی دیجیتاڵی بەناوبانگ، ئەپ‌بنەما.",ar:"مصرف رقمي شهير يعتمد التطبيق أولاً."},
  "Mobile wallet; Mastercard WalletCard; wide agent network.":{ku:"جزدانی مۆبایل؛ ماستەرکارد WalletCard؛ تۆڕی بریکاری فراوان.",ar:"محفظة موبايل؛ بطاقة ماستركارد WalletCard؛ شبكة وكلاء واسعة."},
  "Visa/Mastercard partner (2024).":{ku:"هاوبەشی ڤیزا/ماستەرکارد (٢٠٢٤).",ar:"شريك فيزا/ماستركارد (2024)."},
};
const offerTitle = u => state.lang==='ar' ? u.title : (u.title_ku || u.title);
const rateVal = (o,f) => state.lang==='ar' ? o[f+'_ar'] : (o[f+'_ku']||o[f+'_ar']);
// name/label are {ku,ar}; a value can be a neutral string (numbers/د.ع/%), 'free', or {ku,ar}.
const _L  = o => (o && typeof o==='object') ? (o[state.lang]||o.ku||o.ar||'') : (o||'');
const _pv = v => (v && typeof v==='object') ? _L(v) : (v==='free'?T('bk_free'):(v||''));
const _host = u => { try{ return new URL(u).hostname.replace(/^www\./,''); }catch(e){ return u; } };
const _sub = (titleKey,inner) => inner ? `<div class="bk-sub-t">${T(titleKey)}</div>${inner}` : '';
/* ── UNIFIED BANK SKELETON ──────────────────────────────────────────────
   Every bank renders the SAME sections in the SAME order:
   status → key facts (products.fees + rates.facts MERGED) → services
   (accounts→cards→loans→deposits→digital as sub-groups) → branches → updates.
   Missing data shows an honest placeholder instead of a vanishing section,
   so all 21 banks share one recognizable shape. */
function keyFactsBlock(p,rates){
  const rows=[];
  if(p&&p.fees&&p.fees.length)
    p.fees.forEach(f=>rows.push(`<div class="bk-srow"><span class="lbl">${esc(_L(f.label))}</span><span class="bk-rval">${esc(_pv(f.value))}</span></div>`));
  if(rates&&Array.isArray(rates.facts))
    rates.facts.forEach(f=>rows.push(`<div class="bk-srow"><span class="lbl">${esc(rateVal(f,'label'))}</span><span class="bk-rval">${esc(rateVal(f,'value'))}</span></div>`));
  const srcs=[...new Set([
    (p&&p.sources&&p.sources.length)?_host(p.sources[0]):null,
    (rates&&rates.source)?rates.source:null].filter(Boolean))];
  const src=srcs.length?`<div class="bk-src">${T('bk_source')}: ${esc(srcs.join(' · '))}</div>`:'';
  const inner=rows.length?`<div class="bk-status-row">${rows.join('')}</div>${src}`
                         :`<div class="bk-empty">${T('bk_no_facts')}</div>`;
  return `<div class="bk-sec-t">${T('bk_key_facts')}</div>${inner}`;
}
function servicesBlock(p){
  let h='';
  if(p){
    if(p.accounts&&p.accounts.length)
      h+=_sub('bkp_accounts',`<div class="bk-chips">${p.accounts.map(a=>`<span class="bk-chip2">${esc(_L(a))}</span>`).join('')}</div>`);
    if(p.cards&&p.cards.length)
      h+=_sub('bkp_cards',`<div class="bk-plist">${p.cards.map(c=>{
        const net=c.net?`<span class="bk-net">${esc(c.net)}</span>`:'';
        const fee=c.fee?`<div class="bk-p-note">${esc(_pv(c.fee))}</div>`:'';
        return `<div class="bk-prow"><div class="bk-p-main"><div class="bk-p-name">${esc(_L(c.name))}</div>${fee}</div>${net}</div>`;
      }).join('')}</div>`);
    if(p.loans&&p.loans.length)
      h+=_sub('bkp_financing',`<div class="bk-plist">${p.loans.map(l=>{
        const rate=l.rate?`<span class="bk-pval">${esc(l.rate)}</span>`:'';
        const note=l.note?`<div class="bk-p-note">${esc(_L(l.note))}</div>`:'';
        return `<div class="bk-prow"><div class="bk-p-main"><div class="bk-p-name">${esc(_L(l.name))}</div>${note}</div>${rate}</div>`;
      }).join('')}</div>`);
    if(p.deposits&&p.deposits.length)
      h+=_sub('bkp_deposits',`<div class="bk-plist">${p.deposits.map(l=>{
        const rate=l.rate?`<span class="bk-pval">${esc(l.rate)}</span>`:'';
        const note=l.note?`<div class="bk-p-note">${esc(_L(l.note))}</div>`:'';
        return `<div class="bk-prow"><div class="bk-p-main"><div class="bk-p-name">${esc(_L(l.name))}</div>${note}</div>${rate}</div>`;
      }).join('')}</div>`);
    if(p.digital&&(p.digital.app||(p.digital.features&&p.digital.features.length))){
      const app=p.digital.app?`<span class="bk-chip2 on">${esc(_L(p.digital.app))}</span>`:'';
      const feats=(p.digital.features||[]).map(x=>`<span class="bk-chip2">${esc(_L(x))}</span>`).join('');
      h+=_sub('bkp_digital',`<div class="bk-chips">${app}${feats}</div>`);
    }
  }
  const inner=h||`<div class="bk-empty">${T('bk_no_products')}</div>`;
  return `<div class="bk-sec-t">${T('bk_services')}</div>${inner}`;
}
function renderBankDetail(b,updates,rates,products){ if(!b)return;
  const unv=b.status_verified_at?'':`<div class="bk-unver" style="justify-content:center">⚠ ${T('bk_unverified')}</div>`;
  const nx=BANK_NOTES[b.status_note]; const noteTxt=nx?(nx[state.lang]||nx.ku):'';
  const note=noteTxt?`<div class="bk-note">${esc(noteTxt)}</div>`:'';
  const ups=updates.length?updates.map(u=>`<div class="bk-up"><div class="t">${esc(offerTitle(u))}</div><div class="m">${esc(u.source||'')}</div></div>`).join('') : `<div class="bk-empty">${T('bk_no_updates')}</div>`;
  // branches never vanish: fall back to the HQ city when no branch list is recorded
  let ck=(b.cities||'').split(',').map(s=>s.trim()).filter(Boolean);
  if(!ck.length&&b.hq) ck=[b.hq];
  const cities=`<div class="bk-sec-t">${T('bk_branches')}</div><div class="bk-cities">${ck.map(k=>`<span class="bk-citychip">${bkSvg(BK_ICON.city)}${esc(cityName(k)||k)}</span>`).join('')||`<div class="bk-empty">${T('no_results')}</div>`}</div>`;
  /* fixed skeleton — identical order for every bank:
     identity → USD status → key facts → services → branches → updates */
  $('bankBody').innerHTML=`<div class="bk-d-head">${bankLogo(b,true)}
      <div class="bk-d-name">${esc(bankName(b))}</div>
      ${b.name_en?`<div class="bk-d-en">${esc(b.name_en)}</div>`:''}
      <div class="bk-d-sub">${esc(bankTypeLabel(b.type))} · ${esc(bankCity(b.hq))}${b.founded?' · '+b.founded:''}</div>${unv}</div>
    ${bankActions(b)}
    <div class="bk-sec-t">${T('bk_status_t')}</div>
    <div class="bk-status-row">${srow('bk_transfer','transfer',b.intl_transfer)}${srow('bk_card','card',b.usd_card)}${srow('bk_cash','cash',b.usd_cash)}</div>${note}
    ${keyFactsBlock(products,rates)}
    ${servicesBlock(products)}
    ${cities}
    <div class="bk-sec-t">${T('bk_updates')}</div>${ups}`; }
function closeBank(){ track('tab:bank'); const sh=$('bankSheet'); sh.classList.add('closing'); lockScroll(false);
  setTimeout(()=>sh.classList.remove('on','closing','tall'),340); }
$('bankClose').onclick=closeBank; $('bankBg').onclick=closeBank;
$('bankSearch').oninput=e=>{ state.bankQuery=e.target.value; renderBanks(); };

/* ---- news reader: fancy slide-up with staggered reveal ---- */
const enc=encodeURIComponent;
const SHARE=[
  {k:'telegram',col:'#2AABEE',ic:'<path fill="currentColor" d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9-8.1c.4-.3-.1-.5-.6-.2L6.4 13l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.5Z"/>',u:(u,t)=>`https://t.me/share/url?url=${enc(u)}&text=${enc(t)}`},
  {k:'whatsapp',col:'#25D366',ic:'<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.3-5-4.5-.1-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5c-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.2.5.2.5.4.1.1.1.7-.2 1.4Z"/>',u:(u,t)=>`https://wa.me/?text=${enc(t+' '+u)}`},
  {k:'x',col:'#e7e9ee',ic:'<path fill="currentColor" d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21H2.5l7-8L2.3 3h6.1l4.2 5.6L17.5 3Zm-1 16h1.7L7.6 4.8H5.8L16.5 19Z"/>',u:(u,t)=>`https://twitter.com/intent/tweet?text=${enc(t)}&url=${enc(u)}`},
  {k:'messenger',col:'#0084FF',ic:'<path fill="currentColor" d="M12 2C6.5 2 2 6.13 2 11.2c0 2.88 1.43 5.45 3.67 7.14V22l3.36-1.84c.9.25 1.85.38 2.97.38 5.5 0 10-4.13 10-9.2S17.5 2 12 2Zm1.01 12.38-2.55-2.72-4.97 2.72 5.47-5.8 2.61 2.72 4.92-2.72-5.48 5.8Z"/>',u:(u,t)=>`fb-messenger://share/?link=${enc(u)}`},
  {k:'copy',col:'var(--gold)',ic:'<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9 9h10v10H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',copy:true},
];
function renderShare(n){ const link='https://t.me/dinarchi_bot', text=`📰 ${n.title}\n\n— دینارچی`;
  $('rdShare').innerHTML=`<span class="sh-lbl">${T('share_lbl')}</span>`+SHARE.map(s=>`<button data-k="${s.k}" style="color:${s.col}"><svg viewBox="0 0 24 24">${s.ic}</svg></button>`).join('');
  $('rdShare').querySelectorAll('button').forEach(b=>b.onclick=()=>{ haptic(); const s=SHARE.find(x=>x.k===b.dataset.k);
    if(s.copy){ try{ navigator.clipboard.writeText(text+'\n'+link); }catch(e){} toast(T('copied'),'ok'); } else openLink(s.u(link,text)); }); }
async function loadBrief(n){ const el=$('rdBrief'), tok=n.link||n.title; state._rdTok=tok;
  const head=state.lang==='ar'?(n.title_orig||n.title):(n.title||n.title_orig);
  const paras = t => el.innerHTML = t.split(/\n+/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
  el.className='reader-brief rv'; $('rdTrust').style.display='none';
  // Pre-warmed FULL report (the background-fetched, translated article) → show it all,
  // instantly. No report yet → show the one-line summary and best-effort fetch the rest.
  if(n.report){ paras(n.report); return; }
  el.innerHTML=`<div class="reader-fallback" dir="auto">${esc(n.brief||head)}</div>`;
  let summary=null;
  try{ if(n.link){ summary=(await fetch(`/api/article?link=${enc(n.link)}&lang=${state.lang}`).then(r=>r.json())).summary; } }catch(e){}
  if(state._rdTok!==tok)return;
  if(summary){ paras(summary); } }
// Lock the page scroll behind any full-screen overlay so we never get a second
// (background) scrollbar next to the overlay's own.
function lockScroll(on){ document.documentElement.style.overflow=on?'hidden':''; document.body.style.overflow=on?'hidden':''; }
function openReader(n){ if(!n)return; track('reader'); haptic(); const r=$('reader'), c=catOf(n.cat_key);
  const card=r.querySelector('.reader-card'),bg=r.querySelector('.reader-bg'),hd=r.querySelector('.reader-hd');
  card.style.transition='';card.style.transform='';bg.style.transition='';bg.style.opacity='';hd.style.transform='';hd.style.opacity='';
  $('rdProg').style.width='0';
  $('rdCat').innerHTML=svgIcon(c?.ic||'')+`<span>${esc(catLabel(n.cat_key))}</span>`;
  $('rdTitle').textContent=n.title;
  $('rdMeta').innerHTML=`<span>${esc(n.source||'')}</span><span class="d"></span><span class="nm-ts">${esc(newsFullDate(n)||newsAgo(n.mins_ago))}</span>${rateChip(n.cat_key)}`;
  const ri=$('rdImg'); const _img=safeImg(n.image); if(_img){ ri.className='reader-img rv'; ri.style.backgroundImage=`url('${_img}')`; } else { ri.className='reader-img rv none'; ri.style.backgroundImage=''; }
  // Pre-warmed report? render the FULL detail instantly (no skeleton flash). Else
  // show the one-line brief now and let loadBrief upgrade it.
  const rb=$('rdBrief');
  if(n.report){ rb.className='reader-brief rv'; rb.innerHTML=n.report.split(/\n+/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join(''); }
  else if(n.brief){ rb.className='reader-brief rv'; rb.innerHTML=`<div class="reader-fallback" dir="auto">${esc(n.brief)}</div>`; }
  else { rb.className='reader-brief rv sk-wrap'; rb.innerHTML=['96%','100%','100%','94%','100%','86%'].map(w=>`<span class="skl" style="width:${w}"></span>`).join(''); }
  $('rdTrust').style.display='none';
  renderShare(n);
  $('rdMark').innerHTML=`<span class="wm">دینار<b>چی</b></span>${n.source?`<span>· ${T('source_lbl')}: ${esc(n.source)}</span>`:''}`;
  r.classList.remove('closing'); r.classList.add('on'); lockScroll(true); r.querySelector('.reader-body').scrollTop=0;
  r.querySelectorAll('.rv').forEach((el,i)=>{ el.style.animation='none'; void el.offsetWidth; el.style.animationDelay=(0.06*i+0.1)+'s'; el.style.animation=''; });
  loadBrief(n);
}
function closeReader(){ track('tab:news'); const r=$('reader'); r.classList.add('closing'); lockScroll(false); setTimeout(()=>r.classList.remove('on','closing'),340); }
$('readerBg').onclick=closeReader; $('readerClose').onclick=closeReader;
/* swipe-down-to-dismiss + scroll parallax header */
(function(){ const r=$('reader'); let sy=null,dy=0;
  const card=()=>r.querySelector('.reader-card'),bg=()=>r.querySelector('.reader-bg'),body=()=>r.querySelector('.reader-body');
  r.addEventListener('touchstart',e=>{ if(!r.classList.contains('on')||body().scrollTop>2){sy=null;return;} sy=e.touches[0].clientY; dy=0; },{passive:true});
  r.addEventListener('touchmove',e=>{ if(sy==null)return; dy=e.touches[0].clientY-sy; if(dy<=0){ if(!dy)sy=null; return; }
    const c=card(); c.style.transition='none'; c.style.transform=`translateY(${dy*0.6}px)`; bg().style.opacity=Math.max(0,1-dy/420); },{passive:true});
  r.addEventListener('touchend',()=>{ if(sy==null)return; const c=card();
    if(dy>110){ c.style.transition='transform .3s cubic-bezier(.4,0,1,1)'; c.style.transform='translateY(100%)'; bg().style.transition='opacity .3s'; bg().style.opacity='0';
      lockScroll(false); setTimeout(()=>{ r.classList.remove('on'); c.style.transition='';c.style.transform='';bg().style.transition='';bg().style.opacity=''; },300); haptic(); }
    else { c.style.transition='transform .32s cubic-bezier(.2,.8,.2,1)'; c.style.transform=''; bg().style.opacity=''; }
    sy=null; dy=0; });
  r.querySelector('.reader-body').addEventListener('scroll',function(){ const s=this.scrollTop, hd=r.querySelector('.reader-hd');
    hd.style.transform=`translateY(${-s*0.35}px)`; hd.style.opacity=Math.max(0,1-s/130);
    const max=this.scrollHeight-this.clientHeight; $('rdProg').style.width=(max>4?Math.min(100,s/max*100):0)+'%'; },{passive:true});
})();
function renderCitySeg(){ const seg=$('citySeg'),a=ASSETS[state.asset]; seg.classList.toggle('gone',!a||!a.hasCity); if(!a||!a.hasCity)return;
  const order=citiesFor(state.asset), sig=order.join(',');
  if(!order.includes(state.city)){ state.city=order[0]; }
  seg.classList.toggle('five',order.length>4);
  if(seg._sig!==sig){ seg._sig=sig;                     // (re)build buttons in the language's city order
    seg.querySelectorAll('button').forEach(b=>b.remove());   // keep the .pill-bg, replace buttons
    seg.insertAdjacentHTML('beforeend',order.map(k=>`<button data-c="${k}">${cityName(k)}</button>`).join(''));
    seg.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.city=b.dataset.c;haptic();selectionChanged();}); }
  seg.querySelectorAll('button').forEach(b=>{b.textContent=cityName(b.dataset.c);b.classList.toggle('on',b.dataset.c===state.city);});
  const on=seg.querySelector('button.on'),pill=seg.querySelector('.pill-bg'); if(on){pill.style.left=on.offsetLeft+'px';pill.style.width=on.offsetWidth+'px';} }
function renderRanges(){ $('ranges').innerHTML=RANGES.map(r=>`<button class="${r.d===state.range?'on':''}" data-d="${r.d}">${T(r.k)}</button>`).join('');
  $('ranges').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.range=+b.dataset.d;haptic();renderRanges();loadHistory();}); }
/* metals in the converter: gold (24/21 via karat cards) + silver (cross-rated from the
   USD board: XAG $/kg × USD100/100 → IQD/kg), both convertible per گرام/مسقاڵ/ئۆنسە/کیلۆ.
   Iraqi-market mithqal = 5 g; troy ounce = 31.1035 g. */
const METAL_GRAMS={g:1,m:5,oz:31.1035,kg:1000}, METAL_UNITS=['m','g','oz','kg'];   // مسقاڵ first (user 2026-08-07) — it's how Iraqis actually buy gold; state.convUnit defaults to 'm'
const isGoldA=c=>c.indexOf('XAU')===0, isSilverA=c=>c==='XAG_KG_USD', isMetalA=c=>isGoldA(c)||isSilverA(c);
function metalPerGram(code){ const r=current(code,null); if(!r)return null;
  if(isGoldA(code)) return r.value/5;
  const u=current('USD100',state.city); return u?r.value*(u.value/100)/1000:null; }
/* ANY-TO-ANY converter (user 2026-10-07: «convert any currency to any other, not just IQD»).
   Every board price is dinars per unit, so dinar is the common base: A→B = rate(A)/rate(B),
   with rate('IQD')=1. Each side has its own asset; tapping a side's label makes it the side
   the pill row edits. Defaults (دۆلار → دینار) behave exactly like the old one-way converter. */
const IQD='IQD', isIqd=c=>c===IQD;
const convName=c=>isIqd(c)?T('dinar'):aName(ASSETS[c]);
const convSym=c=>isIqd(c)?T('iqd_sym'):aSym(ASSETS[c]);
function convRate(code){ if(isIqd(code))return 1; const a=ASSETS[code];
  if(isMetalA(code)){ const pg=metalPerGram(code); return pg==null?null:pg*METAL_GRAMS[state.convUnit]; }
  const r=current(code,a.hasCity?state.city:null); return r?r.value/a.per:null; }
const convSideCode=()=>state.convSide==='to'?state.convTo:state.convFrom;
function setConvSide(code){ if(state.convSide==='to')state.convTo=code; else state.convFrom=code; }
function renderConvAssets(){
  // pill order: دینار · دۆلار · یۆرۆ · زێڕ · زیو · rest — metals promoted to slots (user 2026-07-27)
  const cur=convSideCode(), other=state.convSide==='to'?state.convFrom:state.convTo;
  const pills=[], pill=(code,label,on)=>pills.push(`<div class="ca ${on?'on':''}${code===other||(isGoldA(code)&&isGoldA(other))?' other':''}" data-a="${code}">${artImg(isIqd(code)?'IQD':code,'ca-art')}<span>${label}</span></div>`);
  const rest=Object.keys(ASSETS).filter(c=>c!=='USD100'&&c!=='EUR100'&&!isMetalA(c)&&!ASSETS[c].usd);
  pill(IQD,T('dinar'),isIqd(cur));
  pill('USD100',aName(ASSETS.USD100),cur==='USD100');
  pill('EUR100',aName(ASSETS.EUR100),cur==='EUR100');
  pill('XAU_MITHQAL_24',T('gold_word'),isGoldA(cur));
  pill('XAG_KG_USD',aName(ASSETS.XAG_KG_USD),isSilverA(cur));
  rest.forEach(c=>pill(c,aName(ASSETS[c]),c===cur));
  $('convAssets').innerHTML=pills.join('');
  $('convAssets').querySelectorAll('.ca').forEach(c=>c.onclick=()=>{
    const code=c.dataset.a, side=convSideCode(), other=state.convSide==='to'?state.convFrom:state.convTo;
    const same=(x,y)=>x===y||(isGoldA(x)&&isGoldA(y));
    if(same(code,side))return;
    if(same(code,other)){ const f=state.convFrom; state.convFrom=state.convTo; state.convTo=f; }   // tapping the other side's asset = swap
    else setConvSide(code);
    haptic();
    if(state.convSide==='from') $('convIn').value = isMetalA(state.convFrom)?1:100;   // metals start at 1 مسقاڵ/گرام, currencies at 100
    renderConvAssets();renderConv();}); }
function renderConvKarat(){
  const code=isGoldA(convSideCode())?convSideCode():isGoldA(state.convFrom)?state.convFrom:isGoldA(state.convTo)?state.convTo:null;
  const el=$('convKarat'); el.classList.toggle('gone',!code); if(!code){el.innerHTML='';return;}
  const chk='<div class="chk"><svg viewBox="0 0 24 24"><path d="m5 13 4 4L19 7"/></svg></div>';
  el.innerHTML=[['XAU_MITHQAL_24','24'],['XAU_MITHQAL_21','21'],['XAU_MITHQAL_18','18']].map(([k,knum])=>
    `<div class="kc ${code===k?'on':''}" data-a="${k}">${chk}
      <div class="kn"><b>${knum}</b><span>${T('karat_word')}</span></div></div>`).join('');
  el.querySelectorAll('.kc').forEach(k=>k.onclick=()=>{
    if(state.convFrom===code)state.convFrom=k.dataset.a; else state.convTo=k.dataset.a; haptic();renderConv();}); }
function renderConvUnits(metal){
  const el=$('convUnits'); el.classList.toggle('gone',!metal); if(!metal){el.innerHTML='';return;}
  const hint={g:'1g',m:'5g',oz:'31.1g',kg:'1kg'};
  el.innerHTML=METAL_UNITS.map(u=>`<div class="uc ${u===state.convUnit?'on':''}" data-u="${u}">${T('unit_'+u)}<small>${hint[u]}</small></div>`).join('');
  el.querySelectorAll('.uc').forEach(c=>c.onclick=()=>{state.convUnit=c.dataset.u;haptic();renderConv();}); }
const convFmt=v=>v>=1000?fmt(v):v.toLocaleString('en-US',{maximumFractionDigits:v>=1?2:v>=0.01?4:6});
function renderConv(){ const from=state.convFrom,to=state.convTo;
  const metal=isMetalA(from)||isMetalA(to), slv=isSilverA(from)||isSilverA(to);
  const rf=convRate(from), rt=convRate(to), rate=rf&&rt?rf/rt:null;
  $('convInLabel').textContent=convName(from); $('convOutLabel').textContent=convName(to); setArt('convArtIn',isIqd(from)?'IQD':from,1); setArt('convArtOut',isIqd(to)?'IQD':to,1);
  $('convInCell').classList.toggle('act',state.convSide==='from'); $('convOutCell').classList.toggle('act',state.convSide==='to');
  $('convUwIn').textContent=isMetalA(from)?T('unit_'+state.convUnit):''; $('convUwOut').textContent=isMetalA(to)?T('unit_'+state.convUnit):'';
  document.querySelector('.conv').classList.toggle('slv',slv);
  const amt=parseFloat($('convIn').value)||0,out=rate!=null?amt*rate:null,el=$('convOut');
  if(out==null)el.textContent='—'; else numTween(el,out,convFmt);
  el.style.fontSize=out!=null&&convFmt(out).length>10?'19px':'';
  renderConvKarat(); renderConvUnits(metal);
  if(rate==null){ $('convNote').textContent=''; return; }
  const where=[from,to].some(c=>!isIqd(c)&&ASSETS[c].hasCity)?cityName(state.city):T('market_word');
  if(isIqd(to)&&isMetalA(from)){ $('convNote').textContent=`${T('mithqal_eq')} · ${T('gram_one')} = ${fmt(metalPerGram(from))} ${T('iqd_sym')}`; return; }
  const big=(rate<1||isMetalA(to))&&!isMetalA(from)?[to,from,1/rate]:[from,to,rate];   // always quote «1 strong = N weak», never 0.000x
  const one=c=>isMetalA(c)?`1 ${T('unit_'+state.convUnit)} ${convName(c)}`:`1 ${convSym(c)}`;
  $('convNote').textContent=`${one(big[0])} = ${convFmt(big[2])} ${isMetalA(big[1])?T('unit_'+state.convUnit)+' '+convName(big[1]):convName(big[1])} · ${where}`; }
$('convIn').addEventListener('input',renderConv);
$('convInCell').onclick=e=>{ if(e.target.id==='convIn'&&state.convSide==='from')return; if(state.convSide!=='from'){state.convSide='from';haptic();renderConvAssets();renderConv();} };
$('convOutCell').onclick=()=>{ if(state.convSide!=='to'){state.convSide='to';haptic();renderConvAssets();renderConv();} };
$('swap').onclick=function(){ const f=state.convFrom; state.convFrom=state.convTo; state.convTo=f;
  state.convSide=state.convSide==='to'?'from':'to'; haptic();this.classList.toggle('flip');renderConvAssets();renderConv();};

/* ---- skeleton loaders (first paint, before data lands) ---- */
function renderSkeletons(){
  $('aswipe').innerHTML=Array.from({length:5}).map(()=>'<div class="achip sk" style="height:74px"></div>').join('');
  if(!state.news.length) $('news').innerHTML=Array.from({length:4}).map(()=>'<div class="news-card sk" style="height:80px"></div>').join('');
}

/* ---- price alerts ---- */
/* The chart draws before /api/alerts resolves, so the alert line would never appear on first
   paint. Re-render from the payload CHART already holds — no refetch. */
function redrawChart(){
  try{ if(!CHART) return;
    if(CHART.mode==='candle') drawCandles(ALL_CS.length?ALL_CS:CHART.cs);
    else if(CHART.pts) drawChart(CHART.pts);
  }catch(e){}
}
async function loadAlerts(){
  try{ const r=await fetch('/api/alerts',{headers:authHeaders()});
    if(r.status===401){ renderAlerts(null); updateBell(); return; }
    const j=await r.json(); state.alerts=j.alerts||[]; state.alertMax=j.max||20;
    // forget 'seen' ids for alerts that no longer exist (keeps the set small)
    const ids=new Set(state.alerts.map(a=>a.id)); let pruned=false;
    state.seen.forEach(id=>{ if(!ids.has(id)){ state.seen.delete(id); pruned=true; } });
    if(pruned) Store.set('seenAlerts', JSON.stringify([...state.seen]));
    renderAlerts(state.alerts); updateBell(); redrawChart();
  }catch(e){ renderAlerts([]); }
}
// A fired-but-unseen alert is an "unread notification". The hero bell shows their
// count and rings to draw the eye; opening the alerts tab marks them seen.
function unreadAlerts(){ return (state.alerts||[]).filter(a=>a.triggered_at && !state.seen.has(a.id)); }
function updateBell(){
  const n=unreadAlerts().length, bell=$('heroBell'), badge=$('bellBadge');
  if(!bell)return;
  bell.classList.toggle('has-notif', n>0); bell.classList.toggle('ring', n>0);
  if(badge) badge.textContent = n>9?'9+':String(n);
}
function markAlertsSeen(){
  let changed=false;
  (state.alerts||[]).forEach(a=>{ if(a.triggered_at && !state.seen.has(a.id)){ state.seen.add(a.id); changed=true; } });
  if(changed) Store.set('seenAlerts', JSON.stringify([...state.seen]));
  updateBell();
}
function renderAlerts(list){
  const wrap=$('alertsList');
  if(list===null){ wrap.innerHTML=`<div class="empty">${bellSvg(44)}<div>${T('auth_needed')}</div></div>`; return; }
  if(!list.length){ wrap.innerHTML=`<div class="empty">${bellSvg(44)}<div>${T('no_alerts')}</div></div>`; return; }
  wrap.innerHTML=list.map(a=>{
    const armed=a.active===1 && !a.triggered_at, A=ASSETS[a.asset], m=state.mkByKey[a.asset], usd=(A&&A.usd)||!!m;
    const nm=(A?aName(A):(m?(m.name[state.lang]||m.name.en):a.asset.replace('CRYPTO_','')))+(a.city?(' · '+cityName(a.city)):'');
    const arrow=a.direction==='above'?'▲':'▼';
    return `<div class="alert-card ${armed?'':'done'}"><div class="ab">${bellSvg(18,armed?'var(--gold)':'var(--dim)')}</div>`+
      `<div class="al-main"><div class="al-t">${esc(nm)}</div><div class="al-s">${arrow} ${fmt(a.target)}${usd?' $':''}</div></div>`+
      `<span class="al-tag ${armed?'armed':'done'}">${armed?T('alert_armed'):T('alert_done')}</span>`+
      `<button class="al-del" data-id="${a.id}">✕</button></div>`;
  }).join('');
  wrap.querySelectorAll('.al-del').forEach(b=>b.onclick=()=>delAlert(+b.dataset.id));
}
async function delAlert(id){ haptic();
  try{ const r=await fetch('/api/alerts/'+id,{method:'DELETE',headers:authHeaders()});
    if(r.ok){ toast(T('toast_del')); loadAlerts(); } else toast(T('toast_fail'),'err');
  }catch(e){ toast(T('toast_fail'),'err'); } }

/* ---- set-alert bottom sheet (targets the currently-viewed asset) ---- */
/* alert sheet: the asset strip lets the user set the alert on ANY asset, independent of the hero */
function renderAlertAssets(){
  const cur=state.alertAsset, pills=[];
  if(isGlobal(cur)){ const m=state.mkByKey[cur]; if(m) pills.push(`<div class="ca on" data-a="${esc(cur)}">${esc(m.name[state.lang]||m.name.en)}</div>`); }
  Object.entries(ASSETS).forEach(([code,a])=>{
    pills.push(`<div class="ca ${code===cur?'on':''}" data-a="${code}">${aName(a)}</div>`);
  });
  $('alertAssets').innerHTML=pills.join('');
  const strip=$('alertAssets');
  strip.querySelectorAll('.ca').forEach(c=>c.onclick=()=>{
    state.alertAsset=c.dataset.a; haptic(); renderAlertAssets(); fillAlertSheet(); });
  const on=strip.querySelector('.ca.on'); if(on) on.scrollIntoView({inline:'center',block:'nearest'});
}
function fillAlertSheet(){
  const k=state.alertAsset, g=isGlobal(k);
  let name, cur, unit, isUsd;
  if(g){ const m=state.mkByKey[k]; if(!m)return; name=m.name[state.lang]||m.name.en; cur=m.price; unit=T('dollar'); isUsd=true; }
  else { const a=ASSETS[k], r=current(k,a.hasCity?state.city:null);
    name=aFull(a)+(a.hasCity?(' · '+cityName(state.city)):''); cur=r?r.value:null; unit=a.usd?T('dollar'):T('dinar'); isUsd=!!a.usd; }
  const f=isUsd?fmtUsd:fmt;
  $('sheetSub').textContent=name; $('tgtUnit').textContent=unit;
  $('tgtIn').value=cur!=null?Math.round(cur):'';
  $('sheetCur').textContent=cur!=null?`${T('cur_price')}: ${f(cur)}`:'';
  $('sheetNote').textContent='';
}
function openSheet(){ state.alertDir='above'; state.alertAsset=state.asset;
  renderAlertAssets(); fillAlertSheet(); updateDirSeg(); haptic();
  $('sheet').classList.add('on'); lockScroll(true); }
// Smooth dismiss for any slide-up sheet: animate it down, then hide.
function dismissSheet(id){ const el=$(id); if(!el.classList.contains('on'))return;
  el.classList.add('closing'); lockScroll(false);
  setTimeout(()=>el.classList.remove('on','closing','tall'),300); }
function closeSheet(){ dismissSheet('sheet'); }
/* ── draggable sheets (Claude-style): grab the handle and the sheet follows the finger.
   Pull down past the threshold (or flick) → dismiss. Pull up → expand to the tall state. ── */
function initSheetDrag(id, closeFn){
  const sheet=$(id); if(!sheet) return;
  const card=sheet.querySelector('.sheet-card'), grab=sheet.querySelector('.sheet-grab');
  if(!card||!grab) return;
  let y0=0, dy=0, dragging=false, t0=0;
  grab.addEventListener('pointerdown',e=>{
    dragging=true; y0=e.clientY; dy=0; t0=performance.now();
    card.style.transition='none';
    try{grab.setPointerCapture(e.pointerId);}catch(_){}
    e.preventDefault();
  });
  grab.addEventListener('pointermove',e=>{
    if(!dragging) return;
    dy=e.clientY-y0;
    card.style.transform=`translateY(${dy>0?dy:Math.max(dy*.3,-26)}px)`;   // free downward, resisted upward
  });
  const end=()=>{
    if(!dragging) return; dragging=false;
    const vel=dy/Math.max(performance.now()-t0,1);
    card.style.transition='transform .3s cubic-bezier(.2,.7,.2,1)';
    card.style.transform='';
    if(dy>110||vel>.55){ card.style.transition=''; closeFn(); }
    else if(dy<-40){ sheet.classList.add('tall'); haptic(); }
    setTimeout(()=>{card.style.transition='';},320);
  };
  grab.addEventListener('pointerup',end);
  grab.addEventListener('pointercancel',end);
}
initSheetDrag('muchaSheet',closeMucha);
initSheetDrag('bankSheet',closeBank);
initSheetDrag('sheet',()=>dismissSheet('sheet'));
initSheetDrag('shareSheet',()=>dismissSheet('shareSheet'));
function updateDirSeg(){ $('dirSeg').querySelectorAll('button').forEach(b=>{
  b.className=(b.dataset.d===state.alertDir)?('on '+(state.alertDir==='above'?'up':'down')):''; }); }
async function saveAlert(){ const k=state.alertAsset||state.asset, g=isGlobal(k), a=ASSETS[k], target=parseFloat($('tgtIn').value);
  if(!target||target<=0){ $('sheetNote').textContent=T('toast_fail'); return; }
  haptic();
  const body={asset:k, city:g?null:(a.hasCity?state.city:null), direction:state.alertDir, target};
  try{ const r=await fetch('/api/alerts',{method:'POST',headers:authHeaders(true),body:JSON.stringify(body)});
    if(r.status===401){ let j={}; try{ j=await r.json(); }catch(_){}
      $('sheetNote').textContent=T('auth_needed')+(j.detail?(' · '+j.detail):''); return; }
    if(r.status===429){ $('sheetNote').textContent=T('limit_reached'); return; }
    if(r.ok){ closeSheet(); toast(T('toast_set'),'ok'); loadAlerts(); }
    else { let j={}; try{ j=await r.json(); }catch(_){}
      const why=[j.error, j.detail].filter(Boolean).join(' · ');
      $('sheetNote').textContent=T('toast_fail')+(why?' · '+why:` (HTTP ${r.status})`); }
  }catch(e){ $('sheetNote').textContent=T('toast_fail')+' · '+(e&&e.message||'network'); } }

/* ---- share the live board as an image (bot DMs it to the user) ---- */
// A shareable text snapshot of the current rates — works on any platform.
function ratesSnapshot(){ const ar=state.lang==='ar', L=[ar?'📊 أسعار اليوم — دينارتشي':'📊 نرخی ئەمڕۆ — دینارچی',''];
  const usd=current('USD100',state.city); if(usd) L.push(`💵 ${aName(ASSETS.USD100)} ${cityName(state.city)}: ${fmt(usd.value)}`);
  const g=current('XAU_MITHQAL_24',null); if(g) L.push(`🥇 ${aName(ASSETS.XAU_MITHQAL_24)}: ${fmt(g.value)}`);
  const eur=current('EUR100',state.city); if(eur) L.push(`💶 ${aName(ASSETS.EUR100)}: ${fmt(eur.value)}`);
  L.push('','t.me/dinarchi_bot'); return L.join('\n'); }
// Send the live card as a real PHOTO to friends. On Telegram (your audience) this
// uses Telegram's OWN chat picker (shareMessage) — the actual photo, no OS popup.
// Falls back to the curated sheet on non-Telegram / older clients.
async function shareRatesSmart(){ haptic();
  if(tg && tg.shareMessage && tg.isVersionAtLeast && tg.isVersionAtLeast('8.0')){
    try{ toast(T('sharing'));
      const j=await fetch('/api/prepare_share',{method:'POST',headers:authHeaders(true),body:'{}'}).then(r=>r.json());
      if(j && j.id){ tg.shareMessage(j.id, ok=>{ if(ok) toast(T('toast_shared'),'ok'); }); return; }
    }catch(e){}
  }
  openShareSheet();   // fallback: curated sheet (link preview + bot-DM photo)
}
// Your curated share sheet. Each icon shares a LINK that previews as the live
// card IMAGE (Open Graph /card page) — a share-URL can't carry a file, so this
// is how friends see the photo on Telegram/WhatsApp/X. The card page then sends
// them on to the bot. No surprise native popup.
// Per-minute token (not per-day) so Telegram/WhatsApp refetch a FRESH card preview
// instead of serving the one they cached earlier today (the old design).
function cardShareUrl(){ return location.origin+'/card?v='+Math.floor(Date.now()/60000); }
// build 133: the sheet matches the light sample: a live mini card on top, round tinted buttons with labels
const SH_TINT={telegram:['#E6F2FB','#1D74B8'],whatsapp:['#E5F6EC','#14804A'],x:['#F0EDE7','#111111'],messenger:['#EEEAFB','#5B3FD1'],copy:['#F0EDE7','#111111']};
function renderSharePreview(){ const el=$('shPrev'); if(!el) return;
  const c=state.city, u=current('USD100',c); if(!u){ el.hidden=true; return; } el.hidden=false;
  const d=new Date(), dd=`${pad2(d.getDate())} / ${pad2(d.getMonth()+1)} / ${d.getFullYear()}`;
  const dl=u.delta||0, pill=Math.round(dl)?`<span class="shp-d ${dl>0?'up':'down'}">${dl>0?'▲ +':'▼ −'}${fmt(Math.abs(dl))}</span>`:'';
  el.innerHTML=`<div class="shp-top"><span class="shp-brand"><b>دینار</b><i>چی</i></span><span class="shp-date">${dd}</span></div>`+
    `<img class="shp-art" src="/static/art/usd-lg.webp?v=133" alt="">`+
    `<div class="shp-lbl">${state.lang==='ar'?'100 دولار':'100 دۆلار'} · ${esc(cityName(c))}</div><div class="shp-val">${fmt(u.value)}</div>${pill}`; }
function openShareSheet(){ haptic(); const link=cardShareUrl(), text=ratesSnapshot(); renderSharePreview();
  $('shareRow').innerHTML=SHARE.map(s=>{ const t=SH_TINT[s.k]||['#F0EDE7','#111111'];
    return `<button data-k="${s.k}"><span class="shr-ic" style="background:${t[0]};color:${t[1]}"><svg viewBox="0 0 24 24">${s.ic}</svg></span><span class="shr-l">${T('sh_'+s.k)}</span></button>`; }).join('');
  $('shareRow').querySelectorAll('button').forEach(b=>b.onclick=()=>{ haptic(); const s=SHARE.find(x=>x.k===b.dataset.k);
    if(s.copy){ try{navigator.clipboard.writeText(text+'\n'+link);}catch(e){} toast(T('copied'),'ok'); } else openLink(s.u(link,text)); });
  $('shareSheet').classList.add('on'); lockScroll(true); }
// Secondary option: the bot DMs the rendered image card to the user's own chat.
async function shareRatesImage(){ haptic(); dismissSheet('shareSheet'); toast(T('sharing'));
  try{ const r=await fetch('/api/share',{method:'POST',headers:authHeaders()});
    if(r.status===401){ toast(T('auth_needed'),'err'); return; }
    const j=await r.json(); toast(j.ok?T('toast_shared'):T('toast_fail'), j.ok?'ok':'err');
  }catch(e){ toast(T('toast_fail'),'err'); } }

// Bell is contextual: with unread notifications it rings + badges and opens the
// alerts tab to read them; otherwise it's the quick "set an alert for this asset".
$('heroBell').onclick=()=>{ if(unreadAlerts().length){ haptic(); showScreen('alerts'); } else openSheet(); };
$('newAlert').onclick=openSheet;
// Share button opens the multi-platform sheet (Telegram, WhatsApp, X, Facebook,
// copy) — each shares the card link that previews as the live price photo.
$('shareBtn').onclick=openShareSheet;
$('shareBg').onclick=()=>dismissSheet('shareSheet'); $('shareClose').onclick=()=>dismissSheet('shareSheet');
$('shareImg').onclick=shareRatesImage;
$('sheetBg').onclick=closeSheet; $('sheetClose').onclick=closeSheet;
$('dirSeg').querySelectorAll('button').forEach(b=>b.onclick=()=>{state.alertDir=b.dataset.d;haptic();updateDirSeg();});
document.querySelectorAll('.tgt .step').forEach(b=>b.onclick=()=>{const cur=parseFloat($('tgtIn').value)||0;
  $('tgtIn').value=Math.max(0,cur+stepFor(state.alertAsset||state.asset)*(+b.dataset.step));});
$('saveAlert').onclick=saveAlert;

/* ---- private per-user store (Telegram CloudStorage → localStorage) ---- */
// CloudStorage needs Bot API 6.9+; on older clients it errors and never calls
// back, so gate on the version and fall back to localStorage cleanly.
const cloudOK=(()=>{ try{ return !!(tg?.CloudStorage && tg.isVersionAtLeast && tg.isVersionAtLeast('6.9')); }catch(_){ return false; } })();
const Store={
  get(k){ return new Promise(res=>{ if(cloudOK){ try{ tg.CloudStorage.getItem(k,(e,v)=>res(e?null:(v??null))); return; }catch(_){} }
    try{ res(localStorage.getItem(k)); }catch(_){ res(null); } }); },
  set(k,v){ if(cloudOK){ try{ tg.CloudStorage.setItem(k,String(v),()=>{}); return; }catch(_){} }
    try{ localStorage.setItem(k,String(v)); }catch(_){} }
};
const bgToday=()=>{ try{ return new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Baghdad'}); }catch(e){ return new Date().toISOString().slice(0,10); } };

/* ---- "since you last checked" ----
   The old localStorage daily-check-in streak lived here. It was never called, and the card's
   prediction streak is now THE streak — an earned one, not a counter for opening the app. */
async function renderSince(){
  if(state._sinceDone) return; const r=current('USD100','sulaymaniyah'); if(!r) return;
  state._sinceDone=true;
  const prev=parseFloat(await Store.get('lastUsd')||'');
  if(prev && Math.abs(r.value-prev)>=1){ const d=r.value-prev, up=d>0;
    $('sinceLine').innerHTML=`<span data-t="since_label">${T('since_label')}</span><b class="${up?'up':'down'}">${up?'▲ +':'▼ −'}${fmt(Math.abs(d))}</b>`;
    $('sinceLine').classList.add('on');
  }
  Store.set('lastUsd', Math.round(r.value));
}

/* ---- market pulse strip (real signals, rotating) ---- */
const PICN={
  up:'<path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/>',
  down:'<path d="M3 7l6 6 4-4 8 8"/><path d="M21 17v-6h-6"/>',
  spread:'<path d="M4 12h16M7 8l-4 4 4 4M17 8l4 4-4 4"/>',
};
function assetShort(code){ const a=ASSETS[code]; return a?aName(a):code; }
function formatPulse(s){ const ar=state.lang==='ar', pn=n=>`<span class="pn">${fmt(n)}</span>`;
  if(s.type==='high'||s.type==='low'){ const nm=assetShort(s.asset)+(s.city?(' '+cityName(s.city)):'');
    const w = s.type==='high' ? (ar?'أعلى':'بەرزترین') : (ar?'أدنى':'نزمترین');
    const html = ar ? `${w} سعر <b>${nm}</b> خلال ${s.days} يوم` : `<b>${w}</b>ی ${nm} لە ${s.days} ڕۆژدا`;
    return {icon:s.type==='high'?PICN.up:PICN.down, html}; }
  if(s.type==='spread'){ const lo=cityName(s.lo_city),hi=cityName(s.hi_city);
    const html = ar ? `الدولار أرخص في <b>${lo}</b> بفارق ${pn(s.gap)} عن ${hi}` : `دۆلار لە <b>${lo}</b> هەرزانترە — ${pn(s.gap)} دینار جیاوازی لەگەڵ ${hi}`;
    return {icon:PICN.spread, html}; }
  if(s.type==='streak'){ const nm=assetShort(s.asset), up=s.dir==='up';
    const html = ar ? `<b>${nm}</b> ${up?'يرتفع':'ينخفض'} منذ ${s.days} أيام` : `<b>${nm}</b> ${s.days} ڕۆژە ${up?'بەرزدەبێتەوە':'نزم دەبێتەوە'}`;
    return {icon:up?PICN.up:PICN.down, html}; }
  return null;
}
let pulseIdx=0, pulseTimer=null;
async function loadPulse(){ try{ const j=await fetch('/api/pulse').then(r=>r.json()); state.pulse=j.signals||[]; pulseIdx=0; renderPulse(); }catch(e){} }
function renderPulse(){ const wrap=$('pulse');
  if(!state.pulse.length){ wrap.classList.remove('on'); clearInterval(pulseTimer); return; }
  wrap.classList.add('on');
  const draw=()=>{ const s=state.pulse[pulseIdx%state.pulse.length], f=formatPulse(s); if(!f)return;
    const dots = state.pulse.length>1 ? `<div class="pdots">${state.pulse.map((_,i)=>`<i class="${i===pulseIdx%state.pulse.length?'on':''}"></i>`).join('')}</div>`:'';
    wrap.innerHTML=`<div class="pic">${svgIcon(f.icon)}</div><div class="ptxt pin">${f.html}</div>${dots}`; };
  draw(); clearInterval(pulseTimer);
  if(state.pulse.length>1) pulseTimer=setInterval(()=>{pulseIdx++;draw();},5000);
}

/* ---- crowd sentiment gauge + watching-today ---- */
async function loadSentiment(){ try{ state.sentiment=await fetch('/api/sentiment',{headers:authHeaders()}).then(r=>r.json()); renderSentiment(); }catch(e){} }
function moodPolar(deg){ const cx=120,cy=120,r=92,a=deg*Math.PI/180; return [cx+r*Math.cos(a), cy-r*Math.sin(a)]; }
function moodPts(to){ let s=''; for(let p=0;p<=to;p++){ const q=moodPolar(180-(p/100)*180); s+=q[0].toFixed(1)+','+q[1].toFixed(1)+' '; } return s.trim(); }
function setMood(pct){ const val=$('moodVal'),dot=$('moodDot'); if(!val)return;
  if($('moodTrack') && !$('moodTrack')._init){ $('moodTrack').setAttribute('points',moodPts(100)); $('moodTrack')._init=true; }
  const apply=c=>{ val.setAttribute('points',moodPts(c)); const d=moodPolar(180-(c/100)*180); dot.setAttribute('transform',`translate(${d[0].toFixed(1)} ${d[1].toFixed(1)})`); };
  const from=setMood._cur??pct; setMood._cur=pct;
  cancelAnimationFrame(setMood._raf); clearTimeout(setMood._to);
  const t0=performance.now(),dur=850;
  const step=t=>{ const k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3); apply(from+(pct-from)*e); if(k<1) setMood._raf=requestAnimationFrame(step); };
  apply(from); setMood._raf=requestAnimationFrame(step); setMood._to=setTimeout(()=>apply(pct),dur+80); }
function renderSentiment(){ const s=state.sentiment; if(!s)return;
  if(s.day_ku||s.day_ar) $('crowdQ').textContent=T('crowd_q').replace('{day}', state.lang==='ar'?(s.day_ar||'اليوم'):(s.day_ku||'ئەمڕۆ'));
  const tot=s.total||0, upPct=tot?Math.round(s.up/tot*100):50, dnPct=100-upPct;
  const voted=!!s.my; $('crowd').classList.toggle('voted',voted);
  $('voteUp').classList.toggle('on',s.my==='up'); $('voteDn').classList.toggle('on',s.my==='down');
  if(voted){ const up=s.my==='up';
    countUp($('duelUP'),upPct,'%'); countUp($('duelDP'),dnPct,'%');
    // liquids pour in on the next frame so the width transition actually runs
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      $('duelBU').style.width=`calc(${upPct}% - 4px)`;
      $('duelBD').style.width=`calc(${dnPct}% - 4px)`;
      $('duelDV').style.right=upPct+'%';
    }));
    $('duelU').classList.toggle('win',upPct>=50);
    $('duelU').parentElement.querySelector('.side.d').classList.toggle('win',dnPct>50);
  }
  renderVoteResult(s);
  $('crowdTot').textContent=tot?T('votes_total').replace('{n}',fmt(tot)):T('be_first');
}
/* ══════════ the streak — the retention loop ══════════════════════════════════════════════
   The card leads with a claim about a session that was already RESOLVED and can be proven
   (sentiment_score.py scores a session once, then it is immutable), and pays the voter for
   coming back: the sentence reveals, a seed flame pops at its end, flies, and ignites the
   dead streak. A wrong call is the deliberate mirror. Every number here — streak, accuracy,
   the judged session — comes from /api/sentiment `record`; nothing is derived or invented.

   TRAPS THAT COST A SESSION TO FIND, DO NOT RE-LEARN THEM:
   1. The sentence is REVEALED, not typed. Arabic and Kurdish are cursive — appending
      characters re-shapes the preceding letter every frame and the whole line jitters. The
      text is laid out in full and revealed right-to-left via clip-path with a caret riding
      the edge. Looks like typing; the typography is never wrong.
   2. Grey→gold is a MASK reveal. With viewBox `160 -880 640 800` the mask rect's BOTTOM edge
      must sit at y=-80, so y = -80 - h. Any other origin parks the rect outside the artwork
      and the gold can never appear — the flame just silently stays grey.
   3. Nothing may be scheduled with a delay if its starting value is not already the resting
      state. An animation that writes its from-value on creation parks that value on screen
      for the whole delay (this is how a gold ring used to sit inside the grey flame from the
      moment the vote was cast). `tween` below writes nothing until its delay has elapsed.
   4. Every inline SVG string needs xmlns — DOMParser reads image/svg+xml, and without the
      namespace the nodes are not SVG at all.
   5. The flown seed is hidden with visibility, never display (display pulls the box out of
      the flex row and the sentence slides) and never opacity (the pop tween is still
      settling and would stamp it back). `.mark:empty` collapses the slot on a wrong call. */
const SVGNS='http://www.w3.org/2000/svg';
const svgFrom=m=>document.importNode(
  new DOMParser().parseFromString(m,'image/svg+xml').documentElement,true);
/* Material Symbols local_fire_department, rounded+filled, viewBox cut TIGHT to the glyph.
   The stock viewBox carries ~200u of padding above the flame, which made it float and never
   align with the numeral beside it. */
const F_OUT='M480-80q-134 0-227-93t-93-227q0-113 67-217t184-182q22-15 45.5-1.5T480-760v52'
 +'q0 34 23.5 57t57.5 23q17 0 32.5-7.5T621-657q8-10 20.5-12.5T665-664q63 45 99 115t36 149'
 +'q0 88-43 160.5T644-125q17-24 26.5-52.5T680-238q0-40-15-75.5T622-377L480-516 339-377'
 +'q-29 29-44 64t-15 75q0 32 9.5 60.5T316-125q-70-42-113-114.5T160-400Z';
const F_IN='M480-404l85 83q17 17 26 38t9 45q0 49-35 83.5T480-120q-50 0-85-34.5T360-238'
 +'q0-23 9-44.5t26-38.5l85-83Z';
const F_VB='160 -880 640 800';
const FLAME_ART='/static/art/flame.webp?v=133';
const flameSVG=()=>'<svg xmlns="'+SVGNS+'" viewBox="'+F_VB+'">'
 +'<defs><linearGradient id="stGrad" x1="0" y1="0" x2=".3" y2="1">'
 +'<stop offset="0" stop-color="#f3d489"/><stop offset="1" stop-color="#d9a642"/></linearGradient>'
 +'<mask id="stMaskDef"><rect id="stMask" x="160" y="-80" width="640" height="0" fill="#fff"/>'
 +'</mask><filter id="stGrey"><feColorMatrix type="saturate" values="0"/></filter></defs>'
 // build 133: the 3D flame, greyed until the streak's mask fills it with colour
 +'<g class="anim" id="stBody"><image href="'+FLAME_ART+'" x="160" y="-880" width="640" height="800" preserveAspectRatio="xMidYMax meet" filter="url(#stGrey)" opacity=".55"/>'
 +'<g mask="url(#stMaskDef)"><image href="'+FLAME_ART+'" x="160" y="-880" width="640" height="800" preserveAspectRatio="xMidYMax meet"/></g></g>'
 +'<g id="stSparks"></g><circle id="stRing" cx="480" cy="-420" r="240" fill="none"'
 +' stroke="#f3d489" stroke-width="30" opacity="0"/></svg>';
const seedSVG=id=>'<svg xmlns="'+SVGNS+'" viewBox="'+F_VB+'">'
 +'<defs><linearGradient id="sg'+id+'" x1="0" y1="0" x2=".3" y2="1">'
 +'<stop offset="0" stop-color="#f3d489"/><stop offset="1" stop-color="#d9a642"/></linearGradient></defs>'
 +'<g class="anim"><path d="'+F_OUT+'" fill="url(#sg'+id+')"/><path d="'+F_IN+'" fill="#0f131c"/></g></svg>';

/* A local tween. The app carries no animation library and this card is not worth 118KB of
   one. Crucially it writes NOTHING before `delay` has elapsed — see trap 3. */
const EZ={lin:t=>t, o2:t=>1-(1-t)*(1-t), o3:t=>1-Math.pow(1-t,3), i2:t=>t*t,
  io2:t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,
  spring:t=>t>=1?1:1-Math.exp(-6.2*t)*Math.cos(9.4*t)};
function tween(ms,ease,onUpdate,delay,onDone){
  const e=EZ[ease]||EZ.o2, t0=performance.now()+(delay||0);
  (function step(now){
    if(now<t0){ requestAnimationFrame(step); return; }
    const k=Math.min(1,(now-t0)/ms); onUpdate(e(k),k);
    if(k<1) requestAnimationFrame(step); else if(onDone) onDone();
  })(performance.now());
}
function maskTo(to,ms,ease,delay){
  const r=$('stMask'), from=parseFloat(r.getAttribute('height'))||0;
  tween(ms,ease,p=>{ const h=from+(to-from)*p;
    r.setAttribute('height',h.toFixed(1)); r.setAttribute('y',(-80-h).toFixed(1)); },delay);
}
function sparks(n,down,delay){
  const host=$('stSparks'); host.replaceChildren();
  for(let i=0;i<n;i++){
    const a=(down?30+i*(120/(n-1)):-150+i*(300/(n-1)))*Math.PI/180;
    const c=document.createElementNS(SVGNS,'circle'), r0=30-(i%3)*7;
    c.setAttribute('cx',480); c.setAttribute('cy',-420); c.setAttribute('r',r0);
    c.setAttribute('fill',down?'#6b7382':'#f7dda0'); c.setAttribute('opacity','0');
    host.appendChild(c);
    const dist=260+(i%3)*80, peak=down?.8:1;
    tween((down?900:780)+(i%3)*130,'o2',p=>{
      c.setAttribute('opacity',(p<.25?peak*p/.25:peak*(1-(p-.25)/.75)).toFixed(3));
      c.setAttribute('r',(r0*(1-.7*p)).toFixed(1));
      c.setAttribute('transform','translate('+(Math.cos(a)*dist*p).toFixed(1)+','
        +(Math.sin(a)*dist*p+(down?140:-110)*p).toFixed(1)+')');
    },delay+i*(down?38:26));
  }
}
function fillVerdict(won){
  const t=$('vrTxt'); t.replaceChildren();
  const b=document.createElement('b'); b.textContent=T(won?'vres_right':'vres_wrong');
  t.append(document.createTextNode(T('vres_pre')+' '),b);
}
function fillAcc(r){
  const el=$('vrAcc'); el.replaceChildren();
  if(!r||r.accuracy==null) return;
  const b=document.createElement('b'); b.textContent=r.accuracy+'%';
  el.append(b,document.createTextNode(' '+T('vres_acc')));
}
function setStreak(n,lit){
  const r=$('stMask');
  r.setAttribute('height',lit?'800':'0'); r.setAttribute('y',lit?'-880':'-80');
  $('crowd').classList.toggle('lit',!!lit);
  const sn=$('streakN');
  sn.textContent=n; sn.style.opacity=(lit&&n>0)?1:0; sn.style.transform='none';
}
/* The reveal belongs to the JUDGED SESSION, not to the tap that happened to be in flight.
   A session resolves on its own schedule — often AFTER the vote that predicted the next one.
   When that happens the verdict text turns up on a later open while the flame is already
   sitting at its end state, and the drain the sentence is describing is never shown at all.
   Keyed by period and persisted, so it plays exactly once: on the vote when the verdict is
   already in, on the next open when it landed later. */
function verdictKey(s){ const l=s&&s.record&&s.record.last; return (l&&l.period)||null; }
// undefined = Store hasn't answered yet. Never reveal before then, or a hydration race
// replays a verdict the voter already watched.
function streakSeen(k){ return state._streakSeen===undefined || !k || state._streakSeen===k; }
function markStreakSeen(k){ state._streakSeen=k; Store.set('streakSeen',k); }

/* The run a wrong call destroyed. record.streak is already 0 by then, so the length has to
   come from the history BEFORE the judged session (index 0 is that session itself). */
function preLossStreak(r){
  const h=(r&&r.history)||[]; let n=0;
  for(let i=1;i<h.length;i++){ if(!h[i].correct) break; n++; }
  return n;
}
function typeLine(start,ms){
  const txt=$('vrTxt'), caret=$('vrCaret'), w=txt.getBoundingClientRect().width;
  setTimeout(()=>{ caret.style.opacity=1; caret.classList.add('on'); },Math.max(0,start-90));
  tween(ms,'lin',p=>{ txt.style.clipPath='inset(0 0 0 '+((1-p)*100).toFixed(2)+'%)';
    caret.style.right=(w*p).toFixed(1)+'px'; },start);
  setTimeout(()=>{ caret.classList.remove('on');
    tween(260,'o2',p=>caret.style.opacity=(1-p).toFixed(3)); },start+ms+120);
}

/* Resting state — what the card looks like on any ordinary render. Deliberately NOT lit
   before this session's vote: the streak reads as dead until the voter comes back, which is
   the whole point of the ignition. */
function renderVoteResult(s){
  if(state._streakPlaying) return;                 // never fight the sequence mid-flight
  const el=$('voteRes'), r=s.record||null, last=r&&r.last, acc=$('vrAcc');
  const mark=$('vrMark');
  mark.replaceChildren(); mark.style.visibility=''; mark.style.opacity=0;
  $('vrFlyer').style.opacity=0; $('vrPlus').style.opacity=0;
  $('vrTxt').style.clipPath='none'; $('vrCaret').style.opacity=0;
  $('stBody').style.transform='';
  if(!last){                                       // nothing judged yet → make no claim
    el.classList.remove('open','bad'); acc.replaceChildren(); acc.style.opacity=0;
    setStreak(0,false); return;
  }
  const won=!!last.correct, voted=!!s.my;
  const key=verdictKey(s);
  if(voted && !streakSeen(key)){        // verdict the voter has not been shown yet → reveal it
    markStreakSeen(key);
    state._streakPlaying=true;
    el.classList.remove('open');        // playStreak opens the row on its own beat
    playStreak(); return;
  }
  el.classList.toggle('bad',!won); fillVerdict(won); el.classList.toggle('open',voted);
  fillAcc(r); acc.style.opacity=voted?1:0;
  const n=r.streak||0;
  setStreak(n,voted&&n>0);
}

/* The sequence. Runs ONCE, on the vote that just landed. */
const FLY_MS=520, FLY_LIFT=30;
function playStreak(){
  const s=state.sentiment, r=s&&s.record, last=r&&r.last;
  if(!last){ state._streakPlaying=false; return; }
  const won=!!last.correct, el=$('voteRes'), card=$('crowd'), mark=$('vrMark'), acc=$('vrAcc');
  el.classList.toggle('bad',!won); fillVerdict(won); fillAcc(r); acc.style.opacity=0;
  if(won){ mark.replaceChildren(svgFrom(seedSVG('sd'))); mark.style.visibility=''; mark.style.opacity=0; }
  else mark.replaceChildren();
  const pre=won?0:preLossStreak(r);
  setStreak(won?0:pre, !won&&pre>0);

  setTimeout(()=>el.classList.add('open'),900);
  const chars=($('vrTxt').textContent||'').trim().length;
  const TYPE_MS=Math.round(chars*34), TYPED=1150+TYPE_MS, POP=TYPED+1000, POP_MS=760;
  typeLine(1150,TYPE_MS);
  if(won) tween(POP_MS,'spring',p=>{
    mark.style.opacity=Math.min(1,p*1.6).toFixed(3);
    mark.style.transform='scale('+(.2+.8*p).toFixed(3)+') rotate('+(-22+22*p).toFixed(2)+'deg)';
  },POP);

  const ACT=POP+(won?POP_MS+1000:1100);            // a full second AFTER the pop has settled
  if(won) ignite(card,r.streak||1,ACT);
  else if(pre>0) drain(card,pre,ACT);
  else { tween(420,'o3',p=>acc.style.opacity=p.toFixed(3),ACT);
         setTimeout(()=>{ state._streakPlaying=false; },ACT+500); }
}
/* تیشک — a launch, an arc, and a hard arrival. Everything is measured at take-off: measured
   at vote time instead, the seed's box is read while the verdict row is still collapsed and
   the flyer visibly jumps to that stale spot before it flies. */
function ignite(card,to,T0){
  const mark=$('vrMark'), f=$('vrFlyer'), sn=$('streakN'), p1=$('vrPlus');
  f.replaceChildren(svgFrom(seedSVG('fl')));
  setTimeout(()=>{
    const cr=card.getBoundingClientRect(), sb=mark.getBoundingClientRect(),
          e=$('streakIco').getBoundingClientRect();
    f.style.left=(sb.left-cr.left)+'px'; f.style.top=(sb.top-cr.top)+'px';
    const dx=(e.left-sb.left)+(e.width-sb.width)/2, dy=(e.top-sb.top)+(e.height-sb.height)/2;
    mark.style.visibility='hidden'; f.style.opacity=1;   // hand over on the measured frame
    tween(FLY_MS,'i2',p=>{
      const x=dx*p, y=dy*p-FLY_LIFT*Math.sin(Math.PI*p);
      const vy=dy-FLY_LIFT*Math.PI*Math.cos(Math.PI*p);  // tangent of that arc
      const ang=Math.atan2(vy,dx)*180/Math.PI+90, st=1+.5*p*p;
      f.style.transform='translate('+x.toFixed(2)+'px,'+y.toFixed(2)+'px) rotate('
        +ang.toFixed(2)+'deg) scaleY('+st.toFixed(3)+') scaleX('+(1/st).toFixed(3)+')';
    });
  },T0);

  const HIT=T0+FLY_MS;
  setTimeout(()=>{
    f.style.opacity=0;
    maskTo(800,260,'o2',0);                        // gold floods up from the flame's foot
    const rg=$('stRing');                          // built here, never scheduled (trap 3)
    tween(720,'o2',p=>{ rg.setAttribute('opacity',(.85*(1-p)).toFixed(3));
      rg.setAttribute('r',(130+430*p).toFixed(0));
      rg.setAttribute('stroke-width',(30-29*p).toFixed(1)); });
    tween(560,'lin',p=>$('stBody').style.transform='scale('+(1+.42*Math.sin(Math.PI*p)).toFixed(3)+')');
    sparks(7,false,40);
    haptic();
  },HIT);
  setTimeout(()=>{
    const cr=card.getBoundingClientRect(), sr=sn.getBoundingClientRect();
    p1.textContent='+1'; p1.classList.remove('minus');
    p1.style.left=(sr.left-cr.left-3)+'px'; p1.style.top=(sr.top-cr.top-3)+'px';
    tween(900,'o2',p=>{ p1.style.opacity=(p<.2?p/.2:(1-(p-.2)/.8)).toFixed(3);
      p1.style.transform='translateY('+(4-30*p).toFixed(2)+'px) scale('+(.7+.45*Math.min(p*2,1)).toFixed(3)+')'; });
  },HIT+90);
  setTimeout(()=>{
    const from=Math.max(0,to-1);
    sn.textContent=to>1?from:to;
    tween(460,'o3',p=>{ sn.style.opacity=p.toFixed(3);
      sn.style.transform='translateY('+((1-p)*7).toFixed(2)+'px)'; });
    if(to>1) tween(520,'o3',p=>sn.textContent=Math.round(from+(to-from)*p));
  },HIT+200);
  // the idle flicker only takes over once the impact pop has returned to scale 1, or the CSS
  // animation (which outranks the inline transform) would cut it off mid-bump
  setTimeout(()=>{ $('stBody').style.transform=''; card.classList.add('lit'); },HIT+560);
  tween(420,'o3',p=>$('vrAcc').style.opacity=p.toFixed(3),HIT+600);
  setTimeout(()=>{ state._streakPlaying=false; },HIT+1600);
}
/* the mirror: the flame gutters, the gold drains top-down, the run falls to zero */
function drain(card,pre,T0){
  const sn=$('streakN'), p1=$('vrPlus');
  tween(900,'io2',p=>{ const k=Math.sin(Math.PI*p);
    $('stBody').style.transform='scaleY('+(1+.14*k).toFixed(3)+') scaleX('+(1-.07*k).toFixed(3)+')'; },T0);
  maskTo(0,760,'io2',T0+180);
  setTimeout(()=>card.classList.remove('lit'),T0+180);
  sparks(6,true,T0+300);
  setTimeout(()=>{
    const cr=card.getBoundingClientRect(), sr=sn.getBoundingClientRect();
    p1.textContent='−'+pre; p1.classList.add('minus');
    p1.style.left=(sr.left-cr.left-9)+'px'; p1.style.top=(sr.top-cr.top-3)+'px';
    tween(1000,'o2',p=>{ p1.style.opacity=(p<.2?p/.2:(1-(p-.2)/.8)).toFixed(3);
      p1.style.transform='translateY('+(-2+24*p).toFixed(2)+'px) scale('+(.8+.3*Math.min(p*2,1)).toFixed(3)+')'; });
  },T0+220);
  tween(820,'io2',p=>sn.textContent=Math.round(pre*(1-p)),T0+220);
  tween(420,'o3',p=>sn.style.opacity=(1-p).toFixed(3),T0+1000);
  tween(420,'o3',p=>$('vrAcc').style.opacity=p.toFixed(3),T0+1200);
  setTimeout(()=>{ $('stBody').style.transform=''; state._streakPlaying=false; },T0+1700);
}
$('streakIco').replaceChildren(svgFrom(flameSVG()));
async function vote(choice){ if(state.sentiment&&state.sentiment.my)return; haptic();
  try{ const j=await fetch('/api/sentiment',{method:'POST',headers:authHeaders(true),body:JSON.stringify({choice})}).then(r=>r.json());
    // the POST carries no `record` — the pre-vote one still stands, and it is what the
    // sequence is about: how the LAST judged session went, not the one just voted on
    if(j.ok){ state.sentiment={...state.sentiment,...j};
      const key=verdictKey(state.sentiment);
      const fresh=!j.locked&&!streakSeen(key); state._streakPlaying=fresh;
      if(fresh) markStreakSeen(key);       // claim it before the render, so only one path reveals
      renderSentiment();
      if(fresh) playStreak();
      toast(T('toast_voted'),'ok'); }
    else if(j.error==='auth') toast(T('auth_needed'),'err');
    else toast(T('toast_fail')+(j.detail?(' · '+j.detail):(j.error?(' · '+j.error):'')),'err');
  }catch(e){ toast(T('toast_fail'),'err'); } }
$('voteUp').onclick=()=>vote('up'); $('voteDn').onclick=()=>vote('down');
// Session tracking: one open + a heartbeat every 20s while visible, plus a final
// ping when the app is hidden/closed → powers time-in-app + opens-per-user analytics.
const SID=(self.crypto&&crypto.randomUUID)?crypto.randomUUID():(Date.now()+'-'+Math.random().toString(16).slice(2));
// lang rides along on the open so the audience split is measurable for EVERY user, not just the
// ~10% who ever answered the bot's language prompt (user 2026-08-07).
function appBeat(open){ try{ fetch(open?'/api/open':'/api/ping',{method:'POST',headers:authHeaders(true),body:JSON.stringify({sid:SID,lang:state.lang})}); }catch(e){} }
appBeat(true);
setInterval(()=>{ if(document.visibilityState==='visible') appBeat(false); }, 20000);
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') appBeat(false); });
window.addEventListener('pagehide',()=>appBeat(false));

// dwell-time tracking: how long the user spends on each tab/section. Segments are buffered
// and flushed BATCHED (every 25s + on hide via sendBeacon) — never one request per tap.
let _tvView=null,_tvStart=0,_tvBuf=[];
function _tvSeg(){ if(_tvView){ const s=(Date.now()-_tvStart)/1000; if(s>=1&&s<7200)_tvBuf.push({v:_tvView,s:Math.round(s)}); _tvStart=Date.now(); } }
function track(view){ _tvSeg(); _tvView=view; _tvStart=Date.now(); }   // switch view, closing the previous segment
// WHICH asset someone studies is the sharpest signal of who they are — a money changer lives
// on the dollar, a jeweller on gold. Pushed straight into the batched dwell buffer as a 1s
// MARKER instead of calling track(): track() would switch the active view, so the market
// tab's dwell time would silently start landing under `asset:*` and the existing
// attention series would break. This way we get per-asset OPEN COUNTS and tab:market keeps
// meaning what it has always meant. Costs no extra request — it flushes with the batch.
function trackAsset(code){ if(code) _tvBuf.push({v:'asset:'+code, s:1}); }
// a one-off action marker: counted as «this person did X», without moving the screen-time clock
function trackMark(v){ if(v) _tvBuf.push({v, s:1}); }
function flushTrack(beacon){ _tvSeg(); if(!_tvBuf.length)return; const body=JSON.stringify({sid:SID,events:_tvBuf.splice(0)});
  try{ if(beacon&&navigator.sendBeacon){ navigator.sendBeacon('/api/track',new Blob([body],{type:'application/json'})); }
       else{ fetch('/api/track',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}); } }catch(e){} }
setInterval(()=>flushTrack(false),25000);
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') flushTrack(true); });
window.addEventListener('pagehide',()=>flushTrack(true));
track('tab:'+((document.querySelector('.screen.on')||{}).id||'scr-market').replace('scr-',''));  // seed the initial view

/* ---- live clock (Baghdad) ---- */
let _clkFmt=null;
function tickClock(){ const el=$('clock'); if(!el) return;
  if(!_clkFmt){ try{ _clkFmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Baghdad',hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}); }
    catch(e){ _clkFmt=new Intl.DateTimeFormat('en-GB',{hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit'}); } }
  const s=_clkFmt.format(new Date()); if(el.textContent!==s) el.textContent=s; }
function secsUntilOpen(){ if(!state.marketHours)return null; const oh=state.marketHours[0];
  const d=new Date(), bgSec=(((d.getUTCHours()+3)%24)*3600 + d.getUTCMinutes()*60 + d.getUTCSeconds()), openSec=oh*3600;
  return bgSec<openSec ? openSec-bgSec : 86400-bgSec+openSec; }
const pad2=n=>String(n).padStart(2,'0');
function updateCountdown(){ const el=$('marketCountdown');
  if(state.marketOpen || !state.marketHours){ el.classList.remove('on'); el._built=false; return; }
  const s=secsUntilOpen(); if(s==null){ el.classList.remove('on'); el._built=false; return; }
  const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=s%60;
  if(!el._built){ el.innerHTML=`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span class="mc-lbl">${T('opens_in')}</span><span class="mc-time odo-fast"><span class="odo-grp" id="mcH"></span><span class="sep">:</span><span class="odo-grp" id="mcM"></span><span class="sep">:</span><span class="odo-grp" id="mcS"></span></span>`;
    el._built=true; el.classList.add('on'); }
  setOdometer($('mcH'),pad2(h)); setOdometer($('mcM'),pad2(m)); setOdometer($('mcS'),pad2(sec)); }
setInterval(tickClock,1000); tickClock();

/* ---- markets browser (search + categories + watchlist) ---- */
let mktCat='all', mktQ='';
async function loadMarkets(){ try{
  const pre=window.__pre&&window.__pre.markets; if(window.__pre) window.__pre.markets=null;
  let j=pre?await pre:null; if(!j) j=await fetch('/api/markets').then(r=>r.json());
  state.markets=j.assets||[]; state.mkByKey={}; state.markets.forEach(a=>state.mkByKey[a.key]=a); }catch(e){} }
function scopeCats(){ const cats=[...new Set(state.markets.filter(a=>a.scope===state.mktScope).map(a=>a.cat))]; return ['all',...cats]; }
function renderScope(){ $('mktScope').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.s===state.mktScope)); }
function openMarkets(){ haptic(); markAddSeen(); const m=$('markets'); m.classList.remove('closing'); m.classList.add('on'); lockScroll(true);
  $('mktSearch').value=''; mktQ=''; mktCat='all'; renderScope(); renderMcats(); renderMlist();
  loadMarkets().then(()=>{ renderMcats(); renderMlist(); renderAssets(); }); $('mktList').scrollTop=0; }
function closeMarkets(){ const m=$('markets'); m.classList.add('closing'); lockScroll(false); setTimeout(()=>m.classList.remove('on','closing'),300); }
// Discoverability: users couldn't find the add-asset "+" (it hides beyond the strip's scroll).
// The header pill is always visible; it pulses gently until the markets browser is opened once.
function markAddSeen(){ try{ Store.set('mktSeen','1'); }catch(e){} $('watchAdd').classList.remove('pulse'); }
$('watchAdd').onclick=openMarkets;
Store.get('mktSeen').then(v=>{ if(!v) $('watchAdd').classList.add('pulse'); });
function renderMcats(){ $('mktCats').innerHTML=scopeCats().map(k=>`<button class="mcat ${k===mktCat?'on':''}" data-k="${k}">${T('cat_'+k)}</button>`).join('');
  $('mktCats').querySelectorAll('.mcat').forEach(b=>b.onclick=()=>{mktCat=b.dataset.k;haptic();renderMcats();renderMlist();}); }
function renderMlist(){ const q=mktQ.trim().toLowerCase();
  let list=state.markets.filter(a=>a.scope===state.mktScope && (mktCat==='all'||a.cat===mktCat));
  if(q) list=list.filter(a=>(a.symbol||'').toLowerCase().includes(q)||Object.values(a.name).some(n=>(n||'').toLowerCase().includes(q)));
  if(!list.length){ $('mktList').innerHTML=`<div class="mkt-empty">${T('no_results')}</div>`; return; }
  $('mktList').innerHTML=list.map((a,i)=>{ const up=a.change>0,dn=a.change<0,on=state.watch.includes(a.key);
    const local=a.scope==='local', la=ASSETS[a.key];
    const price=local?fmt(a.price):(a.cat==='forex'?a.price.toFixed(a.price<10?4:2):fmtUsd(a.price));
    const cur=local?'<span class="mcur">د.ع</span>':(a.cat==='forex'?'':'<span class="mcur">$</span>');  // label the currency
    // show the AMOUNT against IQD, not just the name: "١٠٠ دۆلار … = 155,850 د.ع"
    const nm=(local && la && la.per===100) ? ('١٠٠ '+(a.name[state.lang]||a.name.en)) : (a.name[state.lang]||a.name.en);
    const chg=a.change==null?'—':`${up?'▲':dn?'▼':''} ${Math.abs(a.change).toFixed(2)}%`;
    return `<div class="mkt-row" data-k="${esc(a.key)}" style="animation-delay:${Math.min(i,14)*.018}s">
      <div class="mkt-sym${ART[a.key]?' has-art':''}">${ART[a.key]?artImg(a.key,'mkt-art')+`<span class="mkt-symt">${esc(a.symbol)}</span>`:a.logo?`<img class="mkt-logo" src="${esc(a.logo)}" alt="${esc(a.symbol)}" loading="lazy" onerror="this.parentNode.textContent='${esc(a.symbol)}'">`:esc(a.symbol)}</div>
      <div class="mkt-info"><div class="mkt-name ${a.scope==='global'&&a.cat==='crypto'?'eng':''}">${esc(nm)}</div><div class="mkt-scope ${a.scope}">${a.scope==='local'?T('scope_local'):T('scope_global')}</div></div>
      <div class="mkt-px"><div class="mp">${price} ${cur}</div><div class="mc ${up?'up':dn?'down':'flat'}">${chg}</div></div>
      <button class="mkt-star ${on?'on':''}" data-star="${esc(a.key)}">${on?'★':'☆'}</button></div>`; }).join('');
  $('mktList').querySelectorAll('.mkt-row').forEach(r=>r.onclick=e=>{ if(e.target.closest('.mkt-star'))return; selectAsset(r.dataset.k); });
  $('mktList').querySelectorAll('.mkt-star').forEach(b=>b.onclick=e=>{ e.stopPropagation(); toggleWatch(b.dataset.star); }); }
function selectAsset(k){ haptic(); state.asset=k; trackAsset(k); if(!state.watch.includes(k)){ state.watch.push(k); saveWatch(); }
  selectionChanged(); closeMarkets(); showScreen('market'); }
function toggleWatch(k){ haptic(); const i=state.watch.indexOf(k);
  if(i>=0){ if(state.watch.length>1) state.watch.splice(i,1); } else state.watch.push(k);
  saveWatch(); renderMlist(); renderAssets(); }
function saveWatch(){ Store.set('watch', JSON.stringify(state.watch)); }
$('mktSearch').addEventListener('input',e=>{ mktQ=e.target.value; renderMlist(); });
$('mktScope').querySelectorAll('button').forEach(b=>b.onclick=()=>{ state.mktScope=b.dataset.s; mktCat='all'; mktQ=''; $('mktSearch').value=''; haptic(); renderScope(); renderMcats(); renderMlist(); $('mktList').scrollTop=0; });
$('mktBg').onclick=closeMarkets; $('mktClose').onclick=closeMarkets;

function selectionChanged(){ const g=isGlobal(state.asset);
  $('chart').style.display=''; $('ranges').style.display=''; $('chartTog').style.display='';  // chart now works for crypto too
  document.querySelector('.hrange').style.display=g?'none':''; $('heroBell').style.display='';
  renderHero(); renderAssets(); renderCitySeg(); renderConvAssets(); renderConv(); renderChartTog(); renderDebtCard(); loadHistory(); }

/* ---- language (auto-detect Telegram lang + manual toggle) ---- */
function applyI18N(){
  document.documentElement.lang = state.lang==='ar' ? 'ar' : 'ckb';
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=T(el.dataset.t));
  document.querySelectorAll('[data-tp]').forEach(el=>el.placeholder=T(el.dataset.tp));
  $('langTog').textContent = state.lang==='ar' ? 'کوردی' : 'العربية';
}
function setLang(l, persist=true){
  // persist=true => an explicit in-app toggle (wins forever). persist=false => applying
  // the bot-picked default, which must NOT shadow a later bot change.
  state.lang=l; if(persist){ try{ localStorage.setItem('lang',l); }catch(e){} }
  state.city=cityOrder(l)[0];              // land on the language's primary city (ar→Baghdad, ku→Suly)
  applyI18N(); renderStatus(); renderRanges(); renderTape(); renderBankFilters();
  if(state._banksLoaded) renderBanks();   // re-localize already-drawn bank names/cities
  selectionChanged(); renderNews([]); renderAlerts(state.alerts); renderSentiment(); loadAll();
  if(state.race && typeof rcShow==='function') rcShow();   // the race screen is drawn in the language of the moment
}
// An explicit toggle is the STRONGEST language signal we get — stronger than the Telegram
// client locale the open-beacon falls back to. Re-beacon so the audience split reflects it.
$('langTog').onclick=()=>{ haptic(); setLang(state.lang==='ar'?'ku':'ar'); appBeat(true); };
// Open the app in the SAME language the user picked in the bot's one-time prompt. Cached
// to localStorage.botLang for an instant correct paint next time; never overrides an
// explicit in-app toggle (localStorage.lang).
async function syncBotLang(){
  try{
    const j = await fetch('/api/me',{headers:authHeaders()}).then(r=>r.json());
    const bl = j && j.lang; if(bl!=='ku' && bl!=='ar') return;
    try{ localStorage.setItem('botLang', bl); }catch(e){}
    let explicit=null; try{ explicit=localStorage.getItem('lang'); }catch(e){}
    if(!explicit && state.lang!==bl) setLang(bl, false);
  }catch(e){}
}

/* ---- theme (dark default · Claude-cream light) ---- */
const LIGHT_MODE_ENABLED=true;    // light theme (build 131): near-white rates-post look; toggle in the header
const _SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"/></svg>';
const _MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.4A8.2 8.2 0 1 1 9.6 3.5a6.4 6.4 0 0 0 10.9 10.9z"/></svg>';
function curTheme(){ return LIGHT_MODE_ENABLED?'light':'dark'; }   // build 132: light only, no dark option (suren 2026-10-21)   // build 131: light is the default; the old 'theme' key (always 'dark') is ignored
function applyTheme(t){ const light=(t==='light');
  document.documentElement.setAttribute('data-theme', light?'light':'dark');
  try{ localStorage.setItem('theme131', light?'light':'dark'); }catch(e){}
  const col = light?'#FCFBF8':'#070a10';
  const mt=document.querySelector('meta[name="theme-color"]'); if(mt) mt.setAttribute('content',col);
  try{ if(tg){ tg.setHeaderColor(col); tg.setBackgroundColor(col); } }catch(e){}
  const btn=$('themeTog'); if(btn) btn.innerHTML = light?_MOON:_SUN;   // shows the mode you'd switch TO
}
$('themeTog').onclick=()=>{ if(!LIGHT_MODE_ENABLED) return; haptic(); applyTheme(curTheme()==='light'?'dark':'light'); try{redrawChart();}catch(e){} };
{ var _tt=$('themeTog'); if(_tt) _tt.style.display='none'; }   // theme switch hidden: light only
applyTheme(curTheme());

/* ---- Add to Home Screen — creates a shortcut that opens THIS Mini App directly (the
   direct link t.me/<bot>/<app>), NOT the bot chat. Telegram Bot API 8.0+; on older clients
   the method is absent so the button just stays hidden. ---- */
function setupAddToHome(){
  const btn=$('addHome');
  if(!btn || !tg) return;
  // addToHomeScreen/checkHomeScreenStatus are Bot API 8.0+. On older clients the methods exist
  // as stubs that only log "not supported" + no-op — so gate on the REAL version, not typeof.
  if(typeof tg.isVersionAtLeast!=='function' || !tg.isVersionAtLeast('8.0')) return;
  if(typeof tg.addToHomeScreen!=='function') return;
  btn.onclick=()=>{ haptic(); try{ tg.addToHomeScreen(); }catch(e){} };
  const show=on=>{ btn.style.display = on ? 'inline-flex' : 'none'; };
  if(typeof tg.checkHomeScreenStatus==='function'){
    try{ tg.checkHomeScreenStatus(s=>show(s!=='added' && s!=='unsupported')); }catch(e){ show(true); }
  } else { show(true); }
  if(typeof tg.onEvent==='function') tg.onEvent('homeScreenAdded',()=>show(false));
}
setupAddToHome();

/* ---- tabs ---- */
/* پێشبڕکێ launch switch. While false the race tab is hidden and the news tab stays; the
   backend keeps scoring, seating and fetching names/photos in the background so the board
   is already alive on launch day. Flip to true (and bump BUILD) to publish. */
const RACE_ENABLED=true;
const TABS=['bank','alerts','market','news','race','convert'];
(function(){ const r=$('tabRace'), n=document.querySelector('.tabbtn[data-s="news"]');
  if(r) r.hidden=!RACE_ENABLED; if(n) n.hidden=RACE_ENABLED; })();   // visual strip order (RTL: bank→convert)
function rcEmptyHtml(){ return '<div class="rq-empty rq-rich"><div class="rq-pod" aria-hidden="true"><i></i><i></i><i></i></div><b>'+esc(T('rc_empty_t'))+'</b>'+(state.raceView==='week'?'<span>'+esc(T('rc_empty_s'))+'</span>':'')+'<button class="st-btn rq-go">'+esc(T('rc_predict'))+'</button></div>'; }
// the empty leaderboard's button takes you to today's up/down vote on the market screen
document.addEventListener('click',e=>{ if(!(e.target.closest&&e.target.closest('.rq-go')))return; haptic(); showScreen('market'); setTimeout(()=>{ const c=$('crowd'); if(c) c.scrollIntoView({behavior:'smooth',block:'center'}); },350); });
function showScreen(name){ track('tab:'+name); const ni=TABS.indexOf(name), dir=ni>=(showScreen._cur??0)?'slin-r':'slin-l'; showScreen._cur=ni<0?0:ni;
  document.querySelectorAll('.screen').forEach(s=>{ const on=s.id==='scr-'+name; s.classList.remove('slin-r','slin-l','boot');
    s.classList.toggle('on',on); if(on){ void s.offsetWidth; s.classList.add(dir); } });
  document.querySelectorAll('.tabbtn').forEach(b=>b.classList.toggle('on',b.dataset.s===name)); window.scrollTo({top:0});
  if(name==='alerts') loadAlerts().then(markAlertsSeen);   // viewing the tab clears the badge
  if(name==='news' && !state._newsLoaded){ state._newsLoaded=true; loadNews(); }
  if(name==='race') loadRace(); else { const y=$('rcYou'); if(y) y.style.display='none'; }
  if(name==='bank' && !state._banksLoaded){ state._banksLoaded=true; loadBanks(); } }
document.querySelectorAll('.tabbtn').forEach(b=>b.onclick=()=>{ haptic();
  const ic=b.querySelector('.ic'); if(ic){ ic.classList.remove('tap'); void ic.offsetWidth; ic.classList.add('tap');
    clearTimeout(ic._t); ic._t=setTimeout(()=>ic.classList.remove('tap'),760); }
  showScreen(b.dataset.s); });

/* ---- boot + keep-alive refresh (works like a clock) ---- */
applyI18N(); renderRanges(); renderChartTog(); renderConvAssets(); renderNewsCats(); renderBankFilters(); renderDebtCard(); initTicker(); syncBotLang();
if(!paintCachedBoard()) renderSkeletons();   // instant last-known rates; skeletons only on first-ever open
Store.get('watch').then(v=>{ try{ const w=JSON.parse(v); if(Array.isArray(w)&&w.length) state.watch=w; }catch(e){} renderAssets(); });
Store.get('seenAlerts').then(v=>{ try{ const a=JSON.parse(v); if(Array.isArray(a)) state.seen=new Set(a); }catch(e){} updateBell(); });
// Which verdict has already been revealed. Until this lands _streakSeen is undefined and the
// card stays at rest; re-render once it does, in case the reveal was waiting on it.
Store.get('lbRulesSeen').then(v=>{ state._rulesSeen=v||null; const ib=$('rqPrize'); if(ib&&v) ib.classList.remove('new'); });
Store.get('streakSeen').then(v=>{ state._streakSeen=v||null; renderSentiment(); });
loadHistory();                                // the chart needs nothing from the board — start it now
// Once the market screen is up, quietly fetch the monthly board so the پێشبڕکێ tab opens instantly.
setTimeout(()=>{ if(typeof RACE_ENABLED!=='undefined' && RACE_ENABLED && tg && tg.initData && !rcCache.get('month')) rcFetch('month'); }, 4000);
// startapp=lb (the weekly podium message's button) opens straight onto the weekly board
setTimeout(()=>{ try{ if(tg?.initDataUnsafe?.start_param==='lb' && RACE_ENABLED){ rcSegSet('week'); showScreen('race'); } }catch(e){} }, 0);
// Shell cache (static/sw.js): from the second open the page starts from the phone's own copy.
// Unsupported (e.g. iOS WebViews) → silently nothing changes.
try{ if('serviceWorker' in navigator) addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{})); }catch(e){}
loadAll().then(()=>{ renderCitySeg(); });
setInterval(loadAll, 45000);
setInterval(()=>{ if(state.marketOpen) loadHistory(); }, 90000);
window.addEventListener('resize', ()=>{ renderCitySeg(); measureTicker(); });

/* ---- pull-to-refresh (custom gold spinner) ---- */
try{ tg?.disableVerticalSwipes?.(); }catch(e){}
(function(){ let startY=null,dist=0; const MAX=80,TRIG=58,p=$('ptr');
  const busy=()=>$('reader').classList.contains('on')||$('sheet').classList.contains('on');
  addEventListener('touchstart',e=>{ startY=(window.scrollY<=0 && !busy())?e.touches[0].clientY:null; dist=0; },{passive:true});
  addEventListener('touchmove',e=>{ if(startY==null)return; const d=e.touches[0].clientY-startY; if(d<=0){ if(!dist)startY=null; return; }
    dist=Math.min(MAX,d*0.5); p.style.transition='none'; p.classList.add('pull'); p.style.transform=`translateY(${dist-46}px)`; },{passive:true});
  addEventListener('touchend',()=>{ if(startY==null)return; p.style.transition='transform .3s cubic-bezier(.2,.8,.2,1)';
    if(dist>=TRIG){ p.classList.add('spin'); p.style.transform='translateY(8px)'; haptic();
      Promise.all([loadAll(),loadHistory()]).finally(()=>setTimeout(()=>{p.classList.remove('spin','pull');p.style.transform='';},600));
    } else { p.classList.remove('pull'); p.style.transform=''; }
    startY=null; dist=0; }); })();

/* ===================================================================================
   پێشبڕکێ — the weekly prediction race (backend: race.py). Replaces the news tab for now.
   Names + photos only, never a username: nothing on this screen can open a chat.
   =================================================================================== */
const RC_TIERS=['bronze','silver','gold','diamond','master'];
const RC_ICON={
  bronze:'<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7z"/></svg>',
  silver:'<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/></svg>',
  gold:'<svg viewBox="0 0 24 24"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></svg>',
  diamond:'<svg viewBox="0 0 24 24"><path d="M7 4h10l4 5-9 11L3 9zM3 9h18M9 4l3 5 3-5M9 9l3 11 3-11"/></svg>',
  master:'<svg viewBox="0 0 24 24"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  person:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
  down:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
  coin:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>',
  gift:'<svg viewBox="0 0 24 24"><path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  link:'<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  info:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  crown:'<svg viewBox="0 0 24 24"><path d="M3 7l4.8 4.2L12 4l4.2 7.2L21 7l-2 12H5z"/></svg>',
  tick:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>', cross:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>', dash:'<svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg>'};
const rcT=(k,o)=>{ let s=T(k)||''; Object.keys(o||{}).forEach(x=>{ s=s.replace('{'+x+'}',o[x]); }); return s; };
const rcFlame=lit=>'<svg viewBox="'+F_VB+'"><path d="'+F_OUT+'" fill="'+(lit?'#e7bd63':'#464e60')+'"/><path d="'+F_IN+'" fill="#0f131c"/></svg>';
// No photo → the first letter of their name on a quiet tint picked from their id (stable per person).
const rcName=p=>{ const n=(p&&p.name||'').trim(); return (!n||n==='—')?T('rc_player'):n; };
const rcAv=(p,live)=>{ const h=((+p.user_id||0)*47)%360, n=(p.name||'').trim(), ch=(n&&n!=='—')?n.charAt(0):'';
  const ph=ch?'<div class="ph l" style="background:hsl('+h+' 26% 24%);color:hsl('+h+' 55% 82%)">'+esc(ch)+'</div>':'<div class="ph">'+RC_ICON.person+'</div>';
  return '<div class="rc-av'+(live?' live':'')+'">'+ph+(p.photo?'<img src="'+esc(p.photo)+'" alt="" loading="lazy" onerror="this.remove()">':'')+'</div>'; };
const rcOrd=n=>{ const w=(T('rc_ord')||'').split('|'); return (n>=1&&n<=3&&w[n-1])?w[n-1]:'#'+n; };
// A newer count on the same element cancels the older one — two overlapping loops land on the wrong number.
function rcCount(el,to,ms,delay){ if(!el) return; const id=(el._cnt=(el._cnt||0)+1);
  setTimeout(()=>{ if(el._cnt!==id) return; const t0=performance.now(); (function f(now){ if(el._cnt!==id) return; const p=Math.min(1,Math.max(0,(now-t0)/ms)), e=1-Math.pow(1-p,3); el.textContent=Math.round(to*e); if(p<1) requestAnimationFrame(f); else el.textContent=to; })(t0); },delay||0); }
function rcTierName(key){ return T('rc_tier')+' '+T('rc_'+key); }

// The last board this phone saw, per view: painted the moment the tab opens, then replaced by
// the fresh one (rows that moved slide to their new place).
const rcCache={ get(k){ try{ return JSON.parse(localStorage.getItem('rc_'+k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem('rc_'+k,JSON.stringify(v)); }catch(e){} } };
const RC_URL={week:'/api/race',month:'/api/race/month',all:'/api/race/all'};
async function rcFetch(k){ try{ const r=await fetch(RC_URL[k],{headers:authHeaders()}); if(!r.ok) return r.status===401?{auth:false}:null;
  const j=await r.json(); if(j&&j.rows) rcCache.set(k,j); return j; }catch(e){ return null; } }
async function loadRace(){
  const body=$('rcBody'); if(!body) return;
  const view=state.raceView||'month';
  if(!document.querySelector('#rcTop .lb-av,#rcBody .lb-row')){
    const c=rcCache.get(view);
    if(c&&c.rows){ if(view==='month') state.raceMonth=c; else if(view==='all') state.raceAll=c; else state.race=c; rqRender(); }
  }
  // the week (needed for the reveal + invite) and the open view load side by side, not one after the other
  const side=view!=='week'?rcFetch(view):null;
  const d=await rcFetch('week');
  if(d&&d.auth===false){ rcRenderAuth(); return; }
  if(!d||!d.rows){ if(!state.race) rcRenderAuth(); return; }
  state.race=d;
  if(view!=='month') state.raceMonth=null;
  if(side){ const x=await side; if(x&&x.rows){ if(view==='month') state.raceMonth=x; else state.raceAll=x; } }
  await rcShow();
  if(d.event && state._raceRevealed!==d.week){ state._raceRevealed=d.week; rcSegSet('week'); rqRender(); setTimeout(()=>rcReveal(d.event),700); }
}
async function rcLoadMonth(){ const x=await rcFetch('month'); if(x&&x.rows) state.raceMonth=x; }
async function rcLoadAll(){ const x=await rcFetch('all'); if(x&&x.rows) state.raceAll=x; }
async function rcShow(){
  if(!state.race) return;
  if(state.raceView==='month' && !state.raceMonth) await rcLoadMonth();
  if(state.raceView==='all' && !state.raceAll) await rcLoadAll();
  rqRender();
}
const RC_VIEWS=['week','month','all'];
function rcSegSet(v){ state.raceView=v; const s=$('rcSeg'); if(!s) return;
  const i=Math.max(0,RC_VIEWS.indexOf(v)), bg=s.querySelector('.bg'); if(bg) bg.style.transform='translateX(-'+(i*100)+'%)';
  s.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===v)); }
(function(){ const s=$('rcSeg'); if(!s) return; state.raceView='month';   // opens on the month: always full, the week resets every Saturday
  s.querySelectorAll('button').forEach(b=>{ b.onclick=()=>{ if(state.raceView===b.dataset.v) return; haptic(); trackMark('race_view:'+b.dataset.v); rcSegSet(b.dataset.v); rcShow(); }; }); })();
function rcRenderAuth(){ $('rcTop').innerHTML=''; $('rcSeg').style.display='none'; $('lbSub').textContent='';
  $('rcBody').innerHTML='<div class="rq-empty">'+esc(T('rc_auth'))+'</div>'; }

// Each emblem is passed (done: its own colour, quiet), current (on) or locked (lock: muted, a lock
// centred where the icon would be). No corner badges.
const rcTierState=(i,cur)=> i<cur?'done':(i===cur?'on':'lock');
function rcLadder(tierKey,animate){
  const cur=RC_TIERS.indexOf(tierKey);
  return '<div class="rc-track"><i id="rcFill" style="width:'+(cur/(RC_TIERS.length-1)*100).toFixed(1)+'%;transform:scaleX(1)"></i><b id="rcHead"></b></div>'
    + RC_TIERS.map((k,i)=>'<div class="rc-em '+k+' '+rcTierState(i,cur)+'" data-tier="'+k+'" style="animation-delay:'+(animate?i*0.07:0)+'s"><div class="g"><span class="ico">'+RC_ICON[k]+'</span><span class="lock">'+RC_ICON.lock+'</span></div><div class="t">'+esc(T('rc_'+k))+'</div></div>').join('');
}
function rcSetTier(em,state){ if(!em) return; em.classList.remove('done','on','lock'); em.classList.add(state); }
const rcSub=r=>r.total?rcT('rc_of_right',{c:r.correct,t:r.total}):T('rc_novote_yet');
const RC_APP='https://t.me/dinarchi_bot/chart';
function rcInvite(){
  const me=state.race&&state.race.me; if(!me) return;
  haptic(); trackMark('race_invite');
  // Telegram 8.0+: share the person's rank card as a real photo with an «open the app» button that
  // carries their invite code. Older clients (and any failure) fall back to the plain invite link.
  if(tg && tg.shareMessage && tg.isVersionAtLeast && tg.isVersionAtLeast('8.0')){
    fetch('/api/race/share',{method:'POST',headers:authHeaders(true),body:JSON.stringify({view:state.raceView||'week',lang:state.lang})})
      .then(r=>r.ok?r.json():null).then(j=>{ if(j&&j.id){ tg.shareMessage(j.id); } else rcInviteLink(me); })
      .catch(()=>rcInviteLink(me));
    return;
  }
  rcInviteLink(me);
}
function rcInviteLink(me){
  openLink('https://t.me/share/url?url='+encodeURIComponent(RC_APP+'?startapp=ref_'+me.user_id)+'&text='+encodeURIComponent(T('rc_share_txt')));
}
/* the screen: title · switch · quiet podium (2·1·3) · everyone else, you highlighted in place */
const LB_CROWN='<svg viewBox="0 0 40 28"><defs><linearGradient id="lbCg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdeab4"/><stop offset=".55" stop-color="#e7bd63"/><stop offset="1" stop-color="#b3842c"/></linearGradient></defs>'
  +'<path d="M5 10.5 12.5 17 20 5.5 27.5 17 35 10.5 32.5 23.5H7.5Z" fill="url(#lbCg)" stroke="#8d6621" stroke-width=".7" stroke-linejoin="round"/>'
  +'<rect x="7.2" y="22" width="25.6" height="4.2" rx="1.4" fill="#b3842c"/>'
  +'<circle cx="5" cy="9.6" r="2.5" fill="url(#lbCg)"/><circle cx="20" cy="4.3" r="2.7" fill="url(#lbCg)"/><circle cx="35" cy="9.6" r="2.5" fill="url(#lbCg)"/>'
  +'<circle cx="20" cy="17.2" r="1.9" fill="#fff8e2" opacity=".85"/></svg>';
const LB_SPARK='<svg viewBox="0 0 24 24"><path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0z"/></svg>';
const LB_REDUCED=()=>{ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };
const LB_SPRING='cubic-bezier(.34,1.56,.64,1)', LB_OUT='cubic-bezier(.2,.8,.2,1)';
function lbAnim(el,kf,o){ if(el&&el.animate) try{ el.animate(kf,Object.assign({fill:'backwards'},o)); }catch(e){} }
function rqData(){ return state.raceView==='month'?state.raceMonth:(state.raceView==='all'?state.raceAll:state.race); }
function lbSub(d){
  if(d.days_left!=null) return d.days_left<=1?T('rc_last_day'):rcT('rc_left',{n:d.days_left});
  return d.voters?rcT('rc_voters',{n:d.voters}):'';
}
function rqRender(){
  const d=rqData(); if(!d) return;
  $('rcSeg').style.display='flex'; rcSegSet(state.raceView||'week');
  $('lbSub').textContent=lbSub(d);
  const ib=$('rqPrize'); ib.innerHTML=RC_ICON.info+'<span>'+esc(T('rc_rules'))+'</span>'; ib.classList.toggle('new',!state._rulesSeen);
  ib.onclick=()=>{ haptic(); trackMark('race_rules'); rcOpenTerms(); if(!state._rulesSeen){ state._rulesSeen='1'; ib.classList.remove('new'); Store.set('lbRulesSeen','1'); } };
  const rows=(d.rows||[]).slice().sort((a,b)=>a.rank-b.rank), me=d.me, meId=me?me.user_id:null;
  // FIRST (of FLIP): where each row sits now, so rows present in both views can slide to their new place
  const before={}; document.querySelectorAll('#rcBody .lb-row[data-uid]').forEach(el=>{ before[el.dataset.uid]=el.getBoundingClientRect().top; });
  const oldPod=[...document.querySelectorAll('#rcTop .lb-av')].map(e=>e.dataset.uid).join(',');
  const first=!document.querySelector('#rcTop .lb-av,#rcBody .lb-row');
  let podium=rows.filter(r=>r.ranked!==false).slice(0,3);
  // Early in a week nobody has three ranked calls yet: the podium shows LAST week's winners, labelled,
  // and the whole current list stays below it.
  const past=state.raceView==='week' && podium.length<3 && d.last_podium && d.last_podium.length ? d.last_podium : null;
  if(past) podium=past;
  const nm=r=> r.user_id===meId ? T('rc_you') : rcName(r);
  $('rcTop').innerHTML=podium.length ? (past?'<div class="lb-cap">'+esc(T('rc_last_week'))+'</div>':'')+lbStage(podium,meId,nm) : '';
  // movement sits right beside the rank it changed (league-table / Spotify-charts style); nothing when unchanged
  const mv=r=> '<span class="mv">'+(r.move>0?'<i class="up"></i>':(r.move<0?'<i class="dn"></i>':''))+'</span>';
  const sub=r=> r.total?rcT('rc_of_right',{c:r.correct,t:r.total}):T('rc_novote_yet');
  const row=r=> '<div class="lb-row'+(r.user_id===meId?' me':'')+'" data-uid="'+r.user_id+'"><span class="rk">'+(r.rank<10?'0':'')+r.rank+'</span>'+mv(r)
    +rcAv(r,false)+'<div class="nmc"><div class="nm">'+esc(nm(r))+'</div><div class="sb">'+esc(sub(r))+'</div></div>'
    +'<div class="ptc"><b>'+r.points+'</b><small>'+esc(T('rc_pts'))+'</small></div></div>';
  const inPod=new Set(past?[]:podium.map(r=>r.user_id));
  const rest=rows.filter(r=>!inPod.has(r.user_id));
  const meOut=me && !rows.some(r=>r.user_id===meId);   // not in the top list: shown after a gap
  $('rcBody').innerHTML = (!rows.length && !me) ? rcEmptyHtml()
    : rest.map(row).join('') + (meOut?'<div class="lb-gap">···</div>'+row(me):'');
  document.querySelectorAll('#rcTop [data-uid],#rcBody [data-uid]').forEach(el=>el.onclick=()=>{ haptic(); rcOpenProfile(+el.dataset.uid); });
  if(LB_REDUCED()){ const pd=document.querySelector('#rcTop .lb-pod'); if(pd) pd.classList.remove('lb-pre'); return; }
  const newPod=[...document.querySelectorAll('#rcTop .lb-av')].map(e=>e.dataset.uid).join(',');
  if(first || newPod!==oldPod) lbEnterPodium(first); else { const pd=document.querySelector('#rcTop .lb-pod'); if(pd) pd.classList.remove('lb-pre'); lbCountPodium(); }
  lbRows(before, first);
}
// Podium: #1 springs in, #2/#3 rise after it, badges pop, the crown drops in and glints once.
/* The winners' stage. Geometry lives in a 390×300 box: three rays whose sides all point at one focus
   below the list, so they fan out as they rise. RTL: #2 on the right (read first), #3 on the left. */
const LB_F=[195,540], LB_BASE=300;
const LB_TOP={1:[141,249,72],2:[262,346,116],3:[44,128,136]};
const LB_COL={1:['#fff0bf','#f2c452','#c48a26'],2:['#e4e9f5','#97a3c0','#56627f'],3:['#ffcfa6','#d9864f','#8e4a24']};
function lbRay(n){ const [x1,x2,y]=LB_TOP[n], t=(LB_BASE-y)/(LB_F[1]-y);
  return [[x1,y],[x2,y],[x2+(LB_F[0]-x2)*t,LB_BASE],[x1+(LB_F[0]-x1)*t,LB_BASE]]; }
function lbAxis(n,yy){ const [x1,x2,y]=LB_TOP[n], m=(x1+x2)/2, t=(yy-y)/(LB_F[1]-y); return m+(LB_F[0]-m)*t; }
const lbPct=(x,y)=>'left:'+(x/390*100).toFixed(2)+'%;top:'+(y/300*100).toFixed(2)+'%';
function lbStage(podium,meId,nm){
  const byN={1:podium[0],2:podium[1],3:podium[2]};
  let html='<div class="lb-pod lb-pre"><i class="lb-glow"></i>'
    +Array.from({length:12},(_,i)=>'<i class="lb-dust" style="left:'+(14+((i*37)%72))+'%;--d:'+(6+(i%5))+'s;--w:'+(-(i*0.9)).toFixed(1)+'s"></i>').join('');
  [3,2,1].forEach(n=>{ if(!byN[n]) return; const P=lbRay(n), c=LB_COL[n], y=LB_TOP[n][2];
    const x0=Math.min(...P.map(p=>p[0])), x1=Math.max(...P.map(p=>p[0])), w=x1-x0, h=LB_BASE-y;
    const clip=P.map(p=>((p[0]-x0)/w*100).toFixed(2)+'% '+((p[1]-y)/h*100).toFixed(2)+'%').join(',');
    html+='<div class="lb-ray r'+n+'" style="left:'+(x0/390*100).toFixed(2)+'%;top:'+(y/300*100).toFixed(2)+'%;width:'+(w/390*100).toFixed(2)+'%;height:'+(h/300*100).toFixed(2)+'%;'
      +'clip-path:polygon('+clip+');background:linear-gradient(90deg,rgba(255,255,255,.2),transparent 20%,transparent 80%,rgba(0,0,0,.16)),linear-gradient(180deg,'+c[0]+','+c[1]+' 42%,'+c[2]+')">'
      +'<i class="sh"></i><i class="fl"></i></div>'; });
  [2,1,3].forEach(n=>{ const r=byN[n]; if(!r) return; const y=LB_TOP[n][2], me=r.user_id===meId;
    html+='<div class="lb-av a'+n+'" data-uid="'+r.user_id+'" style="'+lbPct(lbAxis(n,y-6),y-6)+'"><i class="lb-ring"></i>'
      +(n===1?'<span class="lb-crown">'+LB_CROWN+'</span>':'')+rcAv(r,false)+'</div>';
    const ty=y+(n===1?50:26);
    html+='<div class="lb-tx t'+n+(me?' me':'')+'" style="'+lbPct(lbAxis(n,ty),ty)+'"><div class="nm">'+esc(nm(r))+'</div>'
      +'<div class="pt"><b data-to="'+r.points+'">'+r.points+'</b><small>'+esc(T('rc_pts'))+'</small></div></div>';
    const ky=y+(n===1?134:(n===2?98:96));
    html+='<div class="lb-big k'+n+'" style="'+lbPct(lbAxis(n,ky),ky)+'">'+n+'</div>'; });
  if(byN[1]) for(let i=0;i<8;i++) html+='<i class="lb-spark s'+i+'" style="'+lbPct(lbAxis(1,LB_TOP[1][2]-54),LB_TOP[1][2]-54)+'">'+LB_SPARK+'</i>';
  return html+'</div>';
}
/* Real spring physics as a CSS linear() easing: overshoot and settle like a physical object, not a
   bezier guess. Falls back to a back-out cubic where linear() is unsupported (older WebViews). */
const LB_LINEAR=(()=>{ try{ return CSS.supports('animation-timing-function','linear(0, 1)'); }catch(e){ return false; } })();
const LB_SPRINGS={};
function lbSpring(stiff,damp){ const k=stiff+':'+damp; if(LB_SPRINGS[k]) return LB_SPRINGS[k];
  let x=0,v=0; const dt=1/120, pts=[0]; let t=0;
  while(t<2.5){ const a=-stiff*(x-1)-damp*v; v+=a*dt; x+=v*dt; t+=dt; pts.push(x);
    if(t>.25 && Math.abs(x-1)<.0015 && Math.abs(v)<.01) break; }
  const n=Math.min(60,pts.length), step=(pts.length-1)/(n-1), s=[];
  for(let i=0;i<n;i++) s.push(+pts[Math.round(i*step)].toFixed(4));
  s[s.length-1]=1;
  return LB_SPRINGS[k]={duration:Math.round(t*1000), easing:LB_LINEAR?'linear('+s.join(',')+')':'cubic-bezier(.34,1.45,.5,1)'}; }
// Entrance, ~1.3s, every moving part a transform or opacity (compositor-only — no repaint per frame).
// The heavy DOM build happens first with everything hidden; motion starts one painted frame later, so no
// frame of the choreography is ever skipped. Rays spring up #3 → #2 → #1 (the tallest lands last), each
// photo drops onto its ray and bounces, #1 flashes and rings, the crown lands, sparks, numbers pop.
function lbEnterPodium(full){
  const pod=$('rcTop'); if(!pod) return; const root=pod.querySelector('.lb-pod'); if(!root) return;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const k=full?1:.6, B=full?120:0, Q=s=>pod.querySelector(s);
    const S1=lbSpring(170,15), S2=lbSpring(230,16), S3=lbSpring(300,17);   // rays · photos · small pops
    const A=(el,kf,dur,delay,easing)=>{ if(el&&el.animate) try{ el.animate(kf,{duration:dur,delay:B+delay*k,easing,fill:'backwards'}); }catch(e){} };
    root.classList.remove('lb-pre');
    A(Q('.lb-glow'),[{opacity:0,transform:'translateX(-50%) scale(.85)'},{opacity:1,transform:'translateX(-50%)'}],900,0,LB_OUT);
    A($('rcBody'),[{transform:'translateY(60px)'},{transform:'none'}],S1.duration,0,S1.easing);
    [[3,40],[2,130],[1,240]].forEach(([n,d])=>{
      A(Q('.lb-ray.r'+n),[{transform:'scaleY(0)'},{transform:'scaleY(1)'}],S1.duration,d,S1.easing);
      A(Q('.lb-av.a'+n),[{opacity:0,transform:'translate(-50%,-50%) translateY(-34px) scale(.5)'},{opacity:1,transform:'translate(-50%,-50%)'}],S2.duration,d+230,S2.easing);
      A(Q('.lb-tx.t'+n),[{opacity:0,transform:'translateX(-50%) translateY(10px)'},{opacity:1,transform:'translateX(-50%)'}],420,d+320,LB_OUT);
      A(Q('.lb-big.k'+n),[{opacity:0,transform:'translate(-50%,-50%) scale(.4)'},{opacity:1,transform:'translate(-50%,-50%)'}],S3.duration,d+360,S3.easing);
    });
    A(Q('.lb-ray.r1 .fl'),[{opacity:0},{opacity:.55},{opacity:0}],520,560,'ease-out');
    A(Q('.lb-av.a1 .lb-ring'),[{opacity:.95,transform:'scale(1)'},{opacity:0,transform:'scale(1.7)'}],720,600,'cubic-bezier(.2,.7,.3,1)');
    A(Q('.lb-crown'),[{opacity:0,transform:'translateY(-30px) rotate(-16deg) scale(.7)'},{opacity:1,transform:'none'}],S2.duration,700,S2.easing);
    pod.querySelectorAll('.lb-spark').forEach((s,i)=>{ const a=i/8*Math.PI*2, r=30+(i%3)*9;
      A(s,[{opacity:0,transform:'translate(0,0) scale(.2)'},{opacity:1,transform:'translate('+(Math.cos(a)*r*.55).toFixed(1)+'px,'+(Math.sin(a)*r*.55).toFixed(1)+'px) scale(1)',offset:.35},
           {opacity:0,transform:'translate('+(Math.cos(a)*r).toFixed(1)+'px,'+(Math.sin(a)*r).toFixed(1)+'px) scale(.3)'}],860,900,'cubic-bezier(.2,.8,.2,1)'); });
    lbCountPodium(B+460*k);
  }));
}
function lbCountPodium(delay){ document.querySelectorAll('#rcTop .lb-tx .pt b').forEach(el=>rcCount(el,+el.dataset.to,700,delay||0)); }
// Rows: on first show the top six cascade in 45ms apart, the rest arrive with the sixth.
// On a view switch, rows that exist in both views slide from their old place (FLIP); new ones fade up.
function lbRows(before, first){
  let fresh=0;
  document.querySelectorAll('#rcBody .lb-row,#rcBody .lb-gap').forEach(el=>{
    const was=el.dataset.uid!=null?before[el.dataset.uid]:undefined;
    if(!first && was!=null){
      const dy=was-el.getBoundingClientRect().top;
      if(Math.abs(dy)>1) lbAnim(el,[{transform:'translateY('+dy+'px)'},{transform:'none'}],{duration:460,easing:'cubic-bezier(.3,1.15,.5,1)'});
      return;
    }
    const i=Math.min(fresh++,5);
    lbAnim(el,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:340,delay:(first?300:80)+i*45,easing:LB_OUT});
  });
}
function rcOpenTerms(){
  $('rcTermsCard').innerHTML='<div class="grab"></div><div class="rc-terms"><h3 style="text-align:center">'+esc(T('rc_tm_h'))+'</h3>'
    +'<div class="sub">'+esc(T('rc_tm_s'))+'</div>'
    +'<ol>'+[1,2,3,4].map(i=>'<li><i>'+i+'</i><span>'+esc(T('rc_tm_'+i))+'</span></li>').join('')+'</ol>'
    +'<h4>'+esc(T('rc_how'))+'</h4><ol class="how">'+[1,2,3].map(i=>'<li><i></i><span>'+T('rc_note'+i)+'</span></li>').join('')+'</ol>'
    +((state.race&&state.race.me)?'<button class="inv" id="rcTermsInvite">'+RC_ICON.link+esc(T('rc_invite'))+'</button>':'')+'</div>';
  $('rcTerms').classList.add('on'); lockScroll(true);
  const iv=$('rcTermsInvite'); if(iv) iv.onclick=rcInvite;
}
(function(){ const bg=$('rcTermsBg'); if(bg) bg.onclick=()=>dismissSheet('rcTerms'); try{ initSheetDrag('rcTerms',()=>dismissSheet('rcTerms')); }catch(e){} })();

/* ---- profile sheet: ring, two sentences, last ten for them and for you ---- */
async function rcOpenProfile(uid){
  trackMark('race_profile');
  let p=null; try{ p=await fetch('/api/race/profile?user_id='+uid,{headers:authHeaders()}).then(r=>r.json()); }catch(e){ return; }
  if(!p||!p.user_id) return;
  const form=(arr,cls,start)=>'<div class="rc-form '+cls+'">'+(arr||[]).map((c,i)=>'<i class="'+c+'" data-d="'+(start+i*70)+'">'+(c==='w'?RC_ICON.tick:c==='l'?RC_ICON.cross:RC_ICON.dash)+'</i>').join('')+'</div>';
  const isMe=state.race&&state.race.me&&state.race.me.user_id===p.user_id;
  const acc=p.accuracy==null?0:p.accuracy;
  const say=p.total?'<div>'+rcT('rc_say1',{t:'<b class="rc-c" data-to="'+p.total+'">0</b>',c:'<b class="rc-c" data-to="'+p.correct+'">0</b>'})+'</div>'
      +'<small>'+rcT('rc_say2',{s:'<b class="rc-c" data-to="'+p.streak+'">0</b>',b:'<b class="rc-c" data-to="'+p.best+'">0</b>'})+'</small>'
    :'<div style="color:var(--dim);font-size:13px">'+esc(T('rc_say_none'))+'</div>';
  const right=arr=>(arr||[]).filter(c=>c==='w').length;
  $('rcProf').innerHTML='<div class="grab"></div>'
    +'<div class="rc-who"><div class="rc-ring"><svg class="r" viewBox="0 0 104 104"><circle class="tr" cx="52" cy="52" r="46"/><circle class="v" id="rcRingV" cx="52" cy="52" r="46"/></svg>'+rcAv(p,p.live)+'<div class="pc"><span id="rcPct">0</span>%</div></div>'
    +'<div class="nm">'+esc(rcName(p))+'</div><div class="ln"><b class="tier '+esc(p.tier_key)+'"><i></i>'+esc(rcTierName(p.tier_key))+'</b>'+(p.rank?' · <b style="color:var(--gold)">'+esc(rcOrd(p.rank))+'</b>':'')+'</div></div>'
    +'<div class="rc-say">'+say+'</div>'
    +'<div class="rc-sec"><span>'+esc(T('rc_last10'))+'</span><b>'+right(p.last10)+' '+esc(T('rc_right'))+'</b></div>'+form(p.last10,'him',500)
    +'<div class="rc-key"><span><i style="background:var(--up)"></i>'+esc(T('rc_right'))+'</span><span><i style="background:var(--down)"></i>'+esc(T('rc_wrong'))+'</span><span><i style="background:rgba(255,255,255,.14)"></i>'+esc(T('rc_novote'))+'</span></div>'
    +((p.me&&!isMe)?'<div class="rc-sec you"><span>'+T('rc_last10_you')+'</span><b>'+right(p.me.last10)+' '+esc(T('rc_right'))+'</b></div>'+form(p.me.last10,'you',1300):'');
  const sh=$('rcSheet'); sh.classList.add('on'); lockScroll(true);
  setTimeout(()=>{ const v=$('rcRingV'); if(v) v.style.strokeDashoffset=String(Math.round(289*(1-acc/100))); },120);
  rcCount($('rcPct'),acc,1200,300);
  document.querySelectorAll('#rcProf .rc-c').forEach((el,i)=>rcCount(el,+el.dataset.to,800,350+i*90));
  document.querySelectorAll('#rcProf .rc-form i').forEach(el=>setTimeout(()=>el.classList.add('in'),+el.dataset.d));
}
(function(){ const bg=$('rcSheetBg'); if(bg) bg.onclick=()=>dismissSheet('rcSheet'); try{ initSheetDrag('rcSheet',()=>dismissSheet('rcSheet')); }catch(e){} })();

/* ---- the reveal: plays once per tier move (server keeps it keyed to the week) ---- */
function rcReveal(ev){
  const st=$('rcStage'), lad=$('rcLadder'); if(!st||!lad) return;
  const up=ev.kind==='up', fromKey=RC_TIERS[(ev.from_tier||1)-1], toKey=RC_TIERS[(ev.to_tier||1)-1];
  const pts=Array.from({length:30},(_,i)=>{ const a=(i/30)*Math.PI*2+Math.random()*.2, r=50+Math.random()*100; return '<i class="rc-pt'+(i%3?'':' s')+'" style="--dx:'+(Math.cos(a)*r).toFixed(0)+'px;--dy:'+(Math.sin(a)*r*.7).toFixed(0)+'px;animation-delay:'+(Math.random()*.12).toFixed(2)+'s"></i>'; }).join('');
  st.className='rc-stage'+(up?'':' down');
  st.innerHTML='<div class="rc-veil"></div><div class="rc-glow"></div><div class="rc-rays"></div>'
    +'<div class="rc-fx" id="rcFx"><div class="rc-shock"></div><div class="rc-shock s2"></div><div class="rc-shock s3"></div>'+(up?pts:'')+'</div><div class="rc-flash"></div>'
    +'<div class="rc-hero"><div class="k">'+esc(T(up?'rc_up_k':'rc_dn_k'))+'</div><div class="h">'+esc(T(up?'rc_up_h':'rc_dn_h'))+' <b>'+esc(rcTierName(toKey))+'</b></div>'
    +'<div class="s">'+esc(up?rcT('rc_up_s',{n:5}):T(ev.kind==='idle'?'rc_idle_s':'rc_dn_s'))+'</div><div class="go" id="rcGo">'+esc(T('rc_go'))+'</div></div>';
  // stage the ladder at the OLD tier, then move it
  lad.innerHTML=rcLadder(fromKey,false);
  const fill=$('rcFill'), head=$('rcHead'), fromI=RC_TIERS.indexOf(fromKey), toI=RC_TIERS.indexOf(toKey), pct=i=>(i/(RC_TIERS.length-1)*100).toFixed(1)+'%';
  const emFrom=lad.querySelector('.rc-em.'+fromKey), emTo=lad.querySelector('.rc-em.'+toKey);
  lockScroll(true); window.scrollTo({top:0}); st.classList.add('on'); lad.classList.add('up');
  if(up){
    emFrom.querySelector('.g').style.filter='brightness(1.5)';
    setTimeout(()=>{ emFrom.querySelector('.g').style.filter='';
      head.style.transition='right 1.05s cubic-bezier(.55,0,.2,1),opacity .2s'; head.style.opacity=1; head.style.right='calc('+pct(toI)+' - 23px)';
      fill.style.transition='width 1.05s cubic-bezier(.55,0,.2,1)'; fill.style.width=pct(toI); },600);
    setTimeout(()=>emTo.classList.add('charge'),1350);
    setTimeout(()=>{ head.style.transition='opacity .25s'; head.style.opacity=0; },1550);
    setTimeout(()=>{ emTo.classList.remove('charge'); $('rcFx').classList.add('pop'); rcSetTier(emTo,'on'); rcSetTier(emFrom,'done'); },1750);
    setTimeout(()=>st.classList.add('words'),1900);
  } else {
    setTimeout(()=>{ fill.style.transition='width 1s cubic-bezier(.55,0,.2,1)'; fill.style.width=pct(toI); },500);
    setTimeout(()=>{ rcSetTier(emFrom,'lock'); rcSetTier(emTo,'on'); },1200);
    setTimeout(()=>st.classList.add('words'),1450);
  }
  $('rcGo').onclick=()=>{ haptic(); st.classList.remove('words');
    setTimeout(()=>{ st.classList.remove('on'); lad.classList.remove('up'); lockScroll(false); },250);
    setTimeout(()=>rcShow(),900);
    fetch('/api/race/seen',{method:'POST',headers:authHeaders(true),body:'{}'}).catch(()=>{}); };
}

/* ── هاوکێشەی دینار: public economy explainer (home card + sheet), ku + ar ──
   Ported from suren's economy whiteboards (2026-10-10): oil → dollar → dinar → salary → basket.
   It took the home spot of the Kurdish-only قەرزی خەڵک debt card (the mucha calculator still
   opens from the salary news teaser). Fixed figures are dated Oct-2026 public sources, listed
   in the sheet footer; Brent + the street dollar are LIVE from this app (fallbacks below).
   Update EK when the official rate, oil exports or the payroll change. */
const EK={EXP:2.6, DISC:20, DAYS:30, RATE:1500, PUB:1520, PRE:1598, NONOIL:0.8, NEED:10, SAL:7.7, RES:80.6,
  BRENT_FB:104.7, STREET_FB:1668};
// share of each item's shelf price: imported (moves with the dollar) · fuel · local farm · rest = local wages/rent
const EKS={
  kick:{ku:'نەوت ← دۆلار ← دینار ← مووچە', ar:'نفط ← دولار ← دينار ← رواتب'},
  title:{ku:'هاوکێشەی دینار', ar:'معادلة الدينار'},
  n_oil:{ku:'نرخی نەوت', ar:'سعر النفط'}, n_oil_s:{ku:'برێنت · ئێستا', ar:'برنت · الآن'},
  n_usd:{ku:'داهاتی نەوت', ar:'إيرادات النفط'}, n_usd_s:{ku:'دۆلار · مانگانە', ar:'دولار · شهرياً'},
  n_bud:{ku:'بە دینار', ar:'بالدينار'}, n_bud_s:{ku:'تریلیۆن', ar:'تريليون'},
  n_st:{ku:'دۆلاری بازاڕ', ar:'دولار السوق'},
  g_lbl:{ku:'داهاتی حکومەت بەرامبەر خەرجی · مانگانە', ar:'إيرادات الحكومة مقابل النفقات · شهرياً'},
  g_sal:{ku:'مووچە', ar:'الرواتب'}, g_need:{ku:'هەموو خەرجی', ar:'كل النفقات'}, g_rev:{ku:'داهات', ar:'الإيراد'},
  ask:{ku:'نەوت چۆن دەبێتە مووچەی تۆ؟', ar:'كيف يصير النفط راتبك؟'},
  ask_s:{ku:'بە وێنەی جووڵاو ببینە و خۆت حیساب بکە', ar:'شاهدها بالحركة واحسبها بنفسك'},
  c_brent:{ku:'برێنت · ئێستا', ar:'برنت · الآن'}, c_st:{ku:'دۆلار · {c}', ar:'الدولار · {c}'}, c_off:{ku:'نرخی فەرمی', ar:'السعر الرسمي'},
  rv_h:{ku:'نەوت چۆن دەبێتە مووچە؟', ar:'كيف يصير النفط رواتب؟'}, rv_s:{ku:'بە نرخەکانی ئەمڕۆ', ar:'بأسعار اليوم'},
  rv1:{ku:'عێراق نەوت دەفرۆشێت', ar:'العراق يبيع النفط'},
  rv2:{ku:'دۆلار دەکرێت بە دینار', ar:'الدولار يتحوّل إلى دينار'},
  rv3:{ku:'داهات بەشی مووچە دەکات؟', ar:'هل يكفي الإيراد للرواتب؟'},
  rv_all:{ku:'بەشی هەموو خەرجییەک دەکات', ar:'يكفي كل النفقات'},
  rv_sal:{ku:'بەشی مووچە دەکات، بەڵام هەموو خەرجی نا', ar:'يكفي الرواتب، لا كل النفقات'},
  rv_no:{ku:'بەشی مووچەش ناکات', ar:'لا يكفي حتى الرواتب'},
  fl_h:{ku:'ڕێگەی دۆلار', ar:'رحلة الدولار'}, fl_s:{ku:'لە نەوتەوە بۆ گیرفانت', ar:'من النفط إلى جيبك'},
  f1t:{ku:'عێراق نەوت دەفرۆشێت', ar:'العراق يبيع النفط'}, f1s:{ku:'ڕۆژانە 2.6 ملیۆن بەرمیل', ar:'يومياً 2.6 مليون برميل'}, f1c:{ku:'بەرمیلێک', ar:'للبرميل'},
  f2t:{ku:'دۆلار دێتە عێراق', ar:'الدولار يدخل العراق'}, f2s:{ku:'چین و هیندستان بە دۆلار دەدەن', ar:'الصين والهند تدفعان بالدولار'}, f2c:{ku:'مانگانە', ar:'شهرياً'},
  f3t:{ku:'دۆلار دەبێتە دینار', ar:'الدولار يصير ديناراً'}, f3s:{ku:'لە بانکی ناوەندی', ar:'في البنك المركزي'}, f3c:{ku:'دینار بۆ 1 دۆلار', ar:'ديناراً للدولار'},
  f4t:{ku:'مووچە دەدرێت', ar:'تُدفع الرواتب'}, f4s:{ku:'بۆ فەرمانبەر و خانەنشین', ar:'للموظفين والمتقاعدين'}, f4c:{ku:'تریلیۆن دینار', ar:'تريليون دينار'},
  f5t:{ku:'خەڵک بازاڕ دەکەن', ar:'الناس يتسوّقون'}, f5s:{ku:'زۆربەی کاڵاکان هاوردەن', ar:'أغلب البضائع مستوردة'},
  f6t:{ku:'بازرگان دۆلار دەکڕێتەوە', ar:'التاجر يشتري الدولار'}, f6s:{ku:'بۆ هێنانی کاڵا لە دەرەوە', ar:'ليستورد البضائع'}, f6b:{ku:'بانک', ar:'البنك'}, f6m:{ku:'بازاڕ', ar:'السوق'},
  fl_loop:{ku:'دۆلار دەچێتە دەرەوە و سووڕەکە دووبارە دەبێتەوە', ar:'الدولار يخرج وتبدأ الدورة من جديد'},
  rv_f:{ku:'نرخی نەوتی عێراق نزیکەی 20 دۆلار کەمترە لە برێنت ({b}).', ar:'سعر النفط العراقي أقل بنحو 20 دولاراً من برنت ({b}).'},
  tg_s:{ku:'هەواڵی دۆلار و زێڕ ڕۆژانە', ar:'أخبار الدولار والذهب يومياً'}, tg_go:{ku:'بەشداربە', ar:'انضم'},
  tb_j:{ku:'ڕێگە', ar:'الرحلة'}, tb_g:{ku:'کاڵا', ar:'السلع'}, tb_b:{ku:'بودجە', ar:'الموازنة'}, tb_s:{ku:'مووچە', ar:'الراتب'},
  g_h:{ku:'نرخی کاڵا لە 7 ساڵدا', ar:'أسعار السلع في 7 سنوات'}, g_s:{ku:'بازاڕی سلێمانی · 2019 تا 2026', ar:'سوق السليمانية · 2019 إلى 2026'},
  g_then:{ku:'2019', ar:'2019'}, g_now:{ku:'2026', ar:'2026'}, g_in7:{ku:'لە 7 ساڵدا', ar:'في 7 سنوات'},
  g_unit:{ku:'دینار بۆ {u}', ar:'دينار لكل {u}'},
  g_usd:{ku:'دۆلار', ar:'الدولار'},
  g_more:{ku:'{i} {a} گران بوو، دۆلار تەنها {d}', ar:'{i} غلا {a}، والدولار {d} فقط'},
  g_less:{ku:'{i} {a} گران بوو، کەمتر لە دۆلار ({d})', ar:'{i} غلا {a}، أقل من الدولار ({d})'},
  g_same:{ku:'{i} {a} و دۆلار {d}: نزیکەی وەک یەک', ar:'{i} {a} والدولار {d}: تقريباً متساويان'},
  g_pp:{ku:'10,000 دینار چەندی دەکڕی؟', ar:'كم تشتري 10,000 دينار؟'},
  g_note:{ku:'هەردوو هێڵ لە 2019 لە یەک خاڵەوە دەست پێدەکەن. ڕووبەری نێوان دوو هێڵەکە = جیاوازیی کاڵا و دۆلار.', ar:'الخطّان يبدآن من نقطة واحدة في 2019. المساحة بين الخطين = الفرق بين السلعة والدولار.'},
  s1:{ku:'خۆت حیساب بکە', ar:'احسبها بنفسك'},
  s1d:{ku:'نرخی نەوت، هەناردە و نرخی دۆلار بگۆڕە. ببینە داهات بەشی مووچە دەکات یان نا.', ar:'غيّر سعر النفط والصادرات وسعر الدولار، وشوف هل يكفي الإيراد للرواتب.'},
  t_bar:{ku:'ملیۆن بەرمیل لە ڕۆژێکدا', ar:'مليون برميل يومياً'},
  t_price:{ku:'نرخی بەرمیل', ar:'سعر البرميل'},
  t_days:{ku:'ڕۆژ', ar:'يوماً'},
  t_usd:{ku:'مانگانە', ar:'شهرياً'},
  t_rate:{ku:'نرخی دۆلار', ar:'سعر الدولار'},
  t_iqd:{ku:'تریلیۆن دینار', ar:'تريليون دينار'},
  k_price:{ku:'نرخی نەوتی عێراق', ar:'سعر النفط العراقي'},
  k_price_h:{ku:'برێنت ئێستا {b}ە. نەوتی عێراق بە نزیکەی 20 دۆلار کەمتر دەفرۆشرێت.', ar:'برنت الآن {b}. النفط العراقي يُباع بأقل بنحو 20 دولاراً.'},
  k_exp:{ku:'هەناردەی نەوت · ملیۆن بەرمیل لە ڕۆژێکدا', ar:'صادرات النفط · مليون برميل يومياً'},
  k_exp_h:{ku:'ئەیلوول: 2.6. پێش داخستنی هورمز: نزیکەی 3.5.', ar:'أيلول: 2.6. قبل إغلاق هرمز: نحو 3.5.'},
  k_rate:{ku:'نرخی فەرمیی دۆلار', ar:'سعر الدولار الرسمي'},
  k_rate_h:{ku:'پێش 7ی ئۆکتۆبەر: 1,300. ئێستا: 1,500 بۆ حکومەت، 1,520 بۆ بازرگان.', ar:'قبل 7 تشرين الأول: 1,300. الآن: 1,500 للحكومة و1,520 للتجار.'},
  v_ok:{ku:'داهات بەشی هەموو خەرجییەک دەکات. زیادە: {x} تریلیۆن دینار لە مانگێکدا.', ar:'الإيراد يكفي كل النفقات. الفائض: {x} تريليون دينار شهرياً.'},
  v_mid:{ku:'مووچە دەدرێت، بەڵام مانگانە {x} تریلیۆن دینار کەم دێت.', ar:'الرواتب تُدفع، لكن ينقص {x} تريليون دينار شهرياً.'},
  v_bad:{ku:'داهات بەشی مووچەش ناکات. کەمی: {x} تریلیۆن دینار لە مانگێکدا.', ar:'الإيراد لا يكفي حتى للرواتب. النقص: {x} تريليون دينار شهرياً.'},
  v_note:{ku:'مووچە: 7.7 تریلیۆن لە مانگێکدا. هەموو خەرجی: نزیکەی 10. باج و گومرگ (0.8) زیاد کراوە.', ar:'الرواتب: 7.7 تريليون شهرياً. كل النفقات: نحو 10. الضرائب والجمارك (0.8) مضافة.'},
  s3:{ku:'مووچەکەت چەند دەکات؟', ar:'كم يساوي راتبك؟'},
  s3d:{ku:'مووچەکەت بنووسە. بەراورد: پێش 7ی ئۆکتۆبەر (دۆلار {p}) و ئەمڕۆ.', ar:'اكتب راتبك. مقارنة: قبل 7 تشرين الأول (الدولار {p}) واليوم.'},
  tab_d:{ku:'مووچەم بە دینارە', ar:'راتبي بالدينار'}, tab_u:{ku:'مووچەم بە دۆلارە', ar:'راتبي بالدولار'},
  in_d:{ku:'مووچەی مانگانە · دینار', ar:'الراتب الشهري · دينار'}, in_u:{ku:'مووچەی مانگانە · دۆلار', ar:'الراتب الشهري · دولار'},
  cur_d:{ku:'د.ع', ar:'د.ع'},
  f_pre:{ku:'پێش 7ی ئۆکتۆبەر', ar:'قبل 7 تشرين الأول'}, f_now:{ku:'ئەمڕۆ', ar:'اليوم'}, f_diff:{ku:'جیاوازی', ar:'الفرق'},
  say_d_dn:{ku:'هەمان مووچە، بەڵام بە دۆلار {x}% کەمتر دەکات.', ar:'الراتب نفسه، لكنه يساوي {x}% أقل بالدولار.'},
  say_d_up:{ku:'هەمان مووچە، بەڵام بە دۆلار {x}% زیاتر دەکات.', ar:'الراتب نفسه، لكنه يساوي {x}% أكثر بالدولار.'},
  say_u_up:{ku:'{x}% دیناری زیاتر وەردەگریت.', ar:'تستلم {x}% دنانير أكثر.'},
  say_u_dn:{ku:'{x}% دیناری کەمتر وەردەگریت.', ar:'تستلم {x}% دنانير أقل.'},
  say_eq:{ku:'وەک پێش 7ی ئۆکتۆبەرە. گۆڕانێک نییە.', ar:'كما قبل 7 تشرين الأول. لا تغيير.'},
  share:{ku:'بۆ هاوڕێیەکت بنێرە', ar:'أرسلها لصديق'},
  share_txt:{ku:'📊 نەوت چۆن دەبێتە مووچەی تۆ؟\nنەوت ← دۆلار ← دینار ← مووچە 👇', ar:'📊 كيف يصير النفط راتبك؟\nنفط ← دولار ← دينار ← رواتب 👇'},
  disc:{ku:'تەنها بۆ تێگەیشتنە. پێشبینی یان ئامۆژگاریی دارایی و وەبەرهێنان نییە.', ar:'للفهم فقط. ليس توقعاً ولا نصيحة مالية أو استثمارية.'},
};
const ekT=(k,v)=>{ const s=EKS[k]; let t=s?(s[state.lang]||s.ku):k;
  if(v) for(const x in v) t=t.split('{'+x+'}').join(v[x]); return t; };
const ekF=(n,d=0)=>Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const ekNum=s=>s.replace(/\{([^}]+)\}/g,'<span class="n">$1</span>');   // {1,500} in copy → gold number
function ekLive(){ const m=state.mkByKey&&state.mkByKey.OIL_BRENT, u=current('USD100',state.city);
  return {brent:m&&m.price?+m.price:EK.BRENT_FB, street:u&&u.value?u.value/100:EK.STREET_FB}; }
function ekBudget(price,exp,rate){ const usd=exp*EK.DAYS*price/1000, iqd=usd*rate/1000, rev=iqd+EK.NONOIL;   // usd: bn $ · iqd/rev: tn IQD
  return {usd,iqd,rev,cover:rev/EK.NEED,rateFor:Math.ceil((EK.NEED-EK.NONOIL)/usd*1000/10)*10}; }
const EK_SCALE=13;   // gauge spans 0..13 tn IQD
function ekGauge(b){ const short=b.rev<EK.NEED;
  return `<div class="ek-bar"><span class="f${short?' short':''}" style="width:${Math.min(100,b.rev/EK_SCALE*100).toFixed(1)}%"></span>`+
    `<span class="m sal" style="inset-inline-start:${(EK.SAL/EK_SCALE*100).toFixed(1)}%"></span>`+
    `<span class="m" style="inset-inline-start:${(EK.NEED/EK_SCALE*100).toFixed(1)}%"></span></div>`+
    `<div class="ek-bl"><span>${ekT('g_rev')} <b>${ekF(b.rev,1)}</b></span><span>${ekT('g_sal')} <b>${EK.SAL}</b></span><span>${ekT('g_need')} <b>${EK.NEED}</b></span></div>`; }

function renderEcon(){ const box=$('econIn'); if(!box) return;
  const L=ekLive(), b=ekBudget(Math.max(40,Math.min(140,Math.round(L.brent-EK.DISC))),EK.EXP,EK.RATE), short=b.rev<EK.NEED;
  const node=(ic,l,v,s,g)=>`<div class="ek-node"><i class="ic">${EK_IC[ic]}</i><img class="art3d ek-art" src="/static/art/${EK_ART[ic]}.webp?v=133" alt="" loading="lazy" decoding="async"><div class="l">${l}</div><div class="v${g?' g':''}">${v}</div><div class="s">${s}</div></div>`;
  const arr='<div class="ek-arr">◂</div>';
  box.innerHTML=`<span class="qx-live"><i></i>LIVE</span>`+
    `<div class="qx-k">${ekT('kick')}</div><div class="ek-ct">${ekT('title')}</div>`+
    `<div class="ek-chain">`+node('oil',ekT('n_oil'),'$'+ekF(L.brent,1),ekT('n_oil_s'))+arr+
      node('usd',ekT('n_usd'),'$'+ekF(b.usd,1)+'B',ekT('n_usd_s'))+arr+
      node('bank',ekT('n_bud'),ekF(b.rev,1),ekT('n_bud_s'),1)+arr+
      node('cart',ekT('n_st'),ekF(L.street),cityName(state.city))+`</div>`+
    `<div class="ek-gauge"><div class="ek-gl"><span>${ekT('g_lbl')}</span><b style="color:${short?'var(--down)':'var(--gold-2)'}">${Math.round(b.cover*100)}%</b></div>${ekGauge(b)}</div>`+
    `<div class="qx-ask"><div><div class="q">${ekT('ask')}</div><div class="g">${ekT('ask_s')}</div></div><span class="chev"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></span></div>`;
}

const EK_ART={oil:'barrel',usd:'usd',bank:'bank',cart:'cart',loop:'journey',ppl:'salary'};   // build 133: the chain's 3D art (light); 135: + tabs/stations
const ekArt=(ic,c)=>EK_ART[ic]?`<img class="art3d ${c}" src="/static/art/${EK_ART[ic]}.webp?v=133" alt="" loading="lazy" decoding="async">`:'';
const EK_IC={
  oil:'<svg viewBox="0 0 24 24"><path d="M7 3h10c1.4 3 1.4 15 0 18H7C5.6 18 5.6 6 7 3z"/><path d="M6.2 8h11.6M6.2 16h11.6"/></svg>',
  usd:'<svg viewBox="0 0 24 24"><path d="M12 2.5v19"/><path d="M16.8 6.8c-.6-1.6-2.4-2.6-4.8-2.6-2.7 0-4.6 1.4-4.6 3.5 0 4.9 9.6 2.4 9.6 7.6 0 2.2-2 3.6-5 3.6-2.6 0-4.5-1.1-5.1-2.9"/></svg>',
  bank:'<svg viewBox="0 0 24 24"><path d="M3 9.5L12 4l9 5.5"/><path d="M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 20.5h18"/></svg>',
  ppl:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3.1 2.5-5.6 5.5-5.6s5.5 2.5 5.5 5.6"/><path d="M15.5 5.3a3 3 0 0 1 0 5.4M17.5 14.6c1.9.7 3 2.8 3 5.4"/></svg>',
  cart:'<svg viewBox="0 0 24 24"><path d="M2.5 4h2.3l2.4 11h10.4l2.4-7.5H6"/><circle cx="9" cy="19.3" r="1.3"/><circle cx="17" cy="19.3" r="1.3"/></svg>',
  ship:'<svg viewBox="0 0 24 24"><path d="M3 14.5h18l-2.2 5H5.2z"/><path d="M6 14.5V10h12v4.5M9 10V6.5h6V10"/></svg>',
  note:'<svg viewBox="0 0 24 24"><rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M12 9.2l2.4 2.8-2.4 2.8-2.4-2.8z"/><path d="M5.5 12h1.5M17 12h1.5"/></svg>',
  loop:'<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4.5h-4.5"/></svg>'};

// ── the dollar's journey: a banknote travels the rail, lights each station, turns into dinars at the central bank, back into dollars at the trader
let ekFlowT=null;
function ekFlow(L,p0,b){
  const st=[
    {ic:'oil',  t:'f1t', s:'f1s', c:`<div class="ch"><b>$${p0}</b><span>${ekT('f1c')}</span></div>`},
    {ic:'usd',  t:'f2t', s:'f2s', c:`<div class="ch"><b>$${ekF(b.usd,1)}B</b><span>${ekT('f2c')}</span></div>`},
    {ic:'bank', t:'f3t', s:'f3s', c:`<div class="ch"><b>${ekF(EK.RATE)}</b><span>${ekT('f3c')}</span></div>`},
    {ic:'ppl',  t:'f4t', s:'f4s', c:`<div class="ch"><b>${EK.SAL}</b><span>${ekT('f4c')}</span></div>`},
    {ic:'cart', t:'f5t', s:'f5s', c:''},
    {ic:'usd',  t:'f6t', s:'f6s', c:`<div class="ch two"><div><b>${ekF(EK.PUB)}</b><span>${ekT('f6b')}</span></div><div class="hot"><b>${ekF(L.street)}</b><span>${ekT('f6m')}</span></div></div>`}];
  return `<div class="ek-flow" id="ekFlow"><div class="fh"><b>${ekT('fl_h')}</b><span>${ekT('fl_s')}</span></div><div class="fl">`+
    `<div class="rail"><i id="ekRail"></i></div>`+
    `<div class="tok" id="ekTok"><span class="u">$</span><span class="d">${ekT('cur_d')}</span></div>`+
    st.map((x,i)=>`<div class="fs" data-i="${i}"><div class="ic">${EK_IC[x.ic]}${ekArt(x.ic,'fs-art')}<em>${i+1}</em></div><div class="tx"><b>${ekT(x.t)}</b><span>${ekT(x.s)}</span>${x.c}</div></div>`).join('')+
    `</div><div class="floop"><i>${EK_IC.loop}</i>${ekT('fl_loop')}</div></div>`; }
function ekFlowStop(){ clearTimeout(ekFlowT); ekFlowT=null; }
function ekFlowPlay(){ ekFlowStop(); const f=$('ekFlow'); if(!f) return;
  const steps=[...f.querySelectorAll('.fs')], tok=$('ekTok'), rail=$('ekRail'), fl=f.querySelector('.fl');
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){ steps.forEach(s=>s.classList.add('on')); tok.style.display='none'; return; }
  const y=i=>{ const ic=steps[i].querySelector('.ic'); return ic.offsetTop+steps[i].offsetTop+ic.offsetHeight/2; };
  let i=0;
  const go=()=>{ if(!$('econSheet').classList.contains('on')||f.closest('.ekp').hidden) return;
    if(i===steps.length){ f.classList.add('looped'); ekFlowT=setTimeout(()=>{ f.classList.remove('looped'); tok.classList.add('jump');
        steps.forEach(s=>s.classList.remove('on','done')); tok.classList.remove('dn'); tok.style.top=y(0)+'px'; rail.style.height='0px';
        setTimeout(()=>tok.classList.remove('jump'),60); i=0; ekFlowT=setTimeout(go,700); },1600); return; }
    steps.forEach((s,k)=>{ s.classList.toggle('on',k===i); s.classList.toggle('done',k<i); });
    tok.style.top=y(i)+'px'; rail.style.height=Math.max(0,y(i)-y(0))+'px';
    tok.classList.toggle('dn',i>=2&&i<=4);   // dollars become dinars at the central bank, and back to dollars at the trader
    i++; ekFlowT=setTimeout(go,i===1?900:1900); };
  tok.classList.add('jump'); tok.style.top=y(0)+'px'; void tok.offsetWidth; tok.classList.remove('jump'); go(); }

function ekP(el){ el.style.setProperty('--p',((el.value-el.min)/(el.max-el.min)*100)+'%'); }
const EKG={m0:"2019-10",rice:[1250,1250,1250,1250,1250,1281,1300,1188,1177,1169,1139,1145,1132,1152,1218,1227,1225,1250,1207,1223,1207,1216,1440,1280,1379,1400,1408,1463,1500,1903,2133,2319,2050,2000,2068,1855,1877,1980,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,null,2000,2000,2000,2000,2000,2000,2000,2000],oil:[1250,1250,1250,1250,1500,1500,1500,1500,1500,1568,1500,1500,1500,1500,1589,1750,1750,2024,2625,2694,2725,2613,2685,2542,2726,2750,2750,2815,3000,3806,4000,3871,3542,3500,3556,3717,3750,3750,3750,3645,3411,3500,3500,3500,3500,3500,3097,2883,3387,3750,3750,3750,3750,3694,3142,3000,3500,3500,3500,3493,3261,2442,2250,2250,2250,2484,2300,2250,2250,2750,2750,2750,2750,2750,null,2750,2964,3000,3250,3250,3500,3500,3500],sugar:[800,800,800,900,900,900,1035,1100,1123,1131,1081,1102,1065,1112,1111,1111,1100,1100,1100,1077,1100,1100,1174,1130,1110,1100,1100,1100,1100,1219,1617,1426,1483,1500,1477,1500,1500,1500,1500,1500,1443,1423,1400,1400,1400,1400,1481,1500,1500,1500,1500,1500,1500,1500,1500,1432,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,null,1500,1500,1500,1500,1500,1500,1500,1500],flour:[700,700,700,700,750,1056,1281,1188,1053,1061,1000,1000,935,900,958,966,925,902,903,900,888,910,1216,1317,1289,1273,1250,1205,1250,1250,1238,1227,1208,1200,1211,1273,1477,1397,1419,1500,1254,1200,1200,1200,1200,1200,1200,1188,1211,1237,1300,1295,1288,1316,1297,1323,1373,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,1375,null,1375,1482,1500,null,1500,1500,1500,1500],eggs:[3480,3480,3480,3990,4980,5589,5902,5145,5218,4604,3990,3990,4734,5565,5634,5490,5490,5490,5371,4778,4340,5296,5003,5337,5475,5490,5490,5375,5490,5375,5350,5045,4890,4890,4890,4890,4890,4950,5704,6677,6000,6000,6000,5661,4950,4481,4582,5612,6000,6000,6339,6000,6000,6000,5900,4220,4362,4500,4500,4516,5404,6480,6480,5783,4680,4680,4680,4680,4680,4680,4680,6000,4680,4680,null,4680,4680,4680,5490,5000,6000,6000,6000],chicken:[3250,2800,2500,3000,3300,3250,3200,3175,3348,3282,3160,3505,2968,3077,3048,2940,2900,3087,3860,3290,3457,3823,3506,3967,4153,3883,3444,3458,3411,3558,3620,3874,4800,4968,4302,3163,3419,4200,3087,3000,3000,4032,4500,3113,3667,3484,3000,3000,3427,4068,3187,3081,3440,4032,4033,2976,3053,3861,2750,3003,4081,3992,3390,3598,4071,4327,3830,3347,4538,3750,3575,3750,2750,2556,null,3035,3464,3281,3750,3500,4000,4000,4250],beef:[16000,15750,15000,16000,16000,16000,16000,15750,15233,15000,15000,15000,15194,16000,16000,15323,15000,15000,15000,15000,15000,15000,15000,15000,15000,15000,15613,15065,15000,15355,16000,15548,16000,16000,16000,16000,16000,16000,16000,16194,17750,19387,20000,19000,19867,20226,21613,21333,21516,22000,22000,22000,22379,22097,20867,19839,20000,20000,20000,20000,20258,22000,22000,22000,22000,22000,22000,22000,22000,22000,22000,22000,22000,22000,null,22000,22000,22000,24000,24000,24000,24000,24000],tea:[7000,7000,7000,7000,7250,7500,7904,7750,7500,7500,7500,7467,7750,7758,8113,8000,7875,8000,8000,7887,7600,7613,8468,7500,8452,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8806,10268,9387,8883,9500,9500,9500,9097,9000,9000,9000,9000,9000,9000,8887,8500,8306,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,null,8000,8000,8000,8500,8500,8500,8500,8500],lentils:[1000,1000,1000,1000,1000,1125,1240,1150,1080,1119,1052,1000,1000,1000,1023,1000,1000,1000,1000,1000,1000,1000,1194,1200,1200,1200,1200,1223,1200,1200,1200,1200,1200,1200,1200,1220,1215,1200,1413,1411,1343,1200,1200,1200,1200,1200,1240,1250,1321,1347,1300,1300,1324,1334,1360,1368,1450,1489,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,null,1500,1500,1500,1750,3000,2000,2000,2000],milk:[1500,1500,1500,1500,1500,1500,1460,1350,1350,1367,1350,1392,1408,1445,1504,1638,1612,1432,1475,1350,1350,1253,1200,1220,1350,1350,1350,1418,1307,1408,1500,1500,1375,1350,1384,1340,1606,1530,1631,1727,1862,1350,1315,1350,1350,1350,1350,1350,1350,1350,1350,1350,1350,1350,1350,1098,1050,1050,1050,1052,1125,1025,975,975,975,965,915,975,975,975,975,1050,1050,1050,null,1050,1050,1050,3500,3500,3500,3500,3500],tomato:[1000,1000,1000,1000,1000,1000,1067,1000,1117,1000,823,750,911,1000,1000,1000,1000,1000,1000,1000,1000,1000,1258,1292,1250,1250,1250,1250,1250,1250,1250,1250,1250,1250,1194,1308,1315,1333,1435,1484,1580,1500,1383,1113,1000,1000,1000,1050,1621,1842,1887,1750,1810,1694,1350,1056,942,1000,1339,1308,1298,908,1185,1363,1125,1484,1275,1105,1469,1500,1500,1250,1250,1250,null,1250,1250,1469,1500,1250,1000,1000,1000],bread:[1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1074,1000,1000,1000,1000,1000,1000,1000,1000,1000,1213,1206,1275,1000,1000,1071,1000,1000,1000,1000,1000,1000,1000,1000,1000,1217,1320,1320,1320,1320,1324,1327,1328,1085,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,null,1200,1200,1200,1248,1200,1248,1248,1250],gas:[7500,7500,7500,7500,7500,7500,7500,7500,7500,7500,7500,7500,7500,7500,7629,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,9304,9129,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8500,8517,9000,9000,9202,9500,9589,9532,9100,9000,8781,9000,9000,9000,9000,9000,null,9731,10000,27500,20000,15000,15000,15000,15000],petrol:[650,625,625,625,680,675,670,610,607,626,532,523,513,520,524,517,560,599,657,702,755,822,869,900,945,975,975,975,988,1075,1084,1044,1298,1432,1354,1275,1219,1125,1146,1188,1196,1165,1105,1050,1050,1065,1156,1110,1143,1150,1144,1096,1075,1075,1080,1024,1012,1050,1065,1125,1125,1125,1144,1125,1100,1100,1100,1100,1100,1100,1100,1100,1100,1100,null,1112,1125,1169,1175,1125,1250,1350,1750],kero:[585,600,600,600,630,630,622,530,530,530,518,498,482,521,522,525,520,535,602,638,631,614,614,615,707,772,742,841,940,961,1000,974,1052,1190,1107,1083,1568,1430,1500,1369,1050,1031,977,850,850,852,900,1002,1000,1000,1000,1010,1014,1000,1000,1000,1000,1000,1000,1000,1000,1000,963,794,750,750,750,750,750,750,750,750,750,750,null,750,750,750,1000,1000,1000,1000,1000],cheese:[6000,6000,6000,6000,5500,5500,5163,5000,4883,4847,4750,4608,4556,4508,4839,5000,5000,4613,4612,4895,4233,4210,4379,4100,4048,4000,4000,4113,4393,4387,4500,4387,4083,4000,4113,4867,4532,4383,4500,4532,4304,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4065,5167,6129,6919,7000,7355,7500,7500,7500,7500,7500,8000,8000,8000,null,7538,7000,7000,8000,8000,8000,8000,8000],wage:[22000,22000,20000,18000,18000,18000,19615,19500,18000,19355,18677,22600,22000,23500,25000,25000,25000,25000,25000,24226,22000,22000,22000,22000,22000,22000,22000,24129,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,25000,22742,25000,25000,25000,25000,25000,25000,25000,25000,25000,24274,20500,25000,25000,25000,25000,25000,25000,25000,null,25000,25000,25000,null,25000,25000,25000,25000],usd:[1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1182,1454,1459,1451,1473,1487,1489,1473,1479,1476,1480,1481,1482,1479,1474,1465,1467,1478,1480,1480,1481,1480,1475,1469,1507,1601,1569,1552,1455,1456,1470,1493,1520,1547,1596,1611,1553,1518,1518,1496,1471,1456,1467,1494,1497,1503,1531,1506,1509,1509,1499,1476,1468,1424,1412,1392,1412,1415,1414,1417,null,1458,1518,1545,null,1532,1568,1509,1540]};
// ── نرخی کاڵا: 7 years of Sulaymaniyah shelf prices (WFP monthly, 10/2019–8/2026, from suren's price-history study).
// Reading elements stay still; only the relationship moves — the gap between the item and the dollar.
const EKG_IC={
  sack:'<svg viewBox="0 0 24 24"><path d="M8 3h8l-1.5 3.2c3 1.6 4.5 5 4.5 8.3 0 4-3 6.5-7 6.5s-7-2.5-7-6.5c0-3.3 1.5-6.7 4.5-8.3z"/><path d="M9.5 6.2h5"/></svg>',
  bottle:'<svg viewBox="0 0 24 24"><path d="M10 2.5h4v3l1.8 2.6c.5.7.7 1.4.7 2.2V20a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-9.7c0-.8.2-1.5.7-2.2L10 5.5z"/><path d="M7.5 12.5h9"/></svg>',
  egg:'<svg viewBox="0 0 24 24"><path d="M12 3c3.6 0 6.5 5.6 6.5 10.2A6.4 6.4 0 0 1 12 21a6.4 6.4 0 0 1-6.5-7.8C5.5 8.6 8.4 3 12 3z"/></svg>',
  leg:'<svg viewBox="0 0 24 24"><path d="M14.5 3.5a6 6 0 0 1 4.2 10.2c-2 2-4.6 2-6.4 1.6l-3.2 3.2a2 2 0 1 1-2.6-2.6l3.2-3.2c-.4-1.8-.4-4.4 1.6-6.4a6 6 0 0 1 3.2-2.8z"/></svg>',
  meat:'<svg viewBox="0 0 24 24"><path d="M4 13c0-5 4.5-9 9.5-9S21 7 21 11.5 17 20 11.5 20 4 17.5 4 13z"/><circle cx="14" cy="11" r="2.2"/></svg>',
  cup:'<svg viewBox="0 0 24 24"><path d="M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1 1 1.2 1 2.2M12 3.5c0 1 1 1.2 1 2.2"/></svg>',
  can:'<svg viewBox="0 0 24 24"><path d="M8 3h8v3l2 3v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9l2-3z"/><path d="M6 12h12"/></svg>',
  tomato:'<svg viewBox="0 0 24 24"><path d="M12 7.5c4.7 0 8 2.8 8 6.5S16.4 21 12 21s-8-3.3-8-7 3.3-6.5 8-6.5z"/><path d="M12 7.5V4M9 6.5l3 1 3-1"/></svg>',
  bread:'<svg viewBox="0 0 24 24"><path d="M3.5 13.5C3.5 9 7.3 6 12 6s8.5 3 8.5 7.5c0 2.2-1.5 3.5-3.5 3.5H7c-2 0-3.5-1.3-3.5-3.5z"/><path d="M8.5 9.5l1.2 2.5M12 9l.6 2.7M15.5 9.5l-1 2.5"/></svg>',
  gas:'<svg viewBox="0 0 24 24"><rect x="6" y="6.5" width="12" height="14.5" rx="4"/><path d="M9.5 6.5V3.5h5v3M6 11.5h12M6 16h12"/></svg>',
  pump:'<svg viewBox="0 0 24 24"><path d="M4 21V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 14 5v16M3 21h12M6.5 7.5h5v3h-5z"/><path d="M14 9h2l2.5 2.5V17a1.5 1.5 0 0 0 3 0V9l-3-3"/></svg>',
  cheese:'<svg viewBox="0 0 24 24"><path d="M3 15.5L14.5 6 21 11v8H3z"/><path d="M3 15.5h18"/><circle cx="9" cy="17.6" r=".9"/><circle cx="15.5" cy="13" r="1"/></svg>',
  hand:'<svg viewBox="0 0 24 24"><circle cx="12" cy="6.5" r="3"/><path d="M5.5 21v-3.5a6.5 6.5 0 0 1 13 0V21"/><path d="M12 13.5v3"/></svg>'};
const EKG_ITEMS=[
  {k:'rice',ic:'sack',ku:'برنج',ar:'رز',u:'kg',t:'world'},
  {k:'oil',ic:'bottle',ku:'ڕۆن',ar:'زيت',u:'l',t:'world'},
  {k:'sugar',ic:'sack',ku:'شەکر',ar:'سكر',u:'kg',t:'world'},
  {k:'flour',ic:'sack',ku:'ئارد',ar:'طحين',u:'kg',t:'local'},
  {k:'eggs',ic:'egg',ku:'هێلکە',ar:'بيض',u:'egg30',t:'world'},
  {k:'chicken',ic:'leg',ku:'مریشک',ar:'دجاج',u:'kg',t:'policy'},
  {k:'beef',ic:'meat',ku:'گۆشت',ar:'لحم',u:'kg',t:'local'},
  {k:'tea',ic:'cup',ku:'چا',ar:'شاي',u:'kg',t:'usd'},
  {k:'lentils',ic:'sack',ku:'نیسک',ar:'عدس',u:'kg',t:'war'},
  {k:'milk',ic:'can',ku:'شیری وشک',ar:'حليب مجفف',u:'g300',t:'war'},
  {k:'cheese',ic:'cheese',ku:'پەنیر',ar:'جبن',u:'kg',t:'local'},
  {k:'tomato',ic:'tomato',ku:'تەماتە',ar:'طماطة',u:'kg',t:'local'},
  {k:'bread',ic:'bread',ku:'سەمون',ar:'صمون',u:'b8',t:'local'},
  {k:'gas',ic:'gas',ku:'غاز',ar:'غاز',u:'cyl',t:'war'},
  {k:'petrol',ic:'pump',ku:'بەنزین',ar:'بنزين',u:'l',t:'policy'},
  {k:'kero',ic:'pump',ku:'نەوتی سپی',ar:'نفط أبيض',u:'l',t:'world'},
  {k:'wage',ic:'hand',ku:'کرێی کرێکار',ar:'أجر العامل',u:'day',t:'wage'}];
const EKG_U={kg:{ku:'کیلۆ',ar:'كيلو'},l:{ku:'لیتر',ar:'لتر'},egg30:{ku:'30 هێلکە',ar:'30 بيضة'},g300:{ku:'300 گرام',ar:'300 غرام'},
  b8:{ku:'8 سەمون',ar:'8 صمون'},cyl:{ku:'بوتڵ',ar:'قنينة'},day:{ku:'ڕۆژێک',ar:'يومياً'}};
const EKG_T={world:{ku:'نرخی جیهانی + دۆلار',ar:'السعر العالمي + الدولار'},usd:{ku:'دۆلار',ar:'الدولار'},war:{ku:'جەنگ و ڕێگەی هاوردە',ar:'الحرب وطرق الاستيراد'},
  policy:{ku:'بڕیاری حکومەت',ar:'قرار حكومي'},local:{ku:'بەرهەمی ناوخۆ',ar:'إنتاج محلي'},wage:{ku:'کرێ',ar:'الأجر'}};
// events pinned on the timeline (month index from 2019-10)
const EKG_EV=[{m:14,ku:'دابەزاندنی دینار',ar:'خفض الدينار'},{m:28,ku:'جەنگی ئۆکرانیا',ar:'حرب أوكرانيا'},{m:40,ku:'بەهێزکردنی دینار',ar:'رفع الدينار'},{m:76,ku:'جەنگی ئێران',ar:'حرب إيران'}];
let ekgCur='rice';
function ekgL(o){ return o[state.lang]||o.ku; }
function ekGoods(){
  return `<div class="ekg"><div class="ekg-h"><b>${ekT('g_h')}</b><span>${ekT('g_s')}</span></div>`+
    `<div class="ekg-chips" id="ekgChips">${EKG_ITEMS.map(it=>`<button data-k="${it.k}"${it.k===ekgCur?' class="on"':''}><i>${EKG_IC[it.ic]}<img class="art3d ekg-art" src="/static/art/g-${it.k}.webp?v=133" alt="" loading="lazy" decoding="async"></i>${ekgL(it)}</button>`).join('')}</div>`+
    `<div id="ekgBody"></div></div>`; }
function ekgDraw(){
  const it=EKG_ITEMS.find(x=>x.k===ekgCur), ys=EKG[it.k], fx=EKG.usd, n=ys.length;
  const first=ys.findIndex(v=>v!=null), last=n-1-[...ys].reverse().findIndex(v=>v!=null);
  const a=ys[first], b=ys[last], pct=(b/a-1)*100, fpct=(fx[fx.length-1]/fx[0]-1)*100, gap=pct-fpct;
  // both lines as "100 at the start" so the dollar and the item share one scale
  const iy=ys.map(v=>v==null?null:v/a*100), ix=fx.map(v=>v==null?null:v/fx[0]*100);
  const all=[...iy,...ix].filter(v=>v!=null), hi=Math.max(...all)*1.06, lo=Math.min(100,...all)*0.94;
  const W=340,H=200,L=8,R=8,T=14,B=26, X=i=>L+(W-L-R)*i/(n-1), Y=v=>T+(H-T-B)*(1-(v-lo)/(hi-lo));
  const path=arr=>{ let d='',pen=false; arr.forEach((v,i)=>{ if(v==null){pen=false;return;} d+=(pen?'L':'M')+X(i).toFixed(1)+','+Y(v).toFixed(1); pen=true; }); return d; };
  // the band between the two lines, where both exist
  const idx=[...Array(n).keys()].filter(i=>iy[i]!=null&&ix[i]!=null);
  const band='M'+idx.map(i=>X(i).toFixed(1)+','+Y(iy[i]).toFixed(1)).join('L')+'L'+[...idx].reverse().map(i=>X(i).toFixed(1)+','+Y(ix[i]).toFixed(1)).join('L')+'Z';
  const yrs=[2020,2021,2022,2023,2024,2025,2026].map(y=>{ const i=(y-2019)*12-9; return `<text x="${X(i).toFixed(1)}" y="${H-8}" class="yr">${y}</text><line x1="${X(i).toFixed(1)}" x2="${X(i).toFixed(1)}" y1="${T}" y2="${H-B}" class="grid"/>`; }).join('');
  const ev=EKG_EV.map((e,k)=>`<line x1="${X(e.m).toFixed(1)}" x2="${X(e.m).toFixed(1)}" y1="${T}" y2="${H-B}" class="evl"/><circle cx="${X(e.m).toFixed(1)}" cy="${T+2}" r="7" class="evc"/><text x="${X(e.m).toFixed(1)}" y="${T+5.5}" class="evn">${k+1}</text>`).join('');
  const base=`<line x1="${L}" x2="${W-R}" y1="${Y(100).toFixed(1)}" y2="${Y(100).toFixed(1)}" class="base"/>`;
  const xe=X(last), yI=Y(iy[last]), yF=Y(ix[ix.length-1]);
  const cls=gap>10?'hot':gap<-10?'cool':'even';
  const vk=gap>10?'g_more':gap<-10?'g_less':'g_same';
  const unit=ekgL(EKG_U[it.u]), cnt=v=>10000/v, wage=it.k==='wage';
  const k0=cnt(a), k1=cnt(b), kd=v=>v>=10?ekF(v,0):ekF(v,1);
  $('ekgBody').innerHTML=
    `<div class="ekg-hero"><div class="pt"><span>${ekT('g_then')}</span><b>${ekF(a)}</b></div>`+
      `<div class="mid ${cls}"><b>${pct>=0?'+':'−'}${ekF(Math.abs(pct),0)}%</b><span>${ekT('g_in7')}</span></div>`+
      `<div class="pt now"><span>${ekT('g_now')}</span><b>${ekF(b)}</b></div></div>`+
    `<div class="ekg-unit">${ekT('g_unit',{u:unit})} · <em>${ekgL(EKG_T[it.t])}</em></div>`+
    `<div class="ekg-chart"><svg viewBox="0 0 ${W} ${H}">`+
      `<defs><linearGradient id="ekgSweep" x1="0" x2="1"><stop offset="0" stop-color="rgba(231,189,99,0)"/><stop offset=".5" stop-color="rgba(243,212,137,.55)"/><stop offset="1" stop-color="rgba(231,189,99,0)"/></linearGradient>`+
      `<clipPath id="ekgClip"><path d="${band}"/></clipPath></defs>`+
      yrs+base+
      `<path d="${band}" class="band ${cls}"/>`+
      `<rect class="sweep" x="-120" y="0" width="120" height="${H}" fill="url(#ekgSweep)" clip-path="url(#ekgClip)"/>`+
      `<path d="${path(ix)}" class="lx"/><path d="${path(iy)}" class="li ${cls}"/>`+
      ev+
      `<line x1="${xe.toFixed(1)}" x2="${xe.toFixed(1)}" y1="${yI.toFixed(1)}" y2="${yF.toFixed(1)}" class="link"/>`+
      `<circle cx="${xe.toFixed(1)}" cy="${yF.toFixed(1)}" r="3.5" class="dx"/><circle cx="${xe.toFixed(1)}" cy="${yI.toFixed(1)}" r="4.5" class="di ${cls}"/>`+
    `</svg></div>`+
    `<div class="ekg-leg"><span><i class="li ${cls}"></i>${ekgL(it)} <b>${pct>=0?'+':'−'}${ekF(Math.abs(pct),0)}%</b></span><span><i class="lx"></i>${ekT('g_usd')} <b>+${ekF(fpct,0)}%</b></span></div>`+
    `<div class="ekg-verdict ${cls}">${ekT(vk,{i:ekgL(it),a:'\u2066'+(pct>=0?'+':'−')+ekF(Math.abs(pct),0)+'%\u2069',d:'\u2066+'+ekF(fpct,0)+'%\u2069'})}</div>`+
    `<div class="ekg-ev">${EKG_EV.map((e,k)=>`<span><i>${k+1}</i>${ekgL(e)}</span>`).join('')}</div>`+
    (wage?'':`<div class="ekg-pp"><div class="q">${ekT('g_pp')}</div>`+
      `<div class="row"><span class="y">2019</span><div class="bar"><span style="width:100%"></span></div><b>${kd(k0)} <small>${unit}</small></b></div>`+
      `<div class="row"><span class="y">2026</span><div class="bar"><span class="${cls}" style="width:${Math.min(100,k1/k0*100).toFixed(1)}%"></span></div><b>${kd(k1)} <small>${unit}</small></b></div></div>`)+
    `<div class="ekg-note">${ekT('g_note')}</div>`; }
function ekgInit(){ const c=$('ekgChips'); if(!c) return;
  c.onclick=e=>{ const bt=e.target.closest('button'); if(!bt) return; haptic(); ekgCur=bt.dataset.k;
    c.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===bt)); ekgDraw(); track('econ_goods'); };
  ekgDraw(); }

function renderEconSheet(){
  const L=ekLive(), p0=Math.max(40,Math.min(140,Math.round(L.brent-EK.DISC)));
  const st=k=>`<div class="ek-st">${ekT(k)}</div><div class="ek-sd">${ekT(k+'d',{p:ekF(EK.PRE)})}</div>`;
  const TB=[['j','loop','tb_j'],['g','cart','tb_g'],['b','bank','tb_b'],['s','ppl','tb_s']];
  const two=k=>ekT(k).split('|');
  let mode='d', sal=0;
  try{ mode=sessionStorage.getItem('ek_mode')||'d'; sal=+sessionStorage.getItem('ek_sal_'+mode)||0; }catch(e){}
  $('econBody').innerHTML=
    `<div class="ek-h"><div class="k">${ekT('kick')}</div><h3>${ekT('title')}</h3></div>`+
    `<div class="ek-live3">`+
      `<div class="ek-chip live"><b>$${ekF(L.brent,1)}</b><span>${ekT('c_brent')}</span></div>`+
      `<div class="ek-chip live"><b>${ekF(L.street)}</b><span>${ekT('c_st',{c:cityName(state.city)})}</span></div>`+
      `<div class="ek-chip"><b>${ekF(EK.PUB)}</b><span>${ekT('c_off')}</span></div></div>`+
    `<div class="ekt" id="ekTabBar">${TB.map(([p,ic,k])=>`<button data-p="${p}"><i>${EK_IC[ic]}${ekArt(ic,'ekt-art')}</i>${ekT(k)}</button>`).join('')}<span class="ink" id="ekInk"></span></div>`+
    `<div class="ekp" data-p="j">`+ekFlow(L,p0,ekBudget(p0,EK.EXP,EK.RATE))+`</div>`+
    `<div class="ekp" data-p="g" hidden>`+ekGoods()+`</div>`+
    // budget
    `<div class="ekp" data-p="b" hidden><div class="ek-sec">${st('s1')}`+
      `<div class="ek-knob"><div class="hd"><label for="ekKPrice">${ekT('k_price')}</label><b id="ekOPrice"></b></div>`+
        `<input type="range" id="ekKPrice" min="40" max="140" step="1" value="${p0}"><p>${ekT('k_price_h',{b:'\u2066$'+ekF(L.brent,1)+'\u2069'})}</p></div>`+
      `<div class="ek-knob"><div class="hd"><label for="ekKBar">${ekT('k_exp')}</label><b id="ekOBar"></b></div>`+
        `<input type="range" id="ekKBar" min="1" max="4" step="0.05" value="${EK.EXP}"><p>${ekT('k_exp_h')}</p></div>`+
      `<div class="ek-knob"><div class="hd"><label for="ekKRate">${ekT('k_rate')}</label><b id="ekORate"></b></div>`+
        `<input type="range" id="ekKRate" min="1200" max="2000" step="10" value="${EK.RATE}"><p>${ekT('k_rate_h')}</p></div>`+
      `<div class="ek-box" style="margin-top:14px"><div><div class="ek-gl"><span>${ekT('g_lbl')}</span></div><div class="ek-verdict" id="ekVerdict"></div><div id="ekGauge" style="margin-top:10px"></div></div></div>`+
      `<div class="ek-small">${ekT('v_note')}</div></div></div>`+
    // salary
    `<div class="ekp" data-p="s" hidden><div class="ek-sec ek-sal">${st('s3')}`+
      `<div class="ek-tabs" id="ekTabs"><button data-m="d"${mode==='d'?' class="on"':''}>${ekT('tab_d')}</button><button data-m="u"${mode==='u'?' class="on"':''}>${ekT('tab_u')}</button></div>`+
      `<div class="mc2-in"><label id="ekInL"></label><div class="row"><input id="ekSal" inputmode="numeric" autocomplete="off"><span class="cur" id="ekCur"></span></div></div>`+
      `<div class="mc2-facts"><div class="f"><b id="ekF1">—</b><span>${ekT('f_pre')}</span></div><div class="f hl"><b id="ekF2">—</b><span>${ekT('f_now')}</span></div><div class="f"><b id="ekF3">—</b><span>${ekT('f_diff')}</span></div></div>`+
      `<div class="ek-say" id="ekSay"></div></div></div>`+
    `<button class="mc-share" id="ekShare" style="margin-top:22px"><svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg>${ekT('share')}</button>`+
    `<button class="ek-tg" id="ekTg"><span class="tgi"><svg viewBox="0 0 24 24"><path d="M20.7 3.6L2.9 10.5c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.4c.2.7.4.9.9.9.4 0 .6-.2.9-.4l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.2c.3-1.3-.5-1.8-1.5-1.5zM9.6 13.9l8.5-5.4c.4-.2.7-.1.4.2l-7.2 6.5-.3 3.1z"/></svg></span><span class="tx"><b>@dinarchi_iraq</b><span>${ekT('tg_s')}</span></span><span class="go">${ekT('tg_go')}</span></button>`+
    `<div class="ek-disc">${ekT('disc')}</div>`;

  // 1 · equation
  const kP=$('ekKPrice'), kB=$('ekKBar'), kR=$('ekKRate');
  function upd(){ [kP,kB,kR].forEach(ekP);
    const price=+kP.value, bar=+kB.value, rate=+kR.value, b=ekBudget(price,bar,rate);
    $('ekOPrice').textContent='$'+price; $('ekOBar').textContent=ekF(bar,2); $('ekORate').textContent=ekF(rate);
    const pct=Math.round(b.cover*100), col=b.rev>=EK.NEED?'var(--up)':b.rev>=EK.SAL?'#ffb24a':'var(--down)';
    const txt=b.rev>=EK.NEED?ekT('v_ok',{x:ekF(b.rev-EK.NEED,1)}):ekT(b.rev>=EK.SAL?'v_mid':'v_bad',{x:ekF(EK.NEED-b.rev,1),r:ekF(b.rateFor)});
    $('ekVerdict').innerHTML=`<span class="big" style="color:${col}">${pct}%</span>${txt}`;
    $('ekGauge').innerHTML=ekGauge(b); }
  [kP,kB,kR].forEach(el=>el.addEventListener('input',upd)); upd();

  // 3 · salary: dinar earners lose dollars, dollar earners gain dinars (street rate, now vs before 7 Oct)
  const inp=$('ekSal');
  function setMode(m){ mode=m; try{ sessionStorage.setItem('ek_mode',m); sal=+sessionStorage.getItem('ek_sal_'+m)||0; }catch(e){ sal=0; }
    $('ekTabs').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.dataset.m===m));
    $('ekInL').textContent=ekT(m==='d'?'in_d':'in_u'); $('ekCur').textContent=m==='d'?ekT('cur_d'):'$';
    inp.placeholder=m==='d'?'1,000,000':'700'; inp.value=sal?ekF(sal):''; calc(); }
  function calc(){ const S=parseInt((inp.value||'').replace(/[^\d]/g,''))||0; inp.value=S?ekF(S):'';
    try{ sessionStorage.setItem('ek_sal_'+mode,S||''); }catch(e){}
    const now=ekLive().street, pre=EK.PRE;
    if(!S){ ['ekF1','ekF2','ekF3'].forEach(i=>$(i).textContent='—'); $('ekSay').textContent=''; return; }
    let a,b2,pct,key;
    if(mode==='d'){ a=S/pre; b2=S/now; pct=(b2/a-1)*100;
      $('ekF1').textContent='$'+ekF(a); $('ekF2').textContent='$'+ekF(b2);
      key=Math.abs(pct)<0.5?'say_eq':pct<0?'say_d_dn':'say_d_up'; }
    else{ a=S*pre; b2=S*now; pct=(b2/a-1)*100;
      $('ekF1').textContent=ekF(a); $('ekF2').textContent=ekF(b2);
      key=Math.abs(pct)<0.5?'say_eq':pct>0?'say_u_up':'say_u_dn'; }
    const f3=$('ekF3'); f3.textContent=(pct>0?'+':pct<0?'−':'')+ekF(Math.abs(pct),1)+'%';
    f3.style.color=Math.abs(pct)<0.5?'':(pct<0?'var(--down)':'var(--up)');   // either way, a minus means this earner lost
    $('ekSay').textContent=ekT(key,{x:ekF(Math.abs(pct),1)}); }
  inp.addEventListener('input',calc);
  $('ekTabs').querySelectorAll('button').forEach(x=>x.onclick=()=>{ haptic(); setMode(x.dataset.m); });
  setMode(mode);

  ekgInit();
  $('ekTabBar').querySelectorAll('button').forEach(x=>x.onclick=()=>{ haptic(); ekTab(x.dataset.p); track('econ_tab_'+x.dataset.p); });
  // Telegram 7.0+ keeps the Mini App open over the channel it just opened, so the tap looked dead.
  // Open the channel, then close the app so the person lands on it.
  $('ekTg').onclick=()=>{ track('econ_tg'); haptic(); const u='https://t.me/dinarchi_iraq';
    if(tg && tg.openTelegramLink){ try{ tg.openTelegramLink(u); setTimeout(()=>{ try{ tg.close(); }catch(e){} },350); return; }catch(e){} }
    openLink(u); };
  $('ekShare').onclick=()=>{ track('econ_share'); haptic();
    openLink(`https://t.me/share/url?url=${encodeURIComponent('https://t.me/dinarchi_bot')}&text=${encodeURIComponent(ekT('share_txt'))}`); };
}
function openEcon(){ track('econ_open'); haptic(); renderEconSheet(); const b=$('econBody'); if(b) b.scrollTop=0;
  $('econSheet').classList.add('on'); lockScroll(true);
  let t='j'; try{ t=sessionStorage.getItem('ek_tab')||'j'; }catch(e){}
  ekTab(t); }
// tabs: one pane at a time; the gold ink slides under the active tab; the journey only runs while its pane shows
function ekTab(p){ const bar=$('ekTabBar'); if(!bar) return; const bt=bar.querySelector(`[data-p="${p}"]`)||bar.querySelector('button'); p=bt.dataset.p;
  bar.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===bt));
  document.querySelectorAll('#econBody .ekp').forEach(x=>{ x.hidden=x.dataset.p!==p; });
  const ink=$('ekInk'); ink.style.width=bt.offsetWidth+'px'; ink.style.transform=`translateX(${bt.offsetLeft}px)`;
  const body=$('econBody'); if(body && body.scrollTop>bar.offsetTop) body.scrollTop=bar.offsetTop;
  try{ sessionStorage.setItem('ek_tab',p); }catch(e){}
  if(p==='j') ekFlowPlay(); else ekFlowStop(); }
function closeEcon(){ ekFlowStop(); const sh=$('econSheet'); sh.classList.add('closing'); lockScroll(false);
  setTimeout(()=>sh.classList.remove('on','closing','tall'),340); }
$('econClose').onclick=closeEcon; $('econBg').onclick=closeEcon;
{ const ec=$('econCard'); if(ec) ec.onclick=openEcon; }
initSheetDrag('econSheet',closeEcon);
// the card's live numbers (Brent, street $) arrive with the board/markets loads — repaint gently
renderEcon(); setTimeout(renderEcon,1500); setTimeout(renderEcon,6000);
setInterval(()=>{ if(document.visibilityState==='visible') renderEcon(); },30000);
