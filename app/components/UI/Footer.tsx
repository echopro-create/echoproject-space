// app/components/Footer.tsx
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-border-light py-8 mt-16">
            <div className="container mx-auto px-container-x lg:px-container-lg-x">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary-text">
                    <p>&copy; {new Date().getFullYear()} ECHO Project</p>
                    <nav className="space-x-4 mt-4 md:mt-0">
                        <Link href="/about" className="hover:text-primary-text">О нас</Link>
                        <Link href="/privacy" className="hover:text-primary-text">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary-text">Terms</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}