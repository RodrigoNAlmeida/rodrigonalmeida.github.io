import {motivations} from './motivation.mjs';

// Reference IDs resolve against content.mjs. Construction keys preserve explorer links.
// Index blurbs show the first motivation paragraph; dedicated pages use the full text.
const introduction=key=>({
  summary:motivations[key].split('</p><p>')[0].replace(/<[^>]*>/g,''),
  introductionHTML:`<p>${motivations[key]}</p>`
});
const comingSoon={comingSoon:true,summary:'Coming soon',introductionHTML:'<p>Coming soon</p>',referenceIds:[]};

export const referenceTopics = [
  {
    id: 'rieger-nishimura',
    title: 'The Rieger–Nishimura ladder',
    construction: 'rn',
    ...introduction('rn'),
    referenceIds: ['rieger', 'nishimura', 'bezhanishvili', 'truss']
  },
  {
    id: 'fine',
    title: 'Fine general frame',
    construction: 'fine',
    ...introduction('fine'),
    referenceIds: ['fine', 'shehtman', 'bgj']
  },
  {
    id: 'mardaev',
    title: 'Mardaev frames',
    construction: 'mardaev',
    ...introduction('mardaev'),
    referenceIds: ['mardaev', 'almeida-carai', 'esakia', 'bezhanishvili-grigolia']
  },
  {
    id: 'wb',
    title: 'WB graph frame',
    construction: 'wb',
    ...introduction('wb'),
    referenceIds: ['theta-graphs', 'subdivision-complement', 'nonincidence', 'crowns', 'layered-crowns', 'girth-packing', 'hmmq', 'bezhanishvili-grigolia'],
    note: 'These publications provide related graph transformations, crown posets, graph-packing methods and Esakia constructions; they do not identify the complete WB progression.'
  },
  {
    id: 'young-lattice',
    title: 'Young lattice Fine frame',
    construction: 'young',
    summary: "Young's lattice of partitions was introduced by A. Young in the study of integer partitions in combinatorics and number theory. This particular construction models the Fine general frame, and replaces its \"kernel\" (the bottom ascending part) by Young's lattice of partitions, obtaining interesting properties.",
    introductionHTML: "<p> This frame arose in our studies of completeness theory, seeking the extent of the Artin-gluing based completion method which was found to work for the Fine general frame. </p>",
    referenceIds: ['young-original', 'stanley', 'fulton']
  },
  {
    id: 'double-omega',
    title: 'Double omega frame',
    construction: 'localic',
    ...comingSoon
  },
  {
    id: 'hmmq',
    title: 'Hyttinen–Martins–Moraschini–Quadrellaro',
    construction: 'hmmq',
    ...comingSoon
  },
  {
    id: 'bellissima',
    title: 'Bellissima’s construction',
    construction: 'bellissima',
    ...introduction('bellissima'),
    referenceIds: ['bellissima', 'darniere', 'bezhanishvili', 'rieger', 'nishimura', 'truss', 'esakia']
  },
  {
    id: 'duality',
    title: 'Esakia duality and free Heyting algebras',
    construction: null,
    summary: 'Esakia duality presents a spatial and combinatorial way of representing Heyting algebras, using special compact ordered spaces. Other dualities exist, which employ other representations, such as Bellissima’s, and Ghilardi’s finitely presented duality.',
    referenceIds: ['esakia', 'bezhanishvili', 'bellissima', 'darniere', 'truss', 'ghilardi', 'bezhanishvili-grigolia', 'hmmq']
  }
];
