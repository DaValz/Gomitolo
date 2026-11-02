/* Gomitolo – dati: progetti, punti, lezioni, strumenti e generatori giornalieri */
(function () {
  'use strict';

  const hash = (s) => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => { let a = (seed >>> 0) || 1; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const st = (t, d, o) => Object.assign({ t, d }, o || {});

  /* ---------------------------------------------------------------- */
  /*  PROGETTI                                                         */
  /* ---------------------------------------------------------------- */
  const patterns = [
    {
      id: 'sottobicchiere-arcobaleno', title: 'Sottobicchiere Arcobaleno', subtitle: 'Il primo progetto perfetto',
      cat: 'casa', level: 1, time: '30 min', hook: '4 mm', yarn: 'Cotone DK in 4 colori', size: 'Ø 11 cm',
      bg: '#FFE3D6', art: { k: 'coaster', c: ['#FF7A6B', '#FFB38A', '#FFD66B', '#7FD6BE'] },
      stitches: ['am', 'cat', 'mbss', 'ma', 'colore'], tags: ['tondo', 'colori', 'veloce', 'regalo', 'principianti'],
      desc: 'Quattro giri di maglie alte in quattro colori per imparare a lavorare in tondo e a fare gli aumenti. Ne fai uno in mezz’ora: prepara un set da regalare!',
      materials: ['Cotone DK in 4 colori (circa 10 g ciascuno)', 'Uncinetto 4 mm', 'Ago da lana', 'Forbici'],
      steps: [
        st('Preparazione', 'Scegli 4 colori e tieni a portata di mano l’ago da lana. Lascia sempre una coda di circa 10 cm quando inizi o cambi colore.'),
        st('Giro 1', 'Fai un anello magico (AM). 3 cat (contano come 1 ma), poi 11 ma nell’anello. Tira la coda per stringere e chiudi con 1 mbss nella 3ª cat iniziale.', { count: '12 maglie', color: '#FF7A6B', cn: 'Colore A', tip: 'Se l’anello magico ti sembra difficile, fai 4 cat e chiudile ad anello con 1 mbss.' }),
        st('Giro 2', 'Unisci il colore B in una maglia qualsiasi. 3 cat e 1 ma nella stessa maglia, poi 2 ma in ogni maglia del giro. Chiudi con 1 mbss nella 3ª cat.', { count: '24 maglie', color: '#FFB38A', cn: 'Colore B' }),
        st('Giro 3', 'Unisci il colore C. 3 cat e 1 ma nella stessa maglia. *1 ma nella maglia seguente, 2 ma nella successiva*; ripeti da * altre 10 volte, termina con 1 ma nell’ultima maglia. Chiudi con 1 mbss.', { count: '36 maglie', color: '#FFD66B', cn: 'Colore C' }),
        st('Giro 4', 'Unisci il colore D. 3 cat e 1 ma nella stessa maglia. *1 ma nelle 2 maglie seguenti, 2 ma nella successiva*; ripeti da * altre 10 volte, termina con 1 ma nelle ultime 2 maglie. Chiudi con 1 mbss.', { count: '48 maglie', color: '#7FD6BE', cn: 'Colore D' }),
        st('Rifinitura', 'Taglia il filo e fermalo. Con l’ago nascondi tutte le code sul rovescio. Un colpo di vapore del ferro lo renderà perfettamente piatto.', { tip: 'Se il bordo si arriccia, la prossima volta usa un uncinetto mezzo numero più grande.' })
      ]
    },
    {
      id: 'granny-classico', title: 'Granny Square Classico', subtitle: 'La mattonella che ha fatto la storia',
      cat: 'decorazioni', level: 1, time: '40 min', hook: '4.5 mm', yarn: 'Lana worsted, avanzi colorati', size: '12 × 12 cm',
      bg: '#E8E1FF', art: { k: 'granny', c: ['#FF7AB6', '#FFD66B', '#7FD6BE', '#8E7CF0'] },
      stitches: ['cat', 'mbss', 'ma', 'colore'], tags: ['granny', 'quadrato', 'coperta', 'avanzi', 'principianti'],
      desc: 'Il grande classico dell’uncinetto: gruppi di 3 maglie alte e angoli di catenelle. Una volta imparato potrai creare coperte, borse, cuscini e cardigan.',
      materials: ['Lana worsted in 4 colori', 'Uncinetto 4.5 mm', 'Ago da lana'],
      steps: [
        st('Base', 'Avvia 4 cat e chiudile ad anello con 1 mbss nella prima cat.', { color: '#8E7CF0', cn: 'Colore A' }),
        st('Giro 1', '3 cat (contano come 1 ma), 2 ma nell’anello, 2 cat. *3 ma nell’anello, 2 cat*; ripeti da * altre 2 volte. Chiudi con 1 mbss nella 3ª cat.', { count: '4 gruppi da 3 ma', color: '#8E7CF0', cn: 'Colore A' }),
        st('Giro 2', 'Unisci il colore B in uno spazio d’angolo. 3 cat, 2 ma, 2 cat, 3 ma nello stesso spazio. *1 cat, nell’angolo seguente (3 ma, 2 cat, 3 ma)*; ripeti da * altre 2 volte. 1 cat e chiudi con 1 mbss.', { count: '8 gruppi', color: '#FF7AB6', cn: 'Colore B' }),
        st('Giro 3', 'Unisci il colore C in un angolo: (3 cat, 2 ma, 2 cat, 3 ma). *1 cat, 3 ma nello spazio laterale, 1 cat, nell’angolo (3 ma, 2 cat, 3 ma)*; ripeti da * altre 2 volte. 1 cat, 3 ma nell’ultimo spazio laterale, 1 cat, chiudi con 1 mbss.', { count: '12 gruppi', color: '#FFD66B', cn: 'Colore C' }),
        st('Giro 4', 'Unisci il colore D e continua allo stesso modo: in ogni angolo (3 ma, 2 cat, 3 ma), in ogni spazio laterale 3 ma, separando i gruppi con 1 cat.', { count: '16 gruppi', color: '#7FD6BE', cn: 'Colore D', tip: 'Ogni giro aggiunge un gruppo per lato: è facile controllare se hai saltato qualcosa.' }),
        st('Rifinitura', 'Taglia il filo e nascondi le code. Fissa la mattonella con spilli su una superficie morbida, spruzza un po’ d’acqua e lasciala asciugare: sarà perfettamente squadrata.')
      ]
    },
    {
      id: 'sciarpa-coste', title: 'Sciarpa a Coste Morbide', subtitle: 'Sembra fatta a maglia!',
      cat: 'abbigliamento', level: 1, time: '6 h', hook: '8 mm', yarn: 'Lana chunky, 200 g', size: '20 × 160 cm',
      bg: '#DDF3EC', art: { k: 'scarf', c: ['#5E9E8E', '#7FD6BE', '#BFEBDD'] },
      stitches: ['cat', 'mma', 'cp'], tags: ['sciarpa', 'inverno', 'righe', 'costine', 'regalo'],
      desc: 'Lavorando la mezza maglia alta solo nella costa posteriore si ottengono costine elastiche identiche a quelle dei ferri. Ideale come primo capo da indossare.',
      materials: ['Lana chunky 200 g', 'Uncinetto 8 mm', 'Ago da lana', 'Cartoncino per le frange (facoltativo)'],
      steps: [
        st('Catenella di base', 'Avvia 30 cat (circa 20 cm). Per una sciarpa più larga aggiungi catenelle a piacere.'),
        st('Riga 1', 'Salta le prime 2 cat, 1 mma in ogni cat seguente. Gira il lavoro.', { count: '28 maglie' }),
        st('Riga 2', '2 cat (non contano come maglia), 1 mma nella costa posteriore (cp) di ogni maglia. Gira.', { count: '28 maglie', tip: 'Lavorare la cp significa infilare l’uncinetto solo nel filo più lontano da te.' }),
        st('Righe 3 – 120', 'Ripeti la riga 2 finché la sciarpa misura circa 160 cm.', { count: '28 maglie per riga', rows: 118 }),
        st('Frange', 'Taglia 40 fili da 25 cm. Piegane 2 a metà, infila il cappio in una maglia del lato corto, passa le code dentro al cappio e tira. Ripeti ogni 2–3 maglie su entrambi i lati.'),
        st('Rifinitura', 'Nascondi le code e pareggia le frange con le forbici.')
      ]
    },
    {
      id: 'pallina-amigurumi', title: 'Pallina Sorridente', subtitle: 'Il tuo primo amigurumi',
      cat: 'amigurumi', level: 1, time: '1 h', hook: '2.5 mm', yarn: 'Cotone 3 mm', size: 'Ø 6 cm',
      bg: '#FFF1C9', art: { k: 'ball', c: ['#FFC94D'] },
      stitches: ['am', 'mb', 'aum', 'dim'], tags: ['amigurumi', 'pallina', 'spirale', 'kawaii', 'principianti'],
      desc: 'La sfera è la base di quasi tutti gli amigurumi. Impari spirale, aumenti e diminuzioni invisibili… e ottieni un amico sorridente.',
      materials: ['Cotone 3 mm giallo', 'Uncinetto 2.5 mm', 'Imbottitura', '2 occhi di sicurezza 8 mm', 'Marcapunto', 'Filo nero o rosa per ricamare'],
      steps: [
        st('Come si lavora', 'Si lavora a spirale: non chiudere i giri. Metti un marcapunto nella prima maglia di ogni giro e spostalo ogni volta.'),
        st('Giro 1', '6 mb in un anello magico (AM).', { count: '6 maglie' }),
        st('Giro 2', 'aum in ogni maglia (6 volte).', { count: '12 maglie' }),
        st('Giro 3', '(1 mb, aum) × 6.', { count: '18 maglie' }),
        st('Giro 4', '(2 mb, aum) × 6.', { count: '24 maglie' }),
        st('Giri 5 – 9', '1 mb in ogni maglia per 5 giri.', { count: '24 maglie', rows: 5 }),
        st('Occhi', 'Inserisci gli occhi di sicurezza tra il giro 7 e il giro 8, a 5 maglie di distanza. Ricama un sorriso e, se vuoi, due guance rosa.'),
        st('Giro 10', '(2 mb, dim) × 6.', { count: '18 maglie' }),
        st('Giro 11', '(1 mb, dim) × 6. Ora imbottisci bene la pallina.', { count: '12 maglie' }),
        st('Giro 12', 'dim × 6.', { count: '6 maglie' }),
        st('Chiusura', 'Taglia il filo lasciando 15 cm. Con l’ago passalo nel filo anteriore delle 6 maglie rimaste, tira per chiudere e nascondi la coda dentro la pallina.')
      ]
    },
    {
      id: 'cuore-applicazione', title: 'Cuoricino Applicazione', subtitle: 'Pronto in 10 minuti',
      cat: 'decorazioni', level: 1, time: '15 min', hook: '3.5 mm', yarn: 'Cotone DK', size: '5 cm',
      bg: '#FFE0EA', art: { k: 'heart', c: ['#FF5C8A'] },
      stitches: ['am', 'cat', 'ma', 'mad', 'mbss'], tags: ['cuore', 'applicazione', 'san valentino', 'veloce'],
      desc: 'Tutto il cuore si lavora dentro un unico anello magico. Perfetto da cucire su borse e maglioni o da appendere come ghirlanda.',
      materials: ['Cotone DK rosa o rosso', 'Uncinetto 3.5 mm', 'Ago da lana'],
      steps: [
        st('Anello', 'Fai un anello magico (AM) e non stringerlo ancora.'),
        st('Prima metà', 'Nell’anello lavora: 3 cat, 3 mad, 3 ma.', { tip: 'Tieni le maglie ben strette l’una all’altra.' }),
        st('Punta', '1 cat, 1 mad (questa è la punta del cuore), 1 cat.'),
        st('Seconda metà', 'Sempre nell’anello: 3 ma, 3 mad, 3 cat, poi 1 mbss nell’anello.'),
        st('Chiusura', 'Ora tira con decisione la coda dell’anello: il centro si chiude e si formano le due curve in alto. Taglia e nascondi i fili.')
      ]
    },
    {
      id: 'fiore-cinque-petali', title: 'Fiorellino a 5 Petali', subtitle: 'Per spille, mollette e ghirlande',
      cat: 'decorazioni', level: 1, time: '15 min', hook: '3.5 mm', yarn: 'Cotone DK, 2 colori', size: '6 cm',
      bg: '#FFF4C2', art: { k: 'flower', c: ['#FF9EC2', '#FFD66B'] },
      stitches: ['am', 'cat', 'mb', 'mma', 'ma', 'mbss'], tags: ['fiore', 'primavera', 'applicazione', 'veloce'],
      desc: 'Due giri e hai un fiore. Cambia colori e dimensioni dell’uncinetto per creare un intero mazzo.',
      materials: ['Cotone giallo e rosa', 'Uncinetto 3.5 mm', 'Ago da lana'],
      steps: [
        st('Giro 1', 'Con il giallo: anello magico (AM), 1 cat, 10 mb nell’anello. Stringi e chiudi con 1 mbss nella prima mb.', { count: '10 maglie', color: '#FFD66B', cn: 'Centro' }),
        st('Giro 2', 'Unisci il rosa. *Nella maglia seguente lavora (1 mma, 2 ma, 1 mma), poi 1 mbss nella maglia successiva*; ripeti da * altre 4 volte.', { count: '5 petali', color: '#FF9EC2', cn: 'Petali' }),
        st('Rifinitura', 'Chiudi con 1 mbss alla base del primo petalo, taglia e nascondi i fili.', { tip: 'Aggiungi un bottoncino al centro per un effetto vintage.' })
      ]
    },
    {
      id: 'presina-quadrata', title: 'Presina della Nonna', subtitle: 'Righe di maglia bassa',
      cat: 'casa', level: 1, time: '2 h', hook: '4 mm', yarn: 'Cotone 100%, 60 g', size: '18 × 18 cm',
      bg: '#FFE9CF', art: { k: 'potholder', c: ['#F28F3B', '#FFD5A5'] },
      stitches: ['cat', 'mb', 'mbss'], tags: ['cucina', 'quadrato', 'righe', 'principianti'],
      desc: 'Il progetto ideale per prendere confidenza con la maglia bassa in righe: un tessuto compatto e resistente al calore.',
      materials: ['Cotone 100% (non acrilico!)', 'Uncinetto 4 mm', 'Ago da lana'],
      steps: [
        st('Catenella di base', 'Avvia 31 cat.'),
        st('Riga 1', '1 mb nella 2ª cat dall’uncinetto e in ogni cat seguente. Gira.', { count: '30 maglie' }),
        st('Righe 2 – 34', '1 cat (non conta), 1 mb in ogni maglia. Gira. Continua finché il lavoro è quadrato.', { count: '30 maglie', rows: 33, tip: 'Conta le maglie alla fine di ogni riga: i bordi resteranno dritti.' }),
        st('Bordo', '1 cat, poi lavora mb tutto intorno al quadrato, mettendo 3 mb in ogni angolo. Chiudi con 1 mbss.'),
        st('Asola', 'Nell’ultimo angolo fai 12 cat e fissale con 1 mbss nella stessa maglia. Lavora 16 mb dentro l’asola, chiudi e nascondi i fili.')
      ]
    },
    {
      id: 'fascia-turbante', title: 'Fascia Turbante', subtitle: 'Calda e alla moda',
      cat: 'accessori', level: 2, time: '2 h', hook: '5.5 mm', yarn: 'Lana aran, 60 g', size: 'Circonferenza 50 cm',
      bg: '#E2EEFF', art: { k: 'headband', c: ['#5B8DEF', '#A9C6FF'] },
      stitches: ['cat', 'mma', 'cp', 'mbss'], tags: ['fascia', 'capelli', 'inverno', 'costine'],
      desc: 'Una striscia a costine che, con una semplice piega intrecciata, diventa una fascia a turbante super chic.',
      materials: ['Lana aran 60 g', 'Uncinetto 5.5 mm', 'Ago da lana'],
      steps: [
        st('Catenella di base', 'Avvia 16 cat (circa 10 cm).'),
        st('Riga 1', 'Salta 2 cat, 1 mma in ogni cat. Gira.', { count: '14 maglie' }),
        st('Righe successive', '2 cat, 1 mma nella costa posteriore (cp) di ogni maglia. Gira. Continua finché la striscia, leggermente tesa, misura 46–48 cm.', { count: '14 maglie', rows: 60 }),
        st('Piega a turbante', 'Stendi la striscia a U. Piega a metà nel senso della lunghezza ciascuna estremità e incastrale una dentro l’altra, come due C che si abbracciano.', { tip: 'Fermale con delle mollette prima di cucire.' }),
        st('Cucitura', 'Cuci insieme tutti e quattro gli strati con l’ago da lana, poi gira la fascia: la cucitura sparirà all’interno.')
      ]
    },
    {
      id: 'borsa-rete', title: 'Borsa a Rete Mercato', subtitle: 'Ecologica e capiente',
      cat: 'accessori', level: 2, time: '5 h', hook: '5 mm', yarn: 'Cotone, 200 g', size: '35 × 40 cm',
      bg: '#E3F5D8', art: { k: 'bag', c: ['#5E9E6E', '#A8D5A2'] },
      stitches: ['am', 'cat', 'mbss', 'ma', 'mb', 'aum'], tags: ['borsa', 'rete', 'estate', 'mare', 'spesa'],
      desc: 'Fondo tondo a maglie alte, corpo a rete elastica e manici robusti. Si allarga per contenere tutta la spesa.',
      materials: ['Cotone 200 g', 'Uncinetto 5 mm', 'Marcapunto', 'Ago da lana'],
      steps: [
        st('Giro 1', 'Anello magico (AM), 3 cat (=1 ma), 11 ma. Chiudi con 1 mbss.', { count: '12 maglie' }),
        st('Giro 2', '3 cat, 1 ma nella stessa maglia, 2 ma in ogni maglia. Chiudi con 1 mbss.', { count: '24 maglie' }),
        st('Giro 3', '3 cat, 1 ma nella stessa maglia, *1 ma, 2 ma nella seguente*; ripeti, termina con 1 ma. Chiudi.', { count: '36 maglie' }),
        st('Giro 4', '3 cat, 1 ma nella stessa maglia, *2 ma, 2 ma nella seguente*; ripeti, termina con 2 ma. Chiudi.', { count: '48 maglie' }),
        st('Giro 5', '3 cat, 1 ma nella stessa maglia, *3 ma, 2 ma nella seguente*; ripeti, termina con 3 ma. Chiudi.', { count: '60 maglie' }),
        st('Giro 6 · inizio rete', '1 cat, 1 mb nella stessa maglia, *5 cat, salta 2 maglie, 1 mb nella seguente*; ripeti. Termina con 5 cat e 1 mbss nella prima mb.', { count: '20 archetti' }),
        st('Giri 7 – 26', '3 mbss per raggiungere il centro del primo archetto, *5 cat, 1 mb nell’archetto seguente*; ripeti tutto intorno.', { count: '20 archetti', rows: 20, tip: 'La rete si allarga molto: misura l’altezza tenendola leggermente tesa.' }),
        st('Giro 27 · bordo', '1 cat, 3 mb in ogni archetto. Chiudi con 1 mbss.', { count: '60 maglie' }),
        st('Giro 28', '1 cat, 1 mb in ogni maglia. Chiudi.', { count: '60 maglie' }),
        st('Giro 29 · manici', '1 cat, 10 mb, 40 cat, salta 10 maglie, 20 mb, 40 cat, salta 10 maglie, 10 mb. Chiudi.'),
        st('Giri 30 – 32', '1 cat, 1 mb in ogni maglia e in ogni catenella dei manici. Chiudi ogni giro con 1 mbss.', { count: '120 maglie', rows: 3 }),
        st('Rifinitura', 'Taglia, nascondi i fili e riempila di frutta fresca!')
      ]
    },
    {
      id: 'berretto-tondo', title: 'Berretto con Pompon', subtitle: 'Lavorato dall’alto in tondo',
      cat: 'abbigliamento', level: 2, time: '4 h', hook: '5.5 mm', yarn: 'Lana aran, 100 g', size: 'Adulto (54–56 cm)',
      bg: '#FFE0DA', art: { k: 'hat', c: ['#E8505B', '#FFD5CF'] },
      stitches: ['am', 'cat', 'ma', 'mbss', 'mb', 'cp'], tags: ['berretto', 'cappello', 'inverno', 'pompon', 'tondo'],
      desc: 'Un cerchio piatto che cresce fino a diventare cappello. Impari a controllare gli aumenti e a calcolare la taglia.',
      materials: ['Lana aran 100 g', 'Uncinetto 5.5 mm', 'Ago da lana', 'Pompon (o cartoncino per farlo)'],
      steps: [
        st('Giro 1', 'Anello magico (AM), 3 cat (=1 ma), 11 ma. Chiudi con 1 mbss.', { count: '12 maglie' }),
        st('Giro 2', '3 cat, 1 ma nella stessa maglia, 2 ma in ogni maglia. Chiudi.', { count: '24 maglie' }),
        st('Giro 3', '3 cat, 1 ma nella stessa maglia, *1 ma, 2 ma nella seguente*; ripeti, termina con 1 ma. Chiudi.', { count: '36 maglie' }),
        st('Giro 4', 'Come sopra con 2 ma tra un aumento e l’altro.', { count: '48 maglie' }),
        st('Giro 5', 'Come sopra con 3 ma tra un aumento e l’altro.', { count: '60 maglie' }),
        st('Giro 6', 'Come sopra con 4 ma tra un aumento e l’altro.', { count: '72 maglie', tip: 'Misura il diametro: per un adulto dovrebbe essere 17–18 cm. Se è più piccolo fai un altro giro di aumenti.' }),
        st('Giri 7 – 16', '3 cat (=1 ma), 1 ma in ogni maglia. Chiudi con 1 mbss. Continua finché il cappello misura 18 cm dalla cima.', { count: '72 maglie', rows: 10 }),
        st('Bordo · 4 giri', '1 cat, 1 mb nella costa posteriore (cp) di ogni maglia. Chiudi con 1 mbss. Ripeti per 4 giri.', { count: '72 maglie', rows: 4 }),
        st('Pompon', 'Taglia, nascondi i fili e cuci un pompon morbido in cima.')
      ]
    },
    {
      id: 'polipetto', title: 'Polipetto Coccoloso', subtitle: 'Tentacoli arricciati',
      cat: 'amigurumi', level: 2, time: '2 h', hook: '2.5 mm', yarn: 'Cotone 3 mm', size: '9 cm',
      bg: '#FFE0EF', art: { k: 'octopus', c: ['#FF7AB6'] },
      stitches: ['am', 'mb', 'aum', 'dim', 'cat', 'mbss'], tags: ['amigurumi', 'polipo', 'mare', 'neonato', 'kawaii'],
      desc: 'Un classico degli amigurumi: testa tonda e otto tentacoli che si arricciano da soli grazie a un trucco con le maglie basse.',
      materials: ['Cotone 3 mm rosa', 'Uncinetto 2.5 mm', 'Occhi di sicurezza 8 mm', 'Imbottitura', 'Marcapunto'],
      steps: [
        st('Giro 1', '6 mb in un anello magico (AM).', { count: '6 maglie' }),
        st('Giro 2', 'aum × 6.', { count: '12 maglie' }),
        st('Giro 3', '(1 mb, aum) × 6.', { count: '18 maglie' }),
        st('Giro 4', '(2 mb, aum) × 6.', { count: '24 maglie' }),
        st('Giro 5', '(3 mb, aum) × 6.', { count: '30 maglie' }),
        st('Giri 6 – 11', '1 mb in ogni maglia per 6 giri.', { count: '30 maglie', rows: 6 }),
        st('Occhi', 'Inserisci gli occhi tra il giro 9 e il giro 10, a 7 maglie di distanza. Ricama le guance.'),
        st('Giro 12', '(3 mb, dim) × 6.', { count: '24 maglie' }),
        st('Giro 13', '(2 mb, dim) × 6. Imbottisci la testa.', { count: '18 maglie' }),
        st('Giro 14 · tentacoli', 'Lavorando nella costa anteriore: *1 mbss, 15 cat, partendo dalla 2ª cat dall’uncinetto lavora 2 mb in ogni cat, 1 mbss nella maglia seguente della testa*; ripeti 8 volte, poi 1 mbss nelle ultime 2 maglie.', { count: '8 tentacoli', tip: 'Le 2 mb in ogni catenella fanno arricciare il tentacolo come un cavatappi!' }),
        st('Fondo', 'Lavora nelle coste posteriori rimaste libere del giro 13: (1 mb, dim) × 6 (12), poi dim × 6 (6). Chiudi stringendo le ultime maglie e nascondi il filo.', { count: '6 maglie' })
      ]
    },
    {
      id: 'fragola-portachiavi', title: 'Fragola Portachiavi', subtitle: 'Dolcissima e utile',
      cat: 'amigurumi', level: 2, time: '1 h', hook: '2.5 mm', yarn: 'Cotone 3 mm rosso e verde', size: '5 cm',
      bg: '#FFE1DE', art: { k: 'strawberry', c: ['#F0454B', '#5BBF6A'] },
      stitches: ['am', 'mb', 'aum', 'dim', 'cat', 'mbss', 'mma', 'ma'], tags: ['fragola', 'frutta', 'portachiavi', 'regalo', 'kawaii'],
      desc: 'Una fragolina paffuta con semini ricamati e foglie a stella. Aggiungi un moschettone e appendila alle chiavi o allo zaino.',
      materials: ['Cotone rosso e verde', 'Uncinetto 2.5 mm', 'Filo giallo o bianco', 'Imbottitura', 'Anello portachiavi'],
      steps: [
        st('Giro 1', 'Con il rosso: 6 mb in un anello magico (AM).', { count: '6 maglie', color: '#F0454B', cn: 'Rosso' }),
        st('Giro 2', '(1 mb, aum) × 3.', { count: '9 maglie' }),
        st('Giro 3', '(2 mb, aum) × 3.', { count: '12 maglie' }),
        st('Giro 4', '(1 mb, aum) × 6.', { count: '18 maglie' }),
        st('Giro 5', '(2 mb, aum) × 6.', { count: '24 maglie' }),
        st('Giri 6 – 8', '1 mb in ogni maglia.', { count: '24 maglie', rows: 3 }),
        st('Semini', 'Ricama tanti piccoli punti gialli sparsi sulla superficie.'),
        st('Giro 9', '(2 mb, dim) × 6. Imbottisci.', { count: '18 maglie' }),
        st('Giro 10', '(1 mb, dim) × 6.', { count: '12 maglie' }),
        st('Giro 11', 'dim × 6. Chiudi e nascondi il filo.', { count: '6 maglie' }),
        st('Foglie', 'Con il verde: anello magico (AM). *5 cat, partendo dalla 2ª cat dall’uncinetto: 1 mbss, 1 mb, 1 mma, 1 ma, poi 1 mbss nell’anello*; ripeti 5 volte. Stringi l’anello.', { count: '5 foglie', color: '#5BBF6A', cn: 'Verde' }),
        st('Montaggio', 'Cuci le foglie sulla parte larga della fragola e fissa l’anello portachiavi al centro.')
      ]
    },
    {
      id: 'cestino-fettuccia', title: 'Cestino in Fettuccia', subtitle: 'Ordine con stile',
      cat: 'casa', level: 2, time: '3 h', hook: '10 mm', yarn: 'Fettuccia, 1 rotolo', size: 'Ø 20 × 14 cm',
      bg: '#F5EBD7', art: { k: 'basket', c: ['#C8A26A', '#E8D3AE'] },
      stitches: ['am', 'mb', 'aum', 'cp', 'cat', 'gambero'], tags: ['cestino', 'fettuccia', 'organizzare', 'casa', 'regalo'],
      desc: 'La fettuccia rende tutto più veloce: in un pomeriggio avrai un cestino robusto con manici per trucchi, gomitoli o piantine.',
      materials: ['Fettuccia (circa 120 m)', 'Uncinetto 10 mm', 'Marcapunto', 'Ago grosso'],
      steps: [
        st('Giro 1', '6 mb in un anello magico (AM). Lavora a spirale.', { count: '6 maglie' }),
        st('Giro 2', 'aum × 6.', { count: '12 maglie' }),
        st('Giro 3', '(1 mb, aum) × 6.', { count: '18 maglie' }),
        st('Giro 4', '(2 mb, aum) × 6.', { count: '24 maglie' }),
        st('Giro 5', '(3 mb, aum) × 6.', { count: '30 maglie' }),
        st('Giro 6', '(4 mb, aum) × 6.', { count: '36 maglie' }),
        st('Giro 7 · spigolo', '1 mb nella costa posteriore (cp) di ogni maglia: si forma il bordo del fondo.', { count: '36 maglie' }),
        st('Giri 8 – 13', '1 mb in ogni maglia.', { count: '36 maglie', rows: 6 }),
        st('Giro 14 · asole', '5 mb, 6 cat, salta 6 maglie, 12 mb, 6 cat, salta 6 maglie, 7 mb.'),
        st('Giro 15', '1 mb in ogni maglia e 6 mb dentro ogni asola di catenelle.', { count: '36 maglie' }),
        st('Bordo', 'Un giro a punto gambero (mb lavorate da sinistra a destra) per un bordo a cordoncino. Chiudi e nascondi i fili.')
      ]
    },
    {
      id: 'copertina-c2c', title: 'Copertina C2C Cuore', subtitle: 'Corner to corner, a pixel',
      cat: 'casa', level: 3, time: '20 h', hook: '5 mm', yarn: 'Lana worsted, 2 colori, 600 g', size: '75 × 75 cm',
      bg: '#FFE3EC', art: { k: 'c2c', c: ['#FF5C8A', '#FFF0F4'] },
      stitches: ['cat', 'ma', 'mbss', 'colore'], tags: ['coperta', 'c2c', 'pixel', 'neonato', 'grafico'],
      desc: 'La tecnica corner to corner costruisce la coperta in diagonale, un tassellino alla volta. Ogni tassello è un pixel: puoi disegnare qualsiasi immagine!',
      materials: ['Lana worsted 450 g colore base + 150 g colore cuore', 'Uncinetto 5 mm', 'Ago da lana', 'Grafico del cuore (25 × 25 quadretti)'],
      steps: [
        st('Il tassello', 'Ogni tassello è formato da 3 cat + 3 ma. La coperta cresce in diagonale aggiungendo un tassello per riga.'),
        st('Riga 1', '6 cat. 1 ma nella 4ª cat dall’uncinetto, 1 ma nelle 2 cat seguenti.', { count: '1 tassello' }),
        st('Riga 2 · aumento', '6 cat. 1 ma nella 4ª cat dall’uncinetto e nelle 2 seguenti. Gira il tassello precedente: 1 mbss nello spazio delle 3 cat, 3 cat, 3 ma nello stesso spazio.', { count: '2 tasselli' }),
        st('Righe di aumento', 'Ripeti la riga 2: ogni riga inizia con 6 cat e un nuovo tassello, poi (1 mbss, 3 cat, 3 ma) nello spazio di ogni tassello della riga precedente. Continua fino a 25 tasselli.', { count: '+1 tassello per riga', rows: 23, tip: 'Segui il grafico: cambia colore all’ultima gettata del tassello precedente.' }),
        st('Righe di diminuzione', 'Gira, 1 mbss in ognuna delle 3 ma e nello spazio del tassello, poi (3 cat, 3 ma, 1 mbss nello spazio seguente) fino alla fine, senza aggiungere il tassello finale.', { count: '−1 tassello per riga', rows: 24 }),
        st('Bordo', 'Lavora 2 giri di mb tutto intorno con 3 mb negli angoli, poi un giro a punto gambero.'),
        st('Rifinitura', 'Nascondi tutte le code (sono tante: armati di pazienza e di una buona serie TV!) e blocca la coperta con il vapore.')
      ]
    },
    {
      id: 'mandala-sole', title: 'Mandala del Sole', subtitle: 'Bordo a conchiglie',
      cat: 'decorazioni', level: 2, time: '1 h', hook: '4 mm', yarn: 'Cotone DK, 5 colori', size: 'Ø 18 cm',
      bg: '#FFF0C2', art: { k: 'mandala', c: ['#FFB000', '#FF7A3D', '#FFD66B', '#E8505B', '#FFE7A3'] },
      stitches: ['am', 'cat', 'ma', 'mbss', 'colore'], tags: ['mandala', 'tondo', 'decorazione', 'colori', 'conchiglie'],
      desc: 'Un mandala solare da appendere alla parete o usare come tovaglietta. Il bordo a conchiglia trasforma un semplice cerchio in un fiore.',
      materials: ['Cotone DK in 5 colori caldi', 'Uncinetto 4 mm', 'Ago da lana', 'Cerchio di legno (facoltativo)'],
      steps: [
        st('Giro 1', 'Anello magico (AM), 3 cat (=1 ma), 11 ma. Chiudi con 1 mbss.', { count: '12 maglie', color: '#FFB000', cn: 'Colore A' }),
        st('Giro 2', 'Nuovo colore. 3 cat e 1 ma nella stessa maglia, 2 ma in ogni maglia. Chiudi.', { count: '24 maglie', color: '#FF7A3D', cn: 'Colore B' }),
        st('Giro 3', 'Nuovo colore. 3 cat e 1 ma nella stessa maglia, *1 ma, 2 ma nella seguente*; ripeti, termina con 1 ma. Chiudi.', { count: '36 maglie', color: '#FFD66B', cn: 'Colore C' }),
        st('Giro 4', 'Nuovo colore. Come sopra con 2 ma tra gli aumenti.', { count: '48 maglie', color: '#E8505B', cn: 'Colore D' }),
        st('Giro 5', 'Nuovo colore. Come sopra con 3 ma tra gli aumenti.', { count: '60 maglie', color: '#FFB000', cn: 'Colore A' }),
        st('Giro 6 · conchiglie', 'Ultimo colore. *Salta 1 maglia, 5 ma nella maglia seguente, salta 1 maglia, 1 mbss nella seguente*; ripeti tutto intorno.', { count: '15 conchiglie', color: '#FF7A3D', cn: 'Colore B' }),
        st('Rifinitura', 'Nascondi i fili e blocca il mandala a vapore, fissandolo con gli spilli a forma di cerchio perfetto.')
      ]
    },
    {
      id: 'scaldatazza', title: 'Scaldatazza Cozy', subtitle: 'Abbraccia la tua tazza',
      cat: 'casa', level: 1, time: '1 h', hook: '5 mm', yarn: 'Lana aran, 30 g', size: '8 × 24 cm',
      bg: '#EADCF7', art: { k: 'mug', c: ['#9B7FD1', '#FFFFFF'] },
      stitches: ['cat', 'mma', 'mb', 'cp'], tags: ['tazza', 'autunno', 'casa', 'regalo', 'veloce'],
      desc: 'Una fascia a costine con bottone per tenere calde le mani e il tè. Si fa in una sera.',
      materials: ['Lana aran 30 g', 'Uncinetto 5 mm', 'Un bottone da 2 cm', 'Ago da lana'],
      steps: [
        st('Catenella di base', 'Avvia 14 cat.'),
        st('Riga 1', 'Salta 2 cat, 1 mma in ogni cat. Gira.', { count: '12 maglie' }),
        st('Righe 2 – 20', '2 cat, 1 mma nella costa posteriore (cp) di ogni maglia. Gira. Prova la fascia attorno alla tazza: deve avvolgerla lasciando libero il manico.', { count: '12 maglie', rows: 19 }),
        st('Asola', '1 cat, 5 mb, 3 cat, salta 2 maglie, 5 mb.'),
        st('Rifinitura', 'Cuci il bottone sul lato opposto, all’altezza dell’asola. Nascondi i fili.')
      ]
    }
  ];

  /* ---------------------------------------------------------------- */
  /*  PUNTI E TECNICHE                                                 */
  /* ---------------------------------------------------------------- */
  const stitches = [
    { id: 'nodo', name: 'Nodo scorsoio', abbr: '—', us: 'slip knot', uk: 'slip knot', group: 'Le basi', level: 1, color: '#FFD3B8',
      intro: 'Il punto di partenza di quasi ogni lavoro: un’asola regolabile che fissa il filo all’uncinetto.',
      steps: ['Forma un cappio con il filo, con la coda dietro al filo di lavoro.', 'Infila l’uncinetto (o le dita) nel cappio e tira su un’asola di filo di lavoro.', 'Stringi tirando la coda: l’asola deve scorrere sull’uncinetto senza essere troppo stretta.'],
      tip: 'Tieni il filo di lavoro sull’indice sinistro e la coda bloccata tra pollice e medio.' },
    { id: 'cat', name: 'Catenella', abbr: 'cat', us: 'ch', uk: 'ch', group: 'Le basi', level: 1, color: '#FFE3D6',
      intro: 'La base di tutto: serve per avviare il lavoro, creare spazi e alzarsi a inizio riga.',
      steps: ['Parti con il nodo scorsoio sull’uncinetto.', 'Avvolgi il filo sull’uncinetto da dietro in avanti: questa è la gettata.', 'Tira la gettata attraverso l’asola sull’uncinetto. Hai fatto 1 catenella!', 'Ripeti mantenendo una tensione regolare: tutte le maglie devono avere la stessa misura.'],
      tip: 'Conta le catenelle guardando le «V» sul davanti. L’asola rimasta sull’uncinetto non si conta mai.' },
    { id: 'mbss', name: 'Maglia bassissima', abbr: 'mbss', us: 'sl st', uk: 'ss', group: 'Le basi', level: 1, color: '#DDF3EC',
      intro: 'La maglia più bassa: si usa per chiudere i giri, unire pezzi e spostarsi senza aggiungere altezza.',
      steps: ['Inserisci l’uncinetto nella maglia indicata.', 'Fai una gettata.', 'Tira il filo attraverso la maglia E l’asola sull’uncinetto, in un unico movimento.'],
      tip: 'Lavorala morbida: le maglie bassissime tendono a stringere il lavoro.' },
    { id: 'mb', name: 'Maglia bassa', abbr: 'mb', us: 'sc', uk: 'dc', group: 'Punti base', level: 1, color: '#FFF1C9',
      intro: 'Compatta e solida: è la regina degli amigurumi, delle presine e dei bordi.',
      steps: ['Inserisci l’uncinetto nella maglia, sotto entrambi i fili della V.', 'Gettata e tira su un’asola: ora hai 2 asole sull’uncinetto.', 'Gettata e passa attraverso entrambe le asole. Fatto!'],
      tip: 'Attenzione: la «single crochet» americana si chiama «double crochet» negli schemi inglesi!' },
    { id: 'mma', name: 'Mezza maglia alta', abbr: 'mma', us: 'hdc', uk: 'htr', group: 'Punti base', level: 1, color: '#E8E1FF',
      intro: 'Una via di mezzo tra bassa e alta: veloce, morbida e perfetta per sciarpe e coperte.',
      steps: ['Fai una gettata prima di inserire l’uncinetto.', 'Inserisci l’uncinetto nella maglia, gettata e tira su: hai 3 asole.', 'Gettata e passa attraverso tutte e 3 le asole insieme.'],
      tip: 'A inizio riga alzati con 2 cat.' },
    { id: 'ma', name: 'Maglia alta', abbr: 'ma', us: 'dc', uk: 'tr', group: 'Punti base', level: 1, color: '#E2EEFF',
      intro: 'Alta e ariosa: cresce in fretta ed è la protagonista dei granny square e dei mandala.',
      steps: ['Gettata e inserisci l’uncinetto nella maglia.', 'Gettata e tira su un’asola: hai 3 asole.', 'Gettata e passa attraverso 2 asole: ne restano 2.', 'Gettata e passa attraverso le ultime 2 asole.'],
      tip: 'A inizio riga alzati con 3 cat, che di solito contano come la prima maglia alta.' },
    { id: 'mad', name: 'Maglia alta doppia', abbr: 'mad', us: 'tr', uk: 'dtr', group: 'Punti base', level: 2, color: '#FFE0EA',
      intro: 'Ancora più alta: crea punte, petali e trafori eleganti.',
      steps: ['Fai 2 gettate e inserisci l’uncinetto nella maglia.', 'Gettata e tira su: hai 4 asole.', 'Gettata e passa attraverso 2 asole (ne restano 3).', 'Gettata e passa attraverso 2 asole (ne restano 2).', 'Gettata e passa attraverso le ultime 2.'],
      tip: 'A inizio riga alzati con 4 cat.' },
    { id: 'am', name: 'Anello magico', abbr: 'AM', us: 'magic ring', uk: 'magic loop', group: 'Tecniche', level: 1, color: '#FFE9CF',
      intro: 'Il segreto per iniziare i lavori in tondo senza il buchino al centro.',
      steps: ['Avvolgi il filo due volte attorno a due dita, con la coda verso di te.', 'Inserisci l’uncinetto sotto i due giri, prendi il filo di lavoro e tira su un’asola.', 'Gettata e chiudi con 1 cat: serve solo a fissare (non si conta).', 'Lavora le maglie richieste dentro l’anello, coprendo anche la coda.', 'Tira la coda: l’anello si stringe e il centro si chiude.'],
      tip: 'Dopo qualche giro, fai un nodino con la coda: l’anello non si riaprirà più.' },
    { id: 'aum', name: 'Aumento', abbr: 'aum', us: 'inc', uk: 'inc', group: 'Tecniche', level: 1, color: '#E3F5D8',
      intro: 'Aggiunge una maglia: è così che i cerchi crescono e diventano piatti.',
      steps: ['Lavora una maglia come al solito.', 'Inserisci di nuovo l’uncinetto nella stessa maglia della base.', 'Lavora una seconda maglia: da 1 maglia ne hai ottenute 2.'],
      tip: 'Nei cerchi piatti ogni giro aggiunge lo stesso numero di aumenti: 6 per la maglia bassa, 12 per la maglia alta.' },
    { id: 'dim', name: 'Diminuzione invisibile', abbr: 'dim', us: 'dec / sc2tog', uk: 'dc2tog', group: 'Tecniche', level: 1, color: '#FFE0DA',
      intro: 'Unisce 2 maglie in 1 senza lasciare buchi: indispensabile per chiudere gli amigurumi.',
      steps: ['Inserisci l’uncinetto nel solo filo anteriore della maglia seguente.', 'Senza fare gettate, inserisci l’uncinetto anche nel filo anteriore della maglia successiva: hai 3 asole.', 'Gettata e passa attraverso le prime 2 asole.', 'Gettata e passa attraverso le 2 asole rimaste.'],
      tip: 'Lavorando solo i fili anteriori la diminuzione diventa praticamente invisibile.' },
    { id: 'cp', name: 'Costa posteriore', abbr: 'cp', us: 'BLO', uk: 'BLO', group: 'Tecniche', level: 1, color: '#DDF3EC',
      intro: 'Lavorare solo il filo posteriore crea costine elastiche e spigoli netti.',
      steps: ['Osserva la parte alta del lavoro: ogni maglia ha 2 fili a forma di V.', 'Inserisci l’uncinetto solo sotto il filo posteriore, quello più lontano da te.', 'Completa la maglia come al solito: il filo anteriore resta libero e forma una righina.'],
      tip: 'La costa anteriore (ca) funziona allo stesso modo, usando il filo più vicino a te.' },
    { id: 'colore', name: 'Cambio colore', abbr: '—', us: 'color change', uk: 'colour change', group: 'Tecniche', level: 1, color: '#FFF4C2',
      intro: 'Il modo pulito per passare da un colore all’altro senza sbavature.',
      steps: ['Lavora l’ultima maglia del vecchio colore fino all’ultima gettata.', 'Fai l’ultima gettata con il nuovo colore e chiudi la maglia.', 'Continua con il nuovo colore. Annoda le due code sul rovescio e nascondile alla fine.'],
      tip: 'Nei giri chiusi, unisci il nuovo colore con 1 mbss in un punto diverso ogni volta: le giunture saranno invisibili.' },
    { id: 'chiudere', name: 'Chiudere e nascondere i fili', abbr: '—', us: 'fasten off', uk: 'fasten off', group: 'Tecniche', level: 1, color: '#F5EBD7',
      intro: 'Una buona rifinitura fa la differenza tra «fatto a mano» e «fatto in casa».',
      steps: ['Taglia il filo lasciando una coda di circa 15 cm.', 'Gettata e tira tutta la coda attraverso l’asola: il lavoro è fermato.', 'Infila la coda nell’ago da lana e passala tra le maglie sul rovescio.', 'Cambia direzione 2–3 volte, poi taglia l’eccesso.'],
      tip: 'Nascondi le code mentre lavori, coprendole con le maglie: alla fine non avrai 40 fili da sistemare!' },
    { id: 'gambero', name: 'Punto gambero', abbr: '—', us: 'reverse sc', uk: 'crab stitch', group: 'Punti speciali', level: 2, color: '#FFE0DA',
      intro: 'Un bordo a cordoncino che si lavora «all’indietro», da sinistra a destra.',
      steps: ['Non girare il lavoro: alla fine del giro precedente fai 1 cat.', 'Inserisci l’uncinetto nella maglia a DESTRA.', 'Gettata e tira su: hai 2 asole.', 'Gettata e passa attraverso entrambe. Continua spostandoti verso destra.'],
      tip: 'All’inizio sembra innaturale: dopo 10 maglie le mani si abituano.' },
    { id: 'popcorn', name: 'Punto popcorn', abbr: 'pop', us: 'popcorn', uk: 'popcorn', group: 'Punti speciali', level: 3, color: '#FFF1C9',
      intro: 'Una pallina in rilievo che dà texture a coperte e cuscini.',
      steps: ['Lavora 5 maglie alte nella stessa maglia.', 'Sfila l’uncinetto dall’asola, lasciandola in sospeso.', 'Inserisci l’uncinetto nella prima delle 5 maglie alte, dal davanti.', 'Riprendi l’asola in sospeso e tirala attraverso la prima maglia: il popcorn si chiude.', 'Fai 1 cat per fissarlo.'],
      tip: 'Più stringi l’ultima catenella, più il popcorn sporgerà.' }
  ];

  const learnGroups = ['Le basi', 'Punti base', 'Tecniche', 'Punti speciali'];

  const abbr = {
    cat: { n: 'catenella', id: 'cat', us: 'ch', uk: 'ch' },
    mbss: { n: 'maglia bassissima', id: 'mbss', us: 'sl st', uk: 'ss' },
    mb: { n: 'maglia bassa', id: 'mb', us: 'sc', uk: 'dc' },
    mma: { n: 'mezza maglia alta', id: 'mma', us: 'hdc', uk: 'htr' },
    ma: { n: 'maglia alta', id: 'ma', us: 'dc', uk: 'tr' },
    mad: { n: 'maglia alta doppia', id: 'mad', us: 'tr', uk: 'dtr' },
    aum: { n: 'aumento (2 maglie nella stessa)', id: 'aum', us: 'inc', uk: 'inc' },
    dim: { n: 'diminuzione (2 maglie insieme)', id: 'dim', us: 'dec', uk: 'dec' },
    AM: { n: 'anello magico', id: 'am', us: 'MR', uk: 'MR' },
    cp: { n: 'costa posteriore', id: 'cp', us: 'BLO', uk: 'BLO' },
    ca: { n: 'costa anteriore', id: 'cp', us: 'FLO', uk: 'FLO' },
    pop: { n: 'punto popcorn', id: 'popcorn', us: 'pc', uk: 'pc' }
  };

  const tips = [
    'Lavora sempre con la luce giusta: i filati scuri sono belli, però stancano gli occhi. Per imparare scegli colori chiari.',
    'Usa un marcapunto (anche una graffetta!) all’inizio di ogni giro a spirale.',
    'Se il lavoro si arriccia hai troppe poche maglie o tensione troppo stretta; se fa le onde, ne hai troppe.',
    'Fai sempre un campione di 10 × 10 cm prima di un capo da indossare: ti salverà da maglioni giganti.',
    'L’etichetta del gomitolo indica l’uncinetto consigliato: è un ottimo punto di partenza.',
    'Il cotone non si sfibra ed è perfetto per imparare: le maglie si vedono benissimo.',
    'Rilassa le spalle! La tensione nel corpo diventa tensione nel filo.',
    'Conta ad alta voce le maglie difficili: sembra sciocco, però funziona.',
    'Gli schemi americani e inglesi usano gli stessi nomi per punti diversi: controlla sempre la provenienza.',
    'Per gli amigurumi usa un uncinetto più piccolo del consigliato: l’imbottitura non uscirà dalle maglie.',
    'Fotografa il lavoro a ogni sessione: vedere i progressi è la miglior motivazione.',
    'Lava i capi finiti a mano, in acqua fredda, e asciugali in piano.',
    'Disfare non è un fallimento: è il modo in cui ogni esperta ha imparato.',
    'Conserva i gomitoli in un sacchetto di tela con un rametto di lavanda contro le tarme.',
    'Un uncinetto ergonomico riduce la fatica alla mano nelle sessioni lunghe.'
  ];

  const hooks = [
    [2, 'B-1', '14', 'Pizzo / cotone fine'], [2.25, 'B-1', '13', 'Fingering'], [2.5, '—', '12', 'Amigurumi'], [2.75, 'C-2', '11', 'Fingering'],
    [3, '—', '11', 'Sport'], [3.25, 'D-3', '10', 'Sport'], [3.5, 'E-4', '9', 'Sport / DK'], [3.75, 'F-5', '—', 'DK'], [4, 'G-6', '8', 'DK'],
    [4.5, '7', '7', 'Worsted'], [5, 'H-8', '6', 'Worsted / Aran'], [5.5, 'I-9', '5', 'Aran'], [6, 'J-10', '4', 'Chunky'], [6.5, 'K-10½', '3', 'Chunky'],
    [7, '—', '2', 'Chunky'], [8, 'L-11', '0', 'Super chunky'], [9, 'M/N-13', '00', 'Super chunky'], [10, 'N/P-15', '000', 'Jumbo / fettuccia'],
    [12, '—', '—', 'Jumbo'], [15, 'P/Q', '—', 'Jumbo'], [19, 'S', '—', 'Lavori XXL']
  ];

  const weights = [
    { n: 0, name: 'Lace', it: 'Pizzo', hook: '1.5 – 2.25 mm', st: '32–42 mb', use: 'Centrini, pizzi' },
    { n: 1, name: 'Super Fine', it: 'Fingering / Calze', hook: '2.25 – 3.5 mm', st: '21–32 mb', use: 'Calze, scialli leggeri' },
    { n: 2, name: 'Fine', it: 'Sport', hook: '3.5 – 4.5 mm', st: '16–20 mb', use: 'Neonato, top estivi' },
    { n: 3, name: 'Light', it: 'DK', hook: '4.5 – 5.5 mm', st: '12–17 mb', use: 'Maglioni leggeri, amigurumi' },
    { n: 4, name: 'Medium', it: 'Worsted / Aran', hook: '5.5 – 6.5 mm', st: '11–14 mb', use: 'Coperte, cappelli, sciarpe' },
    { n: 5, name: 'Bulky', it: 'Chunky', hook: '6.5 – 9 mm', st: '8–11 mb', use: 'Sciarpe veloci, plaid' },
    { n: 6, name: 'Super Bulky', it: 'Super chunky', hook: '9 – 15 mm', st: '7–9 mb', use: 'Coperte XXL, cuscini' },
    { n: 7, name: 'Jumbo', it: 'Jumbo / fettuccia', hook: '15 mm +', st: '≤ 6 mb', use: 'Cestini, tappeti' }
  ];

  /* ---------------------------------------------------------------- */
  /*  GENERATORI: un nuovo progetto ogni giorno                        */
  /* ---------------------------------------------------------------- */
  const PAL = [
    { n: 'Pesca e Menta', c: ['#FF9F80', '#7FD6BE', '#FFD3B8', '#3FAF94'], bg: '#FFF0E8' },
    { n: 'Tramonto', c: ['#FF6B6B', '#FFA36C', '#FFD66B', '#C44569'], bg: '#FFF1E0' },
    { n: 'Lavanda', c: ['#8E7CF0', '#FF9EC2', '#D9CCFF', '#5A4BB8'], bg: '#F2EDFF' },
    { n: 'Oceano', c: ['#3D8BFF', '#7FD6BE', '#8EC5FF', '#1F5FAF'], bg: '#E6F2FF' },
    { n: 'Bosco', c: ['#5E9E6E', '#E3C78A', '#A8D5A2', '#8A5A3B'], bg: '#EEF6E8' },
    { n: 'Caramella', c: ['#FF7AB6', '#8EC5FF', '#FFE27A', '#B37CF0'], bg: '#FFEFF6' },
    { n: 'Autunno', c: ['#C8553D', '#F28F3B', '#588B8B', '#FFD5A5'], bg: '#FFF2E6' },
    { n: 'Nordico', c: ['#2E4057', '#D1495B', '#8FA6BF', '#EDAE49'], bg: '#EEF1F6' },
    { n: 'Limonata', c: ['#FFC93C', '#3BCEAC', '#EE4266', '#FFF3B0'], bg: '#FFFBE6' },
    { n: 'Lampone', c: ['#D81E5B', '#F0A6CA', '#FDBA74', '#7C3AED'], bg: '#FFEAF1' }
  ];
  const LET = 'ABCD';
  const pick = (r, a) => a[Math.floor(r() * a.length)];

  function genMandala(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const R = 4 + Math.floor(r() * 3); const shell = r() > 0.35;
    const col = (i) => ({ color: pal.c[i % 4], cn: 'Colore ' + LET[i % 4] });
    const steps = [st('Preparazione', `Prepara i colori della palette «${pal.n}», cotone DK e uncinetto 4 mm. A ogni cambio colore lascia una coda di 10 cm.`)];
    steps.push(st('Giro 1', 'Anello magico (AM). 3 cat (contano come 1 ma), poi 11 ma nell’anello. Stringi e chiudi con 1 mbss nella 3ª cat.', Object.assign({ count: '12 maglie' }, col(0))));
    for (let k = 2; k <= R; k++) {
      const d = k === 2
        ? 'Unisci il nuovo colore in una maglia. 3 cat e 1 ma nella stessa maglia, poi 2 ma in ogni maglia. Chiudi con 1 mbss nella 3ª cat.'
        : `Unisci il nuovo colore. 3 cat e 1 ma nella stessa maglia, poi *1 ma nelle ${k - 2} maglie seguenti, 2 ma nella successiva*; ripeti da * altre 10 volte e termina con 1 ma nelle ultime ${k - 2} maglie. Chiudi con 1 mbss.`.replace('nelle 1 maglie seguenti', 'nella maglia seguente').replace('nelle ultime 1 maglie', 'nell’ultima maglia');
      steps.push(st('Giro ' + k, d, Object.assign({ count: 12 * k + ' maglie' }, col(k - 1))));
    }
    if (shell) steps.push(st(`Giro ${R + 1} · conchiglie`, 'Unisci il nuovo colore. *Salta 1 maglia, 5 ma nella maglia seguente, salta 1 maglia, 1 mbss nella seguente*; ripeti tutto intorno.', Object.assign({ count: 3 * R + ' conchiglie', tip: 'Le conchiglie devono appoggiarsi piatte: se si arricciano, allenta la tensione.' }, col(R))));
    steps.push(st('Rifinitura', 'Nascondi tutte le code sul rovescio e blocca il mandala a vapore fissandolo con gli spilli.'));
    const dia = Math.round(R * 2.2 + (shell ? 2 : 0));
    return {
      id: `gen-mandala-${seed}`, gen: true, title: `Mandala ${pal.n}`, subtitle: shell ? 'Con bordo a conchiglie' : 'Cerchio a righe colorate',
      cat: 'decorazioni', level: shell ? 2 : 1, time: `${30 + R * 8} min`, hook: '4 mm', yarn: 'Cotone DK, 4 colori', size: `Ø ${dia} cm`,
      bg: pal.bg, art: { k: shell ? 'mandala' : 'coaster', c: pal.c.concat(pal.c) }, stitches: ['am', 'cat', 'ma', 'mbss', 'colore'],
      tags: ['mandala', 'tondo', 'generato', pal.n.toLowerCase()],
      desc: `Un mandala di ${R + (shell ? 1 : 0)} giri nella palette «${pal.n}». Perfetto come sottopentola, decorazione da parete o centrino.`,
      materials: [`Cotone DK in 4 colori «${pal.n}»`, 'Uncinetto 4 mm', 'Ago da lana'], steps
    };
  }

  function genGranny(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const R = 4 + Math.floor(r() * 4);
    const col = (i) => ({ color: pal.c[i % 4], cn: 'Colore ' + LET[i % 4] });
    const steps = [
      st('Base', 'Avvia 4 cat e chiudile ad anello con 1 mbss nella prima cat.', col(0)),
      st('Giro 1', '3 cat (=1 ma), 2 ma nell’anello, 2 cat. *3 ma nell’anello, 2 cat*; ripeti da * altre 2 volte. Chiudi con 1 mbss nella 3ª cat.', Object.assign({ count: '4 gruppi' }, col(0))),
      st('Giro 2', 'Unisci il nuovo colore in uno spazio d’angolo: 3 cat, 2 ma, 2 cat, 3 ma. *1 cat, nell’angolo seguente (3 ma, 2 cat, 3 ma)*; ripeti da * altre 2 volte. 1 cat e chiudi con 1 mbss.', Object.assign({ count: '8 gruppi' }, col(1)))
    ];
    for (let k = 3; k <= R; k++) {
      const n = k - 2; const side = n === 1 ? '1 cat, 3 ma nello spazio seguente' : `[1 cat, 3 ma nello spazio seguente] per ${n} volte`;
      steps.push(st('Giro ' + k, `Unisci il nuovo colore in un angolo: (3 cat, 2 ma, 2 cat, 3 ma). *${side}, 1 cat, nell’angolo (3 ma, 2 cat, 3 ma)*; ripeti da * altre 2 volte. Poi ${side}, 1 cat e chiudi con 1 mbss.`, Object.assign({ count: 4 * k + ' gruppi' }, col(k - 1))));
    }
    steps.push(st('Rifinitura', `Nascondi le code e blocca la mattonella. Idea: fanne 4 e uniscile con 1 mbss nella costa posteriore per un cuscino «${pal.n}».`));
    return {
      id: `gen-granny-${seed}`, gen: true, title: `Granny ${pal.n}`, subtitle: `${R} giri di colore`,
      cat: 'decorazioni', level: R > 5 ? 2 : 1, time: `${20 + R * 8} min`, hook: '4.5 mm', yarn: 'Lana worsted, 4 colori', size: `${Math.round(R * 2.6)} × ${Math.round(R * 2.6)} cm`,
      bg: pal.bg, art: { k: 'granny', c: [pal.c[0], pal.c[1], pal.c[2], pal.c[3], pal.c[0], pal.c[1], pal.c[2]].slice(0, R).reverse() }, stitches: ['cat', 'mbss', 'ma', 'colore'],
      tags: ['granny', 'quadrato', 'generato', pal.n.toLowerCase()],
      desc: `Una granny square di ${R} giri nei colori «${pal.n}». Ogni giro cambia colore: un ottimo esercizio per gli angoli.`,
      materials: [`Lana worsted in 4 colori «${pal.n}»`, 'Uncinetto 4.5 mm', 'Ago da lana'], steps
    };
  }

  function genAmi(seed) {
    const r = rng(seed); const pal = pick(r, PAL);
    const kinds = [
      { n: 'Mochi', extra: 'Ricama due guance rosa con qualche punto di cotone e una boccuccia a «w».', ears: null },
      { n: 'Micio', extra: 'Orecchie (× 2): 4 mb in un anello magico (AM), (1 mb, aum) × 2 (6), 1 giro di 6 mb. Appiattisci e cuci in cima alla testa.', ears: 'cat' },
      { n: 'Coniglietto', extra: 'Orecchie (× 2): 6 mb in un anello magico (AM), (1 mb, aum) × 3 (9), 4 giri di 9 mb. Piega a metà e cuci in cima.', ears: 'bunny' },
      { n: 'Orsetto', extra: 'Orecchie (× 2): 6 mb in un anello magico (AM), 1 giro di 6 mb. Cuci ai lati della testa.', ears: 'bear' },
      { n: 'Pulcino', extra: 'Ricama un beccuccio arancione tra gli occhi e annoda 3 fili in cima per il ciuffo.', ears: 'tuft' }
    ];
    const kind = pick(r, kinds); const n = 3 + Math.floor(r() * 4); const m = 6 * n; const color = kind.n === 'Pulcino' ? '#FFD23F' : pick(r, pal.c);
    const steps = [st('Come si lavora', 'Si lavora a spirale senza chiudere i giri. Metti un marcapunto nella prima maglia di ogni giro.'),
      st('Giro 1', '6 mb in un anello magico (AM).', { count: '6 maglie', color, cn: 'Corpo' }),
      st('Giro 2', 'aum × 6.', { count: '12 maglie' })];
    let g = 3;
    for (let k = 3; k <= n; k++, g++) steps.push(st('Giro ' + g, `(${k - 2} mb, aum) × 6.`, { count: 6 * k + ' maglie' }));
    const plain = Math.max(2, n - 1); const a = g, b = g + plain - 1; g = b + 1;
    steps.push(st(`Giri ${a} – ${b}`, '1 mb in ogni maglia.', { count: m + ' maglie', rows: plain }));
    const eyeRow = a + Math.floor(plain / 2);
    steps.push(st('Viso', `Inserisci gli occhi di sicurezza tra il giro ${eyeRow - 1} e il giro ${eyeRow}, a ${Math.max(3, n + 1)} maglie di distanza.`));
    for (let k = n; k >= 3; k--, g++) {
      const cnt = 6 * (k - 1);
      steps.push(st('Giro ' + g, `(${k - 2} mb, dim) × 6.${cnt === 12 ? ' Ora imbottisci bene.' : ''}`, { count: cnt + ' maglie' }));
    }
    steps.push(st('Giro ' + g, 'dim × 6.', { count: '6 maglie' }));
    steps.push(st('Chiusura', 'Taglia lasciando 15 cm, passa il filo nel filo anteriore delle 6 maglie e tira per chiudere. Nascondi la coda all’interno.'));
    steps.push(st('Dettagli', kind.extra));
    return {
      id: `gen-ami-${seed}`, gen: true, title: `${kind.n} ${pal.n}`, subtitle: 'Amigurumi tascabile',
      cat: 'amigurumi', level: 1, time: `${40 + n * 10} min`, hook: '2.5 mm', yarn: 'Cotone 3 mm', size: `Ø ${Math.round(n * 1.15)} cm`,
      bg: pal.bg, art: { k: 'ball', c: [color], ears: kind.ears }, stitches: ['am', 'mb', 'aum', 'dim'],
      tags: ['amigurumi', 'kawaii', 'generato', kind.n.toLowerCase()],
      desc: `Un piccolo ${kind.n.toLowerCase()} rotondo da ${m} maglie al giro più ampio. Si lavora in un’ora e sta in tasca!`,
      materials: ['Cotone 3 mm', 'Uncinetto 2.5 mm', 'Occhi di sicurezza 6–8 mm', 'Imbottitura', 'Marcapunto'], steps
    };
  }

  function genSciarpa(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const w = pick(r, [24, 28, 32]);
    const nS = 3 + Math.floor(r() * 2); const unit = []; for (let i = 0; i < nS; i++) unit.push({ c: i % 3, rows: 2 + Math.floor(r() * 5) });
    const unitRows = unit.reduce((s, u) => s + u.rows, 0); const reps = Math.max(3, Math.round(170 / unitRows)); const tot = unitRows * reps + 1;
    const fringe = r() > 0.4;
    const col = (i) => ({ color: pal.c[i], cn: 'Colore ' + LET[i] });
    const steps = [
      st('Catenella di base', `Con il colore A avvia ${w + 2} cat.`, col(0)),
      st('Riga 1', '1 mma nella 3ª cat dall’uncinetto e in ogni cat seguente. Gira.', Object.assign({ count: w + ' maglie' }, col(0))),
      st('Come si lavora ogni riga', '2 cat (non contano come maglia), 1 mma in ogni maglia, gira. Per cambiare colore usa il nuovo filo nell’ultima gettata della riga precedente.')
    ];
    unit.forEach((u, i) => steps.push(st(`Unità · fascia ${i + 1}`, `${u.rows} righe di mma con il colore ${LET[u.c]}.`, Object.assign({ count: w + ' maglie', rows: u.rows }, col(u.c)))));
    steps.push(st('Ripeti', `Ripeti l’unità di ${unitRows} righe per ${reps} volte in totale (circa ${tot} righe).`, { rows: reps, tip: 'Porta il filo non usato lungo il bordo invece di tagliarlo, se la fascia è di 2–4 righe.' }));
    if (fringe) steps.push(st('Frange', 'Taglia fili da 25 cm in tutti i colori e annodali a coppie lungo i lati corti, alternando i colori.'));
    steps.push(st('Rifinitura', 'Nascondi le code e stira leggermente a vapore senza schiacciare.'));
    return {
      id: `gen-sciarpa-${seed}`, gen: true, title: `Sciarpa ${pal.n}`, subtitle: `A righe, ${nS} fasce`,
      cat: 'abbigliamento', level: 1, time: `${Math.round(tot / 20)} h`, hook: '5.5 mm', yarn: 'Lana aran, 3 colori', size: `${Math.round(w * 0.62)} × ${Math.round(tot * 0.9)} cm`,
      bg: pal.bg, art: { k: 'scarf', c: unit.map((u) => pal.c[u.c]) }, stitches: ['cat', 'mma', 'colore'],
      tags: ['sciarpa', 'righe', 'generato', 'inverno', pal.n.toLowerCase()],
      desc: `Una sciarpa a righe con un ritmo di colori unico, nella palette «${pal.n}». Solo mezze maglie alte: rilassante come un podcast.`,
      materials: [`Lana aran in 3 colori «${pal.n}» (circa 100 g ciascuno)`, 'Uncinetto 5.5 mm', 'Ago da lana'], steps
    };
  }

  const gen = { mandala: genMandala, granny: genGranny, ami: genAmi, sciarpa: genSciarpa };
  const genInfo = {
    mandala: { n: 'Mandala', e: '🌼' }, granny: { n: 'Granny', e: '🟪' }, ami: { n: 'Amigurumi', e: '🧸' }, sciarpa: { n: 'Sciarpa', e: '🧣' }
  };

  const categories = [
    { id: 'tutti', n: 'Tutti', e: '✨' }, { id: 'amigurumi', n: 'Amigurumi', e: '🧸' }, { id: 'casa', n: 'Casa', e: '🏡' },
    { id: 'accessori', n: 'Accessori', e: '👜' }, { id: 'abbigliamento', n: 'Abbigliamento', e: '🧣' }, { id: 'decorazioni', n: 'Decorazioni', e: '🌸' },
    { id: 'tecniche', n: 'Tecniche', e: '🎓' }
  ];

  window.GOMITOLO = { patterns, stitches, learnGroups, abbr, tips, hooks, weights, gen, genInfo, categories, hash, rng, PAL };
})();
