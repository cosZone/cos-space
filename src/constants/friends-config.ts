export interface FriendLink {
  site: string;
  url: string;
  owner: string;
  desc: string;
  image: string;
  color?: string;
}

export const friendsData: FriendLink[] = [
  {
    site: '吐槽大王部落格',
    url: 'https://www.tcdw.net/',
    owner: 'tcdw',
    desc: '正在学习接受不完美的世界！',
    image: 'https://secure.gravatar.com/avatar/70ae2023afad30dae905344325cece8f?s=96&r=g',
    color: '#00a6f4',
  },
  {
    site: 'Guoweiyi',
    url: 'https://gwy.fun/',
    owner: 'Guoweiyi',
    desc: '不知何时春日悄来临,不知何日春花已落尽。',
    image: 'https://www.gwy.fun/zhan/logo.jpg',
    color: '#ABDCFF',
  },
  {
    site: 'lznauy的技术小屋',
    url: 'https://lznauy.cn/',
    owner: 'lznauy',
    desc: '生之微欢,俄而感怀,奋勉有得,相携互舍,所谓幸福',
    image: 'https://cn.cravatar.com/avatar/3f33778a3ad85c6147059bdbca8aab6c?s=240&d=mp',
    color: '#ffc0cb',
  },
  {
    site: 'keinx',
    url: 'https://www.keinx.com/',
    owner: 'keinx',
    desc: '学无止境,无限可能',
    image: 'https://keinx.com/usr/uploads/favicon.svg',
  },
  {
    site: '雪松的博客',
    url: 'https://fylsen.com/',
    owner: '雪松',
    desc: '向路灯照不亮的身影说声晚安',
    image: 'https://fv.fylsen.com/assets/avatar/blue.jpeg',
    color: '#ABDCFF',
  },
  {
    site: 'Claws 的博客',
    url: 'https://claws.top',
    owner: 'Claws',
    desc: '為せば成る',
    image: 'https://claws.top/favicon.ico',
    color: '#FBC1CC',
  },
  {
    site: 'Situ Note',
    url: 'https://situ2001.com',
    owner: 'situ2001',
    desc: 'Personal website of situ2001',
    image: 'https://situ2001.com/avatar.png',
    color: '#19212c',
  },
  {
    site: 'Pseudoyu',
    url: 'https://www.pseudoyu.com/',
    owner: 'pseudoyu',
    desc: 'Blockchain | Programming | Photography | Boyi',
    image: 'https://www.pseudoyu.com/images/author.webp',
    color: '#eb2344',
  },
  {
    site: '一只小白喵的进阶之路~',
    url: 'https://lovelywhite.cn/',
    owner: 'suxi',
    desc: '这一刀下去你会爱上我～',
    image: 'https://lovelywhite.cn/logo.png',
  },
  {
    site: "Magren's Blog",
    url: 'https://magren.cc',
    owner: 'Magren',
    desc: '不为繁华易匠心',
    image: 'https://magren.cc/avatar.png',
    color: '#666666',
  },
  {
    site: 'GanSer',
    url: 'https://www.gan1ser.top/',
    owner: 'GanSer',
    desc: '紫箫吟断,素笺恨切',
    image: 'https://pic.imgdb.cn/item/63f16cddf144a010070697c8.jpg',
    color: '#0EFFAB',
  },
  {
    site: 'Revincx 的小破站',
    url: 'https://blog.revincx.icu/',
    owner: 'Revincx',
    desc: '可爱就是正义~',
    image: 'https://cdn.jsdelivr.net/gh/Revincx/blog-assets@master/images/avatar.jpg',
  },
  {
    site: 'Jesslyn 的博客',
    url: 'https://jesslynwong.github.io/',
    owner: 'Jesslyn',
    desc: '早日成为大佬的程序媛',
    image: 'https://jesslynwong.github.io/image/header.png',
    color: '#ffc0cb',
  },
  {
    site: '钧桐的前端日记(前端基础百炼成仙)',
    url: 'https://kamenrider41.github.io/Hundred-refining-into-Immortals/',
    owner: '41',
    desc: '款款独行,才不致倾溢',
    image: 'https://kamenrider41.github.io/Hundred-refining-into-Immortals/logo.jpg',
    color: 'pink',
  },
  {
    site: '谦谦の超弦空间',
    url: 'https://www.czqblog.vip/',
    owner: '谦谦',
    desc: '欢迎来到谦谦の超弦空间',
    image: 'https://www.czqblog.vip/wp-content/uploads/2022/07/LLogo.jpg',
  },
  {
    site: '瘦虎的博客',
    url: 'https://gelxgx.github.io/blog/',
    owner: '瘦虎',
    desc: '努力学习 React、TypeScrpt,偶尔研究有趣的源码',
    image: 'https://gelxgx.github.io/blog/favicon.ico',
  },
  {
    site: '大森的博客',
    url: 'https://sadose.github.io/',
    owner: '大森',
    desc: '大佬的博客,都是干货',
    image: 'https://sadose.github.io/images/icons/logo-32.png',
  },
];

export const friendsIntro = {
  title: '小伙伴们',
  subtitle: '改了一下,有时间顺序从新到旧排列～',
  applyTitle: '欢迎加友链',
  applyDesc: '在本页留言,格式如下',
  exampleYaml: `- site: cosの博客 # 站点名称
  url: https://ysx.cosine.ren/ # 站点网址
  owner: cos # 昵称
  desc: WA的一声就哭了 # 站点简介
  image: https://ysx.cosine.ren/img/avatar.jpg
  color: "#ffc0cb" # 图标色`,
};
