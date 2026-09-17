# Rediseño del portfolio: design system, theming y reestructuración

> **Qué es esto:** el plan de implementación aprobado del rediseño en curso. Es un documento
> **de trabajo, con fecha de caducidad**: cuando la fase 6 se cierre, este archivo se archiva o
> se borra. Las decisiones que deben sobrevivir viven en
> [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md); la secuencia y lo que viene después, en
> [ROADMAP.md](./ROADMAP.md).
>
> **Está en español a propósito**, a diferencia del resto de la documentación: es el documento
> de coordinación entre el autor y las sesiones de implementación, no documentación del
> producto.
>
> **Los números de línea que cita pueden estar desfasados.** Verifica contra el archivo real
> antes de editar; las rutas y los hallazgos técnicos sí son válidos.

## Contexto

El portfolio funciona, pero el diseño se ha ido construyendo por acumulación y hoy no existe un sistema: hay ~100 apariciones de `#c08b5a` hardcodeado, cinco colores fuera de paleta (`#f59e0b`, `#818d90`, `#1a1f2e`, `#94a3b8`, `#0f172a`) y cada tarjeta repite a mano la misma cadena de seis utilidades. No hay capa de primitivas, así que cualquier ajuste visual implica editar 16 archivos.

Además hay efectos rotos que nadie ve: `.bento-noise` usa `filter='noise'` en vez de `filter='url(#noise)'` (el grano por tarjeta no renderiza en ~10 tarjetas), `.masking-gradient` está en un `<style>` con scope de `Hero.astro` pero se usa también en `Experience.astro`, `prose prose-invert` es un no-op porque `@tailwindcss/typography` no está instalado, y tres gradientes radiales usan sintaxis v3 (`var(--tw-gradient-stops)`) que en Tailwind v4 invalida toda la declaración `background-image` — no pintan nada.

La home duplica por completo el contenido de las cuatro páginas dedicadas, lo que la hace pesada y difícil de escanear para un recruiter. Y el proyecto va a crecer (blog técnico MDX, live demos, contacto con Calendly, más idiomas), pero la arquitectura actual no tiene dónde engancharlos.

**Resultado esperado:** un design system real con tokens semánticos, tema claro/oscuro con toggle, una home de conversión, y una base extensible — con los artefactos de documentación puestos al día y organizados.

### Decisiones tomadas

| Decisión    | Valor                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Alcance     | Consolidar el design system **y** reestructurar la arquitectura de página, por fases                                                     |
| Tema        | Dark (default) + Light con toggle manual persistido, respetando `prefers-color-scheme` como valor inicial                                |
| Light mode  | "Papel" cálido `#faf7f2`, texto gunmetal, copper oscurecido `#8a5c2e` para texto/bordes; copper original reservado a superficies grandes |
| Acentos     | `copper` = marca (bordes, glows, hover, titulares) · `amber` = acción y estado vivo (CTA primario, "actual", "nuevo")                    |
| Home        | Corta y de conversión; todo el detalle vive en las páginas dedicadas                                                                     |
| Locale `ja` | Se mantiene activo, con fallback a inglés garantizado y un test que liste las claves faltantes sin romper el build                       |
| ProofBar    | Stack principal + clouds, y ubicación/modalidad. **Sin** métricas derivadas ni badge "open to work"                                      |
| Docs        | `docs/DESIGN_SYSTEM.md` y `docs/ROADMAP.md` nuevos; `AGENTS.md` y `README.md` corregidos                                                 |

### Hallazgos verificados que corrigen suposiciones previas

Estos se comprobaron compilando el `global.css` real contra el compilador de Tailwind v4:

