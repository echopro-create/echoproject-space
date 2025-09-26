export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-8 text-sm text-neutral-600 lg:px-6">
        © {new Date().getFullYear()} ECHO. Все права защищены.
      </div>
    </footer>
  );
}
