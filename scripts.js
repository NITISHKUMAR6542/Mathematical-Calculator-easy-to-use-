// Global variables
let angleMode = 'RAD',
    lastAnswer = 0,
    calcHistory = [],
    memory = 0,
    stats = [];

// Formulas list (using a multiline template string)
const formulas = `1. E = mc² — Mass-energy equivalence
2. F = ma — Newton’s Second Law
3. F = G * (m₁ * m₂) / r² — Universal Law of Gravitation
4. P = F / A — Pressure formula
5. v = u + at — Equation of motion
6. s = ut + ½at² — Displacement
7. F = q(E + v × B) — Lorentz force
8. λ = h / p — De Broglie wavelength
9. PV = nRT — Ideal Gas Law
10. P = VI — Electric Power
11. W = F × d — Work done
12. KE = ½mv² — Kinetic energy
13. PE = mgh — Potential energy
14. Q = mcΔT — Heat energy
15. I = Q / t — Electric current
16. V = IR — Ohm’s Law
17. R = ρL / A — Resistance
18. C = Q / V — Capacitance
19. f = 1 / T — Frequency
20. T = 1 / f — Time period
21. v = fλ — Wave equation
22. n = c / v — Refractive index
23. Snell's Law: n₁ sinθ₁ = n₂ sinθ₂
24. sin²θ + cos²θ = 1 — Trig identity
25. tanθ = sinθ / cosθ
26. sec²θ = 1 + tan²θ
27. cosec²θ = 1 + cot²θ
28. sin(A ± B) = sinA cosB ± cosA sinB
29. cos(A ± B) = cosA cosB ∓ sinA sinB
30. tan(A ± B) = (tanA ± tanB)/(1 ∓ tanA·tanB)
31. a² + b² = c² — Pythagorean theorem
32. Area of circle = πr²
33. Circumference = 2πr
34. Area of triangle = ½bh
35. Area of rectangle = l × w
36. Volume of sphere = 4/3 πr³
37. Volume of cylinder = πr²h
38. Volume of cone = 1/3 πr²h
39. Surface area of sphere = 4πr²
40. Surface area of cylinder = 2πr(h + r)
41. Speed = Distance / Time
42. Density = Mass / Volume
43. Acceleration = Δv / t
44. Momentum = mv
45. Impulse = Force × Time
46. Hooke's Law: F = -kx
47. Coulomb’s Law: F = k * q₁q₂ / r²
48. Magnetic force: F = BIL sinθ
49. Electric field: E = F / q
50. Power = Work / Time
51. 1 AU (Astronomical Unit) = 149.6 million km
52. Moon gravity = 1.62 m/s²
53. Earth gravity = 9.8 m/s²
54. Mars gravity = 3.71 m/s²
55. Jupiter gravity = 24.79 m/s²
56. Mercury gravity = 3.7 m/s²
57. Venus gravity = 8.87 m/s²
58. Saturn gravity = 10.44 m/s²
59. Uranus gravity = 8.69 m/s²
60. Neptune gravity = 11.15 m/s²
61. Moon diameter = 3,474 km
62. Earth diameter = 12,742 km
63. Mars diameter = 6,779 km
64. Mercury diameter = 4,880 km
65. Venus diameter = 12,104 km
66. Jupiter diameter = 139,820 km
67. Saturn diameter = 116,460 km
68. Uranus diameter = 50,724 km
69. Neptune diameter = 49,244 km
70. Height of Mount Everest = 8,848.86 m
71. Radius of Earth = 6,371 km
72. Volume of Earth = 1.08321×10¹² km³
73. Mass of Earth = 5.972 × 10²⁴ kg
74. Speed of light = 299,792,458 m/s
75. Planck's constant (h) = 6.626 × 10⁻³⁴ Js
76. Gravitational constant (G) = 6.674 × 10⁻¹¹ N·m²/kg²
77. Avogadro's number = 6.022 × 10²³ mol⁻¹
78. Universal gas constant (R) = 8.314 J/(mol·K)
79. Charge of electron = 1.602 × 10⁻¹⁹ C
80. Mass of proton = 1.672 × 10⁻²⁷ kg
81. Mass of neutron = 1.675 × 10⁻²⁷ kg
82. BODMAS rule = Brackets, Orders, Division, Multiplication, Addition, Subtraction
83. Simple Interest = (P × R × T) / 100
84. Compound Interest = P(1 + R/100)ⁿ - P
85. Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a
86. Area of trapezium = ½(a + b)h
87. Slope of a line = (y₂ - y₁)/(x₂ - x₁)
88. Distance between two points = √[(x₂ - x₁)² + (y₂ - y₁)²]
89. Midpoint formula = ((x₁ + x₂)/2, (y₁ + y₂)/2)
90. Volume of cube = a³
91. Surface area of cube = 6a²
92. Area of parallelogram = b × h
93. Perimeter of rectangle = 2(l + w)
94. Logarithm rule: logₐ(xy) = logₐx + logₐy
95. logₐ(x/y) = logₐx - logₐy
96. logₐ(xⁿ) = n·logₐx
97. ln(e^x) = x
98. d/dx (xⁿ) = nxⁿ⁻¹
99. d/dx (sin x) = cos x
100. d/dx (cos x) = -sin x
101. d/dx (e^x) = e^x
102. d/dx (ln x) = 1/x
103. ∫ xⁿ dx = xⁿ⁺¹ / (n+1) + C
104. ∫ 1/x dx = ln|x| + C
105. ∫ e^x dx = e^x + C
106. ∫ sin x dx = -cos x + C
107. ∫ cos x dx = sin x + C
108. S = ut + ½at² — Motion equation
109. v² = u² + 2as — Third motion equation
110. Binomial expansion: (a + b)² = a² + 2ab + b²
111. (a - b)² = a² - 2ab + b²
112. (a + b)(a - b) = a² - b²
113. Perimeter of triangle = a + b + c
114. Volume of pyramid = 1/3 × Base Area × Height
115. Area of rhombus = (d₁ × d₂)/2
116. Surface area of cone = πr(l + r)
117. Volume of hemisphere = (2/3)πr³
118. Surface area of hemisphere = 3πr²
119. Work-energy theorem: W = ΔKE
120. Efficiency = (Useful energy output / Total energy input) × 100
121. pH = -log[H⁺] — pH value from hydrogen ion concentration
122. Molarity (M) = moles of solute / liters of solution
123. Molality (m) = moles of solute / kg of solvent
124. Normality (N) = gram equivalent weight / liter of solution
125. Number of moles = given mass / molar mass
126. Ideal solution law: ΔP = X₂ * P₁⁰
127. Raoult’s Law: P₁ = X₁ * P₁⁰
128. Osmotic pressure: π = CRT
129. Boyle’s Law: P₁V₁ = P₂V₂
130. Charles’s Law: V₁/T₁ = V₂/T₂
131. Gay-Lussac’s Law: P₁/T₁ = P₂/T₂
132. Avogadro’s Law: V ∝ n
133. Gibbs Free Energy: ΔG = ΔH - TΔS
134. Enthalpy: ΔH = H_products - H_reactants
135. Entropy: ΔS = Q_rev / T
136. Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA])
137. Half-life formula: N(t) = N₀ * (1/2)^(t/T₁/₂)
138. Rate of reaction = Δ[Product]/Δt
139. Kinetic energy of gas: KE = 3/2 kT
140. Root mean square velocity: v_rms = √(3RT/M)
141. Relative humidity = (Actual vapor pressure / Saturation vapor pressure) × 100
142. Dew point formula (approx): Td = T - ((100 - RH)/5)
143. Wind chill formula: Twc = 13.12 + 0.6215T - 11.37v^0.16 + 0.3965Tv^0.16
144. BMI = weight (kg) / height² (m²)
145. Pulse pressure = Systolic - Diastolic
146. Mean arterial pressure = Diastolic + (1/3 × Pulse pressure)
147. Respiratory rate (RR) = Breaths per minute
148. Heart rate (HR) = Beats per minute
149. Speed of sound in air ≈ 343 m/s
150. Atmospheric pressure at sea level ≈ 101,325 Pa
151. Blood volume (average human) ≈ 70 mL/kg
152. Body surface area (Mosteller): √[(height (cm) × weight (kg))/3600]
153. Cardiac output = Stroke volume × Heart rate
154. DNA base pairing: A = T, G ≡ C
155. Genetic code: Codon = 3 nucleotides = 1 amino acid
156. BMI classification: <18.5 Underweight, 18.5–24.9 Normal, 25–29.9 Overweight, 30+ Obese
157. Pascal's Principle: P = F/A
158. Bernoulli’s Equation: P + ½ρv² + ρgh = constant
159. Hydrostatic pressure: P = ρgh
160. Tension in string = mg + ma (upwards)
161. Work function (photoelectric): Φ = hf - KE
162. Lenz's Law: Induced EMF opposes change in flux
163. EMF = -dΦ/dt
164. Torque = r × F
165. Angular momentum = Iω
166. Moment of inertia: I = Σmr²
167. Angular velocity = θ/t
168. Centripetal acceleration = v² / r
169. Centripetal force = mv² / r
170. Surface tension = Force / Length
171. Capillary rise: h = (2T cosθ) / (ρgr)
172. Latent heat: Q = mL
173. Reynolds number: Re = ρvD/μ
174. Drag force: F_d = ½CρAv²
175. Terminal velocity = (2mg) / (ρACd)
176. Radiation energy: E = σAT⁴
177. Stefan-Boltzmann constant: σ = 5.67×10⁻⁸ W/m²K⁴
178. Wien’s Law: λ_max T = constant
179. Heat conduction: Q/t = kA(ΔT/L)
180. Specific latent heat = Q/m
181. Kirchhoff's Current Law: ΣI_in = ΣI_out
182. Kirchhoff's Voltage Law: ΣV_loop = 0
183. Boolean algebra: A + A = A, A·A = A
184. NAND gate: Output = NOT (A AND B)
185. NOR gate: Output = NOT (A OR B)
186. Binary to decimal: Sum of (bit × 2^position)
187. Decimal to binary: Repeated division by 2
188. Bit rate = baud rate × number of bits per symbol
189. ASCII of 'A' = 65
190. Hexadecimal of 255 = FF
191. IP address format: 32 bits, 4 octets
192. 1 KB = 1024 bytes
193. 1 MB = 1024 KB
194. Time complexity O(1), O(n), O(log n), etc.
195. Area under curve = definite integral
196. Radian = 180°/π
197. Gradient of curve = dy/dx
198. Arithmetic mean = Σx/n
199. Standard deviation = √(Σ(x - μ)² / n)
200. Variance = σ²`;

