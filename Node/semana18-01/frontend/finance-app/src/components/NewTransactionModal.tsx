import React, { useState } from 'react';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@phosphor-icons/react';

interface NewTransactionData {
  description: string;
  price: number;
  category: string;
  type: 'c' | 'd'; 
}

interface TransactionModalProps {
    onTransactionCreated: () => void;
  }

export function TransactionModal({ onTransactionCreated }: TransactionModalProps) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<'c' | 'd'>('c');

  // Categorias pré-definidas para o select
  const categories: string[] = [ 
    'Alimentação',
    'Venda',
    'Salário',
    'Despesas da casa',
    'Lazer',
    'Outros',
  ];
  
  async function createTransaction() {
        const parsedPrice: number = parseFloat(price.replace(',', '.')); // Tipagem para number

        const transaction: NewTransactionData = {
            description: description,
            price: parsedPrice,
            category: category,
            type: type
        };

        try{
            const response = await axios.post<NewTransactionData>('http://localhost:3101/api/transaction', transaction)

            if (!response) {
                throw new Error("Erro ao cadastrar usuário");
            }

            onTransactionCreated()
            setDescription('')
            setPrice('')
            setCategory('')
            setType('c')
            handleClose()

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    }

    return (
        <>
        <button className='new-transaction-button' onClick={handleShow}>
            Nova transação
        </button>
        <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>Nova Transação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            {/* Campo Descrição */}
            <Form.Group className="mb-3">
                <Form.Control
                type="text"
                placeholder="Descrição"
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} // Tipagem do evento
                required
                />
            </Form.Group>

            {/* Campo Preço */}
            <Form.Group className="mb-3">
                <Form.Control
                type="text" // Usar 'text' para permitir vírgula e validação manual
                placeholder="Preço"
                id="price"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} // Tipagem do evento
                required
                />
            </Form.Group>

            {/* Campo Categoria */}
            <Form.Group className="mb-3">
                <Form.Select
                id="category"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)} // Tipagem do evento
                required
                >
                <option value="" disabled>Selecione a Categoria</option>
                {categories.map((cat: string) => ( // Tipagem no map
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </Form.Select>
            </Form.Group>

            {/* Botões de Tipo de Transação (Entrada/Saída) */}
            <div className="d-flex justify-content-center mb-3">
                <ButtonGroup>
                <Button
                    className="btn-type entrada"
                    variant={type === 'c' ? 'success' : 'outline-secondary'}
                    onClick={() => setType('c')}
                >
                    <ArrowCircleUpIcon size={24} color='var(--green-light)'/>Entrada
                </Button>
                <Button
                    className="btn-type saida"
                    variant={type === 'd' ? 'danger' : 'outline-secondary'}
                    onClick={() => setType('d')}
                >
                    <ArrowCircleDownIcon size={24} color='var(--red)'/>Saída
                </Button>
                </ButtonGroup>
            </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={createTransaction}>
            Cadastrar
            </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
    }

    export default TransactionModal;