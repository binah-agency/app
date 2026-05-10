# Virus Jeans - Estrategia de Modals

## Resumen de Modals Actuales

1. **ExitIntentModal** - Se activa al intentar salir o después de 15 segundos
2. **NewsletterModal** - Se activa después de 8 segundos
3. **QuickContactModal** - Botón flotante para contacto rápido

---

## MODALS RECOMENDADOS

### 1. Exit Intent Modal (Ya existe - actualizar)

**Objetivo**: Capturar usuarios que están por abandonar la página

**Trigger**: 
- Mouse sale por arriba de la ventana
- Después de 15 segundos de navegación

**Copy**:
```
¡Espera! 👋
¿Tienes dudas sobre nuestros productos al por mayor? 
Escríbenos por WhatsApp y te respondemos en minutos!
```

**CTA**: "Chatear por WhatsApp"

**Frecuencia**: Una vez por sesión

---

### 2. Newsletter/Lead Modal (Ya existe - optimizar)

**Objetivo**: Capturar leads (números de WhatsApp) para follow-up

**Trigger**: 
- Después de 8 segundos (ajustado)
- Solo para usuarios nuevos

**Oferta**: 
```
🎁 OBTÉN TU CATÁLOGO FREE
Recibe nuestro catálogo completo de jeans y ropa 
directamente por WhatsApp
```

**Campos**:
- Número de WhatsApp (solo pedir esto, no email)

**CTA**: "Obtener Catálogo"

**Nota**: Cambiar de "20% descuento" a "Catálogo Free" ya que es B2B

---

### 3. WhatsApp Float Button (Por crear)

**Objetivo**: Permanente botón flotante de WhatsApp

**Ubicación**: Esquina inferior derecha

**Diseño**: Botón circular verde con ícono de WhatsApp

**Funcionalidad**: Abre WhatsApp directamente

---

### 4. Request Catalog Modal (Por crear)

**Objetivo**: Capturar datos de potenciales clientes mayoristas

**Trigger**: 
- Click en botón "Ver Catálogo" o "Descargar Catálogo"
-亦 亦亦亦亦亦亦亦亦亦

**Campos**:
- Nombre
- Teléfono/WhatsApp
- Ciudad/Estado
- Tipo de negocio (tienda, revendedor, etc.)
- Mensaje opcional

**CTA**: "Solicitar Catálogo"

---

### 5. Delivery Info Modal (Por crear)

**Objetivo**: Informar sobre métodos de envío

**Trigger**: 
- Click en "Envíos" en el footer
-亦亦亦亦亦亦亦亦亦

**Contenido**:
```
📦 ENVÍOS A TODO VENEZUELA

Medios disponibles:
• Liberty Express
• MRW
• ZOOM
• Tealca
• Domesa
• GPS

Tiempo de entrega: 24-72 horas hábiles
Costo: Según zona y peso

💬 Consultas: Escríbenos al WhatsApp
```

---

### 6. Contact Modal (Ya existe - mejorar)

**Objetivo**: Facilitar contacto rápido

**Ubicación**: Botón flotante en esquina

**Opciones**:
- WhatsApp directo
- Llamada telefónica
- Ver ubicación (Google Maps)

---

## TIMING RECOMENDADO

| Modal | Timing | Condición |
|-------|--------|-----------|
| Newsletter | 8 segundos | Solo usuarios nuevos |
| Exit Intent | 15 segundos / mouse exit | Una vez por sesión |
| Quick Contact | Siempre visible | Botón flotante |

---

## PERSISTENCIA (LocalStorage)

| Modal | Clave | Duración |
|-------|-------|----------|
| Newsletter | newsletterShown | 7 días |
| Exit Intent | exitIntentShown | 24 horas |
| Request Catalog | catalogRequested | Nunca (solo una vez) |

---

## VARIANTES DE COPY

### Para Exit Intent
```
Opción A:
¡No te vayas sin tu catálogo! 📦
Escríbenos y te enviamos toda la colección 2025

Opción B:
¿Aún no conoces nuestros precios mayoristas?
Chatea con nosotros ahora y obtén tu oferta especial

Opción C:
👖 ¿Buscas Jeans al mayor?
Te tenemos las mejores ofertas del mercado
```

### Para Newsletter/Lead
```
Opción A:
🎁 CATÁLOGO FREE
Recibe nuestro inventario completo por WhatsApp

Opción B:
📱 ¿Vendes ropa? ¡Esto te interesa!
Recibe precios mayoristas exclusivos

Opción C:
✨ NUEVA COLECCIÓN DISPONIBLE
Sé el primero en ver los nuevos modelos
```

---

## KPIs A MEDIR

1. **Tasa de conversión de modals** - % de visitantes que completan el modal
2. **Tiempo hasta primera interacción** - Cuánto tardan en Engagement
3. **Lead quality** - Número de conversaciones iniciadas por WhatsApp
4. **Bounce reduction** - Reducción en tasa de rebote gracias a modals

---

##mejores Prácticas

1. ✅ Usar WhatsApp como principal canal (mayor conversión en Venezuela)
2. ✅ Solo pedir información mínima (número de teléfono)
3. ✅ Mostrar modals con delay para no interrumpir experiencia
4. ✅ Usar ofertas relevantes para B2B (catálogo, no descuentos)
5. ✅ Siempre dar opción de cerrar sin insistencia
6. ✅ Persistir para no molestar usuarios que ya interactuaron
7. ✅ Mobile-first: Los modals deben funcionar bien en móvil