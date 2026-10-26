const math=body=>`<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>${body}</mrow></math>`;
const U2=math('<mi>U</mi><mo>(</mo><mn>2</mn><mo>)</mo>');
const X2=math('<msub><mi>X</mi><mn>2</mn></msub>');
const variable=letter=>math(`<mi>${letter}</mi>`);
const colour=letters=>math('<mo>{</mo>'+letters.map(letter=>`<mi>${letter}</mi>`).join('<mo>,</mo>')+'<mo>}</mo>');

export const motivations={
 rn:'Rieger and Nishimura introduced this construction to study free Heyting algebras on one generator. In particular, the ladder displayed here is the Esakia dual to this algebra.',
 bellissima:[
  'Bellissima’s universal model gives a representation of the free Heyting algebra on two generators by building the "image-finite part" of the dual space. The construction is recursive, and proceeds by layers, taking into account the structure of successors and the "colors" -- the propositional variables satisfied by each point.',
  `Bellissima’s universal model ${U2} is the image-finite part part of ${X2}. We begin with four maximal points, one of each colour ${math('<mo>∅</mo>')}, ${colour(['p'])}, ${colour(['q'])}, ${colour(['p','q'])}.`,
  `At each round we build a new layer of ${U2} as follows: pick a finite antichain ${variable('A')} from the existing model, containing at least one point from the preceding layer, and a color ${variable('C')} which is below the color of each point in this antichain; then add a point which has ${variable('A')} as its successors, and is colored ${variable('C')}.`,
  `The interactive display shows the four maximal points, and a selection of 18 points (the layers grow extremely quickly -- at the third layer several hundreds or thousands of points). The color upsets in the end are given by the points sharing the colors ${variable('p')} and ${variable('q')}.`,
  'At the end of the construction, the poset will contain a copy of each (irreducible) 2-generated Kripke model.'
 ].join('</p><p>'),
 hmmq:'Coming soon',
 fine:'K. Fine introduced this frame to study incompleteness of S<sub>4</sub> logics. V. Shehtman later adapted it to obtain an incomplete superintuitionistic logic. It has served as a useful source of counterexamples: for instance, G. Bezhanishvili, D. Gabelaia, and M. Jibladze employed it in their negative solution to Kuznetsov’s problem for bi-Heyting algebras.',
 mardaev:'The dual algebras were introduced to study pre-locally tabular superintuitionistic logics and to prove that there are continuum many of them.',
 wb:'This frame was introduced in our studies of pre-local tabularity and local tabularity, seeking a width-bounded locally tabular logic: it is not locally tabular, but all finitely generated algebras of bounded width in its variety are finite. Every finitely generated algebra in this variety is co-Hopfian.',
 young:" This frame arose in our studies of completeness theory, seeking the extent of the Artin-gluing based completion method which was found to work for the Fine general frame. ",
 localic:'Coming soon'
};
