// app/components/Header.tsx
import Link from 'next/link';
import { getSessionAndUser } from '@/lib/auth';
import { Button } from './UI/Button'; 

// Временный компонент
export async function Header() {
    const { user } = await getSessionAndUser();
    
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-md border-b border-border-light h-16">
            <div className="container mx-auto px-container-x lg:px-container-lg-x h-full flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-primary-text hover:text-accent transition-colors">
                    ECHO 2.0
                </Link>
                <nav className="hidden md:flex space-x-6 text-sm font-medium text-secondary-text">
                    <Link href="/how">Как это работает</Link>
                    <Link href="/security">Безопасность</Link>
                    {user && <Link href="/messages">Сообщения</Link>}
                    {user && <Link href="/settings">Настройки</Link>}
                </nav>
                <div className="flex items-center space-x-3">
                    {user ? (
                        <Link href="/me">
                            <Button variant="ghost" size="sm">Профиль</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Войти</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}