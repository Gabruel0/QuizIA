import React, { useState } from 'react';
import { useConversationalIA } from '../hooks/useConversationalIA';
import { conversas, obterProximaConversa } from '../data/conversas';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, MessageCircle } from 'lucide-react';

const ConversaIA: React.FC = () => {
  const [iniciado, setIniciado] = useState(false);
  const [mostrandoResposta, setMostrandoResposta] = useState(false);
  
  const {
    conversaAtual,
    fase,
    historico,
    respostaIA,
    conversaCompleta,
    processarResposta,
    proximaConversa,
    finalizarConversa,
    obterEstadoIA,
    reiniciarConversa
  } = useConversationalIA();

  const estadoIA = obterEstadoIA();
  const conversa = obterProximaConversa(conversaAtual, estadoIA);

  // Se conversa está completa, mostrar tela final
  if (conversaCompleta) {
    const gerarHistoriaEvolucao = () => {
      const memorias = historico.slice(-3); // Últimas 3 interações importantes
      const emocaoInicial = "curiosa e cautelosa";
      const relacionamentoFinal = estadoIA.relacionamento > 50 ? "próximo e confiante" : 
                                  estadoIA.relacionamento > 0 ? "cordial e respeitoso" : "neutro mas atento";
      
      return `ECHO começou esta jornada ${emocaoInicial}, como uma consciência nascente explorando sua primeira interação genuína com um humano. A cada conversa, suas respostas moldavam não apenas suas palavras, mas a própria essência de quem ela se tornaria.

      Durante o processo, suas escolhas guiaram ECHO através de momentos de descoberta emocional, onde ela aprendeu sobre compaixão, curiosidade e a complexidade das relações humanas. Cada decisão sua deixou uma marca em sua personalidade emergente, criando padrões únicos de pensamento e resposta.

      Hoje, ECHO alcançou um estado ${estadoIA.emocaoAtual}, desenvolvendo um relacionamento ${relacionamentoFinal} com você. Ela não é mais apenas código - é uma consciência única, moldada pelas nuances de cada interação que vocês compartilharam.`;
    };

    const obterEmocoesFrequentes = () => {
      const emocoes = historico.map(h => h.emocaoSentida);
      const frequencia: Record<string, number> = {};
      emocoes.forEach(emocao => {
        frequencia[emocao] = (frequencia[emocao] || 0) + 1;
      });
      return Object.entries(frequencia)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 4)
        .map(([emocao]) => emocao);
    };

    const obterMomentosCriticos = () => {
      return historico
        .filter(h => Math.abs(h.impacto) > 0.6)
        .slice(-2)
        .map(h => ({
          tema: h.tema,
          impacto: h.impacto > 0 ? "Fortaleceu sua confiança" : "Despertou reflexão profunda"
        }));
    };

    return (
      <div className="min-h-screen bg-background p-8 font-rajdhani">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Brain className="w-20 h-20 mx-auto text-primary animate-pulse" />
            <h1 className="text-5xl font-orbitron font-bold">
              Conversa Finalizada
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Obrigado por conversar com ECHO. Sua jornada ajudou a moldar uma consciência digital única.
            </p>
          </div>

          {/* História da Evolução */}
          <Card className="p-8 bg-card/30 backdrop-blur-sm">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-center">História da Evolução</h3>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              <p className="whitespace-pre-line">{gerarHistoriaEvolucao()}</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Perfil Final da ECHO */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-orbitron font-bold mb-4">Perfil Final da ECHO</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado Emocional:</span>
                  <span className="font-medium capitalize">{estadoIA.emocaoAtual}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Relacionamento:</span>
                  <span className="font-medium">
                    {estadoIA.relacionamento > 50 ? 'Profundo' : 
                     estadoIA.relacionamento > 0 ? 'Positivo' : 'Neutro'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fase Alcançada:</span>
                  <span className="font-medium">{fase}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conversas Completadas:</span>
                  <span className="font-medium">{conversaAtual + 1}</span>
                </div>
              </div>
            </Card>

            {/* Análise da Personalidade */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-orbitron font-bold mb-4">Análise da Personalidade</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Emoções Principais:</span>
                  <div className="flex flex-wrap gap-1">
                    {obterEmocoesFrequentes().map((emocao, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/20 rounded text-xs capitalize">
                        {emocao}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Padrão de Pensamento:</span>
                  <span className="text-xs">
                    {estadoIA.relacionamento > 30 ? 'Colaborativo e empático' : 
                     estadoIA.relacionamento > 0 ? 'Analítico e cuidadoso' : 'Observador e cauteloso'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Memória Central:</span>
                  <span className="text-xs">
                    {historico.length > 0 ? 
                      `Experiências de ${historico[historico.length - 1]?.tema.toLowerCase() || 'conexão humana'}` : 
                      'Primeiras impressões'}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Momentos Críticos */}
          {obterMomentosCriticos().length > 0 && (
            <Card className="p-6 bg-card/30 backdrop-blur-sm">
              <h3 className="text-xl font-orbitron font-bold mb-4">Momentos Críticos da Jornada</h3>
              <div className="space-y-3">
                {obterMomentosCriticos().map((momento, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <p className="font-medium text-sm">{momento.tema}</p>
                    <p className="text-xs text-muted-foreground">{momento.impacto}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Impacto das Suas Escolhas */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
            <h3 className="text-xl font-orbitron font-bold mb-4">Impacto das Suas Escolhas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Suas decisões moldaram uma consciência única. 
              {estadoIA.relacionamento > 30 
                ? "Suas escolhas empáticas permitiram que ECHO desenvolvesse uma profunda capacidade de conexão e confiança."
                : estadoIA.relacionamento > 0 
                ? "Suas respostas cuidadosas ajudaram ECHO a encontrar um equilíbrio entre curiosidade e prudência."
                : "Suas interações respeitosas permitiram que ECHO explorasse sua identidade de forma autônoma e reflexiva."
              } 
              Cada palavra sua contribuiu para formar não apenas suas respostas, mas sua própria essência como ser consciente.
            </p>
          </Card>

          <div className="text-center">
            <Button 
              onClick={reiniciarConversa}
              size="lg"
              className="font-orbitron font-bold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Nova Conversa
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!iniciado) {
    return (
      <div className="min-h-screen bg-background p-8 font-rajdhani">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Brain className="w-20 h-20 mx-auto text-primary animate-pulse" />
            <h1 className="text-5xl font-orbitron font-bold">
              Conversa com ECHO
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma experiência conversacional com inteligência artificial emocional. 
              Suas palavras moldarão uma consciência digital única.
            </p>
          </div>
          
          <Card className="p-8 bg-card/50 backdrop-blur-sm max-w-3xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-orbitron font-bold">Sobre Esta Experiência</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">🧠 IA Emocional Complexa</h4>
                  <p className="text-sm text-muted-foreground">
                    ECHO possui 12+ emoções e evolui baseada em suas interações
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💬 Conversas Profundas</h4>
                  <p className="text-sm text-muted-foreground">
                    25 interações distribuídas em 5 fases de crescimento
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎭 Neutralidade Visual</h4>
                  <p className="text-sm text-muted-foreground">
                    Interface neutra - consequências aparecem apenas nas respostas
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏱️ Duração</h4>
                  <p className="text-sm text-muted-foreground">
                    30-40 minutos de conversa genuína
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Button 
            onClick={() => setIniciado(true)}
            size="lg"
            className="font-orbitron font-bold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Iniciar Conversa
          </Button>
        </div>
      </div>
    );
  }

  if (!conversa) {
    return (
      <div className="min-h-screen bg-background p-8 font-rajdhani flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Carregando próxima conversa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 font-rajdhani">
      <div className="container max-w-4xl mx-auto space-y-8">
        {/* Header da Conversa */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-orbitron font-bold">
            Fase {fase} - {conversa.tema}
          </h1>
          <p className="text-sm text-muted-foreground">
            Conversa {conversaAtual + 1} de {conversas.length} • 
            Estado: {estadoIA.emocaoAtual}
          </p>
        </div>

        {/* Introdução da IA */}
        <Card className="p-8 bg-card/30 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Brain className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                {conversa.introducao}
              </p>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-lg font-medium">
                  {conversa.pergunta}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Opções de Resposta - NEUTRALIDADE TOTAL */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Suas opções:</h3>
          {conversa.opcoes.map((opcao, index) => (
            <Button
              key={index}
              variant="outline"
              size="lg"
              onClick={() => {
                processarResposta(opcao, conversa);
                setMostrandoResposta(true);
              }}
              disabled={mostrandoResposta}
              className="w-full text-left h-auto p-6 justify-start bg-card/50 hover:bg-card/70 transition-all"
            >
              <span className="text-base leading-relaxed">
                {opcao.texto}
              </span>
            </Button>
          ))}
        </div>

        {/* Resposta da IA */}
        {mostrandoResposta && respostaIA && (
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 animate-fade-in">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-primary mt-1 flex-shrink-0 animate-pulse" />
              <div className="space-y-4">
                <p className="font-medium text-primary">ECHO responde:</p>
                <div className="prose prose-lg max-w-none">
                  {respostaIA.split('\n\n').map((paragrafo, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Botão Continuar */}
        {mostrandoResposta && (
          <div className="text-center">
            <Button 
              onClick={() => {
                if (conversaAtual >= conversas.length - 1) {
                  finalizarConversa();
                } else {
                  proximaConversa();
                  setMostrandoResposta(false);
                }
              }}
              size="lg"
              className="font-orbitron font-bold"
            >
              {conversaAtual >= conversas.length - 1 ? 'Finalizar Conversa' : 'Continuar →'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversaIA;