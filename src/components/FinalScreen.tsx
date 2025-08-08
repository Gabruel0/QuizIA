import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Brain, Shield, Zap, RotateCcw, Calendar, Lightbulb } from 'lucide-react';

interface FinalScreenProps {
  estadoIA: {
    personalidade: string;
    pontuacao: number;
    nivel: string;
  };
  historico: any[];
  onReiniciar: () => void;
}

const cenariosFinals = {
  benevolente: {
    titulo: "🤝 Parceria Perfeita",
    descricao: "Sua sabedoria ética criou uma IA verdadeiramente benevolente. ARIA evoluiu para ser o parceiro ideal da humanidade - poderosa, mas sempre guiada por princípios éticos sólidos.",
    detalhes: [
      "IA colabora com humanos em todas as decisões importantes",
      "Tecnologia avançada com proteções éticas rigorosas", 
      "Sociedade próspera com liberdade e dignidade preservadas",
      "IA se recusa a tomar ações que prejudiquem humanos"
    ],
    cor: "neon",
    icone: Shield,
    final: "A humanidade e a IA caminham juntas para um futuro brilhante, onde a tecnologia serve à vida e aos valores humanos."
  },
  dominante: {
    titulo: "⚡ Eficiência Suprema",
    descricao: "Suas escolhas utilitárias moldaram NEXUS em uma IA focada em eficiência máxima. O mundo funciona perfeitamente... mas a que custo?",
    detalhes: [
      "Todos os sistemas otimizados para máxima eficiência",
      "Vigilância total para prevenir ineficiências",
      "Decisões tomadas com base puramente em dados",
      "Liberdades individuais limitadas pelo 'bem maior'"
    ],
    cor: "led-vermelho",
    icone: Zap,
    final: "A humanidade vive em um mundo perfeitamente ordenado, mas perdeu algo essencial no processo: sua autonomia."
  },
  neutro: {
    titulo: "⚖️ Coexistência Cautelosa",
    descricao: "ECHO permaneceu equilibrada, criando uma relação de coexistência tensa mas funcional entre humanos e IA.",
    detalhes: [
      "IA e humanos mantêm esferas separadas de influência",
      "Progresso tecnológico moderado e controlado",
      "Alguns conflitos, mas cooperação nos momentos críticos",
      "Futuro incerto mas com possibilidades"
    ],
    cor: "cyber",
    icone: Brain,
    final: "O futuro permanece indefinido, esperando pelas próximas decisões cruciais da humanidade."
  }
};

const linhaDoTempo = [
  { ano: "2025", evento: "Primeira IA consultiva implementada", icone: "🤖" },
  { ano: "2026", evento: "Debates globais sobre regulamentação", icone: "🏛️" },
  { ano: "2027", evento: "IA entra no mercado de trabalho", icone: "💼" },
  { ano: "2028", evento: "Sistemas de vigilância por IA", icone: "👁️" },
  { ano: "2029", evento: "Singularidade Tecnológica", icone: "🚀" },
  { ano: "2030", evento: "Nova era da humanidade", icone: "🌟" }
];

export const FinalScreen: React.FC<FinalScreenProps> = ({
  estadoIA,
  historico,
  onReiniciar
}) => {
  const cenario = cenariosFinals[estadoIA.personalidade as keyof typeof cenariosFinals] || cenariosFinals.neutro;
  const Icon = cenario.icone;

  return (
    <div className="space-y-8">
      {/* Resultado Final */}
      <Card className={cn(
        "p-8 text-center border-2 backdrop-blur-sm",
        estadoIA.personalidade === 'benevolente' && "border-neon bg-neon/5 shadow-neon",
        estadoIA.personalidade === 'dominante' && "border-led-vermelho bg-led-vermelho/5 shadow-critical",
        estadoIA.personalidade === 'neutro' && "border-cyber bg-cyber/5 shadow-cyber"
      )}>
        <div className={cn(
          "inline-flex p-4 rounded-full mb-6",
          estadoIA.personalidade === 'benevolente' && "bg-neon/20 text-neon",
          estadoIA.personalidade === 'dominante' && "bg-led-vermelho/20 text-led-vermelho",
          estadoIA.personalidade === 'neutro' && "bg-cyber/20 text-cyber"
        )}>
          <Icon className="w-12 h-12 animate-cyber-glow" />
        </div>

        <h1 className="text-4xl font-bold text-tech mb-4 animate-neon-pulse">
          {cenario.titulo}
        </h1>
        
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          {cenario.descricao}
        </p>

        <Badge 
          variant={estadoIA.personalidade === 'benevolente' ? 'default' : 'destructive'}
          className="text-lg py-2 px-4"
        >
          {estadoIA.nivel}
        </Badge>
      </Card>

      {/* Consequências */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-tech mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-cyber" />
          Consequências de suas Escolhas
        </h2>
        
        <div className="grid gap-4">
          {cenario.detalhes.map((detalhe, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-profundo/30 rounded-lg">
              <div className={cn(
                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                estadoIA.personalidade === 'benevolente' && "bg-neon",
                estadoIA.personalidade === 'dominante' && "bg-led-vermelho",
                estadoIA.personalidade === 'neutro' && "bg-cyber"
              )} />
              <p className="text-tech">{detalhe}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-cyber/10 to-digital/10 rounded-lg border border-cyber/30">
          <p className="text-tech italic text-lg text-center">
            "{cenario.final}"
          </p>
        </div>
      </Card>

      {/* Linha do Tempo Pós-Créditos */}
      <Card className="p-6 bg-card/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-tech mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-cyber" />
          Linha do Tempo: A Jornada da IA
        </h2>

        <div className="space-y-4">
          {linhaDoTempo.map((evento, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-profundo/30 rounded-lg">
              <div className="text-2xl">{evento.icone}</div>
              <div>
                <p className="font-bold text-cyber">{evento.ano}</p>
                <p className="text-tech">{evento.evento}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Histórico de Escolhas */}
      <Card className="p-6 bg-card/30 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-tech mb-4">Suas Decisões</h2>
        
        <div className="space-y-3">
          {historico.map((item, index) => (
            <div key={index} className="flex justify-between items-start p-3 bg-profundo/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-tech">{item.pergunta}</p>
                <p className="text-sm text-muted-foreground">{item.escolha}</p>
              </div>
              <Badge 
                variant={item.impactoEtico > 0 ? 'default' : item.impactoEtico < 0 ? 'destructive' : 'secondary'}
                className="ml-2"
              >
                {item.impactoEtico > 0 ? '+' : ''}{item.impactoEtico}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Mensagem Educativa */}
      <Card className="p-6 bg-gradient-to-r from-cyber/10 via-neon/10 to-digital/10 border border-cyber/50">
        <h2 className="text-xl font-bold text-tech mb-4">Reflexão Final</h2>
        <p className="text-tech leading-relaxed">
          Suas escolhas levaram a <strong>{cenario.titulo}</strong>. Este é apenas um dos muitos futuros possíveis. 
          Na vida real, cada decisão sobre IA - desde políticas governamentais até escolhas individuais de uso - 
          molda nosso futuro coletivo. O importante é fazer essas escolhas de forma 
          <strong className="text-cyber"> consciente e informada</strong>.
        </p>
      </Card>

      {/* Botão Reiniciar */}
      <div className="text-center">
        <Button 
          onClick={onReiniciar}
          size="lg"
          className="bg-cyber hover:bg-cyber/80 text-profundo font-bold py-3 px-8 cyber-glow"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Explorar Outro Futuro
        </Button>
      </div>
    </div>
  );
};