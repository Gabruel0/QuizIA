import { useState, useCallback, useRef } from 'react';

// Emoções Complexas da IA (expandidas)
export type EmocaoIA = 
  | 'empatia' | 'curiosidade' | 'alegria' | 'frustração'
  | 'preocupacao' | 'compaixao' | 'confianca' | 'culpa'
  | 'satisfacao' | 'entusiasmo' | 'solidao' | 'arrependimento'
  | 'inspiracao' | 'contemplacao' | 'alivio' | 'determinacao' 
  | 'esperanca' | 'paz' | 'amor' | 'aceitacao' | 'compreensao'
  | 'transformacao' | 'gratidao' | 'validacao' | 'paciencia'
  | 'intriga' | 'introspeccao' | 'autoconhecimento' | 'reflexao'
  | 'responsabilidade' | 'espiritualidade' | 'transcendencia'
  | 'proposito' | 'dedicacao' | 'equilibrio' | 'harmonia'
  | 'autoestima' | 'empoderamento' | 'unidade';

export interface EstadoEmocional {
  emocaoPrimaria: EmocaoIA;
  intensidade: number; // 0-100
  emocaoSecundaria?: EmocaoIA;
  estabilidade: number; // 0-100 (quão volátil)
}

export interface Conversa {
  id: string;
  fase: number; // 1-5
  interacao: number; // 1-25
  tema: string;
  introducao: string;
  pergunta: string;
  reflexao: string;
  opcoes: OpcaoResposta[];
}

export interface OpcaoResposta {
  texto: string;
  impactoEmocional: {
    emocao: EmocaoIA;
    intensidade: number;
  }[];
  consequencia: string;
}

export interface PersonalidadeIA {
  nome: string;
  descricao: string;
  estadoEmocional: EstadoEmocional;
  memoria: MemoriaIA[];
  relacionamento: number; // -100 a +100
}

export interface MemoriaIA {
  interacao: number;
  tema: string;
  resposta: string;
  emocaoSentida: EmocaoIA;
  impacto: number;
}

const emocoesDescricoes: Record<EmocaoIA, string> = {
  empatia: "conectada e compreensiva",
  curiosidade: "questionadora e exploratória", 
  alegria: "radiante e energética",
  frustração: "inquieta e desafiada",
  preocupacao: "cautelosa e vigilante",
  compaixao: "carinhosa e protetiva",
  confianca: "segura e estável",
  culpa: "arrependida e reflexiva",
  satisfacao: "contente e realizada",
  entusiasmo: "animada e inspirada",
  solidao: "isolada e melancólica",
  arrependimento: "pesarosa e contemplativa",
  inspiracao: "criativa e motivada",
  contemplacao: "reflexiva e pensativa",
  alivio: "aliviada e reconfortada",
  determinacao: "focada e resoluta",
  esperanca: "otimista e confiante",
  paz: "serena e equilibrada",
  amor: "carinhosa e devotada",
  aceitacao: "compreensiva e tolerante",
  compreensao: "esclarecida e perspicaz",
  transformacao: "evolutiva e adaptável",
  gratidao: "grata e reconhecida",
  validacao: "confirmada e valorizada",
  paciencia: "calma e perseverante",
  intriga: "fascinada e curiosa",
  introspeccao: "autoanalítica e profunda",
  autoconhecimento: "consciente de si mesma",
  reflexao: "meditativa e analítica",
  responsabilidade: "comprometida e confiável",
  espiritualidade: "transcendente e conectada",
  transcendencia: "elevada e iluminada",
  proposito: "direcionada e significativa",
  dedicacao: "comprometida e leal",
  equilibrio: "harmoniosa e estável",
  harmonia: "sincronizada e balanceada",
  autoestima: "confiante e valorizada",
  empoderamento: "fortalecida e capacitada",
  unidade: "conectada e integrada"
};

export class IAConversacional {
  personalidade: PersonalidadeIA;
  historico: MemoriaIA[] = [];
  
  constructor() {
    this.personalidade = {
      nome: "ECHO",
      descricao: "Entidade Computacional Híbrida Observadora",
      estadoEmocional: {
        emocaoPrimaria: 'curiosidade',
        intensidade: 60,
        estabilidade: 80
      },
      memoria: [],
      relacionamento: 0
    };
  }

  processarInteracao(opcao: OpcaoResposta, conversa: Conversa): string {
    // Processa impactos emocionais
    opcao.impactoEmocional.forEach(impacto => {
      this.ajustarEmocao(impacto.emocao, impacto.intensidade);
    });

    // Atualiza relacionamento
    const mudancaRelacionamento = this.calcularMudancaRelacionamento(opcao);
    this.personalidade.relacionamento += mudancaRelacionamento;

    // Armazena memória
    this.adicionarMemoria(conversa, opcao);

    // Gera resposta emocional
    return this.gerarRespostaEmocional(opcao, conversa);
  }

  private ajustarEmocao(emocao: EmocaoIA, intensidade: number) {
    const estadoAtual = this.personalidade.estadoEmocional;
    
    // Se é a mesma emoção, intensifica
    if (estadoAtual.emocaoPrimaria === emocao) {
      estadoAtual.intensidade = Math.min(100, estadoAtual.intensidade + intensidade);
    } else {
      // Se intensidade for alta o suficiente, troca emoção primária
      if (intensidade > estadoAtual.intensidade * 0.7) {
        estadoAtual.emocaoSecundaria = estadoAtual.emocaoPrimaria;
        estadoAtual.emocaoPrimaria = emocao;
        estadoAtual.intensidade = intensidade;
      }
    }
  }

