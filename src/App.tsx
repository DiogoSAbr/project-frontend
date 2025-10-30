import { useState, useMemo } from 'react';
import type { Task, SortOrder } from './types/task';
import { mockTasks } from './data/mock-tasks';
import { TaskModal } from './components/Task/TaskModal';
import { TaskRow } from './components/Task/TaskRow';
import { Pagination } from './components/Task/Pagination';
import { CirclePlus } from "lucide-react";
import { Layout } from './components/layout/Layout';

const ITEMS_PER_PAGE = 8;

function App() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<SortOrder>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.descricao.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === 'all' || task.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

    const paginatedTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredTasks.slice(startIndex, endIndex);
    }, [filteredTasks, currentPage]);

    const handleAddTask = (titulo: string, descricao: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            titulo,
            descricao,
            status: 'pendente',
            createdAt: new Date(),
        };
        setTasks([newTask, ...tasks]);
        setCurrentPage(1);
    };

    const handleToggleStatus = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status: task.status === 'pendente' ? 'concluída' : 'pendente',
                    }
                    : task
            )
        );
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));

        const newTotalPages = Math.ceil((filteredTasks.length - 1) / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (filter: SortOrder) => {
        setStatusFilter(filter);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-title text-gray-900">
                        Listagem de Tarefas
                    </h1>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-3 bg-primary-color text-white px-12 py-4 rounded-lg hover:bg-primary-color/90 transition-colors"
                    >
                        <span className="font-default">Cadastrar Tarefa</span>
                        <CirclePlus size={20} className="text-white" />
                    </button>
                </header>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Pesquisar tarefas..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilterChange('all')}
                                className={`px-4 py-2 rounded-lg font-default transition-colors ${statusFilter === 'all'
                                    ? 'bg-primary-color text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => handleFilterChange('pendente')}
                                className={`px-4 py-2 rounded-lg font-default transition-colors ${statusFilter === 'pendente'
                                    ? 'bg-primary-color text-secondary-color'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Pendentes
                            </button>
                            <button
                                onClick={() => handleFilterChange('concluída')}
                                className={`px-4 py-2 rounded-lg font-default transition-colors ${statusFilter === 'concluída'
                                    ? 'bg-primary-color text-secondary-color'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Concluídas
                            </button>
                        </div>
                    </div>

                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                Nenhuma tarefa encontrada
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-300">
                                            <th className="text-left py-4 px-4 font-title text-title">
                                                Título
                                            </th>
                                            <th className="text-left py-4 px-4 font-title text-title">
                                                Descrição
                                            </th>
                                            <th className="text-left py-4 px-4 font-title text-title">
                                                Status
                                            </th>
                                            <th className="text-left py-4 px-4 font-title text-title">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedTasks.map((task) => (
                                            <TaskRow
                                                key={task.id}
                                                task={task}
                                                onToggleStatus={handleToggleStatus}
                                                onDelete={handleDeleteTask}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-3">
                                <p className="text-gray-600 text-sm">
                                    Mostrando {paginatedTasks.length} de {filteredTasks.length} tarefas
                                </p>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.max(totalPages, 1)}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
            />
        </Layout>
    );
}

export default App;