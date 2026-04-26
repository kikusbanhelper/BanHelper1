import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email("Введите корректный email").max(255),
  message: z.string().trim().min(10, "Минимум 10 символов").max(1000, "Максимум 1000 символов"),
});

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ email, message });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ email: fieldErrors.email?.[0], message: fieldErrors.message?.[0] });
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail(""); setMessage("");
      toast({ title: "Сообщение отправлено", description: "Мы ответим в течение 1-2 дней." });
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact</h1>
        <p className="text-muted-foreground">Вопросы, предложения, баг-репорты — пиши нам.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_280px]">
        <Card className="bg-gradient-card border-border/60">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                  placeholder="you@example.com"
                  maxLength={255}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 min-h-[140px]"
                  placeholder="Расскажи, что у тебя на уме..."
                  maxLength={1000}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? <p className="text-sm text-destructive">{errors.message}</p> : <span />}
                  <span className="text-xs text-muted-foreground">{message.length}/1000</span>
                </div>
              </div>
              <Button type="submit" disabled={submitting} className="bg-gradient-primary text-primary-foreground">
                {submitting ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 hover:bg-accent/40 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Discord</div>
              <div className="text-xs text-muted-foreground">Сообщество игроков</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4 hover:bg-accent/40 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Telegram</div>
              <div className="text-xs text-muted-foreground">Канал с обновлениями</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
