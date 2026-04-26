import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Check, Newspaper, Shield, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Таблица матчапов",
    desc: "Наглядная матрица матчапов архетипов с актуальными винрейтами по текущему патчу. Быстро оценивай расклад сил в меже.",
  },
  {
    icon: Shield,
    title: "BanHelper",
    desc: "Алгоритм Conquest рассчитывает оптимальный бан за секунды с учётом лайнапа соперника и твоих колод.",
  },
  {
    icon: TrendingUp,
    title: "Анализ меты",
    desc: "Следи за трендами архетипов: какие колоды набирают силу, а какие теряют позиции от патча к патчу.",
  },
  {
    icon: Newspaper,
    title: "Турнирные новости",
    desc: "Актуальные результаты турниров, популярные лайнапы топ-игроков и важные изменения в Hearthstone.",
  },
];

const PRO_FEATURES = [
  "Статистика по патчам и история трендов",
  "Сохранение лайнапов и заметок",
];

const Landing = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Patch 29.4 · Whizbang's Workshop
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Подготовься к турниру{" "}
            <span className="text-gradient-primary">как про</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Анализ матчапов и оптимальные баны колод за секунды
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              <Link to="/matchups">
                Открыть Matchups <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/ban-tool">Попробовать BanHelper</Link>
            </Button>
          </div>
        </div>

        {/* Decorative fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Что умеет HS TourneyHelper</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Инструмент для подготовки к Hearthstone-турнирам в формате Conquest.
            Матрица матчапов, умный расчёт банов и обзор турнирной меты — всё в одном месте.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="bg-gradient-card border-border/60 shadow-card hover:shadow-glow transition-shadow">
              <CardContent className="p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Extended access section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-card shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary mb-4 uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> Расширенный доступ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Улучшенные возможности</h2>
              <p className="text-muted-foreground mb-6">
                Расширьте возможности анализа. Получайте доступ к истории матчапов,
                подробным трендам по патчам и сохранению избранных лайнапов.
              </p>
              <ul className="space-y-3 mb-8">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$6</span>
                <span className="text-muted-foreground">/месяц</span>
              </div>
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Link to="/pro">Подключить</Link>
              </Button>
            </div>

            <div className="relative aspect-square max-w-md mx-auto w-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-10 blur-3xl" />
              <div className="relative h-full rounded-2xl border border-primary/20 bg-card/50 p-6 backdrop-blur grid place-items-center">
                <Sparkles className="h-32 w-32 text-primary/30" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
