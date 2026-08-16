import { MessageSquarePlus, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateFeedbackMailto } from "@/lib/feedback";

interface FeedbackButtonProps {
  contextName: string;
  contextType?: "prompt" | "catalogo" | "conectores" | "apoyar" | "general";
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
}

export function FeedbackButton({
  contextName,
  contextType = "prompt",
  variant = "outline",
  size = "sm",
  className = "",
  label = "¿Qué cambiarías o qué dudas tienes?",
}: FeedbackButtonProps) {
  const mailtoUrl = generateFeedbackMailto({
    contextName,
    contextType,
  });

  return (
    <Button
      variant={variant}
      size={size}
      asChild
      className={`gap-1.5 text-xs ${className}`}
    >
      <a href={mailtoUrl}>
        <Mail className="h-3.5 w-3.5 text-primary" />
        <span>{label}</span>
      </a>
    </Button>
  );
}
