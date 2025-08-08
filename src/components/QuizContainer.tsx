import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen bg-background p-4 md:p-6 lg:p-8",
      "bg-gradient-to-br from-profundo via-card to-profundo",
      className
    )}>
      <div className="container max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

interface PersonalidadeIndicadorProps {
  personalidade: string;
  pontuacao: number;
  nivel: string;
}

export const PersonalidadeIndicador: React.FC<PersonalidadeIndicadorProps> = ({
  personalidade,
  pontuacao,
  nivel
}) => {
  const getCorPersonalidade = () => {
    if (personalidade === 'benevolente') return 'neon';
    if (personalidade === 'dominante') return 'led-vermelho';
    return 'cyber';
  };

  const getIconePersonalidade = () => {
    if (personalidade === 'benevolente') return Shield;
    if (personalidade === 'dominante') return Zap;
    return Brain;
  };

  const Icon = getIconePersonalidade();
  const cor = getCorPersonalidade();

  return (
    <Card className={cn(
      "p-4 mb-6 border-2 transition-all duration-500",
      personalidade === 'benevolente' && "border-neon shadow-neon",
      personalidade === 'dominante' && "border-led-vermelho shadow-critical",
      personalidade === 'neutro' && "border-cyber shadow-cyber"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-full",
            personalidade === 'benevolente' && "bg-neon/10 text-neon",
            personalidade === 'dominante' && "bg-led-vermelho/10 text-led-vermelho", 
            personalidade === 'neutro' && "bg-cyber/10 text-cyber"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-tech">Status da IA</h3>
            <p className="text-sm text-muted-foreground">{nivel}</p>
          </div>
        </div>
        
        <div className="text-right">
          <Badge variant={personalidade === 'benevolente' ? 'default' : 'destructive'}>
            {personalidade.toUpperCase()}
          </Badge>
          <p className="text-xs mt-1 text-muted-foreground">
            Ética: {pontuacao > 0 ? '+' : ''}{pontuacao}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <Progress 
          value={Math.min(100, Math.abs(pontuacao))} 
          className={cn(
            "h-2",
            personalidade === 'benevolente' && "[&>div]:bg-neon",
            personalidade === 'dominante' && "[&>div]:bg-led-vermelho",
            personalidade === 'neutro' && "[&>div]:bg-cyber"
          )}
        />
      </div>
    </Card>
  );
};

interface ProgressoQuizProps {
  perguntaAtual: number;
  totalPerguntas: number;
}

export const ProgressoQuiz: React.FC<ProgressoQuizProps> = ({
  perguntaAtual,
  totalPerguntas
}) => {
  const porcentagem = (perguntaAtual / totalPerguntas) * 100;

  return (
    <Card className="p-4 mb-6 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-tech">Progresso</span>
        <span className="text-sm text-muted-foreground">
          {perguntaAtual} / {totalPerguntas}
        </span>
      </div>
      <Progress value={porcentagem} className="h-2 [&>div]:bg-cyber cyber-glow" />
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Início</span>
        <span>Singularidade</span>
      </div>
    </Card>
  );
};

interface BotaoEscolhaProps {
  children: React.ReactNode;
  onClick: () => void;
  efeitoVisual?: string;
  probabilidadeDefeito?: number;
  className?: string;
}

export const BotaoEscolha: React.FC<BotaoEscolhaProps> = ({
  children,
  onClick,
  efeitoVisual,
  probabilidadeDefeito = 0,
  className
}) => {
  const [temDefeito, setTemDefeito] = React.useState(false);

  React.useEffect(() => {
    if (probabilidadeDefeito > 0 && Math.random() < probabilidadeDefeito) {
      setTemDefeito(true);
    }
  }, [probabilidadeDefeito]);

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className={cn(
        "w-full text-left h-auto p-4 justify-start",
        "bg-card/50 backdrop-blur-sm border-2",
        "hover:bg-card hover:border-cyber hover:shadow-cyber",
        "transition-all duration-300 group",
        temDefeito && "botao-defeituoso animate-glitch-text",
        efeitoVisual && efeitoVisual,
        className
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <Cpu className="w-4 h-4 text-cyber group-hover:animate-cyber-glow flex-shrink-0" />
        <span className="text-tech group-hover:text-cyber">{children}</span>
      </div>
    </Button>
  );
};