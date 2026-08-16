import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { toast } = useToast();
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      toast({
        title: "Sesión iniciada (mock)",
        description: "Conectaremos Firebase Auth cuando despliegues el backend.",
      });
      navigate("/agentes");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({ title: "Google login (mock)", description: "Sustituible por GoogleAuthProvider real." });
      navigate("/agentes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Acceso</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Auth en modo mock. Cuando enganches Firebase, esta pantalla funcionará igual.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mb-6 w-full rounded-xl"
            size="lg"
            onClick={handleGoogle}
            disabled={loading}
          >
            Continuar con Google
          </Button>

          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            o con email
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-foreground/50"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-foreground/50"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/" className="text-foreground underline-offset-4 hover:underline">
              Volver al inicio
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Login;
