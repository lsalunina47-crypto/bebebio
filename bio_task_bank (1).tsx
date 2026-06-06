import { useState, useEffect } from "react";

const FONT=`@import url('https://fonts.googleapis.com/css2?family=Brygada+1918:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
*,*::before,*::after{font-family:'Brygada 1918',Georgia,serif!important;box-sizing:border-box}
body{background:#0e1118;margin:0}
select option{background:#1e2538;color:#dde2ed}
::-webkit-scrollbar{width:7px}::-webkit-scrollbar-track{background:#0e1118}
::-webkit-scrollbar-thumb{background:#2a3248;border-radius:4px}`;

const YEARS=["2023/2024","2024/2025","2025/2026","2026/2027"];
const GRADES=["9","10","11"];
const STAGES=["Школьный","Муниципальный","Региональный","Заключительный"];
const BTYPES=["Выбор из 4","Выбор нескольких","Верно/Неверно","Сопоставление","Открытый ответ","Расчёт"];
const LTRS=["А","Б","В","Г","Д","Е","Ж","З"];
const TK="bio_tasks_v2",SK="bio_solved_v2",VK="bio_ver",VER="7";

const SC={Школьный:"#818cf8",Муниципальный:"#38bdf8",Региональный:"#fb923c",Заключительный:"#f43f5e"};
const BC={"Выбор из 4":"#a78bfa","Выбор нескольких":"#22d3ee","Верно/Неверно":"#ec4899",
          "Сопоставление":"#34d399","Расчёт":"#f472b6"};

const Y="2025/2026",G="9",M="Муниципальный";
const op=(...a)=>a.map((t,i)=>({l:LTRS[i],t}));
const mk=(id,num,bt,top,txt,opts,ans,imgs=[])=>
  ({id,num,year:Y,grade:G,stage:M,blockType:bt,topic:top,text:txt,options:opts,answer:ans,images:imgs});

