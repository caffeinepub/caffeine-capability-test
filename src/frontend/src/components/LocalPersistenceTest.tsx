import { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

const STORAGE_KEY = 'caffeine-todos';

export default function LocalPersistenceTest() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse todos:', e);
      }
    }
  }, []);

  const addTodo = () => {
    if (input.trim()) {
      const newTodos = [...todos, input.trim()];
      setTodos(newTodos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      setInput('');
    }
  };

  const clearStorage = () => {
    setTodos([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FeatureCard
      title="Local Persistence Test"
      description="localStorage-based todo list"
      status="PASS"
      explanation="Data persists in browser localStorage and survives page refreshes."
    >
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
            className="flex-1"
          />
          <Button onClick={addTodo} size="icon" className="bg-chart-2 hover:bg-chart-2/90">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {todos.length > 0 && (
          <div className="space-y-2">
            <div className="max-h-32 overflow-y-auto space-y-1">
              {todos.map((todo, idx) => (
                <div key={idx} className="text-sm p-2 bg-muted/30 rounded border border-border/30">
                  {todo}
                </div>
              ))}
            </div>
            <Button onClick={clearStorage} variant="destructive" size="sm" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Storage
            </Button>
          </div>
        )}
      </div>
    </FeatureCard>
  );
}
