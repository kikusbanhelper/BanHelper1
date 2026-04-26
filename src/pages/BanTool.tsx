import { useMemo, useState } from "react";
import { Award, Calculator, Sparkles, X } from "lucide-react";
import { ARCHETYPES, Archetype, CLASS_COLORS } from "@/data/archetypes";
import { calculateBestBan, BanResult } from "@/lib/banCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Slot = string | null;

function DeckPicker({
  value, onChange, placeholder, exclude = [],
}: {
  value: Slot;
  onChange: (id: Slot) => void;
  placeholder: string;
  exclude?: string[];
}) {
  const [open, setOpen] = useState(false);
  const archetype = ARCHETYPES.find((a) => a.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="group relative flex h-20 w-full items-center justify-between gap-3 rounded-lg border-2 border-dashed border-border bg-card/40 px-4 text-left hover:border-primary/50 hover:bg-card/60 transition-colors"
        >
          {archetype ? (
            <>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-10 w-10 rounded-md shrink-0 border border-border/50"
                  style={{ backgroundColor: CLASS_COLORS[archetype.hsClass] + "40" }}
                />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{archetype.name}</div>
                  <div className="text-xs text-muted-foreground">{archetype.hsClass}</div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onChange(null); }}
                className="opacity-0 group-hover:opacity-100 h-7 w-7 rounded inline-flex items-center justify-center hover:bg-accent"
                aria-label="Remove deck"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">{placeholder}</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Найти архетип..." />
          <CommandList>
            <CommandEmpty>Не найдено.</CommandEmpty>
            <CommandGroup>
              {ARCHETYPES.filter((a) => !exclude.includes(a.id) || a.id === value).map((a) => (
                <CommandItem
                  key={a.id}
                  value={a.name}
                  onSelect={() => { onChange(a.id); setOpen(false); }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full mr-2"
                    style={{ backgroundColor: CLASS_COLORS[a.hsClass] }}
                  />
                  <span className="flex-1">{a.name}</span>
                  <span className="text-xs text-muted-foreground">T{a.tier}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const BanTool = () => {
  const [deckCount, setDeckCount] = useState<2 | 3 | 4>(3);
  const [ourDecks, setOurDecks] = useState<Slot[]>([null, null, null, null]);
  const [oppDecks, setOppDecks] = useState<Slot[]>([null, null, null, null]);
  const [results, setResults] = useState<BanResult[] | null>(null);

  const ourFilled = ourDecks.slice(0, deckCount).filter(Boolean) as string[];
  const oppFilled = oppDecks.slice(0, deckCount).filter(Boolean) as string[];
  const ready = ourFilled.length === deckCount && oppFilled.length === deckCount;

  const handleCalc = () => {
    if (!ready) return;
    setResults(calculateBestBan(ourFilled, oppFilled));
  };

  const handleReset = () => {
    setOurDecks([null, null, null, null]);
    setOppDecks([null, null, null, null]);
    setResults(null);
  };

  const top = results?.[0];
  const alternatives = results?.slice(1) ?? [];

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ban Tool</h1>
        <p className="text-muted-foreground">Conquest-формат: рассчитай оптимальный бан колоды соперника.</p>
      </div>

      {/* Format selector */}
      <div className="mb-6">
        <Tabs value={String(deckCount)} onValueChange={(v) => { setDeckCount(Number(v) as 2 | 3 | 4); setResults(null); }}>
          <TabsList>
            <TabsTrigger value="2">2 decks</TabsTrigger>
            <TabsTrigger value="3">3 decks</TabsTrigger>
            <TabsTrigger value="4">4 decks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Our decks */}
        <Card className="bg-gradient-card border-border/60">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Твои колоды
            </h2>
            <div className="space-y-3">
              {Array.from({ length: deckCount }).map((_, i) => (
                <DeckPicker
                  key={`our-${i}`}
                  value={ourDecks[i]}
                  onChange={(id) => {
                    const next = [...ourDecks]; next[i] = id; setOurDecks(next); setResults(null);
                  }}
                  placeholder={`Твоя колода ${i + 1}`}
                  exclude={ourDecks.slice(0, deckCount).filter((d, j) => d && j !== i) as string[]}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Opponent decks */}
        <Card className="bg-gradient-card border-border/60">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-loss-strong" /> Колоды соперника
            </h2>
            <div className="space-y-3">
              {Array.from({ length: deckCount }).map((_, i) => (
                <DeckPicker
                  key={`opp-${i}`}
                  value={oppDecks[i]}
                  onChange={(id) => {
                    const next = [...oppDecks]; next[i] = id; setOppDecks(next); setResults(null);
                  }}
                  placeholder={`Колода соперника ${i + 1}`}
                  exclude={oppDecks.slice(0, deckCount).filter((d, j) => d && j !== i) as string[]}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          size="lg"
          onClick={handleCalc}
          disabled={!ready}
          className="bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-50 disabled:shadow-none"
        >
          <Calculator className="h-4 w-4" /> Рассчитать
        </Button>
        <Button size="lg" variant="outline" onClick={handleReset}>Сбросить</Button>
      </div>

      {/* Results */}
      {top && (
        <div className="mt-10 space-y-6">
          <Card className="border-2 border-primary/40 bg-gradient-card shadow-glow">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                <Award className="h-4 w-4" /> Лучший бан
              </div>
              <div className="flex flex-wrap items-baseline gap-3 mb-4">
                <h3 className="text-3xl md:text-4xl font-bold">{top.banName}</h3>
                <span className="text-lg text-muted-foreground">
                  {Math.round(top.winProbability * 100)}% вероятность победы
                </span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-700"
                  style={{ width: `${Math.round(top.winProbability * 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {alternatives.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Альтернативные варианты
              </h3>
              <div className="space-y-2">
                {alternatives.map((alt) => {
                  const pct = Math.round(alt.winProbability * 100);
                  return (
                    <div
                      key={alt.banId}
                      className="flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{alt.banName}</div>
                      </div>
                      <div className="w-32 hidden sm:block h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-sm font-semibold w-12 text-right">{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BanTool;