const INIT_ALL=[
  mk("p1_01",1,"Выбор из 4","Микробиология","К бактериальным заболеваниям относится:",op("полиомиелит","скарлатина","ветрянка","лихорадка Западного Нила"),"Б"),
  mk("p1_02",2,"Выбор из 4","Ботаника","У отдела Зеленые водоросли (Chlorophyta) есть все типы дифференциации таллома кроме (примеры на фото А–Г):",op("сифонокладального","ложнотканевого","амебоидного","монадного"),"В",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Codium_tomentosum_ies.jpg/320px-Codium_tomentosum_ies.jpg",label:"А"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ulva_lactuca.jpg/320px-Ulva_lactuca.jpg",label:"Б"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Amoeba_proteus.jpg/320px-Amoeba_proteus.jpg",label:"В"},{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Chlamydomonas_TEM_Eyespot.jpg/320px-Chlamydomonas_TEM_Eyespot.jpg",label:"Г"}]),
  mk("p1_03",3,"Выбор из 4","Ботаника","Перед вами филогенетическое дерево растений. Назовите признак, по которому объединяют харовые водоросли и высшие растения в группу Стрептофиты:",op("все пластиды имеют две мембраны","деление клетки фрагмопластом","есть целлюлоза в клеточной стенке","хлорофиллы a и b"),"Б",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Embryophyte_evolution.svg/400px-Embryophyte_evolution.svg.png",label:""}]),
  mk("p1_04",4,"Выбор из 4","Ботаника","В корне двудольного растения перицикл служит для:",op("закладки ксилемы","избирательного транспорта веществ","накопления крахмальных зерен","образования боковых корней"),"Г"),
  mk("p1_05",5,"Выбор из 4","Ботаника","В состав зародышевого мешка покрытосеменных растений входит:",op("интегумент","синергида","эндосперм","мегаспора"),"Б"),
  mk("p1_06",6,"Выбор из 4","Ботаника","На поперечном срезе унифациального листа ириса проводящие пучки:",op("амфивазальные (ксилема кольцом окружает флоэму), расположены беспорядочно","окружены трансфузионной тканью","открытые коллатеральные, обращены ксилемой к эпидерме","закрытые коллатеральные, обращены флоэмой к эпидерме"),"А",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Iris_leaf_section_OPT.jpg/400px-Iris_leaf_section_OPT.jpg",label:""}]),
  mk("p1_07",7,"Выбор из 4","Ботаника","Эндосперм в семени лиственницы Сукачева (Larix Sukaczewii) представлен:",op("частью женского гаметофита","частью дочернего молодого спорофита","частью материнского спорофита","частью мужского гаметофита"),"А"),
  mk("p1_08",8,"Выбор из 4","Зоология беспозвоночных","Выберите животных, которым свойственны и гермафродитизм, и внутреннее оплодотворение:",op("дождевой червь","виноградная улитка","речной рак","гидра"),"Б"),
  mk("p1_09",9,"Выбор из 4","Зоология беспозвоночных","Представители какой группы беспозвоночных способны прокладывать в почве ходы до двух метров глубиной:",op("кольчатые черви","плоские черви","круглые черви","моллюски"),"А"),
  mk("p1_10",10,"Выбор из 4","Зоология позвоночных","Основные перестройки в строении представителей подтипа Позвоночные по сравнению с другими подтипами Хордовых связаны с:",op("увеличением размеров тела и уровня активности","выходом на сушу","формированием органов воздушного дыхания","появлением теплокровности"),"А"),
  mk("p1_11",11,"Выбор из 4","Ботаника","Слой апельсина, который чаще всего употребляется в пищу, является:",op("экзокарпием","мезокарпием","эндокарпием","семенной кожурой"),"В",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Orange_Pieces_2.jpg/400px-Orange_Pieces_2.jpg",label:""}]),
  mk("p1_12",12,"Выбор из 4","Зоология позвоночных","Представителями какого отряда являются морские коньки?",op("иглобрюхообразные","иглообразные","кефалеобразные","скорпенообразные"),"Б",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hippocampus_kuda.jpg/400px-Hippocampus_kuda.jpg",label:""}]),
  mk("p1_13",13,"Выбор из 4","Зоология беспозвоночных","Колюще-сосущий ротовой аппарат имеют насекомые отряда",op("клопы","жуки","перепончатокрылые","бабочки"),"А"),
  mk("p1_14",14,"Выбор из 4","Анатомия человека","Гормон, отвечающий за адаптацию организма к стрессу. Его формула приведена:",op("альдостерон","инсулин","кортизол","тироксин"),"В",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/0/0a/Cortisol2.svg",label:""}]),
  mk("p1_15",15,"Выбор из 4","Анатомия человека","Как называется электрический сигнал, распространяющийся по аксону?",op("градиент","потенциал действия","порог возбуждения","рефлекс"),"Б",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Action_potential.svg/500px-Action_potential.svg.png",label:""}]),
  mk("p1_16",16,"Выбор из 4","Анатомия человека","Как называется структура, покрытая синовиальной оболочкой?",op("сустав","кость","хрящ","сухожилие"),"А"),
  mk("p1_17",17,"Выбор из 4","Анатомия человека","Образования изображённого органа воспринимают и передают информацию из окружающей среды в ЦНС – это клетки:",op("кортиева органа","вестибулярного аппарата","тельца Пачини","палочки и колбочки"),"А",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cochlea-crosssection.png/400px-Cochlea-crosssection.png",label:""}]),
  mk("p1_18",18,"Выбор из 4","Анатомия человека","В почках фильтрация форменных элементов крови происходит в:",op("пирамидках","капсулах нефрона","проксимальном и дистальном извитом канальцах","лоханках"),"Б"),
  mk("p1_19",19,"Выбор из 4","Клеточная биология","Что обеспечивает подвижность жгутиков и ресничек?",op("актиновые нити","ядрышко","микротрубочки","эндоплазматическая сеть"),"В"),
  mk("p1_20",20,"Выбор из 4","Генетика","С какой хромосомой связано формирование красно- и зеленочувствительных колбочек сетчатки:",op("16 хромосома","21 хромосома","Y хромосома","Х хромосома"),"Г"),
  // ── part 2 ──
  mk("p2_21",21,"Выбор нескольких","Ботаника",
    "Перед Вами две фотографии пыльцевого зерна сосны обыкновенной, сделанные различными способами микроскопии. Выберите верные утверждения.",
    op("фото 1 — конфокальная микроскопия","фото 1 — оптическая микроскопия","фото 1 — флуоресцентная микроскопия","фото 2 — электронная микроскопия","фото 2 — атомно-силовая микроскопия"),"А, Г",
    [{url:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Pinus_sylvestris_pollen_under_Confocal_Laser_Scanning_Microscope.jpg",label:"Фото 1"},
     {url:"https://upload.wikimedia.org/wikipedia/commons/5/54/Pinus_pollen_SE.jpg",label:"Фото 2"}]),
  mk("p2_22",22,"Выбор нескольких","Ботаника","У каких из перечисленных растений отсутствуют плоды?",op("эфедра двухколосковая","рябина обыкновенная","можжевельник обыкновенный","гинкго двулопастный","тис ягодный"),"А, В, Г, Д"),
  mk("p2_23",23,"Выбор нескольких","Эволюция","У каких позвоночных из этого списка хобот на самом деле отсутствует:",op("макраухения (отряд Южноамериканские копытные)","гиенодон (отряд Креодонты)","мастодонт (отряд Хоботные)","мегатерий (отряд Неполнозубые)"),"Б, Г"),
  {id:"i1",num:24,year:Y,grade:G,stage:M,blockType:"Выбор нескольких",topic:"Зоология беспозвоночных",images:[],
   text:"Куколки отсутствуют у представителей следующих отрядов насекомых:",
   options:op("уховертки","чешуекрылые","прямокрылые","стрекозы","веснянки"),answer:"А, В, Г, Д"},
  {id:"i2",num:25,year:Y,grade:G,stage:M,blockType:"Выбор нескольких",topic:"Ботаника",images:[],
   text:"Из Однодольных растений получают пряности:",
   options:op("ваниль","корица","кардамон","анис","фенугрек"),answer:"А, В"},
  {id:"i3",num:26,year:Y,grade:G,stage:M,blockType:"Выбор нескольких",topic:"Анатомия человека",images:[],
   text:"Какие оболочки окружают головной мозг?",
   options:op("мягкая","надкостница","паутинная","эпендима","твёрдая"),answer:"А, В, Д"},
  {id:"i4",num:27,year:Y,grade:G,stage:M,blockType:"Выбор нескольких",topic:"Анатомия человека",images:[],
   text:"Какие структуры входят в состав периферической нервной системы?",
   options:op("спинномозговые нервы","черепные нервы","большие полушария","мозжечок","вегетативные ганглии"),answer:"А, Б, Д"},
  mk("p2_28",28,"Выбор нескольких","Анатомия человека","Какие медиаторы относятся к возбуждающим?",op("ацетилхолин","глутамат","ГАМК","дофамин","глицин"),"А, Б, Г"),
  mk("p2_29",29,"Выбор нескольких","Анатомия человека","Какие кости относятся к мозговому отделу черепа?",op("лобная кость","затылочная кость","верхняя челюсть","скуловая кость","теменная кость"),"А, Б, Д"),
  // ── part 3 (Выбор нескольких: А=Да, Б=Нет) ──
  mk("p3_30",30,"Выбор нескольких","Ботаника","Диатомовые водоросли продуцируют основное количество кислорода, содержащегося в атмосфере.",op("Да","Нет"),"Б"),
  mk("p3_31",31,"Выбор нескольких","Ботаника","Пластиды бурых водорослей имеют оболочку из 4 мембран.",op("Да","Нет"),"А"),
  mk("p3_32",32,"Выбор нескольких","Ботаника","У папоротников гаметы образуются в результате мейоза.",op("Да","Нет"),"Б"),
  mk("p3_33",33,"Выбор нескольких","Ботаника","Транспирация может происходить не только через устьица, но и непосредственно через кутикулу листьев.",op("Да","Нет"),"А"),
  mk("p3_34",34,"Выбор нескольких","Зоология беспозвоночных","Брюхоногие моллюски не могут обитать на сфагновых болотах из-за низкого значения pH.",op("Да","Нет"),"А"),
  mk("p3_35",35,"Выбор нескольких","Зоология позвоночных","В коже у земноводных имеется большое количество сальных и потовых желёз.",op("Да","Нет"),"Б"),
  mk("p3_36",36,"Выбор нескольких","Зоология позвоночных","Для птиц характерно наличие левой дуги аорты в кровеносной системе.",op("Да","Нет"),"Б"),
  mk("p3_37",37,"Выбор нескольких","Анатомия человека","Кровеносные сосуды отсутствуют в роговице глазного яблока.",op("Да","Нет"),"А"),
  mk("p3_38",38,"Выбор нескольких","Анатомия человека","Йодсодержащий гормон тироксин вырабатывается в гипофизе.",op("Да","Нет"),"Б"),
  mk("p3_39",39,"Выбор нескольких","Анатомия человека","Мозжечок у шимпанзе отвечает за регуляцию дыхания и формирование эмоций.",op("Да","Нет"),"Б"),
  mk("p3_40",40,"Выбор нескольких","Анатомия человека","Остеоциты образуются из остеобластов, утрачивают способность к делению, а главной их функцией остаётся выделение большого количества межклеточного вещества.",op("Да","Нет"),"Б"),
  // ── part 4 ──
  mk("p4_41",41,"Сопоставление","Ботаника","Соотнесите ткани или их структуры (А-Ж) с фотографией (1–7).\nА – астросклереида; Б – колленхима; В – трихома; Г – аэренхима; Д – устьице; Е – эндодерма; Ж – проводящий пучок",[],"1-Д, 2-Б, 3-В, 4-Ж, 5-Г, 6-А, 7-Е"),
  mk("p4_42",42,"Сопоставление","Зоология позвоночных","Соотнесите организмы (1–8) и особенности строения сердца (А-З).\n1-ланцетник; 2-оболочник; 3-минога; 4-скат; 5-тунец; 6-лягушка; 7-черепаха; 8-мышь",[],"1-Е, 2-Б, 3-В, 4-З, 5-Ж, 6-Д, 7-Г, 8-А"),
  mk("p4_43",43,"Сопоставление","Анатомия человека","Соотнесите клетки, обозначенные цифрами (1–6), с названиями (А–Е).\nА – Микроглия; Б – Астроцит; В – Эритроцит; Г – Олигодендроцит; Д – Эпендимоцит; Е – Нейрон",[],"1-Д, 2-Б, 3-Е, 4-Г, 5-А, 6-В"),
];

const emptyF=()=>({year:Y,grade:G,stage:M,blockType:"Выбор нескольких",topic:"",text:"",num:"",
  options:[{l:"А",t:""},{l:"Б",t:""},{l:"В",t:""},{l:"Г",t:""}],answer:"",imageUrl:""});
const hasO=bt=>["Выбор из 4","Выбор нескольких","Сопоставление"].includes(bt);
const norm=s=>{if(!s)return"";const up=s.trim().toUpperCase();const p=up.split(/[\s,;]+/).filter(Boolean);return p.length>1?p.sort().join(","):up;};

const bg="#0e1118",crd="#161c2a",bdr="#252d3f",acc="#e8a534",
      tx="#dde2ed",mt="#7b8599",inp_="#1e2538",inpB="#343c52";

const S={
  app:{background:bg,minHeight:"100vh",color:tx},
  hdr:{background:"#12182a",borderBottom:`1px solid ${bdr}`,padding:"13px 22px",display:"flex",
       alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,
       position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 12px #00000050"},
  logo:{fontSize:16,fontWeight:700,color:acc},
  tabs:{display:"flex",gap:6,flexWrap:"wrap"},
  tab:{background:"transparent",border:`1px solid ${bdr}`,color:mt,padding:"6px 13px",borderRadius:7,cursor:"pointer",fontSize:12},
  tabOn:{background:acc,border:`1px solid ${acc}`,color:"#0e1118",padding:"6px 13px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700},
  fbar:{background:"#101624",borderBottom:`1px solid ${bdr}`,padding:"10px 22px",display:"flex",flexWrap:"wrap",gap:7,alignItems:"center"},
  sbar:{padding:"7px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${bdr}`,background:"#101624"},
  cnt:{color:mt,fontSize:12},
  tog:{display:"flex",alignItems:"center",gap:5,fontSize:12,color:mt,cursor:"pointer",userSelect:"none"},
  tlist:{padding:"16px 22px",display:"flex",flexDirection:"column",gap:11},
  card:{background:crd,border:`1px solid ${bdr}`,borderRadius:11,padding:"15px 18px 14px"},
  ch:{display:"flex",flexWrap:"wrap",gap:5,alignItems:"center",marginBottom:10},
  bdg:{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,color:"#fff"},
  numB:{background:"#1e2538",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,color:acc},
  metaB:{background:"#1a2030",padding:"2px 8px",borderRadius:20,fontSize:10,color:mt},
  topB:{background:"#1a2030",padding:"2px 8px",borderRadius:20,fontSize:10,color:"#90b8e0",fontStyle:"italic"},
  okB:{marginLeft:"auto",color:"#4ade80",fontSize:10,border:"1px solid #3a6a3a",padding:"2px 8px",borderRadius:20,background:"#1a2e1a"},
  errB:{marginLeft:"auto",color:"#f87171",fontSize:10,border:"1px solid #6a3a3a",padding:"2px 8px",borderRadius:20,background:"#2e1a1a"},
  qtxt:{fontSize:14,lineHeight:1.75,margin:"0 0 11px",whiteSpace:"pre-line"},
  ol:{listStyle:"none",margin:"0 0 12px",padding:0,display:"flex",flexDirection:"column",gap:4},
  oi:{fontSize:13,color:"#bcc6d8",display:"flex",gap:6},
  olt:{color:acc,fontWeight:700,minWidth:18,flexShrink:0},
  ansRow:{display:"flex",gap:8,alignItems:"stretch"},
  ansInp:{flex:1,border:"1px solid",color:tx,padding:"9px 13px",borderRadius:8,fontSize:13,outline:"none"},
  checkBtn:{background:"#1a2035",border:`1px solid ${bdr}`,color:mt,padding:"9px 16px",borderRadius:8,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0},
  ynBtn:{border:"1px solid",padding:"9px 0",borderRadius:8,cursor:"pointer",fontSize:13,flex:1,fontWeight:600,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",gap:6},
  anserr:{marginTop:10,background:"#2e1a1a",border:"1px solid #5a2a2a",borderRadius:8,padding:"9px 13px",fontSize:13},
  abtn:{background:"transparent",border:`1px solid ${bdr}`,color:mt,padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:11},
  delBtn:{background:"transparent",border:"none",color:"#363e52",cursor:"pointer",padding:"8px 10px",borderRadius:7,fontSize:15,flexShrink:0},
  empty:{textAlign:"center",color:mt,padding:"70px 0",fontSize:13},
  addW:{maxWidth:680,margin:"22px auto",padding:"0 18px 50px"},
  fcrd:{background:crd,border:`1px solid ${bdr}`,borderRadius:13,padding:"24px"},
  ftit:{margin:"0 0 20px",fontSize:18,fontWeight:700,color:acc},
  mrow:{display:"flex",gap:9,flexWrap:"wrap",marginBottom:13},
  fg:{marginBottom:15},
  fl:{display:"block",fontSize:10,color:mt,textTransform:"uppercase",letterSpacing:".07em",marginBottom:6},
  fi:{background:inp_,border:`1px solid ${inpB}`,color:tx,padding:"8px 11px",borderRadius:7,fontSize:13,width:"100%",outline:"none"},
  fta:{background:inp_,border:`1px solid ${inpB}`,color:tx,padding:"9px 11px",borderRadius:7,fontSize:13,width:"100%",resize:"vertical",lineHeight:1.7,outline:"none"},
  fsel:{background:inp_,border:`1px solid ${inpB}`,color:tx,padding:"8px 11px",borderRadius:7,fontSize:13,cursor:"pointer",width:"100%",outline:"none"},
  orow:{display:"flex",gap:8,alignItems:"center",marginBottom:7},
  olt_:{color:acc,fontWeight:700,fontSize:14,minWidth:22},
  oi_:{flex:1,background:inp_,border:`1px solid ${inpB}`,color:tx,padding:"7px 10px",borderRadius:7,fontSize:13,outline:"none"},
  rem:{background:"transparent",border:"none",color:mt,cursor:"pointer",fontSize:15,padding:"3px 7px",borderRadius:5},
  addO:{background:"transparent",border:`1px dashed ${inpB}`,color:mt,padding:"7px",borderRadius:7,cursor:"pointer",fontSize:12,width:"100%",marginTop:3},
  hint:{margin:"4px 0 0",fontSize:11,color:mt,fontStyle:"italic"},
  subrow:{display:"flex",gap:10,alignItems:"center",justifyContent:"flex-end",marginTop:6},
  sub:{background:acc,border:"none",color:"#0e1118",padding:"9px 22px",borderRadius:7,cursor:"pointer",fontSize:13,fontWeight:700},
  grp:{flex:1,minWidth:120},
  statsW:{padding:"20px 24px",maxWidth:760},
  statsCrds:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24},
  statC:{background:crd,border:`1px solid ${bdr}`,borderRadius:10,padding:"14px 18px",flex:"1 0 110px"},
  statCl:{fontSize:11,color:mt,marginBottom:5},
  statCv:{fontSize:21,fontWeight:700},
  secH:{fontSize:11,color:acc,textTransform:"uppercase",letterSpacing:".07em",margin:"0 0 12px",fontWeight:700},
  prRow:{marginBottom:9},
  prLbl:{display:"flex",justifyContent:"space-between",marginBottom:3,fontSize:12},
  prBar:{background:"#1e2538",borderRadius:6,height:8,overflow:"hidden",display:"flex"},
  prFill:{height:"100%",transition:"width .4s ease"},
  overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,.72)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100},
  modal:{background:"#1c2336",border:`1px solid ${bdr}`,borderRadius:14,padding:"28px 28px 24px",textAlign:"center",width:280,maxWidth:"90vw"},
  modalYes:{background:"#dc2626",border:"none",color:"#fff",padding:"9px 20px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600},
  modalNo:{background:"#252d3f",border:`1px solid ${bdr}`,color:mt,padding:"9px 20px",borderRadius:8,cursor:"pointer",fontSize:13},
};

// ── option state colours ──
const OC={
  def:{bg:"transparent",bd:inpB,txt:"#bcc6d8",ind:inpB,dot:null},
  sel:{bg:"#1a2a40",bd:acc,txt:tx,ind:acc,dot:acc},
  corr:{bg:"#162516",bd:"#2d5a3a",txt:"#90e090",ind:"#4ade80",dot:"#4ade80"},
  wrong:{bg:"#2e1a1a",bd:"#6a2a2a",txt:"#f87171",ind:"#f87171",dot:"#f87171"},
  dim:{bg:"transparent",bd:"#1a2030",txt:"#2e3a4d",ind:"#1a2030",dot:null},
};

const CheckIcon=()=>(
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ResetIcon=()=>(
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{flexShrink:0}}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" strokeLinecap="round"/>
    <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function FSel({lbl,val,set,opts}){
  return(
    <select value={val} onChange={e=>set(e.target.value)}
      style={{...S.fsel,minWidth:85,width:"auto",flex:"0 0 auto"}}>
      <option value="">{lbl}</option>
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function FGSel({lbl,val,set,opts}){
  return(
    <div style={S.grp}>
      <label style={S.fl}>{lbl}</label>
      <select value={val} onChange={e=>set(e.target.value)} style={S.fsel}>
        {opts.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function TCard({task,solved,onSolve,onDel}){
  const[sel,setSel]=useState(new Set());
  const[checked,setChecked]=useState(false);
  const[ok,setOk]=useState(false);
  const[textAns,setTextAns]=useState("");

  const isSingle=task.blockType==="Выбор из 4";
  const isMulti=task.blockType==="Выбор нескольких";
  const isYN=task.blockType==="Верно/Неверно";
  const isInteractive=isSingle||isMulti;
  const correctSet=new Set((task.answer||"").split(/[\s,;]+/).filter(Boolean));

  const toggle=l=>{
    if(checked)return;
    if(isSingle)setSel(new Set([l]));
    else{const n=new Set(sel);n.has(l)?n.delete(l):n.add(l);setSel(n);}
  };

  const doCheck=()=>{
    if(isInteractive){
      const c=sel.size===correctSet.size&&[...sel].every(l=>correctSet.has(l));
      setChecked(true);setOk(c);onSolve(c);
    }else{
      if(!textAns.trim())return;
      const c=norm(textAns)===norm(task.answer);
      setChecked(true);setOk(c);onSolve(c);
    }
  };
  const doYN=a=>{const c=a===(task.answer||"").trim();setChecked(true);setOk(c);onSolve(c);};
  const doReset=()=>{setSel(new Set());setTextAns("");setChecked(false);setOk(false);onSolve(undefined);};

  const stOf=l=>{
    const isSel=sel.has(l),isCorr=correctSet.has(l);
    if(!checked)return isSel?"sel":"def";
    if(isCorr)return"corr";
    if(isSel)return"wrong";
    return"dim";
  };

  const renderOpts=()=>(
    <ul style={{listStyle:"none",margin:"0 0 12px",padding:0,display:"flex",flexDirection:"column",gap:5}}>
      {task.options.map(o=>{
        const st=stOf(o.l),c=OC[st],isSel=sel.has(o.l),showDot=isSel||st==="corr";
        const ltrC=st==="corr"?"#4ade80":st==="wrong"?"#f87171":st==="dim"?"#2e3a4d":acc;
        return(
          <li key={o.l} onClick={()=>toggle(o.l)} style={{
            display:"flex",gap:10,alignItems:"center",padding:"8px 12px",
            borderRadius:8,border:`1px solid ${c.bd}`,background:c.bg,
            cursor:checked?"default":"pointer",userSelect:"none",
            transition:"background .12s,border-color .12s",fontSize:13,color:c.txt
          }}>
            {/* indicator */}
            {isSingle?(
              <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${c.ind}`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"border-color .12s"}}>
                {showDot&&c.dot&&<div style={{width:9,height:9,borderRadius:"50%",background:c.dot}}/>}
              </div>
            ):(
              <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${c.ind}`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                background:isSel&&!checked?"#1a2540":"transparent",transition:"all .12s"}}>
                {showDot&&c.dot&&(
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke={c.dot} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                )}
              </div>
            )}
            <span style={{color:ltrC,fontWeight:700,minWidth:18,flexShrink:0}}>{o.l})</span>
            <span>{o.t}</span>
          </li>
        );
      })}
    </ul>
  );

  return(
    <div style={{...S.card,borderLeft:`4px solid ${SC[task.stage]||"#555"}`}}>
      <div style={S.ch}>
        <span style={S.numB}>№ {task.num}</span>
        <span style={{...S.bdg,background:BC[task.blockType]||"#555"}}>{task.blockType}</span>
        <span style={{...S.bdg,background:SC[task.stage]||"#555"}}>{task.stage}</span>
        <span style={S.metaB}>{task.year} · {task.grade} кл.</span>
        {task.topic&&<span style={S.topB}>{task.topic}</span>}
        {solved===true&&<span style={S.okB}>✓ Решено верно</span>}
        {solved===false&&<span style={S.errB}>✗ Неверно</span>}
      </div>
      <p style={S.qtxt}>{task.text}</p>

      {/* images */}
      {task.images?.filter(i=>i.url).length>0&&(
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
          {task.images.filter(i=>i.url).map((img,i)=>(
            <figure key={i} style={{flex:1,minWidth:140,margin:0,textAlign:"center"}}>
              <img src={img.url} alt={img.label||`фото ${i+1}`}
                onError={e=>{e.currentTarget.style.display="none";}}
                style={{width:"100%",maxHeight:200,objectFit:"contain",borderRadius:8,
                  border:`1px solid ${bdr}`,background:"#0e1420",display:"block"}}/>
              <figcaption style={{fontSize:11,color:mt,marginTop:5}}>{img.label||`фото ${i+1}`}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* options */}
      {isInteractive&&task.options?.length>0?renderOpts()
       :task.options?.length>0&&(
        <ul style={S.ol}>
          {task.options.map(o=><li key={o.l} style={S.oi}><span style={S.olt}>{o.l})</span>{o.t}</li>)}
        </ul>
      )}

      {/* action */}
      {isYN?(
        <div style={S.ansRow}>
          {!checked?(
            <>
              <button onClick={()=>doYN("Да")} style={{...S.ynBtn,color:"#4ade80",borderColor:"#2d5a3a"}}>Да</button>
              <button onClick={()=>doYN("Нет")} style={{...S.ynBtn,color:"#f87171",borderColor:"#5a2d2d"}}>Нет</button>
            </>
          ):(
            <button onClick={doReset} style={{...S.checkBtn,flex:1,justifyContent:"center",
              color:ok?"#4ade80":mt,borderColor:ok?"#2d5a3a":bdr,background:ok?"#162516":"transparent"}}>
              <ResetIcon/>{ok?" Верно ✓ — Сбросить":" Сбросить"}
            </button>
          )}
          <button onClick={onDel} style={S.delBtn}>🗑</button>
        </div>
      ):isInteractive?(
        <div style={S.ansRow}>
          <button onClick={checked?doReset:doCheck}
            disabled={!checked&&sel.size===0}
            style={{...S.checkBtn,...(checked&&ok?{color:"#4ade80",borderColor:"#2d5a3a",background:"#162516"}:{}),
              opacity:!checked&&sel.size===0?.35:1}}>
            {checked?<><ResetIcon/> Сбросить</>:<><CheckIcon/> Проверить</>}
          </button>
          <button onClick={onDel} style={S.delBtn}>🗑</button>
        </div>
      ):(
        <div style={S.ansRow}>
          <input value={textAns}
            onChange={e=>{setTextAns(e.target.value);if(checked&&!ok)setChecked(false);}}
            onKeyDown={e=>e.key==="Enter"&&doCheck()} disabled={ok}
            style={{...S.ansInp,background:checked?(ok?"#162516":"#2c1a1a"):inp_,
              borderColor:checked?(ok?"#2d5a3a":"#6a2a2a"):inpB,
              color:checked?(ok?"#6ee090":"#f87171"):tx}}
            placeholder="Введи ответ"/>
          <button onClick={ok?doReset:doCheck}
            style={{...S.checkBtn,...(ok?{color:"#4ade80",borderColor:"#2d5a3a",background:"#162516"}:{})}}>
            {ok?<><ResetIcon/>Сбросить</>:<><CheckIcon/>Проверить</>}
          </button>
          <button onClick={onDel} style={S.delBtn}>🗑</button>
        </div>
      )}

      {checked&&!ok&&task.answer&&(
        <div style={S.anserr}>
          <span style={{color:"#f87171"}}>Неверно. </span>
          <span style={{color:"#a0c0a0"}}>Правильный ответ: </span>
          <strong style={{color:"#90e090"}}>{task.answer}</strong>
        </div>
      )}
    </div>
  );
}

function AddForm({form,set,oChg,oAdd,oRem,onSub,status}){
  const opts=hasO(form.blockType);
  return(
    <div style={S.addW}>
      <div style={S.fcrd}>
        <h2 style={S.ftit}>Добавить задание</h2>
        <div style={S.mrow}>
          <FGSel lbl="Год" val={form.year} set={v=>set("year",v)} opts={YEARS}/>
          <FGSel lbl="Класс" val={form.grade} set={v=>set("grade",v)} opts={GRADES}/>
          <FGSel lbl="Этап" val={form.stage} set={v=>set("stage",v)} opts={STAGES}/>
          <FGSel lbl="Тип блока" val={form.blockType} set={v=>set("blockType",v)} opts={BTYPES}/>
        </div>
        <div style={S.mrow}>
          <div style={{...S.grp,flex:3}}>
            <label style={S.fl}>Тема</label>
            <input value={form.topic} onChange={e=>set("topic",e.target.value)} style={S.fi} placeholder="напр. Зоология позвоночных"/>
          </div>
          <div style={{...S.grp,flex:"0 0 105px"}}>
            <label style={S.fl}>№ задания</label>
            <input type="number" value={form.num} onChange={e=>set("num",e.target.value)} style={S.fi} placeholder="авто"/>
          </div>
        </div>
        <div style={S.fg}>
          <label style={S.fl}>Текст задания</label>
          <textarea value={form.text} onChange={e=>set("text",e.target.value)} style={S.fta} placeholder="Введите текст вопроса..." rows={4}/>
        </div>
        {opts&&(
          <div style={S.fg}>
            <label style={S.fl}>Варианты ответов</label>
            {form.options.map((o,i)=>(
              <div key={i} style={S.orow}>
                <span style={S.olt_}>{o.l})</span>
                <input value={o.t} onChange={e=>oChg(i,e.target.value)} style={S.oi_} placeholder={`Вариант ${o.l}`}/>
                <button onClick={()=>oRem(i)} style={S.rem}>✕</button>
              </div>
            ))}
            {form.options.length<8&&<button onClick={oAdd} style={S.addO}>+ Добавить вариант</button>}
          </div>
        )}
        <div style={S.fg}>
          <label style={S.fl}>Правильный ответ</label>
          <input value={form.answer} onChange={e=>set("answer",e.target.value)} style={S.fi}
            placeholder={opts?"напр. А, В, Г":form.blockType==="Верно/Неверно"?"Да или Нет":"Введите ответ"}/>
          {opts&&<p style={S.hint}>Укажите буквы верных вариантов через запятую</p>}
        </div>
        <div style={S.fg}>
          <label style={S.fl}>URL изображения (необязательно)</label>
          <input value={form.imageUrl||""} onChange={e=>set("imageUrl",e.target.value)} style={S.fi} placeholder="https://..."/>
        </div>
        <div style={S.subrow}>
          {status==="ok"&&<span style={{color:"#4ade80",fontSize:12}}>✓ Задание сохранено!</span>}
          {status&&status!=="ok"&&<span style={{color:"#f87171",fontSize:12}}>{status}</span>}
          <button onClick={onSub} style={S.sub}>Сохранить задание</button>
        </div>
      </div>
    </div>
  );
}

function StatsTab({tasks,solved}){
  const total=tasks.length,nOk=tasks.filter(t=>solved[t.id]===true).length,
        nBad=tasks.filter(t=>solved[t.id]===false).length,nd=total-nOk-nBad;
  const pct=n=>total?Math.round(n/total*100):0;
  const group=fn=>{const m={};tasks.forEach(t=>{const k=fn(t)||"—";if(!m[k])m[k]={t:0,ok:0,bad:0};m[k].t++;if(solved[t.id]===true)m[k].ok++;else if(solved[t.id]===false)m[k].bad++;});return Object.entries(m).sort((a,b)=>a[0].localeCompare(b[0],"ru"));};
  const PRow=({lbl,ok,tot,bad,color})=>{const op=tot?Math.round(ok/tot*100):0,bp=tot?Math.round(bad/tot*100):0;return(
    <div style={S.prRow}>
      <div style={S.prLbl}><span style={{color:color||tx,fontSize:12}}>{lbl}</span><span style={{color:mt,fontSize:11}}>{ok}/{tot}</span></div>
      <div style={S.prBar}>
        <div style={{...S.prFill,width:`${op}%`,background:color||"#4ade80",opacity:.9}}/>
        <div style={{...S.prFill,width:`${bp}%`,background:"#f87171"}}/>
      </div>
    </div>
  );};
  return(
    <div style={S.statsW}>
      <div style={S.statsCrds}>
        {[["📋","Всего",total,acc],["✓","Верно",`${nOk} (${pct(nOk)}%)`,"#4ade80"],
          ["✗","Неверно",`${nBad} (${pct(nBad)}%)`,"#f87171"],["○","Не пройдено",`${nd} (${pct(nd)}%)`,"#6b7a90"]]
          .map(([ic,lb,vl,cl])=>(
            <div key={lb} style={S.statC}>
              <div style={S.statCl}>{ic} {lb}</div>
              <div style={{...S.statCv,color:cl}}>{vl}</div>
            </div>
          ))}
      </div>
      <div style={{marginBottom:26}}>
        <p style={S.secH}>Общий прогресс</p>
        <div style={{...S.prBar,height:14,borderRadius:8}}>
          <div style={{...S.prFill,width:`${pct(nOk)}%`,background:"#4ade80"}}/>
          <div style={{...S.prFill,width:`${pct(nBad)}%`,background:"#f87171"}}/>
        </div>
        <div style={{display:"flex",gap:16,marginTop:7,fontSize:11,color:mt}}>
          <span style={{color:"#4ade80"}}>■ Верно {pct(nOk)}%</span>
          <span style={{color:"#f87171"}}>■ Неверно {pct(nBad)}%</span>
          <span>■ Не пройдено {pct(nd)}%</span>
        </div>
      </div>
      <p style={S.secH}>По темам</p>
      {group(t=>t.topic).map(([k,d])=><PRow key={k} lbl={k} ok={d.ok} tot={d.t} bad={d.bad}/>)}
      <p style={{...S.secH,marginTop:24}}>По типам заданий</p>
      {group(t=>t.blockType).map(([k,d])=><PRow key={k} lbl={k} ok={d.ok} tot={d.t} bad={d.bad} color={BC[k]}/>)}
    </div>
  );
}

function DelModal({onConfirm,onCancel}){
  return(
    <div style={S.overlay} onClick={onCancel}>
      <div style={S.modal} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:30,marginBottom:10}}>🗑️</div>
        <p style={{fontSize:15,fontWeight:700,color:tx,margin:"0 0 8px"}}>Удалить задание?</p>
        <p style={{fontSize:12,color:mt,margin:"0 0 22px"}}>Это действие нельзя отменить</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={onConfirm} style={S.modalYes}>Да, удалить</button>
          <button onClick={onCancel} style={S.modalNo}>Нет</button>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[tasks,setTasks]=useState([]);
  const[loaded,setLoaded]=useState(false);
  const[tab,setTab]=useState("bank");
  const[flt,setFlt]=useState({year:"",grade:"",stage:"",blockType:"",topic:""});
  const[hideOk,setHideOk]=useState(false);
  const[solved,setSolved]=useState({});
  const[form,setForm]=useState(emptyF());
  const[status,setStatus]=useState("");
  const[delTarget,setDelTarget]=useState(null);

  useEffect(()=>{
    (async()=>{
      let ver="0";
      try{ver=(await window.storage.get(VK)).value;}catch{}
      let ts=[];
      try{ts=JSON.parse((await window.storage.get(TK)).value);}catch{}
      if(ver!==VER){
        const initMap=new Map(INIT_ALL.map(t=>[t.id,t]));
        ts=ts.map(t=>initMap.has(t.id)?initMap.get(t.id):t);
        const ids=new Set(ts.map(t=>t.id));
        ts=[...ts,...INIT_ALL.filter(t=>!ids.has(t.id))];
        try{await window.storage.set(TK,JSON.stringify(ts));}catch{}
        try{await window.storage.set(VK,VER);}catch{}
      }
      setTasks(ts.length?ts:INIT_ALL);
      try{setSolved(JSON.parse((await window.storage.get(SK)).value));}catch{}
      setLoaded(true);
    })();
  },[]);

  const save=async t=>{setTasks(t);try{await window.storage.set(TK,JSON.stringify(t));}catch{}};
  const mark=async(id,v)=>{
    const n=v===undefined?(()=>{const x={...solved};delete x[id];return x;})():{...solved,[id]:v};
    setSolved(n);try{await window.storage.set(SK,JSON.stringify(n));}catch{}
  };

  const topics=[...new Set(tasks.map(t=>t.topic))].filter(Boolean).sort();
  const list=tasks.filter(t=>{
    if(flt.year&&t.year!==flt.year)return false;
    if(flt.grade&&t.grade!==flt.grade)return false;
    if(flt.stage&&t.stage!==flt.stage)return false;
    if(flt.blockType&&t.blockType!==flt.blockType)return false;
    if(flt.topic&&t.topic!==flt.topic)return false;
    if(hideOk&&solved[t.id]===true)return false;
    return true;
  });

  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const oc=(i,v)=>setForm(f=>{const o=[...f.options];o[i]={...o[i],t:v};return{...f,options:o};});
  const oa=()=>setForm(f=>f.options.length<8?{...f,options:[...f.options,{l:LTRS[f.options.length],t:""}]}:f);
  const or=i=>setForm(f=>{if(f.options.length<=2)return f;return{...f,options:f.options.filter((_,j)=>j!==i).map((x,j)=>({...x,l:LTRS[j]}))};});

  const sub=async()=>{
    if(!form.text.trim()){setStatus("Введите текст задания");setTimeout(()=>setStatus(""),3e3);return;}
    if(!form.topic.trim()){setStatus("Введите тему");setTimeout(()=>setStatus(""),3e3);return;}
    const imgs=form.imageUrl?.trim()?[{url:form.imageUrl.trim(),label:"Изображение"}]:[];
    const t={id:`t${Date.now()}`,num:form.num?+form.num:tasks.length+1,
      year:form.year,grade:form.grade,stage:form.stage,blockType:form.blockType,
      topic:form.topic,text:form.text,images:imgs,
      options:hasO(form.blockType)?form.options.filter(o=>o.t.trim()):[],answer:form.answer};
    await save([...tasks,t]);
    setStatus("ok");setForm(emptyF());setTimeout(()=>setStatus(""),3e3);
  };

  const confirmDel=async()=>{await save(tasks.filter(t=>t.id!==delTarget));setDelTarget(null);};

  if(!loaded)return(
    <div style={{background:bg,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:mt,fontSize:14}}>
      <style dangerouslySetInnerHTML={{__html:FONT}}/>Загрузка…
    </div>
  );

  return(
    <div style={S.app}>
      <style dangerouslySetInnerHTML={{__html:FONT}}/>
      {delTarget&&<DelModal onConfirm={confirmDel} onCancel={()=>setDelTarget(null)}/>}
      <header style={S.hdr}>
        <span style={S.logo}>🔬 Банк заданий</span>
        <div style={S.tabs}>
          <button onClick={()=>setTab("bank")} style={tab==="bank"?S.tabOn:S.tab}>📚 Банк</button>
          <button onClick={()=>setTab("stats")} style={tab==="stats"?S.tabOn:S.tab}>📊 Статистика</button>
          <button onClick={()=>setTab("add")} style={tab==="add"?S.tabOn:S.tab}>＋ Добавить</button>
        </div>
      </header>
      {tab==="bank"&&(
        <>
          <div style={S.fbar}>
            <FSel lbl="Год" val={flt.year} set={v=>setFlt(f=>({...f,year:v}))} opts={YEARS}/>
            <FSel lbl="Класс" val={flt.grade} set={v=>setFlt(f=>({...f,grade:v}))} opts={GRADES}/>
            <FSel lbl="Этап" val={flt.stage} set={v=>setFlt(f=>({...f,stage:v}))} opts={STAGES}/>
            <FSel lbl="Блок" val={flt.blockType} set={v=>setFlt(f=>({...f,blockType:v}))} opts={BTYPES}/>
            <FSel lbl="Тема" val={flt.topic} set={v=>setFlt(f=>({...f,topic:v}))} opts={topics}/>
            <button onClick={()=>setFlt({year:"",grade:"",stage:"",blockType:"",topic:""})}
              style={{...S.abtn,color:mt,fontSize:12}}>✕ Очистить</button>
          </div>
          <div style={S.sbar}>
            <label style={S.tog}>
              <input type="checkbox" checked={hideOk} onChange={e=>setHideOk(e.target.checked)} style={{marginRight:5,accentColor:acc}}/>
              Скрыть решённые верно
            </label>
            <span style={S.cnt}>Заданий: <strong style={{color:tx}}>{list.length}</strong></span>
          </div>
          <div style={S.tlist}>
            {list.length===0?<div style={S.empty}>Нет заданий по выбранным фильтрам</div>
              :list.map(t=>(
                <TCard key={t.id} task={t} solved={solved[t.id]}
                  onSolve={v=>mark(t.id,v)} onDel={()=>setDelTarget(t.id)}/>
              ))}
          </div>
        </>
      )}
      {tab==="stats"&&<StatsTab tasks={tasks} solved={solved}/>}
      {tab==="add"&&<AddForm form={form} set={sf} oChg={oc} oAdd={oa} oRem={or} onSub={sub} status={status}/>}
    </div>
  );
}
