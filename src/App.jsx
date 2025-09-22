import React, { useState, useEffect } from 'react';

// Главный компонент
const App = () => {
  const canUseDOM = typeof window !== 'undefined';

  const [messages, setMessages] = useState(() => {
    if (!canUseDOM) return [];
    try {
      const saved = localStorage.getItem('echo_messages');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (!canUseDOM) return false;
    const saved = localStorage.getItem('echo_theme');
    if (saved === 'dark' || saved === 'light') return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Применение темы (класс .dark на <html>)
  useEffect(() => {
    if (!canUseDOM) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Сохраняем сообщения
  useEffect(() => {
    if (!canUseDOM) return;
    try { localStorage.setItem('echo_messages', JSON.stringify(messages)); } catch {}
  }, [messages]);

  // Сохраняем тему
  useEffect(() => {
    if (!canUseDOM) return;
    try { localStorage.setItem('echo_theme', isDarkMode ? 'dark' : 'light'); } catch {}
  }, [isDarkMode]);

  // Слушатель системной темы
  useEffect(() => {
    if (!canUseDOM) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setIsDarkMode(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const handleMessageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMessage((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const openNewMessageModal = () => {
    setCurrentMessage({
      id: null,
      content: '',
      recipientEmail: '',
      mode: 'dms',
      delivery_at: '',
      status: 'draft',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (message) => {
    setCurrentMessage({ ...message });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const email = currentMessage?.recipientEmail?.trim();

    if (!currentMessage?.content?.trim() || !email) {
      setAlertMessage('Пожалуйста, заполните все обязательные поля.');
      setIsAlertModalOpen(true);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setAlertMessage('Похоже, email введён неверно.');
      setIsAlertModalOpen(true);
      return;
    }

    if (currentMessage.id) {
      // Редактирование
      setMessages(
        messages.map((m) => (m.id === currentMessage.id ? currentMessage : m))
      );
    } else {
      // Создание
      const newMessage = {
        ...currentMessage,
        id: (globalThis.crypto?.randomUUID?.() ?? (Date.now().toString(36) + Math.random().toString(16).slice(2))),
        created_at: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
    }
    setIsModalOpen(false);
  };

  const sealMessage = (id) => {
    const sealedMessage = messages.find((m) => m.id === id);
    if (!sealedMessage) return;

    if (sealedMessage.mode === 'date' && !sealedMessage.delivery_at) {
      setAlertMessage('Пожалуйста, укажите дату доставки перед запечатыванием.');
      setIsAlertModalOpen(true);
      return;
    }

    setMessages(
      messages.map((m) =>
        m.id === id ? { ...m, status: 'sealed', sealed_at: new Date().toISOString() } : m
      )
    );
  };

  const handleDeleteClick = (id) => {
    setMessageToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    setMessages(messages.filter((m) => m.id !== messageToDelete));
    setIsConfirmModalOpen(false);
    setMessageToDelete(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'draft': return 'Черновик';
      case 'sealed': return 'Запечатано';
      case 'delivered': return 'Доставлено';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-neutral-900 dark:text-neutral-50 p-4 sm:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-50 dark:from-neutral-800 dark:to-neutral-500 bg-clip-text text-transparent cursor-pointer">Echo</div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Мои послания</h1>
          <button
            onClick={openNewMessageModal}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            + Создать
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="text-center p-8 text-neutral-500">
            <p>У вас пока нет посланий. Начните с первого.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-fadeIn p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 shadow-sm flex flex-col"
                style={{ animationDelay: ${index * 0.1}s }}
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold truncate">
                    Послание для {message.recipientEmail}
                  </h3>
                  <p className="text-neutral-500 text-sm mt-2 line-clamp-3">
                    {message.content}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex flex-col">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {getStatusLabel(message.status)}
                    </span>
                    <span className="text-neutral-500">
                      {message.mode === 'dms'
                        ? 'Dead-man switch'
                        : (message.delivery_at
                            ? Дата: 
                            : 'Дата: —')}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {message.status === 'draft' && (
                      <>
                        <button
                          onClick={() => openEditModal(message)}
                          className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          Изменить
                        </button>
                        <button
                          onClick={() => sealMessage(message.id)}
                          className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black transition-colors hover:opacity-80"
                        >
                          Запечатать
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteClick(message.id)}
                      className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-neutral-500">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl w-full max-w-sm border border-neutral-200 dark:border-neutral-800 shadow-xl text-center">
            <p className="text-lg font-medium mb-6">{alertMessage}</p>
            <button
              onClick={() => setIsAlertModalOpen(false)}
              className="px-6 py-2 text-sm font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black transition-opacity hover:opacity-80"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl w-full max-w-sm border border-neutral-200 dark:border-neutral-800 shadow-xl text-center">
            <p className="text-lg font-medium mb-6">Вы уверены, что хотите удалить это послание?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-6 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                Отмена
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white transition-opacity hover:opacity-80"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: создание/редактирование */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl w-full max-w-xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-center">
              {currentMessage?.id ? 'Редактировать послание' : 'Создать послание'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Текст послания</label>
                <textarea
                  name="content"
                  value={currentMessage?.content || ''}
                  onChange={handleMessageChange}
                  required
                  className="w-full h-32 p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 resize-y focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700"
                  placeholder="Ваше послание..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email получателя</label>
                <input
                  type="email"
                  name="recipientEmail"
                  value={currentMessage?.recipientEmail || ''}
                  onChange={handleMessageChange}
                  required
                  className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center text-sm">
                  <input type="radio" name="mode" value="dms" checked={currentMessage?.mode === 'dms'} onChange={handleMessageChange}
                         className="mr-2 rounded-full text-black dark:text-white border-neutral-400 dark:border-neutral-600 focus:ring-black dark:focus:ring-white" />
                  Отправка по Dead-man switch
                </div>
                <div className="flex items-center text-sm mt-2">
                  <input type="radio" name="mode" value="date" checked={currentMessage?.mode === 'date'} onChange={handleMessageChange}
                         className="mr-2 rounded-full text-black dark:text-white border-neutral-400 dark:border-neutral-600 focus:ring-black dark:focus:ring-white" />
                  Отправка по дате
                </div>
              </div>
              {currentMessage?.mode === 'date' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Дата отправки</label>
                  <input
                    type="date"
                    name="delivery_at"
                    value={currentMessage?.delivery_at ? currentMessage.delivery_at.substring(0, 10) : ''}
                    onChange={handleMessageChange}
                    required={currentMessage?.mode === 'date'}
                    className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:ring focus:ring-neutral-200 dark:focus:ring-neutral-700"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700">
                  Отмена
                </button>
                <button type="submit"
                        className="px-6 py-2 text-sm font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black transition-opacity hover:opacity-80">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
