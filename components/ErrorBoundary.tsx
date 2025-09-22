'use client';
import React from 'react';

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error?: Error }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // ог в консоль/аналитику
    console.error('CABINET-CRASH', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="card" role="alert" aria-live="assertive">
          <div className="font-semibold mb-2">то-то пошло не так на странице кабинета.</div>
          <div className="text-sm opacity-80">ерезагрузите страницу. сли повторится — запись аудио/видео временно отключена.</div>
        </div>
      );
    }
    return this.props.children;
  }
}