'use client';
export default function FaqPage() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">������ � ������</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <div>
          <h2 className="font-semibold">�� ����� Echo?</h2>
          <p>Echo � ��� ������ ��� �������� � �������� ����� �������� ������� � �������.</p>
        </div>
        <div>
          <h2 className="font-semibold">�������� ��� ������ ���������?</h2>
          <p>� ���������� ����������, �������� � � � ������� �������� Supabase RLS.</p>
        </div>
        <div>
          <h2 className="font-semibold">���� �� �������� ��� ������� ��������?</h2>
          <p>�, ���� ��� �� ���������� � �� ��������� ���������� ������ �������.</p>
        </div>
      </div>
    </section>
  );
}


