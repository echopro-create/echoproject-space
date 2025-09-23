'use client';
export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900">ECHO</div>
        <nav className="flex space-x-6 text-sm md:text-base font-medium text-gray-700">
          <a href="/" className="hover:text-black transition-colors duration-200">Главная</a>
          <a href="/about" className="hover:text-black transition-colors duration-200">О проекте</a>
          <a href="/faq" className="hover:text-black transition-colors duration-200">Вопросы-ответы</a>
          <a href="/messages" className="hover:text-black transition-colors duration-200">Послания</a>
          <a href="/contacts" className="hover:text-black transition-colors duration-200">Контакты</a>
        </nav>
      </div>
    </header>
  );
}
