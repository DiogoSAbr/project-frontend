import { useState } from 'react';
import type { FormEvent } from 'react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (titulo: string, descricao: string) => void;
}

export function TaskModal({ isOpen, onClose, onSubmit }: TaskModalProps) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (titulo.trim() && descricao.trim()) {
            onSubmit(titulo, descricao);
            setTitulo('');
            setDescricao('');
            onClose();
        }
    };

    const handleClose = () => {
        setTitulo('');
        setDescricao('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-secondary-color rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    <h2 className="text-2xl font-default-bold text-primary-color mb-6">
                        Cadastrar Tarefa
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="titulo"
                                className="block text-sm font-default text-gray-700 mb-2"
                            >
                                Título
                            </label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent outline-none"
                                placeholder="Digite o título da tarefa"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="descricao"
                                className="block text-sm font-default text-gray-700 mb-2"
                            >
                                Descrição
                            </label>
                            <textarea
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color focus:border-transparent outline-none resize-none"
                                placeholder="Digite a descrição da tarefa"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-primary-color text-white rounded-lg houver:bg-gray-50 transition-colors"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}