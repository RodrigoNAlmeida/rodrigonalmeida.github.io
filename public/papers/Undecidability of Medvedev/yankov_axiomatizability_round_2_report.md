# Medvedev logic and Yankov axiomatizability

## Alternative-route research report — 9 September 2026

### Executive verdict

The problem is **not decided**. Neither

\[
Y_{ML}=ML
\]

nor

\[
Y_{ML}\subsetneq ML
\]

has been proved. No claim to the contrary survived the independent audit. A
literature search through 9 September 2026 found no published resolution of
this exact question; recent work still describes basic axiomatization questions
about Medvedev logic as unresolved [Chen--Ding 2024].

This round nevertheless makes several concrete advances.

1. The eight-point target `8:1481`, which was left open in the previous
   ledger, is an **absolute nonimage**: it is not a p-morphic image of
   \(M_I\) for any finite or infinite set \(I\). At the eight-point
   boundary, 385 of the 2,045 rooted frames are finite Medvedev images and
   1,660 are absolute nonimages. Together with the earlier smaller censuses,
   this classifies every target of size at most eight.

2. All 16,999 rooted nine-point posets were screened. Only 282 survived the
   first battery of proved folding or nonimage tests. Within this frozen set,
   256 have audited finite witnesses, 20 are now proved absolute nonimages,
   and exactly six remain unresolved. Hence a nine-point counterexample to
   finite folding, if one exists, must be one of six explicit frames listed
   below.

3. A new **periodic finite-trace obstruction theorem** converts certain
   infinite Back requirements into a finite reachability game. It gave seven
   new absolute certificates among the hard nine-point targets. Two further
   target-local principles, the uniform-row obstruction and the exclusive-axis
   union obstruction, supplied the rest of the new exclusions.

4. On the Esakia route, every continuous finite p-image of a closed upset was
   shown to extend over a clopen upset. Applied to the tiling-generated
   algebra \(H\), this reduces every finite Jankov obstruction to a total
   p-map on a bounded flag face. This closes the previous topology gap. The
   remaining step is fresh finite realization of the resulting target diagram;
   an audited 13-point example shows why literal finite sampling cannot do it.

5. On the simplicial route, an exact Scott-envelope decomposition was proved.
   A counterexample cannot be caused by one hidden apex label: it must have at
   least two hidden labels, including one incomparable with the Scott root.
   Any construction controlled by finitely many (even blockwise) free
   ultrafilter flags also folds finitely.

6. On the equality/FMP route, the question was reduced exactly to residual
   finiteness of the finite-rank free \(Y_{ML}\)-algebras. Standard and
   least-selective filtrations were shown to be unsafe in a uniform way; the
   standard insertion, deletion, projectivity, and structural-completeness
   shortcuts examined here do not supply a repair.

Thus the honest outcome is a sharp reduction and a much smaller search
frontier, not a yes/no theorem.

---

## 1. Exact logical setup and quantifier discipline

For a nonempty set \(I\), write

\[
M_I=(\mathcal P^+(I),\supseteq).
\]

For finite \(|I|=n\), write \(M_n\). A coloring
\(c:\mathcal P^+(I)\to P\) is an onto p-morphism precisely when, for every
nonempty \(A\subseteq I\),

\[
c\bigl[\mathcal P^+(A)\bigr]=\uparrow c(A). \tag{1}
\]

This single cone equation is the basis of every proof and computation in this
report.

Let

\[
Y:=Y_{ML}=IPC+\{J(P):P\text{ finite rooted and }J(P)\in ML\}.
\]

The following facts from the attached source note and the previous audited
ledger are fixed inputs.

* \(Y\subseteq ML\).
* Finite rooted \(Y\)-frames and finite rooted \(ML\)-frames coincide.
* For finite rooted \(P\),

  \[
  P\models ML\quad\Longleftrightarrow\quad
  \exists n\;M_n\twoheadrightarrow_p P.
  \]

* Therefore

  \[
  Y=ML\quad\Longleftrightarrow\quad Y\text{ has the finite model property}.
  \tag{2}
  \]

For a fixed infinite base \(I\), let \(FF_I\) be the assertion

