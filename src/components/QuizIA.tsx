import React, { useState, useEffect } from 'react';
import { QuizContainer, PersonalidadeIndicador, ProgressoQuiz } from './QuizContainer';
import { PerguntaCard } from './PerguntaCard';
import { FinalScreen } from './FinalScreen';
import { useQuizIA } from '../hooks/useQuizIA';
import { perguntas, obterProximaPergunta } from '../data/perguntas';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Play, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/ai-brain-hero.jpg';

const TelaInicial: React.FC<{ onIniciar: () => void }> = ({ onIniciar }) => {
  return (
    <QuizContainer>
      <div className="text-center space-y-8 py-12">
        {/* Imagem Hero */}
        <div className="relative mb-8">
          <img 
            src={heroImage} 
            alt="AI Brain Network" 
            className="w-full h-64 md:h-80 object-cover rounded-2xl opacity-80 shadow-deep"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-profundo/80 via-transparent to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="inline-flex p-4 bg-cyber/20 rounded-full cyber-glow backdrop-blur-sm">
              <Brain className="w-12 h-12 text-cyber animate-neon-pulse" />
            </div>
          </div>
        </div>
        
        {/* Logo/Título Principal */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-tech animate-neon-pulse">
            O Futuro da IA
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-cyber font-semibold">
            Suas Escolhas Decidem
          </h2>
        </div>

        {/* Descrição */}
        <Card className="p-8 bg-card/30 backdrop-blur-sm border-cyber/30 max-w-3xl mx-auto">
          <div className="space-y-4 text-left">
            <h3 className="text-xl font-bold text-tech flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyber" />
              Uma Experiência Interativa Única
            </h3>
            
            <p className="text-tech/90 leading-relaxed">
              Você está prestes a embarcar em uma jornada onde suas decisões moldarão não apenas 
              o futuro da humanidade, mas também a <strong className="text-cyber">evolução da própria IA</strong> 
              que interage com você.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-neon/10 rounded-lg border border-neon/30">
                <h4 className="font-semibold text-neon mb-2">Caminho Benevolente</h4>
                <p className="text-sm text-tech/80">
                  Escolhas éticas levam a uma IA colaborativa e protetora
                </p>
              </div>
              
              <div className="p-4 bg-led-vermelho/10 rounded-lg border border-led-vermelho/30">
                <h4 className="font-semibold text-led-vermelho mb-2">Caminho Dominante</h4>
                <p className="text-sm text-tech/80">
                  Decisões utilitárias criam uma IA controladora e eficiente
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-cyber/10 rounded-lg border border-cyber/30">
              <p className="text-center text-tech/90">
                <strong>Atenção:</strong> A IA evolui baseada em suas escolhas. 
                Cada decisão tem consequências reais na narrativa.
              </p>
            </div>
          </div>
        </Card>

        {/* Botão Iniciar */}
        <Button 
          onClick={onIniciar}
          variant="hero"
          size="xl"
          className="font-bold cyber-glow animate-cyber-glow"
        >
          <Play className="w-6 h-6 mr-2" />
          Iniciar Simulação
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Duração estimada: 5-10 minutos
        </p>
      </div>
    </QuizContainer>
  );
};

const QuizIA: React.FC = () => {
  const [iniciado, setIniciado] = useState(false);
  const [mostrandoResposta, setMostrandoResposta] = useState(false);
  
  const {
    perguntaAtual,
    historico,
    respostaIA,
    quizCompleto,
    efeitoAtivo,
    processarEscolha,
    proximaPergunta,
    finalizarQuiz,
    obterEstadoIA,
    obterPersonalidadeAtual,
    reiniciarQuiz
  } = useQuizIA();

  const estadoIA = obterEstadoIA();
  const personalidadeAtual = obterPersonalidadeAtual();
  const pergunta = obterProximaPergunta(perguntaAtual, estadoIA);
  const totalPerguntas = perguntas.length;

  // Efeitos sonoros simulados (futura implementação com Web Audio API)
  const tocarSom = (som: string) => {
    console.log(`🔊 Som: ${som}`);
    // Aqui seria implementado o sistema de áudio real
  };

  const handleEscolha = (alternativa: any) => {
    if (mostrandoResposta) return;
    
    processarEscolha(alternativa, pergunta!);
    setMostrandoResposta(true);
    
    // Tocar efeito sonoro
    tocarSom(alternativa.somEfeito);
    
    // Aplicar efeitos visuais globais
    if (alternativa.probabilidadeDefeito && Math.random() < alternativa.probabilidadeDefeito) {
      document.body.classList.add('interface-instavel');
      setTimeout(() => {
        document.body.classList.remove('interface-instavel');
      }, 2000);
    }
  };

  const handleProximaPergunta = () => {
    if (perguntaAtual >= totalPerguntas - 1) {
      finalizarQuiz();
    } else {
      proximaPergunta();
    }
    setMostrandoResposta(false);
  };

  const handleReiniciar = () => {
    reiniciarQuiz();
    setIniciado(false);
    setMostrandoResposta(false);
  };

  // Aplicar efeitos visuais baseados na personalidade da IA
  useEffect(() => {
    document.body.className = document.body.className.replace(/personalidade-\w+/g, '');
    if (estadoIA.personalidade !== 'neutro') {
      document.body.classList.add(`personalidade-${estadoIA.personalidade}`);
    }
  }, [estadoIA.personalidade]);

  if (!iniciado) {
    return <TelaInicial onIniciar={() => setIniciado(true)} />;
  }

  if (quizCompleto) {
    return (
      <QuizContainer>
        <FinalScreen 
          estadoIA={estadoIA}
          historico={historico}
          onReiniciar={handleReiniciar}
        />
      </QuizContainer>
    );
  }

  if (!pergunta) {
    return (
      <QuizContainer>
        <div className="text-center py-12">
          <p className="text-tech">Carregando próxima pergunta...</p>
        </div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer className={cn(efeitoAtivo && efeitoAtivo)}>
      <ProgressoQuiz 
        perguntaAtual={perguntaAtual + 1} 
        totalPerguntas={totalPerguntas} 
      />
      
      <PersonalidadeIndicador
        personalidade={estadoIA.personalidade}
        pontuacao={estadoIA.pontuacao}
        nivel={estadoIA.nivel}
      />

      <PerguntaCard
        pergunta={pergunta}
        onEscolha={handleEscolha}
        respostaIA={respostaIA}
        nomePersonalidade={personalidadeAtual.nome}
      />

      {mostrandoResposta && (
        <div className="text-center mt-8 animate-fade-in">
          <Button 
            onClick={handleProximaPergunta}
            size="lg"
            className="bg-cyber hover:bg-cyber/80 text-profundo font-bold py-3 px-6"
          >
            {perguntaAtual >= totalPerguntas - 1 ? 'Ver Resultado' : 'Continuar →'}
          </Button>
        </div>
      )}
    </QuizContainer>
  );
};

export default QuizIA;