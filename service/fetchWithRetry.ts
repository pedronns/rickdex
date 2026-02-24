// lib/fetchWithRetry.ts
export async function fetchWithRetry<T>(url: string, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json() as T;
    } catch (err) {
      if (i < retries - 1) {
        // espera antes de tentar novamente
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err; // se falhar todas as tentativas, lança o erro
      }
    }
  }
  throw new Error("Unexpected error"); // fallback (não deve chegar aqui)
}