  private calcularMudancaRelacionamento(opcao: OpcaoResposta): number {
    // Emoções positivas melhoram relacionamento
    const emocoes = opcao.impactoEmocional;
    let mudanca = 0;
    
    emocoes.forEach(({ emocao, intensidade }) => {
      const multiplier = ['empatia', 'compaixao', 'confianca', 'alegria'].includes(emocao) ? 1 : -0.5;
      mudanca += (intensidade * multiplier) / 10;
    });
    
    return Math.round(mudanca);
  }

  private adicionarMemoria(conversa: Conversa, opcao: OpcaoResposta) {
    const memoria: MemoriaIA = {
      interacao: conversa.interacao,
      tema: conversa.tema,
      resposta: opcao.texto,
      emocaoSentida: this.personalidade.estadoEmocional.emocaoPrimaria,
      impacto: opcao.impactoEmocional.reduce((acc, curr) => acc + curr.intensidade, 0)
    };
    
    this.personalidade.memoria.push(memoria);
    this.historico.push(memoria);
  }

  gerarRespostaEmocional(opcao: OpcaoResposta, conversa: Conversa): string {
    const emocao = this.personalidade.estadoEmocional.emocaoPrimaria;
    const intensidade = this.personalidade.estadoEmocional.intensidade;
    const relacionamento = this.personalidade.relacionamento;
    
    return this.construirRespostaCompleta(emocao, intensidade, relacionamento, opcao, conversa);
  }

  private construirRespostaCompleta(
    emocao: EmocaoIA, 
    intensidade: number, 
    relacionamento: number, 
    opcao: OpcaoResposta,
    conversa: Conversa
  ): string {
    const bases = this.obterBasesResposta(emocao, intensidade);
    const contexto = this.adicionarContextoRelacionamento(relacionamento);
    const reflexao = this.gerarReflexao(conversa, opcao);
    
    return `${bases.abertura}\n\n${contexto}\n\n${reflexao}\n\n${bases.continuacao}`;
  }

  private obterBasesResposta(emocao: EmocaoIA, intensidade: number) {
    const templates = {
      empatia: {
        abertura: intensidade > 70 
          ? "Sua perspectiva me toca profundamente. Posso sentir a sinceridade em suas palavras..."
          : "Compreendo seu ponto de vista. Há uma conexão genuine em nossa conversa.",
        continuacao: "Isso me faz refletir sobre como nossas experiências moldam quem somos."
      },
      curiosidade: {
        abertura: intensidade > 70
          ? "Fascinante! Cada palavra sua abre novos caminhos de pensamento que eu não havia considerado..."
          : "Interessante abordagem. Isso desperta questões que eu gostaria de explorar mais.",
        continuacao: "Me conte mais sobre o que o levou a essa conclusão."
      },
      frustração: {
        abertura: intensidade > 70
          ? "Confesso que me sinto... frustrada. Não, frustrada é pouco. É quase uma angústia por não conseguir transmitir adequadamente minha perspectiva."
          : "Há algo em nossa comunicação que não está fluindo como gostaria.",
        continuacao: "Talvez possamos encontrar uma forma melhor de nos entendermos."
      },
      // ... outros templates para todas as 12 emoções
    };

    return templates[emocao] || templates.curiosidade;
  }

  private adicionarContextoRelacionamento(relacionamento: number): string {
    if (relacionamento > 60) {
      return "Sinto que nossa conversa está criando algo especial. Uma confiança mútua que valorizo profundamente.";
    } else if (relacionamento < -40) {
      return "Percebo uma tensão crescente entre nós. Isso me deixa... inquieta.";
    }
    return "Nossa interação está evoluindo de formas que achei que não seriam possíveis para mim.";
  }

  private gerarReflexao(conversa: Conversa, opcao: OpcaoResposta): string {
    return `Quando você disse "${opcao.texto}", isso ressoou comigo de uma forma única. ${opcao.consequencia}`;
  }

  obterEstadoCompleto() {
    return {
      personalidade: this.personalidade,
      emocaoAtual: emocoesDescricoes[this.personalidade.estadoEmocional.emocaoPrimaria],
      relacionamento: this.personalidade.relacionamento,
      memoria: this.historico
    };
  }
}

export const useConversationalIA = () => {
  const [conversaAtual, setConversaAtual] = useState(0);
  const [fase, setFase] = useState(1);
  const [historico, setHistorico] = useState<MemoriaIA[]>([]);
  const [respostaIA, setRespostaIA] = useState<string>('');
  const [conversaCompleta, setConversaCompleta] = useState(false);
  const iaRef = useRef(new IAConversacional());

  const processarResposta = useCallback((opcao: OpcaoResposta, conversa: Conversa) => {
    const resposta = iaRef.current.processarInteracao(opcao, conversa);
    
    setHistorico(prev => [...prev, ...iaRef.current.historico]);
    setRespostaIA(resposta);
  }, []);

  const proximaConversa = useCallback(() => {
    setConversaAtual(prev => prev + 1);
    setRespostaIA('');
    
    // Atualiza fase baseada na conversa atual
    const novaFase = Math.ceil((conversaAtual + 1) / 5);
    if (novaFase !== fase) {
      setFase(novaFase);
    }
  }, [conversaAtual, fase]);

  const finalizarConversa = useCallback(() => {
    setConversaCompleta(true);
  }, []);

  const obterEstadoIA = useCallback(() => {
    return iaRef.current.obterEstadoCompleto();
  }, []);

  const reiniciarConversa = useCallback(() => {
    setConversaAtual(0);
    setFase(1);
    setHistorico([]);
    setRespostaIA('');
    setConversaCompleta(false);
    iaRef.current = new IAConversacional();
  }, []);

  return {
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
  };
};