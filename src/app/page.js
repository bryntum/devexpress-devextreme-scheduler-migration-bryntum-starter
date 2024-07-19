import { SchedulerWrapper } from '@/components/SchedulerWrapper';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <SchedulerWrapper />
        </main>
    );
}
