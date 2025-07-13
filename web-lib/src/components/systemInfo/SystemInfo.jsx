import {useState, useEffect} from "react";

const SystemInfo = () => {

    const [systemInfo, setSystemInfo] = useState(null); // Состояние для информации о системе

    const fetchSystemInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/system-info'); // Запрос к серверу
            const data = await response.json();
            setSystemInfo(data); // Устанавливаем данные в состояние
        } catch (error) {
            console.error('Ошибка при получении информации о системе:', error);
        }
    };

    const [fileContent, setFileContent] = useState(null); // Состояние для содержимого файла

    const fetchFileInfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/file-info');
            const data = await response.json();
            setFileContent(data.content); // Устанавливаем содержимое файла в состояние
        } catch (error) {
            console.error('Ошибка при получении информации из файла:', error);
        }
    };

    useEffect(() => {
        fetchSystemInfo();
        fetchFileInfo();
    })

    return (
        <>
            <div className="system-info">
                <h2>Информация о системе</h2>
                {systemInfo ? (
                    <ul>
                        <li>Платформа: {systemInfo.platform}</li>
                        <li>Архитектура: {systemInfo.architecture}</li>
                        <li>Процессоры: {systemInfo.cpus.join(', ')}</li>
                        <li>Общая память: {(systemInfo.totalMemory / (1024 ** 3)).toFixed(2)} GB</li>
                        <li>Свободная память: {(systemInfo.freeMemory / (1024 ** 3)).toFixed(2)} GB</li>
                        <li>Время работы системы: {(systemInfo.uptime / 3600).toFixed(2)} часов</li>
                    </ul>
                ) : (
                    <p>Загрузка информации о системе...</p>
                )}
            </div>

            <div className="file-info">
                <h2>Содержимое файла</h2>
                {fileContent ? (
                    <pre>{fileContent}</pre>
                ) : (
                    <p>Загрузка содержимого файла...</p>
                )}
            </div>
        </>
    )
}

export default SystemInfo;