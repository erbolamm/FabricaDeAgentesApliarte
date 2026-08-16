import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useMyAgents } from "@/hooks/useAgents";
import { agentsService } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

const CreatorDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (!loading && !user) navigate("/login?next=/creadores/dashboard");
  }, [loading, user, navigate]);

  const author = user?.email ?? undefined;
  const { data: agents = [], isLoading } = useMyAgents(author);

  const onDelete = async (id: string) => {
    if (!confirm("¿Eliminar este agente?")) return;
    await agentsService.remove(id);
    await qc.invalidateQueries({ queryKey: ["agents"] });
    toast.success("Agente eliminado");
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="container mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Panel de creador
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Mis agentes
            </h1>
            <p className="mt-2 text-muted-foreground">
              Publicados como <span className="text-foreground">{author}</span>
            </p>
          </div>
          <Button asChild className="rounded-full">
            <Link to="/creadores/nuevo">
              <Plus className="h-4 w-4" /> Nuevo agente
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Cargando…</p>
        ) : agents.length === 0 ? (
          <Card className="rounded-3xl border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-lg text-muted-foreground">
                Aún no tienes agentes publicados.
              </p>
              <Button asChild className="rounded-full">
                <Link to="/creadores/nuevo">Crear el primero</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {agents.map((a) => (
              <Card key={a.id} className="rounded-2xl">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <CardTitle className="text-xl">{a.name}</CardTitle>
                      <Badge variant="secondary" className="capitalize">
                        {a.category}
                      </Badge>
                      {a.published === false && (
                        <Badge variant="outline">Borrador</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{a.tagline}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden text-sm text-muted-foreground sm:inline">
                      {a.credits} créd · {a.runs} ejec
                    </span>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link to={`/creadores/editar/${a.id}`}>
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-destructive hover:text-destructive"
                      onClick={() => onDelete(a.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default CreatorDashboard;
