export type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
};

export type Quiz = {
  totalQuestions: number;
  questions: Question[];
};

export const quiz: Quiz = {
  totalQuestions: 5,

  questions: [
    {
      id: 1,
      question: "What makes Union Protocol different from standard IBC?",
      answers: [
        "It removes all security guarantees",
        "It adds extensions for efficiency while maintaining security",
        "It only works with Ethereum mainnet",
        "It doesn't use connections or channels",
      ],
      correctAnswer:
        "It adds extensions for efficiency while maintaining security",
    },
    {
      id: 2,
      question: "What do Union connections encode?",
      answers: [
        "Only transaction fees",
        "Finality mechanisms and security levels",
        "Smart contract addresses",
        "Token exchange rates",
      ],
      correctAnswer: "Finality mechanisms and security levels",
    },
    {
      id: 3,
      question: "Which of these is NOT a supported Union connection type?",
      answers: ["Direct", "Recursive", "Bi-directional", "Beacon-kit"],
      correctAnswer: "Bi-directional",
    },
    {
      id: 4,
      question: "What abstraction do Union channels provide?",
      answers: [
        "They hide connection complexity from end users",
        "They reduce transaction fees",
        "They eliminate the need for light clients",
        "They prevent cross-chain communication",
      ],
      correctAnswer: "They hide connection complexity from end users",
    },
    {
      id: 5,
      question: "Which layers does Union's 'Datesay Control' system work with?",
      answers: [
        "Only L1 chains",
        "L1 and L2 only",
        "L1, L2, and L3",
        "Only application-specific chains",
      ],
      correctAnswer: "L1, L2, and L3",
    },

    {
      id: 6,
      question: "What can Union's recursive connections leverage?",
      answers: [
        "Only direct finality",
        "Statelenses for multiple hops",
        "Centralized validators",
        "Non-cryptographic proofs",
      ],
      correctAnswer: "Statelenses for multiple hops",
    },
    {
      id: 7,
      question: "Which of these is a benefit of Union's channel system?",
      answers: [
        "Protocols can run concurrently",
        "Channels are locked to specific connections",
        "Only one protocol version is supported",
        "Messages are always delayed by 24 hours",
      ],
      correctAnswer: "Protocols can run concurrently",
    },
    {
      id: 8,
      question: "What type of finalization does Union support on Arbitrum?",
      answers: [
        "Only hard finalization",
        "Only soft finalization",
        "Both soft and hard finalization",
        "No finalization support",
      ],
      correctAnswer: "Both soft and hard finalization",
    },
    {
      id: 9,
      question: "How does Union Protocol handle connection categories?",
      answers: [
        "Requires manual configuration for each chain",
        "Abstracts them as simple sockets for users",
        "Only supports one category at a time",
        "Eliminates the need for connections entirely",
      ],
      correctAnswer: "Abstracts them as simple sockets for users",
    },
    {
      id: 10,
      question: "What problem do zero-knowledge proofs solve for Union?",
      answers: [
        "They reduce the need for validators",
        "They increase security and scale throughput",
        "They eliminate gas fees",
        "They enable anonymous transactions",
      ],
      correctAnswer: "They increase security and scale throughput",
    },

    {
      id: 11,
      question:
        "What is required to permissionlessly connect a chain to Union Protocol?",
      answers: [
        "Approval from Union governance",
        "A compatible virtual machine (VM)",
        "A minimum token stake",
        "Centralized validator approval",
      ],
      correctAnswer: "A compatible virtual machine (VM)",
    },
    {
      id: 12,
      question: "Which types of chains can connect to Union Protocol?",
      answers: [
        "Only Ethereum L1",
        "Only EVM-compatible chains",
        "L1s, L2s, L3s, and Rollups",
        "Only chains with native IBC support",
      ],
      correctAnswer: "L1s, L2s, L3s, and Rollups",
    },
    {
      id: 13,
      question: "Which virtual machines does Union currently support?",
      answers: [
        "Only EVM",
        "EVM and CosmWasm",
        "EVM, CosmWasm, and Move",
        "All virtual machines without exception",
      ],
      correctAnswer: "EVM, CosmWasm, and Move",
    },
    {
      id: 14,
      question: "What makes Union's connection process permissionless?",
      answers: [
        "No governance approval required",
        "Automatic connection without setup",
        "Only whitelisted chains can connect",
        "Requires manual validator approval",
      ],
      correctAnswer: "No governance approval required",
    },
    {
      id: 15,
      question:
        "What is Union's primary function in the interoperability landscape?",
      answers: [
        "A speculative trading platform",
        "A settlement and liquidity layer",
        "An NFT marketplace aggregator",
        "A blockchain gaming portal",
      ],
      correctAnswer: "A settlement and liquidity layer",
    },

    {
      id: 16,
      question:
        "What makes Union Protocol uniquely suited for a multichain future?",
      answers: [
        "It forces all activity onto a single chain",
        "It's decentralized, scalable, and permissionless",
        "It relies on centralized intermediaries",
        "It only works with Ethereum-based chains",
      ],
      correctAnswer: "It's decentralized, scalable, and permissionless",
    },
    {
      id: 17,
      question: "Which two key innovations does Union's architecture combine?",
      answers: [
        "Optimistic rollups and sharding",
        "Consensus verification and zero-knowledge proofs",
        "Proof-of-Work and Proof-of-Stake",
        "Smart contracts and oracles",
      ],
      correctAnswer: "Consensus verification and zero-knowledge proofs",
    },
    {
      id: 18,
      question:
        "What type of data transfer does Union support that most interoperability protocols don't?",
      answers: [
        "NFT transfers only",
        "General message passing of non-asset data",
        "High-frequency trading data",
        "Private encrypted memos",
      ],
      correctAnswer: "General message passing of non-asset data",
    },
    {
      id: 19,
      question: "How does Union handle asset issuance?",
      answers: [
        "Assets are locked to their native chain",
        "Assets become composable and verifiable across all chains",
        "Only wrapped assets are supported",
        "Assets must be converted to stablecoins first",
      ],
      correctAnswer:
        "Assets become composable and verifiable across all chains",
    },
    {
      id: 20,
      question:
        "Which verification methods does Union's trusted system support?",
      answers: [
        "Only multi-signature wallets",
        "Single signature and ZK-enabled workshops",
        "Just Proof-of-Stake validation",
        "Exclusively optimistic verification",
      ],
      correctAnswer: "Single signature and ZK-enabled workshops",
    },
  ],
};
