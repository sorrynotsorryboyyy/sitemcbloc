"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { catalog } from "@/lib/data/shop";

export type CartItem = {
  id: string;
  name: string;
  category: "Grade" | "Pièces" | "Booster";
  price: number;
  qty: number;
  color?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  ready: boolean;
  add: (item: Omit<CartItem, "qty">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "mcbloc.cart";

/** Nom et prix toujours relus dans le catalogue (network.json) : un article inconnu ou modifié à la main est retiré. */
function fromCatalog(id: string, qty: number): CartItem | null {
  const entry = catalog.get(id);
  if (!entry || !Number.isInteger(qty) || qty < 1) return null;
  return { ...entry, qty: Math.min(qty, entry.category === "Grade" ? 1 : 10) };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { id: string; qty: number }[];
        setItems(saved.map((i) => fromCatalog(String(i?.id), Number(i?.qty))).filter((i): i is CartItem => i !== null));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items.map((i) => ({ id: i.id, qty: i.qty }))));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setLastAdded(null), 2200);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const add = useCallback((wanted: Omit<CartItem, "qty">) => {
    const item = fromCatalog(wanted.id, 1);
    if (!item) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      // Un grade ne s'achète qu'une fois ; on ne garde qu'un seul grade dans le panier.
      if (item.category === "Grade") {
        return [...prev.filter((i) => i.category !== "Grade"), item];
      }
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: Math.min(i.qty + 1, 10) } : i));
      return [...prev, item];
    });
    setLastAdded(item.name);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 10) } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;
    return { items, count, total, ready, add, setQty, remove, clear, lastAdded };
  }, [items, ready, add, setQty, remove, clear, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
