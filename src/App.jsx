import Header from './components/Header';
import Calculator from './components/Calculator';
import History from './components/History';
import UserGuide from './components/UserGuide';
import Footer from './components/Footer';
import { useCalculator } from './hooks/useCalculator';

export default function App() {
  const { state, pressed, press, recall, clearHistory } = useCalculator();

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[24rem_1fr] lg:items-start lg:gap-14">
        <div className="flex flex-col gap-8">
          <Calculator state={state} pressed={pressed} press={press} />
          <History history={state.history} onRecall={recall} onClear={clearHistory} />
        </div>
        <UserGuide />
      </main>
      <Footer />
    </div>
  );
}