- **`slate` NO sombrea** la escala `slate-*` de Tailwind: un `colors.slate` en config JS añade la clave desnuda sin borrar la escala. Se renombra igualmente por claridad, no por bug.
- **`@config` funciona correctamente** en v4. El motivo real para eliminarlo es otro y es decisivo: **un config JS emite valores hex literales, no variables CSS** (`--color-copper` no aparece en el `@layer theme` generado). Sin variables no hay theming en runtime. Ese es el argumento, no que esté roto.
- **Fallos de contraste medidos sobre `#0c111c`:** `text-gray-500` (`#6b7280`) da **3.90:1 — falla AA**. Se usa en `About.astro` (×3), `Projects.astro:75`, `Hero.astro:379` y `Certifications.astro`.
- **El solape del header es peor que `pt-16`:** el header es `fixed top-6` (24px) + `h-14` (56px) = llega a y=80px, pero `<main>` reserva 64px → **16px de solape**, y `scroll-padding-top: 5rem` son exactamente 80px, así que las secciones ancladas caen pegadas al header.
- **El chequeo de estado activo del header es código muerto:** compara `/portfolio/en/projects` con `/portfolio/en/#about`, nunca es cierto.
- **`src/pages/index.astro` no usa `Layout`** (HTML crudo), así que necesita su propio arranque de tema o el salto de redirección parpadea.

---

## Arquitectura de tokens (el núcleo)

Tres niveles, en `src/styles/tokens.css` (nuevo, importado por `global.css`):

1. **`@theme`** — solo primitivas estáticas: rampas `copper-50..900`, `amber-300..800`, `gunmetal-100..950`, `paper-50..900`, más fuentes, radios y easings. Aquí viven también los **alias legacy** (`--color-gunmetal`, `--color-gold`, `--color-light`…) para que todo el código actual siga compilando durante la migración; se borran en la última fase.
2. **Bloques CSS planos `:root` / `[data-theme="light"]`** — asignaciones semánticas con nombres sin namespace (`--bg`, `--surface`, `--fg-muted`, `--accent`, `--action`, `--glass-bg`, `--glow-strength`…). Son custom properties normales, así que cascadean y se sobrescriben con libertad.
3. **`@theme inline`** — puente de los semánticos al namespace `--color-*`, para que Tailwind genere `bg-surface`, `text-fg-muted`, `border-border-accent`, etc.

**`inline` es obligatorio.** Sin él Tailwind emite `--color-bg: var(--bg)` en `:root` y las utilidades referencian `var(--color-bg)`: funciona mientras `data-theme` esté en `<html>`, pero se rompe en cuanto se quiera tematizar un subárbol (`<div data-theme="light">` para una preview de componente o una demo embebida). Con `inline` la utilidad emite `background-color: var(--bg)` directamente y resuelve por elemento.

**Mecanismo de cambio de tema: remapeo de variables, NO variantes `dark:`.** Con ~6 utilidades de color por componente × 16 componentes, una estrategia `dark:` duplica cada una — lo contrario de consolidar. El remapeo permite escribir `bg-surface border-border text-fg-muted` una sola vez y que sea correcto en ambos temas; el tema entero cabe en ~40 líneas de CSS. Se define igualmente `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` como escotilla para lo que **no** es un intercambio de color: intensidad del `backdrop-blur`, si el glow existe o no, `filter: invert()` en logos monocromos, `brightness` de imágenes.

**Truco clave para los glows:** `--glow-strength` vale `1` en dark y `0` en light. El bloom de copper se multiplica a cero sobre papel — donde leería como suciedad — sin necesidad de ninguna variante `dark:` en el marcado.

**Efectos como `@utility`, no como clases en `@layer base`.** Hoy `.glass-card` vive en `@layer base` y por eso pierde contra _cualquier_ utilidad, que es exactamente la razón por la que `Hero.astro`, `Projects.astro` y `ProjectCard.tsx` vuelven a declarar `border border-white/5` encima. Como `@utility` (`glass`, `glass-interactive`, `noise`, `glow-accent`, `bloom`, `grid-backdrop`, `prose`) caen en la capa de utilidades, componen bien y ganan variantes (`md:glass`, `hover:glass`).

`prose` se escribe a mano sobre tokens: ni se instala `@tailwindcss/typography` ni existe `prose-invert` — el punto de la capa semántica es que la prosa sea correcta en ambos temas con una sola clase. Queda lista para MDX desde el día uno.

**Archivos:** `src/styles/tokens.css` (nuevo), `src/styles/global.css`, `tailwind.config.mjs` (se elimina en la fase 6).

---

## Theming sin FOUC

