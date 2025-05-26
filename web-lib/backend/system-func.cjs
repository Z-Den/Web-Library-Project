const os = require('os');
const fs = require('fs');
// Получение информации о системе
function getSystemInfo(req, res) {
    try {
        const systemInfo = {
            platform: os.platform(),
            architecture: os.arch(),
            cpus: os.cpus().map(cpu => cpu.model),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            uptime: os.uptime(),
        };

        res.json(systemInfo);
    } catch (error) {
        console.error('Ошибка получения информации о системе:', error);
        res.status(500).json({ error: 'Не удалось получить информацию о системе' });
    }
}

// Получение информации из файла
function getFileInfo(req, res) {
    const filePath = '../data/info.txt';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return res.status(500).json({ error: 'Не удалось прочитать файл' });
        }

        res.json({ content: data });
    });
}

module.exports = { getSystemInfo, getFileInfo };
