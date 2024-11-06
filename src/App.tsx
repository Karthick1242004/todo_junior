import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import { Task, User } from './types';
import { v4 as uuidv4 } from 'uuid';
import { showNotification } from './utils/notification';
import MyComponent from './components/MyComponent';

// Simulated API functions
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: '1', email, name: 'John Doe' };
};

const mockRegister = async (email: string, password: string, name: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { id: '1', email, name };
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [notifiedTasks] = useState(new Set<string>());

  useEffect(() => {
    // Request notification permission on mount
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.warn);
    }
  }, []);

  useEffect(() => {
    // Check for due reminders every minute
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (
          task.reminder &&
          new Date(task.reminder) <= now &&
          !task.completed &&
          !notifiedTasks.has(task.id)
        ) {
          showNotification(
            'Task Reminder',
            `Task "${task.title}" is due now!`
          );
          notifiedTasks.add(task.id);
        }
      });
    }, 60000); // Check every minute instead of every 30 seconds

    return () => clearInterval(interval);
  }, [tasks, notifiedTasks]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await mockLogin(email, password);
      setUser(userData);
      showNotification('Welcome', `Welcome back, ${userData.name}!`);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userData = await mockRegister(email, password, name);
      setUser(userData);
      showNotification('Welcome', `Account created successfully. Welcome, ${userData.name}!`);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);

    // Schedule notification if reminder is set
    if (taskData.reminder) {
      const timeUntilReminder = new Date(taskData.reminder).getTime() - new Date().getTime();
      if (timeUntilReminder > 0) {
        setTimeout(() => {
          if (!notifiedTasks.has(newTask.id)) {
            showNotification(
              'Task Reminder',
              `Task "${newTask.title}" is due now!`
            );
            notifiedTasks.add(newTask.id);
          }
        }, timeUntilReminder);
      }
    }

    showNotification('Task Added', `New task "${taskData.title}" has been created.`);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const completed = !task.completed;
          if (completed) {
            showNotification('Task Completed', `Congratulations! Task "${task.title}" has been completed.`);
          }
          return { ...task, completed };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      showNotification('Task Deleted', `Task "${task.title}" has been deleted.`);
    }
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  if (!user) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <TaskForm onSubmit={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </main>
      <MyComponent/>
    </div>
  );
}

export default App;