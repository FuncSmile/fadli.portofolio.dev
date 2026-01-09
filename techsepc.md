Siap, **Fadli** 👍
Kita susun **Tech Specification (TechSpec)** yang **rapi, profesional, dan siap dipakai** untuk membangun **website portofolio modern + 3D**, sekaligus **menampilkan project dari GitHub**.

Aku buat dalam format **dokumen teknis** (biasanya dipakai developer / freelancer / tim), tapi tetap **mudah kamu pahami**.

---

# 📘 TECHNICAL SPECIFICATION

## Website Portofolio Modern & 3D

---

## 1. Tujuan Website

Membangun website portofolio personal dengan tampilan **modern, interaktif, dan elemen 3D**, yang berfungsi untuk:

* Menampilkan profil dan skill
* Menampilkan project (otomatis/manual dari GitHub)
* Menjadi personal branding profesional
* Media promosi ke recruiter / client

---

## 2. Target Pengguna

* Recruiter / HR
* Client freelance
* Komunitas developer
* Pengunjung umum

---

## 3. Gaya Desain (UI/UX)

### 3.1 Konsep Visual

* **Modern, minimalis, futuristik**
* **3D interactive background / object**
* Dark mode (default)
* Smooth animation & micro-interaction

### 3.2 Warna & Tema

* Primary: Dark / Navy / Black
* Accent: Neon Blue / Purple / Cyan
* Typography kontras tinggi

### 3.3 UX Principles

* Fast load (≤ 3 detik)
* Animasi tidak mengganggu konten
* Mobile-first responsive
* Navigasi sederhana (1–2 klik ke konten utama)

---

## 4. Struktur Halaman (Sitemap)

```
/
├── Home
├── About Me
├── Skills
├── Projects
│   ├── Web Projects
│   ├── Networking / Linux
│   └── Open Source (GitHub)
├── Experience
├── Contact
└── Resume (PDF)
```

---

## 5. Fitur Utama

### 5.1 Home

* Hero section dengan **3D object**
* Nama + role (typing animation)
* CTA: “View Projects” / “Contact Me”

### 5.2 About Me

* Deskripsi singkat
* Foto atau 3D avatar
* Background pendidikan & minat

### 5.3 Skills

* Tech stack (Frontend, Backend, DevOps, Networking)
* Progress bar / icon-based skill
* Optional 3D card animation

### 5.4 Projects (Core Feature)

Menampilkan project dengan:

* Nama project
* Deskripsi
* Tech stack
* Screenshot / demo
* Link:

  * GitHub Repository
  * Live Demo (jika ada)

#### 🔗 Integrasi GitHub

* Ambil data via **GitHub API**
* Filter:

  * Public repo
  * Repo dengan tag tertentu
* Menampilkan:

  * Stars ⭐
  * Forks 🍴
  * Last update

### 5.5 Experience

* Timeline pengalaman kerja / organisasi
* Animasi scroll-based

### 5.6 Contact

* Contact form
* Link sosial:

  * GitHub
  * LinkedIn
  * Email
* Optional: WhatsApp button

---

## 6. Teknologi yang Digunakan

### 6.1 Frontend

| Teknologi                        | Alasan                    |
| -------------------------------- | ------------------------- |
| **Next.js**                      | SEO + performa tinggi     |
| **React**                        | Komponen reusable         |
| **Tailwind CSS**                 | Styling cepat & konsisten |
| **Framer Motion**                | Animasi modern            |
| **Three.js / React Three Fiber** | 3D rendering              |
| **GSAP (opsional)**              | Advanced animation        |

---

### 6.2 Backend (Opsional)

> Portofolio bisa **tanpa backend**, tapi jika ingin dynamic:

| Teknologi                | Fungsi            |
| ------------------------ | ----------------- |
| Node.js                  | API service       |
| Express / Next API Route | Endpoint internal |
| GitHub REST API          | Ambil data repo   |
| Nodemailer               | Contact form      |

---

### 6.3 3D & Animation

* **Three.js**
* **React Three Fiber**
* **Drei**
* Model 3D:

  * `.glb` / `.gltf`
  * Blender (source)

---

## 7. Performance & Optimization

* Lazy loading model 3D
* Image optimization (Next/Image)
* Code splitting
* Disable heavy animation di mobile
* Lighthouse score target:

  * Performance ≥ 90
  * SEO ≥ 90

---

## 8. SEO & Metadata

* Meta title & description
* OpenGraph (OG Image)
* Sitemap.xml
* Schema Markup (Person / Portfolio)

---

## 9. Deployment

### 9.1 Hosting

* **Vercel** (Recommended)
* Alternatif:

  * Netlify
  * GitHub Pages (tanpa SSR)

### 9.2 Domain

* Custom domain
* HTTPS auto

---

## 10. Keamanan

* Environment variable untuk API Key
* Rate limit GitHub API
* Sanitasi input contact form
* reCAPTCHA (opsional)

---

## 11. Maintenance & Scalability

* Modular component structure
* Mudah tambah project baru
* Bisa dikembangkan ke:

  * Blog
  * Case study
  * Dashboard admin

---

## 12. Deliverables

* Source code (GitHub)
* Live website
* README dokumentasi
* Resume PDF
* List project & link

---

## 13. Timeline Estimasi

