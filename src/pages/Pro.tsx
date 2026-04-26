import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PRO_FEATURES = [
  { title: "Расширенная статистика", desc: "Тренды винрейтов, история по патчам, breakdown по уровням ладдера." },
  { title: "Сохранение стратегий", desc: "Именованные лайнапы для разных турниров, быстрый доступ из профиля." },
  { title: "Кастомные турниры", desc: "Своя матрица матчапов и формат лайнапа под локальные турниры." },
  { title: "Приоритетные обновления", desc: "Доступ к новым данным меты раньше всех." },
  { title: "Без рекламы", desc: "Чистый интерфейс без отвлекающих элементов." },
  { title: "Приоритетная поддержка", desc: "Ответы на вопросы в течение 24 часов." },
];

const Pro = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary mb-4 uppercase tracking-wider">
          <Sparkles className="h-3 w-3" /> PRO
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Полный арсенал турнирного аналитика</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Открой все возможности HSMeta и подготовься к любому турниру за минуты.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-10">
        {PRO_FEATURES.map((f) => (
          <Card key={f.title} className="bg-gradient-card border-border/60">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing */}
      <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
        <PricingCard period="Месячно" price="$6" sub="/месяц" />
        <PricingCard period="Годовой" price="$49" sub="/год" highlight badge="Сэкономь 32%" />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Подключение Stripe-оплаты добавим следующим шагом — нажми «Купить» чтобы напомнить нам об этом.
      </p>
    </div>
  );
};

const PricingCard = ({
  period, price, sub, highlight, badge,
}: { period: string; price: string; sub: string; highlight?: boolean; badge?: string }) => (
  <Card className={highlight
    ? "bg-gradient-card border-2 border-primary shadow-glow relative"
    : "bg-gradient-card border-border/60"}>
    {badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 shadow-glow">
        {badge}
      </span>
    )}
    <CardContent className="p-6 text-center">
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{period}</div>
      <div className="flex items-baseline justify-center gap-1 mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground">{sub}</span>
      </div>
      <Button
        asChild
        className={highlight ? "w-full bg-gradient-primary text-primary-foreground" : "w-full"}
        variant={highlight ? "default" : "outline"}
      >
        <Link to="/profile">Купить</Link>
      </Button>
    </CardContent>
  </Card>
);

export default Pro;
