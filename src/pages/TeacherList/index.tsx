import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher}  from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setsubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os perfis disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => { setsubject(e.target.value) }}
                        options={[
                            { value: 'Administração, Economia e Negócios', label: 'Administração' },
                            { value: 'Ciências Sociais', label: 'Ciências Sociais' },
                            { value: 'Comunicação e Mídia', label: 'Comunicação e Mídia' },
                            { value: 'Design e Arte', label: 'Design e Arte' },
                            { value: 'Direito', label: 'Direito' },
                            { value: 'Educação', label: 'Educação' },
                            { value: 'Engenharia e Arquitetura', label: 'Engenharia e Arquitetura' },
                            { value: 'Informação e Tecnologia', label: 'Informação e Tecnologia' },
                            { value: 'Saúde', label: 'Saúde' },
                            { value: 'Turismo e Gastronomia', label: 'Turismo e Gastronomia' }
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => { setWeek_day(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5 ', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => { setTime(e.target.value) }}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    );
}

export default TeacherList;