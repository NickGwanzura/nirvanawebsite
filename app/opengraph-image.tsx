import { ImageResponse } from 'next/og'
import { Logo } from '@/components/logo'
export const alt = 'Nirvana Pilates Studio — Hillside, Bulawayo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
 return new ImageResponse(
  <div style={{ width: '100%', height: '100%', background: '#faf8f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '18px solid #e9e1d6' }}>
   <div style={{ display: 'flex', width: 850, height: 300 }}><Logo fill="#211d19" /></div>
   <div style={{ fontSize: 24, color: '#795b48', letterSpacing: 5 }}>HILLSIDE · BULAWAYO</div>
   <div style={{ marginTop: 24, fontSize: 22, color: '#51483f' }}>Move with intention. Live with clarity.</div>
  </div>, size)
}
