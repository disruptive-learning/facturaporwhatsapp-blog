# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Sobre Factura por WA

**Factura por WA** es una solución de facturación automática por WhatsApp diseñada para profesionales independientes y pequeños negocios en México que necesitan emitir facturas (CFDI) de manera rápida y sin complicaciones.

### ¿Qué es?

Una herramienta que permite generar facturas fiscales válidas ante el SAT directamente desde WhatsApp. El usuario envía los datos por chat y recibe su factura en segundos, sin necesidad de aprender software complejo ni contratar un contador para cada emisión.

### Público Objetivo

| Segmento | Pain Points | Cómo les ayuda Factura por WA |
|----------|-------------|-------------------------------|
| **Doctores y profesionales de salud** | Pacientes piden factura después de consulta, interrumpe el flujo de trabajo, no tienen tiempo para sistemas complejos | Facturan desde el celular entre consultas, sin abrir computadora |
| **Freelancers** | Clientes piden factura a última hora, olvidan datos fiscales, proceso manual tedioso | Envían datos por WhatsApp y listo, sin aprender nuevo software |
| **Emprendedores pequeños** | No tienen contador de planta, sistemas de facturación son caros o complicados, pierden tiempo en administración | Solución económica y simple, se enfocan en vender, no en papelería |
| **Consultores independientes** | Facturan a múltiples clientes con diferentes datos fiscales, necesitan agilidad | Guardan datos de clientes frecuentes, facturan en segundos |
| **Terapeutas y coaches** | Sesiones seguidas, no pueden pausar para facturar, clientes esperan factura inmediata | Facturan entre sesiones desde WhatsApp |
| **Profesionistas (abogados, contadores, arquitectos)** | Ya tienen suficiente trabajo administrativo, facturar es una carga más | Eliminan fricción, delegan la complejidad técnica |

### Propuesta de Valor

- **Simplicidad extrema:** Si sabes usar WhatsApp, sabes facturar
- **Velocidad:** Factura lista en segundos, no minutos
- **Sin curva de aprendizaje:** No hay que instalar apps ni aprender interfaces
- **Movilidad total:** Factura desde cualquier lugar con tu celular
- **Cumplimiento fiscal:** CFDIs válidos ante el SAT
- **Económico:** Sin costos de software empresarial

### Tono de Comunicación para el Blog

- **Cercano y empático:** Entendemos que facturar es una molestia, no tu negocio principal
- **Práctico:** Soluciones concretas, no teoría
- **Sin tecnicismos innecesarios:** Explicar términos fiscales de forma simple
- **Orientado a beneficios:** Tiempo ahorrado, estrés eliminado, enfoque en lo que importa
- **Ejemplos reales:** Situaciones cotidianas de doctores, freelancers, emprendedores

### Keywords Principales

**Transaccionales:**
- facturar por whatsapp
- factura automática whatsapp
- generar cfdi whatsapp
- facturación móvil méxico

**Informacionales:**
- cómo facturar como freelancer
- requisitos factura electrónica méxico
- qué es un cfdi
- cómo facturar siendo doctor independiente
- obligaciones fiscales freelancer méxico

**Por segmento:**
- facturación para doctores
- facturación para freelancers
- facturación para emprendedores
- sistema de facturación simple
- facturar sin contador

### Temas de Blog Sugeridos

**Para Doctores:**
- "Cómo facturar consultas médicas sin perder tiempo entre pacientes"
- "Obligaciones fiscales para médicos independientes en 2026"
- "Facturación para consultorios: guía completa"

**Para Freelancers:**
- "Guía de facturación para freelancers en México"
- "Cómo cobrar y facturar a clientes extranjeros"
- "Errores comunes al facturar como independiente"

**Para Emprendedores:**
- "Cuándo y cómo empezar a facturar en tu negocio"
- "Diferencias entre factura, recibo y nota de venta"
- "Cómo elegir tu régimen fiscal como emprendedor"

**Educativos (SEO/GEO):**
- "¿Qué es el CFDI y por qué lo necesitas?"
- "Guía del SAT para principiantes"
- "Deducciones fiscales que no conocías"

---

## Commands

```bash
bun run develop    # Start dev server at localhost:8000
bun run build      # Production build
bun run serve      # Serve production build locally
bun run clean      # Clear Gatsby cache (.cache and public/)
bun run format     # Format with Prettier
```

No test suite is configured (the `test` script is a placeholder). Use bun (not npm) as the package manager.

## Architecture