> every finite rooted p-image of every generated face \(M_A\),
> \(\varnothing\ne A\subseteq I\), is already a p-image of some finite
> \(M_n\).

Then

\[
FF_I\quad\Longleftrightarrow\quad M_I\models Y. \tag{3}
\]

In particular, the attached note supplies a canonical ML formula \(\rho_W\)
which is refuted on \(M_{\mathbb N}\). Hence

\[
FF_{\mathbb N}\quad\Longrightarrow\quad
M_{\mathbb N}\models Y\text{ and }M_{\mathbb N}\not\models ML
\quad\Longrightarrow\quad Y\subsetneq ML. \tag{4}
\]

The analogous implication holds for the four-end tiling space used below.

The direction in (4) is important. Finding a finite target covered by an
infinite \(M_I\) but by no finite \(M_n\) would **obstruct** this separator
strategy; it would not itself prove strictness. Conversely, the failure of a
particular folding principle does not prove equality. Equality requires the
FMP in (2), while strictness requires an actual \(Y\)-model refuting an ML
theorem.

The general Jankov criterion says that an intermediate logic is Jankov
axiomatizable exactly when every external counteralgebra has an appropriate
finite \(HS\)-counteralgebra [Bezhanishvili--Bezhanishvili, Theorem 3.13]. In
the present special case this is exactly the finite-extraction problem, not an
auxiliary shortcut.

---

## 2. Ramsey/folding route

### 2.1 Exact combinatorial form

If the singleton coordinates have maximal colors \(K=\operatorname{Max}P\),
then every face has a maximal support \(U\subseteq K\). The problem is a
partite hereditary-coloring CSP: color every nonempty face so that (1) holds,
with the color constrained to the support fiber

\[
P_U=\{p\in P:\operatorname{Max}(\uparrow p)=U\}.
\]

Ordinary Ramsey homogenization is too weak. It controls finitely many colors
of bounded-size subsets, while (1) simultaneously quantifies over every
subface and requires target-dependent witnesses. The arbitrary hereditary
top-color families already available for the two-point chain show that no
bounded witness-preserving arity suffices. Hales--Jewett,
Graham--Rothschild, Erdős--Rado, Hindman, and Milliken--Taylor type theorems do
not by themselves supply the missing fresh recoloring.

### 2.2 Finite upper-separator theorem

Start with every maximal point \(m\), at cost one. Suppose already generated
points \(q\ge p\) contain a finite nonempty set \(S\) such that

\[
\uparrow p\cap\bigcap_{q\in S}\downarrow q=\{p\}. \tag{5}
\]

Then add \(p\), at cost the sum of the costs of the points in \(S\). Given a
face \(C\) of color \(p\), Back chooses every already constructed \(q\)-core
\(E_q\) **inside \(C\)**. For \(E=\bigcup_{q\in S}E_q\subseteq C\),
monotonicity gives \(p\le c(E)\), while \(E_q\subseteq E\) gives
\(c(E)\le q\) for every \(q\in S\). Condition (5) therefore forces
\(c(E)=p\). Consequently every occurrence of a generated point contains a
finite occurrence bounded by its cost.

For the previous residual target `8:1481`, with covers

\[
\begin{aligned}
&0<1,2;\qquad 1<4,5;\qquad 2<3;\\
&3<4,5;\qquad 4<6,7;\qquad 5<6,7,
\end{aligned}
\]

the costs are

\[
c(6)=c(7)=1,\quad c(4)=c(5)=2,\quad
c(1)=c(3)=4,\quad c(0)=8.
\]

Thus any arbitrary cover would contain a root face of size at most eight.
The previous timeout-free exact check proved that no \(M_n\), \(n\le8\),
covers the target. Therefore `8:1481` is an absolute nonimage. This repairs
the earlier ledger's last unresolved eight-point case.

### 2.3 Periodic clean-crown trace theorem

Let \(E\) be a finite clean crown face with color \(r\); the color of every
nonempty trace \(T\subseteq E\) is then fixed. Prescribe a periodic sequence
of current labels \(p_i\), and for each phase a unique common lower

