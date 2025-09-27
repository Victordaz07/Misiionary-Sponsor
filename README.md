# Portal Familiar Sponsor

Un portal web para familias patrocinadoras de misiones que permite realizar donaciones, seguir el progreso de los misioneros y generar reportes mensuales.

## 🚀 Características

- **Autenticación con Magic Link**: Login seguro sin contraseñas usando Firebase Auth
- **Dashboard de Patrocinador**: Métricas y estadísticas de patrocinio
- **Feed de Misiones**: Fotos y testimonios de los misioneros
- **Sistema de Donaciones**: Integración con Stripe para pagos seguros
- **Reportes Mensuales**: Generación de reportes en PDF y HTML
- **UI Moderna**: Diseño responsive con TailwindCSS y shadcn/ui

## 🛠️ Tecnologías

- **Frontend**: Next.js 14 con App Router
- **UI**: TailwindCSS + shadcn/ui
- **Autenticación**: Firebase Auth
- **Base de Datos**: Firestore
- **Pagos**: Stripe
- **Lenguaje**: TypeScript

## 📁 Estructura del Proyecto

```
portal-familiar-sponsor/
├── app/
│   ├── (auth)/              # Páginas de autenticación
│   │   ├── login/
│   │   └── callback/
│   ├── (dashboard)/         # Dashboard principal
│   │   └── dashboard/
│   ├── (feed)/             # Feed de misiones
│   │   └── feed/
│   ├── (donations)/        # Sistema de donaciones
│   │   └── donations/
│   ├── (reports)/          # Generación de reportes
│   │   └── reports/
│   ├── api/                # API Routes
│   │   ├── checkout/
│   │   ├── webhook/
│   │   └── reports/
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Componentes reutilizables
│   ├── ui/                # Componentes de shadcn/ui
│   ├── FeedCard.tsx
│   ├── DonationButton.tsx
│   ├── SponsorStats.tsx
│   └── ReportPreview.tsx
├── lib/                   # Utilidades y configuración
│   ├── auth.ts
│   ├── db.ts
│   ├── firebase.ts
│   ├── stripe.ts
│   └── utils.ts
└── styles/
    └── globals.css
```

## ⚙️ Configuración

### 1. Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd portal-familiar-sponsor

# Instalar dependencias
npm install
```

### 2. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita Authentication con Email/Password
4. Habilita Firestore Database
5. Obtén las credenciales de configuración
6. Actualiza las variables de entorno

### 4. Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com/)
2. Obtén las claves de API desde el dashboard
3. Configura los webhooks para el endpoint `/api/webhook`
4. Actualiza las variables de entorno

### 5. Ejecutar el Proyecto

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/signin` - Iniciar sesión con magic link
- `POST /api/auth/signout` - Cerrar sesión

### Donaciones
- `POST /api/checkout` - Crear sesión de pago
- `POST /api/webhook` - Webhook de Stripe

### Reportes
- `GET /api/reports` - Obtener reportes
- `POST /api/reports` - Generar nuevo reporte

## 📊 Base de Datos

### Colecciones de Firestore

#### `feedPosts`
```typescript
{
  id: string
  title: string
  content: string
  imageUrl?: string
  author: string
  createdAt: Timestamp
  tags: string[]
}
```

#### `sponsorStats`
```typescript
{
  id: string
  userId: string
  missionariesSponsored: number
  totalDonated: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  lastDonationDate: Timestamp
  createdAt: Timestamp
}
```

#### `donations`
```typescript
{
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  stripePaymentIntentId: string
  createdAt: Timestamp
  description?: string
}
```

#### `reports`
```typescript
{
  id: string
  userId: string
  month: number
  year: number
  totalDonated: number
  missionariesSponsored: number
  feedPosts: number
  createdAt: Timestamp
}
```

## 🎨 Componentes Principales

### FeedCard
Muestra las publicaciones del feed con imagen, título, contenido y metadatos.

### DonationButton
Componente para realizar donaciones con montos predefinidos y personalizados.

### SponsorStats
Muestra las estadísticas del patrocinador incluyendo misioneros patrocinados, total donado y nivel.

### ReportPreview
Vista previa de reportes mensuales con opciones de descarga en PDF y HTML.

## 🔒 Seguridad

- Autenticación con Firebase Auth
- Validación de webhooks de Stripe
- Sanitización de datos de entrada
- Variables de entorno para credenciales sensibles

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas, contacta al equipo de desarrollo o crea un issue en el repositorio.

---

**Desarrollado con ❤️ para las familias patrocinadoras de misiones**