- **Script inline bloqueante** extraído a `src/layouts/ThemeScript.astro`, incluido tanto en `Layout.astro` (lo primero del `<head>`, antes del stylesheet) como en `src/pages/index.astro`. Debe llevar `is:inline` (para que Astro no lo empaquete ni difiera) y `data-astro-rerun` (para que se re-ejecute tras un swap de view transition). Usa `matchMedia("(prefers-color-scheme: light)")` — no `: dark` — para que `no-preference` caiga a dark, que es el default de diseño. El mismo script añade `documentElement.classList.add("js")`, que sirve de guarda no-JS para los reveals sin coste extra.
- **Lógica testeable** en `src/utils/theme.ts`: `resolveTheme(stored, prefersLight)` y `THEME_COLOR`. El script inline queda como duplicado a mano deliberado (deben ser ~15 líneas sin dependencias) y un test de Vitest extrae por regex la clave y los hexes del `.astro` para asegurar que ambos coinciden.
- **`<meta name="theme-color">`** pasa a ser el color de fondo (`#0c111c` / `#faf7f2`), no el acento copper como ahora. Un solo tag actualizado por JS, no dos con `media=`: la elección manual debe ganar a la preferencia del SO, y los tags con `media` no pueden expresar eso. Se añade también `<meta name="color-scheme" content="dark light">` y se corrige el viewport con `initial-scale=1`.
- **Control** en `src/components/ui/ThemeToggle.astro`, dentro del clúster de acciones de `Header.astro`, a la izquierda de `LanguagePicker`. Visible también en móvil, no escondido tras el hamburguesa.
    - `role="switch"` + `aria-checked`, con `aria-label` **estático** ("Toggle theme"): no se invierte el texto de la etiqueta, porque eso hace que los lectores de pantalla anuncien un nombre cambiado a mitad de interacción. El estado lo lleva `aria-checked`.
    - Los dos iconos están siempre en el DOM y los elige la variante `dark:` — **sin JS**, lo que los hace correctos ya en el primer pintado y tras cada swap.
    - Área de toque ≥44×44 en punteros gruesos.
    - **Sin transición de color a nivel de página**: un crossfade de 300ms de toda la pantalla es un disparador vestibular conocido. El cambio es instantáneo.

**Archivos:** `src/layouts/ThemeScript.astro`, `src/utils/theme.ts`, `src/components/ui/ThemeToggle.astro`, `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/components/astro/Header.astro`.

---

## Capa de primitivas — `src/components/ui/`

Todas `.astro` (cero JS). Las islas React consumen las mismas `@utility`, así que no se duplica nada. La lógica de variantes se extrae a `src/components/ui/_variants.ts` como funciones puras (`cardClasses(variant, pad, radius)`) — así es testeable con Vitest y compartible con los componentes React.

