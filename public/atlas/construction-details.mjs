import {rnDetails} from './rn.mjs';
import {fineDetails} from './fine.mjs';
import {bellissimaDetails} from './bellissima.mjs';
import {youngDetails} from './young.mjs';

export const constructionDetails={
 rn:rnDetails,
 fine:fineDetails,
 bellissima:bellissimaDetails,
 young:youngDetails,
 mardaev:`<p>Begin with a maximal point and a three point antichain below it. We give the maximum the colour {p,q}, and {p}, {q}, and ∅ for each point on the antichain.</p>
<p>A <em>Mardaev letter</em> <span class="math">M<sub>n+2</sub></span> is a sequence of a three point antichain, followed by <span class="math">n</span> many points. The comparisons are made as follows:</p>
<div class="math-block">x<sub>k+1</sub> &lt; x<sub>k</sub>, &nbsp; y<sub>k+1</sub> &lt; y<sub>k</sub><br>x<sub>k+1</sub> &lt; y<sub>k−1</sub>, &nbsp; y<sub>k+1</sub> &lt; x<sub>k−1</sub></div>
<p>When stacking together different Mardaev letters, we can make a <em>Mardaev word</em> <span class="math">M<sub>w</sub></span>. This is done by gluing together two Mardaev letters along their antichains.</p>
<p>Given an <span class="math">ω</span>-word <span class="math">w∈Σ<sup>ω</sup></span>, for <span class="math">Σ</span> a finite alphabet, this allows us to construct one Mardaev frame for each <span class="math">ω</span>-word. Special Mardaev frames -- those corresponding to the algebras studied by Mardaev in his 1987 paper -- give rise to pre-locally tabular logics.</p>`,
 wb:`<p>This frame is constructed layer by layer, employing specific graphs -- so called <span class="math">θ</span>-graphs -- to determine the attachment of points. Specifically, one starts with an almost complete graph <span class="math">G<sub>0</sub></span> with four vertices and <span class="math">5</span> edges, and obtains the layer <span class="math">D<sub>0</sub></span>.</p>
<p>The elements of the graph <span class="math">G<sub>1</sub></span> consist of the edges of <span class="math">G<sub>0</sub></span>. This gives the layer <span class="math">D<sub>1</sub></span>, where an edge <span class="math">e∈D<sub>1</sub></span> is below all points which it is <em>not</em> connected to. The graph <span class="math">G<sub>1</sub></span> is a pentagon, with one extra connection between <span class="math">v<sub>0</sub></span> and <span class="math">v<sub>2</sub></span>, and we repeat the design of the layer <span class="math">D<sub>2</sub></span>. More generally:</p>
<div class="math-block">D<sub>i+1</sub> = E(G<sub>i</sub>)<br>e &lt; v ⇔ v ∉ e, &nbsp; v ∈ D<sub>i</sub><br>|D<sub>i+1</sub>| = |D<sub>i</sub>| + 1</div>
<p>The idea of the construction is to ensure that the width grows unboundedly, whilst the poset remains an <span class="math">ω</span>-upset - every point sees finitely many points, and the downset of each point is cofinite. The construction then adds the compactification point <span class="math">∞</span>. The conditions for how this is achieved are technical, and depend on some graph-theoretic facts.</p>
<p><a class="inline-link" href="graph-width.html">How do later graphs gain width?</a></p>`
};
