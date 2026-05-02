export type EventType = "birth" | "death" | "wedding" | "reunion" | "milestone" | "travel" | "other";

export interface Member {
  id: string;
  fullName: string;
  photo: string;
  birthDate: string; // ISO
  deathDate: string | null;
  bio: string;
  generation: 1 | 2 | 3 | 4;
  parents: string[];
  children: string[];
  spouse: string | null;
  isActive: boolean;
}

export interface FamilyEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  type: EventType;
  memberIds: string[];
  attachments: {
    photos: string[];
    documents: { name: string; url: string }[];
    youtubeUrl?: string;
    audioUrl?: string;
    links?: { label: string; url: string }[];
  };
  createdBy: string;
  reactions: number;
  commentCount: number;
}

export type ReactionType = "like" | "wow" | "sad" | "celebrate";

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  images: string[];
  youtubeUrl?: string;
  reactions: Record<ReactionType, number>;
  comments: Comment[];
  createdAt: string;
}

const photo = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=400&h=400&q=80`;

export const members: Member[] = [
  // Gen 1 — founders
  {
    id: "m1", fullName: "Friedrich Müller", photo: photo("photo-1507003211169-0a1dd7228f2d"),
    birthDate: "1865-04-12", deathDate: "1942-09-03",
    bio: "Patriarca da família. Imigrou da Floresta Negra alemã em 1890 e construiu o moinho d'água às margens do Rio Cadeia.",
    generation: 1, parents: [], children: ["m3", "m4", "m5"], spouse: "m2", isActive: false,
  },
  {
    id: "m2", fullName: "Elsa Müller (Schmidt)", photo: photo("photo-1494790108377-be9c29b29330"),
    birthDate: "1868-07-22", deathDate: "1939-12-15",
    bio: "Matriarca da família. Conhecida por seus pães de centeio e por ensinar piano às crianças do vilarejo.",
    generation: 1, parents: [], children: ["m3", "m4", "m5"], spouse: "m1", isActive: false,
  },
  // Gen 2
  {
    id: "m3", fullName: "Heinrich Müller", photo: photo("photo-1500648767791-00dcc994a43e"),
    birthDate: "1892-02-18", deathDate: "1975-06-30",
    bio: "Filho mais velho. Assumiu o moinho e expandiu a propriedade para 200 hectares de terra cultivada.",
    generation: 2, parents: ["m1", "m2"], children: ["m7", "m8"], spouse: "m6", isActive: false,
  },
  {
    id: "m4", fullName: "Gertrude Bauer (Müller)", photo: photo("photo-1438761681033-6461ffad8d80"),
    birthDate: "1894-11-05", deathDate: "1981-03-22",
    bio: "Casou-se com Wilhelm Bauer e mudou-se para Blumenau. Talentosa pintora de aquarelas.",
    generation: 2, parents: ["m1", "m2"], children: [], spouse: null, isActive: false,
  },
  {
    id: "m5", fullName: "Walter Müller", photo: photo("photo-1519085360753-af0119f7cbe7"),
    birthDate: "1898-08-30", deathDate: "1972-01-10",
    bio: "Carpinteiro de talento, criou móveis que decoram a casa da família até hoje.",
    generation: 2, parents: ["m1", "m2"], children: ["m9"], spouse: "m10", isActive: false,
  },
  {
    id: "m6", fullName: "Hildegard Müller (Fischer)", photo: photo("photo-1544005313-94ddf0286df2"),
    birthDate: "1896-05-14", deathDate: "1980-09-09",
    bio: "Esposa de Heinrich. Liderou o coral da igreja luterana por 40 anos.",
    generation: 2, parents: [], children: ["m7", "m8"], spouse: "m3", isActive: false,
  },
  {
    id: "m10", fullName: "Ingrid Müller (Hoffmann)", photo: photo("photo-1573496359142-b8d87734a5a2"),
    birthDate: "1902-03-19", deathDate: "1988-11-04",
    bio: "Esposa de Walter. Enfermeira, fundou o primeiro posto de saúde do distrito.",
    generation: 2, parents: [], children: ["m9"], spouse: "m5", isActive: false,
  },
  // Gen 3
  {
    id: "m7", fullName: "Klaus Müller", photo: photo("photo-1472099645785-5658abf4ff4e"),
    birthDate: "1925-09-12", deathDate: null,
    bio: "Engenheiro agrônomo aposentado. Hoje cuida da preservação histórica do moinho original.",
    generation: 3, parents: ["m3", "m6"], children: ["m11", "m12"], spouse: "m13", isActive: true,
  },
  {
    id: "m8", fullName: "Edith Schneider (Müller)", photo: photo("photo-1487412720507-e7ab37603c6f"),
    birthDate: "1928-04-25", deathDate: "2019-07-18",
    bio: "Professora de música. Compôs uma cantata em homenagem aos imigrantes.",
    generation: 3, parents: ["m3", "m6"], children: ["m14"], spouse: null, isActive: false,
  },
  {
    id: "m9", fullName: "Karl Müller", photo: photo("photo-1500648767791-00dcc994a43e"),
    birthDate: "1932-06-08", deathDate: null,
    bio: "Marceneiro como o pai. Mantém a oficina de Walter funcionando.",
    generation: 3, parents: ["m5", "m10"], children: ["m15"], spouse: null, isActive: true,
  },
  {
    id: "m13", fullName: "Hannelore Müller (Weber)", photo: photo("photo-1580489944761-15a19d654956"),
    birthDate: "1930-12-02", deathDate: null,
    bio: "Esposa de Klaus. Bibliotecária aposentada e historiadora amadora da família.",
    generation: 3, parents: [], children: ["m11", "m12"], spouse: "m7", isActive: true,
  },
  // Gen 4
  {
    id: "m11", fullName: "Stefan Müller", photo: photo("photo-1599566150163-29194dcaad36"),
    birthDate: "1958-10-14", deathDate: null,
    bio: "Médico em Porto Alegre. Pai de duas filhas e um neto.",
    generation: 4, parents: ["m7", "m13"], children: [], spouse: null, isActive: true,
  },
  {
    id: "m12", fullName: "Brigitte Lang (Müller)", photo: photo("photo-1554151228-14d9def656e4"),
    birthDate: "1962-05-27", deathDate: null,
    bio: "Arquiteta. Restaurou a casa-sede da família entre 2010 e 2014.",
    generation: 4, parents: ["m7", "m13"], children: [], spouse: null, isActive: true,
  },
  {
    id: "m14", fullName: "Lucas Schneider", photo: photo("photo-1492562080023-ab3db95bfbce"),
    birthDate: "1965-01-19", deathDate: null,
    bio: "Músico e regente do coral municipal de Lajeado, seguindo o legado da mãe.",
    generation: 4, parents: ["m8"], children: [], spouse: null, isActive: true,
  },
  {
    id: "m15", fullName: "Anna Müller", photo: photo("photo-1534528741775-53994a69daeb"),
    birthDate: "1970-08-03", deathDate: null,
    bio: "Designer e fotógrafa. Documenta a memória da família em livros de arte.",
    generation: 4, parents: ["m9"], children: [], spouse: null, isActive: true,
  },
];

const galleryPhoto = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`;

