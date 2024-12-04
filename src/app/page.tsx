'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { GiftIcon } from '@/icons/GiftIcon';
import { BalloonsIcon } from '@/icons/BalloonsIcon';
import { FlowersIcon } from '@/icons/FlowersIcon';
import { BreakfastIcon } from '@/icons/BreakfastIcon';
import styles from './MainStyle.module.css'
const Page = (): JSX.Element => {
  const router = useRouter()
  const logout = (): void => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <div>
      <div className={styles.form}>

        <input type="radio" name="fancy" autoFocus value="clubs" id="clubs" className={styles.input} />
        <input type="radio" name="fancy" value="hearts" id="hearts" className={styles.input} />
        <input type="radio" name="fancy" value="spades" id="spades" className={styles.input} />
        <input type="radio" name="fancy" value="diamonds" id="diamonds" className={styles.input} />
        <label htmlFor="clubs" className={styles.label}>
          <Button isIconOnly color="primary" aria-label="gift">
            <GiftIcon />
          </Button>
          Regalos
        </label>
        <label htmlFor="hearts" className={styles.label}>
          <Button isIconOnly color="success" aria-label="brak">
            <BreakfastIcon />
          </Button>
          Desayunos
        </label>
        <label htmlFor="spades" className={styles.label}>
          <Button isIconOnly color="warning" aria-label="globos">
            <BalloonsIcon />
          </Button>
          Globos
        </label>
        <label htmlFor="diamonds" className={styles.label}>
          <Button isIconOnly color="danger" aria-label="flores">
            <FlowersIcon />
          </Button>
          Flores
        </label>

        <div className={styles.keys}>Usa las teclas de derecha e izquierda para navegar</div>
      </div>
    </div>
  )
}

export default Page
