import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ARCHETYPES, CLASS_COLORS, FORMATS, HsClass, MATCHUP_MATRIX, PATCHES, gamesFor } from "@/data/archetypes";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CLASSES: ("All" | HsClass)[] = [
  "All", "Death Knight", "Demon Hunter", "Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior",
];

function winrateColor(wr: number): string {
  if (wr >= 60) return "bg-win-strong/30 text-win-strong border-win-strong/40";
  if (wr >= 53) return "bg-win-soft/20 text-win-soft border-win-soft/30";
  if (wr >= 47) return "bg-muted text-muted-foreground border-border";
  if (wr >= 40) return "bg-loss-soft/20 text-loss-soft border-loss-soft/30";
  return "bg-loss-strong/30 text-loss-strong border-loss-strong/40";
}

const Matchups = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<"All" | HsClass>("All");
  const [patch, setPatch] = useState(PATCHES[0].id);
  const [format, setFormat] = useState<string>("standard");

  const filtered = useMemo(() => {
    return ARCHETYPES.filter((a) => {
      const matchesClass = classFilter === "All" || a.hsClass === classFilter;
      const matchesSearch = !search || a.name.toLowerCase().includes(search.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [search, classFilter]);

  const sortedByAvg = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const avgA = filtered.reduce((s, o) => s + (MATCHUP_MATRIX[a.id]?.[o.id] ?? 50), 0) / filtered.length;
      const avgB = filtered.reduce((s, o) => s + (MATCHUP_MATRIX[b.id]?.[o.id] ?? 50), 0) / filtered.length;
      return avgB - avgA;
    });
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Матчапы</h1>
        <p className="text-muted-foreground">Винрейты архетипов колод. Строки — твоя колода, столбцы — соперник.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск архетипа..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={classFilter} onValueChange={(v) => setClassFilter(v as typeof classFilter)}>
            <SelectTrigger className="w-full md:w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {CLASSES.map((c) => <SelectItem key={c} value={c}>{c === "All" ? "Все классы" : c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={patch} onValueChange={setPatch}>
            <SelectTrigger className="w-full md:w-[260px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {PATCHES.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Tabs value={format} onValueChange={setFormat}>
          <TabsList>
            {FORMATS.map((f) => <TabsTrigger key={f.id} value={f.id}>{f.name}</TabsTrigger>)}
          </TabsList>
        </Tabs>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span>Легенда:</span>
        <span className="px-2 py-0.5 rounded border bg-win-strong/30 text-win-strong border-win-strong/40">≥60% favorable</span>
        <span className="px-2 py-0.5 rounded border bg-muted">~50% even</span>
        <span className="px-2 py-0.5 rounded border bg-loss-strong/30 text-loss-strong border-loss-strong/40">≤40% unfavorable</span>
      </div>

      {/* Matrix */}
      <div className="rounded-lg border border-border bg-card/50 overflow-auto shadow-card">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20 bg-card border-b border-r border-border p-3 text-left text-xs font-semibold uppercase text-muted-foreground min-w-[200px]">
                Наша / Соперник
              </th>
              {sortedByAvg.map((opp) => (
                <th
                  key={opp.id}
                  className="sticky top-0 z-10 bg-card border-b border-border p-2 text-xs font-medium min-w-[80px]"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: CLASS_COLORS[opp.hsClass] }}
                    />
                    <span className="text-[10px] leading-tight text-center px-1">{opp.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedByAvg.map((our) => (
              <tr key={our.id} className="hover:bg-accent/20">
                <td className="sticky left-0 z-10 bg-card border-r border-border p-3 text-sm font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: CLASS_COLORS[our.hsClass] }}
                    />
                    {our.name}
                  </div>
                </td>
                {sortedByAvg.map((opp) => {
                  const wr = MATCHUP_MATRIX[our.id]?.[opp.id] ?? 50;
                  const isMirror = our.id === opp.id;
                  return (
                    <td key={opp.id} className="p-1 text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`mx-auto inline-flex h-10 w-14 items-center justify-center rounded border text-xs font-semibold cursor-default ${
                              isMirror ? "bg-muted/40 text-muted-foreground border-border" : winrateColor(wr)
                            }`}
                          >
                            {wr}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <div className="font-semibold">{our.name} vs {opp.name}</div>
                            <div className="text-muted-foreground mt-1">
                              Винрейт: <span className="text-foreground font-medium">{wr}%</span>
                            </div>
                            <div className="text-muted-foreground">
                              Игр: <span className="text-foreground">{gamesFor(our.id, opp.id).toLocaleString("ru")}</span>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Matchups;
