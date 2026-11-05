"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import Script from "next/script"
import {
  CLARITY_ID,
  GA_ID,
  HAS_CONSENT_TOOLS,
  OPEN_CONSENT_EVENT,
  captureAttribution,
  clearAnalyticsCookies,
  readConsent,
  saveConsent,
  subscribeConsent,
  track,
  type Consent,
} from "@/lib/analytics"

/**
 * Banner de cookies + carga condicionada de GA4/Clarity + evento
 * contact_clicked para enlaces de email, teléfono y WhatsApp.
 */
export function Analytics() {
  // "ssr" mientras no se ha hidratado: no se muestra nada ni se carga nada.
  const consent = useSyncExternalStore<Consent | null | "ssr">(
    subscribeConsent,
    readConsent,
    () => "ssr",
  )
  const [reopened, setReopened] = useState(false)
  const bannerOpen =
    HAS_CONSENT_TOOLS && consent !== "ssr" && (consent === null || reopened)

  useEffect(() => {
    captureAttribution()
    // GA4 puede reescribir sus cookies justo antes de recargar al retirar
    // el consentimiento: se limpian de nuevo en cada carga si está rechazado.
    if (readConsent() === "denied") clearAnalyticsCookies()

    const reopen = () => setReopened(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)

    // contact_clicked: un único listener para todos los enlaces de contacto
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a")
      const href = a?.getAttribute("href") ?? ""
      const channel = href.startsWith("mailto:")
        ? "email"
        : href.startsWith("tel:")
          ? "telefono"
          : href.includes("wa.me/")
            ? "whatsapp"
            : ""
      if (channel) track("contact_clicked", { channel, page: location.pathname })
    }
    document.addEventListener("click", onClick)

    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
      document.removeEventListener("click", onClick)
    }
  }, [])

  function decide(value: Consent) {
    const previous = consent
    saveConsent(value)
    setReopened(false)
    // Retirar un consentimiento ya dado: borrar cookies y recargar para
    // descargar los scripts de GA4/Clarity.
    if (previous === "granted" && value === "denied") {
      clearAnalyticsCookies()
      location.reload()
    }
  }

  const granted = consent === "granted"

  return (
    <>
      {granted && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {granted && CLARITY_ID && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});`}
        </Script>
      )}

      {bannerOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-3 z-[150] mx-auto max-w-lg rounded-2xl border border-border bg-card p-5 shadow-2xl md:inset-x-auto md:bottom-6 md:left-6 md:mx-0"
        >
          <h2 id="consent-title" className="text-sm font-semibold">
            Cookies de analítica
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Con tu permiso usamos cookies de Google Analytics y Microsoft
            Clarity para entender cómo se usa la web y mejorarla. No las
            usamos para publicidad.{" "}
            <Link href="/cookies" className="underline hover:text-foreground">
              Más información
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => decide("denied")}
              className="rounded-full border border-border px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-foreground/5"
            >
              Rechazar
            </button>
            <button
              onClick={() => decide("granted")}
              className="rounded-full border border-border px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-foreground/5"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