export const galleryImages = [
  { src: galleryPhoto("photo-1511895426328-dc8714191300"), year: 1947, caption: "Reunião de Natal" },
  { src: galleryPhoto("photo-1606216794074-735e91aa2c92"), year: 1962, caption: "Festa de casamento de Klaus" },
  { src: galleryPhoto("photo-1542037104857-ffbb0b9155fb"), year: 1985, caption: "Encontro no moinho" },
  { src: galleryPhoto("photo-1529626455594-4ff0802cfb7e"), year: 1998, caption: "Aniversário do vovô Heinrich" },
  { src: galleryPhoto("photo-1576765608535-5f04d1e3a289"), year: 2005, caption: "Verão na fazenda" },
  { src: galleryPhoto("photo-1606800052052-a08af7148866"), year: 2014, caption: "Restauração da casa-sede" },
  { src: galleryPhoto("photo-1529390079861-591de354faf5"), year: 2019, caption: "Coral da família" },
  { src: galleryPhoto("photo-1519225421980-715cb0215aed"), year: 2023, caption: "Reunião dos primos" },
];

export const events: FamilyEvent[] = [
  { id: "e1", title: "Chegada ao Brasil", description: "Friedrich e Elsa desembarcam no porto do Rio de Janeiro com três crianças e uma mala de livros.", date: "1890-03-12", type: "travel", memberIds: ["m1", "m2"], attachments: { photos: [galleryPhoto("photo-1551817958-c5b51e7b4a33")], documents: [{ name: "Carta de imigração", url: "#" }] }, createdBy: "m13", reactions: 24, commentCount: 5 },
  { id: "e2", title: "Construção do Moinho d'Água", description: "Friedrich finaliza o moinho às margens do Rio Cadeia. Marco da comunidade.", date: "1894-11-08", type: "milestone", memberIds: ["m1"], attachments: { photos: [galleryPhoto("photo-1551782450-a2132b4ba21d")], documents: [] }, createdBy: "m13", reactions: 31, commentCount: 8 },
  { id: "e3", title: "Nascimento de Heinrich", description: "Primeiro filho nascido em solo brasileiro.", date: "1892-02-18", type: "birth", memberIds: ["m3"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 12, commentCount: 2 },
  { id: "e4", title: "Casamento de Heinrich e Hildegard", description: "Cerimônia luterana com mais de 200 convidados.", date: "1920-06-14", type: "wedding", memberIds: ["m3", "m6"], attachments: { photos: [galleryPhoto("photo-1519741497674-611481863552")], documents: [] }, createdBy: "m13", reactions: 18, commentCount: 4 },
  { id: "e5", title: "Falecimento de Friedrich", description: "Aos 77 anos, deixa um legado de trabalho e união.", date: "1942-09-03", type: "death", memberIds: ["m1"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 22, commentCount: 6 },
  { id: "e6", title: "Coral da Igreja", description: "Hildegard assume a regência do coral, função que manterá por 40 anos.", date: "1945-01-20", type: "milestone", memberIds: ["m6"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 9, commentCount: 1 },
  { id: "e7", title: "Casamento de Klaus e Hannelore", description: "Festa de três dias na propriedade da família.", date: "1955-08-22", type: "wedding", memberIds: ["m7", "m13"], attachments: { photos: [galleryPhoto("photo-1606216794074-735e91aa2c92")], documents: [], youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }, createdBy: "m13", reactions: 27, commentCount: 7 },
  { id: "e8", title: "Nascimento de Stefan", description: "Primeiro neto de Klaus e Hannelore.", date: "1958-10-14", type: "birth", memberIds: ["m11"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 14, commentCount: 3 },
  { id: "e9", title: "Reunião dos 100 Anos da Família", description: "Centenário da chegada ao Brasil. Mais de 80 familiares reunidos.", date: "1990-03-12", type: "reunion", memberIds: ["m7", "m13", "m11", "m12", "m9", "m14", "m15"], attachments: { photos: [galleryPhoto("photo-1529390079861-591de354faf5")], documents: [] }, createdBy: "m13", reactions: 45, commentCount: 12 },
  { id: "e10", title: "Viagem de Klaus à Alemanha", description: "Visita a parentes em Freiburg após 60 anos.", date: "1995-07-04", type: "travel", memberIds: ["m7"], attachments: { photos: [galleryPhoto("photo-1467269204594-9661b134dd2b")], documents: [] }, createdBy: "m13", reactions: 19, commentCount: 4 },
  { id: "e11", title: "Restauração da Casa-Sede", description: "Brigitte conduz restauração arquitetônica que preserva a estrutura original de 1895.", date: "2014-12-01", type: "milestone", memberIds: ["m12"], attachments: { photos: [galleryPhoto("photo-1606800052052-a08af7148866")], documents: [{ name: "Projeto arquitetônico", url: "#" }] }, createdBy: "m12", reactions: 38, commentCount: 9 },
  { id: "e12", title: "Falecimento de Edith", description: "Despedimo-nos da nossa professora de música.", date: "2019-07-18", type: "death", memberIds: ["m8"], attachments: { photos: [], documents: [] }, createdBy: "m14", reactions: 31, commentCount: 11 },
  { id: "e13", title: "Lançamento do Livro de Anna", description: "'Müller — Memórias em Imagens' chega às livrarias.", date: "2021-05-09", type: "milestone", memberIds: ["m15"], attachments: { photos: [], documents: [], links: [{ label: "Comprar livro", url: "#" }] }, createdBy: "m15", reactions: 26, commentCount: 8 },
  { id: "e14", title: "Reunião dos Primos 2023", description: "Encontro anual realizado na sede da família.", date: "2023-10-21", type: "reunion", memberIds: ["m11", "m12", "m14", "m15"], attachments: { photos: [galleryPhoto("photo-1519225421980-715cb0215aed")], documents: [] }, createdBy: "m12", reactions: 42, commentCount: 15 },
  { id: "e15", title: "Nascimento de Lucas", description: "Filho de Edith, mantém o talento musical da família.", date: "1965-01-19", type: "birth", memberIds: ["m14"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 11, commentCount: 2 },
  { id: "e16", title: "Concerto de Lucas", description: "Lucas rege concerto especial em Lajeado em homenagem à mãe.", date: "2020-11-08", type: "milestone", memberIds: ["m14"], attachments: { photos: [], documents: [], youtubeUrl: "https://www.youtube.com/watch?v=jAyw7aV9Ugc" }, createdBy: "m14", reactions: 33, commentCount: 6 },
  { id: "e17", title: "Aniversário de 100 anos do Moinho", description: "Comunidade celebra a estrutura icônica.", date: "1994-11-08", type: "reunion", memberIds: ["m7", "m13", "m9"], attachments: { photos: [galleryPhoto("photo-1542037104857-ffbb0b9155fb")], documents: [] }, createdBy: "m13", reactions: 20, commentCount: 5 },
  { id: "e18", title: "Casamento de Walter e Ingrid", description: "União que trouxe a tradição da enfermagem para a família.", date: "1928-09-15", type: "wedding", memberIds: ["m5", "m10"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 14, commentCount: 3 },
  { id: "e19", title: "Inauguração do Posto de Saúde", description: "Ingrid funda o primeiro posto do distrito.", date: "1935-04-23", type: "milestone", memberIds: ["m10"], attachments: { photos: [], documents: [] }, createdBy: "m13", reactions: 17, commentCount: 4 },
  { id: "e20", title: "Aniversário de 90 anos de Klaus", description: "Família reúne-se para celebrar o patriarca.", date: "2015-09-12", type: "reunion", memberIds: ["m7", "m13", "m11", "m12"], attachments: { photos: [galleryPhoto("photo-1576765608535-5f04d1e3a289")], documents: [] }, createdBy: "m12", reactions: 50, commentCount: 18 },
];

export const posts: Post[] = [
  { id: "p1", authorId: "m15", content: "Encontrei essa foto incrível do vovô Klaus na oficina do tio Karl. Os detalhes da carpintaria são impressionantes! 🌳", images: [galleryPhoto("photo-1542037104857-ffbb0b9155fb")], reactions: { like: 12, wow: 5, sad: 0, celebrate: 2 }, comments: [ { id: "c1", authorId: "m12", text: "Que tesouro! Precisamos imprimir isso.", createdAt: "2026-04-22T14:00:00Z" }, { id: "c2", authorId: "m11", text: "Lembro perfeitamente desse dia.", createdAt: "2026-04-22T16:30:00Z" } ], createdAt: "2026-04-22T10:00:00Z" },
  { id: "p2", authorId: "m12", content: "Começando a planejar a Reunião dos Primos 2026! Quem topa Gramado em outubro? 🎉", images: [], reactions: { like: 18, wow: 0, sad: 0, celebrate: 9 }, comments: [ { id: "c3", authorId: "m14", text: "Eu vou! Levo o coral.", createdAt: "2026-04-20T20:00:00Z" }, { id: "c4", authorId: "m15", text: "Conta comigo para a fotografia.", createdAt: "2026-04-21T09:00:00Z" }, { id: "c5", authorId: "m11", text: "Confirmadíssimo.", createdAt: "2026-04-21T10:00:00Z" } ], createdAt: "2026-04-20T18:00:00Z" },
  { id: "p3", authorId: "m14", content: "Compartilhando a gravação do último concerto do coral. Dedicado à memória da minha mãe. 🎵", images: [], youtubeUrl: "https://www.youtube.com/watch?v=jAyw7aV9Ugc", reactions: { like: 24, wow: 3, sad: 8, celebrate: 0 }, comments: [{ id: "c6", authorId: "m13", text: "Lindo, Lucas. Edith estaria orgulhosa.", createdAt: "2026-04-15T22:00:00Z" }], createdAt: "2026-04-15T20:00:00Z" },
  { id: "p4", authorId: "m11", content: "Hoje completaria 100 anos da Hildegard. Saudades eternas da nossa avó.", images: [], reactions: { like: 30, wow: 0, sad: 22, celebrate: 0 }, comments: [], createdAt: "2026-04-14T08:00:00Z" },
  { id: "p5", authorId: "m13", content: "Atualização do arquivo da família: digitalizei mais 80 fotos antigas! Em breve disponibilizo no Feed.", images: [galleryPhoto("photo-1511895426328-dc8714191300"), galleryPhoto("photo-1606216794074-735e91aa2c92")], reactions: { like: 22, wow: 11, sad: 0, celebrate: 4 }, comments: [{ id: "c7", authorId: "m15", text: "Vó, você é um patrimônio!", createdAt: "2026-04-10T19:00:00Z" }], createdAt: "2026-04-10T17:00:00Z" },
  { id: "p6", authorId: "m15", content: "Visitei o moinho ontem. A luz do entardecer ali é mágica. ✨", images: [galleryPhoto("photo-1551782450-a2132b4ba21d")], reactions: { like: 19, wow: 7, sad: 0, celebrate: 0 }, comments: [], createdAt: "2026-04-05T19:30:00Z" },
  { id: "p7", authorId: "m12", content: "Pequeno tour pela casa-sede restaurada. Cada parede tem uma história.", images: [galleryPhoto("photo-1606800052052-a08af7148866")], reactions: { like: 16, wow: 4, sad: 0, celebrate: 3 }, comments: [], createdAt: "2026-04-01T15:00:00Z" },
  { id: "p8", authorId: "m9", content: "Ainda usando as ferramentas que meu pai Walter fez. Mais de 70 anos depois e funcionam perfeitamente. 🛠️", images: [], reactions: { like: 28, wow: 12, sad: 0, celebrate: 0 }, comments: [{ id: "c8", authorId: "m11", text: "Qualidade alemã, tio Karl!", createdAt: "2026-03-28T11:00:00Z" }], createdAt: "2026-03-28T09:00:00Z" },
  { id: "p9", authorId: "m14", content: "Procurando a partitura original da cantata da minha mãe. Alguém da família guarda?", images: [], reactions: { like: 8, wow: 0, sad: 2, celebrate: 0 }, comments: [{ id: "c9", authorId: "m13", text: "Acho que está no baú do Klaus. Vou checar amanhã.", createdAt: "2026-03-25T14:00:00Z" }], createdAt: "2026-03-25T12:00:00Z" },
  { id: "p10", authorId: "m11", content: "Aniversário do papai Klaus em algumas semanas. Vamos planejar uma surpresa? 🎂", images: [], reactions: { like: 21, wow: 0, sad: 0, celebrate: 14 }, comments: [{ id: "c10", authorId: "m12", text: "Adorei a ideia. Sugestões?", createdAt: "2026-03-20T16:00:00Z" }, { id: "c11", authorId: "m15", text: "Faço o álbum fotográfico!", createdAt: "2026-03-20T18:00:00Z" }], createdAt: "2026-03-20T14:00:00Z" },
];

export const eventTypeMeta: Record<EventType, { icon: string; color: string }> = {
  birth: { icon: "🍼", color: "bg-primary-light/15 text-primary border-primary/30" },
  death: { icon: "✝️", color: "bg-muted text-muted-foreground border-border" },
  wedding: { icon: "💍", color: "bg-accent/20 text-secondary border-accent/40" },
  reunion: { icon: "🎉", color: "bg-secondary/15 text-secondary border-secondary/30" },
  milestone: { icon: "🏆", color: "bg-accent/15 text-secondary border-accent/30" },
  travel: { icon: "✈️", color: "bg-primary/10 text-primary border-primary/30" },
  other: { icon: "📌", color: "bg-muted text-muted-foreground border-border" },
};

export const getMember = (id: string) => members.find((m) => m.id === id);
