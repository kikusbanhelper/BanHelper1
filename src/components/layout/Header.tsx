import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sword, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/matchups", label: "Matchups" },
  { to: "/ban-tool", label: "Ban Tool" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="HSMeta home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow transition-transform group-hover:scale-105">
            <Sword className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            HS<span className="text-gradient-primary">Meta</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent/60 transition-colors"
              activeClassName="text-foreground bg-accent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/profile">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
            <Link to="/pro">Upgrade to PRO</Link>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-200",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent/60"
              activeClassName="text-foreground bg-accent"
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex gap-2 pt-2">
            <Button asChild variant="outline" size="sm" className="flex-1" onClick={() => setOpen(false)}>
              <Link to="/profile">Login</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-primary text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              <Link to="/pro">Upgrade to PRO</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