// When showing Formula overlay, load the formulas dynamically.
function showFormula() {
  document.getElementById('calcContainer').style.display = 'none';
  const formulaDiv = document.getElementById('formulaContent');
  formulaDiv.textContent = formulas; // Load formulas list dynamically
  document.getElementById('formulaOverlay').style.display = 'block';
}
function hideFormula() {
  document.getElementById('formulaOverlay').style.display = 'none';
  document.getElementById('calcContainer').style.display = 'flex';
}

// Other functions (unchanged)
function toggleAngleMode() {
  if (angleMode === 'RAD') angleMode = 'DEG';
  else if (angleMode === 'DEG') angleMode = 'GRAD';
  else angleMode = 'RAD';
  document.getElementById('angleModeBtn').textContent = angleMode;
}
function appendToDisplay(value) {
  const d = document.getElementById('display');
  d.value += value;
  d.focus();
  d.setSelectionRange(d.value.length, d.value.length);
}
function clearDisplay() {
  document.getElementById('display').value = '';
}
function backspace() {
  const d = document.getElementById('display');
  if (d.value.length > 0) {
    if (d.selectionStart < d.selectionEnd) {
      const start = d.selectionStart;
      const end = d.selectionEnd;
      d.value = d.value.slice(0, start) + d.value.slice(end);
      d.setSelectionRange(start, start);
    } else {
      d.value = d.value.slice(0, -1);
    }
  }
}
function calculate() {
  try {
    let input = document.getElementById('display').value,
        expr = input
          .replace(/(\d+)[nN]Cr\(([^)]+)\)/g, 'comb($1,$2)')
          .replace(/(\d+)\s*[nN][pP][rR]\s*\(?\s*(\d+)\s*\)?/g, 'perm($1,$2)')
          .replace(/nCr\(([^,]+),([^)]+)\)/gi, 'comb($1,$2)')
          .replace(/nPr\(([^,]+),([^)]+)\)/gi, 'perm($1,$2)')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/\basin\(/g, 'Math.asin(')
          .replace(/\bacos\(/g, 'Math.acos(')
          .replace(/\batan\(/g, 'Math.atan(')
          .replace(/\bsin\(/g, 'Math.sin(')
          .replace(/\bcos\(/g, 'Math.cos(')
          .replace(/\btan\(/g, 'Math.tan(')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/√/g, 'Math.sqrt')
          .replace(/\^/g, '**')
          .replace(/%/g, '/100');
    if (angleMode === 'DEG') {
      expr = expr
        .replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1*Math.PI/180))')
        .replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1*Math.PI/180))')
        .replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1*Math.PI/180))')
        .replace(/Math\.asin\(([^)]+)\)/g, '(Math.asin($1)*180/Math.PI)')
        .replace(/Math\.acos\(([^)]+)\)/g, '(Math.acos($1)*180/Math.PI)')
        .replace(/Math\.atan\(([^)]+)\)/g, '(Math.atan($1)*180/Math.PI)');
    } else if (angleMode === 'GRAD') {
      expr = expr
        .replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1*Math.PI/200))')
        .replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1*Math.PI/200))')
        .replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1*Math.PI/200))')
        .replace(/Math\.asin\(([^)]+)\)/g, '(Math.asin($1)*200/Math.PI)')
        .replace(/Math\.acos\(([^)]+)\)/g, '(Math.acos($1)*200/Math.PI)')
        .replace(/Math\.atan\(([^)]+)\)/g, '(Math.atan($1)*200/Math.PI)');
    }
    expr = expr.replace(/(\d+)!/g, (_, n) => {
      let num = parseInt(n), result = 1;
      for (let i = 2; i <= num; i++) result *= i;
      return result;
    });
    const result = eval(expr);
    document.getElementById('display').value = (result === undefined ? 'Error' : result);
    lastAnswer = result;
    calcHistory.push(input + " = " + result);
  } catch {
    document.getElementById('display').value = 'Error';
  }
}
function toggleSign() {
  const d = document.getElementById('display'),
        v = parseFloat(d.value);
  if (!isNaN(v)) d.value = (-v).toString();
}
function insertEXP() {
  appendToDisplay('E');
}
function reciprocal() {
  const d = document.getElementById('display'),
        v = parseFloat(d.value);
  d.value = (!isNaN(v) && v !== 0) ? (1 / v).toString() : 'Error';
}
function comb(n, r) {
  n = parseInt(n);
  r = parseInt(r);
  if (r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) {
    res = res * (n - i) / (i + 1);
  }
  return res;
}
function perm(n, r) {
  n = parseInt(n);
  r = parseInt(r);
  if (r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= (n - i);
  }
  return res;
}
function insertRandom() {
  appendToDisplay(Math.random().toString());
}
function memoryAdd() {
  let v = parseFloat(document.getElementById('display').value);
  if (!isNaN(v)) memory += v;
}
function memorySubtract() {
  let v = parseFloat(document.getElementById('display').value);
  if (!isNaN(v)) memory -= v;
}
function memoryRecall() {
  document.getElementById('display').value = memory.toString();
}
function memoryClear() {
  memory = 0;
}
function statPush() {
  const d = document.getElementById('display');
  try {
    let value = eval(d.value
      .replace(/(\d+)[nN]Cr\(([^)]+)\)/g, 'comb($1,$2)')
      .replace(/(\d+)\s*[nN][pP][rR]\s*\(?\s*(\d+)\s*\)?/g, 'perm($1,$2)')
      .replace(/nCr\(([^,]+),([^)]+)\)/gi, 'comb($1,$2)')
      .replace(/nPr\(([^,]+),([^)]+)\)/gi, 'perm($1,$2)')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**'));
    if (!isNaN(value)) {
      stats.push(value);
      alert("Pushed stat: " + value);
    } else {
      d.value = 'Error';
    }
  } catch {
    d.value = 'Error';
  }
}
function statInsert() {
  if (stats.length) appendToDisplay(stats[stats.length - 1].toString());
}
function insertAns() {
  appendToDisplay(lastAnswer.toString());
}
function insertTripleQuotes() {
  appendToDisplay("'''");
}
function toggleENG() {
  const d = document.getElementById('display'),
        v = parseFloat(d.value);
  if (!isNaN(v)) d.value = v.toExponential(3);
}
function convertToDMS() {
  const d = document.getElementById('display'),
        v = parseFloat(d.value);
  if (isNaN(v)) { d.value = 'Error'; return; }
  const deg = Math.floor(v),
        mf = (v - deg) * 60,
        min = Math.floor(mf),
        sec = ((mf - min) * 60).toFixed(2);
  d.value = `${deg}° ${min}' ${sec}"`;
}
function convertToPolar() {
  const d = document.getElementById('display');
  if (d.value.indexOf(',') === -1) { d.value += ",0"; }
  let parts = d.value.split(',');
  let coords = parts.map(parseFloat);
  if (isNaN(coords[0]) || isNaN(coords[1])) { d.value = 'Error'; return; }
  let [x, y] = coords,
      r = Math.hypot(x, y),
      theta = Math.atan2(y, x);
  if (angleMode === 'DEG') theta *= 180 / Math.PI;
  else if (angleMode === 'GRAD') theta *= 200 / Math.PI;
  d.value = `${r},${theta}`;
}
function convertToRectangular() {
  const d = document.getElementById('display');
  if (d.value.indexOf(',') === -1) { d.value = 'Error'; return; }
  let parts = d.value.split(',');
  let coords = parts.map(parseFloat);
  if (isNaN(coords[0]) || isNaN(coords[1])) { d.value = 'Error'; return; }
  let [r, theta] = coords, rad = theta;
  if (angleMode === 'DEG') rad = theta * Math.PI / 180;
  else if (angleMode === 'GRAD') rad = theta * Math.PI / 200;
  const x = r * Math.cos(rad), y = r * Math.sin(rad);
  d.value = `${x},${y}`;
}
function convertToFraction() {
  const d = document.getElementById('display'),
        v = parseFloat(d.value);
  if (isNaN(v)) { d.value = 'Error'; return; }
  let tol = 1e-6, h1 = 1, h2 = 0, k1 = 0, k2 = 1, b = v;
  while (true) {
    let a = Math.floor(b), aux = h1;
    h1 = a * h1 + h2; h2 = aux;
    aux = k1; k1 = a * k1 + k2; k2 = aux;
    b = 1 / (b - a);
    if (Math.abs(v - h1 / k1) < v * tol) break;
  }
  d.value = `${h1}/${k1}`;
}
function convertToSci() {
  document.getElementById('calcContainer').style.display = 'none';
  document.getElementById('sciOverlay').style.display = 'block';
  document.getElementById('sciInput').value = "";
  document.getElementById('sciInput').focus();
}
function calculateSci() {
  let exponent = parseFloat(document.getElementById('sciInput').value);
  if (isNaN(exponent)) {
    alert("Invalid exponent.");
    return;
  }
  let baseValue = parseFloat(document.getElementById('display').value);
  if (isNaN(baseValue)) baseValue = 0;
  const multiplier = Math.pow(10, exponent);
  const result = baseValue * multiplier;
  document.getElementById('display').value = result;
  lastAnswer = result;
  calcHistory.push(baseValue + " × 10^" + exponent + " = " + result);
  hideSci();
}
function hideSci() {
  document.getElementById('sciOverlay').style.display = 'none';
  document.getElementById('calcContainer').style.display = 'flex';
}
function showHistory() {
  const historyDiv = document.getElementById('historyOverlay');
  const historyContent = document.getElementById('historyContent');
  historyContent.textContent = calcHistory.join('\n') || 'No history yet.';
  document.getElementById('calcContainer').style.display = 'none';
  historyDiv.style.display = 'block';
}
function hideHistory() {
  document.getElementById('historyOverlay').style.display = 'none';
  document.getElementById('calcContainer').style.display = 'flex';
}

