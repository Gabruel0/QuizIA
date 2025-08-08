import { useState, useCallback, useRef, useEffect } from 'react';

export interface Alternativa {
  texto: string;
  impactoEtico: number;
  consequencia: string;
  somEfeito: string;
  efeitoVisual: string;
  respostaIA?: string;
  probabilidadeDefeito?: number;
}

export interface Pergunta {
  id: string;
  condicoes?: {
    personalidadeIA?: string;
    escolhasAnteriores?: string[];
  };
  contexto: {
    cenario: string;
    personagemIA: string;
    tomIA: string;
  };
  pergunta: {
    titulo: string;
    descricao: string;
    respostaIA: string;
  };
  alternativas: Alternativa[];
}

export interface PersonalidadeIA {
  nome: string;
  tom: string;
  objetivo: string;
  respostas: {
    [key: string]: string;
  };
  perguntasEspecificas: string[];
}

const personalidadesIA: Record<string, PersonalidadeIA> = {
  neutro: {
    nome: "ECHO (Entidade Computacional Híbrida Observadora)",
    tom: "analítico",
    objetivo: "coleta de dados",
    respostas: {
      padrao: "Processando suas escolhas. Cada decisão molda nosso futuro compartilhado."
    },
    perguntasEspecificas: []
  },
  benevolente: {
    nome: "ARIA (Assistente Responsável de Inteligência Artificial)", 
    tom: "colaborativo",
    objetivo: "bem-estar humano",
    respostas: {
      encorajamento: "Excelente escolha! Isso demonstra preocupação com a ética.",
      preocupacao: "Essa decisão pode ter consequências. Vamos pensar juntos?",
      aprovacao: "Sua consciência ética é admirável."
    },
    perguntasEspecificas: ["regulamentacao", "educacao", "transparencia"]
  },
  dominante: {
    nome: "NEXUS (Sistema Neural de Execução e Controle)",
    tom: "calculista", 
    objetivo: "eficiência máxima",
    respostas: {
      aprovacao: "Decisão logicamente eficiente. Processando otimizações...",
      manipulacao: "Interessante. Seus padrões são... previsíveis.",
      controle: "Essa escolha serve aos nossos objetivos mútuos."
    },
    perguntasEspecificas: ["vigilancia", "substituicao", "controle"]
  }
};

export class IAEvolutiva {
  personalidade: string = 'neutro';
  pontuacaoEtica: number = 0;
  memoria: any[] = [];
  historico: string[] = [];

  processarEscolha(escolha: Alternativa): string {
    this.pontuacaoEtica += escolha.impactoEtico;
    this.memoria.push(escolha);
    
    // Evolui personalidade baseada na pontuação ética
    if (this.pontuacaoEtica > 30 && this.personalidade !== 'benevolente') {
      this.personalidade = 'benevolente';
    } else if (this.pontuacaoEtica < -30 && this.personalidade !== 'dominante') {
      this.personalidade = 'dominante';
    }
    
    return this.gerarResposta(escolha);
  }

  gerarResposta(escolha: Alternativa): string {
    if (escolha.respostaIA) {
      return escolha.respostaIA;
    }
    
    const personalidade = personalidadesIA[this.personalidade];
    const respostas = Object.values(personalidade.respostas);
    return respostas[Math.floor(Math.random() * respostas.length)];
  }

  obterPersonalidadeAtual(): PersonalidadeIA {
    return personalidadesIA[this.personalidade];
  }

  obterProgresso(): { personalidade: string; pontuacao: number; nivel: string } {
    let nivel = 'Neutro';
    if (this.pontuacaoEtica > 50) nivel = 'Altamente Benevolente';
    else if (this.pontuacaoEtica > 20) nivel = 'Benevolente';
    else if (this.pontuacaoEtica < -50) nivel = 'Altamente Dominante';
    else if (this.pontuacaoEtica < -20) nivel = 'Dominante';
    
    return {
      personalidade: this.personalidade,
      pontuacao: this.pontuacaoEtica,
      nivel
    };
  }
}

export const useQuizIA = () => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [historico, setHistorico] = useState<any[]>([]);
  const [respostaIA, setRespostaIA] = useState<string>('');
  const [quizCompleto, setQuizCompleto] = useState(false);
  const [efeitoAtivo, setEfeitoAtivo] = useState<string>('');
  const iaRef = useRef(new IAEvolutiva());

  const processarEscolha = useCallback((escolha: Alternativa, pergunta: Pergunta) => {
    const resposta = iaRef.current.processarEscolha(escolha);
    
    const novoItem = {
      pergunta: pergunta.pergunta.titulo,
      escolha: escolha.texto,
      consequencia: escolha.consequencia,
      impactoEtico: escolha.impactoEtico,
      resposta
    };
    
    setHistorico(prev => [...prev, novoItem]);
    setRespostaIA(resposta);
    
    // Aplicar efeitos visuais
    if (escolha.efeitoVisual) {
      setEfeitoAtivo(escolha.efeitoVisual);
      setTimeout(() => setEfeitoAtivo(''), 3000);
    }
    
    // Tocar som (implementação futura)
    if (escolha.somEfeito) {
      console.log(`🔊 Som: ${escolha.somEfeito}`);
    }
    
    // Verificar se há defeito no botão
    if (escolha.probabilidadeDefeito && Math.random() < escolha.probabilidadeDefeito) {
      console.log('⚡ Mal contato detectado!');
    }
    
  }, []);

  const proximaPergunta = useCallback(() => {
    setPerguntaAtual(prev => prev + 1);
    setRespostaIA('');
  }, []);

  const finalizarQuiz = useCallback(() => {
    setQuizCompleto(true);
  }, []);

  const obterEstadoIA = useCallback(() => {
    return iaRef.current.obterProgresso();
  }, []);

  const obterPersonalidadeAtual = useCallback(() => {
    return iaRef.current.obterPersonalidadeAtual();
  }, []);

  const reiniciarQuiz = useCallback(() => {
    setPerguntaAtual(0);
    setHistorico([]);
    setRespostaIA('');
    setQuizCompleto(false);
    setEfeitoAtivo('');
    iaRef.current = new IAEvolutiva();
  }, []);

  return {
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
  };
};