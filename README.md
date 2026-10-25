# Intercept Form Line Equation Calculator & Analytic Geometry Solver
## 平面截距式直线方程计算器与解析几何解题画板

[![Live Demo](https://img.shields.io/badge/Live%20Demo-formulacalckit.com-0284c7?style=flat&logo=google-chrome&logoColor=white)](https://intercept-form-line-calculator.formulacalckit.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/LaTeX-KaTeX-059669?style=flat)](https://katex.org/)

🔗 **Live Production Website**: [https://intercept-form-line-calculator.formulacalckit.com/](https://intercept-form-line-calculator.formulacalckit.com/)

An interactive 2D analytic geometry web application for solving and graphing **intercept form line equations** ($\frac{x}{a} + \frac{y}{b} = 1$). Designed for high school students, teachers, and exam candidates worldwide (SAT, AP Precalculus, Gaokao, Selectividad, Baccalauréat, ENEM).

---

## 🌟 Key Features

1. **Detailed Step-by-Step Solutions (LaTeX KaTeX)**:
   - Identifies intersection points $A(a, 0)$ and $B(0, b)$.
   - Forms standard intercept equation $\frac{x}{a} + \frac{y}{b} = 1$.
   - Converts to coprime integer General Form ($Ax + By + C = 0$).
   - Calculates slope $k = -b/a$ and inclination angle $\alpha$ with acute/obtuse quadrant discussion.
   - Computes segment length $|AB| = \sqrt{a^2 + b^2}$ and right triangle area $S = \frac{1}{2}|ab|$.
   - Quadrant traversal analysis.

2. **Completing the Square Method (Quadratic Extremum Derivation)**:
   - Formulates distance squared function $f(x) = OP^2 = x^2 + y^2 = \left(1 + \frac{b^2}{a^2}\right)x^2 - \frac{2b^2}{a}x + b^2$.
   - Full 5-step quadratic completing the square decomposition.
   - Derives perpendicular foot $H\left(\frac{ab^2}{a^2+b^2}, \frac{a^2b}{a^2+b^2}\right)$ and minimum distance $d = \frac{|ab|}{\sqrt{a^2+b^2}}$.
   - Cross-verifies algebraic optimization with the right-triangle area formula $S = \frac{1}{2}|ab| = \frac{1}{2}|AB| \cdot d$.

3. **Interactive 2D Cartesian Coordinate Graph**:
   - Live SVG canvas with axis arrows, unit ticks, and grid toggle.
   - Interactive drag handles for points $A$ and $B$ to manipulate intercepts in real time.
   - Altitude $OH$, right-angle indicator, inclination arc $\alpha$, and triangle area shading.
   - Zoom in/out, pan, center reset, and one-click **PNG high-res image export**.

4. **Multi-Scenario Input Modes**:
   - **Intercepts**: Direct input of $a$ and $b$ (integers, decimals, fractions like `3`, `-4`, `2/3`, `-5/2`).
   - **Two Points**: Given $(x_1, y_1)$ and $(x_2, y_2) \to$ auto-deduce $a$ and $b$.
   - **General Form**: Given $Ax + By + C = 0 \to a = -C/A, b = -C/B$.
   - **Point & Slope**: Given $(x_0, y_0)$ and $k \to b = y_0 - kx_0, a = -b/k$.

5. **Internationalization (5 Languages)**:
   - 🇺🇸 **English** (Default)
   - 🇪🇸 **Español**
   - 🇫🇷 **Français**
   - 🇧🇷 **Português**
   - 🇨🇳 **简体中文**

6. **SEO & Print-to-PDF**:
   - High-ranking Schema.org JSON-LD structured data (`WebApplication` and `FAQPage`).
   - Pure vector `@media print` formatting for crisp A4 PDF export without UI clutter.

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Math Rendering**: KaTeX
- **Icons**: Lucide React
- **Build Tool**: Vite 8

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/laohu90/intercept-form-line-calculator.git

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```
