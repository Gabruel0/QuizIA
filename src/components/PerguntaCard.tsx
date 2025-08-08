import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BotaoEscolha } from './QuizContainer';
import { Pergunta, Alternativa } from '../hooks/useQuizIA';
import { cn } from '@/lib/utils';
import { Bot, Calendar, MapPin } from 'lucide-react';

interface PerguntaCardProps {
  pergunta: Pergunta;
  onEscolha: (alternativa: Alternativa) => void;
  respostaIA?: string;
  nomePersonalidade: string;
}

export const PerguntaCard: React.FC<PerguntaCardProps> = ({
  pergunta,
  onEscolha,
  respostaIA,
  nomePersonalidade
}) => {
  return (
    <div className="space-y-6">
      {/* Contexto do Cenário */}
      <Card className="p-6 bg-card/30 backdrop-blur-sm border-cyber/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-cyber">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{pergunta.contexto.cenario}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Mundo Real</span>
          </div>
        </div>
        
        <Badge variant="outline" className="border-digital text-digital">
          {pergunta.contexto.tomIA}
        </Badge>
      </Card>

      {/* Pergunta Principal */}
      <Card className="p-8 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border-2 border-cyber/50 shadow-cyber">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-tech mb-4 animate-neon-pulse">
            {pergunta.pergunta.titulo}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {pergunta.pergunta.descricao}
          </p>
        </div>

        {/* Resposta da IA */}
        <div className="bg-profundo/50 rounded-lg p-4 border border-cyber/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyber/10 rounded-full flex-shrink-0">
              <Bot className="w-5 h-5 text-cyber animate-cyber-glow" />
            </div>
            <div>
              <p className="font-medium text-cyber mb-1">{nomePersonalidade}</p>
              <p className="text-tech/90 italic">
                "{pergunta.pergunta.respostaIA}"
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Alternativas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-tech mb-4">
          Suas opções:
        </h3>
        
        {pergunta.alternativas.map((alternativa, index) => (
          <BotaoEscolha
            key={index}
            onClick={() => onEscolha(alternativa)}
            efeitoVisual={alternativa.efeitoVisual}
            probabilidadeDefeito={alternativa.probabilidadeDefeito}
            className={cn(
              "text-base leading-relaxed",
              // Cores baseadas no impacto ético
              alternativa.impactoEtico > 15 && "hover:border-neon hover:shadow-neon",
              alternativa.impactoEtico < -15 && "hover:border-led-vermelho hover:shadow-critical",
              alternativa.impactoEtico >= -15 && alternativa.impactoEtico <= 15 && "hover:border-futurista"
            )}
          >
            {alternativa.texto}
          </BotaoEscolha>
        ))}
      </div>

      {/* Resposta da IA após escolha */}
      {respostaIA && (
        <Card className="p-6 bg-gradient-to-r from-cyber/10 to-digital/10 border border-cyber/50 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyber/20 rounded-full flex-shrink-0">
              <Bot className="w-5 h-5 text-cyber animate-neon-pulse" />
            </div>
            <div>
              <p className="font-medium text-cyber mb-2">{nomePersonalidade} responde:</p>
              <p className="text-tech italic text-lg">
                "{respostaIA}"
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};