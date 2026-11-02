/* Gomitolo – data (English): projects, stitches, lessons, tools and daily generators */
(function () {
  'use strict';

  const hash = (s) => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => { let a = (seed >>> 0) || 1; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const st = (t, d, o) => Object.assign({ t, d }, o || {});

  /* ---------------------------------------------------------------- */
  /*  PROJECTS                                                         */
  /* ---------------------------------------------------------------- */
  const patterns = [
    {
      id: 'sottobicchiere-arcobaleno', title: 'Rainbow Coaster', subtitle: 'The perfect first project',
      cat: 'casa', level: 1, time: '30 min', hook: '4 mm', yarn: 'DK cotton in 4 colors', size: 'Ø 11 cm',
      bg: '#FFE3D6', art: { k: 'coaster', c: ['#FF7A6B', '#FFB38A', '#FFD66B', '#7FD6BE'] },
      stitches: ['am', 'cat', 'mbss', 'ma', 'colore'], tags: ['round', 'colors', 'quick', 'gift', 'beginner'],
      desc: 'Four rounds of double crochet in four colors to learn working in the round and increasing. You can make one in half an hour, so whip up a set to give away!',
      materials: ['DK cotton in 4 colors (about 10 g each)', '4 mm crochet hook', 'Yarn needle', 'Scissors'],
      steps: [
        st('Getting ready', 'Pick 4 colors and keep your yarn needle handy. Always leave a tail of about 10 cm when you start or change colors.'),
        st('Round 1', 'Make a magic ring (MR). 3 ch (counts as 1 dc), then 11 dc into the ring. Pull the tail to close it and join with 1 sl st into the 3rd starting ch.', { count: '12 stitches', color: '#FF7A6B', cn: 'Color A', tip: 'If the magic ring feels tricky, ch 4 and join into a ring with 1 sl st.' }),
        st('Round 2', 'Join color B in any stitch. 3 ch and 1 dc in the same stitch, then 2 dc in every stitch around. Join with 1 sl st into the 3rd ch.', { count: '24 stitches', color: '#FFB38A', cn: 'Color B' }),
        st('Round 3', 'Join color C. 3 ch and 1 dc in the same stitch. *1 dc in the next stitch, 2 dc in the following one*; repeat from * 10 more times, finish with 1 dc in the last stitch. Join with 1 sl st.', { count: '36 stitches', color: '#FFD66B', cn: 'Color C' }),
        st('Round 4', 'Join color D. 3 ch and 1 dc in the same stitch. *1 dc in each of the next 2 stitches, 2 dc in the following one*; repeat from * 10 more times, finish with 1 dc in each of the last 2 stitches. Join with 1 sl st.', { count: '48 stitches', color: '#7FD6BE', cn: 'Color D' }),
        st('Finishing', 'Cut the yarn and fasten off. Use the needle to weave all the tails in on the back. A puff of steam from the iron will make it perfectly flat.', { tip: 'If the edge ruffles, next time use a hook half a size bigger.' })
      ]
    },
    {
      id: 'granny-classico', title: 'Classic Granny Square', subtitle: 'The square that made history',
      cat: 'decorazioni', level: 1, time: '40 min', hook: '4.5 mm', yarn: 'Worsted yarn, colorful scraps', size: '12 × 12 cm',
      bg: '#E8E1FF', art: { k: 'granny', c: ['#FF7AB6', '#FFD66B', '#7FD6BE', '#8E7CF0'] },
      stitches: ['cat', 'mbss', 'ma', 'colore'], tags: ['granny', 'square', 'blanket', 'scraps', 'beginner'],
      desc: 'The great crochet classic: clusters of 3 double crochet and chain-space corners. Once you’ve got it down you can make blankets, bags, pillows and cardigans.',
      materials: ['Worsted yarn in 4 colors', '4.5 mm crochet hook', 'Yarn needle'],
      steps: [
        st('Foundation', 'Ch 4 and join into a ring with 1 sl st into the first ch.', { color: '#8E7CF0', cn: 'Color A' }),
        st('Round 1', '3 ch (counts as 1 dc), 2 dc into the ring, 2 ch. *3 dc into the ring, 2 ch*; repeat from * 2 more times. Join with 1 sl st into the 3rd ch.', { count: '4 clusters of 3 dc', color: '#8E7CF0', cn: 'Color A' }),
        st('Round 2', 'Join color B in a corner space. 3 ch, 2 dc, 2 ch, 3 dc in the same space. *1 ch, in the next corner (3 dc, 2 ch, 3 dc)*; repeat from * 2 more times. 1 ch and join with 1 sl st.', { count: '8 clusters', color: '#FF7AB6', cn: 'Color B' }),
        st('Round 3', 'Join color C in a corner: (3 ch, 2 dc, 2 ch, 3 dc). *1 ch, 3 dc in the side space, 1 ch, in the corner (3 dc, 2 ch, 3 dc)*; repeat from * 2 more times. 1 ch, 3 dc in the last side space, 1 ch, join with 1 sl st.', { count: '12 clusters', color: '#FFD66B', cn: 'Color C' }),
        st('Round 4', 'Join color D and keep going the same way: in each corner (3 dc, 2 ch, 3 dc), in each side space 3 dc, with 1 ch between clusters.', { count: '16 clusters', color: '#7FD6BE', cn: 'Color D', tip: 'Every round adds one cluster per side, so it’s easy to check if you skipped something.' }),
        st('Finishing', 'Cut the yarn and weave in the tails. Pin the square onto a soft surface, spritz it with a little water and let it dry: it will be perfectly square.')
      ]
    },
    {
      id: 'sciarpa-coste', title: 'Soft Ribbed Scarf', subtitle: 'Looks knitted!',
      cat: 'abbigliamento', level: 1, time: '6 h', hook: '8 mm', yarn: 'Chunky yarn, 200 g', size: '20 × 160 cm',
      bg: '#DDF3EC', art: { k: 'scarf', c: ['#5E9E8E', '#7FD6BE', '#BFEBDD'] },
      stitches: ['cat', 'mma', 'cp'], tags: ['scarf', 'winter', 'rows', 'ribbing', 'gift'],
      desc: 'Working half double crochet in the back loop only gives you stretchy ribs that look just like knitting. The ideal first piece to wear.',
      materials: ['Chunky yarn 200 g', '8 mm crochet hook', 'Yarn needle', 'Cardboard for the fringe (optional)'],
      steps: [
        st('Foundation chain', 'Ch 30 (about 20 cm). For a wider scarf, add as many chains as you like.'),
        st('Row 1', 'Skip the first 2 ch, 1 hdc in each ch across. Turn.', { count: '28 stitches' }),
        st('Row 2', '2 ch (doesn’t count as a stitch), 1 hdc in the back loop only (BLO) of each stitch. Turn.', { count: '28 stitches', tip: 'Working in the BLO means inserting your hook only under the loop farthest from you.' }),
        st('Rows 3 – 120', 'Repeat row 2 until the scarf measures about 160 cm.', { count: '28 stitches per row', rows: 118 }),
        st('Fringe', 'Cut 40 strands of 25 cm. Fold 2 in half, pull the loop through a stitch on the short edge, pass the ends through the loop and pull tight. Repeat every 2–3 stitches on both ends.'),
        st('Finishing', 'Weave in the tails and trim the fringe evenly with scissors.')
      ]
    },
    {
      id: 'pallina-amigurumi', title: 'Smiley Ball', subtitle: 'Your first amigurumi',
      cat: 'amigurumi', level: 1, time: '1 h', hook: '2.5 mm', yarn: '3 mm cotton', size: 'Ø 6 cm',
      bg: '#FFF1C9', art: { k: 'ball', c: ['#FFC94D'] },
      stitches: ['am', 'mb', 'aum', 'dim'], tags: ['amigurumi', 'ball', 'spiral', 'kawaii', 'beginner'],
      desc: 'The sphere is the base of almost every amigurumi. You’ll learn spirals, increases and invisible decreases… and end up with a smiley friend.',
      materials: ['Yellow 3 mm cotton', '2.5 mm crochet hook', 'Stuffing', '2 safety eyes, 8 mm', 'Stitch marker', 'Black or pink yarn for embroidery'],
      steps: [
        st('How it works', 'You work in a spiral: don’t join the rounds. Place a stitch marker in the first stitch of each round and move it up every time.'),
        st('Round 1', '6 sc in a magic ring (MR).', { count: '6 stitches' }),
        st('Round 2', 'inc in every stitch (6 times).', { count: '12 stitches' }),
        st('Round 3', '(1 sc, inc) × 6.', { count: '18 stitches' }),
        st('Round 4', '(2 sc, inc) × 6.', { count: '24 stitches' }),
        st('Rounds 5 – 9', '1 sc in each stitch for 5 rounds.', { count: '24 stitches', rows: 5 }),
        st('Eyes', 'Insert the safety eyes between rounds 7 and 8, 5 stitches apart. Embroider a smile and, if you like, two pink cheeks.'),
        st('Round 10', '(2 sc, dec) × 6.', { count: '18 stitches' }),
        st('Round 11', '(1 sc, dec) × 6. Now stuff the ball firmly.', { count: '12 stitches' }),
        st('Round 12', 'dec × 6.', { count: '6 stitches' }),
        st('Closing', 'Cut the yarn, leaving 15 cm. With the needle, thread it through the front loops of the 6 remaining stitches, pull to close and hide the tail inside the ball.')
      ]
    },
    {
      id: 'cuore-applicazione', title: 'Little Heart Appliqué', subtitle: 'Ready in 10 minutes',
      cat: 'decorazioni', level: 1, time: '15 min', hook: '3.5 mm', yarn: 'DK cotton', size: '5 cm',
      bg: '#FFE0EA', art: { k: 'heart', c: ['#FF5C8A'] },
      stitches: ['am', 'cat', 'ma', 'mad', 'mbss'], tags: ['heart', 'applique', 'valentine', 'quick'],
      desc: 'The whole heart is worked inside a single magic ring. Perfect for sewing onto bags and sweaters or stringing up as a garland.',
      materials: ['Pink or red DK cotton', '3.5 mm crochet hook', 'Yarn needle'],
      steps: [
        st('Ring', 'Make a magic ring (MR) and don’t pull it tight yet.'),
        st('First half', 'Into the ring work: 3 ch, 3 tr, 3 dc.', { tip: 'Keep the stitches snug against each other.' }),
        st('Point', '1 ch, 1 tr (this is the point of the heart), 1 ch.'),
        st('Second half', 'Still into the ring: 3 dc, 3 tr, 3 ch, then 1 sl st into the ring.'),
        st('Closing', 'Now pull the ring’s tail firmly: the center closes and the two top curves appear. Cut and weave in the ends.')
      ]
    },
    {
      id: 'fiore-cinque-petali', title: 'Little 5-Petal Flower', subtitle: 'For pins, hair clips and garlands',
      cat: 'decorazioni', level: 1, time: '15 min', hook: '3.5 mm', yarn: 'DK cotton, 2 colors', size: '6 cm',
      bg: '#FFF4C2', art: { k: 'flower', c: ['#FF9EC2', '#FFD66B'] },
      stitches: ['am', 'cat', 'mb', 'mma', 'ma', 'mbss'], tags: ['flower', 'spring', 'applique', 'quick'],
      desc: 'Two rounds and you’ve got a flower. Switch up colors and hook sizes to make a whole bouquet.',
      materials: ['Yellow and pink cotton', '3.5 mm crochet hook', 'Yarn needle'],
      steps: [
        st('Round 1', 'With yellow: magic ring (MR), 1 ch, 10 sc into the ring. Pull tight and join with 1 sl st into the first sc.', { count: '10 stitches', color: '#FFD66B', cn: 'Center' }),
        st('Round 2', 'Join pink. *In the next stitch work (1 hdc, 2 dc, 1 hdc), then 1 sl st in the following stitch*; repeat from * 4 more times.', { count: '5 petals', color: '#FF9EC2', cn: 'Petals' }),
        st('Finishing', 'Join with 1 sl st at the base of the first petal, cut and weave in the ends.', { tip: 'Add a tiny button in the center for a vintage look.' })
      ]
    },
    {
      id: 'presina-quadrata', title: 'Grandma’s Potholder', subtitle: 'Rows of single crochet',
      cat: 'casa', level: 1, time: '2 h', hook: '4 mm', yarn: '100% cotton, 60 g', size: '18 × 18 cm',
      bg: '#FFE9CF', art: { k: 'potholder', c: ['#F28F3B', '#FFD5A5'] },
      stitches: ['cat', 'mb', 'mbss'], tags: ['kitchen', 'square', 'rows', 'beginner'],
      desc: 'The ideal project to get comfortable with single crochet in rows: a dense, heat-resistant fabric.',
      materials: ['100% cotton (not acrylic!)', '4 mm crochet hook', 'Yarn needle'],
      steps: [
        st('Foundation chain', 'Ch 31.'),
        st('Row 1', '1 sc in the 2nd ch from the hook and in each ch across. Turn.', { count: '30 stitches' }),
        st('Rows 2 – 34', '1 ch (doesn’t count), 1 sc in each stitch. Turn. Keep going until the piece is square.', { count: '30 stitches', rows: 33, tip: 'Count your stitches at the end of every row and your edges will stay straight.' }),
        st('Border', '1 ch, then work sc all the way around the square, putting 3 sc in each corner. Join with 1 sl st.'),
        st('Hanging loop', 'At the last corner ch 12 and attach with 1 sl st in the same stitch. Work 16 sc into the loop, fasten off and weave in the ends.')
      ]
    },
    {
      id: 'fascia-turbante', title: 'Turban Headband', subtitle: 'Cozy and stylish',
      cat: 'accessori', level: 2, time: '2 h', hook: '5.5 mm', yarn: 'Aran yarn, 60 g', size: '50 cm around',
      bg: '#E2EEFF', art: { k: 'headband', c: ['#5B8DEF', '#A9C6FF'] },
      stitches: ['cat', 'mma', 'cp', 'mbss'], tags: ['headband', 'hair', 'winter', 'ribbing'],
      desc: 'A ribbed strip that, with one simple interlocking fold, becomes a super chic turban headband.',
      materials: ['Aran yarn 60 g', '5.5 mm crochet hook', 'Yarn needle'],
      steps: [
        st('Foundation chain', 'Ch 16 (about 10 cm).'),
        st('Row 1', 'Skip 2 ch, 1 hdc in each ch. Turn.', { count: '14 stitches' }),
        st('Following rows', '2 ch, 1 hdc in the back loop only (BLO) of each stitch. Turn. Keep going until the strip, slightly stretched, measures 46–48 cm.', { count: '14 stitches', rows: 60 }),
        st('Turban fold', 'Lay the strip in a U shape. Fold each end in half lengthwise and hook them into each other, like two C’s hugging.', { tip: 'Hold them in place with clips before sewing.' }),
        st('Seaming', 'Sew all four layers together with the yarn needle, then turn the headband inside out: the seam will disappear inside.')
      ]
    },
    {
      id: 'borsa-rete', title: 'Market Mesh Bag', subtitle: 'Eco-friendly and roomy',
      cat: 'accessori', level: 2, time: '5 h', hook: '5 mm', yarn: 'Cotton, 200 g', size: '35 × 40 cm',
      bg: '#E3F5D8', art: { k: 'bag', c: ['#5E9E6E', '#A8D5A2'] },
      stitches: ['am', 'cat', 'mbss', 'ma', 'mb', 'aum'], tags: ['bag', 'mesh', 'summer', 'beach', 'groceries'],
      desc: 'A round double crochet base, a stretchy mesh body and sturdy handles. It stretches to hold all your groceries.',
      materials: ['Cotton 200 g', '5 mm crochet hook', 'Stitch marker', 'Yarn needle'],
      steps: [
        st('Round 1', 'Magic ring (MR), 3 ch (=1 dc), 11 dc. Join with 1 sl st.', { count: '12 stitches' }),
        st('Round 2', '3 ch, 1 dc in the same stitch, 2 dc in each stitch. Join with 1 sl st.', { count: '24 stitches' }),
        st('Round 3', '3 ch, 1 dc in the same stitch, *1 dc, 2 dc in the next*; repeat, finish with 1 dc. Join.', { count: '36 stitches' }),
        st('Round 4', '3 ch, 1 dc in the same stitch, *2 dc, 2 dc in the next*; repeat, finish with 2 dc. Join.', { count: '48 stitches' }),
        st('Round 5', '3 ch, 1 dc in the same stitch, *3 dc, 2 dc in the next*; repeat, finish with 3 dc. Join.', { count: '60 stitches' }),
        st('Round 6 · start of mesh', '1 ch, 1 sc in the same stitch, *5 ch, skip 2 stitches, 1 sc in the next*; repeat. Finish with 5 ch and 1 sl st into the first sc.', { count: '20 loops' }),
        st('Rounds 7 – 26', '3 sl st to reach the middle of the first loop, *5 ch, 1 sc in the next loop*; repeat all the way around.', { count: '20 loops', rows: 20, tip: 'The mesh stretches a lot: measure the height while holding it slightly taut.' }),
        st('Round 27 · edging', '1 ch, 3 sc in each loop. Join with 1 sl st.', { count: '60 stitches' }),
        st('Round 28', '1 ch, 1 sc in each stitch. Join.', { count: '60 stitches' }),
        st('Round 29 · handles', '1 ch, 10 sc, 40 ch, skip 10 stitches, 20 sc, 40 ch, skip 10 stitches, 10 sc. Join.'),
        st('Rounds 30 – 32', '1 ch, 1 sc in each stitch and in each chain of the handles. Join every round with 1 sl st.', { count: '120 stitches', rows: 3 }),
        st('Finishing', 'Cut, weave in the ends and fill it with fresh fruit!')
      ]
    },
    {
      id: 'berretto-tondo', title: 'Pom-Pom Beanie', subtitle: 'Worked top-down in the round',
      cat: 'abbigliamento', level: 2, time: '4 h', hook: '5.5 mm', yarn: 'Aran yarn, 100 g', size: 'Adult (54–56 cm)',
      bg: '#FFE0DA', art: { k: 'hat', c: ['#E8505B', '#FFD5CF'] },
      stitches: ['am', 'cat', 'ma', 'mbss', 'mb', 'cp'], tags: ['beanie', 'hat', 'winter', 'pom-pom', 'round'],
      desc: 'A flat circle that grows until it becomes a hat. You’ll learn to control increases and figure out sizing.',
      materials: ['Aran yarn 100 g', '5.5 mm crochet hook', 'Yarn needle', 'Pom-pom (or cardboard to make one)'],
      steps: [
        st('Round 1', 'Magic ring (MR), 3 ch (=1 dc), 11 dc. Join with 1 sl st.', { count: '12 stitches' }),
        st('Round 2', '3 ch, 1 dc in the same stitch, 2 dc in each stitch. Join.', { count: '24 stitches' }),
        st('Round 3', '3 ch, 1 dc in the same stitch, *1 dc, 2 dc in the next*; repeat, finish with 1 dc. Join.', { count: '36 stitches' }),
        st('Round 4', 'As above, with 2 dc between increases.', { count: '48 stitches' }),
        st('Round 5', 'As above, with 3 dc between increases.', { count: '60 stitches' }),
        st('Round 6', 'As above, with 4 dc between increases.', { count: '72 stitches', tip: 'Measure the diameter: for an adult it should be 17–18 cm. If it’s smaller, work another increase round.' }),
        st('Rounds 7 – 16', '3 ch (=1 dc), 1 dc in each stitch. Join with 1 sl st. Keep going until the hat measures 18 cm from the crown.', { count: '72 stitches', rows: 10 }),
        st('Brim · 4 rounds', '1 ch, 1 sc in the back loop only (BLO) of each stitch. Join with 1 sl st. Repeat for 4 rounds.', { count: '72 stitches', rows: 4 }),
        st('Pom-pom', 'Cut, weave in the ends and sew a fluffy pom-pom on top.')
      ]
    },
    {
      id: 'polipetto', title: 'Cuddly Little Octopus', subtitle: 'Curly tentacles',
      cat: 'amigurumi', level: 2, time: '2 h', hook: '2.5 mm', yarn: '3 mm cotton', size: '9 cm',
      bg: '#FFE0EF', art: { k: 'octopus', c: ['#FF7AB6'] },
      stitches: ['am', 'mb', 'aum', 'dim', 'cat', 'mbss'], tags: ['amigurumi', 'octopus', 'sea', 'baby', 'kawaii'],
      desc: 'An amigurumi classic: a round head and eight tentacles that curl all by themselves thanks to a single crochet trick.',
      materials: ['Pink 3 mm cotton', '2.5 mm crochet hook', '8 mm safety eyes', 'Stuffing', 'Stitch marker'],
      steps: [
        st('Round 1', '6 sc in a magic ring (MR).', { count: '6 stitches' }),
        st('Round 2', 'inc × 6.', { count: '12 stitches' }),
        st('Round 3', '(1 sc, inc) × 6.', { count: '18 stitches' }),
        st('Round 4', '(2 sc, inc) × 6.', { count: '24 stitches' }),
        st('Round 5', '(3 sc, inc) × 6.', { count: '30 stitches' }),
        st('Rounds 6 – 11', '1 sc in each stitch for 6 rounds.', { count: '30 stitches', rows: 6 }),
        st('Eyes', 'Insert the eyes between rounds 9 and 10, 7 stitches apart. Embroider the cheeks.'),
        st('Round 12', '(3 sc, dec) × 6.', { count: '24 stitches' }),
        st('Round 13', '(2 sc, dec) × 6. Stuff the head.', { count: '18 stitches' }),
        st('Round 14 · tentacles', 'Working in the front loop only (FLO): *1 sl st, 15 ch, starting from the 2nd ch from the hook work 2 sc in each ch, 1 sl st in the next stitch of the head*; repeat 8 times, then 1 sl st in the last 2 stitches.', { count: '8 tentacles', tip: 'The 2 sc in each chain make the tentacle curl up like a corkscrew!' }),
        st('Bottom', 'Work into the unused back loops of round 13: (1 sc, dec) × 6 (12), then dec × 6 (6). Close by cinching the last stitches and hide the yarn.', { count: '6 stitches' })
      ]
    },
    {
      id: 'fragola-portachiavi', title: 'Strawberry Keychain', subtitle: 'Super sweet and handy',
      cat: 'amigurumi', level: 2, time: '1 h', hook: '2.5 mm', yarn: '3 mm cotton, red and green', size: '5 cm',
      bg: '#FFE1DE', art: { k: 'strawberry', c: ['#F0454B', '#5BBF6A'] },
      stitches: ['am', 'mb', 'aum', 'dim', 'cat', 'mbss', 'mma', 'ma'], tags: ['strawberry', 'fruit', 'keychain', 'gift', 'kawaii'],
      desc: 'A chubby little strawberry with embroidered seeds and star-shaped leaves. Add a clasp and hang it on your keys or backpack.',
      materials: ['Red and green cotton', '2.5 mm crochet hook', 'Yellow or white yarn', 'Stuffing', 'Keychain ring'],
      steps: [
        st('Round 1', 'With red: 6 sc in a magic ring (MR).', { count: '6 stitches', color: '#F0454B', cn: 'Red' }),
        st('Round 2', '(1 sc, inc) × 3.', { count: '9 stitches' }),
        st('Round 3', '(2 sc, inc) × 3.', { count: '12 stitches' }),
        st('Round 4', '(1 sc, inc) × 6.', { count: '18 stitches' }),
        st('Round 5', '(2 sc, inc) × 6.', { count: '24 stitches' }),
        st('Rounds 6 – 8', '1 sc in each stitch.', { count: '24 stitches', rows: 3 }),
        st('Seeds', 'Embroider lots of tiny yellow stitches scattered over the surface.'),
        st('Round 9', '(2 sc, dec) × 6. Stuff.', { count: '18 stitches' }),
        st('Round 10', '(1 sc, dec) × 6.', { count: '12 stitches' }),
        st('Round 11', 'dec × 6. Fasten off and hide the yarn.', { count: '6 stitches' }),
        st('Leaves', 'With green: magic ring (MR). *5 ch, starting from the 2nd ch from the hook: 1 sl st, 1 sc, 1 hdc, 1 dc, then 1 sl st into the ring*; repeat 5 times. Pull the ring tight.', { count: '5 leaves', color: '#5BBF6A', cn: 'Green' }),
        st('Assembly', 'Sew the leaves onto the wide end of the strawberry and attach the keychain ring in the center.')
      ]
    },
    {
      id: 'cestino-fettuccia', title: 'T-Shirt Yarn Basket', subtitle: 'Tidy with style',
      cat: 'casa', level: 2, time: '3 h', hook: '10 mm', yarn: 'T-shirt yarn, 1 spool', size: 'Ø 20 × 14 cm',
      bg: '#F5EBD7', art: { k: 'basket', c: ['#C8A26A', '#E8D3AE'] },
      stitches: ['am', 'mb', 'aum', 'cp', 'cat', 'gambero'], tags: ['basket', 't-shirt yarn', 'organizing', 'home', 'gift'],
      desc: 'T-shirt yarn makes everything faster: in one afternoon you’ll have a sturdy basket with handles for makeup, yarn or little plants.',
      materials: ['T-shirt yarn (about 120 m)', '10 mm crochet hook', 'Stitch marker', 'Large needle'],
      steps: [
        st('Round 1', '6 sc in a magic ring (MR). Work in a spiral.', { count: '6 stitches' }),
        st('Round 2', 'inc × 6.', { count: '12 stitches' }),
        st('Round 3', '(1 sc, inc) × 6.', { count: '18 stitches' }),
        st('Round 4', '(2 sc, inc) × 6.', { count: '24 stitches' }),
        st('Round 5', '(3 sc, inc) × 6.', { count: '30 stitches' }),
        st('Round 6', '(4 sc, inc) × 6.', { count: '36 stitches' }),
        st('Round 7 · edge', '1 sc in the back loop only (BLO) of each stitch: this forms the edge of the base.', { count: '36 stitches' }),
        st('Rounds 8 – 13', '1 sc in each stitch.', { count: '36 stitches', rows: 6 }),
        st('Round 14 · handle holes', '5 sc, 6 ch, skip 6 stitches, 12 sc, 6 ch, skip 6 stitches, 7 sc.'),
        st('Round 15', '1 sc in each stitch and 6 sc into each chain loop.', { count: '36 stitches' }),
        st('Edging', 'One round of crab stitch (sc worked from left to right) for a corded edge. Fasten off and weave in the ends.')
      ]
    },
    {
      id: 'copertina-c2c', title: 'C2C Heart Baby Blanket', subtitle: 'Corner to corner, pixel by pixel',
      cat: 'casa', level: 3, time: '20 h', hook: '5 mm', yarn: 'Worsted yarn, 2 colors, 600 g', size: '75 × 75 cm',
      bg: '#FFE3EC', art: { k: 'c2c', c: ['#FF5C8A', '#FFF0F4'] },
      stitches: ['cat', 'ma', 'mbss', 'colore'], tags: ['blanket', 'c2c', 'pixel', 'baby', 'chart'],
      desc: 'The corner-to-corner technique builds the blanket diagonally, one tile at a time. Every tile is a pixel: you can draw any picture you want!',
      materials: ['Worsted yarn: 450 g main color + 150 g heart color', '5 mm crochet hook', 'Yarn needle', 'Heart chart (25 × 25 squares)'],
      steps: [
        st('The tile', 'Each tile is made of 3 ch + 3 dc. The blanket grows diagonally by adding one tile per row.'),
        st('Row 1', '6 ch. 1 dc in the 4th ch from the hook, 1 dc in each of the next 2 ch.', { count: '1 tile' }),
        st('Row 2 · increase', '6 ch. 1 dc in the 4th ch from the hook and in the next 2. Turn the previous tile: 1 sl st into the 3-ch space, 3 ch, 3 dc in the same space.', { count: '2 tiles' }),
        st('Increase rows', 'Repeat row 2: each row starts with 6 ch and a new tile, then (1 sl st, 3 ch, 3 dc) in the space of each tile from the previous row. Continue up to 25 tiles.', { count: '+1 tile per row', rows: 23, tip: 'Follow the chart: change color on the last yarn over of the previous tile.' }),
        st('Decrease rows', 'Turn, 1 sl st in each of the 3 dc and into the tile space, then (3 ch, 3 dc, 1 sl st in the next space) to the end, without adding the final tile.', { count: '−1 tile per row', rows: 24 }),
        st('Border', 'Work 2 rounds of sc all the way around with 3 sc in the corners, then one round of crab stitch.'),
        st('Finishing', 'Weave in all the tails (there are lots: arm yourself with patience and a good TV series!) and steam-block the blanket.')
      ]
    },
    {
      id: 'mandala-sole', title: 'Sunshine Mandala', subtitle: 'Shell-stitch border',
      cat: 'decorazioni', level: 2, time: '1 h', hook: '4 mm', yarn: 'DK cotton, 5 colors', size: 'Ø 18 cm',
      bg: '#FFF0C2', art: { k: 'mandala', c: ['#FFB000', '#FF7A3D', '#FFD66B', '#E8505B', '#FFE7A3'] },
      stitches: ['am', 'cat', 'ma', 'mbss', 'colore'], tags: ['mandala', 'round', 'decor', 'colors', 'shells'],
      desc: 'A sunny mandala to hang on the wall or use as a placemat. The shell border turns a simple circle into a flower.',
      materials: ['DK cotton in 5 warm colors', '4 mm crochet hook', 'Yarn needle', 'Wooden hoop (optional)'],
      steps: [
        st('Round 1', 'Magic ring (MR), 3 ch (=1 dc), 11 dc. Join with 1 sl st.', { count: '12 stitches', color: '#FFB000', cn: 'Color A' }),
        st('Round 2', 'New color. 3 ch and 1 dc in the same stitch, 2 dc in each stitch. Join.', { count: '24 stitches', color: '#FF7A3D', cn: 'Color B' }),
        st('Round 3', 'New color. 3 ch and 1 dc in the same stitch, *1 dc, 2 dc in the next*; repeat, finish with 1 dc. Join.', { count: '36 stitches', color: '#FFD66B', cn: 'Color C' }),
        st('Round 4', 'New color. As above, with 2 dc between increases.', { count: '48 stitches', color: '#E8505B', cn: 'Color D' }),
        st('Round 5', 'New color. As above, with 3 dc between increases.', { count: '60 stitches', color: '#FFB000', cn: 'Color A' }),
        st('Round 6 · shells', 'Last color. *Skip 1 stitch, 5 dc in the next stitch, skip 1 stitch, 1 sl st in the next*; repeat all the way around.', { count: '15 shells', color: '#FF7A3D', cn: 'Color B' }),
        st('Finishing', 'Weave in the ends and steam-block the mandala, pinning it into a perfect circle.')
      ]
    },
    {
      id: 'scaldatazza', title: 'Cozy Mug Sleeve', subtitle: 'Give your mug a hug',
      cat: 'casa', level: 1, time: '1 h', hook: '5 mm', yarn: 'Aran yarn, 30 g', size: '8 × 24 cm',
      bg: '#EADCF7', art: { k: 'mug', c: ['#9B7FD1', '#FFFFFF'] },
      stitches: ['cat', 'mma', 'mb', 'cp'], tags: ['mug', 'fall', 'home', 'gift', 'quick'],
      desc: 'A ribbed band with a button to keep your hands and your tea warm. Done in one evening.',
      materials: ['Aran yarn 30 g', '5 mm crochet hook', 'One 2 cm button', 'Yarn needle'],
      steps: [
        st('Foundation chain', 'Ch 14.'),
        st('Row 1', 'Skip 2 ch, 1 hdc in each ch. Turn.', { count: '12 stitches' }),
        st('Rows 2 – 20', '2 ch, 1 hdc in the back loop only (BLO) of each stitch. Turn. Try the band around the mug: it should wrap around it, leaving the handle free.', { count: '12 stitches', rows: 19 }),
        st('Buttonhole', '1 ch, 5 sc, 3 ch, skip 2 stitches, 5 sc.'),
        st('Finishing', 'Sew the button on the opposite end, lined up with the buttonhole. Weave in the ends.')
      ]
    }
  ];

  /* ---------------------------------------------------------------- */
  /*  STITCHES AND TECHNIQUES                                          */
  /* ---------------------------------------------------------------- */
  const stitches = [
    { id: 'nodo', name: 'Slip knot', abbr: '—', us: 'slip knot', uk: 'slip knot', it: 'nodo scorsoio', group: 'The basics', level: 1, color: '#FFD3B8',
      intro: 'The starting point of almost every project: an adjustable loop that attaches the yarn to your hook.',
      steps: ['Make a loop with the yarn, with the tail behind the working yarn.', 'Put the hook (or your fingers) through the loop and pull up a loop of working yarn.', 'Tighten by pulling the tail: the loop should slide on the hook without being too tight.'],
      tip: 'Keep the working yarn over your left index finger and pinch the tail between thumb and middle finger.' },
    { id: 'cat', name: 'Chain', abbr: 'ch', us: 'ch', uk: 'ch', it: 'cat', group: 'The basics', level: 1, color: '#FFE3D6',
      intro: 'The foundation of everything: you use it to start your work, make spaces and gain height at the start of a row.',
      steps: ['Start with a slip knot on your hook.', 'Wrap the yarn over the hook from back to front: this is a yarn over.', 'Pull the yarn over through the loop on your hook. You made 1 chain!', 'Repeat, keeping your tension even: all the stitches should be the same size.'],
      tip: 'Count your chains by looking at the “V”s on the front. The loop left on your hook never counts.' },
    { id: 'mbss', name: 'Slip stitch', abbr: 'sl st', us: 'sl st', uk: 'ss', it: 'mbss', group: 'The basics', level: 1, color: '#DDF3EC',
      intro: 'The shortest stitch: used to join rounds, connect pieces and move along without adding height.',
      steps: ['Insert your hook into the indicated stitch.', 'Yarn over.', 'Pull the yarn through the stitch AND the loop on your hook in one single motion.'],
      tip: 'Keep it loose: slip stitches tend to tighten up your work.' },
    { id: 'mb', name: 'Single crochet', abbr: 'sc', us: 'sc', uk: 'dc', it: 'mb', group: 'Basic stitches', level: 1, color: '#FFF1C9',
      intro: 'Dense and sturdy: the queen of amigurumi, potholders and borders.',
      steps: ['Insert your hook into the stitch, under both loops of the V.', 'Yarn over and pull up a loop: you now have 2 loops on your hook.', 'Yarn over and pull through both loops. Done!'],
      tip: 'Heads up: the US single crochet is called double crochet in UK patterns!' },
    { id: 'mma', name: 'Half double crochet', abbr: 'hdc', us: 'hdc', uk: 'htr', it: 'mma', group: 'Basic stitches', level: 1, color: '#E8E1FF',
      intro: 'Halfway between single and double: quick, soft and perfect for scarves and blankets.',
      steps: ['Yarn over before inserting your hook.', 'Insert your hook into the stitch, yarn over and pull up a loop: you have 3 loops.', 'Yarn over and pull through all 3 loops at once.'],
      tip: 'At the start of a row, chain 2 to gain height.' },
    { id: 'ma', name: 'Double crochet', abbr: 'dc', us: 'dc', uk: 'tr', it: 'ma', group: 'Basic stitches', level: 1, color: '#E2EEFF',
      intro: 'Tall and airy: it grows fast and is the star of granny squares and mandalas.',
      steps: ['Yarn over and insert your hook into the stitch.', 'Yarn over and pull up a loop: you have 3 loops.', 'Yarn over and pull through 2 loops: 2 are left.', 'Yarn over and pull through the last 2 loops.'],
      tip: 'At the start of a row, chain 3; it usually counts as the first double crochet.' },
    { id: 'mad', name: 'Treble crochet', abbr: 'tr', us: 'tr', uk: 'dtr', it: 'mad', group: 'Basic stitches', level: 2, color: '#FFE0EA',
      intro: 'Even taller: it creates points, petals and elegant lacy openings.',
      steps: ['Yarn over twice and insert your hook into the stitch.', 'Yarn over and pull up a loop: you have 4 loops.', 'Yarn over and pull through 2 loops (3 are left).', 'Yarn over and pull through 2 loops (2 are left).', 'Yarn over and pull through the last 2.'],
      tip: 'At the start of a row, chain 4 to gain height.' },
    { id: 'am', name: 'Magic ring', abbr: 'MR', us: 'magic ring', uk: 'magic loop', it: 'AM', group: 'Techniques', level: 1, color: '#FFE9CF',
      intro: 'The secret to starting projects in the round without a hole in the middle.',
      steps: ['Wrap the yarn twice around two fingers, with the tail toward you.', 'Insert your hook under both wraps, grab the working yarn and pull up a loop.', 'Yarn over and secure it with 1 ch (it doesn’t count).', 'Work the required stitches into the ring, covering the tail too.', 'Pull the tail: the ring cinches up and the center closes.'],
      tip: 'After a few rounds, tie a little knot with the tail: the ring will never open again.' },
    { id: 'aum', name: 'Increase', abbr: 'inc', us: 'inc', uk: 'inc', it: 'aum', group: 'Techniques', level: 1, color: '#E3F5D8',
      intro: 'Adds a stitch: that’s how circles grow and stay flat.',
      steps: ['Work a stitch as usual.', 'Insert your hook again into the same stitch of the previous round.', 'Work a second stitch: you turned 1 stitch into 2.'],
      tip: 'In flat circles every round adds the same number of increases: 6 for single crochet, 12 for double crochet.' },
    { id: 'dim', name: 'Invisible decrease', abbr: 'dec', us: 'dec / sc2tog', uk: 'dc2tog', it: 'dim', group: 'Techniques', level: 1, color: '#FFE0DA',
      intro: 'Joins 2 stitches into 1 without leaving holes: a must for closing amigurumi.',
      steps: ['Insert your hook into the front loop only of the next stitch.', 'Without yarning over, insert your hook into the front loop of the following stitch too: you have 3 loops.', 'Yarn over and pull through the first 2 loops.', 'Yarn over and pull through the 2 remaining loops.'],
      tip: 'Working only in the front loops makes the decrease practically invisible.' },
    { id: 'cp', name: 'Back loop only', abbr: 'BLO', us: 'BLO', uk: 'BLO', it: 'cp', group: 'Techniques', level: 1, color: '#DDF3EC',
      intro: 'Working only in the back loop creates stretchy ribs and crisp edges.',
      steps: ['Look at the top of your work: each stitch has 2 loops shaped like a V.', 'Insert your hook only under the back loop, the one farthest from you.', 'Finish the stitch as usual: the front loop stays free and forms a little ridge.'],
      tip: 'Front loop only (FLO) works the same way, using the loop closest to you.' },
    { id: 'colore', name: 'Color change', abbr: '—', us: 'color change', uk: 'colour change', it: 'cambio colore', group: 'Techniques', level: 1, color: '#FFF4C2',
      intro: 'The clean way to switch from one color to another without smudges.',
      steps: ['Work the last stitch of the old color up to the final yarn over.', 'Do the final yarn over with the new color and finish the stitch.', 'Keep going with the new color. Knot the two tails on the back and weave them in at the end.'],
      tip: 'In joined rounds, join the new color with 1 sl st in a different spot each time: the seams will be invisible.' },
    { id: 'chiudere', name: 'Fastening off and weaving in ends', abbr: '—', us: 'fasten off', uk: 'fasten off', it: 'chiudere e nascondere i fili', group: 'Techniques', level: 1, color: '#F5EBD7',
      intro: 'A good finish makes the difference between “handmade” and “homemade”.',
      steps: ['Cut the yarn, leaving a tail of about 15 cm.', 'Yarn over and pull the whole tail through the loop: your work is secured.', 'Thread the tail onto the yarn needle and pass it through the stitches on the back.', 'Change direction 2–3 times, then snip off the excess.'],
      tip: 'Hide the tails as you go by covering them with your stitches: at the end you won’t have 40 ends to deal with!' },
    { id: 'gambero', name: 'Crab stitch', abbr: '—', us: 'reverse sc', uk: 'crab stitch', it: 'punto gambero', group: 'Special stitches', level: 2, color: '#FFE0DA',
      intro: 'A corded edging worked “backwards”, from left to right.',
      steps: ['Don’t turn your work: at the end of the previous round, make 1 ch.', 'Insert your hook into the stitch to the RIGHT.', 'Yarn over and pull up a loop: you have 2 loops.', 'Yarn over and pull through both. Keep going, moving to the right.'],
      tip: 'It feels awkward at first: after 10 stitches your hands get used to it.' },
    { id: 'popcorn', name: 'Popcorn stitch', abbr: 'pc', us: 'popcorn', uk: 'popcorn', it: 'pop', group: 'Special stitches', level: 3, color: '#FFF1C9',
      intro: 'A raised bobble that adds texture to blankets and pillows.',
      steps: ['Work 5 double crochet into the same stitch.', 'Slide your hook out of the loop, leaving it hanging.', 'Insert your hook into the first of the 5 double crochet, from the front.', 'Pick up the hanging loop and pull it through the first stitch: the popcorn closes.', 'Make 1 ch to secure it.'],
      tip: 'The tighter you pull that last chain, the more the popcorn will pop out.' }
  ];

  const learnGroups = ['The basics', 'Basic stitches', 'Techniques', 'Special stitches'];

  const abbr = {
    'ch': { n: 'chain', id: 'cat', uk: 'ch', it: 'cat' },
    'sl st': { n: 'slip stitch', id: 'mbss', uk: 'ss', it: 'mbss' },
    'sc': { n: 'single crochet', id: 'mb', uk: 'dc', it: 'mb' },
    'hdc': { n: 'half double crochet', id: 'mma', uk: 'htr', it: 'mma' },
    'dc': { n: 'double crochet', id: 'ma', uk: 'tr', it: 'ma' },
    'tr': { n: 'treble crochet', id: 'mad', uk: 'dtr', it: 'mad' },
    'inc': { n: 'increase (2 stitches in the same stitch)', id: 'aum', uk: 'inc', it: 'aum' },
    'dec': { n: 'decrease (2 stitches together)', id: 'dim', uk: 'dec', it: 'dim' },
    'MR': { n: 'magic ring', id: 'am', uk: 'MR', it: 'AM' },
    'BLO': { n: 'back loop only', id: 'cp', uk: 'BLO', it: 'cp' },
    'FLO': { n: 'front loop only', id: 'cp', uk: 'FLO', it: 'ca' },
    'pc': { n: 'popcorn stitch', id: 'popcorn', uk: 'pc', it: 'pop' }
  };

  const abbrRe = /(^|[^\p{L}])(sl st|hdc|sc|dc|tr|ch|inc|dec|MR|BLO|FLO)(?![\p{L}])/gu;

  const tips = [
    'Always work in good light: dark yarns are pretty, but they strain your eyes. Pick light colors while you’re learning.',
    'Use a stitch marker (even a paper clip!) at the start of every spiral round.',
    'If your work curls up, you have too few stitches or your tension is too tight; if it ruffles, you have too many.',
    'Always make a 10 × 10 cm gauge swatch before a wearable project: it’ll save you from giant sweaters.',
    'The yarn label tells you the recommended hook size: it’s a great starting point.',
    'Cotton doesn’t split easily and is perfect for learning: you can see your stitches clearly.',
    'Relax your shoulders! Tension in your body turns into tension in your yarn.',
    'Count tricky stitches out loud: it seems silly, but it works.',
    'US and UK patterns use the same names for different stitches: always check where a pattern comes from.',
    'For amigurumi, use a smaller hook than recommended so the stuffing won’t peek through the stitches.',
    'Snap a photo of your work every session: seeing your progress is the best motivation.',
    'Hand-wash finished pieces in cold water and dry them flat.',
    'Frogging isn’t failing: it’s how every expert learned.',
    'Store your yarn in a canvas bag with a sprig of lavender to keep moths away.',
    'An ergonomic hook reduces hand fatigue during long sessions.'
  ];

  const hooks = [
    [2, 'B-1', '14', 'Lace / thread'], [2.25, 'B-1', '13', 'Fingering'], [2.5, '—', '12', 'Amigurumi'], [2.75, 'C-2', '11', 'Fingering'],
    [3, '—', '11', 'Sport'], [3.25, 'D-3', '10', 'Sport'], [3.5, 'E-4', '9', 'Sport / DK'], [3.75, 'F-5', '—', 'DK'], [4, 'G-6', '8', 'DK'],
    [4.5, '7', '7', 'Worsted'], [5, 'H-8', '6', 'Worsted / Aran'], [5.5, 'I-9', '5', 'Aran'], [6, 'J-10', '4', 'Chunky'], [6.5, 'K-10½', '3', 'Chunky'],
    [7, '—', '2', 'Chunky'], [8, 'L-11', '0', 'Super chunky'], [9, 'M/N-13', '00', 'Super chunky'], [10, 'N/P-15', '000', 'Jumbo / T-shirt yarn'],
    [12, '—', '—', 'Jumbo'], [15, 'P/Q', '—', 'Jumbo'], [19, 'S', '—', 'XXL projects']
  ];

  const weights = [
    { n: 0, name: 'Lace', it: 'Lace', hook: '1.5 – 2.25 mm', st: '32–42 sc', use: 'Doilies, lace' },
    { n: 1, name: 'Super Fine', it: 'Fingering / Sock', hook: '2.25 – 3.5 mm', st: '21–32 sc', use: 'Socks, light shawls' },
    { n: 2, name: 'Fine', it: 'Sport', hook: '3.5 – 4.5 mm', st: '16–20 sc', use: 'Baby items, summer tops' },
    { n: 3, name: 'Light', it: 'DK', hook: '4.5 – 5.5 mm', st: '12–17 sc', use: 'Light sweaters, amigurumi' },
    { n: 4, name: 'Medium', it: 'Worsted / Aran', hook: '5.5 – 6.5 mm', st: '11–14 sc', use: 'Blankets, hats, scarves' },
    { n: 5, name: 'Bulky', it: 'Chunky', hook: '6.5 – 9 mm', st: '8–11 sc', use: 'Quick scarves, throws' },
    { n: 6, name: 'Super Bulky', it: 'Super chunky', hook: '9 – 15 mm', st: '7–9 sc', use: 'XXL blankets, pillows' },
    { n: 7, name: 'Jumbo', it: 'Jumbo / T-shirt yarn', hook: '15 mm +', st: '≤ 6 sc', use: 'Baskets, rugs' }
  ];

  /* ---------------------------------------------------------------- */
  /*  GENERATORS: a new project every day                              */
  /* ---------------------------------------------------------------- */
  const PAL = [
    { n: 'Peach & Mint', c: ['#FF9F80', '#7FD6BE', '#FFD3B8', '#3FAF94'], bg: '#FFF0E8' },
    { n: 'Sunset', c: ['#FF6B6B', '#FFA36C', '#FFD66B', '#C44569'], bg: '#FFF1E0' },
    { n: 'Lavender', c: ['#8E7CF0', '#FF9EC2', '#D9CCFF', '#5A4BB8'], bg: '#F2EDFF' },
    { n: 'Ocean', c: ['#3D8BFF', '#7FD6BE', '#8EC5FF', '#1F5FAF'], bg: '#E6F2FF' },
    { n: 'Forest', c: ['#5E9E6E', '#E3C78A', '#A8D5A2', '#8A5A3B'], bg: '#EEF6E8' },
    { n: 'Candy', c: ['#FF7AB6', '#8EC5FF', '#FFE27A', '#B37CF0'], bg: '#FFEFF6' },
    { n: 'Autumn', c: ['#C8553D', '#F28F3B', '#588B8B', '#FFD5A5'], bg: '#FFF2E6' },
    { n: 'Nordic', c: ['#2E4057', '#D1495B', '#8FA6BF', '#EDAE49'], bg: '#EEF1F6' },
    { n: 'Lemonade', c: ['#FFC93C', '#3BCEAC', '#EE4266', '#FFF3B0'], bg: '#FFFBE6' },
    { n: 'Raspberry', c: ['#D81E5B', '#F0A6CA', '#FDBA74', '#7C3AED'], bg: '#FFEAF1' }
  ];
  const LET = 'ABCD';
  const pick = (r, a) => a[Math.floor(r() * a.length)];

  function genMandala(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const R = 4 + Math.floor(r() * 3); const shell = r() > 0.35;
    const col = (i) => ({ color: pal.c[i % 4], cn: 'Color ' + LET[i % 4] });
    const steps = [st('Getting ready', `Get the colors from the “${pal.n}” palette, DK cotton and a 4 mm hook. Leave a 10 cm tail at every color change.`)];
    steps.push(st('Round 1', 'Magic ring (MR). 3 ch (counts as 1 dc), then 11 dc into the ring. Pull tight and join with 1 sl st into the 3rd ch.', Object.assign({ count: '12 stitches' }, col(0))));
    for (let k = 2; k <= R; k++) {
      const n = k - 2;
      const next = n === 1 ? '1 dc in the next stitch' : `1 dc in each of the next ${n} stitches`;
      const last = n === 1 ? '1 dc in the last stitch' : `1 dc in each of the last ${n} stitches`;
      const d = k === 2
        ? 'Join the new color in any stitch. 3 ch and 1 dc in the same stitch, then 2 dc in every stitch around. Join with 1 sl st into the 3rd ch.'
        : `Join the new color. 3 ch and 1 dc in the same stitch, then *${next}, 2 dc in the following one*; repeat from * 10 more times and finish with ${last}. Join with 1 sl st.`;
      steps.push(st('Round ' + k, d, Object.assign({ count: 12 * k + ' stitches' }, col(k - 1))));
    }
    if (shell) steps.push(st(`Round ${R + 1} · shells`, 'Join the new color. *Skip 1 stitch, 5 dc in the next stitch, skip 1 stitch, 1 sl st in the next*; repeat all the way around.', Object.assign({ count: 3 * R + ' shells', tip: 'The shells should lie flat: if they ruffle, loosen your tension.' }, col(R))));
    steps.push(st('Finishing', 'Weave in all the tails on the back and steam-block the mandala, pinning it in place.'));
    const dia = Math.round(R * 2.2 + (shell ? 2 : 0));
    return {
      id: `gen-mandala-${seed}`, gen: true, title: `${pal.n} Mandala`, subtitle: shell ? 'With a shell border' : 'Striped color circle',
      cat: 'decorazioni', level: shell ? 2 : 1, time: `${30 + R * 8} min`, hook: '4 mm', yarn: 'DK cotton, 4 colors', size: `Ø ${dia} cm`,
      bg: pal.bg, art: { k: shell ? 'mandala' : 'coaster', c: pal.c.concat(pal.c) }, stitches: ['am', 'cat', 'ma', 'mbss', 'colore'],
      tags: ['mandala', 'round', 'generated', pal.n.toLowerCase()],
      desc: `A ${R + (shell ? 1 : 0)}-round mandala in the “${pal.n}” palette. Perfect as a trivet, wall decor or doily.`,
      materials: [`DK cotton in 4 “${pal.n}” colors`, '4 mm crochet hook', 'Yarn needle'], steps
    };
  }

  function genGranny(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const R = 4 + Math.floor(r() * 4);
    const col = (i) => ({ color: pal.c[i % 4], cn: 'Color ' + LET[i % 4] });
    const steps = [
      st('Foundation', 'Ch 4 and join into a ring with 1 sl st into the first ch.', col(0)),
      st('Round 1', '3 ch (=1 dc), 2 dc into the ring, 2 ch. *3 dc into the ring, 2 ch*; repeat from * 2 more times. Join with 1 sl st into the 3rd ch.', Object.assign({ count: '4 clusters' }, col(0))),
      st('Round 2', 'Join the new color in a corner space: 3 ch, 2 dc, 2 ch, 3 dc. *1 ch, in the next corner (3 dc, 2 ch, 3 dc)*; repeat from * 2 more times. 1 ch and join with 1 sl st.', Object.assign({ count: '8 clusters' }, col(1)))
    ];
    for (let k = 3; k <= R; k++) {
      const n = k - 2; const side = n === 1 ? '1 ch, 3 dc in the next space' : `[1 ch, 3 dc in the next space] ${n} times`;
      steps.push(st('Round ' + k, `Join the new color in a corner: (3 ch, 2 dc, 2 ch, 3 dc). *${side}, 1 ch, in the corner (3 dc, 2 ch, 3 dc)*; repeat from * 2 more times. Then ${side}, 1 ch and join with 1 sl st.`, Object.assign({ count: 4 * k + ' clusters' }, col(k - 1))));
    }
    steps.push(st('Finishing', `Weave in the tails and block the square. Idea: make 4 and join them with 1 sl st in the back loop only (BLO) for a “${pal.n}” pillow.`));
    return {
      id: `gen-granny-${seed}`, gen: true, title: `${pal.n} Granny`, subtitle: `${R} rounds of color`,
      cat: 'decorazioni', level: R > 5 ? 2 : 1, time: `${20 + R * 8} min`, hook: '4.5 mm', yarn: 'Worsted yarn, 4 colors', size: `${Math.round(R * 2.6)} × ${Math.round(R * 2.6)} cm`,
      bg: pal.bg, art: { k: 'granny', c: [pal.c[0], pal.c[1], pal.c[2], pal.c[3], pal.c[0], pal.c[1], pal.c[2]].slice(0, R).reverse() }, stitches: ['cat', 'mbss', 'ma', 'colore'],
      tags: ['granny', 'square', 'generated', pal.n.toLowerCase()],
      desc: `A ${R}-round granny square in “${pal.n}” colors. Every round changes color: great practice for corners.`,
      materials: [`Worsted yarn in 4 “${pal.n}” colors`, '4.5 mm crochet hook', 'Yarn needle'], steps
    };
  }

  function genAmi(seed) {
    const r = rng(seed); const pal = pick(r, PAL);
    const kinds = [
      { n: 'Mochi', extra: 'Embroider two pink cheeks with a few cotton stitches and a tiny “w”-shaped mouth.', ears: null },
      { n: 'Kitty', extra: 'Ears (× 2): 4 sc in a magic ring (MR), (1 sc, inc) × 2 (6), 1 round of 6 sc. Flatten and sew onto the top of the head.', ears: 'cat' },
      { n: 'Bunny', extra: 'Ears (× 2): 6 sc in a magic ring (MR), (1 sc, inc) × 3 (9), 4 rounds of 9 sc. Fold in half and sew on top.', ears: 'bunny' },
      { n: 'Teddy', extra: 'Ears (× 2): 6 sc in a magic ring (MR), 1 round of 6 sc. Sew onto the sides of the head.', ears: 'bear' },
      { n: 'Chick', extra: 'Embroider a little orange beak between the eyes and knot 3 strands on top for the tuft.', ears: 'tuft' }
    ];
    const kind = pick(r, kinds); const n = 3 + Math.floor(r() * 4); const m = 6 * n; const color = kind.n === 'Chick' ? '#FFD23F' : pick(r, pal.c);
    const steps = [st('How it works', 'You work in a spiral without joining the rounds. Place a stitch marker in the first stitch of each round.'),
      st('Round 1', '6 sc in a magic ring (MR).', { count: '6 stitches', color, cn: 'Body' }),
      st('Round 2', 'inc × 6.', { count: '12 stitches' })];
    let g = 3;
    for (let k = 3; k <= n; k++, g++) steps.push(st('Round ' + g, `(${k - 2} sc, inc) × 6.`, { count: 6 * k + ' stitches' }));
    const plain = Math.max(2, n - 1); const a = g, b = g + plain - 1; g = b + 1;
    steps.push(st(`Rounds ${a} – ${b}`, '1 sc in each stitch.', { count: m + ' stitches', rows: plain }));
    const eyeRow = a + Math.floor(plain / 2);
    steps.push(st('Face', `Insert the safety eyes between rounds ${eyeRow - 1} and ${eyeRow}, ${Math.max(3, n + 1)} stitches apart.`));
    for (let k = n; k >= 3; k--, g++) {
      const cnt = 6 * (k - 1);
      steps.push(st('Round ' + g, `(${k - 2} sc, dec) × 6.${cnt === 12 ? ' Now stuff it firmly.' : ''}`, { count: cnt + ' stitches' }));
    }
    steps.push(st('Round ' + g, 'dec × 6.', { count: '6 stitches' }));
    steps.push(st('Closing', 'Cut, leaving 15 cm, thread the yarn through the front loops of the 6 stitches and pull to close. Hide the tail inside.'));
    steps.push(st('Details', kind.extra));
    return {
      id: `gen-ami-${seed}`, gen: true, title: `${pal.n} ${kind.n}`, subtitle: 'Pocket-size amigurumi',
      cat: 'amigurumi', level: 1, time: `${40 + n * 10} min`, hook: '2.5 mm', yarn: '3 mm cotton', size: `Ø ${Math.round(n * 1.15)} cm`,
      bg: pal.bg, art: { k: 'ball', c: [color], ears: kind.ears }, stitches: ['am', 'mb', 'aum', 'dim'],
      tags: ['amigurumi', 'kawaii', 'generated', kind.n.toLowerCase()],
      desc: `A little round ${kind.n.toLowerCase()} with ${m} stitches at its widest round. Made in an hour and fits in your pocket!`,
      materials: ['3 mm cotton', '2.5 mm crochet hook', '6–8 mm safety eyes', 'Stuffing', 'Stitch marker'], steps
    };
  }

  function genSciarpa(seed) {
    const r = rng(seed); const pal = pick(r, PAL); const w = pick(r, [24, 28, 32]);
    const nS = 3 + Math.floor(r() * 2); const unit = []; for (let i = 0; i < nS; i++) unit.push({ c: i % 3, rows: 2 + Math.floor(r() * 5) });
    const unitRows = unit.reduce((s, u) => s + u.rows, 0); const reps = Math.max(3, Math.round(170 / unitRows)); const tot = unitRows * reps + 1;
    const fringe = r() > 0.4;
    const col = (i) => ({ color: pal.c[i], cn: 'Color ' + LET[i] });
    const steps = [
      st('Foundation chain', `With color A, ch ${w + 2}.`, col(0)),
      st('Row 1', '1 hdc in the 3rd ch from the hook and in each ch across. Turn.', Object.assign({ count: w + ' stitches' }, col(0))),
      st('How to work each row', '2 ch (doesn’t count as a stitch), 1 hdc in each stitch, turn. To change color, use the new yarn for the last yarn over of the previous row.')
    ];
    unit.forEach((u, i) => steps.push(st(`Repeat unit · stripe ${i + 1}`, `${u.rows} rows of hdc in color ${LET[u.c]}.`, Object.assign({ count: w + ' stitches', rows: u.rows }, col(u.c)))));
    steps.push(st('Repeat', `Repeat the ${unitRows}-row unit ${reps} times in total (about ${tot} rows).`, { rows: reps, tip: 'If a stripe is 2–4 rows tall, carry the unused yarn up the edge instead of cutting it.' }));
    if (fringe) steps.push(st('Fringe', 'Cut 25 cm strands in all the colors and knot them in pairs along the short ends, alternating colors.'));
    steps.push(st('Finishing', 'Weave in the tails and give it a light steam without flattening it.'));
    return {
      id: `gen-sciarpa-${seed}`, gen: true, title: `${pal.n} Scarf`, subtitle: `Striped, ${nS} stripes`,
      cat: 'abbigliamento', level: 1, time: `${Math.round(tot / 20)} h`, hook: '5.5 mm', yarn: 'Aran yarn, 3 colors', size: `${Math.round(w * 0.62)} × ${Math.round(tot * 0.9)} cm`,
      bg: pal.bg, art: { k: 'scarf', c: unit.map((u) => pal.c[u.c]) }, stitches: ['cat', 'mma', 'colore'],
      tags: ['scarf', 'stripes', 'generated', 'winter', pal.n.toLowerCase()],
      desc: `A striped scarf with a one-of-a-kind color rhythm in the “${pal.n}” palette. Just half double crochet: as relaxing as a podcast.`,
      materials: [`Aran yarn in 3 “${pal.n}” colors (about 100 g each)`, '5.5 mm crochet hook', 'Yarn needle'], steps
    };
  }

  const gen = { mandala: genMandala, granny: genGranny, ami: genAmi, sciarpa: genSciarpa };
  const genInfo = {
    mandala: { n: 'Mandala', e: '🌼' }, granny: { n: 'Granny', e: '🟪' }, ami: { n: 'Amigurumi', e: '🧸' }, sciarpa: { n: 'Scarf', e: '🧣' }
  };

  const categories = [
    { id: 'tutti', n: 'All', e: '✨' }, { id: 'amigurumi', n: 'Amigurumi', e: '🧸' }, { id: 'casa', n: 'Home', e: '🏡' },
    { id: 'accessori', n: 'Accessories', e: '👜' }, { id: 'abbigliamento', n: 'Clothing', e: '🧣' }, { id: 'decorazioni', n: 'Decor', e: '🌸' },
    { id: 'tecniche', n: 'Techniques', e: '🎓' }
  ];

  window.GOMITOLO = { patterns, stitches, learnGroups, abbr, tips, hooks, weights, gen, genInfo, categories, hash, rng, PAL, abbrRe };
})();
