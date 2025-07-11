import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEth(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${num.toFixed(4)} ETH`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateProgress(current: number, target: number): number {
  return Math.min((current / target) * 100, 100);
}

export function timeRemaining(endDate: Date): string {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}

export function getReputationLevel(score: number): {
  level: string;
  color: string;
  description: string;
} {
  if (score >= 9.0) return { level: "Legendary", color: "yellow", description: "Top 1% Creator" };
  if (score >= 8.0) return { level: "Elite", color: "purple", description: "Top 5% Creator" };
  if (score >= 7.0) return { level: "Expert", color: "cyan", description: "Top 15% Creator" };
  if (score >= 6.0) return { level: "Advanced", color: "green", description: "Experienced Creator" };
  if (score >= 4.0) return { level: "Intermediate", color: "blue", description: "Growing Creator" };
  return { level: "Novice", color: "gray", description: "New Creator" };
}