This is a **Gatsby 5 blog** with MDX support. `.mdx` is the preferred format for new posts; `.md` files continue to work for backwards compatibility with the starter's sample posts.

### Content Flow

1. Content files in `content/blog/<post-slug>/index.mdx` (or `.md`) are sourced via `gatsby-source-filesystem`
2. `.mdx` files → `gatsby-plugin-mdx` → `allMdx` GraphQL nodes
3. `.md` files → `gatsby-transformer-remark` → `allMarkdownRemark` GraphQL nodes
4. `gatsby-node.js` queries both node types, filters out `published: false` posts in production, and creates a page per post using `src/templates/blog-post.js`
5. MDX pages use the `?__contentFilePath=` suffix on the component path so MDX content is injected as `children` into the template
6. Slugs are derived from frontmatter `slug` field first, then fall back to the file path

### Frontmatter Schema

```md
---
title: Post Title          # required
date: "2026-01-01T00:00:00.000Z"  # required, ISO 8601
description: "..."         # required, used for SEO
slug: ""                   # optional, overrides path-derived slug
tags: []                   # optional, rendered as pill chips
author: ""                 # optional, defaults to siteMetadata.author.name
published: true            # optional, false hides post from production builds
---
```

### Key Files

- `gatsby-config.js` — site metadata (title, author, siteUrl), plugin config; update `siteMetadata` here for site identity
- `gatsby-node.js` — page creation for both MDX and MD, slug generation, GraphQL schema customization
- `src/pages/index.js` — blog listing page; merges MDX + MD post lists, sorts by date, filters drafts
- `src/templates/blog-post.js` — single post template; renders `{children}` for MDX, `dangerouslySetInnerHTML` for MD; displays title, description, date, author, tag pills, prev/next nav, "Back to blog" link
- `src/components/bio.js` — author bio (reads from `siteMetadata.author`)
- `src/components/layout.js` — site wrapper with header/footer
- `src/style.css` — global styles including `.post-tag`, `.post-description`, `.post-meta` classes
- `content/blog/_template.mdx` — copy this when creating new posts

### Adding a New Blog Post

```bash
cp content/blog/_template.mdx content/blog/my-post-slug/index.mdx
```

Fill in frontmatter, write content. Posts with `published: false` are visible in dev but excluded from production builds.

---

## SEO & GEO Content Guidelines (2026)

Esta sección define las mejores prácticas para crear contenido optimizado tanto para motores de búsqueda tradicionales (SEO) como para motores de IA generativa (GEO - Generative Engine Optimization).

### ¿Por qué importa GEO en 2026?

- Google AI Overviews aparece en **más del 25%** de todas las búsquedas
- **810 millones** de personas usan ChatGPT diariamente
- El tráfico de LLMs superará al de Google tradicional para finales de 2027
- El **93%** de las sesiones de AI search terminan sin click a un sitio web
- Contenido con citas, estadísticas y quotes logra **30-40% más visibilidad** en respuestas de IA

### Estructura Obligatoria de Cada Blog Post

Cada post debe seguir esta estructura en orden (los motores de IA son "top-heavy readers" - su comprensión se estabiliza alrededor de las 540 palabras):

```
1. TÍTULO (H1)
   - Un solo H1 por página
   - Incluir keyword principal
   - 30-65 caracteres idealmente

2. RESUMEN/TLDR (Primeros 200 palabras)
   - Responder directamente la pregunta principal
   - El 44.2% de las citas de LLMs vienen del primer 30% del texto
   - NO hacer buildup - ir directo a la respuesta

3. SECCIONES PRINCIPALES (H2s)
   - Cada H2 = un tema principal
   - Usar preguntas como headings: "¿Cómo hacer X?", "¿Qué es Y?"
   - 120-180 palabras entre headings (70% más citas de ChatGPT)

4. SUBSECCIONES (H3s)
   - Dividir H2s en partes más específicas
   - Nunca saltar de H2 a H4

5. ELEMENTOS DE AUTORIDAD (dentro de secciones)
   - Citas de fuentes confiables
   - Estadísticas con números específicos
   - Quotes de expertos

6. SECCIÓN FAQ (antes de conclusión)
   - 3-7 preguntas mínimo
   - Fraseadas como queries reales de usuarios
   - Respuestas de máximo 60 palabras cada una
   - Empezar con statement factual directo

7. CTA (Call-to-Action)
   - CTA secundario dentro de secciones relevantes
   - CTA principal al final del post

8. CONCLUSIÓN
   - Resumen de puntos clave
   - Próximos pasos claros

9. AUTHOR BIO
   - Obligatorio para EEAT
   - Los motores de IA verifican credenciales contra LinkedIn y directorios profesionales
   - Sin author bio credenciado, el contenido es deprioritizado
```

