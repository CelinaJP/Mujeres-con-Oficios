# Mujeres con Oficios — Panel de Agencia

Plataforma de gestión para la agencia que conecta clientes con profesionales de oficios. Permite gestionar solicitudes de servicio, perfiles, asignaciones y seguimiento de trabajos.

## Stack Técnico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI / componentes funcionales |
| TypeScript | ~5.8 | Tipado estático |
| Vite | 6 | Build tool + dev server |
| Tailwind CSS | 4 | Estilos utility-first |
| Lucide React | ^0.564 | Iconografía |

## Estructura del Proyecto

```
├── App.tsx                     # Raíz: enrutamiento por TabType
├── index.tsx                   # Entry point
├── index.html
├── globals.css                 # Estilos globales + animaciones
├── types.ts                    # Interfaces y enums TypeScript
├── mockData.ts                 # Datos de prueba (sin backend)
├── metadata.json               # Metadatos de la app
├── vite.config.ts
├── tsconfig.json
│
├── components/
│   ├── Layout.tsx               # Shell: header, nav inferior, overlays
│   ├── NotificationCenter.tsx   # Panel de notificaciones (slide)
│   ├── OnboardingModal.tsx      # Wizard de bienvenida (5 pasos)
│   ├── ProfessionalProfileModal.tsx  # Perfil completo en drawer
│   └── ui/
│       ├── AvailabilityBadge.tsx  # Indicador disponibilidad profesional
│       ├── EmptyState.tsx         # Estado vacío reutilizable
│       ├── PriorityBadge.tsx      # Badge de prioridad
│       ├── SectionHeader.tsx      # Encabezado de sección con contador
│       ├── StatusBadge.tsx        # Badge de estado de trabajo
│       └── Tooltip.tsx            # Tooltip accesible (hover/focus)
│
└── views/
    ├── DashboardView.tsx        # Panel principal con métricas y accesos rápidos
    ├── DirectoryView.tsx        # Directorio con filtros avanzados
    ├── MatchingView.tsx         # Solicitudes + asignación inteligente
    ├── SurveyView.tsx           # Crear/editar fichas técnicas
    └── AcademyView.tsx          # (módulo de cursos — fuera de scope actual)
```

## Flujos Principales

### Flujo de Asignación (Matching)
```
Dashboard → ver solicitud pendiente
     ↓
Matching tab → expandir solicitud
     ↓
"Asignar profesional" → AssignDrawer
     ↓
Sistema sugiere profesionales (por zona + disponibilidad)
     ↓
Confirmar asignación → estado pasa a "en curso"
     ↓
Actualizar estado → Completado / Cancelado
```

### Flujo de Notificaciones
```
Nueva solicitud o evento → mockNotifications (futuro: API push)
     ↓
Ícono Bell en header → badge con contador unread
     ↓
Tap → NotificationCenter (slide desde arriba)
     ↓
Tap en notificación → navega a tab relevante + marca leída
     ↓
"Marcar todas leídas" → limpia badge
```

### Flujo de Onboarding
```
Primera visita → localStorage.getItem('mo_onboarded') === null
     ↓
OnboardingModal se muestra automáticamente (5 pasos)
     ↓
Paso 1: Bienvenida → Paso 2: Dashboard → Paso 3: Matching
     → Paso 4: Directorio → Paso 5: Fichas
     ↓
"Comenzar" o "Saltar" → localStorage.setItem('mo_onboarded', 'true')
     ↓
Modal no vuelve a aparecer
```

## Catálogo de Componentes UI

### `<StatusBadge status={...} size? />`
Estados de trabajo con color e ícono. `size`: `'sm' | 'md'` (default `'md'`).

| Status | Color | Ícono |
|---|---|---|
| `pending` | Amber | Clock |
| `in_progress` | Blue | Play |
| `completed` | Emerald | CheckCircle |
| `cancelled` | Slate | XCircle |

### `<PriorityBadge priority={...} />`
| Priority | Color |
|---|---|
| `low` | Slate |
| `medium` | Amber |
| `high` | Rose |

### `<AvailabilityBadge status={...} showLabel? />`
| Status | Dot | Label |
|---|---|---|
| `available` | Emerald animado | Disponible |
| `busy` | Amber | Ocupada |
| `unavailable` | Rose | No disponible |

### `<EmptyState icon={...} title="..." description? action? />`
Estado vacío genérico. `action`: `{ label: string, onClick: () => void }`.

### `<SectionHeader title="..." count? actionLabel? onAction? />`
Encabezado de sección con badge de conteo y link de acción opcionales.

### `<Tooltip content="..." position? />`
Tooltip accesible (hover + focus). `position`: `'top' | 'bottom' | 'left' | 'right'` (default `'top'`).

## Enrutamiento

No usa React Router. El enrutado es por `TabType` enum + `useState` en `App.tsx`:

```typescript
enum TabType {
  DASHBOARD  = 'dashboard',
  MATCHING   = 'matching',
  SURVEY     = 'survey',
  DIRECTORY  = 'directory',
  ACADEMY    = 'academy',   // fuera de scope actual
}
```

Para navegar entre tabs desde cualquier componente hijo, usar el prop `onNavigate: (tab: TabType) => void`.

## Accesibilidad (a11y)

- Todos los botones interactivos tienen `aria-label` descriptivo
- Navegación inferior usa `role="navigation"` + `aria-label` + `aria-current="page"`
- Modales usan `role="dialog"` + `aria-modal="true"` + `aria-label`
- Focus ring visible global: `*:focus-visible { outline: 2px solid #7c3aed }`
- Skip link "Saltar al contenido" para usuarios de teclado
- `prefers-reduced-motion` respetado (elimina animaciones)
- Íconos decorativos tienen `aria-hidden="true"`
- Contadores de notificaciones en `aria-label` del botón

## Scripts

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción → dist/
npm run preview  # Preview del build
```

## Variables de Entorno

El proyecto usa datos mock (`mockData.ts`). No requiere variables de entorno en esta versión.  
Para integrar un backend, crear `.env` con:
```env
VITE_API_BASE_URL=https://tu-api.com
```

## Roadmap / Issues Pendientes

- [ ] Integración con backend real (API REST o Firebase)
- [ ] Módulo de cursos y capacitación (`AcademyView`)
- [ ] Sistema de pago y facturación
- [ ] Notificaciones push reales (Web Push API)
- [ ] Modo offline (Service Worker / PWA)
- [ ] Panel multi-agencia (multi-tenant)
