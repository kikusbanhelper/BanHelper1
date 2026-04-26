export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  category: "Patch" | "Meta" | "Pro Player";
  cover: string;
}

export const NEWS: NewsItem[] = [
  {
    id: "patch-29-4-meta",
    title: "Мета после патча 29.4: что изменилось",
    excerpt: "Whizbang's Workshop встряхнул мету — Aggro Paladin поднялся на T1, Big Priest снова в строю.",
    body: "Полный обзор изменений и тиров...",
    author: "MetaWatcher",
    date: "2026-04-22",
    category: "Patch",
    cover: "linear-gradient(135deg, hsl(38 92% 55%), hsl(28 95% 60%))",
  },
  {
    id: "rainbow-dk-guide",
    title: "Rainbow DK: гайд от чемпиона Masters Tour",
    excerpt: "Подробный разбор муллигана и приоритетов — почему колода доминирует на турнирах.",
    body: "Полный гайд...",
    author: "ProDK",
    date: "2026-04-18",
    category: "Pro Player",
    cover: "linear-gradient(135deg, hsl(220 70% 50%), hsl(260 70% 55%))",
  },
  {
    id: "tournament-bans",
    title: "Топ-3 бана недели в Conquest 4-deck",
    excerpt: "Анализ статистики банов лучших игроков — что банят чаще всего и почему.",
    body: "Анализ...",
    author: "BanAnalyst",
    date: "2026-04-15",
    category: "Meta",
    cover: "linear-gradient(135deg, hsl(142 70% 45%), hsl(160 60% 50%))",
  },
  {
    id: "nerf-incoming",
    title: "Слухи о нерфе Nature Shaman в патче 29.6",
    excerpt: "Blizzard намекнули на изменения в стихийном Шамане. Что ожидать на Battlegrounds Cup.",
    body: "Слухи...",
    author: "MetaWatcher",
    date: "2026-04-10",
    category: "Patch",
    cover: "linear-gradient(135deg, hsl(0 70% 50%), hsl(20 80% 55%))",
  },
  {
    id: "control-warrior-comeback",
    title: "Возвращение Control Warrior",
    excerpt: "Новая версия с Brawl-пакетом показывает 56% винрейт на ладдере.",
    body: "Подробный разбор...",
    author: "ControlMaster",
    date: "2026-04-05",
    category: "Meta",
    cover: "linear-gradient(135deg, hsl(30 50% 40%), hsl(40 60% 50%))",
  },
  {
    id: "pro-interview",
    title: "Интервью с Firebat: подготовка к Worlds 2026",
    excerpt: "Легендарный игрок рассказал о тренировочном процессе и любимых лайнапах.",
    body: "Интервью...",
    author: "Editorial",
    date: "2026-04-01",
    category: "Pro Player",
    cover: "linear-gradient(135deg, hsl(280 60% 50%), hsl(320 65% 55%))",
  },
];
