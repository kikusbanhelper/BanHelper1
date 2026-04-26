import { Link } from "react-router-dom";
import { Sword, MessageCircle, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-card/30 mt-20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Sword className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                HS<span className="text-gradient-primary">Meta</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Турнирный инструмент Hearthstone: матчапы, баны, мета.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/matchups" className="hover:text-foreground transition-colors">Matchups</Link></li>
              <li><Link to="/ban-tool" className="hover:text-foreground transition-colors">Ban Tool</Link></li>
              <li><Link to="/news" className="hover:text-foreground transition-colors">News</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Сообщество</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                aria-label="Discord"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 text-xs text-muted-foreground">
          © 2026 HSMeta. Не аффилирован с Blizzard Entertainment. Hearthstone является торговой маркой Blizzard.
        </div>
      </div>
    </footer>
  );
};
