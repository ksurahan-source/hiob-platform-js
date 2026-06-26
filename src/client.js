/**
 * Supabase clients — runtime-agnostic (Node, Cloudflare Workers/Pages, browser).
 *
 * The SDK does NOT read env directly. Consumer passes URL + key.
 * This keeps the SDK portable across Cloudflare (getRequestContext().env),
 * Node (process.env), Modal (os.environ), and the browser (NEXT_PUBLIC_*).
 *
 *   getBrowserClient({ url, publishableKey })
 *   getServerClient({ url, publishableKey, cookieStore })
 *   getServiceClient({ url, secretKey })
 */

import { createBrowserClient as createBrowserClientSsr, createServerClient as createServerClientSsr } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

/**
 * @param {{ url: string, publishableKey: string }} opts
 */
export function getBrowserClient({ url, publishableKey }) {
  if (!url || !publishableKey) throw new Error('getBrowserClient: url and publishableKey are required');
  return createBrowserClientSsr(url, publishableKey);
}

/**
 * @param {{ url: string, publishableKey: string,
 *           cookieStore: { get: (n: string) => { value: string } | undefined,
 *                          set?: (n: string, v: string, o?: object) => void,
 *                          remove?: (n: string, o?: object) => void } }} opts
 */
export function getServerClient({ url, publishableKey, cookieStore }) {
  if (!url || !publishableKey) throw new Error('getServerClient: url and publishableKey are required');
  return createServerClientSsr(url, publishableKey, {
    cookies: {
      get: (n) => cookieStore.get(n)?.value,
      set: (n, v, o) => cookieStore.set?.(n, v, o),
      remove: (n, o) => cookieStore.remove?.(n, o),
    },
  });
}

/**
 * Server-only. Bypasses RLS. Never call from a "use client" component.
 * @param {{ url: string, secretKey: string }} opts
 */
export function getServiceClient({ url, secretKey }) {
  if (!url || !secretKey) throw new Error('getServiceClient: url and secretKey are required');
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
