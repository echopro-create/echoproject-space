import { Card } from '../components/UI/Card';

export default function MessagesPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">Мои послания</h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map(i => (
          <li key={i}><Card><p className="clamp-1">Карточка #{i}. Длинное-длинное-длинное название для теста переносов и устойчивости сетки.</p></Card></li>
        ))}
      </ul>
    </div>
  );
}