| Primitiva              | Rol                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Section.astro`        | `tone`, `width`, `space`, `backdrop`. Sustituye la cadena `py-16 md:py-24 min-h-[60vh] flex justify-center` repetida en 5 componentes. **Sin** `min-h-*`, `snap-start` ni `justify-center` — esos tres son la causa del jank de scroll en móvil.                                                                                                                                 |
| `Card.astro`           | La grande. `variant: glass\|solid\|outline\|ghost\|chip`, más `as`/`href`, `pad`, `radius`, `interactive`, `lift: y\|x`, `glow`, `noise`, `span`, `dashed`. Cubre celdas bento, project cards, cert cards, tarjetas de timeline y chips de skill con un solo componente. `as` + `href` absorbe la lógica `Component = inProgress \|\| !link ? "div" : "a"` de `ProjectCard.tsx`. |
| `Button.astro`         | `primary` (amber sólido, AA en **ambos** temas: 8.31:1), `secondary`, `ghost`, `link`. Elimina las cuatro copias a mano de la cadena `px-8 py-3.5 rounded-xl bg-[#f59e0b]…`.                                                                                                                                                                                                     |
| `Tag.astro`            | `neutral\|accent\|action\|outline`. El variant `action` usa `--action-text` (amber-700 en light, 4.70:1), **no** el amber crudo, que sobre papel daría 2.01:1.                                                                                                                                                                                                                   |
| `SectionHeading.astro` | `eyebrow`, `title`, `accent`, `description`, `rule`, `action`. El `accent` como palabra en color plano reemplaza los cuatro `bg-clip-text from-[#c08b5a] to-white` duplicados — que **no pueden sobrevivir** al tema claro, donde `to-white` es invisible.                                                                                                                       |
| `PageHeader.astro`     | El bloque `<h1>` + descripción repetido literalmente en las 4 páginas dedicadas. **Se construye ahora** porque es el punto de enganche del blog.                                                                                                                                                                                                                                 |
| `Prose.astro`          | La costura donde renderizará MDX.                                                                                                                                                                                                                                                                                                                                                |
| `Reveal.astro`         | Wrapper `data-reveal`.                                                                                                                                                                                                                                                                                                                                                           |
| `CertCard.astro`       | Extraída para que home y `/certifications` compartan una sola tarjeta.                                                                                                                                                                                                                                                                                                           |
| `ProofBar.astro`       | Stack principal + clouds + ubicación/modalidad.                                                                                                                                                                                                                                                                                                                                  |
| `CTASection.astro`     | CV + LinkedIn hoy; Calendly cuando llegue, vía `siteConfig.contact`.                                                                                                                                                                                                                                                                                                             |

**Se elimina `TechStackSection.astro`**: son 30 líneas de wrapper que `Section` + `SectionHeading` + `<TechStack compact />` compuestos en la página reemplazan.

**Notas de migración con trampa:**

- `About.astro` tiene cadenas en inglés hardcodeadas ("Focus Areas", "Architecture & Backend") que **no están traducidas** — hay que moverlas a `ui.ts`.
- `TechStack.astro`: los `colorClass`/`borderClass` por skill son hex arbitrarios escaneados por Tailwind. Moverlos a `skills.ts` como custom properties (`style="--brand: #6db33f"`) para sacarlos del escaneo.
- `ProjectGrid`/`CertificationList` pasan de `client:only="react"` a `client:visible` con SSR, para que filtros y listado rendericen sin JS y no parpadeen tras un swap.
- `CertificationList.tsx`: `getBadgeUrl` es código muerto (devuelve su entrada).
- `Logo.astro` gana una variante `currentColor` para invertir con el tema.
- `LanguagePicker.astro` declara `role="menu"` sin navegación por flechas — una mentira de accesibilidad. Añadir roving tabindex y una guarda `dataset.bound` contra doble binding en swap.

---

## Reestructuración de páginas

**`/[lang]/index.astro`** pasa a cinco secciones ligeras:

```
Hero  →  ProofBar  →  FeaturedProjects (3 + "ver todos")  →  CurrentWork  →  FinalCTA
```

**Bento del Hero: de 5 celdas a 3**, una fila limpia en desktop:

- **Celda 1** (`md:col-span-2 md:row-span-2`) — identidad: eyebrow, `<h1>`, propuesta de valor, CTA primario (CV) + secundario (LinkedIn). Conserva `bloom` y `noise`.
- **Celda 2** (`md:col-span-2 md:row-span-1`) — "Currently" fusionada: punto ámbar vivo + rol actual + empresa + tira de iconos del stack. Absorbe las celdas 4 y 5 actuales.
- **Celda 3** (`md:col-span-2 md:row-span-1`) — "Proof" fusionada: badge de última certificación + fila de sociales. Absorbe las celdas 2 y 3 actuales.

Razón: 5 celdas con `auto-rows-[minmax(180px,auto)]` sobre una rejilla de 4 columnas producen una segunda fila irregular y, en móvil, cinco cajas apiladas de 180px antes del fold — el recruiter pasa de largo el CTA.

El `<h1>` del Hero además **no usa `font-heading`** hoy (cae a Inter); se corrige.

**Páginas dedicadas:** cada una pierde su `<h1>` con gradiente hecho a mano en favor de `PageHeader`. `/experience` recibe además el contenido del bio de `About` — "quién soy" pertenece junto a "qué he hecho". No se crea `/about` salvo que el bio pase de ~400 palabras; se decide en la fase 4.

**Consecuencia en la navegación:** como la home ya no tiene secciones `#about`/`#experience`/`#certifications`/`#tech-stack`, el nav del header pasa de enlaces hash a enlaces de página reales. Eso permite **borrar el scroll-spy entero** (~40 líneas más un observer por sección) y sustituirlo por un `aria-current="page"` calculado en servidor desde `Astro.url.pathname` — que de paso arregla el chequeo `startsWith` muerto y da semántica real a las tecnologías asistivas.

---

## Motion y accesibilidad

**Reveal on scroll: IntersectionObserver**, no CSS scroll-driven. `animation-timeline: view()` sigue tras flag en Firefox: sería un ~3–5% de la audiencia viendo secciones en `opacity: 0`. Para un sitio que ven recruiters, una sección en blanco es un fallo catastrófico. IO son ~25 líneas, universal, sin handler de scroll. Un único script global en `Layout.astro`, con `io.unobserve` tras revelar (one-shot) y corto circuito bajo `prefers-reduced-motion`. La guarda `html:not(.js) [data-reveal] { opacity: 1 }` es crítica: sin ella, sin JS la página se ve vacía.

**`prefers-reduced-motion` en tres capas:** interruptor global en `@layer base`, `motion-safe:` explícito en `animate-ping`/`animate-pulse` (el punto de "rol actual" se queda ámbar y sólido, solo deja de latir — la señal debe sobrevivir), y corto circuito en JS (IO, scroll-to-top, menú móvil).

Aparte: el `animate-pulse` sobre el **texto** "LATEST ACHIEVEMENT" del Hero es un problema de WCAG 2.2.2 (contenido parpadeante) con independencia de la preferencia de movimiento. Se elimina y se usa `Tag variant="action"`.

**Arreglos de móvil, concretos:**

1. **Eliminar el scroll-snap por completo.** `scroll-snap-type: y proximity` sobre secciones de `min-h-[50vh]`–`[90vh]` es el peor bug móvil del repo: en iOS el snapping por proximidad contra secciones más altas que el viewport pelea contra el gesto del usuario y puede atrapar a mitad de sección. Fuera `scroll-snap-type` y los seis `snap-start`.
2. **Solape del header:** `--header-offset: 6rem` en tokens, usado por `pt-[--header-offset]` y `scroll-padding-top` — así no pueden desincronizarse nunca.
3. **Fusionar los dos `<script>` de scroll de `Header.astro`** en uno; el segundo (sin throttle) se pliega dentro del `handleScroll` ya throttleado con rAF, y su clase pasa a `bg-bg/80` — con `bg-gunmetal/80` el header se quedaría oscuro en tema claro.
4. **Tooltips solo-hover:** los de los iconos de tech del Hero son inalcanzables por teclado y por táctil → variantes `group-focus-within` + iconos enfocables, o etiqueta visible bajo el icono en `<md`. El tooltip de descripción de `ProjectCard.tsx` **se borra**: es solo-ratón, re-mide en cada resize, y el truncado a 3 líneas es un problema de diseño, no de tooltip.
5. **Trampa de foco del menú móvil:** hoy bloquea el scroll del body pero no mueve el foco al panel, no atrapa el Tab ni lo restaura al cerrar. Son ~15 líneas y son la diferencia entre que un usuario de teclado pueda usar el sitio o no.
6. **Objetivos táctiles:** trigger del selector de idioma (~28px) y botón de menú (40px) están por debajo del mínimo. Se resuelve en `Button` con `min-h-11 min-w-11` bajo `@media (pointer: coarse)`.

**`<ClientRouter />` en la última fase**, no antes: hay que tener sólido el arranque de tema primero. Con `transition:persist` en el Header y fade global en `<main>`.

---

## Ganchos de extensibilidad (se construyen ahora)

1. **Nav desde config.** Mover `navItems` de `Header.astro` a `site.config.ts` como `nav: NavItem[]` con `{ key, path, enabled?, cta? }`. `key` es una clave de `ui.ts`, así que se traduce solo. Añadir el blog pasa a ser cambiar un flag.
2. **Colección `posts` en `content.config.ts`** desde ya (puede existir con cero entradas), con el esquema MDX completo. Y **normalizar el esquema de `projects` de paso**: añadir `slug`, `repo`, `demo`, `status: enum(["shipped","wip","archived"])` en sustitución del booleano `inProgress`, y `highlights: string[]`. `demo`/`repo` son el gancho de las live demos; `highlights` es lo que necesitará una página de detalle.
3. **`PageHeader` + `Prose` son la costura MDX.** Un futuro `/[lang]/blog/[slug].astro` será literalmente `<Layout><PageHeader/><Prose><Content /></Prose></Layout>`.
4. **`CTASection` con `providers`** desde `siteConfig.contact = { calendly: null, email, linkedin }`: cuando llegue Calendly se pone la URL y aparece el tercer botón, sin rehacer layout.
5. **`Card` con slot `media`** para que un `<iframe>`/`<video>` de demo caiga en la misma cáscara que el `<img>` actual.
6. **Más idiomas:** partir `i18n/ui.ts` en `src/i18n/locales/{en,es,ja}.ts` con `en.ts` como fuente de verdad vía `satisfies`, de forma que una clave que falte en `es` sea un **error de tipos**, no un fallback silencioso. Y derivar `getAllLanguageUrls` de `Object.keys(ui)` en vez del array de tres hardcodeado.
7. Los tokens de tema ya quedan extensibles: un futuro modo "alto contraste" es un bloque `[data-theme="x"]` más, sin tocar ni un componente.

---

## Fases

Cada fase deja el sitio desplegable.

### Fase 0 — Cimientos y verdad (sin cambio visual)

Arreglar `.bento-noise` (`url(%23noise)`), los 3 gradientes radiales rotos, el viewport, el solape del header, eliminar el scroll-snap, fusionar los scripts del header, sustituir cada `text-gray-500` sobre fondo oscuro. Corregir `AGENTS.md` (Astro 7 no 5, 3 locales, árbol real, paleta real) y `README.md`. Crear `docs/DESIGN_SYSTEM.md` y `docs/ROADMAP.md`.

### Fase 1 — Capa de tokens

`src/styles/tokens.css` con alias legacy. Se mantienen `@config` y `tailwind.config.mjs`: ambas fuentes coexisten y nada se rompe. Convertir los efectos a `@utility`, dejando `.glass-card`/`.bento-noise` como alias finos para no tocar aún ningún componente.
**Criterio de aceptación: diff visual cero.**

### Fase 2 — Cambio de tema

`ThemeScript`, `utils/theme.ts`, `ThemeToggle`, `@custom-variant`, valores light de glass/glow/noise/grid.

### Fase 3 — Primitivas

Construirlas y migrar en orden de riesgo creciente: primero las 4 páginas dedicadas (máxima duplicación, mínimo riesgo), luego `Certifications`, `Projects`, `TechStack`, `Experience`, `Footer`, después las islas React, y **`Hero` al final**.

### Fase 4 — Reestructuración de páginas

Nueva home, bento de 3 celdas, `About` a `/experience`, borrar `TechStackSection`, nav desde config, `aria-current` en servidor, borrar el scroll-spy.

### Fase 5 — Motion y a11y

`Reveal` + IO + guarda no-JS, `motion-safe:`, trampa de foco, teclado en el selector de idioma, objetivos táctiles, borrar el tooltip de `ProjectCard`, `<ClientRouter />`.

### Fase 6 — Limpieza

Borrar `tailwind.config.mjs`, la línea `@config`, los alias legacy, `siteConfig.theme.colors`, `getBadgeUrl`, el import muerto de `Logo` en `Hero`. Sustituir el `ogImage` SVG por un PNG real de 1200×630 — **X y LinkedIn no renderizan OG en SVG, así que los previews sociales están rotos ahora mismo**. Partir `i18n/ui.ts`. Cerrar los dos documentos de `docs/`.

---

## Verificación

**Por fase:** `pnpm lint && pnpm test && pnpm build` siempre.

**Fase 1:** diff del CSS emitido; el diff visual debe ser cero.

**Fase 2** (aquí lo manual es lo que más importa):
(a) Slow 3G + hard reload en tema claro → **sin flash oscuro**; (b) cambiar la preferencia del SO sin elección guardada → el sitio la sigue; (c) usar el toggle y recargar → persiste; (d) poner `data-theme` en un `<div>` anidado → el subárbol se retematiza (esto prueba que `@theme inline` hace su trabajo); (e) solo teclado: Tab al toggle, Space activa, anillo de foco visible en ambos temas; (f) Safari móvil: la barra de direcciones cambia de color.

**Fase 3:** tras **cada** componente, `pnpm build` y revisión visual en ambos temas.
`grep -rn "#c08b5a\|#f59e0b\|#818d90\|#1a1f2e\|#94a3b8\|#0f172a" src/ | wc -l` debe decrecer estrictamente en cada commit y llegar a 0 (excluyendo los colores de marca de `skills.ts`).

**Fase 4:** revisar `dist/` para los 3 locales × 6 rutas. Lighthouse móvil en la nueva home: ≥95 en todo y **CLS ≈ 0** (los reveals animan solo `opacity`/`transform`). Comprobar que cada enlace resuelve bajo `BASE_PATH=/portfolio` y que el cambio de idioma preserva la ruta actual (probar en `/es/tech-stack`).

**Fase 5:** axe DevTools en cada ruta y en ambos temas, cero violaciones. Recorrido completo solo con teclado incluyendo menú móvil y selector de idioma. "Reduce Motion" activado → sin reveals, sin ping, scroll instantáneo. **JS desactivado → todo el contenido visible**, nav funcional, tema por defecto oscuro. Navegación con view transitions y tema claro guardado → **sin flash oscuro a mitad del swap** (es la regresión que esta fase más arriesga).

**Fase 6:** `grep -rn "gunmetal\|text-gold\|glass-card\|bento-noise" src/` → 0 resultados. Lighthouse final en ambos temas. Validar el OG con el Post Inspector de LinkedIn.

### Tests a añadir (Vitest)

| Archivo               | Qué asegura                                                                                                                                                                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.test.ts`      | **El de mayor valor del proyecto.** Parsea `tokens.css`, extrae cada hex y verifica ratios WCAG ≥4.5:1 para `fg`/`bg`, `fg-muted`/`bg`, `fg-subtle`/`bg`, `accent`/`bg`, `action-fg`/`action`, `accent-fg`/`accent` — **en ambos bloques de tema**. Convierte el contraste en un invariante de build. |
| `theme.test.ts`       | Tabla de verdad de `resolveTheme` (stored dark/light/null/basura × prefersLight true/false) + escaneo del fuente para asegurar que el script inline usa la misma clave y los mismos hexes que `utils/theme.ts`.                                                                                       |
| `_variants.test.ts`   | Los helpers puros prop→clase de las primitivas.                                                                                                                                                                                                                                                       |
| `nav.test.ts`         | El filtrado de `siteConfig.nav` y que cada `key` existe en `ui.en`.                                                                                                                                                                                                                                   |
| `i18n.test.ts`        | Que `es` y `ja` no tienen claves faltantes respecto a `en` — esto materializa la brecha de japonés como una lista concreta sin romper el build.                                                                                                                                                       |
| `content.test.ts`     | Que todo proyecto tiene su contraparte en `en`.                                                                                                                                                                                                                                                       |
| `reveal.test.ts`      | En happy-dom, con `IntersectionObserver` stubbeado: que los elementos reciben `data-revealed` y que la rama de movimiento reducido revela de forma síncrona sin construir el observer.                                                                                                                |
| Guarda final (fase 6) | Que no queda ningún alias legacy en `tokens.css` ni ningún hex crudo fuera de `tokens.css`/`skills.ts`. **Esto es lo que impide que el design system vuelva a erosionarse.**                                                                                                                          |

---

## Archivos críticos

- `src/styles/tokens.css` _(nuevo)_ y `src/styles/global.css`
- `src/layouts/Layout.astro`, `src/layouts/ThemeScript.astro` _(nuevo)_
- `src/components/ui/` _(nueva carpeta: ~11 primitivas + `_variants.ts`)_
- `src/components/astro/Hero.astro` y `src/components/astro/Header.astro` _(los dos más intervenidos)_
- `src/pages/[lang]/index.astro` y `src/pages/index.astro`
- `src/site.config.ts`, `src/content.config.ts`, `src/i18n/ui.ts`
- `docs/DESIGN_SYSTEM.md` y `docs/ROADMAP.md` _(nuevos)_; `AGENTS.md`, `README.md`
- `tailwind.config.mjs` _(se elimina en fase 6)_