### Jerarquía de Headings (HTML Semántico)

```markdown
# H1: Título del Post (solo uno)
## H2: Secciones Principales
### H3: Subsecciones
#### H4: Detalles específicos (usar con moderación)
```

**Reglas:**
- Un solo H1 que define el intent de la página
- H2s para temas principales
- H3s para dividir H2s en partes digeribles
- Nunca saltar niveles (H2 → H4)
- Incluir keyword principal en H1, términos relacionados en H2s/H3s
- Evitar headings vacíos que no introducen contenido real

### Optimización para AI/Featured Snippets

**Formato de respuestas:**
- Bullets y listas numeradas
- Párrafos cortos (2-4 oraciones)
- Respuestas concisas de 40-60 palabras para voice search
- Definiciones claras al inicio de cada sección

**Fan-out queries:**
Los motores de IA dividen preguntas complejas en sub-queries. Asegurarse de:
- Tener contenido que rankee para sub-queries cortas
- Usar la misma terminología que buscaría la IA

### Elementos de Credibilidad (E-E-A-T)

Cada post DEBE incluir:

1. **Citas de fuentes** - Links a estudios, documentación oficial
2. **Estadísticas específicas** - Números concretos con fuente
3. **Quotes de expertos** - Frases atribuidas a autoridades del tema
4. **Fecha de publicación visible** - Los motores de IA tienen sesgo hacia contenido reciente
5. **Author con credenciales** - Nombre, rol, links a perfiles profesionales

**Impacto medido:**
- Sitios con author schema son **3x más probables** de aparecer en respuestas de IA
- Sitios con FAQ schema vieron **44% más citas** en AI search
- Páginas con schema markup son **36% más probables** de aparecer en respuestas de IA

### Frontmatter Extendido para SEO/GEO

```yaml
---
title: "Título SEO Optimizado"           # required, 30-65 chars
date: "2026-01-01T00:00:00.000Z"         # required, ISO 8601
description: "Meta description clara"    # required, 150-160 chars
slug: "url-amigable"                     # optional
tags: ["tag1", "tag2"]                   # optional, 3-5 tags relevantes
author: "Nombre Completo"                # required for EEAT
authorRole: "Rol/Título Profesional"     # recommended
authorLinkedIn: "url"                    # recommended
published: true                          # optional
lastUpdated: "2026-01-15"                # recommended (recency bias)
---
```

### Schema Markup (JSON-LD)

Implementar en cada post:

**BlogPosting Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título del Post",
  "author": {
    "@type": "Person",
    "name": "Nombre del Autor",
    "url": "LinkedIn URL"
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-15"
}
```

**FAQPage Schema (anidado en BlogPosting):**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Pregunta frecuente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respuesta directa y concisa."
      }
    }
  ]
}
```

### Checklist Pre-Publicación

- [ ] H1 único con keyword principal
- [ ] TLDR/resumen en primeros 200 palabras
- [ ] Jerarquía H1 → H2 → H3 correcta
- [ ] 120-180 palabras entre headings
- [ ] Al menos 3 estadísticas con fuente
- [ ] Al menos 2 citas/quotes de expertos
- [ ] Sección FAQ con 3-7 preguntas
- [ ] CTA claro al final
- [ ] Author bio con credenciales
- [ ] Meta description 150-160 caracteres
- [ ] Schema markup implementado
- [ ] Fecha de última actualización visible
- [ ] Links internos a otros posts
- [ ] Links externos a fuentes autoritativas

### Factores Técnicos para AI Visibility

- **Velocidad:** Páginas con FCP < 0.4s tienen 3x más citas de ChatGPT
- **Robots.txt:** Verificar que AI crawlers no estén bloqueados
- **Renderizado:** Contenido debe ser server-side rendered (no hidden behind JS)
- **Freshness:** Contenido actualizado en últimos 2 meses recibe 28% más citas

### Recursos

- [Search Engine Land - GEO Guide 2026](https://searchengineland.com/mastering-generative-engine-optimization-in-2026-full-guide-469142)
- [Backlinko - Generative Engine Optimization](https://backlinko.com/generative-engine-optimization-geo)
- [LLMrefs - GEO 2026 Guide](https://llmrefs.com/generative-engine-optimization)
- [Google Structured Data - FAQ](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Schema.org - BlogPosting](https://schema.org/BlogPosting)
