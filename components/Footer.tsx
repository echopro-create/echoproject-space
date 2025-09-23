'use client';
export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="container mx-auto px-4 py-8 md:flex md:justify-between md:items-center text-center">
        <div className="text-sm">© 2025 ECHO. Все права защищены.</div>
        <div className="flex justify-center space-x-6 mt-4 md:mt-0">
          <a href="/policy" className="hover:text-black transition-colors duration-200">Политика конфиденциальности</a>
          <a href="/terms" className="hover:text-black transition-colors duration-200">Пользовательское соглашение</a>
        </div>
      </div>
    </footer>
  );
}
