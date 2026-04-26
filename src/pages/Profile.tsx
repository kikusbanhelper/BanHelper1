import { Link } from "react-router-dom";
import { History, Save, Settings, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
            <User className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Гость
              <Badge variant="outline" className="text-xs">FREE</Badge>
            </h1>
            <p className="text-sm text-muted-foreground">Войди, чтобы сохранять стратегии и историю расчётов.</p>
          </div>
        </div>
        <div className="sm:ml-auto flex gap-2">
          <Button variant="outline">Войти</Button>
          <Button asChild className="bg-gradient-primary text-primary-foreground">
            <Link to="/pro"><Sparkles className="h-4 w-4" /> Купить PRO</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-6">
          <TabsTrigger value="history"><History className="h-4 w-4" /> История</TabsTrigger>
          <TabsTrigger value="strategies"><Save className="h-4 w-4" /> Стратегии</TabsTrigger>
          <TabsTrigger value="subscription"><Sparkles className="h-4 w-4" /> Подписка</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="h-4 w-4" /> Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card className="bg-gradient-card border-border/60">
            <CardContent className="p-10 text-center">
              <History className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">История расчётов появится после первого использования Ban Tool.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/ban-tool">Открыть Ban Tool</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card className="bg-gradient-card border-border/60">
            <CardContent className="p-10 text-center">
              <Save className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1">Сохранение стратегий доступно в PRO.</p>
              <p className="text-xs text-muted-foreground mb-4">Создавай именованные лайнапы для разных турниров.</p>
              <Button asChild className="bg-gradient-primary text-primary-foreground">
                <Link to="/pro">Получить PRO</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card className="bg-gradient-card border-border/60">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Текущий план</div>
                  <div className="text-2xl font-bold mt-1">Free</div>
                </div>
                <Badge variant="outline">Активен</Badge>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
                  <Sparkles className="h-4 w-4" /> Перейти на PRO
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Расширенная статистика, сохранение стратегий, кастомные турниры — $6/месяц.
                </p>
                <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground">
                  <Link to="/pro">Купить PRO</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-gradient-card border-border/60">
            <CardContent className="p-10 text-center">
              <Settings className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Настройки появятся после входа в аккаунт.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
