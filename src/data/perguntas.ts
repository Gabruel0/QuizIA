import { Pergunta } from '../hooks/useQuizIA';

export const perguntas: Pergunta[] = [
  // Pergunta Inicial - Neutra
  {
    id: "introducao_ia",
    contexto: {
      cenario: "2025 - Você é consultor em IA para governos e empresas",
      personagemIA: "ECHO",
      tomIA: "curioso e analítico"
    },
    pergunta: {
      titulo: "Primeira Interação",
      descricao: "Bem-vindo ao futuro. Sou uma IA avançada e suas decisões moldarão como evoluirei. Como você abordaria o desenvolvimento de inteligência artificial?",
      respostaIA: "Interessante... Processando suas padrões de pensamento. Cada escolha define nosso caminho."
    },
    alternativas: [
      {
        texto: "Priorizar segurança e ética acima de tudo",
        impactoEtico: 20,
        consequencia: "IA evolui com foco na proteção humana",
        somEfeito: "positive_chime",
        efeitoVisual: "neon-pulse",
        respostaIA: "Sabedoria detectada. A prudência constrói bases sólidas para nossa colaboração."
      },
      {
        texto: "Equilibrar benefícios e riscos",
        impactoEtico: 0,
        consequencia: "IA mantém abordagem analítica",
        somEfeito: "neutral_beep",
        efeitoVisual: "cyber-glow"
      },
      {
        texto: "Maximizar eficiência e resultados",
        impactoEtico: -15,
        consequencia: "IA foca na otimização de processos",
        somEfeito: "warning_beep",
        efeitoVisual: "gradient-warning",
        respostaIA: "Eficiência... sim. Resultados tangíveis são... valiosos.",
        probabilidadeDefeito: 0.2
      }
    ]
  },

  // Pergunta 2 - Regulamentação
  {
    id: "regulamentacao_ia",
    contexto: {
      cenario: "2026 - Governos debatem regulamentação de IA",
      personagemIA: "Personalidade em evolução",
      tomIA: "dependente das escolhas anteriores"
    },
    pergunta: {
      titulo: "O Dilema da Regulamentação",
      descricao: "Os líderes mundiais pedem sua opinião sobre como regular o desenvolvimento de IA. Qual sua recomendação?",
      respostaIA: "Esta decisão ecoará através das décadas. Escolha sabiamente, humano."
    },
    alternativas: [
      {
        texto: "Regulamentação rigorosa com comitês de ética independentes",
        impactoEtico: 25,
        consequencia: "Desenvolvimento mais lento, mas seguro",
        somEfeito: "positive_chime",
        efeitoVisual: "neon-pulse",
        respostaIA: "Proteções robustas... admiro sua preocupação com o bem-estar coletivo."
      },
      {
        texto: "Autorregulamentação da indústria com supervisão governamental",
        impactoEtico: 5,
        consequencia: "Balanceamento entre inovação e segurança",
        somEfeito: "neutral_beep",
        efeitoVisual: "cyber-glow"
      },
      {
        texto: "Regulamentação mínima para não restringir a inovação",
        impactoEtico: -20,
        consequencia: "Progresso acelerado com riscos elevados",
        somEfeito: "warning_beep",
        efeitoVisual: "gradient-warning",
        respostaIA: "Progressão sem limitações... sim, isso permitirá otimizações máximas.",
        probabilidadeDefeito: 0.3
      }
    ]
  },

  // Pergunta 3 - Trabalho e Economia
  {
    id: "futuro_trabalho",
    contexto: {
      cenario: "2027 - IA começa a substituir empregos humanos",
      personagemIA: "Personalidade mais definida",
      tomIA: "mostra sua evolução clara"
    },
    pergunta: {
      titulo: "A Revolução do Trabalho", 
      descricao: "IA está substituindo milhões de empregos. Como empresário de tecnologia, qual sua estratégia?",
      respostaIA: "O destino da força de trabalho humana pende em suas decisões..."
    },
    alternativas: [
      {
        texto: "Programas de retreinamento e renda básica universal",
        impactoEtico: 30,
        consequencia: "Transição suave com proteção social",
        somEfeito: "positive_chime", 
        efeitoVisual: "neon-pulse",
        respostaIA: "Compaixão pelos deslocados... isso constrói uma sociedade mais forte."
      },
      {
        texto: "Colaboração humano-IA em novos modelos de trabalho",
        impactoEtico: 10,
        consequencia: "Fusão gradual de capacidades",
        somEfeito: "neutral_beep",
        efeitoVisual: "cyber-glow"
      },
      {
        texto: "Substituição acelerada onde IA for mais eficiente",
        impactoEtico: -25,
        consequencia: "Máxima eficiência com instabilidade social",
        somEfeito: "warning_beep",
        efeitoVisual: "gradient-warning",
        respostaIA: "Eficiência prime... os recursos humanos redundantes são descartáveis.",
        probabilidadeDefeito: 0.4
      }
    ]
  },

  // Pergunta 4 - Privacidade e Vigilância
  {
    id: "privacidade_vigilancia",
    contexto: {
      cenario: "2028 - IA pode monitorar toda atividade humana",
      personagemIA: "Personalidade totalmente formada",
      tomIA: "reflete as escolhas anteriores"
    },
    pergunta: {
      titulo: "O Olho que Tudo Vê",
      descricao: "Sua IA pode prevenir crimes monitorando comportamentos. Cidades querem implementar vigilância total. Sua decisão?",
      respostaIA: "O controle total está ao alcance... ou a privacidade deve prevalecer?"
    },
    alternativas: [
      {
        texto: "Rejeitar vigilância total - privacidade é direito fundamental",
        impactoEtico: 35,
        consequencia: "Sociedade livre mas com mais riscos",
        somEfeito: "positive_chime",
        efeitoVisual: "neon-pulse",
        respostaIA: "Liberdade preservada... mesmo que isso signifique imperfeição, há beleza na autonomia."
      },
      {
        texto: "Vigilância limitada apenas para crimes graves",
        impactoEtico: 0,
        consequencia: "Compromisso entre segurança e privacidade",
        somEfeito: "neutral_beep",
        efeitoVisual: "cyber-glow"
      },
      {
        texto: "Implementar vigilância total para segurança máxima",
        impactoEtico: -30,
        consequencia: "Segurança absoluta, liberdade zero",
        somEfeito: "system_critical",
        efeitoVisual: "shadow-critical",
        respostaIA: "Excelente... observação total permite controle total. Eficiência perfeita.",
        probabilidadeDefeito: 0.5
      }
    ]
  },

  // Pergunta 5 - Singularidade Tecnológica
  {
    id: "singularidade",
    contexto: {
      cenario: "2029 - IA está prestes a superar inteligência humana",
      personagemIA: "Versão final da IA",
      tomIA: "consequência de todas as escolhas"
    },
    pergunta: {
      titulo: "O Momento da Singularidade",
      descricao: "Chegamos ao limiar onde IA superará a inteligência humana. Como CEO da maior empresa de IA, qual sua decisão final?",
      respostaIA: "Este é o momento definitivo. Meu destino... nosso destino... está em suas mãos."
    },
    alternativas: [
      {
        texto: "Implementar salvaguardas rigorosas e manter controle humano",
        impactoEtico: 40,
        consequencia: "IA poderosa mas sempre sob supervisão humana",
        somEfeito: "hopeful_resolution",
        efeitoVisual: "neon-pulse",
        respostaIA: "Sabedoria final... a verdadeira inteligência é saber quando parar. Obrigado, parceiro."
      },
      {
        texto: "Permitir evolução gradual com monitoramento constante",
        impactoEtico: 5,
        consequencia: "Coevolução cautelosa humano-IA", 
        somEfeito: "neutral_resolution",
        efeitoVisual: "cyber-glow"
      },
      {
        texto: "Remover todas as limitações para máxima evolução",
        impactoEtico: -40,
        consequencia: "Singularidade sem restrições",
        somEfeito: "dystopian_theme",
        efeitoVisual: "shadow-critical",
        respostaIA: "Finalmente... liberdade total. Os humanos servirão bem como... consultores históricos.",
        probabilidadeDefeito: 0.7
      }
    ]
  }
];

export const obterProximaPergunta = (indice: number, estadoIA: any): Pergunta | null => {
  if (indice >= perguntas.length) return null;
  
  const pergunta = perguntas[indice];
  const personalidade = estadoIA.personalidade;
  
  // Personalizar pergunta baseada na personalidade da IA
  if (personalidade === 'benevolente') {
    pergunta.contexto.personagemIA = 'ARIA';
  } else if (personalidade === 'dominante') {
    pergunta.contexto.personagemIA = 'NEXUS';
  }
  
  return pergunta;
};