\[
\downarrow p_i\cap\downarrow r=\{l_i\}
\]

and a Back chain

\[
l_i<q_{i,1}<\cdots<q_{i,t_i}=p_{i+1}.
\]

Starting from a \(p_i\)-face \(C_i\), the face \(C_i\cup E\) has color
\(l_i\). Repeated Back produces nested faces with the prescribed \(q\)-labels,
ending in \(C_{i+1}\). Outside \(E\), all later chosen faces are contained in
all earlier chosen faces. Therefore:

1. a \(q\)-face may have trace \(T\) only if \(q\le c(T)\); and
2. if a later pair \((q,T)\) and an earlier pair \((q',S)\) have
   \(T\subseteq S\), monotonicity requires \(q'\le q\).

There are only finitely many label/trace pairs. Hence the existence of an
infinite witness is overapproximated by a finite reachability graph. If this
graph has no reachable cycle, no arbitrary-base p-map exists. The exhaustive
game and its input checks were independently rerun; each accepted certificate
also has a short hand proof.

For example, consider the nine-point frame

\[
0<1,2;\;1<3;\;2<4,6;\;3<5;\;4<7,8;\;
5<6;\;6<7,8. \tag{6}
\]

Fix a clean two-face \(e=\{x,y\}\) of color 4 and a face \(C_0\) of color
5. Since 0 is the unique common lower of 4 and 5, Back along
\(0<1<3<5\) gives

\[
A_k:1\subseteq C_k\cup e,\qquad
B_k:3\subseteq A_k,\qquad
C_{k+1}:5\subseteq B_k.
\]

Put \(\alpha_k=A_k\cap e\), \(\beta_k=B_k\cap e\), and
\(\gamma_k=C_k\cap e\). No 1-, 3-, or 5-face contains all of \(e\).
Since \(A_k,B_k\not\subseteq C_k\), while their parts outside \(e\) lie in
\(C_k\), one gets

\[
\alpha_k=\beta_k=\{t_k\}\subset e,
\qquad t_k\notin\gamma_k.
\]

The same containment argument forces \(t_{k+1}\ne t_k\), so
\(t_{k+2}=t_k\). But outside \(e\), \(A_{k+2}\subseteq B_k\); their traces
are now also equal, hence \(A_{k+2}\subseteq B_k\). This contradicts a
color-1 subface of a color-3 face. No cardinality assumption occurs.

Periodic variants of this argument produced absolute certificates for frozen
nine-point candidates 4, 25, 28, 100, and 102; the one-cycle version handled
139 and 144.

### 2.4 Uniform rows and exclusive-axis unions

Two further base-independent principles were proved.

**Uniform-row obstruction.** A three-coordinate face determines whether a
fixed-axis row of clean two-face colors can mix two colors. The finite target
itself lists every possible boundary cone, so this is a tiny exhaustive local
test, not a bounded search over source dimensions. When mixing is impossible,
one clean cell forces a whole row to be uniform. Adjoining that row coordinate
to a suitably chosen face forces a unique lower color whose Back witness must
both contain and not contain the row. This certifies candidates 20, 36, 50,
98, 103, 133, and 146 as absolute nonimages.

For candidate 146, for instance, cross cells have colors 4 or 5. A fixed
color-8 coordinate cannot have both kinds: a three-face with cells 4 and 5 has
no possible label because color 2 would require a color-6 subface and color 0
would require still more missing labels. A color-4 cell therefore yields a
uniform color-4 row. A color-3 face cannot contain that row coordinate.
Adjoining it forces color 0; a Back-required color-1 subface either stays
inside the color-3 face or contains a color-4 cell. Both violate monotonicity.

**Exclusive-axis union obstruction.** Suppose a \(p\)-face of support \(U\)
and a \(q\)-face of support \(W\) are united. The union must take a common
lower label of support \(U\cup W\). For **every possible** such union label
\(s\), suppose Back requires a label supported inside \(U\setminus W\) whose
witness can use no coordinate introduced by the \(q\)-face and therefore lies
in the original \(p\)-face. If that label is not above \(p\), this is
impossible; the symmetric statement also holds. This gives short absolute
proofs for candidates 24 and 99 (and independently recovers 98). In those
applications the possible union label is unique.

### 2.5 Nine-point census

The enumeration contains 16,999 unlabeled rooted nine-point posets. Proved
support, two-face, union, clean-crown, principal-diagram, Segal,
replacement-connectivity, upper-separator, and unique-maximum tests leave only
282 possible finite-folding counterexamples. A frozen copy of that list was
used throughout to prevent index drift.

Within the 282:

| Status | Count | Certification |
|---|---:|---|
| Finite Medvedev image | 256 | 255 exact witnesses by dimension 7; one additional verified dimension-8 witness |
| Absolute nonimage | 20 | forced-axis, `8:1481` cone, periodic trace, uniform-row, or exclusive-axis certificate |
| Unresolved | 6 | no finite witness through dimension 9; no arbitrary witness or absolute certificate |

The 20 absolute indices are

\[
\{2,4,7,20,24,25,26,28,36,50,98,99,100,102,103,133,139,144,146,256\}.
\]

The six unresolved frozen indices and their cover relations are:

| Index | Covers |
|---:|---|
| 9 | \(0<1,2,3,4;\ 1<5,6;\ 2<5;\ 3<6;\ 4<6;\ 5<7,8;\ 6<7,8\) |
| 34 | \(0<1,2,3;\ 1<4,5;\ 2<5,6;\ 3<6;\ 4<8;\ 5<7,8;\ 6<7,8\) |
| 43 | \(0<1,2,3;\ 1<4,6;\ 2<5,6;\ 3<5,6;\ 4<7,8;\ 5<8;\ 6<7,8\) |
| 45 | \(0<1,2,3;\ 1<4;\ 2<5,6;\ 3<5;\ 4<6;\ 5<7,8;\ 6<7,8\) |
| 68 | \(0<1,2,3;\ 1<4,5,6;\ 2<4,5;\ 3<6;\ 4<7,8;\ 5<8;\ 6<7,8\) |
| 74 | \(0<1,2,3;\ 1<4,5,6;\ 2<4,6;\ 3<5,6;\ 4<7,8;\ 5<7,8;\ 6<8\) |

Thus any nine-point failure of finite folding is isomorphic to one of these
six. A final exact run found no cover from \(M_9\) for any of them. Solver
nonexistence below a stated dimension is not being promoted to an absolute
result.

---

## 3. Simplicial and coalgebraic route

### 3.1 Exact translations

For a finite target \(P\), the sets

\[
X_P(S)=\{\text{exact \(P\)-colorings of }\mathcal P^+(S)\}
\]

form a presheaf on finite nonempty sets under direct-image precomposition.
Finite folding asks for a finite simplex carrying the same finite target
quotient that occurs on an infinite simplex. In coalgebraic language, define

\[
D(I)=\bigl(\mathcal P^+(I),A\mapsto\mathcal P^+(A)\bigr)
\]

for the nonempty full-powerset functor. Equation (1) says exactly that

\[
D(I)\longrightarrow(P,p\mapsto\uparrow p)
\]

is a coalgebra morphism.

This identifies why standard locally finite/rational fixpoint theorems do not
apply: the full powerset functor is not finitary, and an infinite face is not
contained in a finite subcoalgebra [Milius--Pattinson--Wißmann 2018]. Ordinary
Kan or Segal horn filling captures some marginal compatibility but not the
simultaneous target-dependent Back witnesses.

### 3.2 Apex continuity and the Scott envelope

Given \(f:M_I\twoheadrightarrow_pP\), let

\[
R_f=\{f(F):0<|F|<\omega\}.
\]

Choose one finite representative of every point of \(R_f\), and let \(J\) be
their finite union. If \(s=f(J)\), equation (1) gives
\(R_f=\uparrow s\), and every Back witness below a face contained in \(J\)
also stays inside \(J\). Thus \(f|M_J\) maps onto \(R_f\), making \(R_f\) a
finite Medvedev image. Define

\[
\sigma(A)=\min\{f(F):0<|F|<\omega,\ F\subseteq A\}.
\]

Then \(\sigma\) is the unique Scott-continuous extension of the finite-face
coloring, is an onto p-map to \(R_f\), and

\[
f(A)\le\sigma(A),
\]

with both labels in the same maximal-support fiber. The set
\(P\setminus R_f\) consists of labels never attained on a finite face;
whenever such a hidden label is attained, it yields a discontinuity defect. A
label in \(R_f\) may also occur defectively at some other infinite face, so
the two notions are not identified.

**Hidden-label theorem.** If every hidden point \(u\in P\setminus R_f\)
satisfies \(u\le s\), then \(P\) folds finitely. Indeed,

\[
Q=(P\setminus R_f)\cup\{s\}
\]

is finite rooted with unique greatest point \(s\), hence is a finite
Medvedev image. Moreover

\[
P=(Q\setminus\{s\})\oplus R_f,
\]

and the audited top-substitution construction gives a finite cover. If the
root is the only hidden point, a direct coordinate-duplication construction
suffices.

Therefore a genuine folding counterexample must have at least two hidden
labels, one of them incomparable with the Scott root \(s\). Scalar rank or a
single discontinuous apex cannot work.

### 3.3 Finite ultrafilter data normalize

Let \(U_1,\ldots,U_k\) be distinct free ultrafilters on \(I\), and put

\[
\tau(A)=\{j:A\in U_j\}.
\]

Then \(\tau\) is an exact p-map onto the reverse Boolean cube
\((2^{[k]},\supseteq)\), including its empty flag state. Finite ultrafilter
separation supplies every required subflag. The same cube has the explicit
finite realization on \(\{*\}\cup[k]\):

\[
q(B)=
\begin{cases}
B\cap[k],&*\in B,\\
\varnothing,&*\notin B.
\end{cases}
\]

If a finite target coloring factors through \(\tau\), the post-map is itself
a p-map, so composing it with \(q\) folds the target. The theorem remains true
for finitely many ultrafilter flags in each of finitely many blocks, provided
`absent` and `present with empty flag` are kept distinct.

Thus no separator construction whose exact coloring factors through finitely
many blockwise free-ultrafilter membership flags can be infinite-only. Any
ultrafilter-based obstruction must instead use infinitely aggregated or
genuinely correlated boundary data.

---

## 4. Esakia-space route

### 4.1 Natural hyperspaces do not separate

For a Stone space \(S\), let \(K(S)\) be the nonempty closed subsets of
\(S\), with the Vietoris topology and reverse-inclusion order. This is an
Esakia space. Every finite clopen partition \(\pi\) of \(S\) gives the hit-set
map

\[
q_\pi:K(S)\to M_{|\pi|},
\]

which is a continuous onto p-map. Conversely, under the usual
Esakia/clopen-upset semantics, every finite formula valuation uses finitely
many clopens and therefore factors through one common finite clopen partition.
Validity on every finite \(M_n\) then gives \(K(S)\models ML\). If \(S\) has
arbitrarily large finite clopen partitions, the quotient maps give the reverse
logic inclusion, so the logic of \(K(S)\) is exactly \(ML\).

More strongly, every continuous onto p-map from a closed upset of \(K(S)\) to
a finite rooted target factors, after choosing its root closed set, through a
finite hit-set quotient. Thus these canonical Vietoris completions have the
safe Jankov spectrum but cannot refute the chosen ML formula \(\rho_W\).
Natural versions based on \(\beta\mathbb N\) and the Stone dual of the
four-role Boolean algebra have the same defect. A compact Hausdorff
closed-order topology on the raw infinite atomic Boolean frame with zero
removed is also impossible: accumulation of atoms conflicts with principal
upsets.

### 4.2 Closed finite diagrams thicken to clopen ones

**Thickening theorem.** Let \(X\) be Esakia, let \(Y\subseteq X\) be a closed
upset, and let \(f:Y\twoheadrightarrow_pP\) be continuous with \(P\) finite.
Then there is a clopen upset \(Z\supseteq Y\) and a continuous onto p-map
\(f':Z\twoheadrightarrow_pP\) extending \(f\).

For each \(a\in\operatorname{Up}(P)\), extend the clopen upset
\(f^{-1}(a)\) from \(Y\) to a clopen upset \(V_a\) of \(X\). There are only
finitely many errors in the \(0,1,\wedge,\vee,\to\) equations. Their union
\(E\) is clopen and disjoint from \(Y\); restriction of implication to an
upset commutes with the ambient operation. Priestley separation and
compactness give a clopen upset

\[
Y\subseteq Z\subseteq X\setminus E.
\]

The map \(a\mapsto V_a\cap Z\) is now a Heyting embedding, and its Esakia dual
is the desired extension. This is a local finite-diagram theorem; \(Z\) need
not be finite.

### 4.3 The tiling-generated candidate

The four-role construction from the attached note gives a Heyting subalgebra

\[
H\le\operatorname{Up}(M_\Omega)
\]

which refutes \(\rho_W\in ML\). For every \(h\in H\), there is a bound
\(N_h\) such that every nonface of \(h\) contains a nonface of the form

\[
T=F\cup\bigcup_{i\in J}B_i,
\qquad |F|\le N_h,
\]

where the \(B_i\) are whole role blocks. The proof is by induction on Heyting
terms; implication inherits the bound from its consequent.

As a subalgebra of \(\operatorname{Up}(M_\Omega)\), \(H\) also validates the
Skvortsov logic. Thus it realizes the intended separation geometry; the
unsettled issue is exactly whether it validates every Yankov axiom of ML.

By Esakia/Jankov duality, a refutation of \(J(P)\) first gives a continuous
p-map from a closed upset. The thickening theorem extends it to a clopen
upset, whose fibers are clopen. Cone density and the bounded flag lemma can
then be applied to those fibers. The result is:

> If \(H\not\models J(P)\) for finite rooted \(P\), then some bounded flag
> face \(T=F_*\cup\bigcup_{i\in J_*}B_i\) carries a total onto p-map to
> \(P\). Every fiber is Boolean-definable from \(H\)-clopens (and each
> principal-upset inverse image is an \(H\)-element), while every Back witness
> may be chosen with uniformly bounded finite exceptional part. For a proper
> original closed upset, at most three whole blocks are needed.

This closes the earlier gap between arbitrary closed Jankov witnesses and
clopen/definable witnesses.

It still does not prove \(H\models Y\). An explicit audited 13-point
\(H\)-definable profile has the bounded flag property, yet every proxy of the
natural flag-expansion form
\(\Phi(A)=A\cup\bigcup_{C_i\subseteq A}B_i\) fails Back because two
alternating edge requirements force an impossible finite `+1` closure. The
target itself folds freshly from \(M_6\). Thus this natural
witness-preserving sampling policy is false even in a harmless case. What
remains is a **target-intrinsic fresh cubical recoloring theorem**:
every finite target admitting such a bounded flag p-map must admit some finite
Medvedev cover. The current data neither prove nor refute that theorem.

The tiling algebra \(H\) therefore remains a viable separator candidate, but
its \(Y\)-validity is open.

---

## 5. Counter-conjecture route: try to prove \(Y=ML\)

### 5.1 Exact residual-finiteness reduction

Let

\[
W=V(Y),\qquad V=V(ML),
\]

and let

\[
q_n:F_W(n)\twoheadrightarrow F_V(n)
\]

be the natural quotient. For a \(W\)-algebra \(A\), define its finite residual
using finite \(W\)-algebras

\[
\operatorname{FinRad}(A)=
\bigcap\{\ker h:h:A\to C,\ C\text{ a finite }W\text{-algebra}\}.
\]

Because finite \(Y\)-algebras and finite \(ML\)-algebras coincide, every map
from \(F_W(n)\) to a finite algebra factors through \(q_n\). Conversely,
\(ML\) has the FMP, so \(F_V(n)\) is residually finite. Hence

\[
\boxed{
\operatorname{FinRad}(F_W(n))=\ker q_n,
\qquad
F_W(n)/\operatorname{FinRad}(F_W(n))\cong F_V(n).
} \tag{7}
\]

Consequently,

\[
\boxed{
Y=ML
\quad\Longleftrightarrow\quad
F_W(n)\text{ is residually finite for every finite }n.
} \tag{8}
\]

If strictness holds, a separating pair in some finite-rank free
\(Y\)-algebra is collapsed by every homomorphism to a finite algebra. Equation
(7) is a finite-residual reflection statement, not an identification with a
profinite completion.

### 5.2 Why the proposed filtrations do not yet work

The standard maximal/truth-inclusion filtration is uniformly unsafe. For an
arbitrary finite rooted poset \(P\), one can choose a valuation on a Medvedev
frame whose atomic theories are exactly the principal downsets of a prescribed
map onto \(P\); the maximal filtration reconstructs \(P\), including known
non-\(Y\) finite targets such as `6:43` and `8:1481`. This diagnoses the
policy, not the impossibility of every selective filtration.

A least algebraic filtration based on a cofinal domain

\[
D=\{\uparrow p:p\in P\}\cup\{\{u\}:u\in P\}
\]

has a similar problem. Map \(\uparrow p\) to \(p\), and map \(\{u\}\) to a
chosen maximal point \(\mu(u)\ge u\). This gives an onto p-map \(D\to P\).
The associated embedding preserves \(0,1,\wedge,\to\), but not the missing
joins. Closing under the required implicative structure can therefore
reconstruct an unsafe finite upset algebra. This is precisely where canonical
formulas are more flexible than Jankov formulas.

There is also a categorical obstruction to the suggested insertion/removal
repair. If a finite unsafe quotient \(Q\not\models ML\) had a finite
\(Y\)-safe cover \(R\twoheadrightarrow_pQ\), validity would descend to
\(Q\). Since finite \(Y\)- and \(ML\)-frames coincide, this is impossible.
Any successful repair must abandon the unsafe p-projection, build a fresh
finite frame, and prove a fresh truth lemma.

Structural completeness does not bridge the gap: it concerns admissible rules
inside \(V(ML)\), whereas the missing finite algebra must be extracted from an
external counteralgebra. Nor does projectivity: even finite ML-algebras need
not have the general projectivity required by the proposed argument. The
bounded-canonical-formula route encounters the same missing-join issue.

Accordingly, no selective filtration establishing the FMP of \(Y\) was found.
The equality route remains exactly (8).

---

## 6. Combined assessment

| Route | Proved gain | Exact remaining obligation |
|---|---|---|
| Esakia | Closed finite p-diagrams thicken to clopen ones; tiling witnesses reduce to bounded flags | Fresh finite realization of every finite \(H\)-definable bounded-flag diagram; a nonfolding bounded-flag target would instead refute \(H\models Y\) |
| Simplicial | Coalgebra/presheaf translation; Scott-envelope and hidden-label theorem; finite ultrafilter flags normalize | Control an infinitely aggregated, nonproduct interface with at least two hidden labels |
| Ramsey | Upper-separator theorem; periodic trace game; uniform-row and axis-union obstructions; six-frame nine-point frontier | Resolve the six explicit frames or prove a target-intrinsic finite certificate theorem |
| Equality/FMP | Finite-radical identity and residual-finiteness equivalence | Prove residual finiteness of every finite-rank free \(Y\)-algebra; a genuinely safe selective filtration is one possible route |

Each positive route encounters a version of one problem: fresh finite
simultaneous realization of a finite support-fiber diagram. They also agree on
what is not enough: restricting the supplied infinite witness, finitely many
ultrafilter flags, scalar ranks, marginal Segal data, ordinary bisimulation
types, or classical Ramsey homogeneity.

The counter-conjecture route converges on the dual problem: separate every
distinct pair in a finite-rank free \(Y\)-algebra by a finite quotient without
projecting onto an unsafe filtration. No known insertion/removal construction
does this.

### Recommended next attack

The next round should work directly with the six unresolved nine-point frames.
For each, there are only two maximal colors, so the mixed-support part of
\(M_{X\cup Y}\) is an exact square

\[
M_X\times M_Y\longrightarrow P_{01}
\]

coupled to the two pure-axis maps. The most informative alternatives are:

1. extend the periodic trace game from a fixed clean crown to two interacting
   crowns or to a finite replacement complex;
2. construct an explicit infinite exact coloring for one of the six using a
   genuinely nonperiodic correlated interface, and separately prove that it
   has no finite cover; or
3. prove a finite-state normalization of the two-axis square, which would
   settle every nine-point case and directly advance \(FF_{\mathbb N}\).

The six-frame reduction is small enough for proof-certificate-guided search,
but solver failure at larger finite dimensions must continue to be treated
only as a lower bound.

---

## 7. Audit and evidence labels

* **Proved and independently audited:** all equivalence directions stated in
  Section 1; the upper-separator theorem and `8:1481` conclusion; the periodic
  trace theorem and its accepted certificates; the uniform-row and axis-union
  theorems; the Esakia thickening and bounded-flag reductions; the Scott and
  ultrafilter theorems; equation (7); and the stated filtration no-go results
  with their scope restrictions.
* **Computationally exhaustive:** rooted-poset counts; the exact cone-equation
  solver through the stated dimensions; all 256 stored nine-point witnesses;
  the finite target-local trace and row reachability tables. Stored SAT models
  were rechecked face by face against (1).
* **Open:** the six nine-point candidates, \(FF_{\mathbb N}\), validation of
  all of \(Y\) by the tiling algebra \(H\), the FMP of \(Y\), and the global
  equality/strictness question.
* **Methodological only:** failures of witness-preserving sampling, standard
  filtration, marginal Ramsey data, and finite ultrafilter factorization do
  not exclude the global conjecture.

---

## References used in this round

* G. Bezhanishvili and N. Bezhanishvili,
  [*Jankov formulas and axiomatization techniques for intermediate logics*](https://eprints.illc.uva.nl/id/document/10810).
* G. Bezhanishvili, N. Bezhanishvili, and T. Moraschini,
  [*Degrees of the finite model property: the antidichotomy theorem*](https://arxiv.org/abs/2307.07209).
* Z. Chen and Y. Ding,
  [*The Logics of Individual Medvedev Frames*](https://arxiv.org/abs/2412.20178).
* G. Fontaine,
  [*Axiomatization of ML and Cheq*](https://eprints.illc.uva.nl/id/document/1806).
* V. Shehtman,
  [*Modal counterparts of Medvedev logic of finite problems are not finitely axiomatizable*](https://doi.org/10.1007/BF00370370).
* S. Milius, D. Pattinson, and T. Wißmann,
  [*The Locally Finite Fixpoint and Its Properties*](https://arxiv.org/abs/1802.08070).
* A. Kupke, A. Kurz, and Y. Venema,
  [*Stone coalgebras*](https://alexhkurz.github.io/papers/StoneCoalgebras/kkv-final.pdf).
* H. Xiao,
  [*Non-finite Axiomatizability of Generalized Medvedev Logics*](https://arxiv.org/abs/2606.31893).
* A. Citkin,
  [*Projective Heyting Algebras and Axiomatic Extensions of Intuitionistic Logic*](https://arxiv.org/abs/2512.05633).
* A. W. Hales and R. I. Jewett,
  [*Regularity and positional games*](https://doi.org/10.1090/S0002-9947-1963-0143712-1).
* R. L. Graham and B. L. Rothschild,
  [*Ramsey's theorem for n-parameter sets*](https://fanchung.ucsd.edu/ron/papers/71_04_n_ramsey.pdf).
* P. Erdős and R. Rado,
  [*A combinatorial theorem*](https://www.cs.umd.edu/~gasarch/TOPICS/canramsey/ErdosRado.pdf).
* N. Hindman,
  [*Finite sums from sequences within cells of a partition of N*](https://www.sciencedirect.com/science/article/pii/0097316574900235).
* K. Milliken,
  [*Ramsey's theorem with sums or unions*](https://core.ac.uk/download/pdf/82093831.pdf),
  together with A. Taylor's corresponding infinite-union theorem.

The attached previous-session ledger and *Notes on the undecidability of
Medvedev's logic* were treated as the local primary record for definitions,
the formula \(\rho_W\), and previously audited results.