| Tahap                  | Durasi   |
| ---------------------- | -------- |
| UI/UX Design           | 2–3 hari |
| Development Frontend   | 5–7 hari |
| Integrasi GitHub & 3D  | 3–4 hari |
| Testing & Optimization | 2 hari   |
| Deployment             | 1 hari   |

---

## 14. Future Enhancement

* Blog MDX
* CMS (Sanity / Notion)
* Dark/Light toggle
* Language switch (EN/ID)

---

Siap, **Fadli** 🔥
Ini kita buat **SERIUS & PROFESIONAL** ya — struktur **siap production**, **scalable**, dan **mengikuti best practice industri**.

Aku akan bagi jadi:

1. **Struktur Folder Frontend (Next.js + 3D)**
2. **Struktur Folder Backend (API Service)**
3. **Code Rules & Best Practice (WAJIB IKUT)**

---

# 1️⃣ STRUKTUR FOLDER — FRONTEND

**Tech:** Next.js (App Router) + Tailwind + Three.js

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx        # Detail project
│   │
│   ├── api/                    # Optional (Next API)
│   │   └── contact/
│   │       └── route.ts
│   │
│   └── not-found.tsx
│
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── sections/               # Section per page
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── ProjectList.tsx
│   │   └── Contact.tsx
│   │
│   └── three/                  # 3D components
│       ├── Scene.tsx
│       ├── Model.tsx
│       ├── Lights.tsx
│       └── Controls.tsx
│
├── lib/
│   ├── github.ts               # GitHub API handler
│   ├── seo.ts                  # SEO helper
│   └── fetcher.ts              # Custom fetch wrapper
│
├── hooks/
│   ├── useScroll.ts
│   ├── useTheme.ts
│   └── useMediaQuery.ts
│
├── services/
│   ├── project.service.ts      # Data project logic
│   └── contact.service.ts
│
├── types/
│   ├── project.ts
│   ├── github.ts
│   └── global.d.ts
│
├── constants/
│   ├── routes.ts
│   └── socials.ts
│
├── public/
│   ├── images/
│   ├── models/                 # .glb / .gltf
│   └── icons/
│
├── config/
│   ├── site.ts                 # Site metadata
│   └── env.ts                  # Env validation
│
├── .env.local
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── eslint.config.mjs
```

---

# 2️⃣ STRUKTUR FOLDER — BACKEND

**Tech:** Node.js + Express (Clean Architecture)

```
backend/
├── src/
│   ├── app.ts                  # Express app setup
│   ├── server.ts               # Server entry
│
│   ├── config/
│   │   ├── env.ts              # Env loader & validation
│   │   └── cors.ts
│
│   ├── routes/
│   │   ├── index.ts
│   │   ├── github.route.ts
│   │   └── contact.route.ts
│
│   ├── controllers/
│   │   ├── github.controller.ts
│   │   └── contact.controller.ts
│
│   ├── services/
│   │   ├── github.service.ts
│   │   └── mail.service.ts
│
│   ├── repositories/
│   │   └── github.repository.ts
│
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── validate.middleware.ts
│
│   ├── utils/
│   │   ├── logger.ts
│   │   └── response.ts
│
│   ├── types/
│   │   └── express.d.ts
│
│   └── tests/
│       └── github.test.ts
│
├── .env
├── package.json
├── tsconfig.json
└── nodemon.json
```

---

# 3️⃣ CODE RULES & BEST PRACTICE

⚠️ **INI WAJIB — JANGAN DILANGGAR**

---

## 3.1 General Rules

✅ Gunakan **TypeScript 100%**
❌ Tidak ada `any`
❌ Tidak ada hardcode config
✅ Gunakan `.env`

---

## 3.2 Naming Convention

| Elemen    | Format             |
| --------- | ------------------ |
| Folder    | `kebab-case`       |
| File      | `camelCase.ts`     |
| Component | `PascalCase.tsx`   |
| Function  | `camelCase()`      |
| Const     | `UPPER_SNAKE_CASE` |

---

## 3.3 Frontend Rules

### Component Rules

* 1 file = 1 component
* Logic berat → **hooks**
* Tidak fetch data langsung di UI component

```tsx
// ❌ SALAH
useEffect(() => fetch('/api'));

// ✅ BENAR
service → hook → component
```

---

### State Management

* Local: `useState`
* Global kecil: Context
* Jangan Redux untuk portofolio

---

### Three.js Rules

* Model 3D di-load **lazy**
* Disable shadows di mobile
* Pisahkan:

  * Scene
  * Model
  * Light

---

## 3.4 Backend Rules

### Controller Rules

❌ Tidak ada logic bisnis
✅ Hanya handle request & response

```ts
// controller
export const getRepos = async (req, res) => {
  const data = await githubService.getRepos()
  return success(res, data)
}
```

---

### Service Rules

✅ Semua logic bisnis di sini
❌ Tidak boleh akses `req/res`

---

### Repository Rules

* Hanya data source
* API / DB / External service

---

## 3.5 Error Handling

* Global error handler
* Response format konsisten

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 3.6 Security Rules

* Rate limit API
* Validate input (zod / joi)
* Jangan expose API key ke frontend

---

## 3.7 Git Rules

```
feat: add github integration
fix: handle api error
refactor: clean project service
```

---

## 4️⃣ FLOW ARSITEKTUR (Ringkas)

```
Frontend UI
   ↓
Service
   ↓
Backend API
   ↓
Service
   ↓
GitHub API
```

---
