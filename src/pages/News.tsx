import { useMemo, useState } from "react";
import { Calendar, User } from "lucide-react";
import { NEWS, NewsItem } from "@/data/news";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORIES = ["All", "Patch", "Meta", "Pro Player"] as const;

const News = () => {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const items = useMemo(
    () => filter === "All" ? NEWS : NEWS.filter((n) => n.category === filter),
    [filter],
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">News</h1>
        <p className="text-muted-foreground">Обновления меты, патчи и посты от профессиональных игроков.</p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
        <TabsList>
          {CATEGORIES.map((c) => <TabsTrigger key={c} value={c}>{c === "All" ? "Все" : c}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => <NewsCard key={n.id} item={n} />)}
      </div>
    </div>
  );
};

const NewsCard = ({ item }: { item: NewsItem }) => (
  <Card className="overflow-hidden bg-gradient-card border-border/60 hover:shadow-glow transition-all hover:-translate-y-0.5 cursor-pointer">
    <div className="h-32 relative" style={{ background: item.cover }}>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
        {item.category}
      </span>
    </div>
    <CardContent className="p-5">
      <h3 className="font-semibold text-lg mb-2 leading-tight">{item.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><User className="h-3 w-3" />{item.author}</span>
        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />
          {new Date(item.date).toLocaleDateString("ru", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default News;
